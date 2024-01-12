import { db } from "@/server/db";

//for python gateway
//get one sensor
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "No id provided" }, { status: 400 });
  //convert id in to number
  const idNumber = Number(id);
  const sensor = await db.sensor.findUnique({
    where: { id: idNumber },
    include: { events: true },
  });
  return Response.json(sensor);
}
//for python gateway
//add a new sensor for one event
export async function PUT(request: Request) {
  const res = await request.json();
  const sensor = res.sensor;
  const oneSensor = await db.sensor.update({
    where: {
      id: sensor.id,
    },
    data: {
      events: {
        create: [{ event: { connect: { id: sensor.event_id } } }],
      },
    },
    include: {
      events: true,
    },
  });
  return Response.json(oneSensor);
}
