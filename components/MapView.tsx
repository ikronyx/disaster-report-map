"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

type Props = {
  incidents: any[];
};

export default function MapView({ incidents }: Props) {
  return (
    <MapContainer
      center={[7.8731, 80.7718]}
      zoom={8}
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {incidents.map((incident) => (
        <Marker
          key={incident.id}
          position={[incident.latitude, incident.longitude]}
        >
          <Popup>
            <div className="space-y-1">
              <strong>{incident.type}</strong>

              <p>{incident.description}</p>

              <p>Verification: {incident.verification_score}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
