import { about } from '@/data/content';
import { FOUNDER_PHOTO } from '@/data/media';
import { Reveal } from '@/components/ui/Reveal';

export function About() {
  return (
    <section id="about" className="bg-paper py-24 md:py-32">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        <Reveal>
          <div className="rubric text-red mb-6">{about.rubric}</div>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: text */}
          <Reveal delay={0.1}>
            <h2 className="font-display text-ink text-4xl md:text-5xl lg:text-6xl mb-8">
              {about.title}
            </h2>
            <p className="text-ink/70 text-lg leading-relaxed">
              {about.text}
            </p>
          </Reveal>

          {/* Right: founder card */}
          <Reveal delay={0.2}>
            <div className="bg-ink p-6 md:p-8" style={{ borderRadius: '3px' }}>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="shrink-0">
                  <img
                    src={FOUNDER_PHOTO}
                    alt="Рахманов Эльбек — основатель Ramble Agency"
                    className="w-full sm:w-44 h-64 sm:h-56 object-cover"
                    style={{ borderRadius: '2px' }}
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="font-display text-paper text-2xl mb-1">
                      {about.founder.name}
                    </div>
                    <div className="rubric text-red-bright mb-4">
                      {about.founder.role}
                    </div>
                    <p className="text-paper/70 italic text-base leading-relaxed">
                      «{about.founder.quote}»
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
