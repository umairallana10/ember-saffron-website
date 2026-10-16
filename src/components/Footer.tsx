import React, { useState } from 'react';
import { Page } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { MapPin, Phone, Mail, Clock, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  const handleLink = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1815] text-[#FAF7F2] border-t border-[#2E2823] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Story */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#FAF7F2]">
                Ember &amp; Saffron
              </span>
              <span className="font-serif text-sm text-[#C5A059] tracking-widest mt-1">
                {RESTAURANT_INFO.arabicName}
              </span>
            </div>
            <p className="text-sm text-[#B8AEA3] leading-relaxed pr-4">
              Modern Middle Eastern cuisine rooted in the ancient fire cooking of the Levant and the golden spice routes of the Arabian Gulf.
            </p>
            <div className="pt-2 text-xs text-[#8E8377] space-y-1">
              <p>Adliya Block 338 · Manama, Bahrain</p>
              <p>Valet Parking Available</p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D8D0C5]">
              <li>
                <button
                  onClick={() => handleLink('home')}
                  className="hover:text-[#FAF7F2] hover:underline underline-offset-4 transition-colors"
                >
                  Home &amp; Highlights
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('menu')}
                  className="hover:text-[#FAF7F2] hover:underline underline-offset-4 transition-colors"
                >
                  A La Carte Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="hover:text-[#FAF7F2] hover:underline underline-offset-4 transition-colors"
                >
                  Our Story &amp; Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('gallery')}
                  className="hover:text-[#FAF7F2] hover:underline underline-offset-4 transition-colors"
                >
                  Visual Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('reservations')}
                  className="hover:text-[#FAF7F2] hover:underline underline-offset-4 transition-colors"
                >
                  Book a Table
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('contact')}
                  className="hover:text-[#FAF7F2] hover:underline underline-offset-4 transition-colors"
                >
                  Location &amp; Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Service */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              Opening Hours
            </h4>
            <div className="space-y-3 text-sm text-[#D8D0C5]">
              <div>
                <p className="font-medium text-[#FAF7F2]">Lunch Service</p>
                <p className="text-xs text-[#9E9488]">{RESTAURANT_INFO.hours.lunch}</p>
              </div>
              <div>
                <p className="font-medium text-[#FAF7F2]">Dinner Service</p>
                <p className="text-xs text-[#9E9488]">{RESTAURANT_INFO.hours.dinnerWeekdays}</p>
              </div>
              <div>
                <p className="font-medium text-[#FAF7F2]">Weekend Lounge (Thu–Fri)</p>
                <p className="text-xs text-[#9E9488]">{RESTAURANT_INFO.hours.dinnerWeekends}</p>
              </div>
              <p className="text-[11px] text-[#7A7065] italic pt-1">
                {RESTAURANT_INFO.hours.kitchenClose}
              </p>
            </div>
          </div>

          {/* Contact & Dispatch */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              Stay Connected
            </h4>
            <p className="text-xs text-[#B8AEA3] leading-relaxed">
              Receive seasonal menu announcements and exclusive chef table invitations.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-[#2A2420] text-sm text-[#FAF7F2] px-3.5 py-2.5 rounded-l-none border border-[#3E362E] focus:outline-none focus:border-[#C5A059] flex-1 text-xs"
                />
                <button
                  type="submit"
                  className="bg-[#58151E] hover:bg-[#741E2B] text-white px-3.5 flex items-center justify-center transition-colors border border-[#58151E]"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {newsletterSuccess && (
                <div className="flex items-center gap-1.5 text-xs text-[#C5A059] pt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Thank you. You are added to our guest list.</span>
                </div>
              )}
            </form>

            <div className="pt-2 space-y-1.5 text-xs text-[#B8AEA3]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>{RESTAURANT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>{RESTAURANT_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Hairline Divider & Bottom Copyright */}
        <div className="pt-8 border-t border-[#2E2823] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7065]">
          <p>
            &copy; {new Date().getFullYear()} Ember &amp; Saffron. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Block 338, Adliya, Manama, Kingdom of Bahrain · Premium Restaurant Experience
          </p>
        </div>
      </div>
    </footer>
  );
};
