import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import os

st.set_page_config(page_title="CareGap", page_icon="🩺", layout="wide")

# Clean styling
st.markdown("""
<style>
    .main { background-color: #f8fafc; }
    .stMetric { background: white; padding: 1rem; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    .block-container { padding-top: 2rem; }
    h1, h2, h3 { color: #1e293b; }
    .red-badge { background:#fee2e2; color:#991b1b; padding:4px 12px; border-radius:20px; font-weight:600; font-size:13px; }
    .yellow-badge { background:#fef9c3; color:#854d0e; padding:4px 12px; border-radius:20px; font-weight:600; font-size:13px; }
    .green-badge { background:#dcfce7; color:#166534; padding:4px 12px; border-radius:20px; font-weight:600; font-size:13px; }
    .patient-card { background:white; border-radius:12px; padding:1.2rem; margin-bottom:0.8rem; box-shadow:0 1px 4px rgba(0,0,0,0.07); border-left: 4px solid #e2e8f0; }
    .patient-card.red { border-left-color: #ef4444; }
    .patient-card.yellow { border-left-color: #f59e0b; }
</style>
""", unsafe_allow_html=True)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def load_data():
    df = pd.read_csv(os.path.join(BASE_DIR, 'caregap_combined.csv'))
    trends = pd.read_csv(os.path.join(BASE_DIR, 'caregap_trends.csv'))
    checkin_file = os.path.join(BASE_DIR, 'checkins.csv')
    if os.path.exists(checkin_file):
        checkins = pd.read_csv(checkin_file)
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
        st.success(f"✅ Live data: {len(checkins)} patient check-ins this week")
    return df, trends

df, trends = load_data()

# Header
st.markdown("## 🩺 CareGap — Clinic Dashboard")
st.caption("Real-time patient monitoring between clinic visits")
st.markdown("---")

# Metrics
col1, col2, col3, col4 = st.columns(4)
col1.metric("👥 Total Patients", len(df))
col2.metric("🔴 Critical", len(df[df['risk_v2']=='RED']), delta="needs callback")
col3.metric("🟡 Watch", len(df[df['risk_v2']=='YELLOW']))
col4.metric("🟢 Stable", len(df[df['risk_v2']=='GREEN']))

st.markdown("---")

# Trend chart
st.subheader("📈 12-Week BP Trend")
selected = st.selectbox("Select patient:", df['NAME'].tolist())
patient_trend = trends[trends['NAME'] == selected].sort_values('week_num')

if not patient_trend.empty:
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=patient_trend['week'], y=patient_trend['systolic'],
        mode='lines+markers', name='Systolic',
        line=dict(color='#ef4444', width=2),
        marker=dict(size=6)
    ))
    fig.add_trace(go.Scatter(
        x=patient_trend['week'], y=patient_trend['diastolic'],
        mode='lines+markers', name='Diastolic',
        line=dict(color='#3b82f6', width=2),
        marker=dict(size=6)
    ))
    fig.add_hline(y=140, line_dash="dash", line_color="#f59e0b",
                  annotation_text="Systolic limit 140")
    fig.add_hline(y=90, line_dash="dash", line_color="#93c5fd",
                  annotation_text="Diastolic limit 90")
    fig.update_layout(
        height=350,
        plot_bgcolor='white',
        paper_bgcolor='white',
        yaxis=dict(range=[50, 200], gridcolor='#f1f5f9'),
        xaxis=dict(gridcolor='#f1f5f9'),
        legend=dict(orientation='h', yanchor='bottom', y=1.02),
        margin=dict(l=20, r=20, t=40, b=20)
    )
    st.plotly_chart(fig, use_container_width=True)

st.markdown("---")

# RED patients
st.subheader("🔴 Critical — Call Today")
red = df[df['risk_v2']=='RED'].sort_values('systolic', ascending=False)
if len(red) == 0:
    st.success("No critical patients today.")
else:
    for _, row in red.iterrows():
        with st.expander(f"🔴 {row['NAME']}  |  BP {int(row['systolic'])}/{int(row['diastolic'])} mmHg  |  {int(row['total_missed'])} missed doses"):
            c1, c2, c3 = st.columns(3)
            c1.markdown(f"**Age:** {row['AGE']}")
            c1.markdown(f"**Gender:** {row['GENDER']}")
            c2.markdown(f"**City:** {row['CITY']}")
            c2.markdown(f"**Med:** {row['med_name'][:30]}")
            if str(row.get('symptoms','')) not in ['None','nan','']:
                c3.error(f"⚠️ {row['symptoms']}")
            else:
                c3.error("High BP — callback needed")

st.markdown("---")

# YELLOW patients
st.subheader("🟡 Watch List")
yellow = df[df['risk_v2']=='YELLOW'].sort_values('systolic', ascending=False)
for _, row in yellow.iterrows():
    with st.expander(f"🟡 {row['NAME']}  |  BP {int(row['systolic'])}/{int(row['diastolic'])} mmHg  |  {int(row['total_missed'])} missed doses"):
        c1, c2, c3 = st.columns(3)
        c1.markdown(f"**Age:** {row['AGE']}")
        c1.markdown(f"**Gender:** {row['GENDER']}")
        c2.markdown(f"**City:** {row['CITY']}")
        c2.markdown(f"**Med:** {row['med_name'][:30]}")
        c3.warning("Monitor closely this week")

st.markdown("---")

# All patients clean table
st.subheader("📋 All Patients")
filter_risk = st.selectbox("Filter by risk:", ["ALL","RED","YELLOW","GREEN"])
display_cols = ['NAME','AGE','GENDER','CITY','systolic','diastolic','total_missed','risk_v2']
filtered = df[display_cols] if filter_risk=="ALL" else df[df['risk_v2']==filter_risk][display_cols]
filtered = filtered.sort_values('systolic', ascending=False).reset_index(drop=True)
filtered.columns = ['Name','Age','Gender','City','Systolic','Diastolic','Missed Doses','Risk']
st.dataframe(filtered, use_container_width=True, hide_index=True)