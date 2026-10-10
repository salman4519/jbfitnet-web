import type { Metadata } from "next";
import Faq from "@/views/Faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "How the JB Fitnet pass, day rates and gym partnerships work.",
};

export default function Page() {
  return <Faq lang="en" />;
}
