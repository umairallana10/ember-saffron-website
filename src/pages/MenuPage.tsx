import React, { useState, useMemo } from 'react';
import { Page, MenuCategory, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Sparkles, Utensils, X, Info, Flame } from 'lucide-react';

interface MenuPageProps {
  onNavigate: (page: Page) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesDietary =
        dietaryFilter === 'all' ||
        (item.dietary && item.dietary.includes(dietaryFilter as any));
      return matchesCategory && matchesDietary;
    });
  }, [activeCategory, dietaryFilter]);

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'All Offerings' },
    { id: 'starters', label: 'Starters & Mezze' },
    { id: 'mains', label: 'Main Courses & Hearth' },
    { id: 'desserts', label: 'Desserts & Sweets' },
    { id: 'drinks', label: 'Botanicals & Qahwa' },
  ];

  const dietaryOptions = [
    { id: 'all', label: 'All Dishes' },
    { id: "Chef's Signature", label: "Chef's Signature" },
    { id: 'Vegetarian', label: 'Vegetarian' },
    { id: 'Gluten-Free', label: 'Gluten-Free' },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#58151E] mb-3">
            <span>Culinary Repertoire</span>
            <span aria-hidden="true">·</span>
            <span>All Prices in BHD</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#1E1B18] mb-4">
            The Seasonal Menu
          </h1>
          <p className="text-sm sm:text-base text-[#5C5349] font-light leading-relaxed">
            Crafted daily with sustainable Arabian Gulf seafood, free-range poultry, prime grass-fed cuts, and single-harvest Persian saffron.
          </p>
        </div>

        {/* Degustation Tasting Menu Banner */}
        <div className="mb-14 bg-[#1C1815] text-[#FAF7F2] p-8 sm:p-10 border border-[#2E2823] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Experience</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
              The Saffron &amp; Ember 7-Course Degustation
            </h2>
            <p className="text-xs text-[#B8AEA3] font-light max-w-xl">
              Curated by Executive Chef Faris Al-Khatib. Includes Gulf Hamour ceviche, smoked mutabal, charred lamb chops, sea bass, and saffron mille-feuille.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="text-center sm:text-right">
              <span className="font-serif text-2xl text-[#C5A059] font-medium tabular-nums">
                32.000 BHD
              </span>
              <p className="text-[11px] text-[#8E8377]">Per guest · Wine-free pairing available</p>
            </div>
            <button
              onClick={() => {
                onNavigate('reservations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-[#58151E] hover:bg-[#741E2B] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Reserve Degustation
            </button>
          </div>
        </div>

        {/* Category Controls & Dietary Filters */}
        <div className="mb-10 space-y-4">
          
          {/* Main Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#E8DFD1] pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
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

          {/* Dietary Filter Segmented Line */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#5C5349] pt-2">
            <span className="font-medium text-[#1E1B18] tracking-wider uppercase text-[11px]">
              Filter By:
            </span>
            {dietaryOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setDietaryFilter(opt.id)}
                className={`px-3 py-1 text-xs transition-colors rounded-none whitespace-nowrap shrink-0 ${
                  dietaryFilter === opt.id
                    ? 'text-[#58151E] font-bold border-b border-[#58151E]'
                    : 'text-[#6B6156] hover:text-[#1E1B18]'
                }`}
              >
                {opt.label}
              </button>
            ))}
            {dietaryFilter !== 'all' && (
              <button
                onClick={() => setDietaryFilter('all')}
                className="text-[11px] text-[#8E8377] hover:text-[#58151E] underline ml-2"
              >
                Reset Filter
              </button>
            )}
          </div>

        </div>

        {/* Results Counter */}
        <div className="mb-8 flex items-center justify-between text-xs text-[#7A7065] border-b border-[#EFE9DD] pb-3">
          <span>Showing {filteredItems.length} dishes</span>
          <span className="italic text-[11px]">Click any dish for ingredient &amp; pairing details</span>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDish(item)}
              className="bg-[#FFFFFF] border border-[#E8DFD1] p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start transition-all hover:border-[#C5A059]/60 hover:shadow-md cursor-pointer group"
            >
              {/* Dish Image */}
              <div className="w-full sm:w-36 h-36 shrink-0 bg-[#EFE9DD] overflow-hidden relative">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  fallbackCategory={item.category}
                  fallbackTitle={item.name}
                />
              </div>

              {/* Dish Content */}
              <div className="flex-1 flex flex-col justify-between w-full h-full">
                <div>
                  {/* Top Bar with Name & Price */}
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1E1B18] group-hover:text-[#58151E] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      {item.arabicName && (
                        <p className="font-serif text-xs text-[#8E8377] mt-0.5">
                          {item.arabicName}
                        </p>
                      )}
                    </div>
                    <span className="font-sans font-semibold text-sm sm:text-base text-[#1E1B18] tabular-nums shrink-0">
                      {item.priceBHD.toFixed(3)} BHD
                    </span>
                  </div>

                  {/* Clean Metadata (No Pills) */}
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex items-center gap-2 text-[11px] text-[#7A7065] my-2">
                      {item.dietary.map((d, i) => (
                        <React.Fragment key={d}>
                          {i > 0 && <span aria-hidden="true">·</span>}
                          <span className={d === "Chef's Signature" ? "text-[#58151E] font-medium" : ""}>
                            {d}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-[#5C5349] leading-relaxed line-clamp-2 font-light mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Footer Micro-CTA */}
                <div className="pt-3 mt-3 border-t border-[#F2ECE1] flex items-center justify-between text-[11px] text-[#8E8377]">
                  <span className="group-hover:text-[#58151E] transition-colors">View Culinary Details</span>
                  <span className="font-mono text-xs text-[#C5A059]">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-20 text-center bg-[#FFFFFF] border border-[#E8DFD1] p-8">
            <Utensils className="w-10 h-10 text-[#C5A059] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-2xl text-[#1E1B18] mb-2">No dishes match this selection</h3>
            <p className="text-sm text-[#7A7065] mb-6">Try selecting a different dietary filter or category.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('all');
              }}
              className="px-6 py-2.5 bg-[#58151E] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Show All Dishes
            </button>
          </div>
        )}

        {/* Allergen & Dietary Notice */}
        <div className="p-6 bg-[#F5F0E6] border border-[#E5DDD0] text-xs text-[#6B6156] leading-relaxed max-w-3xl mx-auto text-center space-y-1">
          <p className="font-medium text-[#1E1B18]">Special Dietary &amp; Allergy Notice</p>
          <p>
            All our meats are 100% Halal and prepared in accordance with Islamic dietary standards. Please inform your server of any allergies prior to ordering. Cross-contact with sesame, tree nuts, and dairy may occur in our hearth kitchen.
          </p>
        </div>

      </div>

      {/* Dish Detail Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] border border-[#E0D7C9] max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#FAF7F2]/90 hover:bg-[#58151E] hover:text-white text-[#1E1B18] transition-colors rounded-none focus:outline-none"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="aspect-16/9 w-full bg-[#E8DFD1] overflow-hidden relative">
              <ImageWithFallback
                src={selectedDish.image}
                alt={selectedDish.name}
                className="w-full h-full object-cover"
                fallbackCategory={selectedDish.category}
                fallbackTitle={selectedDish.name}
              />
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#7A7065] mb-1">
                  <span>{selectedDish.category}</span>
                  {selectedDish.dietary && selectedDish.dietary.map((d) => (
                    <React.Fragment key={d}>
                      <span aria-hidden="true">·</span>
                      <span className={d === "Chef's Signature" ? "text-[#58151E] font-semibold" : ""}>{d}</span>
                    </React.Fragment>
                  ))}
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1E1B18]">
                  {selectedDish.name}
                </h3>
                {selectedDish.arabicName && (
                  <p className="font-serif text-sm text-[#8E8377] mt-1">{selectedDish.arabicName}</p>
                )}

                <p className="text-xl font-sans font-semibold text-[#58151E] mt-3 tabular-nums">
                  {selectedDish.priceBHD.toFixed(3)} BHD
                </p>
              </div>

              <div className="border-t border-[#E8DFD1] pt-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-2">
                  Description
                </h4>
                <p className="text-sm text-[#4A423B] leading-relaxed font-light">
                  {selectedDish.description}
                </p>
              </div>

              {selectedDish.ingredients && (
                <div className="border-t border-[#E8DFD1] pt-4">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-2">
                    Key Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs text-[#5C5349]">
                    {selectedDish.ingredients.map((ing) => (
                      <span key={ing} className="bg-[#EFE9DD] px-2.5 py-1 text-xs">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedDish.pairingNote && (
                <div className="border-t border-[#E8DFD1] pt-4 bg-[#F5F0E6] p-4 border border-[#E5DDD0]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#58151E] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sommelier Pairing Suggestion</span>
                  </div>
                  <p className="text-xs text-[#4A423B] leading-relaxed">
                    {selectedDish.pairingNote}
                  </p>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedDish(null)}
                  className="px-5 py-2.5 border border-[#D5CCC0] text-xs font-semibold uppercase tracking-wider text-[#4A423B] hover:bg-[#EFE9DD] transition-colors"
                >
                  Back to Menu
                </button>
                <button
                  onClick={() => {
                    setSelectedDish(null);
                    onNavigate('reservations');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 bg-[#58151E] hover:bg-[#741E2B] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Reserve Table to Taste
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
