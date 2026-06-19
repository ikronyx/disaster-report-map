"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center">
      Loading map...
    </div>
  ),
});

export default function MapSection({ incidents }: { incidents: any[] }) {
  return <MapView incidents={incidents} />;
}
