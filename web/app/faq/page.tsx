import Link from 'next/link'

const faqs = [
  {
    q: 'What is CareGap?',
    a: 'CareGap is a remote patient monitoring platform designed for small primary care clinics. It gives patients a simple weekly check-in form to submit blood pressure readings, medication adherence, and symptoms. Clinic staff see the results on a live dashboard with automated risk stratification — so they know which patients to call without manual chart review.',
  },
  {
    q: 'Is CareGap HIPAA compliant?',
    a: 'Yes. CareGap treats all patient-submitted data as Protected Health Information (PHI) under HIPAA\'s Privacy and Security Rules. Patient data is encrypted in transit and at rest, and access to the clinic dashboard is restricted to authorized personnel. Clinics must sign a Business Associate Agreement (BAA) with CareGap before processing live patient data. Contact us at hello@getcaregap.com to request a BAA.',
  },
  {
    q: 'How do patients check in?',
    a: 'Patients visit caregap.vercel.app/checkin on any device — phone, tablet, or desktop — and fill out a short form. No app download is required and no account is needed. The form takes under 60 seconds and asks for blood pressure readings, medication adherence for the week, and any symptoms. Check-in data appears on the clinic dashboard immediately after submission.',
  },
  {
    q: 'What conditions does CareGap monitor?',
    a: 'CareGap is currently optimized for hypertension (high blood pressure) and medication adherence monitoring, which are the most common factors driving preventable hospital admissions in primary care panels. The platform supports clinics managing patients with hypertension, type 2 diabetes, heart disease, or any condition requiring regular blood pressure tracking and medication compliance. The risk engine flags readings above 140/90 as elevated and 160/100 as critical.',
  },
  {
    q: 'How much does CareGap cost?',
    a: 'CareGap costs $500 per month per clinic. This includes unlimited patients, weekly risk alerts, patient check-in forms, email digests for clinic staff, and RPM billing support. There are no per-patient fees and no setup costs. For clinics billing under Remote Patient Monitoring (RPM) CPT codes 99453, 99454, and 99457, the platform typically pays for itself many times over in the first month of reimbursements.',
  },
  {
    q: 'Do you integrate with EHR systems?',
    a: 'CareGap does not currently require or offer direct EHR integration. The dashboard is a standalone web application that clinic staff access independently. Check-in data and risk scores can be referenced during patient calls or visits without needing to import data into the EHR. We plan to offer HL7 FHIR export in a future release for clinics that want to pull CareGap data into their existing systems.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most clinics are fully operational within one business day. Setup involves: (1) signing the BAA, (2) providing your patient list so names populate the check-in form, and (3) sharing the check-in URL with patients via text, email, or a printed card. There is no software to install, no IT involvement required, and no training beyond a 15-minute walkthrough of the dashboard.',
  },
  {
    q: 'What is RPM billing and how does CareGap support it?',
    a: 'Remote Patient Monitoring (RPM) is a Medicare and most commercial insurance billing category that reimburses clinics for monitoring patients outside of office visits. The core CPT codes are 99453 (device setup), 99454 (monthly device supply), and 99457 (20 minutes of remote monitoring per month). A clinic with 20 qualifying RPM patients can generate $2,000–$4,000 per month in additional reimbursements. CareGap provides the data infrastructure — weekly check-ins, timestamped submissions, and documented patient engagement — that supports these billing claims. We recommend working with your billing team or an RPM billing specialist to maximize reimbursements.',
  },
]

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <nav className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight hover:text-slate-300 transition-colors">CareGap</Link>
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">← Back to home</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-slate-500 text-sm mb-12">Everything you need to know about CareGap.</p>

        <div className="space-y-8">
          {faqs.map(({ q, a }) => (
            <div key={q} className="border-b border-slate-100 pb-8">
              <h2 className="font-semibold text-slate-900 mb-3">{q}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
          <p className="text-slate-700 text-sm mb-2 font-medium">Still have questions?</p>
          <p className="text-slate-500 text-sm">
            Email us at{' '}
            <a href="mailto:hello@getcaregap.com" className="text-blue-600 hover:underline">hello@getcaregap.com</a>
            {' '}and we will respond within one business day.
          </p>
        </div>
      </div>

      <footer className="bg-slate-900 text-slate-400 text-sm text-center px-8 py-8 mt-8">
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
