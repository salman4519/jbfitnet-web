import type { Metadata } from "next";
import WaitlistChooser from "@/views/WaitlistChooser";

export const metadata: Metadata = {
  title: "വെയ്റ്റ്‌ലിസ്റ്റിൽ ചേരൂ",
  description: "പരിശീലിക്കുന്നയാളായോ ജിം ഉടമയായോ JB Fitnet വെയ്റ്റ്‌ലിസ്റ്റിൽ ചേരൂ.",
};

export default function Page() {
  return <WaitlistChooser lang="ml" />;
}
