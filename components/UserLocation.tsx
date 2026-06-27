"use client";

import { useEffect } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const userIcon = new L.Icon({
  iconUrl: "/markers/user-location.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

type Props = {
  latitude: number | null;
  longitude: number | null;
};

export default function UserLocation({ latitude, longitude }: Props) {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.flyTo([latitude, longitude], 14, {
        duration: 1.5,
      });
    }
  }, [latitude, longitude, map]);

  if (!latitude || !longitude) {
    return null;
  }

  return (
    <Marker position={[latitude, longitude]} icon={userIcon}>
      <button
        onClick={() => {
          navigator.geolocation.getCurrentPosition((position) => {
            map.flyTo(
              [position.coords.latitude, position.coords.longitude],
              14,
            );
          });
        }}
      >
        Locate Me
      </button>
      <Popup>Your Location</Popup>
    </Marker>
  );
}
