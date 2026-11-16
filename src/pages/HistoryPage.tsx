import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getArticlesByCategory } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { Breadcrumb } from '../components/Breadcrumb';

const HISTORICAL_MILESTONES = [
  {
    eraEn: '1 AH / 622 CE',
    eraUr: '۱ ہجری / ۶۲۲ء',
    titleEn: 'The Hijrah & Charter of Madinah',
    titleUr: 'ہجرتِ مدینہ اور میثاقِ مدینہ',
    summaryEn:
      'Establishment of the prophetic community in Madinah rooted in brotherhood, civic responsibility, and mutual protection.',
    summaryUr:
      'مدینہ منورہ میں اخوت، معاشرتی عدل اور باہمی حقوق کے تحفظ پر مبنی مثالی اسلامی معاشرے کا قیام۔',
  },
  {
    eraEn: '11–40 AH / 632–661 CE',
    eraUr: '۱۱ تا ۴۰ ہجری / ۶۳۲ تا ۶۶۱ء',
    titleEn: 'Era of the Rightly Guided Caliphs',
    titleUr: 'عہدِ خلافتِ راشدہ',
    summaryEn:
      'Compilation of the Noble Quran into unified manuscripts, establishment of public welfare (Bayt al-Mal), and judicial fairness.',
    summaryUr:
      'قرآن مجید کی جمع و تدوین، بیت المال کے ذریعے فلاحی نظام اور عدل و انصاف کی روشن مثالیں۔',
  },
  {
    eraEn: '2nd–5th Century AH',
    eraUr: 'دوسری تا پانچویں صدی ہجری',
    titleEn: 'Al-Qarawiyyin, Hadith Sciences & Bayt al-Hikmah',
    titleUr: 'تدوینِ حدیث، جامعہ قرویین اور بیت الحکمت',
    summaryEn:
      'Unprecedented flourishing of Sahih Hadith verification, libraries, hospitals, mathematics, optics, and astronomy.',
    summaryUr:
      'علمِ حدیث کی مستند تدوین، جامعات و کتب خانوں کا قیام اور سائنسی علوم میں تاریخی پیش رفت۔',
  },
];

export function HistoryPage() {
  const { language, updateSeo } = useApp();

  useEffect(() => {
    updateSeo({
      title: 'Islamic History – اسلامی تاریخ | Paigham360',
      description:
        'Explore authentic Islamic history, prophetic heritage, the Rightly Guided Caliphs, Al-Qarawiyyin, and centuries of scholarship on Paigham360.',
      path: '/history',
    });
  }, [updateSeo]);

  const historyArticles = getArticlesByCategory('islamic-history');
  const sahabaAndWaqiat = [
    ...historyArticles,
    ...getArticlesByCategory('stories-of-sahaba'),
    ...getArticlesByCategory('islamic-waqiat'),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ labelEn: 'Islamic History', labelUr: 'اسلامی تاریخ' }]} />

      <div className="islamic-lattice-dark rounded-2xl p-8 text-[#FAFAF5] sm:p-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
            {language === 'ur' ? 'تہذیبی و علمی ورثہ' : 'Islamic Civilization & Heritage'}
          </p>
          <h1
            className={`mt-2 text-[#FAFAF5] ${
              language === 'ur'
                ? 'font-urdu text-3xl sm:text-4xl font-bold'
                : 'font-display text-4xl sm:text-5xl font-bold'
            }`}
          >
            {language === 'ur' ? 'اسلامی تاریخ – روشن ابواب اور علمی ورثہ' : 'Islamic History – Heritage, Justice & Scholarship'}
          </h1>
          <p className={`mt-3 text-sm sm:text-base text-[#FAFAF5]/85 ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
            {language === 'ur'
              ? 'مدینہ منورہ کے میثاق سے لے کر جامعہ قرویین اور بیت الحکمت تک اسلامی تاریخ کے مستند اور سبق آموز ادوار۔'
              : 'Tracing centuries of devotion, governance, libraries, and moral courage across Muslim history with verified classical sources.'}
          </p>
        </div>
      </div>

      {/* Historical Timeline */}
      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {HISTORICAL_MILESTONES.map((item, idx) => (
          <div key={idx} className="rounded-2xl border border-[#E5E2D6] bg-white p-6">
            <p className="text-xs font-semibold text-[#087A55] tabular-nums">
              {language === 'ur' ? item.eraUr : item.eraEn}
            </p>
            <h2
              className={`mt-2 text-[#064E3B] ${
                language === 'ur' ? 'font-urdu text-lg font-bold' : 'font-display text-xl font-semibold'
              }`}
            >
              {language === 'ur' ? item.titleUr : item.titleEn}
            </h2>
            <p className={`mt-2.5 text-sm leading-relaxed text-[#202820]/75 ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
              {language === 'ur' ? item.summaryUr : item.summaryEn}
            </p>
          </div>
        ))}
      </section>

      {/* Historical Articles */}
      <section className="mt-14">
        <h2
          className={
            language === 'ur'
              ? 'font-urdu text-2xl font-bold text-[#064E3B]'
              : 'font-display text-3xl font-semibold text-[#064E3B]'
          }
        >
          {language === 'ur' ? 'تاریخی مضامین و واقعات' : 'Historical Studies, Sahaba & Classical Waqiat'}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sahabaAndWaqiat.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>
    </div>
  );
}
