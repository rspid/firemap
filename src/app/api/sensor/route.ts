import { db } from "@/server/db";

//for python gateway
//get all sensors
export async function GET() {
  const res = await db.sensor.findMany();
  return Response.json(res);
}
//for python gateway
//add a new sensor for one event
export async function PUT(request: Request) {
  const res = await request.json();
  const sensors = res.sensors;
  const result = await Promise.all(
    sensors.map(
      async (sensor: { id: number; intensity: number; event_id: number }) => {
        const oneSensor = await db.sensor.update({
          where: {
            id: sensor.id,
          },
          data: {
            intensity: sensor.intensity,
            events: {
              create: [{ event: { connect: { id: sensor.event_id } } }],
            },
          },
          include: {
            events: true,
          },
        });
        return oneSensor;
      }
    )
  );
  return Response.json({ result });
}
