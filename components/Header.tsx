import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
        <h1 className="font-bold text-xl">Disaster Report Map</h1>

        <Link
          href="/report"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Report Incident
        </Link>
      </div>
    </header>
  );
}
