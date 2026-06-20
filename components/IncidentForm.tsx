"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

import LocationPicker from "@/components/LocationPicker";

const ReportMap = dynamic(() => import("@/components/ReportMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] flex items-center justify-center border rounded-xl">
      Loading map...
    </div>
  ),
});

export default function IncidentForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  type LocationMode = "gps" | "map" | "manual";

  const [locationMode, setLocationMode] = useState<LocationMode>("map");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (latitude === null || longitude === null) {
      alert("Please select a location.");
      return;
    }

    try {
      setLoading(true);

      const form = new FormData(e.currentTarget);

      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: form.get("type"),
          description: form.get("description"),
          latitude,
          longitude,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to submit incident.");
    } finally {
      setLoading(false);
    }
  }

  async function useCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      () => {
        alert(
          "Unable to retrieve your location. Please allow location access.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  }

  useEffect(() => {
    if (locationMode === "gps") {
      useCurrentLocation();
    }
  }, [locationMode]);

  return (
    <form onSubmit={submit} className="space-y-4">
      <select name="type" required className="w-full border rounded-lg p-3">
        <option value="">Select Incident</option>

        <option>Flood</option>
        <option>Road Block</option>
        <option>Fallen Tree</option>
        <option>Power Outage</option>
        <option>Landslide</option>
        <option>Building Collapse</option>
        <option>Water Logging</option>
        <option>Bridge Damage</option>
        <option>Wildfire</option>
        <option>Strong Winds</option>
        <option>Storm Damage</option>
        <option>Electric Pole Down</option>
        <option>Drain Overflow</option>
        <option>Accident Causing Obstruction</option>
      </select>

      <textarea
        name="description"
        required
        rows={4}
        placeholder="Describe what happened..."
        className="w-full border rounded-lg p-3"
      />

      <div className="space-y-4">
        <label className="font-medium">Location Method</label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setLocationMode("gps")}
            className={`border rounded-lg p-3 text-sm ${
              locationMode === "gps" ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            📍 Use My Location
          </button>

          <button
            type="button"
            onClick={() => setLocationMode("map")}
            className={`border rounded-lg p-3 text-sm ${
              locationMode === "map" ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            🗺️ Pick On Map
          </button>

          <button
            type="button"
            onClick={() => setLocationMode("manual")}
            className={`border rounded-lg p-3 text-sm ${
              locationMode === "manual" ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            ⌨️ Manual Entry
          </button>
        </div>

        {locationMode === "gps" && (
          <div className="rounded-lg border p-4 bg-slate-50">
            <p className="text-sm text-slate-600">
              Using your current location.
            </p>

            <button
              type="button"
              onClick={useCurrentLocation}
              className="mt-2 text-blue-600 text-sm"
            >
              Refresh Location
            </button>
          </div>
        )}

        {locationMode === "manual" && (
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              className="border rounded-lg p-3"
              value={latitude ?? ""}
              onChange={(e) => setLatitude(Number(e.target.value))}
            />

            <input
              type="number"
              step="any"
              placeholder="Longitude"
              className="border rounded-lg p-3"
              value={longitude ?? ""}
              onChange={(e) => setLongitude(Number(e.target.value))}
            />
          </div>
        )}

        {locationMode === "map" && (
          <div className="overflow-hidden rounded-xl border">
            <ReportMap
              onLocationSelect={(lat, lng) => {
                setLatitude(lat);
                setLongitude(lng);
              }}
            />
          </div>
        )}

        {latitude !== null && longitude !== null && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3">
            <div className="text-sm">
              <strong>Selected Location</strong>
            </div>

            <div className="text-sm text-gray-700">
              Latitude: {latitude.toFixed(5)}
            </div>

            <div className="text-sm text-gray-700">
              Longitude: {longitude.toFixed(5)}
            </div>
          </div>
        )}
      </div>

      <input type="hidden" name="latitude" value={latitude ?? ""} />

      <input type="hidden" name="longitude" value={longitude ?? ""} />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}
