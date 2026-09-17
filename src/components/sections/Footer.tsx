import { Phone, Send, Instagram } from 'lucide-react';
import { footer } from '@/data/content';

export function Footer() {
  return (
    <footer className="bg-red pt-16 pb-8">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo + descriptor */}
          <div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display text-white text-3xl">{footer.logo}</span>
              <span className="rubric text-on-red">{footer.tagline}</span>
            </div>
            <p className="text-on-red text-sm leading-relaxed max-w-xs">
              {footer.descriptor}
            </p>
          </div>

          {/* Contacts */}
          <div className="md:col-span-2 flex flex-col gap-4 md:items-end">
            <a
              href={footer.phoneHref}
              className="flex items-center gap-3 text-white hover:text-on-red transition-colors text-lg"
            >
              <Phone size={18} />
              {footer.phone}
            </a>
            <a
              href={footer.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-on-red transition-colors text-lg"
            >
              <Send size={18} />
              {footer.telegram}
            </a>
            <a
              href={footer.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-on-red transition-colors text-lg"
            >
              <Instagram size={18} />
              {footer.instagram}
            </a>
          </div>
        </div>

        <div className="border-t border-red-deep pt-6">
          <p className="text-on-red/60 text-sm">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
