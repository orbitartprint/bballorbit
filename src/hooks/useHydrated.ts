import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/** Keep the first hydrated render identical to the build, then restore browser state. */
export const useHydrated = () => useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
