import React, { useState } from 'react';
import { Page, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { GALLERY_ITEMS } from '../data/galleryData';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ArrowRight, Flame, Sparkles, MapPin, Clock, Phone, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onSelectDish?: (dish: MenuItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectDish }) => {
  const featuredDishes = MENU_ITEMS.filter((item) => item.featured).slice(0, 4);
  const previewGallery = GALLERY_ITEMS.slice(0, 6);

  return (
    <div className="space-y-0">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-[#191513] text-[#FAF7F2] overflow-hidden">
        {/* Cinematic Backdrop Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=85"
            alt="Ember & Saffron Restaurant Hearth Ambiance"
            className="w-full h-full object-cover object-center scale-105"
            fallbackCategory="The Ember Hearth"
            fallbackTitle="Ember & Saffron Dining Room"
          />
          {/* Measured Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-[#14110F]/70 to-[#14110F]/50" />
          <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#14110F]/40 to-[#14110F]/80" />
        </div>

        {/* Content Hero Card */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          
          {/* Arabic Subtitle & Location marker */}
          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-4">
            <span>Manama, Bahrain</span>
            <span aria-hidden="true" className="text-[#C5A059]/60">·</span>
            <span>{RESTAURANT_INFO.arabicName}</span>
            <span aria-hidden="true" className="text-[#C5A059]/60">·</span>
            <span>Block 338</span>
          </div>

          {/* Restaurant Title */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#FCFAF6] mb-6 max-w-4xl leading-[1.08] [text-wrap:balance]">
            Where Ancient Embers Meet the Golden Spice of the Gulf
          </h1>

          {/* Tagline / Subtitle */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#D8D0C5] max-w-2xl font-light mb-10 leading-relaxed [text-wrap:balance]">
            Modern Middle Eastern fine dining in the historic quarter of Adliya. Live-fire charcoal grilling, pure Khorasan saffron, and Arabian Gulf seasonal catches.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                onNavigate('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#58151E] hover:bg-[#741E2B] text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            >
              View Menu
            </button>
            <button
              onClick={() => {
                onNavigate('reservations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#FAF7F2]/40 hover:border-[#C5A059] text-[#FAF7F2] hover:text-[#C5A059] text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 backdrop-blur-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            >
              Reserve a Table
            </button>
          </div>

          {/* Quiet Trust Bar */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap justify-center items-center gap-6 sm:gap-12 text-xs text-[#B8AEA3] tracking-wide">
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#C5A059]" /> Mangrove Charcoal Hearth
            </span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> Grade-1 Khorasan Saffron
            </span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" /> Historic Adliya District
            </span>
          </div>

        </div>
      </section>

      {/* 2. RESTAURANT INTRODUCTION */}
      <section className="py-24 bg-[#FAF7F2] text-[#1E1B18] border-b border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Story Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#58151E]">
                <span>Our Vision</span>
                <span aria-hidden="true">·</span>
                <span>Manama, Kingdom of Bahrain</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1E1B18] leading-[1.15] [text-wrap:balance]">
                Honoring the ancient flame with contemporary culinary poetry.
              </h2>
              
              <p className="text-base text-[#4A423B] leading-relaxed font-light">
                At Ember &amp; Saffron, dinner is a multi-sensory tribute to two timeless forces: the raw, primal heat of mangrove wood coals, and the delicate, golden aristocracy of pure saffron threads.
              </p>
              
              <p className="text-base text-[#4A423B] leading-relaxed font-light">
                Nestled within Manama’s vibrant Adliya Block 338, our kitchen reinterprets historic Levantine and Gulf recipes through modern technique—charring coastal seafood over white-hot embers, layering aged black limes, and crafting zero-proof botanical elixirs that linger on the palate.
              </p>

              <div className="pt-4 flex items-center gap-6">
                <button
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#58151E] hover:text-[#741E2B] transition-colors border-b border-[#58151E] pb-1"
                >
                  Read Our Story <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Asymmetric Photo Grid */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-4/5 overflow-hidden border border-[#E8DFD1] shadow-lg bg-[#EFE9DD]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                    alt="Charred lamb chops over live embers"
                    className="w-full h-full object-cover"
                    fallbackCategory="Culinary Craft"
                    fallbackTitle="48-Hour Charred Spiced Lamb"
                  />
                </div>
                {/* Secondary Inset Card */}
                <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-48 sm:w-56 p-4 sm:p-5 bg-[#FAF7F2] border border-[#E0D7C9] shadow-xl text-left hidden sm:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C5A059] mb-1">
                    Mangrove Charcoal
                  </p>
                  <p className="font-serif text-lg text-[#1E1B18] font-medium leading-tight">
                    Smoked to tender perfection
                  </p>
                  <p className="text-xs text-[#6B6156] mt-1">48-hour slow marinade</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED DISHES */}
      <section className="py-24 bg-[#F5F0E6] text-[#1E1B18] border-b border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#58151E] mb-2">
                <span>The Culinary Highlights</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1E1B18]">
                Featured Dishes
              </h2>
            </div>
            <button
              onClick={() => {
                onNavigate('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#58151E] hover:text-[#741E2B] transition-colors border-b border-[#58151E] pb-0.5 self-start md:self-end"
            >
              Explore Full Menu <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Featured Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-[#FAF7F2] border border-[#E5DDD0] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md group"
              >
                {/* Image */}
                <div className="aspect-4/3 overflow-hidden bg-[#EAE2D5] relative">
                  <ImageWithFallback
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fallbackCategory={dish.category}
                    fallbackTitle={dish.name}
                  />
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Clean metadata without pill boxes */}
                    <div className="flex items-center gap-2 text-[11px] text-[#7A7065] uppercase tracking-wider mb-2 font-medium">
                      <span>{dish.category}</span>
                      {dish.dietary && dish.dietary.length > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{dish.dietary[0]}</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-medium text-[#1E1B18] group-hover:text-[#58151E] transition-colors mb-2 leading-snug">
                      {dish.name}
                    </h3>
                    
                    <p className="text-xs text-[#5C5349] leading-relaxed line-clamp-3 mb-4 font-light">
                      {dish.description}
                    </p>
                  </div>

                  {/* Baseline Price & CTA */}
                  <div className="pt-4 border-t border-[#EFE9DD] flex items-center justify-between">
                    <span className="font-sans font-semibold text-sm text-[#1E1B18] tabular-nums">
                      {dish.priceBHD.toFixed(3)} BHD
                    </span>
                    <button
                      onClick={() => {
                        onNavigate('menu');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-semibold text-[#58151E] hover:text-[#741E2B] transition-colors"
                    >
                      View in Menu &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tasting Menu Banner Strip */}
          <div className="mt-16 bg-[#1C1815] text-[#FAF7F2] p-8 sm:p-10 border border-[#2E2823] flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                Executive Chef’s Degustation
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                The Saffron Silk &amp; Ember 7-Course Journey
              </h3>
              <p className="text-xs sm:text-sm text-[#B8AEA3] max-w-2xl font-light">
                An unforgettable dining progression exploring Arabian Gulf sea catches, heritage lamb, and wild botanicals paired with non-alcoholic vintage fermentations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <span className="text-lg font-serif font-medium text-[#C5A059] tabular-nums">
                32.000 BHD <span className="text-xs font-sans text-[#A89E93]">/ guest</span>
              </span>
              <button
                onClick={() => {
                  onNavigate('reservations');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#58151E] hover:bg-[#741E2B] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Reserve Experience
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. WHY EMBER & SAFFRON */}
      <section className="py-24 bg-[#FAF7F2] text-[#1E1B18] border-b border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#58151E] mb-2">
              <span>The Philosophy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1E1B18] mb-4">
              Why Ember &amp; Saffron
            </h2>
            <p className="text-sm sm:text-base text-[#5C5349] font-light leading-relaxed">
              We bring together ancient culinary heritage and modern aesthetic restraint to create a dining experience of quiet luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-[#FFFFFF] p-8 border border-[#E8DFD1] space-y-4">
              <div className="w-12 h-12 bg-[#FAF7F2] border border-[#E0D7C9] flex items-center justify-center text-[#58151E]">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#1E1B18]">
                The Live Charcoal Hearth
              </h3>
              <p className="text-sm text-[#5C5349] leading-relaxed font-light">
                Our custom hearth burns sustainably harvested mangrove charcoal and olive wood. The intense clean radiance imparts a smoky caramelization without sacrificing natural moisture or tenderness.
              </p>
              <div className="text-xs text-[#7A7065] pt-2 border-t border-[#F0EBE0]">
                <span>Pure Wood Fire</span>
                <span className="mx-2">·</span>
                <span>400°C Radiant Heat</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#FFFFFF] p-8 border border-[#E8DFD1] space-y-4">
              <div className="w-12 h-12 bg-[#FAF7F2] border border-[#E0D7C9] flex items-center justify-center text-[#C5A059]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#1E1B18]">
                Grade-1 Khorasan Saffron
              </h3>
              <p className="text-sm text-[#5C5349] leading-relaxed font-light">
                We procure hand-picked, single-estate saffron crocus stigmas from the Khorasan highlands. The threads yield deep crimson color, honeyed warmth, and an incomparable earthy floral perfume.
              </p>
              <div className="text-xs text-[#7A7065] pt-2 border-t border-[#F0EBE0]">
                <span>Single-Estate Harvest</span>
                <span className="mx-2">·</span>
                <span>Hand-Infused</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#FFFFFF] p-8 border border-[#E8DFD1] space-y-4">
              <div className="w-12 h-12 bg-[#FAF7F2] border border-[#E0D7C9] flex items-center justify-center text-[#58151E]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#1E1B18]">
                Arabian Gulf Bounty &amp; Adliya
              </h3>
              <p className="text-sm text-[#5C5349] leading-relaxed font-light">
                Situated in Bahrain's bohemian arts quarter of Block 338, our kitchen celebrates fresh Hamour, wild prawns, local dates, and Omani black limes with celebrated Bahraini hospitality.
              </p>
              <div className="text-xs text-[#7A7065] pt-2 border-t border-[#F0EBE0]">
                <span>Adliya Block 338</span>
                <span className="mx-2">·</span>
                <span>Fresh Gulf Catch Daily</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. GALLERY PREVIEW */}
      <section className="py-24 bg-[#F5F0E6] text-[#1E1B18] border-b border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#58151E] mb-2">
                <span>The Atmosphere &amp; Craft</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1E1B18]">
                Visual Impressions
              </h2>
            </div>
            <button
              onClick={() => {
                onNavigate('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#58151E] hover:text-[#741E2B] transition-colors border-b border-[#58151E] pb-0.5 self-start md:self-end"
            >
              View Full Gallery ({GALLERY_ITEMS.length} Photos) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grid Preview */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {previewGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onNavigate('gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative aspect-4/3 overflow-hidden bg-[#E2D8C9] border border-[#DCD1BF] cursor-pointer"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  fallbackCategory={item.category}
                  fallbackTitle={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium">
                    {item.category}
                  </span>
                  <p className="font-serif text-sm font-medium text-white line-clamp-1">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. RESERVATION CTA */}
      <section className="relative py-24 bg-[#1E1815] text-[#FAF7F2] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
            alt="Interior dining background"
            className="w-full h-full object-cover"
            fallbackCategory="Atmosphere"
            fallbackTitle="Dining Sanctuary"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059]">
            Join Us for Dinner
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FCFAF6] leading-tight [text-wrap:balance]">
            Reserve Your Table by the Hearth
          </h2>
          <p className="text-sm sm:text-base text-[#D4CCC0] font-light max-w-xl mx-auto leading-relaxed">
            Whether an intimate anniversary, a family celebration, or an evening with friends, we welcome you to the hearth.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                onNavigate('reservations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#58151E] hover:bg-[#741E2B] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-colors shadow-lg"
            >
              Book a Table Now
            </button>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappPhone}?text=Hello%20Ember%20%26%20Saffron%2C%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#FAF7F2]/40 hover:border-[#C5A059] text-[#FAF7F2] hover:text-[#C5A059] text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </section>

      {/* 7. LOCATION & CONTACT PREVIEW */}
      <section className="py-20 bg-[#FAF7F2] text-[#1E1B18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#EFE9DD]">
              
              {/* Col 1: Location */}
              <div className="space-y-3 md:pr-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58151E]">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>Location</span>
                </div>
                <h4 className="font-serif text-xl font-medium text-[#1E1B18]">
                  Adliya, Manama
                </h4>
                <p className="text-xs text-[#5C5349] leading-relaxed">
                  {RESTAURANT_INFO.address}
                </p>
                <p className="text-[11px] text-[#7A7065]">
                  Complimentary Valet Parking available at main entrance.
                </p>
              </div>

              {/* Col 2: Hours */}
              <div className="space-y-3 pt-6 md:pt-0 md:px-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58151E]">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                  <span>Opening Hours</span>
                </div>
                <h4 className="font-serif text-xl font-medium text-[#1E1B18]">
                  Daily Service
                </h4>
                <div className="text-xs text-[#5C5349] space-y-1">
                  <p><strong className="font-medium text-[#1E1B18]">Lunch:</strong> {RESTAURANT_INFO.hours.lunch}</p>
                  <p><strong className="font-medium text-[#1E1B18]">Dinner:</strong> {RESTAURANT_INFO.hours.dinnerWeekdays}</p>
                  <p><strong className="font-medium text-[#1E1B18]">Weekends:</strong> {RESTAURANT_INFO.hours.dinnerWeekends}</p>
                </div>
              </div>

              {/* Col 3: Contact */}
              <div className="space-y-3 pt-6 md:pt-0 md:pl-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58151E]">
                    <Phone className="w-4 h-4 text-[#C5A059]" />
                    <span>Inquiries</span>
                  </div>
                  <h4 className="font-serif text-xl font-medium text-[#1E1B18]">
                    Direct Reservations
                  </h4>
                  <p className="text-xs text-[#5C5349] mt-1">
                    Phone: <span className="font-medium text-[#1E1B18]">{RESTAURANT_INFO.phone}</span>
                  </p>
                  <p className="text-xs text-[#5C5349]">
                    Email: <span className="font-medium text-[#1E1B18]">{RESTAURANT_INFO.email}</span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#58151E] hover:text-[#741E2B] flex items-center gap-1.5 transition-colors"
                >
                  View Map &amp; Directions <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
