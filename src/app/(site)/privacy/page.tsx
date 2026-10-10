import type { Metadata } from "next";
import Privacy from "@/views/Privacy";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What JB Fitnet collects through the waitlist and how it is used.",
};

export default function Page() {
  return <Privacy lang="en" />;
}
