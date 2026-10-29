import { useSyncExternalStore } from "react";
import { DENIED_CONSENT, getConsentSnapshot, subscribeToConsent } from "@/lib/consent";

export const useConsent = () => useSyncExternalStore(subscribeToConsent, getConsentSnapshot, () => DENIED_CONSENT);
