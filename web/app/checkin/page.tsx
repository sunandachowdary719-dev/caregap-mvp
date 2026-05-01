'use client'

import { useState, useEffect } from 'react'

export default function CheckinPage() {
  const [patients, setPatients] = useState<string[]>([])
  const [selectedPatient, setSelectedPatient] = useState('')
  const [systolic, setSystolic] = useState(120)
  const [diastolic, setDiastolic] = useState(80)
  const [meds, setMeds] = useState('')
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/patients')
      .then(r => r.json())
      .then(data => {
        const names = (data.patients || []).map((p: any) => p.name || p.NAME)
        setPatients(names)
        setSelectedPatient(names[0])
      })
  }, [])

  const symptomOptions = [
    'Headache', 'Dizziness', 'Chest pain',
    'Shortness of breath', 'Blurred vision', 'Fatigue'
  ]

  const toggleSymptom = (s: string) => {
    setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const missedMap: Record<string, number> = {
    'Yes, every day': 0,
    'Missed 1-2 days': 1,
    'Missed 3+ days': 3
  }

  const handleSubmit = async () => {
    setLoading(true)
    await fetch('/api/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient_name: selectedPatient,
        systolic,
        diastolic,
        missed_days: missedMap[meds] ?? 0,
        symptoms: symptoms.length ? symptoms.join(', ') : 'None'
      })
    })
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-10 shadow-lg text-center max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Check-in submitted</h2>
        <p className="text-slate-500 mb-6">Your care team will review your data and reach out if needed.</p>
        <p className="text-sm text-slate-400">BP: {systolic}/{diastolic} mmHg</p>
        <button onClick={() => setSubmitted(false)}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700">
          Submit another
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white px-8 py-5">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-semibold">Weekly Health Check-in</h1>
          <p className="text-slate-400 text-sm mt-0.5">Takes 60 seconds. Helps your doctor monitor you between visits.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-3">1. Select your name</h3>
          <select
            value={selectedPatient}
            onChange={e => setSelectedPatient(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {patients.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-1">2. Blood Pressure Reading</h3>
          <p className="text-slate-400 text-sm mb-4">Enter your reading from your home BP monitor</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-500 font-medium">Systolic (top number)</label>
              <input type="number" value={systolic}
                onChange={e => setSystolic(parseInt(e.target.value))}
                className="w-full mt-1 border border-slate-200 rounded-xl px-4 py-3 text-2xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={80} max={220} />
            </div>
            <div>
              <label className="text-sm text-slate-500 font-medium">Diastolic (bottom number)</label>
              <input type="number" value={diastolic}
                onChange={e => setDiastolic(parseInt(e.target.value))}
                className="w-full mt-1 border border-slate-200 rounded-xl px-4 py-3 text-2xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={40} max={140} />
            </div>
          </div>
          <div className="mt-3 text-center">
            <span className={`text-lg font-bold px-4 py-1 rounded-full ${
              systolic >= 160 || diastolic >= 100 ? 'bg-red-100 text-red-700' :
              systolic >= 140 || diastolic >= 90 ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {systolic}/{diastolic} mmHg — {
                systolic >= 160 || diastolic >= 100 ? 'High' :
                systolic >= 140 || diastolic >= 90 ? 'Elevated' : 'Normal'
              }
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">3. Medication this week</h3>
          <div className="space-y-3">
            {['Yes, every day', 'Missed 1-2 days', 'Missed 3+ days'].map(option => (
              <button key={option} onClick={() => setMeds(option)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                  meds === option
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}>
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">4. Any symptoms this week?</h3>
          <div className="grid grid-cols-2 gap-3">
            {symptomOptions.map(s => (
              <button key={s} onClick={() => toggleSymptom(s)}
                className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  symptoms.includes(s)
                    ? 'border-red-400 bg-red-50 text-red-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} disabled={!meds || loading}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Submitting...' : 'Submit Check-in'}
        </button>

        <p className="text-center text-slate-400 text-xs pb-2">
          Your data is private and only shared with your care team
        </p>
        <p className="text-center text-slate-400 text-xs pb-6">
          By submitting, you consent to CareGap storing your health data for clinical monitoring purposes.{' '}
          <a href="https://caregap.vercel.app/privacy" className="underline hover:text-slate-300">View our Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}