'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [designsDropdownOpen, setDesignsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Banner Alert Bar */}
      <div className="bg-brand-navy text-white text-xs font-medium py-1.5 px-4 hidden md:flex justify-between items-center border-b border-brand-surface/40">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            NSW Licence: 55277C &bull; HIA Member 392133
          </span>
          <span className="text-slate-300">Sydney Display Homes Open Today 10am - 5pm</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="tel:0287838800" className="flex items-center gap-1.5 text-white hover:text-brand-orange transition-colors">
            <Phone className="w-3.5 h-3.5 text-brand-orange" />
            <span className="font-semibold">(02) 8783 8800</span>
          </a>
          <button 
            onClick={triggerEnquiry}
            className="text-brand-orange hover:text-white transition-colors cursor-pointer"
          >
            Request Free Site Feasibility
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full bg-white transition-shadow duration-200 ${isScrolled ? 'shadow-md py-3' : 'py-4'} border-b border-slate-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-brand-navy flex items-center justify-center text-white font-extrabold text-xl tracking-tighter shadow-sm group-hover:bg-brand-surface transition-colors">
              J<span className="text-brand-orange">H</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight leading-none">
                JUFAJA <span className="text-brand-orange">HOMES</span>
              </span>
              <span className="text-[10px] tracking-widest font-semibold text-slate-500 uppercase mt-0.5">
                Considered Construction
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {/* Home Designs Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setDesignsDropdownOpen(true)}
              onMouseLeave={() => setDesignsDropdownOpen(false)}
            >
              <Link 
                href="/designs"
                className={`flex items-center gap-1 text-sm font-bold tracking-wide transition-colors py-2 ${
                  pathname?.startsWith('/designs') ? 'text-brand-orange' : 'text-slate-800 hover:text-brand-orange'
                }`}
              >
                HOME DESIGNS
                <ChevronDown className="w-4 h-4" />
              </Link>

              {designsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2.5 z-50">
                  <Link href="/designs" className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 hover:text-brand-orange font-semibold">
                    All 63 Home Designs
                  </Link>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <Link href="/designs?dwelling_type=single" className="block px-4 py-1.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-orange">
                    Single Storey Homes (23)
                  </Link>
                  <Link href="/designs?dwelling_type=double" className="block px-4 py-1.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-orange">
                    Double Storey Homes (20)
                  </Link>
                  <Link href="/designs?dwelling_type=duplex" className="block px-4 py-1.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-orange">
                    Duplexes & Dual Living (9)
                  </Link>
                  <Link href="/designs?dwelling_type=granny" className="block px-4 py-1.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-orange">
                    Integrated Granny Flats (6)
                  </Link>
                  <Link href="/designs?dwelling_type=rural" className="block px-4 py-1.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-orange">
                    Rural & Acreage Homes (5)
                  </Link>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <Link href="/designs?has_tour=true" className="block px-4 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50">
                    &bull; 3D Virtual Tours
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/knockdown-rebuild" 
              className={`text-sm font-bold tracking-wide transition-colors ${
                pathname === '/knockdown-rebuild' ? 'text-brand-orange' : 'text-slate-800 hover:text-brand-orange'
              }`}
            >
              KNOCKDOWN REBUILD
            </Link>

            <Link 
              href="/packages" 
              className={`text-sm font-bold tracking-wide transition-colors ${
                pathname?.startsWith('/packages') ? 'text-brand-orange' : 'text-slate-800 hover:text-brand-orange'
              }`}
            >
              HOUSE &amp; LAND
            </Link>

            <Link 
              href="/inclusions" 
              className={`text-sm font-bold tracking-wide transition-colors ${
                pathname === '/inclusions' ? 'text-brand-orange' : 'text-slate-800 hover:text-brand-orange'
              }`}
            >
              STUDIO INCLUSIONS
            </Link>

            <Link 
              href="/display-homes" 
              className={`text-sm font-bold tracking-wide transition-colors ${
                pathname === '/display-homes' ? 'text-brand-orange' : 'text-slate-800 hover:text-brand-orange'
              }`}
            >
              DISPLAY HOMES
            </Link>

            <Link 
              href="/custom-homes" 
              className={`text-sm font-bold tracking-wide transition-colors ${
                pathname === '/custom-homes' ? 'text-brand-orange' : 'text-slate-800 hover:text-brand-orange'
              }`}
            >
              CUSTOM HOMES
            </Link>

            <Link 
              href="/contact" 
              className={`text-sm font-bold tracking-wide transition-colors ${
                pathname === '/contact' ? 'text-brand-orange' : 'text-slate-800 hover:text-brand-orange'
              }`}
            >
              CONTACT
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <a 
              href="tel:0287838800"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-brand-navy hover:text-brand-orange transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-orange" />
              (02) 8783 8800
            </a>

            <button 
              onClick={triggerEnquiry}
              className="px-4 py-2 rounded bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold tracking-wide transition-all shadow-sm hover:shadow"
            >
              ENQUIRE NOW
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <a 
              href="tel:0287838800" 
              aria-label="Call JUFAJA Homes" 
              className="p-2 text-brand-navy"
            >
              <Phone className="w-5 h-5 text-brand-orange" />
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-slate-800 hover:text-brand-orange focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <div className="font-bold text-xs text-slate-400 tracking-wider uppercase px-2">Navigation</div>
            <Link href="/designs" className="block px-2 py-2 text-base font-semibold text-slate-800 hover:text-brand-orange">
              Home Designs (All 63)
            </Link>
            <div className="pl-4 space-y-1.5 text-sm text-slate-600">
              <Link href="/designs?dwelling_type=single" className="block py-1 hover:text-brand-orange">Single Storey Homes</Link>
              <Link href="/designs?dwelling_type=double" className="block py-1 hover:text-brand-orange">Double Storey Homes</Link>
              <Link href="/designs?dwelling_type=duplex" className="block py-1 hover:text-brand-orange">Duplexes &amp; Dual Living</Link>
              <Link href="/designs?has_tour=true" className="block py-1 text-blue-600 font-medium">3D Virtual Tours</Link>
            </div>
            <Link href="/knockdown-rebuild" className="block px-2 py-2 text-base font-semibold text-slate-800 hover:text-brand-orange">
              Knockdown Rebuild
            </Link>
            <Link href="/packages" className="block px-2 py-2 text-base font-semibold text-slate-800 hover:text-brand-orange">
              House &amp; Land Packages
            </Link>
            <Link href="/inclusions" className="block px-2 py-2 text-base font-semibold text-slate-800 hover:text-brand-orange">
              Studio Inclusions
            </Link>
            <Link href="/display-homes" className="block px-2 py-2 text-base font-semibold text-slate-800 hover:text-brand-orange">
              Display Homes &amp; Offices
            </Link>
            <Link href="/custom-homes" className="block px-2 py-2 text-base font-semibold text-slate-800 hover:text-brand-orange">
              Custom Architectural Homes
            </Link>
            <Link href="/contact" className="block px-2 py-2 text-base font-semibold text-slate-800 hover:text-brand-orange">
              Contact Us
            </Link>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button 
                onClick={triggerEnquiry}
                className="w-full py-2.5 rounded bg-brand-orange text-white text-center font-bold tracking-wide"
              >
                ENQUIRE NOW
              </button>
              <a 
                href="tel:0287838800"
                className="w-full py-2.5 rounded bg-brand-navy text-white text-center font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                CALL (02) 8783 8800
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
