import React, { useState } from 'react';
import { Camera, ZoomIn, X, ImageOff, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoReviewGalleryProps {
  imageUrls?: string[];
  cropName: string;
}

export const PhotoReviewGallery: React.FC<PhotoReviewGalleryProps> = ({
  imageUrls = [],
  cropName,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <div className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 border-b border-neutral-100 pb-2.5">
          <Camera className="w-4 h-4 text-primary" aria-hidden="true" />
          <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
            Submitted Field Photographs (0)
          </h3>
        </div>
        <div className="p-6 text-center bg-neutral-50 rounded-lg border border-dashed border-neutral-200 text-xs text-neutral-500 flex flex-col items-center gap-1.5">
          <ImageOff className="w-6 h-6 text-neutral-400" />
          <span>No field photographs were attached to this report.</span>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((prev) => (prev! + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((prev) => (prev! - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <div className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-3">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-primary" aria-hidden="true" />
          <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
            Submitted Field Photographs ({imageUrls.length})
          </h3>
        </div>
        <span className="text-[11px] text-neutral-500">
          Click any thumbnail to inspect high resolution
        </span>
      </div>

      {/* Grid of Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
        {imageUrls.map((url, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActivePhotoIdx(idx)}
            className="relative aspect-square rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all cursor-pointer text-left"
            aria-label={`Enlarge photo ${idx + 1} for ${cropName}`}
          >
            <img
              src={url}
              alt={`Crop symptom photo ${idx + 1} for ${cropName}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <ZoomIn className="w-6 h-6" />
            </div>
            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
              Photo {idx + 1}
            </div>
          </button>
        ))}
      </div>

      {/* Modal Lightbox */}
      {activePhotoIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High-resolution photo inspector"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActivePhotoIdx(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setActivePhotoIdx(null);
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
          }}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-neutral-900 rounded-xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="p-3 bg-neutral-950/80 text-white flex items-center justify-between border-b border-white/10">
              <span className="text-xs font-bold font-mono">
                Photo {activePhotoIdx + 1} of {imageUrls.length} — {cropName}
              </span>
              <button
                type="button"
                onClick={() => setActivePhotoIdx(null)}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close photo inspector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image */}
            <div className="relative flex items-center justify-center bg-black min-h-[300px] max-h-[75vh]">
              <img
                src={imageUrls[activePhotoIdx]}
                alt={`Inspecting crop photo ${activePhotoIdx + 1}`}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />

              {imageUrls.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoReviewGallery;
