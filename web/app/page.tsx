import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">

      {/* Nav */}
      <nav className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between">
        <span className="text-lg font-semibold tracking-tight">CareGap</span>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">View Dashboard</Link>
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

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-sm text-center px-8 py-8">
        CareGap — Bridging the gap between clinic visits
      </footer>

    </div>
  )
}
