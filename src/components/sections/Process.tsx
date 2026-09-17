import { process } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';

export function Process() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        <Reveal>
          <div className="rubric text-red-bright mb-6">{process.rubric}</div>
          <h2 className="font-display text-paper text-4xl md:text-5xl lg:text-6xl mb-16">
            {process.title}
          </h2>
        </Reveal>

        <div className="relative">
          {/* Horizontal line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-red-deep/40" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {process.steps.map((step, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className="relative">
                  <div className="font-display text-red-bright text-6xl md:text-7xl mb-4 tabular-nums">
                    {step.num}
                  </div>
                  <h3 className="font-display text-paper text-xl md:text-2xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
