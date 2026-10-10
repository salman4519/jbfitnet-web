import type { Metadata } from "next";
import Privacy from "@/views/Privacy";

export const metadata: Metadata = {
  title: "സ്വകാര്യത",
  description: "വെയ്റ്റ്‌ലിസ്റ്റ് വഴി JB Fitnet ശേഖരിക്കുന്ന വിവരങ്ങളും അവയുടെ ഉപയോഗവും.",
};

export default function Page() {
  return <Privacy lang="ml" />;
}
