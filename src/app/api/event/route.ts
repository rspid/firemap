import { db } from "@/server/db";

// for python gateway
// update sensors intensity and create new events
export async function POST(request: Request) {
  const res = await request.json();
  const sensors = res.sensors;
  const result = await Promise.all(
    sensors.map(async (sensor: { id: number; intensity: number }) => {
      const oneSensor = await db.sensor.findUnique({
        where: {
          id: sensor.id,
        },
      });
      if (!oneSensor) return;

      const createNewEvent = sensor.intensity > 0;

      const sensorUpdated = await db.sensor.update({
        where: {
          id: sensor.id,
        },
        data: {
          intensity: sensor.intensity,
          events: createNewEvent
            ? {
                create: [{ event: { create: { is_over: false } } }],
              }
            : undefined,
        },
        include: {
          events: true,
        },
      });

      return sensorUpdated;
    })
  );

  return Response.json({ result });
}
