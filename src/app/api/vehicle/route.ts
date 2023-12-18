import { db } from "@/server/db";
import { NextApiRequest, NextApiResponse } from 'next';


export async function GET() {
  console.log("bonjour")
  const res = await db.vehicle.findMany({
    where: {
      is_busy: true,
    },
  });
  return Response.json("bonjour");
}

export async function PUT(request: Request) {
  const params = await request.json()
  if (params.id != null && params.longitude != null && params.latitude != null){
    try {
      const updateVehicle = await db.vehicle.update({
        where: {
          id: params.id,
        },
        data: {
          longitude: params.longitude,
          latitude: params.latitude
        },
      })
      return Response.json(updateVehicle);
    } catch {
      return Response.json("error");
    }
  } return Response.json("error");
}
