export interface Resource {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "Shooting" | "Offense" | "Defense" | "Conditioning" | "SSGs" | "Tools";
  type: "Free" | "Paid";
  price?: string;
  link: string;
  uid?: string;
  filePath?: string; // Local PDF file path for free resources
}

export const resources: Resource[] = [
  //{
  //  id: "pnr-cheat-sheet",
  //  title: "Pick & Roll Cheat Sheet",
  //  description: "Offensive solutions vs common screen coverages.",
  //  image: "/lovable-uploads/pnr-cheat-sheet-pdf.webp",
  //  category: "Offense",
  //  type: "Free",
  //  link: "https://guide.bballorbit.com/pnr-cheat-sheet",
  //  uid: "a45561de56",
  //  filePath: "/pdfs/pnr-cheat-sheet.pdf",
  //},
  {
    id: "press-break",
    title: "How to Break Any Press",
    description: "A Principle-Based Framework.",
    image: "/lovable-uploads/press-break-pdf.webp",
    category: "Offense",
    type: "Free",
    link: "https://guide.bballorbit.com/press-break",
    uid: "d8c8368400",
    filePath: "/pdfs/how-to-break-any-press.pdf",
  },
  {
    id: "ssg-playbook",
    title: "The Ultimate SSG Playbook",
    description: "100+ Competitive, Game-Like Drills and SSGs.",
    image: "/lovable-uploads/playbook-ssg-thumbnail.webp",
    category: "SSGs",
    type: "Paid",
    link: "/ssg-playbook",
    price: "$39",
    //uid: "3cf2bf3df5",
    //filePath: "/pdfs/early-offense-triggers.pdf",
  },
  {
    id: "early-offense",
    title: "Early Offense Triggers",
    description: "10x Early Offense Triggers for 5-Out.",
    image: "/lovable-uploads/early-offense-pdf.webp",
    category: "Offense",
    type: "Free",
    link: "https://guide.bballorbit.com/early-offense-triggers",
    uid: "3cf2bf3df5",
    filePath: "/pdfs/early-offense-triggers.pdf",
  },
  {
    id: "zoom-action",
    title: "Zoom Action",
    description: "A complete guide to the Zoom Action.",
    image: "/lovable-uploads/zoom-action-pdf.webp",
    category: "Offense",
    type: "Free",
    link: "https://guide.bballorbit.com/zoom",
    uid: "628b98c673",
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
    uid: "046e109887",
    filePath: "/pdfs/run-and-jump-defense.pdf",
  },
];

export const categories = ["All", "Shooting", "Offense", "Defense", "Conditioning", "SSGs", "Tools"] as const;
export type CategoryFilter = typeof categories[number];
