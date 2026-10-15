import { useLayoutEffect, useMemo, useState, type Dispatch, type RefObject, type SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { collectionNavigationKey, readCollectionNavigation, writeCollectionNavigation, type CollectionFilters, type CollectionNavigationEntry } from "@/lib/collectionNavigation";

const restoreFilters = <T extends CollectionFilters>(defaults: T, stored: CollectionFilters): T => Object.fromEntries(Object.entries(defaults).map(([name, fallback]) => {
  const value = stored[name];
  return [name, Array.isArray(fallback) ? Array.isArray(value) ? value : fallback : typeof value === "string" ? value : fallback];
})) as T;

export function useCollectionNavigation<T extends CollectionFilters>(scope: string, userId: string | undefined, defaults: T, activeTab?: string) {
  const location = useLocation();
  const tab = scope === "library" ? activeTab ?? (location.state as { libraryTab?: unknown } | null)?.libraryTab : undefined;
  const key = collectionNavigationKey(scope, userId, location.pathname, location.search, new URLSearchParams(location.search).get("tab") ?? tab);
  const entry = useMemo<CollectionNavigationEntry>(() => {
    const saved = readCollectionNavigation(key, location.key);
    return { id: `${key}:${location.key}`, storageKey: key, historyKey: location.key, snapshot: saved ?? { filters: {} }, initialPage: saved?.page, restoring: Boolean(saved?.scroll), pending: true, results: null };
  }, [key, location.key]);
  const [state, setState] = useState<{ id: string; filters: T }>(() => ({ id: entry.id, filters: restoreFilters(defaults, entry.snapshot.filters) }));
  const filters = state.id === entry.id ? state.filters : restoreFilters(defaults, entry.snapshot.filters);
  useLayoutEffect(() => { entry.snapshot.filters = filters; });
  useLayoutEffect(() => {
    try { window.history.scrollRestoration = "manual"; } catch { /* Some WebViews do not expose this setting. */ }
    const capture = () => {
      if (entry.pending && entry.restoring) return;
      entry.snapshot.scroll = { left: window.scrollX, top: window.scrollY, resultsHeight: entry.results?.getBoundingClientRect().height || entry.snapshot.scroll?.resultsHeight || 0 };
      writeCollectionNavigation(entry.storageKey, entry.historyKey, entry.snapshot);
    };
    window.addEventListener("pagehide", capture);
    return () => { window.removeEventListener("pagehide", capture); capture(); };
  }, [entry]);
  const field = <K extends keyof T>(name: K): [T[K], Dispatch<SetStateAction<T[K]>>] => [filters[name], (next) => {
    entry.pending = false;
    setState((current) => {
      const values = current.id === entry.id ? current.filters : filters;
      return { id: entry.id, filters: { ...values, [name]: typeof next === "function" ? next(values[name]) : next } };
    });
  }];
  return { entry, field };
}

export function useCollectionScrollRestoration(entry: CollectionNavigationEntry | undefined, ready: boolean, resultsRef: RefObject<HTMLDivElement>, pageKey: string) {
  useLayoutEffect(() => {
    if (!entry) return;
    const results = resultsRef.current;
    entry.results = results;
    if (!entry.pending) return;
    const scroll = entry.snapshot.scroll;
    if (!entry.restoring) {
      window.scrollTo({ left: 0, top: 0, behavior: "instant" });
      entry.pending = false;
      return;
    }
    if (entry.initialPage && entry.initialPage.key !== pageKey) { entry.pending = false; return; }
    const originalMinHeight = results?.style.minHeight ?? "";
    if (!ready && results && scroll) results.style.minHeight = `${scroll.resultsHeight}px`;
    const restore = () => { if (scroll) window.scrollTo({ left: scroll.left, top: scroll.top, behavior: "instant" }); };
    restore();
    if (ready) entry.pending = false;
    let cancelled = false;
    let frame = 0;
    const cancel = () => { cancelled = true; entry.pending = false; };
    const settle = () => { if (!cancelled) restore(); };
    if (ready) {
      frame = requestAnimationFrame(settle);
      void document.fonts?.ready.then(settle);
    }
    const inputs = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    inputs.forEach((name) => window.addEventListener(name, cancel, { passive: true, once: true }));
    return () => {
      cancelled = true; cancelAnimationFrame(frame);
      inputs.forEach((name) => window.removeEventListener(name, cancel));
      if (results) results.style.minHeight = originalMinHeight;
    };
  }, [entry, ready, resultsRef, pageKey]);
}
