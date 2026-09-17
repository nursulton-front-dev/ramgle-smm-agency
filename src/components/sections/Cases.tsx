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
    <section id="cases" className="bg-paper py-24 md:py-32">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        <Reveal>
          <div className="rubric text-red mb-6">{cases.rubric}</div>
          <h2 className="font-display text-ink text-4xl md:text-5xl lg:text-6xl mb-12">
            {cases.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cases.items.map((c, i) => (
            <Reveal key={i} delay={0.1 * (i % 2)}>
              <article
                className="bg-white border border-paper-line h-full flex flex-col transition-all hover:-translate-y-1"
                style={{ borderRadius: '3px' }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={caseImages[i]}
                    alt={`${c.name} — ${c.niche}`}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col gap-5 flex-grow">
                  <div>
                    <h3 className="font-display text-ink text-2xl mb-1">{c.name}</h3>
                    <span className="text-ink/50 text-sm">{c.niche}</span>
                  </div>

                  <div className="space-y-4 flex-grow">
                    <div>
                      <div className="rubric text-ink/40 mb-1">Задача</div>
                      <p className="text-ink/75 text-sm leading-relaxed">{c.task}</p>
                    </div>
                    <div>
                      <div className="rubric text-ink/40 mb-1">Действия</div>
                      <p className="text-ink/75 text-sm leading-relaxed">{c.actions}</p>
                    </div>
                    <div>
                      <div className="rubric text-ink/40 mb-1">Результат</div>
                      <p className="text-ink/75 text-sm leading-relaxed">{c.result}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-paper-line">
                    <div className="font-display text-red text-3xl md:text-4xl">
                      {c.resultHighlight}
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
