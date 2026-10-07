import { handleSignup, parseGym } from "@/lib/waitlist";

export async function POST(request: Request) {
  return handleSignup(request, "waitlist_gyms", parseGym);
}
