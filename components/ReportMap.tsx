"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationPicker from "./LocationPicker";

type Props = {
  onLocationSelect: (lat: number, lng: number) => void;
};

export default function ReportMap({ onLocationSelect }: Props) {
  return (
    <MapContainer
      center={[7.8731, 80.7718]}
      zoom={8}
      style={{
        height: "350px",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LocationPicker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
}
