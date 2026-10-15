export type CollectionFilters = Record<string, string | string[]>;
export type CollectionNavigationSnapshot = {
  filters: CollectionFilters;
  page?: { key: string; page: number };
  scroll?: { left: number; top: number; resultsHeight: number };
};
export type CollectionNavigationEntry = {
  id: string;
  storageKey: string;
  historyKey: string;
  snapshot: CollectionNavigationSnapshot;
  initialPage?: CollectionNavigationSnapshot["page"];
  restoring: boolean;
  pending: boolean;
  results: HTMLDivElement | null;
};
type Bucket = { latest: string; entries: Record<string, CollectionNavigationSnapshot> };
const memory = new Map<string, Bucket>();

export function collectionNavigationKey(scope: string, userId: string | undefined, pathname: string, search: string, tab?: unknown) {
  const params = new URLSearchParams(search);
  if (typeof tab === "string") params.set("tab", tab);
  if (params.get("tab") === "my-drills") params.delete("tab");
  params.sort();
  return `bballorbit:collection-return:${JSON.stringify([userId ?? "guest", scope, pathname.replace(/\/$/, ""), params.toString()])}`;
}

const validSnapshot = (value: unknown): value is CollectionNavigationSnapshot => {
  if (!value || typeof value !== "object") return false;
  const snapshot = value as CollectionNavigationSnapshot;
  return Boolean(snapshot.filters && typeof snapshot.filters === "object"
    && Object.values(snapshot.filters).every((filter) => typeof filter === "string" || Array.isArray(filter) && filter.every((item) => typeof item === "string"))
    && (!snapshot.page || typeof snapshot.page.key === "string" && Number.isSafeInteger(snapshot.page.page) && snapshot.page.page > 0)
    && (!snapshot.scroll || [snapshot.scroll.left, snapshot.scroll.top, snapshot.scroll.resultsHeight].every((number) => Number.isFinite(number) && number >= 0)));
};

export function readCollectionNavigation(key: string, historyKey: string): CollectionNavigationSnapshot | null {
  let bucket = memory.get(key);
  try {
    const stored = sessionStorage.getItem(key);
    if (stored) bucket = JSON.parse(stored) as Bucket;
    else { memory.delete(key); bucket = undefined; }
  } catch { /* The in-memory copy also works with blocked or full storage. */ }
  const value = bucket?.entries?.[historyKey] ?? bucket?.entries?.[bucket.latest];
  return validSnapshot(value) ? structuredClone(value) : null;
}

export function writeCollectionNavigation(key: string, historyKey: string, snapshot: CollectionNavigationSnapshot) {
  let bucket = memory.get(key);
  try { bucket = JSON.parse(sessionStorage.getItem(key) || "null") as Bucket | undefined; } catch { /* Use memory. */ }
  const entries = Object.fromEntries(Object.entries(bucket?.entries ?? {}).filter(([entry]) => entry !== historyKey).slice(-7));
  entries[historyKey] = structuredClone(snapshot);
  const next = { latest: historyKey, entries };
  memory.delete(key); memory.set(key, next);
  if (memory.size > 60) memory.delete(memory.keys().next().value as string);
  try { sessionStorage.setItem(key, JSON.stringify(next)); } catch { /* Keep this tab's in-memory copy. */ }
}
