'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Legend } from 'recharts'

interface Patient {
  id?: string
  name?: string
  NAME: string
  AGE: string | number
  GENDER: string
  CITY: string
  systolic: string | number
  diastolic: string | number
  total_missed: string | number
  med_name: string
  risk_v2: string
  symptoms?: string
}

interface Checkin {
  id?: string
  patient_name: string
  systolic: number
  diastolic: number
  missed_days: number
  symptoms: string
  created_at: string
}

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [checkinCount, setCheckinCount] = useState(0)
  const [filter, setFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const [selectedPatient, setSelectedPatient] = useState<string>('')
  const [trends, setTrends] = useState<any[]>([])
  const [clinicName, setClinicName] = useState<string | null>(null)

  const [modalPatient, setModalPatient] = useState<Patient | null>(null)
  const [modalCheckins, setModalCheckins] = useState<Checkin[]>([])
  const [modalLoading, setModalLoading] = useState(false)

  useEffect(() => {
    setClinicName(localStorage.getItem('clinic_name'))
  }, [])

  useEffect(() => {
    fetch('/api/patients')
      .then(r => r.json())
      .then(data => {
        const pts = data.patients || []
        setPatients(pts)
        setCheckinCount(data.checkinCount || 0)
        setLoading(false)
        if (pts.length > 0) setSelectedPatient(pts[0].NAME)
      })
  }, [])

  useEffect(() => {
    if (!selectedPatient) return
    fetch(`/api/trends?name=${encodeURIComponent(selectedPatient)}`)
      .then(r => r.json())
      .then(data => setTrends(data.trends || []))
  }, [selectedPatient])

  useEffect(() => {
    if (!modalPatient) return
    setModalLoading(true)
    fetch(`/api/checkins?name=${encodeURIComponent(modalPatient.NAME)}`)
      .then(r => r.json())
      .then(data => {
        setModalCheckins(data.checkins || [])
        setModalLoading(false)
      })
  }, [modalPatient])

  function exportCSV() {
    const headers = ['Name', 'Age', 'Gender', 'City', 'Systolic', 'Diastolic', 'Missed Doses', 'Risk', 'Symptoms']
    const rows = patients.map(p => [
      p.NAME, p.AGE, p.GENDER, p.CITY,
      Math.round(parseFloat(String(p.systolic))),
      Math.round(parseFloat(String(p.diastolic))),
      p.total_missed, p.risk_v2,
      p.symptoms || 'None',
    ])
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'caregap_patients.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const red = patients.filter(p => p.risk_v2 === 'RED')
  const yellow = patients.filter(p => p.risk_v2 === 'YELLOW')
  const green = patients.filter(p => p.risk_v2 === 'GREEN')
  const filtered = filter === 'ALL' ? patients : patients.filter(p => p.risk_v2 === filter)

  const peakSystolic = modalCheckins.length
    ? Math.max(...modalCheckins.map(c => c.systolic))
    : null
  const peakDiastolic = modalCheckins.length
    ? Math.max(...modalCheckins.map(c => c.diastolic))
    : null

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <p className="text-slate-400 text-lg">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {clinicName ? (
        <div className="bg-blue-50 border-b border-blue-200 px-8 py-2.5 text-center">
          <p className="text-blue-800 text-sm font-medium">Welcome, {clinicName}</p>
        </div>
      ) : (
        <div className="bg-amber-50 border-b border-amber-200 px-8 py-2.5 text-center">
          <p className="text-amber-800 text-sm">
            You are viewing demo data.{' '}
            <a href="/login" className="font-medium underline hover:text-amber-900">Sign in to see your clinic patients.</a>
          </p>
        </div>
      )}
      <div className="bg-slate-900 text-white px-8 py-5 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">CareGap</h1>
            <p className="text-slate-400 text-sm mt-0.5">Patient Monitoring Dashboard</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">← Home</a>
            <a href="/checkin" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Patient Check-in
            </a>
            <div className="text-right">
              <p className="text-slate-400 text-xs">Today</p>
              <p className="text-white text-sm font-medium">{new Date().toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric'})}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">

        {checkinCount > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-6">
            <p className="text-green-800 text-sm font-medium">{checkinCount} patient check-ins received this week</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Patients', value: patients.length, color: 'slate' },
            { label: 'Critical', value: red.length, color: 'red', sub: 'Callback required' },
            { label: 'Watch', value: yellow.length, color: 'yellow', sub: 'Monitor this week' },
            { label: 'Stable', value: green.length, color: 'green' },
          ].map(m => (
            <div key={m.label} className="bg-white rounded-xl p-5 border border-slate-200">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">{m.label}</p>
              <p className={`text-4xl font-bold ${
                m.color === 'red' ? 'text-red-600' :
                m.color === 'yellow' ? 'text-amber-500' :
                m.color === 'green' ? 'text-green-600' : 'text-slate-800'
              }`}>{m.value}</p>
              {m.sub && <p className="text-xs text-slate-400 mt-1">{m.sub}</p>}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">12-Week Blood Pressure Trend</h2>
            <select
              value={selectedPatient}
              onChange={e => setSelectedPatient(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {patients.map(p => <option key={p.NAME}>{p.NAME}</option>)}
            </select>
          </div>
          {trends.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis domain={[50, 200]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  formatter={(value: any, name: any) => [`${value} mmHg`, name === 'systolic' ? 'Systolic' : 'Diastolic']}
                />
                <Legend formatter={(value) => value === 'systolic' ? 'Systolic' : 'Diastolic'} />
                <ReferenceLine y={140} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: '140', fontSize: 10, fill: '#f59e0b' }} />
                <ReferenceLine y={90} stroke="#93c5fd" strokeDasharray="4 4" label={{ value: '90', fontSize: 10, fill: '#93c5fd' }} />
                <Line type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-400 text-sm text-center py-10">Loading trend data...</p>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Critical — Call Today</h2>
          {red.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-5 text-slate-500 text-sm">No critical patients at this time.</div>
          ) : (
            <div className="space-y-2">
              {red.map((p, i) => (
                <div key={i} onClick={() => setModalPatient(p)}
                  className="bg-white border border-red-200 border-l-4 border-l-red-500 rounded-xl p-5 cursor-pointer hover:bg-red-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800">{p.NAME}</h3>
                      <p className="text-slate-400 text-sm mt-0.5">{p.AGE} yrs · {p.GENDER} · {p.CITY}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-slate-600">{p.med_name?.slice(0,40)}</span>
                        <span className="text-red-600 font-medium">{p.total_missed} missed doses</span>
                        {p.symptoms && p.symptoms !== 'None' && <span className="text-red-600">Symptoms: {p.symptoms}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-semibold">
                        {Math.round(parseFloat(String(p.systolic)))}/{Math.round(parseFloat(String(p.diastolic)))} mmHg
                      </span>
                      <p className="text-red-500 text-xs mt-1">Above threshold</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Watch List — Monitor This Week</h2>
          <div className="space-y-2">
            {yellow.map((p, i) => (
              <div key={i} onClick={() => setModalPatient(p)}
                className="bg-white border border-amber-200 border-l-4 border-l-amber-400 rounded-xl p-5 cursor-pointer hover:bg-amber-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">{p.NAME}</h3>
                    <p className="text-slate-400 text-sm mt-0.5">{p.AGE} yrs · {p.GENDER} · {p.CITY}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className="text-slate-600">{p.med_name?.slice(0,40)}</span>
                      <span className="text-amber-600">{p.total_missed} missed doses</span>
                    </div>
                  </div>
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-md text-sm font-semibold">
                    {Math.round(parseFloat(String(p.systolic)))}/{Math.round(parseFloat(String(p.diastolic)))} mmHg
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">All Patients</h2>
            <div className="flex items-center gap-2">
              <button onClick={exportCSV}
                className="px-3 py-1 rounded-md text-xs font-medium bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">
                Export CSV
              </button>
              <div className="flex gap-1">
                {['ALL','RED','YELLOW','GREEN'].map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      filter === f ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}>{f}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto max-w-full">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Age</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Gender</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">City</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Systolic</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Diastolic</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Missed Doses</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.sort((a,b) => parseFloat(String(b.systolic)) - parseFloat(String(a.systolic))).map((p, i) => (
                  <tr key={i} onClick={() => setModalPatient(p)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-medium text-slate-800">{p.NAME}</td>
                    <td className="px-4 py-3 text-slate-600">{p.AGE}</td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{p.GENDER}</td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{p.CITY}</td>
                    <td className="px-4 py-3 text-slate-600">{Math.round(parseFloat(String(p.systolic)))}</td>
                    <td className="px-4 py-3 text-slate-600">{Math.round(parseFloat(String(p.diastolic)))}</td>
                    <td className="px-4 py-3 text-slate-600">{p.total_missed}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        p.risk_v2 === 'RED' ? 'bg-red-100 text-red-700' :
                        p.risk_v2 === 'YELLOW' ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>{p.risk_v2}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center py-8 text-slate-300 text-xs">
          CareGap — Bridging the gap between clinic visits
        </div>
      </div>

      {/* Patient Detail Modal */}
      {modalPatient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget) setModalPatient(null) }}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{modalPatient.NAME}</h2>
                <p className="text-slate-400 text-sm mt-0.5">{modalPatient.AGE} yrs · {modalPatient.GENDER} · {modalPatient.CITY}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-md text-sm font-semibold ${
                  modalPatient.risk_v2 === 'RED' ? 'bg-red-100 text-red-700' :
                  modalPatient.risk_v2 === 'YELLOW' ? 'bg-amber-100 text-amber-700' :
                  'bg-green-100 text-green-700'
                }`}>{modalPatient.risk_v2}</span>
                <button onClick={() => setModalPatient(null)}
                  className="text-slate-400 hover:text-slate-700 text-2xl leading-none">×</button>
              </div>
            </div>

            <div className="px-8 py-6 space-y-6">
              {/* Current Vitals */}
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Current Vitals</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Blood Pressure</p>
                    <p className="text-xl font-bold text-slate-900">
                      {Math.round(parseFloat(String(modalPatient.systolic)))}/{Math.round(parseFloat(String(modalPatient.diastolic)))}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">mmHg</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Missed Doses</p>
                    <p className="text-xl font-bold text-slate-900">{modalPatient.total_missed}</p>
                    <p className="text-xs text-slate-400 mt-0.5">this week</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Peak BP (12 wks)</p>
                    {peakSystolic !== null ? (
                      <>
                        <p className="text-xl font-bold text-slate-900">{peakSystolic}/{peakDiastolic}</p>
                        <p className="text-xs text-slate-400 mt-0.5">mmHg</p>
                      </>
                    ) : (
                      <p className="text-sm text-slate-400 mt-2">—</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Medication */}
              {modalPatient.med_name && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Medication</h3>
                  <p className="text-sm text-slate-700 bg-slate-50 rounded-lg px-4 py-3">{modalPatient.med_name}</p>
                </div>
              )}

              {/* Symptoms */}
              {modalPatient.symptoms && modalPatient.symptoms !== 'None' && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Reported Symptoms</h3>
                  <p className="text-sm text-red-700 bg-red-50 rounded-lg px-4 py-3">{modalPatient.symptoms}</p>
                </div>
              )}

              {/* Check-in History */}
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Check-in History</h3>
                {modalLoading ? (
                  <p className="text-slate-400 text-sm text-center py-4">Loading history...</p>
                ) : modalCheckins.length === 0 ? (
                  <p className="text-slate-400 text-sm">No check-ins recorded yet.</p>
                ) : (
                  <div className="space-y-2">
                    {modalCheckins.map((c, i) => (
                      <div key={i} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3 text-sm">
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-slate-800">{c.systolic}/{c.diastolic} mmHg</span>
                          <span className="text-slate-500">{c.missed_days} missed dose{c.missed_days !== 1 ? 's' : ''}</span>
                          {c.symptoms && c.symptoms !== 'None' && (
                            <span className="text-red-600 text-xs">{c.symptoms}</span>
                          )}
                        </div>
                        <span className="text-slate-400 text-xs shrink-0">
                          {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
