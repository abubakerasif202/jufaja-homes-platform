import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import JufajaLogo from '@/components/brand/JufajaLogo';

export default function Footer() {
  return (
    <footer className="bg-jufaja-forest text-jufaja-ivory pt-20 pb-12 border-t border-jufaja-gold/20 relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-blueprint-fine opacity-5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand & Mission Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-12 border-b border-white/10 gap-6">
          <div className="max-w-md">
            <Link href="/" className="inline-block mb-4">
              <JufajaLogo theme="dark" size="lg" />
            </Link>
            <p className="text-xs sm:text-sm text-jufaja-ivory/70 font-sans leading-relaxed">
              Specialist Australian residential builders delivering architectural homes, custom builds, duplex developments, and turnkey house &amp; land packages across Greater Sydney and NSW.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-jufaja-gold hover:bg-jufaja-gold-400 text-jufaja-forest text-xs font-semibold px-5 py-3 rounded-lg uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Book Architectural Consult</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-jufaja-ivory text-xs font-medium px-5 py-3 rounded-lg uppercase tracking-wider transition-colors"
            >
              <span>Explore Our Work</span>
            </Link>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-white/10">
          
          {/* Col 1: Home Designs */}
          <div>
            <h4 className="text-jufaja-gold text-xs font-semibold uppercase tracking-widest mb-4">
              Home Designs
            </h4>
            <ul className="space-y-2.5 text-xs text-jufaja-ivory/75 font-sans">
              <li><Link href="/designs" className="hover:text-jufaja-gold transition-colors">Master Design Catalogue (63)</Link></li>
              <li><Link href="/designs?dwelling_type=single" className="hover:text-jufaja-gold transition-colors">Single Storey Homes</Link></li>
              <li><Link href="/designs?dwelling_type=double" className="hover:text-jufaja-gold transition-colors">Double Storey Homes</Link></li>
              <li><Link href="/designs?dwelling_type=duplex" className="hover:text-jufaja-gold transition-colors">Duplexes &amp; Dual Living</Link></li>
              <li><Link href="/designs?dwelling_type=granny" className="hover:text-jufaja-gold transition-colors">Integrated Granny Flats</Link></li>
              <li><Link href="/designs?has_tour=true" className="hover:text-jufaja-gold transition-colors text-jufaja-gold-400">3D Virtual Tours</Link></li>
            </ul>
          </div>

          {/* Col 2: Services & Packages */}
          <div>
            <h4 className="text-jufaja-gold text-xs font-semibold uppercase tracking-widest mb-4">
              Building Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-jufaja-ivory/75 font-sans">
              <li><Link href="/projects" className="hover:text-jufaja-gold transition-colors font-medium text-white">Our Work / Portfolio</Link></li>
              <li><Link href="/knockdown-rebuild" className="hover:text-jufaja-gold transition-colors">Knockdown Rebuild Service</Link></li>
              <li><Link href="/custom-homes" className="hover:text-jufaja-gold transition-colors">Bespoke Custom Homes</Link></li>
              <li><Link href="/packages?type=house_and_land" className="hover:text-jufaja-gold transition-colors">House &amp; Land Packages</Link></li>
              <li><Link href="/packages?type=ready_built" className="hover:text-jufaja-gold transition-colors">Ready Built Homes</Link></li>
            </ul>
          </div>

          {/* Col 3: Quality & Standards */}
          <div>
            <h4 className="text-jufaja-gold text-xs font-semibold uppercase tracking-widest mb-4">
              Engineering &amp; Standards
            </h4>
            <ul className="space-y-2.5 text-xs text-jufaja-ivory/75 font-sans">
              <li><Link href="/about-us" className="hover:text-jufaja-gold transition-colors">The JUFAJA Difference</Link></li>
              <li><Link href="/about-us#hold-points" className="hover:text-jufaja-gold transition-colors">4-Point Quality Hold Points</Link></li>
              <li><Link href="/about-us#leadership" className="hover:text-jufaja-gold transition-colors">Engineering Leadership</Link></li>
              <li><Link href="/inclusions" className="hover:text-jufaja-gold transition-colors">Standard Inclusions</Link></li>
              <li><Link href="/inclusions#luxury" className="hover:text-jufaja-gold transition-colors">Luxe Upgrade Options</Link></li>
            </ul>
          </div>

          {/* Col 4: Locations */}
          <div>
            <h4 className="text-jufaja-gold text-xs font-semibold uppercase tracking-widest mb-4">
              Display &amp; Studios
            </h4>
            <ul className="space-y-2.5 text-xs text-jufaja-ivory/75 font-sans">
              <li><Link href="/display-homes#homeworld-box-hill" className="hover:text-jufaja-gold transition-colors">Box Hill &bull; Homeworld</Link></li>
              <li><Link href="/display-homes#homeworld-leppington" className="hover:text-jufaja-gold transition-colors">Leppington &bull; Homeworld</Link></li>
              <li><Link href="/display-homes#oxley-ridge-cobbitty" className="hover:text-jufaja-gold transition-colors">Cobbitty &bull; Oxley Ridge</Link></li>
              <li><Link href="/display-homes#prestons-head-office" className="hover:text-jufaja-gold transition-colors">Prestons &bull; Head Office</Link></li>
            </ul>
          </div>

          {/* Col 5: Head Office & Contact */}
          <div>
            <h4 className="text-jufaja-gold text-xs font-semibold uppercase tracking-widest mb-4">
              Headquarters
            </h4>
            <div className="space-y-3 text-xs text-jufaja-ivory/75 font-sans">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-jufaja-gold shrink-0 mt-0.5" />
                <span>1 Avalli Road, Prestons NSW 2170</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-jufaja-gold shrink-0" />
                <a href="tel:0287838800" className="hover:text-jufaja-gold font-semibold">(02) 8783 8800</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-jufaja-gold shrink-0" />
                <a href="mailto:info@jufajahomes.com.au" className="hover:text-jufaja-gold">info@jufajahomes.com.au</a>
              </p>
              <div className="pt-2">
                <span className="text-[11px] text-jufaja-ivory/60 block">
                  Monday &ndash; Friday: 8:30am &ndash; 5:00pm
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Licences, Credentials & Legal */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-jufaja-ivory/60 gap-4 font-sans">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-jufaja-ivory font-medium">
              <ShieldCheck className="w-4 h-4 text-jufaja-gold" />
              <span>Licensed Residential Master Builder NSW</span>
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-1.5 text-jufaja-ivory font-medium">
              <CheckCircle2 className="w-4 h-4 text-jufaja-gold" />
              <span>AS 2870 &amp; AS 1684 Certified Compliance</span>
            </span>
          </div>

          <div>
            <p>&copy; {new Date().getFullYear()} JUFAJA Constructions Pty Ltd. All rights reserved.</p>
          </div>

          <div className="flex space-x-6 text-jufaja-ivory/60">
            <Link href="/privacy" className="hover:text-jufaja-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-jufaja-gold transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-jufaja-gold transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
