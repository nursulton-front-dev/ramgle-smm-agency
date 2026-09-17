import { services } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';

export function Services() {
  return (
    <section id="services" className="bg-ink py-24 md:py-32">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        <Reveal>
          <div className="rubric text-red-bright mb-6">{services.rubric}</div>
          <h2 className="font-display text-paper text-4xl md:text-5xl lg:text-6xl mb-12">
            {services.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-red-deep/30">
          {services.items.map((item, i) => {
            if (item.wide) {
              return (
                <Reveal key={i} delay={0.05} className="md:col-span-3">
                  <div className="bg-ink-2 p-6 md:p-8 h-full border border-red-deep/40 hover:border-red-bright transition-colors group" style={{ borderRadius: '2px' }}>
                    <h3 className="font-display text-paper text-2xl md:text-3xl mb-6">
                      {item.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                      {item.items?.map((sub, j) => (
                        <div
                          key={j}
                          className="flex items-baseline justify-between gap-4 py-2 border-b border-white/10"
                        >
                          <div>
                            <span className="text-white font-medium text-base">{sub.name}</span>
                            <span className="text-white/50 text-sm ml-2">– {sub.desc}</span>
                          </div>
                          <span className="font-condensed text-red-bright text-lg whitespace-nowrap tabular-nums">
                            {sub.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            }

            return (
              <Reveal key={i} delay={0.05 * (i + 1)}>
                <div
                  className="bg-ink-2 p-6 md:p-8 h-full border border-red-deep/40 hover:border-red-bright transition-colors group flex flex-col"
                  style={{ borderRadius: '2px' }}
                >
                  <h3 className="font-display text-paper text-xl md:text-2xl mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4 flex-grow">
                    {item.desc}
                  </p>
                  {item.price && (
                    <span className="font-condensed text-red-bright text-xl tabular-nums">
                      {item.price}
                    </span>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
