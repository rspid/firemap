import { db } from "@/server/db";

export async function PUT(request: Request) {
  const res = await request.json();
  const events = res.events;
  const result = await Promise.all(
    events.map(async (event: { id: number; vehicles: number[] }) => {
      const affectedVehicles = await db.vehicle.findMany({
        where: {
          id: {
            in: event.vehicles,
          },
        },
      });

      const createdVehicleOnEvents = await db.vehiclesOnEvents.createMany({
        data: affectedVehicles.map((vehicle) => ({
          event_id: event.id,
          vehicle_id: vehicle.id,
        })),
      });

      return createdVehicleOnEvents;
    })
  );

  return Response.json({ result });
}
