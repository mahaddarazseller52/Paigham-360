import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getArticlesByCategory } from '../data/articles';
import { MASNOON_DUAS } from '../data/dailyContent';
import { ArticleCard } from '../components/ArticleCard';
import { Breadcrumb } from '../components/Breadcrumb';

export function DuasPage() {
  const { language, updateSeo } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    updateSeo({
      title: 'Duas & Azkar – دعائیں اور اذکار | Paigham360',
      description:
        'Authentic Masnoon Duas and daily Azkar from the Quran and Sunnah with Arabic script, transliteration, Urdu, and English translations.',
      path: '/duas',
    });
  }, [updateSeo]);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // ignore clipboard restriction
    }
  };

  const duaArticles = getArticlesByCategory('duas-azkar');

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ labelEn: 'Duas & Azkar', labelUr: 'دعائیں اور اذکار' }]} />

      <div className="islamic-lattice-dark rounded-2xl p-8 text-[#FAFAF5] sm:p-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
            {language === 'ur' ? 'حصنِ مومن' : 'Supplications from Quran & Sunnah'}
          </p>
          <h1
            className={`mt-2 text-[#FAFAF5] ${
              language === 'ur'
                ? 'font-urdu text-3xl sm:text-4xl font-bold'
                : 'font-display text-4xl sm:text-5xl font-semibold'
            }`}
          >
            {language === 'ur' ? 'مسنون دعائیں اور روزمرہ اذکار' : 'Duas & Azkar for Everyday Life'}
          </h1>
          <p className={`mt-3 text-sm sm:text-base text-[#FAFAF5]/85 ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
            {language === 'ur'
              ? 'علمِ نافع، والدین، مشکل میں آسانی اور قلبی سکون کی مستند دعائیں مع عربی، اردو و انگریزی ترجمہ۔'
              : 'Verified supplications taught by the Prophets and preserved in the Sunnah with Arabic script, transliteration, and bilingual translations.'}
          </p>
        </div>
      </div>

      {/* Duas Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {MASNOON_DUAS.map((dua) => (
          <div
            key={dua.id}
            className="flex flex-col justify-between rounded-2xl border border-[#E5E2D6] bg-white p-6 sm:p-7"
          >
            <div>
              <div className="flex items-center justify-between gap-3 border-b border-[#E5E2D6] pb-3.5">
                <span className="text-xs font-semibold text-[#087A55]">
                  {language === 'ur' ? dua.occasionUr : dua.occasionEn}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `${dua.arabic}\n${dua.transliteration}\n${dua.translationEn}\n${dua.translationUr}\n— ${dua.sourceEn}`,
                      dua.id
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#E5E2D6] px-2.5 py-1 text-xs font-medium text-[#064E3B] hover:border-[#087A55]"
                >
                  {copiedId === dua.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#087A55]" aria-hidden="true" />
                      <span>{language === 'ur' ? 'کاپی ہو گیا' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{language === 'ur' ? 'کاپی' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

              <h2
                className={`mt-4 text-[#064E3B] ${
                  language === 'ur' ? 'font-urdu text-lg font-bold text-right' : 'font-display text-2xl font-semibold'
                }`}
              >
                {language === 'ur' ? dua.titleUr : dua.titleEn}
              </h2>

              <p
                dir="rtl"
                lang="ar"
                className="font-arabic mt-4 rounded-xl bg-[#FAFAF5] p-4 text-right text-2xl text-[#064E3B]"
              >
                {dua.arabic}
              </p>

              <p className="mt-3 text-xs italic text-[#202820]/65">
                {dua.transliteration}
              </p>

              <p dir="rtl" className="font-urdu mt-3 text-right text-base text-[#202820]">
                {dua.translationUr}
              </p>
              <p className="font-editorial mt-2 text-sm leading-relaxed text-[#202820]/85">
                {dua.translationEn}
              </p>
            </div>

            <p className="mt-5 border-t border-[#E5E2D6] pt-3 text-xs text-[#202820]/60">
              {language === 'ur' ? dua.sourceUr : dua.sourceEn}
            </p>
          </div>
        ))}
      </div>

      {duaArticles.length > 0 && (
        <section className="mt-14">
          <h2
            className={
              language === 'ur'
                ? 'font-urdu text-2xl font-bold text-[#064E3B]'
                : 'font-display text-3xl font-semibold text-[#064E3B]'
            }
          >
            {language === 'ur' ? 'اذکار سے متعلق مضامین' : 'Guides on Azkar & Remembrance'}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {duaArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
