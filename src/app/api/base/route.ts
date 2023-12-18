import { db } from "@/server/db";

export async function GET() {
  const res = await db.base.findMany();
  return Response.json(res);
}
