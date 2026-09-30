'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
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
      <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:min-h-[84px] lg:px-8">
        <Link href="/" aria-label="JUFAJA Constructions home" className="shrink-0 rounded-sm">
          <JufajaLogo size="sm" theme="light" />
        </Link>

        <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {links.map(({ href, label }) => {
            const active = href === '/' ? pathname === '/' : pathname?.startsWith(href);
            return <Link key={href} href={href} aria-current={active ? 'page' : undefined} className={`rounded-sm py-2 text-[13px] font-medium transition-colors hover:text-jufaja-forest-700 ${active ? 'text-jufaja-forest-900' : 'text-jufaja-muted'}`}>
              {label}
            </Link>;
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <button type="button" onClick={openEnquiry} className="min-h-11 rounded-sm bg-jufaja-forest-900 px-4 text-xs font-semibold text-white transition-colors hover:bg-jufaja-forest-800 sm:px-5 sm:text-sm">
            Enquire Now
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

      {menuOpen && <>
        <button aria-label="Close navigation menu" onClick={closeMenu} className="fixed inset-0 top-[76px] z-40 bg-jufaja-forest-950/20 xl:hidden" />
        <nav id="mobile-navigation" ref={drawer} aria-label="Mobile navigation" aria-modal="true" role="dialog" className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-jufaja-border bg-white px-4 pb-6 pt-3 shadow-jufaja-card sm:px-6 xl:hidden">
          {links.map(({ href, label }) => {
            const active = href === '/' ? pathname === '/' : pathname?.startsWith(href);
            return <Link key={href} href={href} aria-current={active ? 'page' : undefined} className={`flex min-h-12 items-center border-b border-jufaja-border/70 px-2 text-sm font-medium ${active ? 'text-jufaja-forest-900' : 'text-jufaja-muted'}`}>
              {label}
            </Link>;
          })}
          <div className="grid grid-cols-2 gap-2 pt-3">
            <Link href="/custom-homes" className="flex min-h-11 items-center justify-center rounded-sm border border-jufaja-border px-3 text-center text-xs font-medium text-jufaja-forest-900">Custom Homes</Link>
            <Link href="/knockdown-rebuild" className="flex min-h-11 items-center justify-center rounded-sm border border-jufaja-border px-3 text-center text-xs font-medium text-jufaja-forest-900">Knockdown Rebuild</Link>
          </div>
        </nav>
      </>}
    </header>
  );
}
