'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import JufajaLogo from '@/components/brand/JufajaLogo';

const links = [
  { href: '/', label: 'Home' },
  { href: '/designs', label: 'Home Designs' },
  { href: '/packages', label: 'House & Land' },
  { href: '/display-homes', label: 'Display Homes' },
  { href: '/projects', label: 'Our Work' },
  { href: '/about-us', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
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

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
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
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const openEnquiry = () => {
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('open-enquiry-drawer'));
  };
  const closeMenu = () => {
    setMenuOpen(false);
    menuButton.current?.focus();
  };

  return (
    <header className={`sticky top-0 z-40 w-full border-b transition-[background-color,box-shadow,border-color] duration-300 ${scrolled ? 'border-jufaja-gold/30 bg-white/95 shadow-jufaja-soft backdrop-blur-md' : 'border-jufaja-border bg-jufaja-cream/95 backdrop-blur-sm'}`}>
      <div className="mx-auto flex min-h-[88px] max-w-[1440px] items-center justify-between gap-4 px-4 min-[360px]:min-h-[100px] sm:min-h-[112px] sm:px-6 lg:px-8">
        <Link href="/" aria-label="JUFAJA Constructions home" className="shrink-0 rounded-sm">
          <JufajaLogo size="sm" theme="light" />
        </Link>

        <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {links.map(({ href, label }) => {
            const active = href === '/' ? pathname === '/' : pathname?.startsWith(href);
            return <Link key={href} href={href} aria-current={active ? 'page' : undefined} className={`hover-gold-sweep rounded-sm py-2 text-[13px] font-semibold tracking-wide transition-colors hover:text-jufaja-forest-700 ${active ? 'text-jufaja-forest-900 after:!w-full' : 'text-jufaja-muted'}`}>
              {label}
            </Link>;
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <button type="button" onClick={openEnquiry} className="btn btn-primary min-h-11 whitespace-nowrap px-3 tracking-[0.1em] min-[360px]:px-4 sm:px-6 sm:tracking-[0.14em]">
            <span className="min-[360px]:hidden">Enquire</span><span className="hidden min-[360px]:inline">Enquire Now</span>
          </button>
          <button
            ref={menuButton}
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-jufaja-border text-jufaja-forest-900 hover:bg-jufaja-stone xl:hidden"
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
              className="fixed inset-0 top-[88px] z-40 bg-jufaja-forest-950/40 min-[360px]:top-[100px] sm:top-[112px] xl:hidden"
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
              className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-88px)] overflow-y-auto border-t border-jufaja-gold-500/40 bg-white px-4 pb-6 pt-3 shadow-jufaja-card min-[360px]:max-h-[calc(100dvh-100px)] sm:max-h-[calc(100dvh-112px)] sm:px-6 xl:hidden"
            >
              {links.map(({ href, label }, index) => {
                const active = href === '/' ? pathname === '/' : pathname?.startsWith(href);
                return (
                  <motion.div key={href} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.12 + index * 0.04 }}>
                    <Link href={href} aria-current={active ? 'page' : undefined} className={`flex min-h-12 items-center justify-between border-b border-jufaja-border/70 px-2 font-serif text-xl ${active ? 'text-jufaja-forest-900' : 'text-jufaja-muted'}`}>
                      {label}
                      {active && <span aria-hidden="true" className="h-1.5 w-1.5 bg-jufaja-gold-500" />}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="grid grid-cols-2 gap-2 pt-4">
                <Link href="/custom-homes" className="flex min-h-11 items-center justify-center rounded-sm border border-jufaja-border px-3 text-center text-xs font-semibold text-jufaja-forest-900">Custom Homes</Link>
                <Link href="/knockdown-rebuild" className="flex min-h-11 items-center justify-center rounded-sm border border-jufaja-border px-3 text-center text-xs font-semibold text-jufaja-forest-900">Knockdown Rebuild</Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
      <motion.div aria-hidden="true" style={{ scaleX: reduceMotion ? 0 : progress }} className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-jufaja-gold-500" />
    </header>
  );
}
