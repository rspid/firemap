import { db } from "@/server/db";
import axios from "axios";

//for java emergency manager
//assigning vehicles to events
export async function POST(request: Request) {
  const res = await request.json();
  const vehicles = res.vehicles;
  const affectedVehicles = await Promise.all(
    vehicles.map(async (vehicle: { id: number; eventId: number }) => {
      const updatedVehicle = await db.vehicle.update({
        where: {
          id: vehicle.id,
        },
        data: {
          is_busy: true,
          events: {
            create: [{ event: { connect: { id: vehicle.eventId } } }],
          },
        },
        include: {
          events: {
            include: {
              event: {
                include: {
                  sensors: {
                    include: {
                      sensor: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return updatedVehicle;
    })
  );
  return Response.json(affectedVehicles);
}

//for simulator
//get all vehicles and their itineraries

export async function GET() {
  const vehicles = await db.vehicle.findMany({
    where: {
      events: {
        some: {
          event: {
            is_over: false,
          },
        },
      },
    },
    include: {
      events: {
        include: {
          event: {
            include: {
              sensors: {
                include: {
                  sensor: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const operationProperties = await Promise.all(
    vehicles.map(async (vehicle) => {
      const maxIntensitySensor = (
        vehicle.events[0]?.event?.sensors || []
      ).reduce(
        (maxSensor: any, oneSensor: any) =>
          oneSensor.sensor.intensity >
          (maxSensor?.intensity || Number.NEGATIVE_INFINITY)
            ? oneSensor.sensor
            : maxSensor,
        null
      );

      const position = `${vehicle.longitude},${vehicle.latitude}`;
      const end = `${maxIntensitySensor.longitude},${maxIntensitySensor.latitude}`;
      const routeProperties = await calculateRouteProperties(position, end);
      return { vehicle_id: vehicle.id, routeProperties };
    })
  );
  return Response.json(operationProperties);
}

//for simulator
//inform that a vehicle has finished its intervention
export async function PUT(request: Request) {
  const params = await request.json();
  if (params.id == null && params.event_id == null) return;
  const updatedVehicle = await db.vehicle.update({
    where: {
      id: params.id,
    },
    data: {
      is_busy: false,
    },
  });
  return Response.json(updatedVehicle);
}

export async function calculateRouteProperties(start: string, end: string) {
  const params = {
    api_key: "5b3ce3597851110001cf624836756510b58a41c69393de284ed59e2e",
    start,
    end,
  };

  const res = await axios.get(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      params,
    }
  );
  return res.data.features[0].properties;
}
