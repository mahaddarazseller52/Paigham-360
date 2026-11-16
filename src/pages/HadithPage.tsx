import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { Breadcrumb } from '../components/Breadcrumb';

const HADITH_COLLECTIONS = [
  {
    nameEn: 'Sahih al-Bukhari',
    nameUr: 'صحیح بخاری',
    compilerEn: 'Imam Muhammad ibn Ismail al-Bukhari (d. 256 AH)',
    compilerUr: 'امام محمد بن اسماعیل البخاری رحمہ اللہ (وفات ۲۵۶ھ)',
    summaryEn: 'Universally recognized as the most authentic collection of Prophetic traditions after the Noble Quran.',
    summaryUr: 'قرآن مجید کے بعد روئے زمین کی سب سے صحیح اور مستند کتابِ حدیث۔',
  },
  {
    nameEn: 'Sahih Muslim',
    nameUr: 'صحیح مسلم',
    compilerEn: 'Imam Muslim ibn al-Hajjaj al-Naysaburi (d. 261 AH)',
    compilerUr: 'امام مسلم بن الحجاج النیشاپوری رحمہ اللہ (وفات ۲۶۱ھ)',
    summaryEn: 'Renowned for its precise arrangement of Hadith chains and clarity of wording.',
    summaryUr: 'اسناد کی باریکی، عمدہ ترتیب اور متون کی صحت کے اعتبار سے نہایت معتبر مجموعہ۔',
  },
  {
    nameEn: 'Jami‘ at-Tirmidhi & Sunan Collections',
    nameUr: 'جامع ترمذی و سننِ اربعہ',
    compilerEn: 'Imam at-Tirmidhi, Abu Dawud, an-Nasa’i & Ibn Majah',
    compilerUr: 'امام ترمذی، ابوداؤد، نسائی اور ابن ماجہ رحمہم اللہ',
    summaryEn: 'Essential compilations preserving Prophetic jurisprudence, manners, and explicit authenticity gradings.',
    summaryUr: 'فقہی احکام، آدابِ زندگی اور احادیث کے درجات کی وضاحت پر مشتمل بنیادی کتب۔',
  },
];

export function HadithPage() {
  const { language, updateSeo } = useApp();

  useEffect(() => {
    updateSeo({
      title: 'Sahih Hadith – احادیث مبارکہ | Paigham360',
      description:
        'Read authentic Sahih Hadith from Sahih al-Bukhari and Sahih Muslim with Arabic text, Urdu and English translations, and verification grading.',
      path: '/hadith',
    });
  }, [updateSeo]);

  const hadithArticles = ARTICLES.filter(
    (a) => a.category === 'sahih-hadith' || a.hadithReference.gradeEn.includes('Sahih')
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ labelEn: 'Sahih Hadith', labelUr: 'احادیث مبارکہ' }]} />

      <div className="islamic-lattice-dark rounded-2xl p-8 text-[#FAFAF5] sm:p-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
            {language === 'ur' ? 'سنتِ نبوی ﷺ' : 'Authenticated Prophetic Traditions'}
          </p>
          <h1
            className={`mt-2 text-[#FAFAF5] ${
              language === 'ur'
                ? 'font-urdu text-3xl sm:text-4xl font-bold'
                : 'font-display text-4xl sm:text-5xl font-semibold'
            }`}
          >
            {language === 'ur' ? 'احادیث مبارکہ – مستند ذخیرہ و تشریح' : 'Sahih Hadith – Verified Wisdom of the Prophet ﷺ'}
          </h1>
          <p className={`mt-3 text-sm sm:text-base text-[#FAFAF5]/85 ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
            {language === 'ur'
              ? 'ہر حدیث اپنے مکمل حوالے، کتاب و باب اور محدثین کی تصدیق (صحیح / حسن) کے ساتھ پیش کی جاتی ہے۔'
              : 'Every Hadith published on Paigham360 includes its primary compilation, book or number reference, and scholarly grading.'}
          </p>
        </div>
      </div>

      {/* Major Hadith Collections Guide */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {HADITH_COLLECTIONS.map((col, idx) => (
          <div key={idx} className="rounded-2xl border border-[#E5E2D6] bg-white p-6">
            <p className="text-xs font-semibold text-[#087A55]">
              {language === 'ur' ? col.compilerUr : col.compilerEn}
            </p>
            <h2
              className={`mt-2 text-[#064E3B] ${
                language === 'ur' ? 'font-urdu text-xl font-bold' : 'font-display text-2xl font-semibold'
              }`}
            >
              {language === 'ur' ? col.nameUr : col.nameEn}
            </h2>
            <p className={`mt-2.5 text-sm leading-relaxed text-[#202820]/75 ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
              {language === 'ur' ? col.summaryUr : col.summaryEn}
            </p>
          </div>
        ))}
      </div>

      {/* Articles Grounded in Sahih Hadith */}
      <section className="mt-14">
        <h2
          className={
            language === 'ur'
              ? 'font-urdu text-2xl font-bold text-[#064E3B]'
              : 'font-display text-3xl font-semibold text-[#064E3B]'
          }
        >
          {language === 'ur' ? 'احادیث پر مبنی مضامین و واقعات' : 'Articles & Narrations Grounded in Sahih Hadith'}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hadithArticles.slice(0, 6).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
