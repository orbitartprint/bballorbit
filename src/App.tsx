import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import usePageTracking from "./hooks/usePageTracking";

// ✅ Lazy load all pages
const Index = lazy(() => import("./pages/Index"));
const DrillTemplate = lazy(() => import("./pages/DrillTemplate"));
const DrillLibrary = lazy(() => import("./pages/DrillLibrary"));
const Resources = lazy(() => import("./pages/Resources"));
const FreeResources = lazy(() => import("./pages/FreeResources"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Legal = lazy(() => import("./pages/Legal"));
const Terms = lazy(() => import("./pages/Terms"));
const Affiliate = lazy(() => import("./pages/Affiliate"));
const Contact = lazy(() => import("./pages/Contact"));
const Shop = lazy(() => import("./pages/Shop"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const SsgPlaybook = lazy(() => import("./pages/SsgPlaybook"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function PageTrackingWrapper() {
  usePageTracking();
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageTrackingWrapper />
          {/* ✅ Suspense sorgt für Lazy Loading */}
          <Suspense
            fallback={<div className="p-6 text-sm text-muted-foreground">Loading…</div>}
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/drills" element={<DrillLibrary />} />
              <Route path="/drills/:slug" element={<DrillTemplate />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/free-resources" element={<FreeResources />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/affiliate" element={<Affiliate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/ssg-playbook" element={<SsgPlaybook />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
