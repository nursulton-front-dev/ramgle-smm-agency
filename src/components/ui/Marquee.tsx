import { marqueeItems } from '@/data/content';

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="bg-red py-4 overflow-hidden border-y border-red-deep">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-display text-white text-2xl md:text-3xl uppercase tracking-wider px-6 whitespace-nowrap"
          >
            {item}
            <span className="text-red-deep ml-12">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
