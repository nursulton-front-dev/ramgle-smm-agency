import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { header } from '@/data/content';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-ink border-b border-red-deep/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 md:px-8 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#hero')}
          className="flex items-baseline gap-2 text-white"
        >
          <span className="font-display text-2xl md:text-3xl">{header.logo}</span>
          <span className="rubric text-white/60 hidden sm:inline">{header.tagline}</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {header.nav.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href={header.phoneHref}
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <Phone size={14} />
            {header.phone}
          </a>
          <button
            onClick={() => handleNavClick('#contact')}
            className="bg-white text-ink px-5 py-2.5 text-sm font-semibold hover:bg-on-red transition-colors"
            style={{ borderRadius: '2px' }}
          >
            {header.cta}
          </button>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-ink border-t border-red-deep/40 min-h-screen">
          <nav className="flex flex-col px-4 py-6 gap-1">
            {header.nav.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-left text-white text-lg py-3 border-b border-white/10"
              >
                {item.label}
              </button>
            ))}
            <a
              href={header.phoneHref}
              className="flex items-center gap-2 text-white/80 mt-4 text-base"
            >
              <Phone size={16} />
              {header.phone}
            </a>
            <button
              onClick={() => handleNavClick('#contact')}
              className="bg-white text-ink px-5 py-3 mt-4 text-base font-semibold"
              style={{ borderRadius: '2px' }}
            >
              {header.cta}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
