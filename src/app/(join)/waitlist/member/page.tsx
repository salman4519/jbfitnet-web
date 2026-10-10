import type { Metadata } from "next";
import JoinScreen from "@/components/JoinScreen";

export const metadata: Metadata = {
  title: "Join as a member",
  description: "Join the JB Fitnet waitlist and be told when it opens in your city.",
};

export default function Page() {
  return <JoinScreen kind="member" lang="en" />;
}
