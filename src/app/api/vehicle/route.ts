import { db } from "@/server/db";

export async function GET() {
  const res = await db.vehicle.findMany({
    where: {
      is_busy: true,
    },
  });
  return Response.json(res);
}

export async function PUT() {
  //a faire pour update la position
}
