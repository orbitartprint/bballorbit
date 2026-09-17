import { useEffect } from "react";
import { appDistribution } from "@/lib/appDistribution";

/** Preserve old bookmarks while the public download page lives with the product. */
export default function MobileApp() {
  useEffect(() => { window.location.replace(appDistribution.downloadPageUrl); }, []);
  return <main className="container py-20"><a href={appDistribution.downloadPageUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">Open the Basketball Orbit app download page</a></main>;
}
