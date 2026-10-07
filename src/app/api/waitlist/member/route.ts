import { handleSignup, parseMember } from "@/lib/waitlist";

export async function POST(request: Request) {
  return handleSignup(request, "waitlist_members", parseMember);
}
