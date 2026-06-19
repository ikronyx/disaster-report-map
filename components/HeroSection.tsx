import Link from "next/link";
export default function HeroSection() {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-8">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold">Disaster Report Map</h1>

          <p className="text-slate-600 mt-3 max-w-xl">
            Community-powered disaster reporting platform for floods, road
            blocks, fallen trees and power outages across Sri Lanka.
          </p>
        </div>

        <Link
          href="/report"
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium"
        >
          Report Incident
        </Link>
      </div>
    </div>
  );
}
