import type { Metadata } from "next";
import ForGyms from "@/views/ForGyms";

export const metadata: Metadata = {
  title: "ജിം ഉടമകൾക്ക്",
  description: "നിങ്ങളുടെ ജിം JB Fitnet-ൽ ചേർക്കൂ. യാത്രക്കാരായ ഉപയോക്താക്കൾ, ഒറ്റ പേയ്‌മെന്റ്, JB മാനേജ്‌മെന്റ് സിസ്റ്റം.",
};

export default function Page() {
  return <ForGyms lang="ml" />;
}
