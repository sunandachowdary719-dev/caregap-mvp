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

  const filtered = filter === 'ALL' ? patients
    : patients.filter(p => p.risk_v2 === filter)

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🩺</div>
        <p className="text-slate-500 text-lg">Loading CareGap...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
   <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">🩺 CareGap</h1>
            <p className="text-blue-200 mt-1">Real-time patient monitoring between clinic visits</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="/checkin"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
              💊 Patient Check-in →
            </a>
            <div className="text-right">
              <p className="text-blue-200 text-sm">Today</p>
              <p className="text-white font-semibold">{new Date().toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric'})}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* Live data banner */}
        {checkinCount > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 mb-6 flex items-center gap-3">
            <span className="text-green-600 text-xl">✅</span>
            <p className="text-green-800 font-medium">{checkinCount} patient check-ins received this week — dashboard updated live</p>
          </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Total Patients', value: patients.length, color: 'blue', icon: '👥' },
            { label: 'Critical', value: red.length, color: 'red', icon: '🔴', sub: 'needs callback' },
            { label: 'Watch', value: yellow.length, color: 'yellow', icon: '🟡', sub: 'monitor closely' },
            { label: 'Stable', value: green.length, color: 'green', icon: '🟢' },
          ].map(m => (
            <div key={m.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-500 font-medium">{m.icon} {m.label}</span>
              </div>
              <div className={`text-4xl font-bold ${
                m.color === 'red' ? 'text-red-600' :
                m.color === 'yellow' ? 'text-yellow-600' :
                m.color === 'green' ? 'text-green-600' : 'text-slate-800'
              }`}>{m.value}</div>
              {m.sub && <p className="text-xs text-slate-400 mt-1">{m.sub}</p>}
            </div>
          ))}
        </div>

        {/* RED patients */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">🔴 Critical Patients — Call Today</h2>
          {red.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-green-800">
              ✅ No critical patients today
            </div>
          ) : (
            <div className="space-y-3">
              {red.map((p, i) => (
                <div key={i} className="bg-white border-l-4 border-red-500 rounded-xl p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{p.NAME}</h3>
                      <p className="text-slate-500 text-sm">{p.AGE} yrs · {p.GENDER} · {p.CITY}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                        BP {Math.round(parseFloat(p.systolic))}/{Math.round(parseFloat(p.diastolic))} mmHg
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-4 text-sm">
                    <span className="text-slate-600">💊 {p.med_name?.slice(0,40)}</span>
                    <span className="text-red-600 font-medium">⚠️ {p.total_missed} missed doses</span>
                    {p.symptoms && p.symptoms !== 'None' && (
                      <span className="text-red-600">🚨 {p.symptoms}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* YELLOW patients */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">🟡 Watch List — Monitor This Week</h2>
          <div className="space-y-3">
            {yellow.map((p, i) => (
              <div key={i} className="bg-white border-l-4 border-yellow-400 rounded-xl p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800">{p.NAME}</h3>
                    <p className="text-slate-500 text-sm">{p.AGE} yrs · {p.GENDER} · {p.CITY}</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                    BP {Math.round(parseFloat(p.systolic))}/{Math.round(parseFloat(p.diastolic))} mmHg
                  </span>
                </div>
                <div className="mt-2 flex gap-4 text-sm">
                  <span className="text-slate-600">💊 {p.med_name?.slice(0,40)}</span>
                  <span className="text-yellow-600 font-medium">{p.total_missed} missed doses</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All patients table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">📋 All Patients</h2>
            <div className="flex gap-2">
              {['ALL','RED','YELLOW','GREEN'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filter === f
                      ? 'bg-slate-800 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Name','Age','Gender','City','Systolic','Diastolic','Missed','Risk'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-slate-600 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.sort((a,b) => parseFloat(b.systolic) - parseFloat(a.systolic)).map((p, i) => (
                  <tr key={i} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                    p.risk_v2 === 'RED' ? 'bg-red-50/30' :
                    p.risk_v2 === 'YELLOW' ? 'bg-yellow-50/30' : ''
                  }`}>
                    <td className="px-4 py-3 font-medium text-slate-800">{p.NAME}</td>
                    <td className="px-4 py-3 text-slate-600">{p.AGE}</td>
                    <td className="px-4 py-3 text-slate-600">{p.GENDER}</td>
                    <td className="px-4 py-3 text-slate-600">{p.CITY}</td>
                    <td className="px-4 py-3 text-slate-600">{Math.round(parseFloat(p.systolic))}</td>
                    <td className="px-4 py-3 text-slate-600">{Math.round(parseFloat(p.diastolic))}</td>
                    <td className="px-4 py-3 text-slate-600">{p.total_missed}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        p.risk_v2 === 'RED' ? 'bg-red-100 text-red-700' :
                        p.risk_v2 === 'YELLOW' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>{p.risk_v2}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 text-slate-400 text-sm">
          CareGap · Bridging the gap between clinic visits · Built for better patient outcomes
        </div>
      </div>
    </div>
  )
}