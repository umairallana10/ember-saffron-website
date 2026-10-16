import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD1] shadow-xs py-3'
          : 'bg-[#FAF7F2] border-b border-[#EFE9DD] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1E1B18] hover:text-[#58151E] transition-colors whitespace-nowrap shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#58151E]"
            aria-label="Ember & Saffron Home"
          >
            Ember &amp; Saffron
          </button>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#3E3833]">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
                currentPage === 'home'
                  ? 'text-[#58151E] border-[#58151E] font-semibold'
                  : 'border-transparent text-[#3E3833] hover:text-[#1E1B18]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('menu')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
                currentPage === 'menu'
                  ? 'text-[#58151E] border-[#58151E] font-semibold'
                  : 'border-transparent text-[#3E3833] hover:text-[#1E1B18]'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
                currentPage === 'about'
                  ? 'text-[#58151E] border-[#58151E] font-semibold'
                  : 'border-transparent text-[#3E3833] hover:text-[#1E1B18]'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
                currentPage === 'gallery'
                  ? 'text-[#58151E] border-[#58151E] font-semibold'
                  : 'border-transparent text-[#3E3833] hover:text-[#1E1B18]'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
                currentPage === 'contact'
                  ? 'text-[#58151E] border-[#58151E] font-semibold'
                  : 'border-transparent text-[#3E3833] hover:text-[#1E1B18]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('reservations')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#58151E] hover:bg-[#741E2B] transition-colors whitespace-nowrap shrink-0 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            >
              Reserve a Table
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#292420] hover:text-[#58151E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#58151E]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-[#FAF7F2] border-b border-[#E8DFD1] shadow-xl py-6 px-6 z-50 animate-fadeIn">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 border-b border-[#EFE9DD] ${
                currentPage === 'home' ? 'text-[#58151E] font-bold' : 'text-[#292420]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('menu')}
              className={`text-left py-2 border-b border-[#EFE9DD] ${
                currentPage === 'menu' ? 'text-[#58151E] font-bold' : 'text-[#292420]'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left py-2 border-b border-[#EFE9DD] ${
                currentPage === 'about' ? 'text-[#58151E] font-bold' : 'text-[#292420]'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className={`text-left py-2 border-b border-[#EFE9DD] ${
                currentPage === 'gallery' ? 'text-[#58151E] font-bold' : 'text-[#292420]'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-2 border-b border-[#EFE9DD] ${
                currentPage === 'contact' ? 'text-[#58151E] font-bold' : 'text-[#292420]'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => handleNavClick('reservations')}
              className="w-full mt-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#58151E] hover:bg-[#741E2B] transition-colors"
            >
              Reserve a Table
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
