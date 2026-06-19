"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IncidentForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.currentTarget);

    await fetch("/api/incidents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: form.get("type"),
        description: form.get("description"),
        latitude: Number(form.get("latitude")),
        longitude: Number(form.get("longitude")),
      }),
    });

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <select name="type" required className="border p-2 w-full">
        <option value="">Select Incident</option>

        <option>Flood</option>

        <option>Road Block</option>

        <option>Fallen Tree</option>

        <option>Power Outage</option>
      </select>

      <textarea
        name="description"
        required
        placeholder="Description"
        className="border p-2 w-full"
      />

      <input
        name="latitude"
        type="number"
        step="any"
        required
        placeholder="Latitude"
        className="border p-2 w-full"
      />

      <input
        name="longitude"
        type="number"
        step="any"
        required
        placeholder="Longitude"
        className="border p-2 w-full"
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
