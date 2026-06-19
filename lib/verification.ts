import { prisma } from "@/lib/prisma";

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;

  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function calculateVerificationScore(
  type: string,
  latitude: number,
  longitude: number,
) {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const incidents = await prisma.incident.findMany({
    where: {
      type,
      created_at: {
        gte: yesterday,
      },
    },
    select: {
      latitude: true,
      longitude: true,
    },
  });

  const nearby = incidents.filter(
    (incident) =>
      haversineKm(latitude, longitude, incident.latitude, incident.longitude) <=
      1,
  );

  const count = nearby.length + 1;

  if (count >= 5) return 100;
  if (count === 4) return 75;
  if (count === 3) return 50;
  if (count === 2) return 25;

  return 10;
}
