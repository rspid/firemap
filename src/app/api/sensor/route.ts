import { db } from "@/server/db";

export async function GET() {
  console.log("salut");
  const res = await db.sensor.findMany({
    where: {
      intensite: {
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
