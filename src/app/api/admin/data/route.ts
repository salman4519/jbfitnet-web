import { isAdmin } from "@/lib/admin";
import { DatabaseNotConfiguredError, getDb } from "@/lib/mongodb";

export async function GET() {
  if (!(await isAdmin())) {
    return Response.json({ error: "Sign in required." }, { status: 401 });
  }

  try {
    const db = await getDb();
    const [members, gyms] = await Promise.all([
      db.collection("waitlist_members").find().sort({ created_at: -1 }).toArray(),
      db.collection("waitlist_gyms").find().sort({ created_at: -1 }).toArray(),
    ]);
    const plain = (docs: typeof members) => docs.map(({ _id, ...rest }) => ({ id: String(_id), ...rest }));
    return Response.json(
      { members: plain(members), gyms: plain(gyms) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    if (err instanceof DatabaseNotConfiguredError) {
      return Response.json({ error: "The database isn't connected. Add MONGODB_URI to the environment." }, { status: 503 });
    }
    console.error("Admin data fetch failed:", err);
    return Response.json({ error: "Could not load the waitlist data." }, { status: 500 });
  }
}
