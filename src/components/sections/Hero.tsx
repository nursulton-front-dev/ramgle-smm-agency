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
    <section id="top" className="relative isolate min-h-screen overflow-hidden bg-red">
      <img
        src={HERO_BG}
        alt="Тёмная кинематографичная съёмочная площадка: оператор с камерой в красном свете"
        width={1920}
        height={1280}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
        loading="eager"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-red mix-blend-multiply"
      />

      <div className="shell flex min-h-screen flex-col justify-center pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
        >
          <p className="rubric mb-8 inline-block w-fit border border-on-red/40 px-4 py-2 text-on-red">
            {hero.badge}
          </p>

          <h1 className="h1-display max-w-[18ch] text-paper">{hero.title}</h1>

          <p className="lede mt-8 max-w-[62ch] text-on-red">{hero.subtitle}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-white text-ink px-8 py-4 font-semibold text-xs md:text-sm uppercase tracking-wider hover:bg-on-red transition-colors flex items-center justify-center gap-2"
              style={{ borderRadius: '2px' }}
            >
              {hero.primaryCta}
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo('#cases')}
              className="border border-white/60 text-white px-8 py-4 font-semibold text-xs md:text-sm uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              style={{ borderRadius: '2px' }}
            >
              <Play size={16} />
              {hero.secondaryCta}
            </button>
          </div>

          <dl className="mt-20 grid grid-cols-1 gap-10 border-t border-on-red/30 pt-10 md:grid-cols-3">
            {hero.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <Counter
                    value={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    className="stat-num block text-paper"
                  />
                  <span className="mt-3 block max-w-[26ch] text-[15px] text-on-red font-sans">
                    {m.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}


