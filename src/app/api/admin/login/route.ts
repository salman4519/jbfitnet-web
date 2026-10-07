import { adminConfigured, passwordMatches, startSession } from "@/lib/admin";

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return Response.json({ error: "Admin access isn't set up. Add ADMIN_PASSWORD to the environment." }, { status: 503 });
  }

  let password = "";
  try {
    password = String((await request.json()).password ?? "");
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!passwordMatches(password)) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return Response.json({ error: "Wrong password." }, { status: 401 });
  }

  await startSession();
  return Response.json({ ok: true });
}
