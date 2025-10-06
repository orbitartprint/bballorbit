export interface Resource {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "Shooting" | "Offense" | "Defense" | "Conditioning" | "Tools";
  type: "Free" | "Paid";
  price?: string;
  link: string;
  filePath?: string; // Local PDF file path for free resources
}

export const resources: Resource[] = [
  {
    id: "zoom-action",
    title: "Zoom Action",
    description: "A complete guide to the Zoom Action.",
    image: "/lovable-uploads/zoom-action-pdf.webp",
    category: "Offense",
    type: "Free",
    link: "https://guide.bballorbit.com/zoom",
    filePath: "/pdfs/zoom-action.pdf",
  },
  {
    id: "defense-toolkit",
    title: "Run And Jump Defense",
    description: "A complete guide to the Run and Jump Defense.",
    image: "/lovable-uploads/run-and-jump-pdf.webp",
    category: "Defense",
    type: "Free",
    link: "https://guide.bballorbit.com/runandjump",
    filePath: "/pdfs/run-and-jump-defense.pdf",
  },
];

export const categories = ["All", "Shooting", "Offense", "Defense", "Conditioning", "Tools"] as const;
export type CategoryFilter = typeof categories[number];
