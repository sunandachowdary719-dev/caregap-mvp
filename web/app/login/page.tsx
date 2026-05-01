import Link from 'next/link'

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      <nav className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight hover:text-slate-300 transition-colors">CareGap</Link>
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Back to home</Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-xl p-10 w-full max-w-sm">
          <h1 className="text-xl font-semibold text-slate-900 mb-1">Clinic Login</h1>
          <p className="text-sm text-slate-500 mb-8">Sign in to your CareGap account</p>

          <form className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-600 uppercase tracking-wide mb-1.5">Email</label>
              <input
                type="email"
                placeholder="clinic@example.com"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 uppercase tracking-wide mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-slate-900 text-slate-400 text-sm text-center px-8 py-6">
        CareGap — Bridging the gap between clinic visits
      </footer>

    </div>
  )
}
