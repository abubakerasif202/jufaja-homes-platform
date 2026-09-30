import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-12 border-t border-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/60">
          
          {/* Col 1: Home Designs */}
          <div>
            <h4 className="text-brand-orange text-sm font-extrabold uppercase tracking-wider mb-4">
              Home Designs
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link href="/designs" className="hover:text-brand-orange transition-colors">Master Design Catalogue (63)</Link></li>
              <li><Link href="/designs?dwelling_type=single" className="hover:text-brand-orange transition-colors">Single Storey Homes</Link></li>
              <li><Link href="/designs?dwelling_type=double" className="hover:text-brand-orange transition-colors">Double Storey Homes</Link></li>
              <li><Link href="/designs?dwelling_type=duplex" className="hover:text-brand-orange transition-colors">Duplexes &amp; Townhouses</Link></li>
              <li><Link href="/designs?dwelling_type=granny" className="hover:text-brand-orange transition-colors">Integrated Granny Flats</Link></li>
              <li><Link href="/designs?dwelling_type=rural" className="hover:text-brand-orange transition-colors">Rural &amp; Acreage Living</Link></li>
              <li><Link href="/designs?has_tour=true" className="hover:text-brand-orange transition-colors text-blue-300">3D Virtual Tours</Link></li>
            </ul>
          </div>

          {/* Col 2: Services & Packages */}
          <div>
            <h4 className="text-brand-orange text-sm font-extrabold uppercase tracking-wider mb-4">
              Packages &amp; Rebuilds
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link href="/knockdown-rebuild" className="hover:text-brand-orange transition-colors">Knockdown Rebuild Service</Link></li>
              <li><Link href="/custom-homes" className="hover:text-brand-orange transition-colors">Bespoke Custom Homes</Link></li>
              <li><Link href="/packages?type=house_and_land" className="hover:text-brand-orange transition-colors">House &amp; Land Packages</Link></li>
              <li><Link href="/packages?type=ready_built" className="hover:text-brand-orange transition-colors">Ready Built Homes</Link></li>
              <li><Link href="/packages?suburb=austral" className="hover:text-brand-orange transition-colors">Austral Packages</Link></li>
              <li><Link href="/packages?suburb=cobbitty" className="hover:text-brand-orange transition-colors">Cobbitty Packages</Link></li>
              <li><Link href="/packages?suburb=tahmoor" className="hover:text-brand-orange transition-colors">Tahmoor Packages</Link></li>
            </ul>
          </div>

          {/* Col 3: Visit Display Homes */}
          <div>
            <h4 className="text-brand-orange text-sm font-extrabold uppercase tracking-wider mb-4">
              Visit Display Homes
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link href="/display-homes#box-hill" className="hover:text-brand-orange transition-colors">Box Hill &bull; Homeworld</Link></li>
              <li><Link href="/display-homes#leppington" className="hover:text-brand-orange transition-colors">Leppington &bull; Homeworld</Link></li>
              <li><Link href="/display-homes#cobbitty" className="hover:text-brand-orange transition-colors">Cobbitty &bull; Oxley Ridge</Link></li>
              <li><Link href="/display-homes#prestons" className="hover:text-brand-orange transition-colors">Prestons &bull; Head Office</Link></li>
              <li><Link href="/inclusions" className="hover:text-brand-orange transition-colors">JUFAJA Select Studio</Link></li>
            </ul>
          </div>

          {/* Col 4: About & Inclusions */}
          <div>
            <h4 className="text-brand-orange text-sm font-extrabold uppercase tracking-wider mb-4">
              Quality &amp; Standards
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link href="/inclusions" className="hover:text-brand-orange transition-colors">Standard Inclusions</Link></li>
              <li><Link href="/inclusions" className="hover:text-brand-orange transition-colors">Luxe Upgrade Options</Link></li>
              <li><Link href="/about-us" className="hover:text-brand-orange transition-colors">The JUFAJA Difference</Link></li>
              <li><Link href="/about-us" className="hover:text-brand-orange transition-colors">4-Point Quality Hold Points</Link></li>
              <li><Link href="/about-us" className="hover:text-brand-orange transition-colors">Founder Leadership</Link></li>
            </ul>
          </div>

          {/* Col 5: Head Office & Contact */}
          <div>
            <h4 className="text-brand-orange text-sm font-extrabold uppercase tracking-wider mb-4">
              Headquarters
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>1 Avalli Road, Prestons NSW 2170</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="tel:0287838800" className="hover:text-white font-semibold">(02) 8783 8800</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="mailto:info@jufajahomes.com.au" className="hover:text-white">info@jufajahomes.com.au</a>
              </p>
              <div className="pt-2">
                <Link 
                  href="/contact"
                  className="inline-block bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold py-2 px-4 rounded transition-colors uppercase tracking-wider"
                >
                  Book Private Consult
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Licences, Credentials & Legal */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              NSW Building Licence: 55277C
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <Award className="w-4 h-4 text-brand-orange" />
              HIA Member 392133
            </span>
          </div>

          <div>
            <p>&copy; {new Date().getFullYear()} JUFAJA Constructions Pty Ltd. All rights reserved.</p>
          </div>

          <div className="flex space-x-6 text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
