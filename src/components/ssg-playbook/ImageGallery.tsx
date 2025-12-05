import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ImageGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = [
    { id: 1, src: "/lovable-uploads/playbook-pre1.webp", label: "Preview Page 1" },
    { id: 2, src: "/lovable-uploads/playbook-pre2.webp", label: "Preview Page 2" },
    { id: 3, src: "/lovable-uploads/playbook-pre3.webp", label: "Preview Page 3" },
    { id: 4, src: "/lovable-uploads/playbook-pre4.webp", label: "Preview Page 4" },
    { id: 5, src: "/lovable-uploads/playbook-pre5.webp", label: "Preview Page 5" },
  ];

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const goToPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Desktop Gallery */}
      <div className="hidden md:grid md:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            className="overflow-hidden rounded-xl border border-[#f5f5f5]/20 bg-[#111111] hover:border-[#f57520] transition-all group"
          >
            <img
              src={image.src}
              alt={image.label}
              className="w-full h-auto object-contain group-hover:opacity-90 transition-opacity"
            />
          </button>
        ))}
      </div>

      {/* Mobile Gallery */}
      <div className="md:hidden space-y-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            className="w-full aspect-[3/4] overflow-hidden rounded-lg border-2 border-[#f5f5f5]/20 hover:border-[#f57520] transition-all"
          >
            <img
              src={image.src}
              alt={image.label}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl bg-[#111111] border-[#f5f5f5]/20">
          {selectedIndex !== null && (
            <div className="relative flex items-center justify-center">
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].label}
                className="max-h-[80vh] w-auto object-contain rounded-lg"
              />
        
              {/* Prev Button */}
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#111111]/80 hover:bg-[#f57520] rounded-full flex items-center justify-center text-[#f5f5f5] transition-colors"
              >
                ‹
              </button>
        
              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#111111]/80 hover:bg-[#f57520] rounded-full flex items-center justify-center text-[#f5f5f5] transition-colors"
              >
                ›
              </button>
        
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#f5f5f5]/70 text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
