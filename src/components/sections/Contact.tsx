import { useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';
import { contact } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';

interface ContactProps {
  selectedPlan: string;
}

export function Contact({ selectedPlan }: ContactProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; company?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const formatPhone = (raw: string): string => {
    const digits = raw.replace(/\D/g, '');
    let d = digits;
    if (d.startsWith('998')) d = d.slice(3);
    d = d.slice(0, 9);
    let out = '+998 ';
    if (d.length > 0) out += d.slice(0, 2);
    if (d.length >= 2) out += ' ' + d.slice(2, 5);
    if (d.length >= 5) out += ' ' + d.slice(5, 7);
    if (d.length >= 7) out += ' ' + d.slice(7, 9);
    return out;
  };

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = contact.errors.name;
    const digits = phone.replace(/\D/g, '').replace(/^998/, '');
    if (digits.length !== 9) e.phone = contact.errors.phone;
    if (!company.trim()) e.company = contact.errors.company;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const inputClass = (field: keyof typeof errors) =>
    `w-full bg-ink/40 border ${
      errors[field] ? 'border-red-bright' : 'border-white/15'
    } text-white px-4 py-4 text-base placeholder-white/30 focus:outline-none focus:border-red-bright transition-colors`;

  return (
    <section id="contact" className="bg-ink py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <Reveal>
          <div className="rubric text-red-bright mb-6">{contact.rubric}</div>
          <h2 className="font-display text-paper text-4xl md:text-5xl lg:text-6xl mb-4">
            {contact.title}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-12">
            {contact.subtitle}
          </p>
        </Reveal>

        {submitted ? (
          <Reveal>
            <div className="bg-ink-2 border border-red-bright p-8 md:p-12 flex flex-col items-center text-center" style={{ borderRadius: '3px' }}>
              <div className="w-16 h-16 bg-red-bright flex items-center justify-center mb-6" style={{ borderRadius: '50%' }}>
                <Check size={32} className="text-white" />
              </div>
              <p className="text-paper text-xl md:text-2xl">{contact.success}</p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="bg-ink-2 border border-white/10 p-6 md:p-8 flex flex-col gap-5"
              style={{ borderRadius: '3px' }}
              noValidate
            >
              <input type="hidden" name="plan" value={selectedPlan} />

              {selectedPlan && (
                <div className="text-sm text-white/50 mb-1">
                  Выбранный пакет: <span className="text-red-bright font-semibold">{selectedPlan}</span>
                </div>
              )}

              <div>
                <input
                  type="text"
                  placeholder={contact.fields.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass('name')}
                  style={{ borderRadius: '2px' }}
                  aria-label="Имя"
                />
                {errors.name && (
                  <p className="text-red-bright text-sm mt-1.5">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder={contact.fields.phone}
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className={inputClass('phone')}
                  style={{ borderRadius: '2px' }}
                  aria-label="Номер телефона"
                />
                {errors.phone && (
                  <p className="text-red-bright text-sm mt-1.5">{errors.phone}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder={contact.fields.company}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={inputClass('company')}
                  style={{ borderRadius: '2px' }}
                  aria-label="Название компании или Instagram"
                />
                {errors.company && (
                  <p className="text-red-bright text-sm mt-1.5">{errors.company}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-white text-ink py-4 font-semibold text-base hover:bg-on-red transition-colors mt-2"
                style={{ borderRadius: '2px' }}
              >
                {contact.cta}
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
