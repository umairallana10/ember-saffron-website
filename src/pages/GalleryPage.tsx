import React, { useState, useEffect } from 'react';
import { Page, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/galleryData';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: Page) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'dishes', label: 'Culinary Dishes' },
    { id: 'hearth', label: 'The Charcoal Hearth' },
    { id: 'interior', label: 'Dining & Interiors' },
    { id: 'drinks', label: 'Drinks & Qahwa' },
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === 'Escape') {
        setActiveItemIndex(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, filteredItems]);

  const handleNext = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) => (prev! + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : null;

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#58151E] mb-3">
            <span>Visual Archive</span>
            <span aria-hidden="true">·</span>
            <span>Adliya Block 338</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#1E1B18] mb-4">
            Atmosphere &amp; Artistry
          </h1>
          <p className="text-sm sm:text-base text-[#5C5349] font-light leading-relaxed">
            Moments captured around the wood hearth, handcrafted plates, amber-lit arches, and fragrant jasmine courtyard.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#E8DFD1] pb-6 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveItemIndex(null);
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#58151E] text-white shadow-xs'
                  : 'bg-[#F2ECE1] text-[#4A423B] hover:bg-[#EAE2D5] hover:text-[#1E1B18]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveItemIndex(index)}
              className="group relative bg-[#FAF7F2] border border-[#E5DDD0] overflow-hidden cursor-pointer aspect-4/3 transition-all duration-300 hover:shadow-lg"
            >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                fallbackCategory={item.category}
                fallbackTitle={item.title}
              />

              {/* Hover Overlay with Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium">
                    {item.category}
                  </span>
                  <Eye className="w-4 h-4 text-white/80" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#FAF7F2] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#D4CCC0] line-clamp-2 mt-1 font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#1C1815] text-[#FAF7F2] p-8 sm:p-12 text-center border border-[#2E2823] space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
            Experience the Atmosphere in Person
          </h3>
          <p className="text-xs sm:text-sm text-[#B8AEA3] max-w-md mx-auto font-light leading-relaxed">
            Reserve a table in our Main Dining Hall, Hearthside Counter, or Jasmine Terrace.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                onNavigate('reservations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3 bg-[#58151E] hover:bg-[#741E2B] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Reserve a Table
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setActiveItemIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#1C1815] border border-white/10 text-white overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with counter & close */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161311]">
              <div className="flex items-center gap-2 text-xs text-[#C5A059] uppercase tracking-wider">
                <span>{currentItem.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-white/60">
                  {activeItemIndex! + 1} of {filteredItems.length}
                </span>
              </div>
              <button
                onClick={() => setActiveItemIndex(null)}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-none transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Area with Previous / Next Buttons */}
            <div className="relative aspect-16/10 sm:aspect-16/9 w-full bg-black flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-contain"
                fallbackCategory={currentItem.category}
                fallbackTitle={currentItem.title}
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-[#58151E] text-white transition-colors border border-white/10"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-[#58151E] text-white transition-colors border border-white/10"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="p-6 bg-[#1C1815] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-xl font-medium text-[#FCFAF6]">
                  {currentItem.title}
                </h4>
                <p className="text-xs text-[#B8AEA3] font-light mt-1 max-w-xl">
                  {currentItem.description}
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveItemIndex(null);
                  onNavigate('reservations');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-[#58151E] hover:bg-[#741E2B] text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
              >
                Reserve Table
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
