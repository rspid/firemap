import { db } from "@/server/db";

export async function GET() {
  const vehicles = await db.vehicle.findMany({
    where: {
      is_busy: false,
      events: {
        some: {
          event: {
            is_over: true,
          },
          on_site: true,
        },
      },
    },
    include: {
      events: {
        include: {
          event: true,
        },
      },
    },
  });
  return Response.json(vehicles);
}
