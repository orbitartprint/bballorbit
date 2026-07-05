import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { normalizeRichTextDocument, type RichTextDocument, type RichTextNode } from "@/features/creator/richText";

const hasVisibleContent = (node: RichTextNode): boolean => {
  if (node.type === "text") return Boolean(node.text?.trim());
  if (node.type === "hardBreak") return false;
  return (node.content ?? []).some(hasVisibleContent);
};

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

export const RichTextRenderer = ({ document, fallbackText = "", className }: { document?: RichTextDocument | null | unknown; fallbackText?: string; className?: string }) => {
  const normalized = normalizeRichTextDocument(document, fallbackText);
  const visibleContent = [...(normalized.content ?? [])];
  while (visibleContent.length > 0 && !hasVisibleContent(visibleContent[visibleContent.length - 1])) visibleContent.pop();
  return <div className={cn("rich-text-content", className)}>{visibleContent.map((node, index) => renderNode(node, `rich-${index}`))}</div>;
};
