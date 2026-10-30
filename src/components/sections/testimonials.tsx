import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { Quote, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { coachingFeedback as feedback } from "@/data/coachingFeedback";
import { createCarouselRotation } from "@/lib/carouselRotation";

const testimonials = feedback.testimonials;
const controlClass = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-md hover:bg-white/10 focus-visible:outline focus-visible:outline-primary";

const Testimonials = () => {
  const section = useRef<HTMLElement>(null);
  const apiRef = useRef<UseEmblaCarouselType[1]>();
  const reducedMotionRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselRef, api] = useEmblaCarousel({ loop: true, duration: reducedMotion ? 0 : 25 });
  const [rotation] = useState(() => createCarouselRotation(() => apiRef.current?.scrollNext(reducedMotionRef.current)));
  const rotationState = useSyncExternalStore(rotation.subscribe, rotation.getSnapshot, rotation.getSnapshot);

  useEffect(() => {
    rotation.connect();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      reducedMotionRef.current = media.matches;
      setReducedMotion(media.matches);
      if (media.matches) rotation.stop();
    };
    const onVisibility = () => rotation.update({ documentVisible: !document.hidden });
    onMotionChange();
    onVisibility();
    media.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(entries => {
      rotation.update({ inView: entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.25) });
    }, { threshold: [0, 0.25] });
    if (section.current) observer.observe(section.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibility);
      rotation.disconnect();
    };
  }, [rotation]);

  useEffect(() => {
    if (!api) return;
    apiRef.current = api;
    const onSelect = () => { setCurrentIndex(api.selectedScrollSnap()); rotation.restart(); };
    const onPointerDown = () => rotation.stop();
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    api.on("pointerDown", onPointerDown);
    return () => {
      apiRef.current = undefined;
      api.off("select", onSelect);
      api.off("reInit", onSelect);
      api.off("pointerDown", onPointerDown);
    };
  }, [api, rotation]);

  const move = useCallback((index: number) => {
    rotation.stop();
    api?.scrollTo(index, reducedMotion);
  }, [api, reducedMotion, rotation]);

  return (
    <section ref={section} className="py-20 bg-[#0d0d0d]" aria-labelledby="feedback-heading" aria-roledescription="carousel"
      onFocusCapture={() => rotation.stop()}
      onMouseEnter={() => rotation.update({ hovered: true })}
      onMouseLeave={() => rotation.update({ hovered: false })}>
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <h2 id="feedback-heading" className="text-3xl md:text-4xl font-bold text-white mb-6">What Coaches Are Saying</h2>
        <button type="button" className={`${controlClass} mb-6 gap-2 px-3 text-sm text-gray-300`}
          onMouseDown={event => event.preventDefault()}
          onClick={() => rotationState.enabled ? rotation.stop() : rotation.start()}
          aria-label={rotationState.enabled ? "Pause automatic testimonial rotation" : "Start automatic testimonial rotation"}>
          {rotationState.enabled ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          {rotationState.enabled ? "Pause slideshow" : "Start slideshow"}
        </button>
        <div ref={carouselRef} className="overflow-hidden touch-pan-y" aria-live={rotationState.running ? "off" : "polite"} aria-atomic="false">
          <div className="flex items-stretch">
            {testimonials.map((testimonial, index) => <div key={testimonial.id} className="min-w-0 shrink-0 grow-0 basis-full px-2 md:px-6"
              role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${testimonials.length}`} aria-hidden={index !== currentIndex}>
              <Quote aria-hidden="true" className="w-12 h-12 text-[#f57520] mx-auto mb-6" />
              <blockquote className="text-xl md:text-2xl text-gray-200 font-medium mb-6 italic">“{testimonial.quote}”</blockquote>
              <p className="text-gray-400">— {testimonial.name}</p>
            </div>)}
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-400">{feedback.attributionNote}</p>
        <div className="flex justify-center items-center gap-2 mt-6" role="group" aria-label="Choose viewer feedback">
          <button type="button" className={controlClass} aria-label="Previous testimonial" onClick={() => move((currentIndex + testimonials.length - 1) % testimonials.length)}><ChevronLeft aria-hidden="true" /></button>
          {testimonials.map((testimonial, index) => <button type="button" key={testimonial.id} onClick={() => move(index)} aria-label={`Show testimonial ${index + 1}`} aria-pressed={index === currentIndex} className={controlClass}><span className={`h-3 rounded-full ${index === currentIndex ? "bg-[#f57520] w-8" : "bg-gray-600 w-3"}`} /></button>)}
          <button type="button" className={controlClass} aria-label="Next testimonial" onClick={() => move((currentIndex + 1) % testimonials.length)}><ChevronRight aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
