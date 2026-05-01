'use client'

import { useEffect, useState } from 'react'

interface Patient {
  NAME: string
  AGE: string
  GENDER: string
  CITY: string
  systolic: string
  diastolic: string
  total_missed: string
  med_name: string
  risk_v2: string
  symptoms?: string
}

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [checkinCount, setCheckinCount] = useState(0)
  const [filter, setFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/patients')
      .then(r => r.json())
      .then(data => {
        setPatients(data.patients || [])
        setCheckinCount(data.checkinCount || 0)
        setLoading(false)
      })
  }, [])

  const red = patients.filter(p => p.risk_v2 === 'RED')
  const yellow = patients.filter(p => p.risk_v2 === 'YELLOW')
  const green = patients.filter(p => p.risk_v2 === 'GREEN')
  const filtered = filter === 'ALL' ? patients : patients.filter(p => p.risk_v2 === filter)

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <p className="text-slate-400 text-lg">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-slate-900 text-white px-8 py-5 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">CareGap</h1>
            <p className="text-slate-400 text-sm mt-0.5">Patient Monitoring Dashboard</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="/checkin"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
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
            <p className="text-green-800 text-sm font-medium">{checkinCount} patient check-ins received this week — dashboard updated in real time</p>
          </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
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

        {/* Critical */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Critical — Call Today</h2>
          {red.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-5 text-slate-500 text-sm">
              No critical patients at this time.
            </div>
          ) : (
            <div className="space-y-2">
              {red.map((p, i) => (
                <div key={i} className="bg-white border border-red-200 border-l-4 border-l-red-500 rounded-xl p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800">{p.name || p.NAME}</h3>
                      <p className="text-slate-400 text-sm mt-0.5">{p.age || p.AGE} yrs · {p.gender || p.GENDER} · {p.city || p.CITY}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-slate-600">{p.med_name?.slice(0,40)}</span>
                        <span className="text-red-600 font-medium">{p.total_missed} missed doses</span>
                        {p.symptoms && p.symptoms !== 'None' && (
                          <span className="text-red-600">Symptoms: {p.symptoms}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-semibold">
                        {Math.round(parseFloat(p.systolic))}/{Math.round(parseFloat(p.diastolic))} mmHg
                      </span>
                      <p className="text-red-500 text-xs mt-1">Above threshold</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Watch */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Watch List — Monitor This Week</h2>
          <div className="space-y-2">
            {yellow.map((p, i) => (
              <div key={i} className="bg-white border border-amber-200 border-l-4 border-l-amber-400 rounded-xl p-5">
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
                    {Math.round(parseFloat(p.systolic))}/{Math.round(parseFloat(p.diastolic))} mmHg
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All patients */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">All Patients</h2>
            <div className="flex gap-1">
              {['ALL','RED','YELLOW','GREEN'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    filter === f ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Name','Age','Gender','City','Systolic','Diastolic','Missed Doses','Risk'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.sort((a,b) => parseFloat(b.systolic) - parseFloat(a.systolic)).map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800">{p.NAME}</td>
                    <td className="px-4 py-3 text-slate-600">{p.AGE}</td>
                    <td className="px-4 py-3 text-slate-600">{p.GENDER}</td>
                    <td className="px-4 py-3 text-slate-600">{p.CITY}</td>
                    <td className="px-4 py-3 text-slate-600">{Math.round(parseFloat(p.systolic))}</td>
                    <td className="px-4 py-3 text-slate-600">{Math.round(parseFloat(p.diastolic))}</td>
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
    </div>
  )
}