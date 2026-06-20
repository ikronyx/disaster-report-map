"use client";

import { useMapEvents, Marker } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

type Props = {
  onLocationSelect: (lat: number, lng: number) => void;
};

export default function LocationPicker({ onLocationSelect }: Props) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      setPosition([lat, lng]);

      onLocationSelect(lat, lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}
