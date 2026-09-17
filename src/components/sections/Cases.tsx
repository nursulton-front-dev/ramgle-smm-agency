import { cases } from '@/data/content';
import {
  CASE_LA_OSMA,
  CASE_DARUL_SALOM,
  CASE_B2GAME,
  CASE_OSQ,
} from '@/data/media';
import { Reveal } from '@/components/ui/Reveal';

const caseImages = [CASE_LA_OSMA, CASE_DARUL_SALOM, CASE_B2GAME, CASE_OSQ];

export function Cases() {
  return (
    <section id="cases" className="bg-[#F4F0EA] py-20 md:py-28">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        <Reveal>
          <h2 className="font-display text-ink text-4xl md:text-5xl lg:text-6xl tracking-tight mb-12 uppercase">
            {cases.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cases.items.map((c, i) => (
            <Reveal key={i} delay={0.1 * (i % 2)}>
              <article
                className="bg-[#F4F0EA] border border-[#A81919] h-full flex flex-col justify-between transition-all hover:shadow-md overflow-hidden"
                style={{ borderRadius: '0px' }}
              >
                {/* Photo on top of card */}
                <div className="relative overflow-hidden border-b border-[#A81919]/40">
                  <img
                    src={caseImages[i]}
                    alt={`${c.name} — ${c.niche}`}
                    className="w-full h-56 md:h-64 object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Case Header in Oswald font */}
                    <h3
                      className="text-ink text-3xl md:text-[36px] font-bold tracking-tight uppercase mb-1"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {c.name}
                    </h3>
                    <div className="text-[#A81919] text-xs font-bold uppercase tracking-[0.16em] mb-6">
                      {c.niche}
                    </div>

                    {/* Task & Actions */}
                    <div className="space-y-5">
                      <div>
                        <div className="text-[#8C857B] text-[11px] font-semibold uppercase tracking-[0.18em] mb-1.5">
                          ЗАДАЧА
                        </div>
                        <p className="text-neutral-900 text-sm md:text-base leading-snug font-normal">
                          {c.task}
                        </p>
                      </div>

                      <div>
                        <div className="text-[#8C857B] text-[11px] font-semibold uppercase tracking-[0.18em] mb-1.5">
                          ДЕЙСТВИЯ
                        </div>
                        <p className="text-neutral-900 text-sm md:text-base leading-snug font-normal">
                          {c.actions}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Result Section */}
                  <div className="mt-6">
                    <hr className="border-t border-[#DCD5C9] mb-5" />

                    <div>
                      <div className="text-[#8C857B] text-[11px] font-semibold uppercase tracking-[0.18em] mb-1.5">
                        РЕЗУЛЬТАТ
                      </div>
                      <div
                        className="text-[#A81919] text-3xl sm:text-4xl md:text-[40px] font-bold tracking-tight mb-2 flex items-center gap-2.5 flex-wrap"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        <span>{c.resultStart}</span>
                        <span className="text-[#A81919] font-sans font-bold text-2xl md:text-3xl leading-none">→</span>
                        <span>{c.resultEnd}</span>
                      </div>
                      <p className="text-neutral-800 text-xs md:text-sm leading-snug">
                        {c.resultDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}




