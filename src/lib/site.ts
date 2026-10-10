export const site = {
  name: "JB Fitnet",
  tagline: "One pass. All gyms. Pay only for the days you train.",
  description:
    "One pass for every JB Fitnet partner gym. Pay only for the days you train, keep training when you travel, and see how busy a gym is before you go. Join the waitlist.",
  // Shown on the privacy page and footer. NEXT_PUBLIC_CONTACT_EMAIL overrides it.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "jbfitnet@gmail.com",
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
    a: "Yes. One pass works at every JB Fitnet partner gym, and each visit is charged at that gym's own day rate.",
  },
  {
    q: "Can I see how busy a gym is before I go?",
    a: "Yes. The app shows how many JB Fitnet users are training at each gym right now, so you can choose a quieter gym or a livelier one.",
  },
  {
    q: "Can I train while I'm travelling?",
    a: "Yes. Open the app wherever you are, find the nearest partner gym and check in. It is the same pass, charged at that gym's day rate, so a trip doesn't break your routine.",
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
    a: "Every visit is recorded when a member checks in, and your earnings are credited to you in one payment through the system. Selected gyms also receive payment up front. Exact terms are shared during onboarding.",
  },
  {
    q: "How do members check in at my gym?",
    a: "Your gym gets its own QR code. You print it and place it at the entrance. Members scan it with the JB Fitnet app to check in, and check out in the app when they leave. Every visit is recorded automatically.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes, for the first 10 gyms that join JB Fitnet.",
  },
  {
    q: "What is the JB management system?",
    a: "It is the software partner gyms get from us, so check-ins and payments are handled in one place.",
  },
  {
    q: "Who decides the price?",
    a: "You do. The day rate is your own monthly fee divided by 30.",
  },
  {
    q: "Where do the new members come from?",
    a: "JB Fitnet users see partner gyms near them in the app. That includes people travelling for work, visitors to your area and locals whose own gym is somewhere else that day. They check in with you, often in your quieter hours, and you are paid for the visit.",
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
