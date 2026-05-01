import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <nav className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight hover:text-slate-300 transition-colors">CareGap</Link>
        <div className="flex gap-6 text-sm font-medium items-center">
          <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">View Dashboard</Link>
          <Link href="/login" className="text-slate-300 hover:text-white transition-colors">Clinic Login</Link>
          <Link href="/checkin" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">Patient Check-in</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-slate-900 text-white px-8 py-20 text-center">
        <h1 className="text-4xl font-bold max-w-2xl mx-auto leading-tight">About CareGap</h1>
        <p className="mt-4 text-slate-300 max-w-xl mx-auto text-lg leading-relaxed">
          Bridging the gap between clinic visits — one check-in at a time.
        </p>
      </section>

      {/* Mission */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">Our Mission</h2>
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            Primary care clinics see their patients for roughly four hours per year. The other 8,756 hours, patients are on their own — managing medications, monitoring blood pressure, noticing symptoms, and making decisions about when to call.
          </p>
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            For patients managing hypertension or diabetes, those unsupervised hours carry real risk. Missed doses accumulate. Blood pressure drifts. Warning signs go unnoticed until they become emergencies.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            CareGap exists to close that gap. We give clinics a lightweight, affordable tool to stay connected to their highest-risk patients between visits — without adding burden to already-stretched clinical workflows.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="px-8 py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-10">How It Works</h2>
          <div className="space-y-6">
            {[
              { n: '1', title: 'Patient checks in weekly', desc: 'Patients submit blood pressure readings, medication adherence, and symptoms through a simple mobile-friendly form. No app download. No account required.' },
              { n: '2', title: 'Risk engine scores the data', desc: 'CareGap evaluates each submission against clinical thresholds — BP ≥ 160/100 flags as critical, ≥ 140/90 with missed doses as elevated. Symptom keywords like chest pain trigger immediate escalation.' },
              { n: '3', title: 'Clinic sees what matters', desc: 'The dashboard surfaces RED patients at the top, updated in real time. Clinic staff know exactly who to call that day — no manual chart review, no missed flags.' },
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

      {/* Team */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-10">Team</h2>
          <div className="border border-slate-200 rounded-xl p-8">
            <h3 className="font-semibold text-slate-900 mb-2">Founder</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              CareGap was founded by a health informatics practitioner with hands-on experience working with HIPAA-regulated patient data in clinical settings. With a background spanning healthcare data pipelines, risk stratification systems, and clinical workflow design, the founder built CareGap to solve a problem witnessed firsthand: the absence of any structured touchpoint between clinic visits for high-risk patients. CareGap is built from clinical context, not engineering abstraction.
            </p>
          </div>
        </div>
      </section>

      {/* Target */}
      <section className="px-8 py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">Who CareGap Is For</h2>
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            CareGap is designed for small to mid-size primary care clinics — typically 1 to 5 providers — managing patient panels that include a significant proportion of patients with hypertension, type 2 diabetes, or both.
          </p>
          <p className="text-slate-700 text-base leading-relaxed mb-4">
            These clinics often lack the resources to implement enterprise-scale remote patient monitoring (RPM) platforms but still bear clinical and financial responsibility for their panels. CareGap offers a practical entry point: a low-friction check-in system that generates actionable risk data without requiring complex EMR integrations or patient app adoption.
          </p>
          <p className="text-slate-700 text-base leading-relaxed">
            For clinics already billing under RPM CPT codes (99453, 99454, 99457), CareGap provides the underlying data infrastructure to support those claims.
          </p>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 text-sm text-center px-8 py-8">
        <p>CareGap — Bridging the gap between clinic visits</p>
        <div className="flex justify-center gap-6 mt-3 text-xs">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/hipaa" className="hover:text-white transition-colors">HIPAA Notice</Link>
        </div>
        <p className="mt-3 text-xs text-slate-500">© 2026 CareGap. All rights reserved.</p>
      </footer>
    </div>
  )
}
