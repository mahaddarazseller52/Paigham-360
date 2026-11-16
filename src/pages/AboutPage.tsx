import { useEffect } from 'react';
import { BookOpen, Globe, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IMAGES } from '../data/categories';
import { Breadcrumb } from '../components/Breadcrumb';
import { ResilientImage } from '../components/ResilientImage';

export function AboutPage() {
  const { language, navigate, updateSeo } = useApp();

  useEffect(() => {
    updateSeo({
      title: 'About Paigham360 – The Message of Islam',
      description:
        'Learn about Paigham360’s mission to provide authentic Quranic teachings, Sahih Hadith, Islamic history, and bilingual Urdu & English educational stories.',
      path: '/about',
    });
  }, [updateSeo]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ labelEn: 'About Paigham360', labelUr: 'پیغام 360 کا تعارف' }]} />

      <div className="islamic-lattice-dark rounded-2xl p-8 text-[#FAFAF5] sm:p-12">
        <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
          {language === 'ur' ? 'ہمارا مشن' : 'About Paigham360'}
        </p>
        <h1
          className={`mt-2 text-[#FAFAF5] ${
            language === 'ur'
              ? 'font-urdu text-3xl sm:text-4xl font-bold'
              : 'font-display text-4xl sm:text-5xl font-semibold'
          }`}
        >
          {language === 'ur'
            ? 'پیغام 360: قرآن و سنت کی روشنی میں زندگی گزارنے کا پیغام'
            : 'Paigham360 – Discover Islam. Learn. Reflect. Inspire.'}
        </h1>
        <p className={`mt-4 max-w-3xl text-base leading-relaxed text-[#FAFAF5]/85 ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
          {language === 'ur'
            ? 'پیغام 360 ایک عالمی اسلامی تعلیمی پلیٹ فارم ہے جس کا مقصد ہر عمر کے قارئین تک قرآن کریم، صحیح احادیث، اسلامی تاریخ اور اخلاقی کہانیوں کو سادہ، خوبصورت اور مستند انداز میں پہنچانا ہے۔'
            : 'Paigham360 is an international Islamic educational platform dedicated to presenting authentic Quranic teachings, Sahih Hadith, Prophetic biography, and inspiring Islamic history in clear, accessible Urdu and English.'}
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-12 items-center">
        <div className="md:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-[#E5E2D6] bg-white">
            <ResilientImage
              src={IMAGES.libraryDesk}
              alt="Classical Islamic scholarship volumes and writing desk"
              aspectClass="aspect-[4/3]"
            />
          </div>
        </div>
        <div className={`md:col-span-7 space-y-4 ${language === 'ur' ? 'text-right' : ''}`}>
          <h2
            className={
              language === 'ur'
                ? 'font-urdu text-2xl font-bold text-[#064E3B]'
                : 'font-display text-3xl font-semibold text-[#064E3B]'
            }
          >
            {language === 'ur' ? 'ہمارا تحقیقی معیار' : 'Our Editorial & Scholarly Standards'}
          </h2>
          <p className={`text-base leading-relaxed text-[#202820]/80 ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
            {language === 'ur'
              ? 'ہم کسی بھی غیر مصدقہ روایت، من گھڑت قصے یا بے بنیاد حدیث کو ہرگز شائع نہیں کرتے۔ ہر مضمون میں قرآنی سورت و آیت نمبر، حدیث کی کتاب و درجہ اور تاریخی واقعات کی واضح سند بیان کی جاتی ہے۔'
              : 'We uphold strict editorial integrity: we never publish fabricated religious quotations or unverified narrations without clear attribution. Quranic citations verify exact Surah and Ayah numbers, Hadith citations preserve collection grading, and classical historical Waqiat are explicitly distinguished from Prophetic Sunnah.'}
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            titleEn: 'Verified Primary Sources',
            titleUr: 'مستند بنیادی حوالہ جات',
            descEn: 'Direct references to the Noble Quran, Sahih al-Bukhari, Sahih Muslim, and recognized classical scholarship.',
            descUr: 'قرآن مجید، صحیح بخاری، صحیح مسلم اور معتبر علمائے کرام کی کتب سے براہِ راست حوالہ جات۔',
          },
          {
            icon: Globe,
            titleEn: 'Bilingual Accessibility',
            titleUr: 'اردو اور انگریزی میں دستیاب',
            descEn: 'Thoughtfully composed in both right-to-left Urdu Nastaliq and left-to-right English for families worldwide.',
            descUr: 'دنیا بھر کے خاندانوں اور نوجوانوں کے لیے خوبصورت اردو نستعلیق اور انگریزی دونوں زبانوں میں۔',
          },
          {
            icon: BookOpen,
            titleEn: 'All-Age Learning',
            titleUr: 'ہر عمر کے لیے تربیت',
            descEn: 'From gentle children’s stories of compassion to deep reflections on Islamic history and daily Azkar.',
            descUr: 'بچوں کی اخلاقی کہانیوں سے لے کر اسلامی تاریخ، آدابِ زندگی اور روزمرہ اذکار تک مکمل رہنمائی۔',
          },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="rounded-2xl border border-[#E5E2D6] bg-white p-6">
              <Icon className="h-6 w-6 text-[#087A55]" aria-hidden="true" />
              <h3
                className={`mt-4 text-[#064E3B] ${
                  language === 'ur' ? 'font-urdu-tight text-lg font-bold' : 'font-display text-xl font-semibold'
                }`}
              >
                {language === 'ur' ? card.titleUr : card.titleEn}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed text-[#202820]/75 ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
                {language === 'ur' ? card.descUr : card.descEn}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <a
          href="/contact"
          onClick={(e) => {
            e.preventDefault();
            navigate('/contact');
          }}
          className="inline-flex items-center rounded-lg bg-[#064E3B] px-6 py-3 text-sm font-semibold text-[#FAFAF5] transition-colors hover:bg-[#087A55]"
        >
          {language === 'ur' ? 'ادارتی ٹیم سے رابطہ کریں' : 'Contact the Editorial Team'}
        </a>
      </div>
    </div>
  );
}
