import { appDistribution, trackAppLink, type AppLinkPlacement } from "@/lib/appDistribution";
import { cn } from "@/lib/utils";
import { getStoreNavigation } from "@/lib/storeNavigation";

type Props = {
  placement: AppLinkPlacement;
  className?: string;
  eager?: boolean;
};

export function AppStoreBadges({ placement, className, eager = false }: Props) {
  return (
    <div className={cn("flex flex-wrap items-center", className)} aria-label="Download the Basketball Orbit app">
      {appDistribution.stores.map((store) => (
        <a
          key={store.id}
          {...getStoreNavigation(store)}
          role={store.url ? undefined : "link"}
          tabIndex={store.url ? undefined : 0}
          aria-label={`Download Basketball Orbit on ${store.name}`}
          aria-disabled={store.url ? undefined : true}
          data-app-store={store.id}
          className={cn(
            "inline-flex h-[60px] shrink-0 items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            store.id === "ios" ? "w-[140px] p-2.5" : "w-[156px]",
            !store.url && "cursor-default",
          )}
          onClick={(event) => {
            if (!store.url) {
              event.preventDefault();
              return;
            }
            trackAppLink(store.id as "ios" | "android", placement);
          }}
        >
          <img
            src={store.badge}
            alt={store.id === "ios" ? "Download on the App Store" : "Get it on Google Play"}
            width={store.id === "ios" ? 120 : 646}
            height={store.id === "ios" ? 40 : 250}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className={store.id === "ios" ? "h-10 w-auto" : "h-[60px] w-auto"}
          />
        </a>
      ))}
    </div>
  );
}
