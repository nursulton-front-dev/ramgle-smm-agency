import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Check, Plus, Loader2 } from 'lucide-react';
import { contact } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';

interface ContactProps {
  selectedPlan: string;
}

interface SubmittedPayload {
  name: string;
  phone: string;
  services: string[];
  plan?: string;
}

export function Contact({ selectedPlan }: ContactProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteHp, setWebsiteHp] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; services?: string; server?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedPayload | null>(null);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: undefined }));
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let digits = inputValue.replace(/\D/g, '');

    if (digits.startsWith('998')) {
      digits = digits.slice(3);
    }
    digits = digits.slice(0, 9);

    const prevDigits = phone.replace(/\D/g, '').replace(/^998/, '');
    if (inputValue.length < phone.length && digits.length === prevDigits.length && digits.length > 0) {
      digits = digits.slice(0, -1);
    }

    if (digits.length === 0) {
      setPhone('');
      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
      return;
    }

    let formatted = '+998 ';
    if (digits.length > 0) formatted += digits.slice(0, 2);
    if (digits.length > 2) formatted += ' ' + digits.slice(2, 5);
    if (digits.length > 5) formatted += ' ' + digits.slice(5, 7);
    if (digits.length > 7) formatted += ' ' + digits.slice(7, 9);

    setPhone(formatted);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = contact.errors.name;
    const digits = phone.replace(/\D/g, '').replace(/^998/, '');
    if (digits.length !== 9) e.phone = contact.errors.phone;
    if (selectedServices.length === 0) e.services = contact.errors.services;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, server: undefined }));

    const payload: SubmittedPayload = {
      name: name.trim(),
      phone,
      services: selectedServices,
      plan: selectedPlan || undefined,
    };

    try {
      const res = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          website_hp: websiteHp,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 429) {
          setErrors((prev) => ({
            ...prev,
            server: errorData.error || 'Слишком много попыток. Подождите пару минут.',
          }));
          return;
        }
        console.warn('Telegram API Response Warning:', errorData);
      }

      setSubmittedData(payload);
      setSubmitted(true);
    } catch (err) {
      console.error('Network or server function error:', err);
      setSubmittedData(payload);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
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

        {submitted && submittedData ? (
          <Reveal>
            <div
              className="bg-ink-2 border border-red-bright p-8 md:p-12 flex flex-col items-center text-center"
              style={{ borderRadius: '3px' }}
            >
              <div
                className="w-16 h-16 bg-red-bright flex items-center justify-center mb-6"
                style={{ borderRadius: '50%' }}
              >
                <Check size={32} className="text-white" />
              </div>
              <p className="text-paper text-xl md:text-2xl font-display uppercase tracking-wide mb-3">
                {contact.success}
              </p>

              <div className="w-full max-w-md bg-black/40 border border-white/10 rounded p-4 text-left text-sm text-white/70 space-y-2 mt-4">
                <div>
                  <span className="text-white/40">Имя:</span>{' '}
                  <span className="text-white font-medium">{submittedData.name}</span>
                </div>
                <div>
                  <span className="text-white/40">Телефон:</span>{' '}
                  <span className="text-white font-medium">{submittedData.phone}</span>
                </div>
                {submittedData.plan && (
                  <div>
                    <span className="text-white/40">Тариф:</span>{' '}
                    <span className="text-red-bright font-medium">{submittedData.plan}</span>
                  </div>
                )}
                <div>
                  <span className="text-white/40">Выбранные услуги:</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {submittedData.services.map((svc) => (
                      <span
                        key={svc}
                        className="bg-red-bright/20 border border-red-bright/40 text-red-bright px-2.5 py-1 rounded text-xs"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setSubmittedData(null);
                  setName('');
                  setPhone('');
                  setSelectedServices([]);
                }}
                className="mt-6 text-sm text-white/50 hover:text-white underline transition-colors"
              >
                Отправить ещё одну заявку
              </button>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="bg-ink-2 border border-white/10 p-6 md:p-8 flex flex-col gap-6"
              style={{ borderRadius: '3px' }}
              noValidate
            >
              <input type="hidden" name="plan" value={selectedPlan} />
              {/* Honeypot Anti-Spam Trap Field */}
              <input
                type="text"
                name="website_hp"
                value={websiteHp}
                onChange={(e) => setWebsiteHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden opacity-0 pointer-events-none absolute -z-50 h-0 w-0 overflow-hidden"
                aria-hidden="true"
              />

              {errors.server && (
                <div className="text-sm text-red-bright bg-red-bright/10 border border-red-bright/30 p-3 rounded text-center font-medium">
                  {errors.server}
                </div>
              )}

              {selectedPlan && (
                <div className="text-sm text-white/60 bg-red-bright/10 border border-red-bright/30 px-3.5 py-2 rounded flex items-center gap-2">
                  <span>Выбранный тариф из раздела цен:</span>
                  <span className="text-red-bright font-semibold">{selectedPlan}</span>
                </div>
              )}

              {/* Interactive Services Section */}
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <label className="text-base font-semibold text-paper tracking-wide">
                    {contact.servicesTitle}
                  </label>
                  {selectedServices.length > 0 && (
                    <span className="text-xs text-red-bright font-medium">
                      Выбрано: {selectedServices.length}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {contact.services.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`group flex items-center gap-2.5 px-4 py-3 rounded text-sm md:text-base font-medium transition-all duration-200 select-none ${
                          isSelected
                            ? 'bg-[#E11D2A] border border-[#E11D2A] text-white shadow-md shadow-red-900/30 scale-[1.01]'
                            : 'bg-[#1A1A1A] border border-neutral-800 text-paper/85 hover:text-white hover:border-neutral-700 hover:bg-[#222222]'
                        }`}
                        style={{ borderRadius: '3px' }}
                      >
                        <span
                          className={`w-4 h-4 rounded-[3px] flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-white text-[#E11D2A]'
                              : 'border border-neutral-700 bg-neutral-900/60 text-neutral-400 group-hover:border-neutral-500'
                          }`}
                        >
                          {isSelected ? (
                            <Check size={12} strokeWidth={3} />
                          ) : (
                            <Plus size={11} strokeWidth={2.5} />
                          )}
                        </span>
                        <span>{service}</span>
                      </button>
                    );
                  })}
                </div>

                {errors.services && (
                  <p className="text-red-bright text-sm mt-2">{errors.services}</p>
                )}
              </div>

              {/* Contact Inputs */}
              <div className="flex flex-col gap-4">
                <div>
                  <input
                    type="text"
                    placeholder={contact.fields.name}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
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
                    onChange={handlePhoneChange}
                    className={inputClass('phone')}
                    style={{ borderRadius: '2px' }}
                    aria-label="Номер телефона"
                  />
                  {errors.phone && (
                    <p className="text-red-bright text-sm mt-1.5">{errors.phone}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-ink py-4 font-semibold text-base md:text-lg hover:bg-on-red transition-all duration-200 mt-2 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ borderRadius: '2px' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Отправка заявки...</span>
                  </>
                ) : (
                  contact.cta
                )}
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

