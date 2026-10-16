import React from 'react';
import { Page } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Flame, Sparkles, Wind, Award, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* 1. Header & Lead Story */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#58151E]">
            <span>Our Heritage</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2024 · Manama, Bahrain</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#1E1B18] leading-tight">
            The Story of Ember &amp; Saffron
          </h1>
          <p className="text-base sm:text-lg text-[#5C5349] font-light leading-relaxed [text-wrap:balance]">
            A sanctuary of fire, spice, and Arabian maritime warmth in the historic bohemian quarter of Adliya Block 338.
          </p>
        </section>

        {/* 2. Asymmetric Story Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1B18] leading-tight">
              Bridging the Ancient Silk Road with Gulf Maritime Bounty
            </h2>
            <p className="text-sm sm:text-base text-[#4A423B] leading-relaxed font-light">
              For centuries, the Kingdom of Bahrain was the shimmering pearl of the Gulf—an open maritime crossroads where Persian saffron, Levantine olive oils, and Indian spices met the warmth of island hospitality.
            </p>
            <p className="text-sm sm:text-base text-[#4A423B] leading-relaxed font-light">
              Ember &amp; Saffron was born from a desire to reclaim those historic culinary roots while shedding tired buffet clichés. We reimagined traditional Middle Eastern dining as an architectural, sensory ritual centered around a live-ember mangrove wood hearth.
            </p>
            <p className="text-sm sm:text-base text-[#4A423B] leading-relaxed font-light">
              Here, the crackle of glowing coals meets the intoxicating honey-floral perfume of hand-harvested Khorasan saffron, paired with the freshest catches landed each dawn by local Bahraini dhow fishermen.
            </p>

            <div className="pt-2 border-t border-[#E8DFD1] grid grid-cols-2 gap-4 text-xs text-[#6B6156]">
              <div>
                <p className="font-serif text-2xl font-medium text-[#58151E]">100%</p>
                <p className="mt-1">Live charcoal &amp; wood fuel. No gas stoves on the grill.</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-medium text-[#C5A059]">Grade-1</p>
                <p className="mt-1">Single-estate saffron sourced directly from Khorasan.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div className="aspect-4/3 overflow-hidden border border-[#E0D7C9] shadow-lg bg-[#EAE2D5]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Ember & Saffron culinary team at the open hearth counter"
                  className="w-full h-full object-cover"
                  fallbackCategory="Our Kitchen"
                  fallbackTitle="The Open Hearth Counter"
                />
              </div>
              <div className="mt-3 text-right">
                <span className="text-[11px] text-[#8E8377] italic">
                  The open fire pit and preparation counter at our Adliya residence
                </span>
              </div>
            </div>
          </div>

        </section>

        {/* 3. Culinary Philosophy: Three Pillars */}
        <section className="bg-[#F5F0E6] border border-[#E5DDD0] p-8 sm:p-14">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#58151E]">
              Our Three Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1B18] mt-2 mb-4">
              The Culinary Philosophy
            </h2>
            <p className="text-sm text-[#5C5349] font-light">
              We do not mask flavors with heavy sauces. Every technique is calibrated to honor the intrinsic purity of prime ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-[#FAF7F2] p-8 border border-[#E8DFD1] space-y-3">
              <div className="w-10 h-10 bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center text-[#58151E] mb-4">
                <Flame className="w-5 h-5 text-[#58151E]" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1E1B18]">
                1. The Mangrove Hearth
              </h3>
              <p className="text-xs text-[#5C5349] leading-relaxed font-light">
                Our custom iron mangal hearth uses mangrove charcoal and seasoned olive logs. The radiant white coals generate dry, intense heat that instantly sears marinades, sealing juices while yielding an unmistakable kiss of sweet hardwood smoke.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 border border-[#E8DFD1] space-y-3">
              <div className="w-10 h-10 bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] mb-4">
                <Sparkles className="w-5 h-5 text-[#C5A059]" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1E1B18]">
                2. Khorasan Saffron Gold
              </h3>
              <p className="text-xs text-[#5C5349] leading-relaxed font-light">
                Known as the red gold of the ancient Orient, our saffron is harvested at daybreak in high-altitude Khorasan. We extract its soul through ice-blooming and clarified butter infusions, giving our pilafs, broths, and pastries radiant luminescence.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 border border-[#E8DFD1] space-y-3">
              <div className="w-10 h-10 bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center text-[#58151E] mb-4">
                <Wind className="w-5 h-5 text-[#58151E]" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1E1B18]">
                3. Gulf Sea Catch &amp; Terroir
              </h3>
              <p className="text-xs text-[#5C5349] leading-relaxed font-light">
                We partner with artisanal Bahraini fishers for local Hamour, Chan’ad (kingfish), and wild tiger prawns. We cure them with sun-dried black limes from Oman, wild sea fennel, and aged sumac from the hills of Mount Lebanon.
              </p>
            </div>

          </div>
        </section>

        {/* 4. The Atmosphere & Architecture */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-4/5 overflow-hidden border border-[#E0D7C9] bg-[#E8DFD1]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="Limestone dining room arches"
                  className="w-full h-full object-cover"
                  fallbackCategory="Atmosphere"
                  fallbackTitle="Limestone Arches"
                />
              </div>
              <div className="aspect-4/5 overflow-hidden border border-[#E0D7C9] bg-[#E8DFD1] mt-8">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80"
                  alt="Jasmine courtyard evening terrace"
                  className="w-full h-full object-cover"
                  fallbackCategory="Atmosphere"
                  fallbackTitle="Jasmine Courtyard"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#58151E]">
              The Space &amp; Ambiance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1B18] leading-tight">
              An Architectural Sanctuary in Block 338
            </h2>
            <p className="text-sm sm:text-base text-[#4A423B] leading-relaxed font-light">
              Designed in collaboration with regional artisans, the restaurant’s interior combines textured cream limestone walls, dark oiled walnut dining tables, and plush burgundy velvet banquettes.
            </p>
            <p className="text-sm sm:text-base text-[#4A423B] leading-relaxed font-light">
              Custom hand-hammered brass pendants cast a warm, honey-hued glow reminiscent of saffron sunsets over the Arabian Sea. Guests may dine at the lively Hearth Counter, retreat to the intimate arches of our Main Room, or breathe the fragrant air of our Jasmine Courtyard Terrace under centuries-old olive trees.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  onNavigate('gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#58151E] hover:text-[#741E2B] transition-colors border-b border-[#58151E] pb-1"
              >
                Explore Architectural Gallery <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </section>

        {/* 5. Chef & Hearth Master Spotlight */}
        <section className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 aspect-square overflow-hidden bg-[#E8DFD1] border border-[#E0D7C9]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
                alt="Executive Chef Faris Al-Khatib"
                className="w-full h-full object-cover"
                fallbackCategory="Leadership"
                fallbackTitle="Executive Chef Faris Al-Khatib"
              />
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58151E]">
                <Award className="w-4 h-4 text-[#C5A059]" />
                <span>Culinary Direction</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1E1B18]">
                Chef Faris Al-Khatib
              </h3>
              <p className="text-xs uppercase tracking-wider text-[#7A7065]">
                Executive Chef &amp; Fire Master
              </p>
              <p className="text-sm text-[#4A423B] leading-relaxed font-light">
                "Our philosophy is rooted in restraint. Cooking over open embers teaches patience and humility. We do not hide our ingredients behind heavy sauces or artificial culinary theater; instead, we let pristine Gulf fish and fragrant saffron speak with their purest voice."
              </p>
              <p className="text-xs text-[#8E8377] italic pt-1">
                Trained in Beirut, Paris, and Dubai · Head of Culinary at Ember &amp; Saffron since 2024
              </p>
            </div>

          </div>
        </section>

        {/* 6. Reservation CTA Card */}
        <section className="bg-[#1C1815] text-[#FAF7F2] p-10 sm:p-14 text-center space-y-6 border border-[#2E2823]">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#FAF7F2]">
            Experience Ember &amp; Saffron in Person
          </h2>
          <p className="text-sm text-[#B8AEA3] max-w-lg mx-auto font-light leading-relaxed">
            We invite you to taste the heritage of flame and saffron. Reserve your table or contact our concierge for private events.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                onNavigate('reservations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-[#58151E] hover:bg-[#741E2B] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => {
                onNavigate('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 border border-white/30 hover:border-[#C5A059] text-white hover:text-[#C5A059] text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Browse The Menu
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
