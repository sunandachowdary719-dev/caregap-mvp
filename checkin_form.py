import streamlit as st
import pandas as pd
import os
from datetime import datetime

st.set_page_config(page_title="CareGap — Weekly Check-in", page_icon="💊")
st.markdown("## 💊 Your Weekly Health Check-in")
st.markdown("Takes 60 seconds. Helps your doctor monitor you between visits.")
st.markdown("---")

# Patient selects their name (in real product this would be a login)
df = pd.read_csv('/content/caregap_combined.csv')
patient_names = df['NAME'].tolist()
selected = st.selectbox("Select your name:", patient_names)

st.markdown("---")

# BP input
st.subheader("1. Blood Pressure Reading")
st.caption("Take your reading and enter it below")
col1, col2 = st.columns(2)
systolic = col1.number_input("Systolic (top number)", 80, 220, 120)
diastolic = col2.number_input("Diastolic (bottom number)", 40, 140, 80)

st.markdown("---")

# Medication
st.subheader("2. Medication")
took_meds = st.radio(
    "Did you take your blood pressure medication every day this week?",
    ["✅ Yes, every day",
     "⚠️ Missed 1-2 days",
     "❌ Missed 3+ days"]
)

st.markdown("---")

# Symptoms
st.subheader("3. Any symptoms this week?")
symptoms = st.multiselect(
    "Select all that apply:",
    ["Headache","Dizziness","Chest pain","Shortness of breath",
     "Blurred vision","Fatigue","None of the above"]
)

st.markdown("---")

# Submit
if st.button("Submit Check-in ✅", type="primary"):
    missed_map = {
        "✅ Yes, every day": 0,
        "⚠️ Missed 1-2 days": 1,
        "❌ Missed 3+ days": 3
    }
    
    entry = {
        'patient_name': selected,
        'date': datetime.now().strftime('%Y-%m-%d'),
        'systolic': systolic,
        'diastolic': diastolic,
        'missed_days': missed_map[took_meds],
        'symptoms': ', '.join(symptoms) if symptoms else 'None'
    }
    
    # Save to CSV
    checkin_file = '/content/checkins.csv'
    if os.path.exists(checkin_file):
        existing = pd.read_csv(checkin_file)
        updated = pd.concat([existing, pd.DataFrame([entry])], ignore_index=True)
    else:
        updated = pd.DataFrame([entry])
    
    updated.to_csv(checkin_file, index=False)
    
    st.success("✅ Check-in submitted! Your care team will review this.")
    st.balloons()
    
    # Show what was recorded
    st.markdown("**You reported:**")
    st.write(f"BP: {systolic}/{diastolic} mmHg")
    st.write(f"Medication: {took_meds}")
    st.write(f"Symptoms: {', '.join(symptoms) if symptoms else 'None'}")
