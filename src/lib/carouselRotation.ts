type Timer = ReturnType<typeof setTimeout> | number;
type RotationOptions = {
  delay?: number;
  setTimer?: (callback: () => void, delay: number) => Timer;
  clearTimer?: (timer: Timer) => void;
};
type RotationConditions = { enabled: boolean; inView: boolean; hovered: boolean; documentVisible: boolean };

/** One timer, paused whenever the reader cannot see or is interacting with the quote. */
export function createCarouselRotation(advance: () => void, options: RotationOptions = {}) {
  const schedule = options.setTimer ?? setTimeout;
  const cancel = options.clearTimer ?? clearTimeout;
  const conditions: RotationConditions = { enabled: true, inView: false, hovered: false, documentVisible: true };
  const listeners = new Set<() => void>();
  let connected = false;
  let timer: Timer | undefined;
  let snapshot = { enabled: true, running: false };

  const reconcile = () => {
    if (timer !== undefined) { cancel(timer); timer = undefined; }
    const running = connected && conditions.enabled && conditions.inView && !conditions.hovered && conditions.documentVisible;
    if (snapshot.enabled !== conditions.enabled || snapshot.running !== running) {
      snapshot = { enabled: conditions.enabled, running };
      listeners.forEach(listener => listener());
    }
    if (running) {
      timer = schedule(() => {
        timer = undefined;
        advance();
        // Embla may have restarted the delay through its synchronous select event.
        if (timer === undefined) reconcile();
      }, options.delay ?? 10_000);
    }
  };

  const update = (values: Partial<RotationConditions>) => {
    if (!Object.entries(values).some(([key, value]) => conditions[key as keyof RotationConditions] !== value)) return;
    Object.assign(conditions, values);
    reconcile();
  };

  return {
    getSnapshot: () => snapshot,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    connect() { connected = true; reconcile(); },
    disconnect() { connected = false; reconcile(); },
    update,
    start: () => update({ enabled: true }),
    stop: () => update({ enabled: false }),
    restart: reconcile,
  };
}
