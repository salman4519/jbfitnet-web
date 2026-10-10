import type { Metadata } from "next";
import WaitlistChooser from "@/views/WaitlistChooser";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description: "Join the JB Fitnet waitlist as someone who trains or as a gym owner.",
};

export default function Page() {
  return <WaitlistChooser lang="en" />;
}
