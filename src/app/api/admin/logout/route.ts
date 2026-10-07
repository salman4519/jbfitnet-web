import { endSession } from "@/lib/admin";

export async function POST() {
  await endSession();
  return Response.json({ ok: true });
}
