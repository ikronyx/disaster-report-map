import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateVerificationScore } from "@/lib/verification";

export async function GET() {
  const incidents = await prisma.incident.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return NextResponse.json(incidents);
}

export async function POST(req: Request) {
  const body = await req.json();

  const score = await calculateVerificationScore(
    body.type,
    body.latitude,
    body.longitude,
  );

  const incident = await prisma.incident.create({
    data: {
      type: body.type,
      description: body.description,
      latitude: body.latitude,
      longitude: body.longitude,
      verification_score: score,
    },
  });

  return NextResponse.json(incident);
}
