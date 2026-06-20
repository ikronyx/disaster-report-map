import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md">
            🌊
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Disaster Report
            </h1>

            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Sri Lanka Live Map
            </p>
          </div>
        </Link>

        <Link
          href="/report"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition-colors"
        >
          <span>+</span>
          Report Incident
        </Link>
      </div>
    </header>
  );
}
