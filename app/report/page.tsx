import Header from "@/components/Header";
import IncidentForm from "@/components/IncidentForm";

export default function ReportPage() {
  return (
    <>
      <Header />

      <main className="max-w-2xl mx-auto p-4">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Report Incident</h2>

          <IncidentForm />
        </div>
      </main>
    </>
  );
}
