import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { getArticlesByCategory } from '../data/articles';
import { FEATURED_SURAHS } from '../data/dailyContent';
import { ArticleCard } from '../components/ArticleCard';
import { Breadcrumb } from '../components/Breadcrumb';

export function QuranPage() {
  const { language, updateSeo } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'Makki' | 'Madani'>('all');

  useEffect(() => {
    updateSeo({
      title: 'Holy Quran – قرآن مجید | Paigham360',
      description:
        'Explore Quranic Surahs, verified Arabic text with Urdu and English translations, revelation context, and educational Quran studies on Paigham360.',
      path: '/quran',
    });
  }, [updateSeo]);

  const surahs = FEATURED_SURAHS.filter(
    (s) => filterType === 'all' || s.revelationEn === filterType
  );
  const quranArticles = getArticlesByCategory('holy-quran');

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ labelEn: 'Holy Quran', labelUr: 'قرآن مجید' }]} />

      <div className="islamic-lattice-dark rounded-2xl p-8 text-[#FAFAF5] sm:p-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
            {language === 'ur' ? 'کتابِ ہدایت' : 'The Noble Revelation'}
          </p>
          <h1
            className={`mt-2 text-[#FAFAF5] ${
              language === 'ur'
                ? 'font-urdu text-3xl sm:text-4xl font-bold'
                : 'font-display text-4xl sm:text-5xl font-semibold'
            }`}
          >
            {language === 'ur' ? 'قرآن مجید – تلاوت، ترجمہ اور تدبر' : 'Holy Quran – Recitation, Translation & Reflection'}
          </h1>
          <p className={`mt-3 text-sm sm:text-base text-[#FAFAF5]/85 ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
            {language === 'ur'
              ? '۳۰ پارے، ۱۱۴ سورتیں اور ۶۲۳۶ آیات پر مشتمل اللہ تعالیٰ کی آخری کتاب، مستند اردو اور انگریزی تراجم کے ساتھ۔'
              : '30 Juz, 114 Surahs, and 6,236 Ayat—explore key Surahs with verified Arabic script, Urdu Nastaliq translation, and English reflection.'}
          </p>
        </div>
      </div>

      {/* Surah Explorer Controls */}
      <div className="mt-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2
          className={
            language === 'ur'
              ? 'font-urdu text-2xl font-bold text-[#064E3B]'
              : 'font-display text-3xl font-semibold text-[#064E3B]'
          }
        >
          {language === 'ur' ? 'منتخب سورتوں کا تعارف و آیات' : 'Selected Surahs & Key Verses'}
        </h2>

        <div className="flex items-center gap-1.5 rounded-xl border border-[#E5E2D6] bg-white p-1.5">
          {[
            { key: 'all' as const, en: 'All Surahs', ur: 'تمام سورتیں' },
            { key: 'Makki' as const, en: 'Makki', ur: 'مکی' },
            { key: 'Madani' as const, en: 'Madani', ur: 'مدنی' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterType(tab.key)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                filterType === tab.key
                  ? 'bg-[#064E3B] text-[#FAFAF5]'
                  : 'text-[#202820]/75 hover:text-[#064E3B]'
              }`}
            >
              {language === 'ur' ? tab.ur : tab.en}
            </button>
          ))}
        </div>
      </div>

      {/* Surah Grid */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {surahs.map((surah) => (
          <div
            key={surah.number}
            className="flex flex-col justify-between rounded-2xl border border-[#E5E2D6] bg-white p-6"
          >
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-[#E5E2D6] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#087A55]">
                    <span className="font-mono tabular-nums font-semibold">
                      Surah {surah.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{language === 'ur' ? surah.revelationUr : surah.revelationEn}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {language === 'ur' ? `${surah.versesCount} آیات` : `${surah.versesCount} Ayat`}
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-[#064E3B]">
                    {surah.nameEn} ({language === 'ur' ? surah.meaningUr : surah.meaningEn})
                  </h3>
                </div>
                <span dir="rtl" lang="ar" className="font-arabic text-3xl text-[#D4AF37]">
                  {surah.nameArabic}
                </span>
              </div>

              <p
                dir="rtl"
                lang="ar"
                className="font-arabic mt-5 rounded-xl bg-[#FAFAF5] p-4 text-right text-xl text-[#064E3B] sm:text-2xl"
              >
                {surah.featuredAyahArabic}
              </p>

              <p dir="rtl" className="font-urdu mt-4 text-right text-base text-[#202820]">
                {surah.featuredAyahUr}
              </p>
              <p className="font-editorial mt-2 text-sm leading-relaxed text-[#202820]/80">
                “{surah.featuredAyahEn}” — ({surah.nameEn} {surah.number}:{surah.featuredAyahNumber})
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quran Articles */}
      {quranArticles.length > 0 && (
        <section className="mt-14">
          <h2
            className={
              language === 'ur'
                ? 'font-urdu text-2xl font-bold text-[#064E3B]'
                : 'font-display text-3xl font-semibold text-[#064E3B]'
            }
          >
            {language === 'ur' ? 'قرآن فہمی کے مضامین' : 'Quranic Studies & Articles'}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quranArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
