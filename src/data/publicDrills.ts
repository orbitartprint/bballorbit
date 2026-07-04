import { z } from "zod";
import { supabase, SUPABASE_URL } from "@/integrations/supabase/client";

const categorySchema = z.object({ slug: z.string().min(1), label: z.string().min(1) });
const phaseSchema = z.object({ title: z.string().default("Phase"), notes: z.string().default("") });
const coachingSchema = z.object({
  rules: z.array(z.string()).default([]), coachingCues: z.array(z.string()).default([]),
  constraints: z.array(z.string()).default([]), progressions: z.array(z.string()).default([]),
  regressions: z.array(z.string()).default([]), variations: z.array(z.string()).default([]),
}).partial().default({});

const payloadSchema = z.object({
  contractVersion: z.number().optional(), libraryItemId: z.string().uuid(), versionId: z.string().uuid(),
  kind: z.literal("drill"), title: z.string().min(1), description: z.string().nullable().optional(),
  excerpt: z.string().nullable().optional(), slug: z.string().min(1), tags: z.array(z.string()).default([]),
  categories: z.array(categorySchema).optional(), canonicalTags: z.array(z.string()).default([]),
  courtScope: z.string().nullable().optional(), playerCountMin: z.number().nullable().optional(),
  difficulty: z.string().nullable().optional(), ageGroup: z.string().nullable().optional(),
  practiceSectionType: z.string().nullable().optional(), thumbnailPath: z.string().nullable().optional(),
  phases: z.array(phaseSchema).optional(), coaching: coachingSchema.optional(),
  publishedAt: z.string().nullable().optional(), renderedAt: z.string().nullable().optional(),
}).passthrough();

const publicPageSchema = z.object({
  library_item_id: z.string().uuid(), version_id: z.string().uuid(), public_slug: z.string().min(1),
  seo_title: z.string().min(1), seo_description: z.string().nullable(), thumbnail_path: z.string().nullable(),
  cached_payload: z.unknown(), rendered_at: z.string().nullable(),
});

export type PublicDrillCategory = z.infer<typeof categorySchema>;
export type PublicDrillPhase = z.infer<typeof phaseSchema>;
export type PublicDrill = {
  id: string; versionId: string; slug: string; title: string; description: string; excerpt: string;
  tags: string[]; categories: PublicDrillCategory[]; thumbnailUrl: string | null; courtScope: string | null;
  playerCountMin: number | null; difficulty: string | null; ageGroup: string | null;
  practiceSectionType: string | null; phases: PublicDrillPhase[];
  coaching: { rules: string[]; coachingCues: string[]; constraints: string[]; progressions: string[]; regressions: string[]; variations: string[] };
  publishedAt: string | null;
};

const dedupe = (values: string[]) => {
  const result = new Map<string, string>();
  for (const value of values) { const label = value.trim(); if (label) result.set(label.toLocaleLowerCase("en"), label); }
  return Array.from(result.values());
};
const categoryLabel = (slug: string) => slug.split("-").filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
const storageUrl = (path: string | null | undefined) => !path ? null : /^https?:\/\//i.test(path) ? path : `${SUPABASE_URL}/storage/v1/object/public/library-media/${path}`;

const mapPublicPage = (value: unknown): PublicDrill | null => {
  const rowResult = publicPageSchema.safeParse(value);
  if (!rowResult.success) return null;
  const row = rowResult.data;
  const source = typeof row.cached_payload === "object" && row.cached_payload ? row.cached_payload as Record<string, unknown> : {};
  const payloadResult = payloadSchema.safeParse({ ...source, libraryItemId: row.library_item_id, versionId: row.version_id, slug: row.public_slug, title: source.title ?? row.seo_title, kind: "drill" });
  if (!payloadResult.success) return null;
  const payload = payloadResult.data;
  const categories = payload.categories?.length ? payload.categories : payload.canonicalTags.map((slug) => ({ slug, label: categoryLabel(slug) }));
  const coaching = coachingSchema.parse(payload.coaching ?? {});
  const description = payload.description?.trim() || row.seo_description?.trim() || "";
  return {
    id: payload.libraryItemId, versionId: payload.versionId, slug: payload.slug, title: payload.title,
    description, excerpt: payload.excerpt?.trim() || description.slice(0, 240),
    tags: dedupe([...categories.map((category) => category.label), ...payload.tags]), categories,
    thumbnailUrl: storageUrl(payload.thumbnailPath ?? row.thumbnail_path), courtScope: payload.courtScope ?? null,
    playerCountMin: payload.playerCountMin ?? null, difficulty: payload.difficulty ?? null,
    ageGroup: payload.ageGroup ?? null, practiceSectionType: payload.practiceSectionType ?? null,
    phases: payload.phases ?? [],
    coaching: { rules: coaching.rules ?? [], coachingCues: coaching.coachingCues ?? [], constraints: coaching.constraints ?? [], progressions: coaching.progressions ?? [], regressions: coaching.regressions ?? [], variations: coaching.variations ?? [] },
    publishedAt: payload.publishedAt ?? row.rendered_at,
  };
};

export const parsePublicDrills = (values: unknown[]): PublicDrill[] => values.map(mapPublicPage).filter((drill): drill is PublicDrill => Boolean(drill)).sort((a, b) => a.title.localeCompare(b.title));

const fetchSnapshot = async () => {
  const response = await fetch("/drill-library-snapshot.json", { cache: "no-cache" });
  if (!response.ok) throw new Error("The Drill Library is temporarily unavailable.");
  const value = await response.json();
  if (!Array.isArray(value)) throw new Error("The Drill Library snapshot is invalid.");
  return parsePublicDrills(value);
};

export const fetchPublicDrills = async (): Promise<PublicDrill[]> => {
  const { data, error } = await supabase.from("public_library_pages")
    .select("library_item_id,version_id,public_slug,seo_title,seo_description,thumbnail_path,cached_payload,rendered_at")
    .eq("kind", "drill").eq("cache_status", "published").order("seo_title", { ascending: true });
  if (!error) return parsePublicDrills(data ?? []);
  return fetchSnapshot();
};

export const fetchPublicDrill = async (slug: string) => (await fetchPublicDrills()).find((drill) => drill.slug === slug) ?? null;
export const getPublicDrillCategories = (drills: PublicDrill[]) => Array.from(new Map(drills.flatMap((drill) => drill.categories).map((category) => [category.slug, category])).values()).sort((a, b) => a.label.localeCompare(b.label));
export const getPublicDrillTags = (drills: PublicDrill[]) => dedupe(drills.flatMap((drill) => drill.tags)).sort((a, b) => a.localeCompare(b));
