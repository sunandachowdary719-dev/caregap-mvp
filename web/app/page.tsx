'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [form, setForm] = useState({ clinicName: '', doctorName: '', email: '', phone: '', patientCount: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [trialLoading, setTrialLoading] = useState(false)

  async function handleTrial() {
    setTrialLoading(true)
    try {
      const res = await fetch('/api/create-checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      setTrialLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">

      {/* Nav */}
      <nav className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between">
        <span className="text-lg font-semibold tracking-tight">CareGap</span>
        <div className="flex gap-6 text-sm font-medium items-center">
          <Link href="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
          <Link href="/faq" className="text-slate-300 hover:text-white transition-colors">FAQ</Link>
          <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">View Dashboard</Link>
          <Link href="/login" className="text-slate-300 hover:text-white transition-colors">Clinic Login</Link>
          <Link href="/checkin" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">Patient Check-in</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-slate-900 text-white px-8 py-24 text-center">
        <h1 className="text-4xl font-bold max-w-2xl mx-auto leading-tight">
          Your patients need monitoring between visits. You need CareGap.
        </h1>
        <p className="mt-5 text-slate-300 max-w-xl mx-auto text-lg leading-relaxed">
          The average primary care patient goes 90 days between appointments. A lot can go wrong. CareGap keeps your clinic connected to patients in the gaps.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            View Dashboard
          </Link>
          <Link href="/checkin" className="border border-slate-500 hover:border-slate-300 text-slate-200 px-6 py-3 rounded-lg font-medium transition-colors">
            Patient Check-in
          </Link>
        </div>
        <div className="mt-12 flex justify-center gap-10">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">148</p>
            <p className="text-slate-400 text-sm mt-1">patients monitored</p>
          </div>
          <div className="w-px bg-slate-700" />
          <div className="text-center">
            <p className="text-3xl font-bold text-red-400">3</p>
            <p className="text-slate-400 text-sm mt-1">critical alerts sent this week</p>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="px-8 py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-10 text-center">The Problem</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { stat: '361 days/year', label: 'patients go unmonitored between clinic visits' },
              { stat: '1 in 3', label: 'hypertension patients are non-adherent to medication' },
              { stat: '$3,000/month', label: 'in RPM reimbursements available per clinic' },
            ].map(({ stat, label }) => (
              <div key={stat} className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                <p className="text-3xl font-bold text-slate-900 mb-3">{stat}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-10 text-center">What CareGap Does</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { title: 'Real-time BP Monitoring', desc: 'Track blood pressure readings submitted by patients weekly. Trend charts surface deterioration before it becomes a crisis.' },
              { title: 'Medication Adherence Tracking', desc: 'Patients log missed doses at check-in. Your dashboard shows adherence rates across your entire panel at a glance.' },
              { title: 'Automated Risk Alerts', desc: 'Our risk engine flags critical and watch-list patients automatically so your team knows exactly who to call today.' },
            ].map(({ title, desc }) => (
              <div key={title} className="border border-slate-200 rounded-xl p-8">
                <h3 className="font-semibold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-8 py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-10 text-center">How It Works</h2>
          <div className="space-y-6">
            {[
              { n: '1', title: 'Patient checks in weekly', desc: 'Patients submit their blood pressure and medication adherence via a simple mobile-friendly form — no app download required.' },
              { n: '2', title: 'Risk engine flags alerts', desc: 'CareGap scores each patient against clinical thresholds and surfaces RED and YELLOW risk tiers automatically.' },
              { n: '3', title: 'Clinic notified instantly', desc: 'Your care team sees critical patients at the top of the dashboard the moment data comes in — no manual review required.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex gap-6 items-start bg-white border border-slate-200 rounded-xl p-6">
                <span className="text-2xl font-bold text-blue-600 min-w-8">{n}</span>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-10 text-center">Who This Is For</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                title: 'Independent Primary Care Practices',
                points: [
                  'Panels with a high proportion of hypertension or pre-hypertension patients',
                  'Limited staff capacity for proactive outreach between visits',
                  'Looking to qualify for RPM reimbursements without a large technology investment',
                ],
              },
              {
                title: 'Family Medicine Clinics',
                points: [
                  'Managing multi-condition patients across age groups, including elderly patients on multiple medications',
                  'Concerned about medication non-adherence driving avoidable hospitalizations',
                  'Want structured weekly touchpoints without scheduling additional appointments',
                ],
              },
              {
                title: 'Internal Medicine Offices',
                points: [
                  'Treating patients with chronic hypertension, type 2 diabetes, or cardiovascular risk factors',
                  'Need longitudinal blood pressure trend data between quarterly visits',
                  'Seeking a lightweight tool that integrates with existing workflows without EMR changes',
                ],
              },
            ].map(({ title, points }) => (
              <div key={title} className="border border-slate-200 rounded-xl p-8">
                <h3 className="font-semibold text-slate-900 mb-5">{title}</h3>
                <ul className="space-y-3">
                  {points.map(point => (
                    <li key={point} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="demo-form" className="px-8 py-20 bg-slate-50">
        <div className="max-w-md mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-10 text-center">Pricing</h2>
          <div className="border border-slate-200 rounded-xl p-10 bg-white">
            <p className="text-4xl font-bold text-slate-900 text-center">$500<span className="text-lg font-medium text-slate-500">/month per clinic</span></p>
            <ul className="mt-6 mb-8 space-y-3 text-sm text-slate-600">
              {['Unlimited patients', 'Weekly risk alerts', 'Patient check-in forms', 'Email digests', 'RPM billing support'].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-4 text-center">
                <p className="text-green-800 text-sm font-medium">Thank you. We will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: 'clinicName', label: 'Clinic Name', type: 'text', placeholder: 'Riverside Primary Care' },
                  { key: 'doctorName', label: 'Doctor Name', type: 'text', placeholder: 'Dr. Jane Smith' },
                  { key: 'email',      label: 'Email',       type: 'email', placeholder: 'clinic@example.com' },
                  { key: 'phone',      label: 'Phone',       type: 'tel',   placeholder: '(555) 000-0000' },
                  { key: 'patientCount', label: 'Patient Count', type: 'number', placeholder: '250' },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-slate-600 uppercase tracking-wide mb-1.5">{label}</label>
                    <input
                      required
                      type={type}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                ))}
                {status === 'error' && (
                  <p className="text-red-600 text-xs">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-slate-900 hover:bg-slate-700 disabled:opacity-50 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  {status === 'sending' ? 'Sending...' : 'Request Demo'}
                </button>
                <button
                  type="button"
                  onClick={handleTrial}
                  disabled={trialLoading}
                  className="w-full border border-slate-300 hover:border-slate-500 disabled:opacity-50 text-slate-700 text-sm font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  {trialLoading ? 'Redirecting...' : 'Start Free Trial'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-8 py-14 bg-white border-t border-slate-100">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Contact Us</h2>
          <p className="text-slate-600 text-sm">
            Questions? Email us at{' '}
            <a href="mailto:hello@getcaregap.com" className="text-slate-900 font-medium hover:underline">hello@getcaregap.com</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-sm text-center px-8 py-8">
        <p>CareGap — Bridging the gap between clinic visits</p>
        <div className="flex flex-wrap justify-center gap-6 mt-3 text-xs">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/hipaa" className="hover:text-white transition-colors">HIPAA Notice</Link>
        </div>
        <p className="mt-3 text-xs text-slate-500">© 2026 CareGap. All rights reserved.</p>
      </footer>

    </div>
  )
}
