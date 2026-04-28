import streamlit as st
import pandas as pd
import anthropic
import os

st.set_page_config(page_title="CareGap", page_icon="🩺", layout="wide")
st.markdown("## 🩺 CareGap — Clinic Monitoring Dashboard")
st.markdown("---")

df = pd.read_csv('/content/caregap_combined.csv')

# Top metrics
col1, col2, col3, col4 = st.columns(4)
col1.metric("Total Patients", len(df))
col2.metric("🔴 Critical", len(df[df['risk_v2']=='RED']))
col3.metric("🟡 Watch", len(df[df['risk_v2']=='YELLOW']))
col4.metric("🟢 Stable", len(df[df['risk_v2']=='GREEN']))

st.markdown("---")

# RED patients
st.subheader("🔴 Critical Patients — Call Today")
red = df[df['risk_v2']=='RED'].sort_values('systolic', ascending=False)
for _, row in red.iterrows():
    with st.expander(f"🔴 {row['NAME']} — BP {row['systolic']}/{row['diastolic']} mmHg"):
        c1, c2 = st.columns(2)
        c1.write(f"**Age:** {row['AGE']}")
        c1.write(f"**Gender:** {row['GENDER']}")
        c1.write(f"**City:** {row['CITY']}")
        c1.write(f"**Medication:** {row['med_name']}")
        c1.write(f"**Missed doses:** {int(row['total_missed'])}")
        if row['total_missed'] >= 2 and row['systolic'] < 160:
            c2.error(f"⚠️ Escalated: High BP + {int(row['total_missed'])} missed doses")
        else:
            c2.error(f"BP {row['systolic']}/{row['diastolic']} mmHg — Critical")

st.markdown("---")

# YELLOW patients
st.subheader("🟡 Watch List — Monitor This Week")
yellow = df[df['risk_v2']=='YELLOW'].sort_values('systolic', ascending=False)

def color_rows(row):
    c = {'RED':'background-color:#ffe0e0',
         'YELLOW':'background-color:#fff9c4',
         'GREEN':'background-color:#e0f7e9'}
    return [c.get(row['risk_v2'],'')] * len(row)

display_cols = ['NAME','AGE','GENDER','CITY','systolic','diastolic','total_missed','med_name','risk_v2']
st.dataframe(
    yellow[display_cols].style.apply(color_rows, axis=1),
    use_container_width=True
)

st.markdown("---")

# Full table
st.subheader("📋 All Patients")
filter_risk = st.selectbox("Filter:", ["ALL","RED","YELLOW","GREEN"])
filtered = df[display_cols] if filter_risk=="ALL" else df[df['risk_v2']==filter_risk][display_cols]
st.dataframe(
    filtered.sort_values('systolic', ascending=False)
    .style.apply(color_rows, axis=1),
    use_container_width=True
)
