import type { Metadata } from "next";
import JoinScreen from "@/components/JoinScreen";

export const metadata: Metadata = {
  title: "Add your gym",
  description: "Add your gym to the JB Fitnet partner waitlist.",
};

export default function Page() {
  return <JoinScreen kind="gym" />;
}
