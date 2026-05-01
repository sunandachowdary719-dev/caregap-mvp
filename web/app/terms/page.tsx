import Link from 'next/link'

export default function Terms() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <nav className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight hover:text-slate-300 transition-colors">CareGap</Link>
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">← Back to home</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-slate-500 text-sm mb-12">Effective Date: May 1, 2026</p>

        <div className="space-y-10 text-sm leading-relaxed text-slate-700">

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">1. Service Description</h2>
            <p>CareGap is a software-as-a-service (SaaS) platform that enables primary care clinics to collect and review patient-reported health data between scheduled appointments. The platform includes a patient check-in form, a clinic monitoring dashboard, blood pressure trend charts, and automated risk stratification. CareGap is a monitoring and communication tool only — it does not provide medical services, clinical diagnoses, or treatment recommendations.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">2. Acceptance of Terms</h2>
            <p>By accessing or using CareGap, you ("Clinic" or "User") agree to be bound by these Terms of Service. If you are accessing CareGap on behalf of a medical practice or organization, you represent that you have authority to bind that organization to these terms.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">3. Clinic Responsibilities</h2>
            <p className="mb-3">Clinics using CareGap are solely responsible for:</p>
            <ul className="space-y-2 pl-4">
              {[
                'Ensuring all clinical staff with dashboard access are properly trained and authorized',
                'Obtaining informed patient consent before enrolling patients in the CareGap check-in program',
                'Reviewing flagged patient data in a timely manner and taking appropriate clinical action',
                'Maintaining the confidentiality of dashboard login credentials',
                'Executing a Business Associate Agreement (BAA) with CareGap prior to processing live PHI',
                'Complying with all applicable federal and state health privacy laws, including HIPAA',
              ].map(item => (
                <li key={item} className="flex gap-3"><span className="text-slate-400 shrink-0">—</span>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">4. Patient Consent Requirements</h2>
            <p>Before a patient's data is entered into CareGap, the enrolling clinic must obtain documented patient consent that includes: (a) a description of what data will be collected and how it will be used; (b) an explanation that data will be visible to authorized clinic staff; (c) notification of the patient's right to withdraw consent and request data deletion; and (d) a reference to CareGap's Privacy Policy at caregap.vercel.app/privacy. CareGap provides a consent disclosure on the check-in form but ultimate responsibility for consent documentation rests with the clinic.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">5. No Medical Diagnosis</h2>
            <p className="font-medium text-slate-800">CareGap does not provide medical advice, diagnoses, or treatment recommendations.</p>
            <p className="mt-2">Risk stratification labels (GREEN, YELLOW, RED) are algorithmic indicators intended to assist clinical workflow prioritization only. They are not diagnostic conclusions. All clinical decisions must be made by licensed healthcare providers. CareGap is not liable for any clinical outcome arising from reliance on platform-generated risk scores.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">6. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, CareGap and its officers, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of revenue, patient harm, or data loss — arising from use of or inability to use the platform. CareGap's total cumulative liability for any claim shall not exceed the amount paid by the clinic in the three months preceding the claim.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">7. Modifications to the Service</h2>
            <p>CareGap reserves the right to modify, suspend, or discontinue any feature of the platform at any time with reasonable notice. Continued use following notification of changes constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">8. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the State of Michigan, without regard to its conflict-of-law provisions. Any disputes arising under these terms shall be resolved in the state or federal courts located in Michigan.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">9. Contact</h2>
            <p>For questions about these terms, contact us at:<br /><a href="mailto:contact@caregap.com" className="text-blue-600 hover:underline">contact@caregap.com</a></p>
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
