import { Check } from 'lucide-react';
import { pricing } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';

interface PricingProps {
  onSelectPlan: (plan: string) => void;
}

export function Pricing({ onSelectPlan }: PricingProps) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="bg-red py-24 md:py-32">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        <Reveal>
          <div className="rubric text-on-red mb-6">{pricing.rubric}</div>
          <h2 className="font-display text-white text-4xl md:text-5xl lg:text-6xl mb-12">
            {pricing.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {pricing.plans.map((plan, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <div
                className={`relative h-full p-6 md:p-8 flex flex-col border transition-all ${
                  plan.featured
                    ? 'bg-ink border-red-bright md:-mt-4 md:mb-4'
                    : 'bg-red border-red-deep hover:border-red-bright'
                }`}
                style={{ borderRadius: '3px' }}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-6 bg-red-bright text-white text-xs font-bold px-3 py-1 uppercase tracking-wider" style={{ borderRadius: '2px' }}>
                    {plan.badge}
                  </div>
                )}
                <h3
                  className={`font-display text-2xl md:text-3xl mb-4 ${
                    plan.featured ? 'text-white' : 'text-white'
                  }`}
                >
                  {plan.name}
                </h3>
                <div
                  className={`font-display text-5xl md:text-6xl mb-6 tabular-nums ${
                    plan.featured ? 'text-red-bright' : 'text-white'
                  }`}
                >
                  {plan.price}
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className={`mt-1 shrink-0 ${
                          plan.featured ? 'text-red-bright' : 'text-on-red'
                        }`}
                      />
                      <span
                        className={`text-sm leading-relaxed ${
                          plan.featured ? 'text-paper/80' : 'text-on-red'
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    onSelectPlan(plan.name);
                    scrollTo('#contact');
                  }}
                  className={`w-full py-4 font-semibold text-sm transition-colors ${
                    plan.featured
                      ? 'bg-white text-ink hover:bg-on-red'
                      : 'bg-transparent border border-white/40 text-white hover:bg-white/10'
                  }`}
                  style={{ borderRadius: '2px' }}
                >
                  {plan.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
