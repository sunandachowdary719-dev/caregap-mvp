import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import os

st.set_page_config(
    page_title="CareGap",
    page_icon="🩺",
    layout="wide",
    initial_sidebar_state="collapsed"
)

st.markdown("""
<style>
    /* Force light mode always */
    html, body, [data-testid="stAppViewContainer"], [data-testid="stMain"] {
        background-color: #f0f4f8 !important;
        color: #1e293b !important;
    }
    [data-testid="stHeader"] { background: transparent !important; }

    /* Typography */
    h1, h2, h3, p, label, div {
        color: #1e293b !important;
        font-family: 'Inter', sans-serif !important;
    }

    /* Metric cards */
    [data-testid="metric-container"] {
        background: white !important;
        border-radius: 16px !important;
        padding: 1.2rem 1.5rem !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07) !important;
        border: 1px solid #e2e8f0 !important;
    }
    [data-testid="stMetricValue"] { font-size: 2.2rem !important; font-weight: 700 !important; }

    /* Expanders */
    [data-testid="stExpander"] {
        background: white !important;
        border-radius: 12px !important;
        border: 1px solid #e2e8f0 !important;
        box-shadow: 0 1px 4px rgba(0,0,0,0.05) !important;
        margin-bottom: 0.6rem !important;
    }
    [data-testid="stExpander"]:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
        transform: translateY(-1px);
        transition: all 0.2s ease;
    }

    /* Dataframe */
    [data-testid="stDataFrame"] {
        border-radius: 12px !important;
        overflow: hidden !important;
        border: 1px solid #e2e8f0 !important;
    }

    /* Selectbox */
    [data-testid="stSelectbox"] > div {
        background: white !important;
        border-radius: 10px !important;
        border: 1px solid #e2e8f0 !important;
    }

    /* Success/error/warning boxes */
    [data-testid="stAlert"] { border-radius: 10px !important; }

    /* Divider */
    hr { border-color: #e2e8f0 !important; margin: 1.5rem 0 !important; }

    /* Main container padding */
    .block-container { padding: 2rem 3rem !important; max-width: 1400px !important; }

    /* Hide streamlit branding */
    #MainMenu { visibility: hidden; }
    footer { visibility: hidden; }
</style>
""", unsafe_allow_html=True)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def load_data():
    df = pd.read_csv(os.path.join(BASE_DIR, 'caregap_combined.csv'))
    trends = pd.read_csv(os.path.join(BASE_DIR, 'caregap_trends.csv'))
    checkin_file = os.path.join(BASE_DIR, 'checkins.csv')
    checkin_count = 0

    if os.path.exists(checkin_file):
        checkins = pd.read_csv(checkin_file)
        checkin_count = len(checkins)
        for _, row in checkins.iterrows():
            mask = df['NAME'] == row['patient_name']
            if mask.any():
                df.loc[mask, 'systolic'] = row['systolic']
                df.loc[mask, 'diastolic'] = row['diastolic']
                df.loc[mask, 'total_missed'] = row['missed_days']
                df.loc[mask, 'symptoms'] = row['symptoms']

        def smart_flag(row):
            s, d, missed = row['systolic'], row['diastolic'], row['total_missed']
            symptoms = str(row.get('symptoms', ''))
            if 'chest pain' in symptoms.lower() or 'shortness' in symptoms.lower(): return 'RED'
            if s >= 160 or d >= 100: return 'RED'
            if (s >= 140 or d >= 90) and missed >= 2: return 'RED'
            if s >= 140 or d >= 90: return 'YELLOW'
            if missed >= 3: return 'YELLOW'
            return 'GREEN'

        df['risk_v2'] = df.apply(smart_flag, axis=1)

    return df, trends, checkin_count

df, trends, checkin_count = load_data()

# ── HEADER ──────────────────────────────────────────────
st.markdown("""
<div style="background:linear-gradient(135deg,#0f172a,#1e40af);
            border-radius:20px; padding:2rem 2.5rem; margin-bottom:2rem;">
    <h1 style="color:white!important; margin:0; font-size:2rem;">🩺 CareGap</h1>
    <p style="color:#93c5fd!important; margin:0.3rem 0 0; font-size:1rem;">
        Real-time patient monitoring between clinic visits
    </p>
</div>
""", unsafe_allow_html=True)

if checkin_count > 0:
    st.success(f"✅ {checkin_count} patient check-ins received this week — dashboard updated live")

# ── METRICS ─────────────────────────────────────────────
col1, col2, col3, col4 = st.columns(4)
col1.metric("👥 Total Patients", len(df))
col2.metric("🔴 Critical", len(df[df['risk_v2']=='RED']), delta="needs callback today")
col3.metric("🟡 Watch", len(df[df['risk_v2']=='YELLOW']), delta="monitor this week")
col4.metric("🟢 Stable", len(df[df['risk_v2']=='GREEN']))

st.markdown("---")

# ── TREND CHART ─────────────────────────────────────────
st.markdown("### 📈 12-Week Blood Pressure Trend")
selected = st.selectbox("Select patient to view trend:", df['NAME'].tolist(), label_visibility="collapsed")
patient_trend = trends[trends['NAME'] == selected].sort_values('week_num')

