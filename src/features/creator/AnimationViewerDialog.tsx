import { useEffect, useMemo, useRef, useState } from "react";
import { Maximize2, Minimize2, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  buildAnimationTimeline,
  formatAnimationTime,
  getAnimationFramePhase,
  getAnimationPlaybackStartMs,
} from "./animation";
import { CourtSvg } from "./court/CourtSvg";
import type { DiagramState } from "./types";

type AnimationViewerDialogProps = {
  diagram: DiagramState;
  itemKind: "drill" | "play";
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AnimationViewerDialog = ({
  diagram,
  itemKind,
  open,
  onOpenChange,
}: AnimationViewerDialogProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pendingPlayFrameRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);

  const timeline = useMemo(
    () => buildAnimationTimeline(diagram, diagram.activePhaseId, "all"),
    [diagram],
  );
  const totalMs = Math.max(0, timeline.totalMs);
  const framePhase = useMemo(
    () => getAnimationFramePhase(timeline, elapsedMs),
    [elapsedMs, timeline],
  );
  const activeSteps = timeline.steps.filter((step) => step.enabled).length;

  const cancelPendingPlay = () => {
    if (pendingPlayFrameRef.current === null) return;
    window.cancelAnimationFrame(pendingPlayFrameRef.current);
    pendingPlayFrameRef.current = null;
  };

  useEffect(() => {
    if (!open) {
      cancelPendingPlay();
      setPlaying(false);
      setElapsedMs(0);
      if (document.fullscreenElement === containerRef.current && document.exitFullscreen) {
        void document.exitFullscreen().catch(() => undefined);
      }
      return;
    }

    if (totalMs <= 0) {
      setElapsedMs(0);
      setPlaying(false);
      return;
    }

    cancelPendingPlay();
    setPlaying(false);
    setElapsedMs(getAnimationPlaybackStartMs(timeline));
    pendingPlayFrameRef.current = window.requestAnimationFrame(() => {
      pendingPlayFrameRef.current = null;
      setPlaying(true);
    });
  }, [open, timeline, totalMs]);

  useEffect(() => {
    const updateFullscreenState = () => setFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", updateFullscreenState);
    return () => document.removeEventListener("fullscreenchange", updateFullscreenState);
  }, []);

  useEffect(() => {
    if (!playing) return;

    let animationFrame = 0;
    let previousTime: number | null = null;
    const tick = (time: number) => {
      if (previousTime === null) previousTime = time;
      const delta = (time - previousTime) * speed;
      previousTime = time;
      setElapsedMs((current) => {
        const next = Math.min(totalMs, current + delta);
        if (next >= totalMs) {
          setPlaying(false);
        }
        return next;
      });
      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [playing, speed, totalMs]);

  const togglePlay = () => {
    if (totalMs <= 0) return;
    cancelPendingPlay();
    if (playing) {
      setPlaying(false);
      return;
    }

    setElapsedMs((current) => {
      if (current >= totalMs) return getAnimationPlaybackStartMs(timeline);
      if (current <= 0) return getAnimationPlaybackStartMs(timeline);
      return current;
    });
    pendingPlayFrameRef.current = window.requestAnimationFrame(() => {
      pendingPlayFrameRef.current = null;
      setPlaying(true);
    });
  };

  const reset = () => {
    cancelPendingPlay();
    setPlaying(false);
    setElapsedMs(0);
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement === container) {
      await document.exitFullscreen?.();
      return;
    }

    await container.requestFullscreen?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="h-[min(720px,calc(100dvh-40px))] w-[min(920px,calc(100vw-24px))] max-w-none overflow-hidden rounded-2xl border-border bg-background p-0"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{itemKind === "play" ? "Play" : "Drill"} animation</DialogTitle>
          <DialogDescription>Watch the full animation across all phases.</DialogDescription>
        </DialogHeader>

        <div ref={containerRef} className="flex h-full min-h-0 flex-col bg-background">
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black p-3 sm:p-4">
            <div className="relative flex h-full min-h-0 w-full max-w-[820px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-background shadow-2xl">
              <CourtSvg
                template={diagram.court.template}
                size={diagram.court.size}
                theme={diagram.court.theme}
                showGrid={diagram.court.showGrid}
                margin={diagram.court.margin}
                elementScale={diagram.court.elementScale}
                fillViewportBackground
                phase={framePhase}
                selection={null}
                draftActionStart={null}
                interactive={false}
                className={cn("public-court-diagram h-full min-h-0 w-full bg-transparent shadow-none")}
                onCourtPointerDown={() => undefined}
                onEntityPointerDown={() => undefined}
                onPointerMove={() => undefined}
                onPointerUp={() => undefined}
              />
            </div>
          </div>

          <div className="shrink-0 border-t border-border bg-background p-3">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold text-muted-foreground">
              <span>{activeSteps} active steps</span>
              <span>{formatAnimationTime(Math.min(elapsedMs, totalMs))} / {formatAnimationTime(totalMs)}</span>
            </div>
            <Slider
              className="mt-3"
              value={[Math.min(elapsedMs, totalMs)]}
              min={0}
              max={Math.max(1, totalMs)}
              step={25}
              onValueChange={([value]) => {
                cancelPendingPlay();
                setPlaying(false);
                setElapsedMs(value ?? 0);
              }}
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Select value={String(speed)} onValueChange={(value) => setSpeed(Number(value))}>
                  <SelectTrigger className="h-9 w-[96px] rounded-xl bg-background text-xs font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="2">2x</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" size="icon" className="size-9 rounded-xl" onClick={reset} aria-label="Reset animation">
                  <RotateCcw className="size-4" />
                </Button>
                <Button type="button" variant="outline" size="icon" className="size-9 rounded-xl" onClick={() => void toggleFullscreen()} aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
                  {fullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                </Button>
              </div>

              <Button type="button" size="sm" className="h-9 min-w-[104px] justify-center rounded-xl px-4" onClick={togglePlay} disabled={totalMs <= 0}>
                {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                {playing ? "Pause" : "Play"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
