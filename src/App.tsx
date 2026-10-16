/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { ContactPage } from './pages/ContactPage';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1B18] antialiased">
      {/* Top Bar Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content View */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'menu' && <MenuPage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}
        {currentPage === 'reservations' && <ReservationsPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      </main>

      {/* Professional Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-[#1C1815] text-[#FAF7F2] border border-[#C5A059]/40 hover:bg-[#58151E] shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4 text-[#C5A059]" />
        </button>
      )}
    </div>
  );
}
