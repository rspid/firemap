import { db } from "@/server/db";

export async function POST(request: Request) {
  const res = await request.json();
  const sensor = res.sensor;
  const oneSensor = await db.sensor.findUnique({
    where: {
      id: sensor,
    },
  });
  if (!oneSensor) return;

  const sensorUpdated = await db.sensor.update({
    where: {
      id: oneSensor.id,
    },
    data: {
      events: {
        create: [{ event: { create: { is_over: false } } }],
      },
    },
    include: {
      events: true,
    },
  });

  return Response.json({ sensorUpdated });
}

//for emergency manager
//get all events
export async function GET() {
  const res = await db.event.findMany({
    where: {
      is_over: false,
    },
    include: {
      sensors: {
        include: {
          sensor: true,
        },
      },
    },
  });
  return Response.json(res);
}
