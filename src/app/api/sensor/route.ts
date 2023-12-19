import { db } from "@/server/db";

export async function GET() {
  const res = await db.sensor.findMany({
    where: {
      intensity: {
        not: 0,
      },
      events: {
        some: {
          event: {
            is_over: false,
          },
        },
      },
    },
  });
  return Response.json(res);
}