if not patient_trend.empty:
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=patient_trend['week'], y=patient_trend['systolic'],
        mode='lines+markers', name='Systolic BP',
        line=dict(color='#ef4444', width=3),
        marker=dict(size=7, color='#ef4444'),
        fill='tozeroy', fillcolor='rgba(239,68,68,0.05)'
    ))
    fig.add_trace(go.Scatter(
        x=patient_trend['week'], y=patient_trend['diastolic'],
        mode='lines+markers', name='Diastolic BP',
        line=dict(color='#3b82f6', width=3),
        marker=dict(size=7, color='#3b82f6'),
        fill='tozeroy', fillcolor='rgba(59,130,246,0.05)'
    ))
    fig.add_hline(y=140, line_dash="dash", line_color="#f59e0b", line_width=1.5,
                  annotation_text="Systolic limit 140", annotation_position="top left")
    fig.add_hline(y=90, line_dash="dash", line_color="#60a5fa", line_width=1.5,
                  annotation_text="Diastolic limit 90", annotation_position="top left")
    fig.update_layout(
        height=320,
        plot_bgcolor='white',
        paper_bgcolor='white',
        font=dict(color='#1e293b', family='Inter'),
        yaxis=dict(range=[50, 200], gridcolor='#f1f5f9', title='mmHg'),
        xaxis=dict(gridcolor='#f1f5f9'),
        legend=dict(orientation='h', yanchor='bottom', y=1.02, x=0),
        margin=dict(l=20, r=20, t=40, b=20),
        hovermode='x unified'
    )
    st.plotly_chart(fig, use_container_width=True)

st.markdown("---")

# ── RED PATIENTS ─────────────────────────────────────────
st.markdown("### 🔴 Critical Patients — Call Today")
red = df[df['risk_v2']=='RED'].sort_values('systolic', ascending=False)

if len(red) == 0:
    st.success("✅ No critical patients today. All high-risk patients are stable.")
else:
    for _, row in red.iterrows():
        with st.expander(
            f"🔴  {row['NAME']}   ·   BP {int(row['systolic'])}/{int(row['diastolic'])} mmHg   ·   {int(row['total_missed'])} missed doses"
        ):
            c1, c2, c3 = st.columns([1,1,1])
            with c1:
                st.markdown(f"**Age:** {row['AGE']}")
                st.markdown(f"**Gender:** {row['GENDER']}")
                st.markdown(f"**City:** {row['CITY']}")
            with c2:
                st.markdown(f"**Medication:** {str(row['med_name'])[:35]}")
                st.markdown(f"**Missed doses:** {int(row['total_missed'])}")
            with c3:
                symptoms = str(row.get('symptoms',''))
                if symptoms not in ['None','nan','']:
                    st.error(f"⚠️ Symptoms: {symptoms}")
                if row['total_missed'] >= 2 and row['systolic'] < 160:
                    st.error("Escalated: High BP + missed medication")
                else:
                    st.error(f"BP {int(row['systolic'])}/{int(row['diastolic'])} — Immediate callback needed")

st.markdown("---")

# ── YELLOW PATIENTS ──────────────────────────────────────
st.markdown("### 🟡 Watch List — Monitor This Week")
yellow = df[df['risk_v2']=='YELLOW'].sort_values('systolic', ascending=False)

for _, row in yellow.iterrows():
    with st.expander(
        f"🟡  {row['NAME']}   ·   BP {int(row['systolic'])}/{int(row['diastolic'])} mmHg   ·   {int(row['total_missed'])} missed doses"
    ):
        c1, c2, c3 = st.columns([1,1,1])
        with c1:
            st.markdown(f"**Age:** {row['AGE']}")
            st.markdown(f"**Gender:** {row['GENDER']}")
            st.markdown(f"**City:** {row['CITY']}")
        with c2:
            st.markdown(f"**Medication:** {str(row['med_name'])[:35]}")
            st.markdown(f"**Missed doses:** {int(row['total_missed'])}")
        with c3:
            st.warning("Monitor closely — follow up if no improvement")

st.markdown("---")

# ── ALL PATIENTS TABLE ───────────────────────────────────
st.markdown("### 📋 All Patients")
col_f, col_s = st.columns([1,3])
with col_f:
    filter_risk = st.selectbox("Filter by risk:", ["ALL","🔴 RED","🟡 YELLOW","🟢 GREEN"])

risk_map = {"ALL":"ALL","🔴 RED":"RED","🟡 YELLOW":"YELLOW","🟢 GREEN":"GREEN"}
risk_val = risk_map[filter_risk]

display_cols = ['NAME','AGE','GENDER','CITY','systolic','diastolic','total_missed','risk_v2']
filtered = df[display_cols] if risk_val=="ALL" else df[df['risk_v2']==risk_val][display_cols]
filtered = filtered.sort_values('systolic', ascending=False).reset_index(drop=True)
filtered.columns = ['Name','Age','Gender','City','Systolic','Diastolic','Missed Doses','Risk']

st.dataframe(filtered, use_container_width=True, hide_index=True)

# ── FOOTER ───────────────────────────────────────────────
st.markdown("""
<div style="text-align:center; padding:2rem 0 1rem; color:#94a3b8; font-size:0.85rem;">
    CareGap — Bridging the gap between clinic visits · Built with ❤️ for better patient outcomes
</div>
""", unsafe_allow_html=True)