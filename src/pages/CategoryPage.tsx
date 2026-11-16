import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ARTICLES } from '../data/articles';
import { CATEGORIES, getCategoryBySlug } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { Breadcrumb } from '../components/Breadcrumb';

interface CategoryPageProps {
  initialCategory?: string;
  mode?: 'all' | 'stories' | 'waqiat' | 'knowledge' | 'category';
}

export function CategoryPage({ initialCategory = 'all', mode = 'all' }: CategoryPageProps) {
  const { language, navigate, updateSeo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [localQuery, setLocalQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'stories' | 'articles'>(
    mode === 'stories' ? 'stories' : 'all'
  );

  useEffect(() => {
    setSelectedCategory(initialCategory);
    setTypeFilter(mode === 'stories' ? 'stories' : 'all');
  }, [initialCategory, mode]);

  const activeCategoryObj = selectedCategory !== 'all' ? getCategoryBySlug(selectedCategory) : undefined;

  const pageHeader = useMemo(() => {
    if (mode === 'stories') {
      return {
        titleEn: 'Islamic Stories – اسلامی کہانیاں',
        titleUr: 'اسلامی کہانیاں – قرآن و سنت کے سچے واقعات',
        descEn:
          'Inspiring true Islamic stories, Prophetic parables, stories of the Prophets (AS), Sahaba (RA), and gentle tales for children.',
        descUr:
          'قرآن و سنت سے ماخوذ سچی اسلامی کہانیاں، انبیاء کرام و صحابہؓ کے واقعات اور بچوں کے لیے سبق آموز حکایات۔',
        breadcrumbEn: 'Islamic Stories',
        breadcrumbUr: 'اسلامی کہانیاں',
        path: '/stories',
      };
    }
    if (mode === 'waqiat') {
      return {
        titleEn: 'Islamic Waqiat – سبق آموز واقعات',
        titleUr: 'سبق آموز اسلامی واقعات',
        descEn:
          'Historical events of justice, courage, and wisdom from Islamic civilization with transparent scholarly sourcing.',
        descUr:
          'عدل، حکمت اور اخلاق کے ایمان افروز تاریخی واقعات مستند حوالوں اور تحقیقی وضاحت کے ساتھ۔',
        breadcrumbEn: 'Islamic Waqiat',
        breadcrumbUr: 'سبق آموز واقعات',
        path: '/waqiat',
      };
    }
    if (mode === 'knowledge') {
      return {
        titleEn: 'Islamic Knowledge – اسلامی معلومات',
        titleUr: 'اسلامی معلومات اور بنیادی تعلیمات',
        descEn:
          'Foundational teachings on the Five Pillars, Quranic sciences, Islamic manners, history, and Ramadan.',
        descUr:
          'ارکانِ اسلام، اسلامی اخلاق و آداب، تاریخ اور رمضان المبارک سے متعلق بنیادی و مستند معلومات۔',
        breadcrumbEn: 'Islamic Knowledge',
        breadcrumbUr: 'اسلامی معلومات',
        path: '/knowledge',
      };
    }
    if (activeCategoryObj) {
      return {
        titleEn: `${activeCategoryObj.nameEn} – ${activeCategoryObj.nameUr}`,
        titleUr: `${activeCategoryObj.nameUr} – ${activeCategoryObj.nameEn}`,
        descEn: activeCategoryObj.descriptionEn,
        descUr: activeCategoryObj.descriptionUr,
        breadcrumbEn: activeCategoryObj.nameEn,
        breadcrumbUr: activeCategoryObj.nameUr,
        path: `/category/${activeCategoryObj.slug}`,
      };
    }
    return {
      titleEn: 'Islamic Articles & Knowledge Library',
      titleUr: 'تمام اسلامی مضامین اور علمی ذخیرہ',
      descEn:
        'Browse all 12 categories of authentic Islamic articles, Quranic lessons, Sahih Hadith insights, and inspiring stories in English and Urdu.',
      descUr:
        'قرآن، حدیث، سیرت، تاریخ اور اخلاق سمیت تمام ۱۲ شعبوں کے مستند اردو اور انگریزی مضامین کا مطالعہ کیجیے۔',
      breadcrumbEn: 'Islamic Articles',
      breadcrumbUr: 'اسلامی مضامین',
      path: '/articles',
    };
  }, [mode, activeCategoryObj]);

  useEffect(() => {
    updateSeo({
      title: `${pageHeader.titleEn} | Paigham360`,
      description: pageHeader.descEn,
      path: pageHeader.path,
    });
  }, [pageHeader, updateSeo]);

  const filteredArticles = useMemo(() => {
    const q = localQuery.trim().toLowerCase();
    return ARTICLES.filter((art) => {
      if (mode === 'stories' && selectedCategory === 'all') {
        const storyCats = ['islamic-stories', 'stories-of-prophets', 'stories-of-sahaba', 'islamic-stories-for-kids', 'islamic-waqiat'];
        if (!art.isStory && !storyCats.includes(art.category)) return false;
      } else if (selectedCategory !== 'all' && art.category !== selectedCategory) {
        return false;
      }

      if (typeFilter === 'stories' && !art.isStory) return false;
      if (typeFilter === 'articles' && art.isStory) return false;

      if (!q) return true;
      return [
        art.titleEn,
        art.titleUr,
        art.excerptEn,
        art.excerptUr,
        art.quranReference.surahRefEn,
        art.hadithReference.sourceEn,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [selectedCategory, localQuery, typeFilter, mode]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { labelEn: 'Library', labelUr: 'مطالعہ گاہ', path: '/articles' },
          { labelEn: pageHeader.breadcrumbEn, labelUr: pageHeader.breadcrumbUr },
        ]}
      />

      {/* Category Banner */}
      <div className="islamic-lattice-dark rounded-2xl p-8 text-[#FAFAF5] sm:p-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
            {language === 'ur' ? 'پیغام 360 علمی شعبہ' : 'Paigham360 Curated Archive'}
          </p>
          <h1
            className={`mt-2 text-[#FAFAF5] ${
              language === 'ur'
                ? 'font-urdu text-3xl sm:text-4xl font-bold'
                : 'font-display text-4xl sm:text-5xl font-semibold'
            }`}
          >
            {language === 'ur' ? pageHeader.titleUr : pageHeader.titleEn}
          </h1>
          <p className={`mt-3 text-sm sm:text-base text-[#FAFAF5]/85 ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
            {language === 'ur' ? pageHeader.descUr : pageHeader.descEn}
          </p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="mt-8 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#087A55]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder={
                language === 'ur'
                  ? 'اس فہرست میں تلاش کریں...'
                  : 'Filter by title, Quran surah, or Hadith source...'
              }
              className="h-11 w-full rounded-xl border border-[#E5E2D6] bg-white pl-10 pr-4 text-sm text-[#202820] placeholder-[#202820]/45 focus:border-[#087A55] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-[#E5E2D6] bg-white p-1.5 self-start">
            {[
              { key: 'all' as const, en: 'All Formats', ur: 'تمام اقسام' },
              { key: 'stories' as const, en: 'Stories', ur: 'کہانیاں' },
              { key: 'articles' as const, en: 'Articles', ur: 'مضامین' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setTypeFilter(tab.key)}
                className={`whitespace-nowrap shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  typeFilter === tab.key
                    ? 'bg-[#064E3B] text-[#FAFAF5]'
                    : 'text-[#202820]/75 hover:text-[#064E3B]'
                }`}
              >
                {language === 'ur' ? tab.ur : tab.en}
              </button>
            ))}
          </div>
        </div>

        {/* 12 Category Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              navigate('/articles');
            }}
            className={`whitespace-nowrap shrink-0 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'border-[#064E3B] bg-[#064E3B] text-[#FAFAF5]'
                : 'border-[#E5E2D6] bg-white text-[#202820]/80 hover:border-[#087A55]'
            }`}
          >
            {language === 'ur' ? 'تمام ۱۲ موضوعات' : 'All 12 Categories'}
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.slug);
                navigate(`/category/${cat.slug}`);
              }}
              className={`whitespace-nowrap shrink-0 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors ${
                selectedCategory === cat.slug
                  ? 'border-[#064E3B] bg-[#064E3B] text-[#FAFAF5]'
                  : 'border-[#E5E2D6] bg-white text-[#202820]/80 hover:border-[#087A55]'
              }`}
            >
              {language === 'ur' ? cat.nameUr : cat.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      {filteredArticles.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[#E5E2D6] bg-white p-12 text-center">
          <p className="text-sm font-medium text-[#202820]">
            {language === 'ur'
              ? 'اس فلٹر کے تحت کوئی مضمون دستیاب نہیں ہے۔'
              : 'No articles matched the active filter criteria.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setLocalQuery('');
              setTypeFilter('all');
            }}
            className="mt-4 rounded-lg bg-[#064E3B] px-4 py-2 text-xs font-semibold text-[#FAFAF5]"
          >
            {language === 'ur' ? 'فلٹر صاف کریں' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
