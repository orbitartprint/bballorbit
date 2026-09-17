import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

// Own route-level tags so prerendered noindex/canonical tags cannot remain
// attached to a different page after client-side navigation.
export default function RouteSeo() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";
  const noindex = path === "/free-resources" || path === "/privacy";

  return (
    <Helmet>
      <link rel="canonical" href={`https://bballorbit.com${path}`} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
    </Helmet>
  );
}
