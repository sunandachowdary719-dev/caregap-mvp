import Link from 'next/link'

export default function Hipaa() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <nav className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight hover:text-slate-300 transition-colors">CareGap</Link>
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">← Back to home</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">HIPAA Notice of Privacy Practices</h1>
        <p className="text-slate-500 text-sm mb-4">Effective Date: May 1, 2026</p>
        <div className="bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 mb-12 text-sm text-slate-600">
          <strong className="text-slate-800">THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.</strong>
        </div>

        <div className="space-y-10 text-sm leading-relaxed text-slate-700">

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">1. What Is Protected Health Information (PHI)?</h2>
            <p>Protected Health Information (PHI) is any individually identifiable health information that relates to your past, present, or future physical or mental health condition; the provision of healthcare to you; or the payment for that care. Within CareGap, PHI includes your name combined with any of the following data elements you submit through the patient check-in form:</p>
            <ul className="space-y-2 pl-4 mt-3">
              {[
                'Blood pressure readings (systolic and diastolic)',
                'Medication adherence reports',
                'Self-reported symptoms',
                'Submission timestamps',
              ].map(item => (
                <li key={item} className="flex gap-3"><span className="text-slate-400 shrink-0">—</span>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">2. How CareGap Uses and Discloses PHI</h2>
            <p className="mb-3">CareGap uses PHI only for the following purposes:</p>
            <ul className="space-y-3 pl-4">
              {[
                { title: 'Treatment Support', desc: 'Sharing your health data with the licensed clinicians at your enrolled clinic to support monitoring, outreach, and care coordination.' },
                { title: 'Risk Stratification', desc: 'Calculating automated risk levels (GREEN, YELLOW, RED) based on your submitted readings to help your clinic prioritize follow-up.' },
                { title: 'Trend Analysis', desc: 'Displaying blood pressure trends over time to authorized clinic staff for longitudinal monitoring.' },
                { title: 'Platform Operations', desc: 'Storing data securely and maintaining system integrity. CareGap does not use PHI for advertising, research aggregation, or sale to third parties.' },
              ].map(({ title, desc }) => (
                <li key={title} className="flex gap-3"><span className="text-slate-400 shrink-0">—</span><span><strong className="text-slate-800">{title}:</strong> {desc}</span></li>
              ))}
            </ul>
            <p className="mt-4">CareGap will not disclose your PHI to any party outside your enrolled clinic without your written authorization, except as required by law (e.g., court order, public health reporting obligation).</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">3. Your Rights Regarding PHI</h2>
            <p className="mb-3">Under HIPAA, you have the following rights with respect to your health information held by CareGap:</p>
            <ul className="space-y-3 pl-4">
              {[
                { title: 'Right to Access', desc: 'Request a copy of your PHI held in CareGap.' },
                { title: 'Right to Amend', desc: 'Request correction of inaccurate or incomplete PHI.' },
                { title: 'Right to Restrict', desc: 'Request restrictions on certain uses or disclosures of your PHI.' },
                { title: 'Right to an Accounting', desc: 'Request a list of disclosures of your PHI made by CareGap.' },
                { title: 'Right to Delete', desc: 'Request deletion of your PHI from CareGap\'s systems. Deletion requests will be honored within 30 days.' },
                { title: 'Right to File a Complaint', desc: 'File a complaint if you believe your privacy rights have been violated.' },
              ].map(({ title, desc }) => (
                <li key={title} className="flex gap-3"><span className="text-slate-400 shrink-0">—</span><span><strong className="text-slate-800">{title}:</strong> {desc}</span></li>
              ))}
            </ul>
            <p className="mt-3">To exercise any right, submit a written request to <a href="mailto:hello@getcaregap.com" className="text-blue-600 hover:underline">hello@getcaregap.com</a>.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">4. Complaint Process</h2>
            <p>If you believe CareGap has violated your HIPAA privacy rights, you may:</p>
            <ul className="space-y-2 pl-4 mt-3">
              <li className="flex gap-3"><span className="text-slate-400 shrink-0">—</span>File a complaint directly with CareGap at <a href="mailto:hello@getcaregap.com" className="text-blue-600 hover:underline">hello@getcaregap.com</a></li>
              <li className="flex gap-3"><span className="text-slate-400 shrink-0">—</span>File a complaint with the U.S. Department of Health and Human Services (HHS) Office for Civil Rights at <span className="font-medium text-slate-800">www.hhs.gov/ocr/privacy</span></li>
            </ul>
            <p className="mt-3">CareGap will not retaliate against you for filing a complaint.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">5. Business Associate Agreements</h2>
            <p>CareGap operates as a Business Associate under HIPAA for clinics that are Covered Entities. Before any clinic may use CareGap to process live patient PHI, a signed Business Associate Agreement (BAA) must be in place between the clinic and CareGap. To request a BAA, contact us at <a href="mailto:hello@getcaregap.com" className="text-blue-600 hover:underline">hello@getcaregap.com</a>. The BAA governs our respective obligations with respect to the safeguarding, use, and disclosure of PHI.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">6. Changes to This Notice</h2>
            <p>CareGap reserves the right to amend this Notice of Privacy Practices at any time. The updated notice will be posted at caregap.vercel.app/hipaa with a revised effective date.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">7. Contact</h2>
            <p>Privacy Officer, CareGap<br /><a href="mailto:hello@getcaregap.com" className="text-blue-600 hover:underline">hello@getcaregap.com</a></p>
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
