import { db } from "@/server/db";

export async function GET() {
  const res = await db.event.findMany({
    where: {
      is_over: false,
      sensors: {
        every: {
          sensor: {
            intensity: 0,
          },
        },
      },
      vehicles: {
        every: {
          on_site: true,
          vehicle: {
            is_busy: true,
          },
        },
      },
    },
    include: {
      sensors: {
        include: {
          sensor: true,
        },
      },
      vehicles: {
        include: {
          vehicle: true,
        },
      },
    },
  });
  return Response.json(res);
}

export async function PUT(request: Request) {
  const res = await request.json();
  const event = res.event;
  const updatedEvent = await db.event.update({
    where: {
      id: event,
    },
    data: {
      is_over: true,
    },
  });

  return Response.json({ updatedEvent });
}
