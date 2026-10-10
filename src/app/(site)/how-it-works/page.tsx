import type { Metadata } from "next";
import HowItWorks from "@/views/HowItWorks";

export const metadata: Metadata = {
  title: "How it works",
  description: "One pass for every partner gym. Check in, train, and pay that gym's monthly fee divided by 30 for the day.",
};

export default function Page() {
  return <HowItWorks lang="en" />;
}
