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
    id: "shooting-ladder",
    title: "Shooting Ladder Challenge",
    description: "A fun, competitive shooting drill for all ages.",
    image: "/placeholder.svg",
    category: "Shooting",
    type: "Free",
    link: "https://guide.bballorbit.com/shooting-ladder",
  },
  {
    id: "defense-toolkit",
    title: "Complete Defense Toolkit",
    description: "A set of advanced defensive drills and concepts.",
    image: "/placeholder.svg",
    category: "Defense",
    type: "Paid",
    price: "$9.90",
    link: "https://bballorbit.com/shop/defense-toolkit",
  },
  {
    id: "ball-handling-fundamentals",
    title: "Essential Ball Handling Fundamentals",
    description: "Master the basics with these proven drills that every young player needs to know.",
    image: "/placeholder.svg",
    category: "Offense",
    type: "Free",
    link: "https://guide.bballorbit.com/ball-handling",
  },
  {
    id: "five-shooting-challenges",
    title: "5 Shooting Challenges for Youth Players",
    description: "Progressive shooting drills that build confidence and accuracy for players aged 8-14.",
    image: "/placeholder.svg",
    category: "Shooting",
    type: "Free",
    link: "https://guide.bballorbit.com/shooting-challenges",
  },
];

export const categories = ["All", "Shooting", "Offense", "Defense", "Conditioning", "Tools"] as const;
export type CategoryFilter = typeof categories[number];
