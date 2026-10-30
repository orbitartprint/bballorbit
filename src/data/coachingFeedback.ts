import source from "./coachingFeedback.json";

type Testimonial = { id: string; name: string; quote: string };
const data: { testimonials: Testimonial[]; attributionNote?: string } = source;

// Older/local data may omit the optional note; attributions must remain transparent.
export const coachingFeedback = {
  testimonials: data.testimonials,
  attributionNote: data.attributionNote?.trim() || "Viewer comments from YouTube.",
};
