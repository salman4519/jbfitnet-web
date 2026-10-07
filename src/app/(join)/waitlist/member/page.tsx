import type { Metadata } from "next";
import JoinScreen from "@/components/JoinScreen";

export const metadata: Metadata = {
  title: "Join as a member",
  description: "Join the JB Fitnet waitlist and be told when pay-by-the-day gym access opens in your city.",
};

export default function Page() {
  return <JoinScreen kind="member" />;
}
