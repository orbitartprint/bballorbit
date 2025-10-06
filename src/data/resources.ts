export interface Resource {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "Shooting" | "Offense" | "Defense" | "Conditioning" | "Tools";
  type: "Free" | "Paid";
  price?: string;
  link: string;
}

export const resources: Resource[] = [
  {
    id: "zoom-action",
    title: "Zoom Action",
    description: "A complete guide to the Zoom Action.",
    image: "/zoom-action-pdf.webp",
    category: "Offense",
    type: "Free",
    link: "https://guide.bballorbit.com/zoom",
  },
  {
    id: "defense-toolkit",
    title: "Run And Jump Defense",
    description: "A complete guide to the Run and Jump Defense.",
    image: "/run-and-jump-pdf.webp",
    category: "Defense",
    type: "Free",
    //type: "Paid",
    //price: "$9.90",
    link: "https://guide.bballorbit.com/runandjump",
  },
];

export const categories = ["All", "Shooting", "Offense", "Defense", "Conditioning", "Tools"] as const;
export type CategoryFilter = typeof categories[number];
