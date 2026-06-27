"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import UserLocation from "./UserLocation";
import "leaflet/dist/leaflet.css";

type Incident = {
  id: string;
  type: string;
  description: string;
  latitude: number;
  longitude: number;
  verification_score: number;
  created_at?: string | Date;
};

type Props = {
  incidents: Incident[];
};

function createIcon(iconPath: string) {
  return new L.Icon({
    iconUrl: iconPath,
    shadowUrl: "/markers/marker-shadow.png",

    iconSize: [36, 36],
    iconAnchor: [18, 36],

    popupAnchor: [0, -36],

    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });
}

const disasterIcons: Record<string, L.Icon> = {
  Flood: createIcon("/markers/flood.png"),

  "Road Block": createIcon("/markers/road-block.png"),

  "Fallen Tree": createIcon("/markers/fallen-tree.png"),

  "Power Outage": createIcon("/markers/power-outage.png"),

  Landslide: createIcon("/markers/landslide.png"),

  "Building Collapse": createIcon("/markers/building-collapse.png"),

  "Water Logging": createIcon("/markers/water-logging.png"),

  "Bridge Damage": createIcon("/markers/bridge-damage.png"),

  Wildfire: createIcon("/markers/wildfire.png"),

  "Strong Winds": createIcon("/markers/strong-winds.png"),

  "Storm Damage": createIcon("/markers/storm-damage.png"),

  "Electric Pole Down": createIcon("/markers/electric-pole-down.png"),

  "Drain Overflow": createIcon("/markers/drain-overflow.png"),

  "Accident Causing Obstruction": createIcon("/markers/accident.png"),
};

const defaultIcon = createIcon("/markers/default.png");

export default function MapView({ incidents }: Props) {
  const [userLatitude, setUserLatitude] = useState<number | null>(null);

  const [userLongitude, setUserLongitude] = useState<number | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLatitude(position.coords.latitude);
        setUserLongitude(position.coords.longitude);
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  }, []);

  return (
    <MapContainer
      center={[6.90276, 79.912561]}
      zoom={16}
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <UserLocation latitude={userLatitude} longitude={userLongitude} />

      {incidents.map((incident) => (
        <Marker
          key={incident.id}
          position={[incident.latitude, incident.longitude]}
          icon={disasterIcons[incident.type] ?? defaultIcon}
        >
          <Popup>
            <div className="min-w-55 space-y-2">
              <div className="font-bold text-lg">{incident.type}</div>

              <p className="text-sm text-slate-700">{incident.description}</p>

              <div className="text-sm">
                <span className="font-semibold">Verification:</span>{" "}
                {incident.verification_score}%
              </div>

              {incident.created_at && (
                <div className="text-xs text-slate-500">
                  {new Date(incident.created_at).toLocaleString()}
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
