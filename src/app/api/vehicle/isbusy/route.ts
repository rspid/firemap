import { db } from "@/server/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "No id provided" }, { status: 400 });

  const idNumber = Number(id);
  const vehicle = await db.vehicle.findUnique({
    where: { id: idNumber },
  });

  if (!vehicle) {
    return Response.json({ error: "Event not found" }, { status: 404 });
  }

  return Response.json({ vehicle });
}
