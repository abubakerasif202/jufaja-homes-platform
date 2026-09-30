'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import JufajaLogo from '@/components/brand/JufajaLogo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [designsDropdownOpen, setDesignsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDesignsDropdownOpen(false);
  }, [pathname]);

  const triggerEnquiry = () => {
    window.dispatchEvent(new CustomEvent('open-enquiry-drawer'));
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/designs', label: 'Home Designs', hasDropdown: true },
    { href: '/packages', label: 'House & Land' },
    { href: '/display-homes', label: 'Display Homes' },
    { href: '/projects', label: 'Our Work' },
    { href: '/about-us', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Value / Concierge Bar (Light & Understated) */}
      <div className="bg-[#163024] text-white text-[11px] font-medium py-1.5 px-4 hidden md:flex justify-between items-center border-b border-jufaja-gold/20">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6 text-stone-200">
            <span className="flex items-center gap-1.5 text-stone-300">
              <span className="w-1.5 h-1.5 rounded-full bg-jufaja-gold"></span>
              Architectural Residential Builders &bull; Sydney &amp; NSW
            </span>
            <span className="hidden lg:inline text-stone-300/80">
              Personal builder service &bull; Quality at every hold point
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="tel:0287838800"
              className="flex items-center gap-1.5 text-stone-200 hover:text-jufaja-gold transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-jufaja-gold" />
              <span>(02) 8783 8800</span>
            </a>
            <button
              onClick={triggerEnquiry}
              className="text-jufaja-gold hover:text-white transition-colors cursor-pointer font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Site Consultation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#ffffff]/96 backdrop-blur-md shadow-sm border-b border-jufaja-gold/30 py-3'
            : 'bg-[#faf8f5]/95 backdrop-blur-sm border-b border-stone-200/80 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Refined JUFAJA Logo */}
          <Link href="/" className="group flex items-center">
            <JufajaLogo size={isScrolled ? 'sm' : 'md'} theme="light" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setDesignsDropdownOpen(true)}
                    onMouseLeave={() => setDesignsDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 text-xs xl:text-sm font-bold tracking-wide transition-colors py-2 uppercase hover-gold-sweep ${
                        isActive
                          ? 'text-jufaja-forest font-extrabold'
                          : 'text-stone-700 hover:text-jufaja-forest'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-jufaja-gold" />
                    </Link>

                    {/* Designs Dropdown Menu */}
                    {designsDropdownOpen && (
                      <div className="absolute top-full -left-4 w-72 bg-white rounded-xl shadow-luxury border border-jufaja-gold/25 py-3 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="px-4 py-1.5 border-b border-stone-100 mb-1">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-jufaja-gold">
                            Pre-Designed Catalogue
                          </span>
                        </div>
                        <Link
                          href="/designs"
                          className="block px-4 py-2 text-xs font-bold text-jufaja-forest hover:bg-jufaja-stone/70 transition-colors"
                        >
                          All 63 Master Home Designs &rarr;
                        </Link>
                        <Link
                          href="/designs?dwelling_type=single"
                          className="block px-4 py-1.5 text-xs text-stone-600 hover:text-jufaja-forest hover:bg-jufaja-stone/70"
                        >
                          Single Storey Homes (23 Plans)
                        </Link>
                        <Link
                          href="/designs?dwelling_type=double"
                          className="block px-4 py-1.5 text-xs text-stone-600 hover:text-jufaja-forest hover:bg-jufaja-stone/70"
                        >
                          Double Storey Residences (20 Plans)
                        </Link>
                        <Link
                          href="/designs?dwelling_type=duplex"
                          className="block px-4 py-1.5 text-xs text-stone-600 hover:text-jufaja-forest hover:bg-jufaja-stone/70"
                        >
                          Duplex &amp; Dual Living (9 Plans)
                        </Link>
                        <Link
                          href="/custom-homes"
                          className="block px-4 py-1.5 text-xs text-stone-600 hover:text-jufaja-forest hover:bg-jufaja-stone/70"
                        >
                          Bespoke Architectural Custom Builds
                        </Link>
                        <Link
                          href="/knockdown-rebuild"
                          className="block px-4 py-1.5 text-xs text-stone-600 hover:text-jufaja-forest hover:bg-jufaja-stone/70"
                        >
                          Knockdown Rebuild Service
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs xl:text-sm font-bold tracking-wide transition-colors py-2 uppercase hover-gold-sweep ${
                    isActive
                      ? 'text-jufaja-forest font-extrabold'
                      : 'text-stone-700 hover:text-jufaja-forest'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Header Action */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={triggerEnquiry}
              className="px-5 py-2.5 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm border border-jufaja-gold/40 flex items-center gap-2 cursor-pointer group"
            >
              <span>Enquire Now</span>
              <span className="w-1.5 h-1.5 rounded-full bg-jufaja-gold group-hover:scale-125 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={triggerEnquiry}
              className="px-3 py-1.5 rounded bg-jufaja-forest text-white text-[11px] font-bold uppercase tracking-wider"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-jufaja-forest hover:bg-jufaja-stone transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 rounded-lg text-sm font-bold text-stone-800 hover:bg-jufaja-stone hover:text-jufaja-forest"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-stone-100 pl-3 space-y-2">
                <Link
                  href="/knockdown-rebuild"
                  className="block text-xs font-semibold text-stone-600"
                >
                  &bull; Knockdown Rebuild
                </Link>
                <Link
                  href="/custom-homes"
                  className="block text-xs font-semibold text-stone-600"
                >
                  &bull; Custom Architectural Homes
                </Link>
                <Link
                  href="/inclusions"
                  className="block text-xs font-semibold text-stone-600"
                >
                  &bull; Inclusions Studio
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex flex-col gap-2.5">
              <button
                onClick={triggerEnquiry}
                className="w-full py-3 rounded-lg bg-jufaja-forest text-white text-xs font-bold uppercase tracking-wider shadow"
              >
                Enquire Online
              </button>
              <a
                href="tel:0287838800"
                className="w-full py-2.5 rounded-lg border border-stone-300 text-center text-xs font-bold text-stone-700 hover:bg-stone-50"
              >
                Call (02) 8783 8800
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
