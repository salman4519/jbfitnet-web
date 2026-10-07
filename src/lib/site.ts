export const site = {
  name: "JB Fitnet",
  tagline: "One wallet. Many gyms. Pay only for the days you train.",
  description:
    "Top up your JB Fitnet wallet and train at any partner gym. You pay that gym's day rate only on the days you go. Join the waitlist.",
  // Shown on the privacy page and footer once set.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

export const nav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-gyms", label: "For gyms" },
  { href: "/faq", label: "FAQ" },
];

export type Faq = { q: string; a: string };

export const memberFaqs: Faq[] = [
  {
    q: "What happens if I don't go to the gym?",
    a: "Nothing is charged. Your wallet is only debited on a day you check in at a partner gym. The rest of your balance stays where it is.",
  },
  {
    q: "How is the day rate worked out?",
    a: "It is the gym's monthly fee divided by 30. A gym that charges ₹1,500 a month costs ₹50 for the day.",
  },
  {
    q: "Can I use more than one gym?",
    a: "Yes. One wallet works at every JB Fitnet partner gym, and each visit is charged at that gym's own day rate.",
  },
  {
    q: "Can I train while I'm travelling?",
    a: "Yes. Open the app wherever you are, find the nearest partner gym and check in. It is the same wallet, charged at that gym's day rate, so a trip doesn't break your routine.",
  },
  {
    q: "Is this a membership?",
    a: "No. There is no monthly plan to buy. You add money to a wallet and spend it one training day at a time.",
  },
  {
    q: "When and where are you launching?",
    a: "We haven't announced cities or dates yet. Join the waitlist with your city and we will message you when JB Fitnet opens there.",
  },
];

export const gymFaqs: Faq[] = [
  {
    q: "How does my gym get paid?",
    a: "Members top up their wallet before they visit, so each check-in is paid from prepaid money. Settlement timing and commercial terms are shared with every gym during onboarding.",
  },
  {
    q: "Who decides the price?",
    a: "You do. The day rate is your own monthly fee divided by 30.",
  },
  {
    q: "Where do the new members come from?",
    a: "JB Fitnet users see partner gyms near them in the app. That includes people travelling for work, visitors to your area and locals whose own gym is somewhere else that day. They check in with you and you are paid for the visit.",
  },
  {
    q: "Will this replace my existing memberships?",
    a: "No. Your regular members stay as they are. JB Fitnet brings in people who would not buy a full month: travellers, shift workers and people trying a new area.",
  },
  {
    q: "How do I join?",
    a: "Add your gym to the partner waitlist. Our team will contact you when partner onboarding begins in your city.",
  },
];
