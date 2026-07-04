export type RichTextMarkType = "bold" | "italic" | "underline";

export type RichTextMark = {
  type: RichTextMarkType;
};

export type RichTextNode = {
  type: "doc" | "paragraph" | "bulletList" | "orderedList" | "listItem" | "text" | "hardBreak";
  text?: string;
  marks?: RichTextMark[];
  content?: RichTextNode[];
};

export type RichTextDocument = RichTextNode & {
  type: "doc";
};

export type RichTextRun = {
  text: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
};

export type RichTextBlock = {
  type: "paragraph" | "bulletListItem" | "orderedListItem";
  runs: RichTextRun[];
  index?: number;
};

const NODE_TYPES = new Set<RichTextNode["type"]>([
  "doc",
  "paragraph",
  "bulletList",
  "orderedList",
  "listItem",
  "text",
  "hardBreak",
]);

const MARK_TYPES = new Set<RichTextMarkType>(["bold", "italic", "underline"]);

const ALLOWED_CHILDREN: Partial<Record<RichTextNode["type"], Set<RichTextNode["type"]>>> = {
  doc: new Set(["paragraph", "bulletList", "orderedList"]),
  paragraph: new Set(["text", "hardBreak"]),
  bulletList: new Set(["listItem"]),
  orderedList: new Set(["listItem"]),
  listItem: new Set(["paragraph", "bulletList", "orderedList"]),
};

const emptyParagraph = (): RichTextNode => ({ type: "paragraph" });

export const createRichTextDocument = (text = ""): RichTextDocument => {
  const normalized = text.replace(/\r\n?/g, "\n");
  const lines = normalized.split("\n");

  return {
    type: "doc",
    content: lines.map((line) => ({
      type: "paragraph",
      content: line ? [{ type: "text", text: line }] : undefined,
    })),
  };
};

const sanitizeMarks = (value: unknown): RichTextMark[] | undefined => {
  if (!Array.isArray(value)) return undefined;
  const seen = new Set<RichTextMarkType>();
  const marks = value.flatMap((mark) => {
    if (!mark || typeof mark !== "object") return [];
    const type = (mark as { type?: unknown }).type;
    if (typeof type !== "string" || !MARK_TYPES.has(type as RichTextMarkType) || seen.has(type as RichTextMarkType)) {
      return [];
    }
    seen.add(type as RichTextMarkType);
    return [{ type: type as RichTextMarkType }];
  });
  return marks.length > 0 ? marks : undefined;
};

const sanitizeNode = (value: unknown, isRoot = false): RichTextNode | null => {
  if (!value || typeof value !== "object") return null;
  const candidate = value as { type?: unknown; text?: unknown; marks?: unknown; content?: unknown };
  if (typeof candidate.type !== "string" || !NODE_TYPES.has(candidate.type as RichTextNode["type"])) return null;

  const type = candidate.type as RichTextNode["type"];
  if (isRoot && type !== "doc") return null;
  if (!isRoot && type === "doc") return null;

  if (type === "text") {
    if (typeof candidate.text !== "string" || candidate.text.length === 0) return null;
    return { type, text: candidate.text, marks: sanitizeMarks(candidate.marks) };
  }

  if (type === "hardBreak") return { type };

  const allowedChildren = ALLOWED_CHILDREN[type];
  const content = Array.isArray(candidate.content) && allowedChildren
    ? candidate.content
      .map((child) => sanitizeNode(child))
      .filter((child): child is RichTextNode => Boolean(child) && allowedChildren.has(child.type))
    : [];

  return {
    type,
    content: content.length > 0 ? content : undefined,
  };
};

export const normalizeRichTextDocument = (
  value: unknown,
  fallbackText = "",
): RichTextDocument => {
  const sanitized = sanitizeNode(value, true);
  if (!sanitized || sanitized.type !== "doc") return createRichTextDocument(fallbackText);
  return {
    type: "doc",
    content: sanitized.content?.length ? sanitized.content : [emptyParagraph()],
  };
};

const inlineText = (node: RichTextNode): string => {
  if (node.type === "text") return node.text ?? "";
  if (node.type === "hardBreak") return "\n";
  return (node.content ?? []).map(inlineText).join("");
};

export const richTextToPlainText = (document: RichTextDocument): string => {
  const lines: string[] = [];

  (document.content ?? []).forEach((node) => {
    if (node.type === "bulletList" || node.type === "orderedList") {
      (node.content ?? []).forEach((item, index) => {
        const prefix = node.type === "bulletList" ? "- " : `${index + 1}. `;
        lines.push(`${prefix}${inlineText(item)}`);
      });
      return;
    }
    lines.push(inlineText(node));
  });

  return lines.join("\n").replace(/[ \t]+\n/g, "\n").trimEnd();
};

const collectRuns = (node: RichTextNode): RichTextRun[] => {
  if (node.type === "hardBreak") {
    return [{ text: "\n", bold: false, italic: false, underline: false }];
  }
  if (node.type === "text") {
    const marks = new Set((node.marks ?? []).map((mark) => mark.type));
    return [{
      text: node.text ?? "",
      bold: marks.has("bold"),
      italic: marks.has("italic"),
      underline: marks.has("underline"),
    }];
  }
  return (node.content ?? []).flatMap(collectRuns);
};

export const richTextToBlocks = (document: RichTextDocument): RichTextBlock[] => {
  const blocks: RichTextBlock[] = [];

  (document.content ?? []).forEach((node) => {
    if (node.type === "bulletList" || node.type === "orderedList") {
      (node.content ?? []).forEach((item, index) => {
        blocks.push({
          type: node.type === "bulletList" ? "bulletListItem" : "orderedListItem",
          runs: collectRuns(item),
          index: index + 1,
        });
      });
      return;
    }
    blocks.push({ type: "paragraph", runs: collectRuns(node) });
  });

  return blocks;
};

