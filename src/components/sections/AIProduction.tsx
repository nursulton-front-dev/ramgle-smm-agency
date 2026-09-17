import { ArrowRight, Check } from 'lucide-react';
import { aiProduction } from '@/data/content';
import { AI_VISUAL } from '@/data/media';
import { Reveal } from '@/components/ui/Reveal';

export function AIProduction() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="ai" className="bg-red py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <Reveal>
            <div className="rubric text-on-red mb-6">{aiProduction.rubric}</div>
            <h2 className="font-display text-white text-4xl md:text-5xl lg:text-6xl mb-6">
              {aiProduction.title}
            </h2>
            <p className="text-on-red text-lg leading-relaxed mb-8">
              {aiProduction.text}
            </p>
            <ul className="space-y-4 mb-8">
              {aiProduction.advantages.map((adv, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 shrink-0 w-2 h-2 bg-red-bright rounded-full" />
                  <span className="text-white text-base md:text-lg">{adv}</span>
                </li>
              ))}
            </ul>
            <p className="text-on-red/70 text-sm italic mb-8">{aiProduction.note}</p>
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-white text-ink px-8 py-4 font-semibold text-sm hover:bg-on-red transition-colors inline-flex items-center gap-2"
              style={{ borderRadius: '2px' }}
            >
              {aiProduction.cta}
              <ArrowRight size={16} />
            </button>
          </Reveal>

          {/* Right: visual */}
          <Reveal delay={0.2}>
            <div className="relative">
              <img
                src={AI_VISUAL}
                alt="AI-продакшн — съёмка в студии с генеративными фонами"
                className="w-full h-[400px] md:h-[520px] object-cover"
                style={{ borderRadius: '3px' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" style={{ borderRadius: '3px' }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Check size={16} className="text-red-bright" />
                  Студийная съёмка + AI-генерация локаций
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
