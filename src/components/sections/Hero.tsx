import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { hero } from '@/data/content';
import { HERO_BG } from '@/data/media';
import { Counter } from '@/components/ui/Counter';

export function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-red"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt="Съёмочная площадка Ramble Agency"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-red/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-red/40 via-transparent to-red/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 md:px-8 w-full pt-32 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
        >
          <div className="rubric text-on-red mb-6">{hero.badge}</div>
          <h1 className="font-display text-white text-[40px] leading-[1.02] sm:text-[56px] md:text-[72px] lg:text-[88px] max-w-5xl">
            {hero.title}
          </h1>
          <p className="mt-8 text-on-red text-base md:text-lg max-w-2xl leading-relaxed">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-white text-ink px-8 py-4 font-semibold text-sm hover:bg-on-red transition-colors flex items-center justify-center gap-2"
              style={{ borderRadius: '2px' }}
            >
              {hero.primaryCta}
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo('#cases')}
              className="border border-white/60 text-white px-8 py-4 font-semibold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              style={{ borderRadius: '2px' }}
            >
              <Play size={16} />
              {hero.secondaryCta}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Metrics bar */}
      <div className="relative z-10 border-t border-red-deep">
        <div className="max-w-8xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-red-deep">
          {hero.metrics.map((m, i) => (
            <div key={i} className="py-6 px-2 md:px-8 flex flex-col gap-1">
              <div className="font-display text-white text-5xl md:text-6xl">
                <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div className="text-on-red text-sm leading-snug">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
