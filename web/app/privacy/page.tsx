import Link from 'next/link'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <nav className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight hover:text-slate-300 transition-colors">CareGap</Link>
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">← Back to home</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-12">Effective Date: May 1, 2026</p>

        <div className="space-y-10 text-sm leading-relaxed text-slate-700">

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">1. Overview</h2>
            <p>CareGap ("we," "us," or "our") is a health technology platform designed to support primary care clinics in monitoring patients between scheduled visits. We are committed to protecting the privacy and security of all health information entrusted to us by clinics and patients. This Privacy Policy explains what data we collect, how we use it, and the rights available to individuals whose information we process.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">2. Data We Collect</h2>
            <p className="mb-3">When patients submit weekly check-ins through CareGap, we collect the following categories of information:</p>
            <ul className="space-y-2 pl-4">
              {[
                'Blood pressure readings (systolic and diastolic values)',
                'Medication adherence reports (number of missed doses per week)',
                'Self-reported symptoms (headache, dizziness, chest pain, shortness of breath, blurred vision, fatigue)',
                'Patient name (as registered with the clinic)',
                'Submission timestamp',
              ].map(item => (
                <li key={item} className="flex gap-3"><span className="text-slate-400 shrink-0">—</span>{item}</li>
              ))}
            </ul>
            <p className="mt-3">We do not collect Social Security numbers, insurance information, financial data, or any information not directly relevant to clinical monitoring.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">3. How We Use Your Data</h2>
            <p className="mb-3">All data collected through CareGap is used exclusively for clinical monitoring purposes:</p>
            <ul className="space-y-2 pl-4">
              {[
                'To generate risk assessments (GREEN / YELLOW / RED) for display on the clinic dashboard',
                'To populate the blood pressure trend chart shown to authorized clinic staff',
                'To trigger alerts when patient readings exceed clinical thresholds',
                'To enable clinic staff to prioritize outreach and follow-up care',
              ].map(item => (
                <li key={item} className="flex gap-3"><span className="text-slate-400 shrink-0">—</span>{item}</li>
              ))}
            </ul>
            <p className="mt-3">We do not sell, rent, or share patient data with any third party for advertising, research aggregation, or commercial purposes.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">4. HIPAA Compliance</h2>
            <p>CareGap is designed to operate in compliance with the Health Insurance Portability and Accountability Act (HIPAA). We treat all patient-submitted health information as Protected Health Information (PHI) under HIPAA's Privacy Rule and Security Rule. Clinics using CareGap as a covered entity or business associate are required to execute a Business Associate Agreement (BAA) with CareGap prior to processing live patient data. Please contact us at <a href="mailto:contact@caregap.com" className="text-blue-600 hover:underline">contact@caregap.com</a> to request a BAA.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">5. Data Retention</h2>
            <p>Patient check-in records are retained for a period of <strong>two (2) years</strong> from the date of submission. After this period, records are permanently deleted from our systems. Clinics may request earlier deletion of patient records by contacting us directly.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">6. Your Rights</h2>
            <p className="mb-3">Patients and clinic administrators have the following rights with respect to data held by CareGap:</p>
            <ul className="space-y-2 pl-4">
              {[
                'Right to Access: request a copy of all data associated with a patient name',
                'Right to Deletion: request permanent removal of a patient\'s records from our system',
                'Right to Correction: request correction of inaccurate data entries',
                'Right to Restriction: request that we limit how we use specific data',
              ].map(item => (
                <li key={item} className="flex gap-3"><span className="text-slate-400 shrink-0">—</span>{item}</li>
              ))}
            </ul>
            <p className="mt-3">To exercise any of these rights, submit a written request to <a href="mailto:contact@caregap.com" className="text-blue-600 hover:underline">contact@caregap.com</a>. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">7. Security</h2>
            <p>Patient data is stored in a Supabase-hosted database with row-level access controls, encrypted at rest and in transit using TLS 1.2 or higher. Access to the clinic dashboard is restricted to authorized personnel.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">8. Contact</h2>
            <p>For privacy-related inquiries, data requests, or to report a concern, contact us at:<br /><a href="mailto:contact@caregap.com" className="text-blue-600 hover:underline">contact@caregap.com</a></p>
          </section>

        </div>
      </div>

      <footer className="bg-slate-900 text-slate-400 text-sm text-center px-8 py-8 mt-16">
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
