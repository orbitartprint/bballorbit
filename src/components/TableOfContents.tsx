// src/components/TableOfContents.tsx

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = article.querySelectorAll("h2, h3");
    const headingsList: Heading[] = [];

    headingElements.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      if (!heading.id) {
        heading.id = id;
      }
      headingsList.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName[1]),
      });
    });

    setHeadings(headingsList);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <Card className="sticky top-24 bg-card/50 backdrop-blur border-border">
      <CardHeader>
        <CardTitle className="text-lg">Table of Contents</CardTitle>
      </CardHeader>
      <CardContent>
        <nav>
          <ul className="space-y-2 text-sm">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
              >
                <button
                  onClick={() => handleClick(heading.id)}
                  className={`text-left hover:text-primary transition-colors ${
                    activeId === heading.id
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
};

export default TableOfContents;
