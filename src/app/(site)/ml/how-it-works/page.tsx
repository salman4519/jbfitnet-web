import type { Metadata } from "next";
import HowItWorks from "@/views/HowItWorks";

export const metadata: Metadata = {
  title: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
  description: "എല്ലാ പാർട്ണർ ജിമ്മുകൾക്കും ഒറ്റ പാസ്. ചെക്ക്-ഇൻ ചെയ്യൂ, പരിശീലിക്കൂ, ആ ദിവസത്തിന് മാത്രം പണം നൽകൂ.",
};

export default function Page() {
  return <HowItWorks lang="ml" />;
}
