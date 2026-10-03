'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import JufajaLogo from '@/components/brand/JufajaLogo';

const links = [
  { href: '/', label: 'Home' },
  { href: '/designs', label: 'Home Designs' },
  { href: '/packages', label: 'House & Land Enquiries' },
  { href: '/display-homes', label: 'Display Home Enquiries' },
  { href: '/projects', label: 'Design Studies' },
  { href: '/about-us', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const serviceLinks = [
  { href: '/custom-homes', label: 'Custom Homes' },
  { href: '/knockdown-rebuild', label: 'Knockdown Rebuild' },
  { href: '/inclusions', label: 'Inclusions' },
];

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => { setMenuOpen(false); setServicesOpen(false); }, [pathname]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointer = (event: PointerEvent) => { if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setServicesOpen(false); servicesRef.current?.querySelector('button')?.focus(); } };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onPointer); document.removeEventListener('keydown', onKey); };
  }, [servicesOpen]);

  // A menu hidden by the desktop breakpoint must not leave the document locked.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1280px)');
    const update = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener('change', update);
    return () => desktop.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const background = [...document.querySelectorAll<HTMLElement>('body > main, body > footer')];
    const previousInert = background.map(element => element.inert);
    background.forEach(element => { element.inert = true; });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      drawer.current?.querySelector<HTMLElement>('a, button')?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === 'Tab' && drawer.current) {
        const focusable = [...drawer.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !drawer.current.contains(document.activeElement))) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  // Over the home hero the header is transparent and the logo sits directly on the image with a soft light halo; everywhere else (and once scrolled) it is solid.
  const overlay = pathname === '/' && !scrolled && !menuOpen;

  const openEnquiry = () => {
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('open-enquiry-drawer'));
  };
  const closeMenu = () => {
    setMenuOpen(false);
    menuButton.current?.focus();
  };

  return (
    <header data-menu-open={menuOpen} className="site-header sticky top-0 z-40 w-full border-b border-transparent">
      <div aria-hidden="true" className={`absolute inset-0 -z-10 border-b transition-opacity duration-300 ${overlay ? 'opacity-0' : 'opacity-100'} ${scrolled ? 'border-jufaja-gold/30 bg-white/95 shadow-jufaja-soft backdrop-blur-md' : 'border-jufaja-border bg-jufaja-cream/95 backdrop-blur-sm'}`} />
      <div aria-hidden="true" className={`absolute inset-0 -z-10 bg-gradient-to-b from-jufaja-forest-950/75 to-jufaja-forest-950/0 transition-opacity duration-300 ${overlay ? 'opacity-100' : 'opacity-0'}`} />
      <div className="mx-auto flex min-h-[88px] max-w-[1440px] items-center justify-between gap-2 px-4 min-[360px]:min-h-[100px] min-[360px]:gap-4 sm:min-h-[100px] sm:px-6 lg:px-8">
        <Link href="/" aria-label="JUFAJA Constructions home" className="shrink-0 rounded-sm px-1 py-0.5 min-[360px]:px-2">
          <JufajaLogo size="sm" theme="light" className={overlay ? 'logo-halo' : ''} />
        </Link>

        <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-3 2xl:gap-5">
          {links.map(({ href, label }) => {
            const active = href === '/' ? pathname === '/' : pathname?.startsWith(href);
            return <Link key={href} href={href} aria-current={active ? 'page' : undefined} className={`hover-gold-sweep rounded-sm py-2 text-xs font-semibold tracking-normal transition-colors ${overlay ? `hover:text-jufaja-gold-300 ${active ? 'text-white after:!w-full' : 'text-white/90'}` : `hover:text-jufaja-forest-700 ${active ? 'text-jufaja-forest-900 after:!w-full' : 'text-jufaja-muted'}`}`}>
              {label}
            </Link>;
          })}
          <div ref={servicesRef} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button type="button" aria-expanded={servicesOpen} aria-controls="services-menu" onClick={() => setServicesOpen(true)} className={`hover-gold-sweep inline-flex items-center gap-1 rounded-sm py-2 text-xs font-semibold tracking-normal transition-colors ${overlay ? 'text-white/90 hover:text-jufaja-gold-300' : serviceLinks.some(l => pathname?.startsWith(l.href)) ? 'text-jufaja-forest-900' : 'text-jufaja-muted hover:text-jufaja-forest-700'}`}>
              Services <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div id="services-menu" hidden={!servicesOpen} className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-2">
              <ul className="border border-jufaja-gold/40 bg-white p-2 shadow-jufaja-card">
                {serviceLinks.map(({ href, label }) => <li key={href}><Link href={href} aria-current={pathname?.startsWith(href) ? 'page' : undefined} className="flex min-h-11 items-center px-3 text-sm font-semibold text-jufaja-forest-900 transition-colors hover:bg-jufaja-cream hover:text-jufaja-gold-700">{label}</Link></li>)}
              </ul>
            </div>
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <button type="button" onClick={openEnquiry} className={`site-header__enquire btn ${overlay ? 'btn-gold' : 'btn-primary'} min-h-11 whitespace-nowrap px-3 tracking-[0.1em] min-[360px]:px-4 sm:px-6 sm:tracking-[0.14em]`}>
            <span className="min-[360px]:hidden">Enquire</span><span className="hidden min-[360px]:inline">Enquire Now</span>
          </button>
          <button
            ref={menuButton}
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className={`site-header__menu inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border transition-colors xl:hidden ${overlay ? 'border-white/60 text-white hover:bg-white/10' : 'border-jufaja-border text-jufaja-forest-900 hover:bg-jufaja-stone'}`}
          >
            {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              key="scrim"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              className="absolute inset-x-0 top-full z-40 h-[100dvh] bg-jufaja-forest-950/40 xl:hidden"
            />
            <motion.nav
              key="panel"
              id="mobile-navigation"
              ref={drawer}
              aria-label="Mobile navigation"
              aria-modal="true"
              role="dialog"
              initial={reduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.76, 0, 0.24, 1] }}
              className="mobile-menu absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-88px)] overflow-y-auto border-t border-jufaja-gold-500/40 bg-white px-4 pb-6 pt-3 shadow-jufaja-card min-[360px]:max-h-[calc(100dvh-100px)] sm:px-6 xl:hidden"
            >
              {links.map(({ href, label }, index) => {
                const active = href === '/' ? pathname === '/' : pathname?.startsWith(href);
                return (
                  <motion.div key={href} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.12 + index * 0.04 }}>
                    <Link href={href} aria-current={active ? 'page' : undefined} className={`flex min-h-12 items-center justify-between border-b border-jufaja-border/70 px-2 font-serif text-xl ${active ? 'text-jufaja-forest-900' : 'text-jufaja-muted'}`}>
                      <span><small className="mobile-menu__number">0{index + 1}</small>{label}</span>
                      {active && <span aria-hidden="true" className="h-1.5 w-1.5 bg-jufaja-gold-500" />}
                    </Link>
                  </motion.div>
                );
              })}
              <button type="button" onClick={closeMenu} className="btn btn-outline-light mb-4 mt-6">Close navigation <X aria-hidden="true" className="h-4 w-4" /></button>
              <div className="grid grid-cols-1 gap-2 pt-4 min-[360px]:grid-cols-2">
                {serviceLinks.map(({ href, label }) => <Link key={href} href={href} className="flex min-h-11 items-center justify-center rounded-sm border border-jufaja-border px-3 text-center text-xs font-semibold text-jufaja-forest-900">{label}</Link>)}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
      <motion.div aria-hidden="true" style={{ scaleX: reduceMotion ? 0 : progress }} className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-jufaja-gold-500" />
    </header>
  );
}
