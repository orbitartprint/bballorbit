import { QueryClient } from "@tanstack/react-query";
import type { PublicDrill, PublicDrillLibrary } from "@/data/publicDrills";
import { normalizePath } from "@/lib/seo";

export type PublicDrillDetail = { drill: PublicDrill | undefined; source: PublicDrillLibrary["source"] };
export type PageBootstrap = {
  version: 1;
  path: string;
  generatedAt: number;
  library?: PublicDrillLibrary;
  detail?: PublicDrillDetail;
};

export function createPageQueryClient(bootstrap?: PageBootstrap) {
  const client = new QueryClient();
  if (bootstrap?.version !== 1) return client;
  const options = { updatedAt: bootstrap.generatedAt };
  if (bootstrap.library) client.setQueryData(["public-drills"], bootstrap.library, options);
  if (bootstrap.detail) client.setQueryData(["public-drill", bootstrap.path.split("/").pop()], bootstrap.detail, options);
  return client;
}

export function readPageBootstrap(document: Document, pathname: string): PageBootstrap | undefined {
  const element = document.getElementById("page-bootstrap");
  if (!element?.textContent) return undefined;
  try {
    const data = JSON.parse(element.textContent) as PageBootstrap;
    return data.version === 1 && data.path === normalizePath(pathname) && Number.isFinite(data.generatedAt) ? data : undefined;
  } catch {
    return undefined;
  }
}
