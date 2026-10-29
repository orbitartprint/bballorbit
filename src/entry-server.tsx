/* eslint-disable react-refresh/only-export-components -- This entry is used only by the static renderer. */
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import App from "./App";
import { parsePublicDrills } from "./data/publicDrills";
import { normalizePath } from "./lib/seo";
import type { PageBootstrap } from "./lib/pageBootstrap";

export { blogArticles } from "./data/blogArticles";
export * as seo from "./lib/seo";
export * as publicConfig from "./integrations/supabase/config";
export { parsePublicDrills };

/** Render sequentially: react-helmet's server collector is shared within this process. */
export async function renderPage(pathname: string, drills: ReturnType<typeof parsePublicDrills>) {
  const path = normalizePath(pathname);
  const bootstrap: PageBootstrap = { version: 1, path, generatedAt: Date.now() };
  if (path === "/drills") bootstrap.library = { drills, source: "live" };
  else if (path.startsWith("/drills/")) bootstrap.detail = { drill: drills.find((drill) => drill.slug === path.split("/").pop()), source: "live" };
  const html = await new Promise<string>((resolve, reject) => {
    const output = new PassThrough();
    const chunks: Buffer[] = [];
    output.on("data", (chunk: Buffer) => chunks.push(chunk));
    output.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    const control: { timeout?: ReturnType<typeof setTimeout>; stream?: ReturnType<typeof renderToPipeableStream> } = {};
    let failed = false;
    const fail = (error: unknown) => {
      if (failed) return;
      failed = true;
      clearTimeout(control.timeout);
      reject(error);
      control.stream?.abort();
    };
    output.on("error", fail);
    control.stream = renderToPipeableStream(<StaticRouter location={pathname}><App bootstrap={bootstrap} /></StaticRouter>, {
      onAllReady() { if (!failed) control.stream!.pipe(output); },
      onShellError: fail,
      onError: fail,
    });
    control.timeout = setTimeout(() => fail(new Error(`Rendering timed out: ${path}`)), 20_000);
    output.on("end", () => clearTimeout(control.timeout));
  });
  const helmet = Helmet.renderStatic();
  const head = [helmet.title, helmet.meta, helmet.link, helmet.script].map((tags) => tags.toString()).join("\n");
  return { html, head, bootstrap };
}
