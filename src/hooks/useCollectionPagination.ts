import { useBrowserLayoutEffect as useLayoutEffect } from "./useBrowserLayoutEffect";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { useCollectionScrollRestoration } from "./useCollectionNavigation";
import type { CollectionNavigationEntry } from "@/lib/collectionNavigation";

export type CollectionPageSize = 20 | 50 | 100;
export type CollectionPageScope = "library" | "practices" | "playbooks" | "uploads";

const DEFAULT_PAGE_SIZE: CollectionPageSize = 20;
const CHANGE_EVENT = "bballorbit:collection-page-size-changed";
const fallbackSizes = new Map<string, CollectionPageSize>();

export const getCollectionPageSizeKey = (scope: CollectionPageScope, userId?: string) =>
  `bballorbit:${userId ?? "guest"}:${scope}:page-size`;

export const isCollectionPageSize = (value: number): value is CollectionPageSize =>
  value === 20 || value === 50 || value === 100;

const readSize = (key: string): CollectionPageSize => {
  try {
    const value = Number(window.localStorage.getItem(key));
    return isCollectionPageSize(value) ? value : DEFAULT_PAGE_SIZE;
  } catch {
    return fallbackSizes.get(key) ?? DEFAULT_PAGE_SIZE;
  }
};

export const useCollectionPagination = <T,>(
  items: T[],
  scope: CollectionPageScope,
  userId?: string,
  resetKey = "",
  { ready = true, navigation }: { ready?: boolean; navigation?: CollectionNavigationEntry } = {},
) => {
  const storageKey = getCollectionPageSizeKey(scope, userId);
  const subscribe = useCallback((onChange: () => void) => {
    const storageChanged = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) onChange();
    };
    const localChanged = (event: Event) => {
      if (event instanceof CustomEvent && event.detail === storageKey) onChange();
    };
    window.addEventListener("storage", storageChanged);
    window.addEventListener(CHANGE_EVENT, localChanged);
    return () => {
      window.removeEventListener("storage", storageChanged);
      window.removeEventListener(CHANGE_EVENT, localChanged);
    };
  }, [storageKey]);
  const getSnapshot = useCallback(() => readSize(storageKey), [storageKey]);
  const pageSize = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_PAGE_SIZE);
  const key = JSON.stringify([storageKey, pageSize, resetKey]);
  const entryId = navigation?.id ?? "";
  const initialPage = navigation?.initialPage?.key === key ? navigation.initialPage.page : 1;
  const [position, setPosition] = useState({ entryId, key, page: initialPage });
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const requestedPage = position.entryId === entryId ? position.key === key ? position.page : 1 : initialPage;
  const page = ready ? Math.min(requestedPage, pageCount) : requestedPage;
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const scrollRequested = useRef(false);

  useLayoutEffect(() => {
    // Commit a clamp/reset so adding items later cannot revive an old page.
    setPosition((current) => current.entryId === entryId && current.key === key && current.page === page ? current : { entryId, key, page });
    if (scrollRequested.current) {
      window.scrollTo({ left: 0, top: 0, behavior: "instant" });
      scrollRequested.current = false;
    }
  }, [entryId, key, page]);
  useLayoutEffect(() => { if (ready && navigation) navigation.snapshot.page = { key, page }; }, [ready, navigation, key, page]);
  useCollectionScrollRestoration(navigation, ready, resultsRef, key);

  const setPage = (nextPage: number) => {
    if (navigation) navigation.pending = false;
    scrollRequested.current = true;
    setPosition({ entryId, key, page: Math.max(1, Math.min(nextPage, pageCount)) });
  };
  const setPageSize = (value: number) => {
    if (!isCollectionPageSize(value) || value === pageSize) return;
    if (navigation) navigation.pending = false;
    scrollRequested.current = true;
    fallbackSizes.set(storageKey, value);
    try {
      window.localStorage.setItem(storageKey, String(value));
    } catch {
      // Keep the setting for this session if device storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: storageKey }));
  };
  const start = (page - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
    pageSize,
    page,
    pageCount,
    setPage,
    setPageSize,
    resultsRef,
    selectionScope: JSON.stringify([key, page]),
  };
};
