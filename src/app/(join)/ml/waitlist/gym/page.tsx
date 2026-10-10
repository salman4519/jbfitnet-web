import type { Metadata } from "next";
import JoinScreen from "@/components/JoinScreen";

export const metadata: Metadata = {
  title: "നിങ്ങളുടെ ജിം ചേർക്കൂ",
  description: "നിങ്ങളുടെ ജിം JB Fitnet പാർട്ണർ വെയ്റ്റ്‌ലിസ്റ്റിൽ ചേർക്കൂ.",
};

export default function Page() {
  return <JoinScreen kind="gym" lang="ml" />;
}
