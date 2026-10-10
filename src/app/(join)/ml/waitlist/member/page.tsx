import type { Metadata } from "next";
import JoinScreen from "@/components/JoinScreen";

export const metadata: Metadata = {
  title: "അംഗമായി ചേരൂ",
  description: "JB Fitnet വെയ്റ്റ്‌ലിസ്റ്റിൽ ചേരൂ; നിങ്ങളുടെ നഗരത്തിൽ തുടങ്ങുമ്പോൾ അറിയിക്കാം.",
};

export default function Page() {
  return <JoinScreen kind="member" lang="ml" />;
}
