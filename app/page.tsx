import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import RecentReportsTable from "@/components/RecentReportsTable";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";

export default async function HomePage() {
  // const incidents = await prisma.incident.findMany({
  //   orderBy: {
  //     created_at: "desc",
  //   },
  //   take: 20,
  // });

  const [incidents, totalReports, floodReports, roadBlocks, powerOutages] =
    await Promise.all([
      prisma.incident.findMany({
        orderBy: {
          created_at: "desc",
        },
        take: 20,
      }),
      prisma.incident.count(),
      prisma.incident.count({
        where: { type: "Flood" },
      }),
      prisma.incident.count({
        where: { type: "Road Block" },
      }),
      prisma.incident.count({
        where: { type: "Power Outage" },
      }),
    ]);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {/* <HeroSection /> */}

          {/* <StatsCards />

          <MapSection />

          <RecentReportsTable /> */}

          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-xl font-semibold">Live Incident Map</h2>

              <p className="text-sm text-slate-500">Active community reports</p>
            </div>

            <MapSection incidents={incidents} />
          </div>
        </div>
      </main>
    </>
  );
}
