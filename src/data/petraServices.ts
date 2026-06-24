export type WebsiteService = {
  title: string;
  description: string;
  badge: string;
};

export const petraServices: WebsiteService[] = [
  {
    title: "Life Insurance",
    description:
      "Coverage designed to protect families, provide peace of mind, and help loved ones stay financially secure.",
    badge: "Core Service",
  },
  {
    title: "Pre-Need Funeral Services",
    description:
      "Planning support that helps families prepare ahead of time with dignity, clarity, and care.",
    badge: "Planning Service",
  },
  {
    title: "Medicare",
    description:
      "Medicare guidance and plan support coming soon for clients who need help understanding their options.",
    badge: "Coming November",
  },
];

export const petraPriceItems = [
  "Life insurance consultations",
  "Pre-need funeral planning quotes",
  "Family protection review",
  "Medicare support coming November",
];