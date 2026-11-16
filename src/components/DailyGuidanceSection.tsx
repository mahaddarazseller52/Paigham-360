import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DAILY_CONTENT } from '../data/dailyContent';
import type { DailyItemType } from '../types/content';

export function DailyGuidanceSection() {
  const { language } = useApp();
  const [activeType, setActiveType] = useState<DailyItemType>('ayat');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeItem = DAILY_CONTENT.find((item) => item.type === activeType) || DAILY_CONTENT[0];

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // clipboard fallback ignored
    }
  };

  return (
    <section
      aria-labelledby="daily-guidance-heading"
      className="border-b border-[#E5E2D6] bg-[#FAFAF5] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-[#087A55] uppercase">
              {language === 'ur' ? 'روزانہ کا روحانی پیغام' : 'Daily Spiritual Guidance'}
            </p>
            <h2
              id="daily-guidance-heading"
              className={`mt-2 text-[#064E3B] ${
                language === 'ur'
                  ? 'font-urdu text-2xl sm:text-3xl font-bold'
                  : 'font-display text-3xl sm:text-4xl font-semibold tracking-tight'
              }`}
            >
              {language === 'ur'
                ? 'آج کی آیت، حدیث، دعا اور حکمتِ اسلام'
                : 'Daily Ayat, Sahih Hadith, Reminder, Dua & Wisdom'}
            </h2>
          </div>

          {/* Interactive Tab Switcher */}
          <div
            role="tablist"
            aria-label={language === 'ur' ? 'روزانہ کی رہنمائی' : 'Daily Islamic Content Tabs'}
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#E5E2D6] bg-[#F3F1E8] p-1.5"
          >
            {DAILY_CONTENT.map((item) => {
              const selected = item.type === activeType;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveType(item.type)}
                  className={`whitespace-nowrap shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 ${
                    language === 'ur' ? 'font-urdu-tight text-sm' : ''
                  } ${
                    selected
                      ? 'bg-[#064E3B] text-[#FAFAF5] shadow-sm'
                      : 'text-[#202820]/75 hover:bg-white/70 hover:text-[#064E3B]'
                  }`}
                >
                  {language === 'ur' ? item.labelUr : item.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Focused Active Daily Card */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#E5E2D6] bg-white shadow-sm">
          <div className="grid lg:grid-cols-12">
            {/* Left / Emerald Primary Text Panel */}
            <div className="islamic-lattice-dark flex flex-col justify-between p-7 text-[#FAFAF5] sm:p-10 lg:col-span-7">
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-4">
                  <span className="text-xs font-semibold tracking-wider text-[#D4AF37]">
                    {language === 'ur' ? activeItem.labelUr : activeItem.labelEn}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        `${activeItem.arabic ? activeItem.arabic + '\n\n' : ''}${activeItem.english}\n${activeItem.urdu}\n— ${activeItem.referenceEn}`,
                        activeItem.id
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#D4AF37]/40 px-2.5 py-1 text-xs font-medium text-[#FAFAF5] transition-colors hover:bg-[#D4AF37]/15 whitespace-nowrap shrink-0"
                  >
                    {copiedId === activeItem.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                        <span>{language === 'ur' ? 'کاپی ہو گیا' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
                        <span>{language === 'ur' ? 'کاپی کریں' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>

                {activeItem.arabic && (
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic mt-7 text-right text-2xl leading-[2.1] text-[#FAFAF5] sm:text-3xl"
                  >
                    {activeItem.arabic}
                  </p>
                )}

                {activeItem.transliteration && (
                  <p className="mt-4 text-sm italic text-[#FAFAF5]/75">
                    {activeItem.transliteration}
                  </p>
                )}
              </div>

              <div className="mt-8 border-t border-[#D4AF37]/25 pt-5 text-xs text-[#FAFAF5]/85">
                <span className="font-semibold text-[#D4AF37]">
                  {language === 'ur' ? 'حوالہ و تصدیق: ' : 'Source & Verification: '}
                </span>
                <span>
                  {language === 'ur'
                    ? `${activeItem.referenceUr} · ${activeItem.authenticityUr}`
                    : `${activeItem.referenceEn} · ${activeItem.authenticityEn}`}
                </span>
              </div>
            </div>

            {/* Right / Bilingual Translation & Practical Reflection */}
            <div className="flex flex-col justify-between bg-white p-7 sm:p-10 lg:col-span-5">
              <div className="space-y-6">
                <div dir="rtl" className="text-right">
                  <p className="text-xs font-semibold text-[#087A55]">اردو ترجمہ</p>
                  <p className="font-urdu mt-1.5 text-lg text-[#202820] sm:text-xl">
                    {activeItem.urdu}
                  </p>
                </div>

                <div className="border-t border-[#E5E2D6] pt-5" dir="ltr">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#087A55]">
                    English Translation
                  </p>
                  <p className="font-editorial mt-2 text-lg leading-relaxed text-[#202820]">
                    {activeItem.english}
                  </p>
                </div>
              </div>

              <div className="mt-7 rounded-xl border border-[#E5E2D6] bg-[#FAFAF5] p-4">
                <p className="text-xs font-semibold text-[#064E3B]">
                  {language === 'ur' ? 'آج کا عملی سبق' : 'Reflection for Today'}
                </p>
                <p
                  dir={language === 'ur' ? 'rtl' : 'ltr'}
                  className={`mt-1.5 text-sm leading-relaxed text-[#202820]/85 ${
                    language === 'ur' ? 'font-urdu-tight text-right' : ''
                  }`}
                >
                  {language === 'ur' ? activeItem.reflectionUr : activeItem.reflectionEn}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact 5-Card Overview Strip for Immediate Scanning */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {DAILY_CONTENT.map((item) => {
            const isSelected = item.type === activeType;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveType(item.type)}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-150 ${
                  language === 'ur' ? 'text-right' : ''
                } ${
                  isSelected
                    ? 'border-[#064E3B] bg-[#064E3B]/5'
                    : 'border-[#E5E2D6] bg-white hover:border-[#087A55]'
                }`}
              >
                <div>
                  <span className="text-xs font-semibold text-[#087A55]">
                    {language === 'ur' ? item.labelUr : item.labelEn}
                  </span>
                  <p
                    className={`mt-2 line-clamp-2 text-sm text-[#202820] ${
                      language === 'ur' ? 'font-urdu-tight' : 'font-medium'
                    }`}
                  >
                    {language === 'ur' ? item.urdu : item.english}
                  </p>
                </div>
                <span className="mt-3 block truncate text-[11px] text-[#202820]/60">
                  {language === 'ur' ? item.referenceUr : item.referenceEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
