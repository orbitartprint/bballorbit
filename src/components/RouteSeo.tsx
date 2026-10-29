import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { absoluteImage, canonicalForPath, normalizePath, staticPageMetadata } from "@/lib/seo";

// Own route-level tags so prerendered noindex/canonical tags cannot remain
// attached to a different page after client-side navigation.
export default function RouteSeo() {
  const { pathname } = useLocation();
  const path = normalizePath(pathname);
  // Detail pages override these defaults after their content has loaded.
  const metadata = staticPageMetadata[path] ?? staticPageMetadata["/"];
  const canonical = canonicalForPath(path);
  const image = absoluteImage(metadata.image);

  return (
    // Apply metadata before passive effects so analytics reads this route's title.
    <Helmet defer={false}>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={metadata.noindex ? "noindex, nofollow" : "index, follow"} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
