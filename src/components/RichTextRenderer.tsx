import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RichTextMark = { type: "bold" | "italic" | "underline" };
type RichTextNode = {
  type: "doc" | "paragraph" | "bulletList" | "orderedList" | "listItem" | "text" | "hardBreak";
  text?: string;
  marks?: RichTextMark[];
  content?: RichTextNode[];
};

const nodeTypes = new Set<RichTextNode["type"]>(["doc", "paragraph", "bulletList", "orderedList", "listItem", "text", "hardBreak"]);
const markTypes = new Set<RichTextMark["type"]>(["bold", "italic", "underline"]);

const sanitizeNode = (value: unknown, root = false): RichTextNode | null => {
  if (!value || typeof value !== "object") return null;
  const candidate = value as { type?: unknown; text?: unknown; marks?: unknown; content?: unknown };
  if (typeof candidate.type !== "string" || !nodeTypes.has(candidate.type as RichTextNode["type"])) return null;
  const type = candidate.type as RichTextNode["type"];
  if ((root && type !== "doc") || (!root && type === "doc")) return null;
  if (type === "hardBreak") return { type };
  if (type === "text") {
    if (typeof candidate.text !== "string") return null;
    const marks = Array.isArray(candidate.marks)
      ? candidate.marks.flatMap((mark) => {
        const markType = mark && typeof mark === "object" ? (mark as { type?: unknown }).type : null;
        return typeof markType === "string" && markTypes.has(markType as RichTextMark["type"])
          ? [{ type: markType as RichTextMark["type"] }]
          : [];
      })
      : undefined;
    return { type, text: candidate.text, marks };
  }
  const content = Array.isArray(candidate.content)
    ? candidate.content.map((child) => sanitizeNode(child)).filter((child): child is RichTextNode => Boolean(child))
    : undefined;
  return { type, content };
};

const fallbackDocument = (text: string): RichTextNode => ({
  type: "doc",
  content: text.replace(/\r\n?/g, "\n").split("\n").map((line) => ({
    type: "paragraph",
    content: line ? [{ type: "text", text: line }] : undefined,
  })),
});

const renderNode = (node: RichTextNode, key: string): ReactNode => {
  if (node.type === "text") {
    let content: ReactNode = node.text ?? "";
    for (const mark of node.marks ?? []) {
      if (mark.type === "bold") content = <strong>{content}</strong>;
      if (mark.type === "italic") content = <em>{content}</em>;
      if (mark.type === "underline") content = <u>{content}</u>;
    }
    return <span key={key}>{content}</span>;
  }
  if (node.type === "hardBreak") return <br key={key} />;
  const children = (node.content ?? []).map((child, index) => renderNode(child, `${key}-${index}`));
  if (node.type === "paragraph") return <p key={key}>{children.length > 0 ? children : <br />}</p>;
  if (node.type === "bulletList") return <ul key={key}>{children}</ul>;
  if (node.type === "orderedList") return <ol key={key}>{children}</ol>;
  if (node.type === "listItem") return <li key={key}>{children}</li>;
  return <>{children}</>;
};

export const RichTextRenderer = ({ document, fallbackText = "", className }: { document?: unknown; fallbackText?: string; className?: string }) => {
  const normalized = sanitizeNode(document, true) ?? fallbackDocument(fallbackText);
  return <div className={cn("rich-text-content", className)}>{(normalized.content ?? []).map((node, index) => renderNode(node, `rich-${index}`))}</div>;
};
