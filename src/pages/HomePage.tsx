import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Compass, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ARTICLES } from '../data/articles';
import { CATEGORIES, IMAGES } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { DailyGuidanceSection } from '../components/DailyGuidanceSection';
import { ResilientImage } from '../components/ResilientImage';

export function HomePage() {
  const { language, navigate, updateSeo, bookmarks } = useApp();
  const [discoveryTab, setDiscoveryTab] = useState<'popular' | 'recommended' | 'recent' | 'saved'>('popular');

  useEffect(() => {
    updateSeo({
      title: 'Paigham360 – The Message of Islam | Quran, Hadith & Islamic Stories',
      description:
        'Discover authentic Quranic teachings, Sahih Hadith, Islamic stories in Urdu and English, Islamic Waqiat, Duas & Azkar, and Islamic history on Paigham360.',
      path: '/',
      type: 'website',
    });
  }, [updateSeo]);

  const featuredArticles = ARTICLES.filter((a) => a.isFeatured).slice(0, 3);
  const editorsPicks = ARTICLES.filter((a) => a.isEditorsPick).slice(0, 4);
  const latestStories = ARTICLES.filter((a) => a.isStory).slice(0, 3);

  const discoveryArticles = (() => {
    if (discoveryTab === 'popular') return ARTICLES.filter((a) => a.isPopular).slice(0, 6);
    if (discoveryTab === 'recommended') return ARTICLES.filter((a) => a.isRecommended).slice(0, 6);
    if (discoveryTab === 'saved') return ARTICLES.filter((a) => bookmarks.includes(a.id));
    return [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 6);
  })();

  return (
    <div>
      {/* 1. Full-Width Illuminated Mosque Hero Section */}
      <section className="relative overflow-hidden border-b-2 border-[#D4AF37]/50 bg-[#064E3B] text-[#FAFAF5]">
        {/* Background Illuminated Mosque Photography */}
        <img
          src={IMAGES.heroMosque}
          alt={
            language === 'ur'
              ? 'غروب آفتاب کے وقت روشن مسجد، ہلال اور سنہری فانوس'
              : 'Illuminated mosque dome at sunset beneath an emerald sky with reflective courtyard'
          }
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
        />

        {/* Measured Deep Emerald & Subtle Geometric Pattern Scrim for WCAG AA Legibility */}
        <div
          aria-hidden="true"
          className="islamic-lattice-dark absolute inset-0 bg-gradient-to-r from-[#064E3B]/95 via-[#064E3B]/80 to-[#064E3B]/70 opacity-90"
        />

        {/* Subtle Crescent Moon & Golden Lanterns Decorative Motif */}
        <svg
          viewBox="0 0 320 220"
          className="pointer-events-none absolute right-6 top-0 hidden h-52 w-72 opacity-90 md:block"
          aria-hidden="true"
        >
          {/* Crescent Moon */}
          <path
            d="M250 38A22 22 0 1 0 270 68A18 18 0 1 1 250 38Z"
            fill="#D4AF37"
            opacity="0.9"
          />
          {/* Hanging Golden Lantern 1 */}
          <line x1="95" y1="0" x2="95" y2="62" stroke="#D4AF37" strokeWidth="1.4" />
          <path d="M84 62h22l5 16-16 26-16-26z" fill="#064E3B" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="95" cy="78" r="3.5" fill="#D4AF37" />
          {/* Hanging Golden Lantern 2 */}
          <line x1="175" y1="0" x2="175" y2="40" stroke="#D4AF37" strokeWidth="1.2" />
          <path d="M167 40h16l4 12-12 19-12-19z" fill="#064E3B" stroke="#D4AF37" strokeWidth="1.3" />
          <circle cx="175" cy="52" r="2.6" fill="#D4AF37" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className={`max-w-3xl ${language === 'ur' ? 'mr-auto text-right' : ''}`}>
            <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
              {language === 'ur'
                ? 'پیغام 360 – اسلام کا عالمی تعلیمی پیغام'
                : 'Paigham360 · Discover Islam. Learn. Reflect. Inspire.'}
            </p>

            {/* Required Urdu Heading */}
            <p
              dir="rtl"
              lang="ur"
              className="font-urdu mt-4 text-right text-2xl font-bold text-[#D4AF37] sm:text-3xl"
            >
              اسلام کی روشنی، زندگی کی رہنمائی
            </p>

            {/* Required English / Active Heading */}
            <h1
              className={`mt-3 text-[#FAFAF5] text-balance ${
                language === 'ur'
                  ? 'font-urdu text-3xl sm:text-5xl font-bold'
                  : 'font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12]'
              }`}
            >
              {language === 'ur'
                ? 'قرآن، صحیح حدیث اور اسلامی واقعات کی مستند روشنی'
                : 'Explore the Beauty of Islam'}
            </h1>

            <p
              className={`mt-5 max-w-2xl text-base leading-relaxed text-[#FAFAF5]/90 sm:text-lg ${
                language === 'ur' ? 'font-urdu-tight' : ''
              }`}
            >
              {language === 'ur'
                ? 'مستند قرآنی تعلیمات، صحیح احادیث مبارکہ، انبیاء کرام و صحابہؓ کے ایمان افروز واقعات اور روزمرہ زندگی کے لیے بامقصد رہنمائی دریافت کیجیے۔'
                : 'Discover authentic Quranic teachings, Sahih Hadith, inspiring Islamic stories, and meaningful lessons for everyday life.'}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="/knowledge"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/knowledge');
                }}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#202820] shadow-md transition-colors hover:bg-[#e5c252] whitespace-nowrap shrink-0"
              >
                <Compass className="h-4 w-4" aria-hidden="true" />
                <span>
                  {language === 'ur' ? 'اسلامی معلومات دریافت کریں' : 'Explore Islamic Knowledge'}
                </span>
              </a>

              <a
                href="/stories"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/stories');
                }}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-[#D4AF37]/75 bg-[#064E3B]/75 px-6 py-3 text-sm font-semibold text-[#FAFAF5] transition-colors hover:bg-[#087A55] whitespace-nowrap shrink-0"
              >
                <BookOpen className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                <span>
                  {language === 'ur' ? 'تازہ ترین کہانیاں پڑھیں' : 'Read Latest Stories'}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Authentic Quranic Metrics Proof Strip */}
      <section className="border-b border-[#D4AF37]/30 bg-[#087A55] text-[#FAFAF5]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[#FAFAF5]/15 sm:grid-cols-4 sm:divide-y-0">
          {[
            { num: '30', labelEn: 'Juz (Chapters)', labelUr: 'پارے (اجزاء)' },
            { num: '114', labelEn: 'Holy Surahs', labelUr: 'قرآنی سورتیں' },
            { num: '6,236', labelEn: 'Verified Ayat', labelUr: 'قرآنی آیات' },
            { num: '12', labelEn: 'Islamic Categories', labelUr: 'علمی شعبہ جات' },
          ].map((stat, idx) => (
            <div key={idx} className="px-6 py-5 text-center">
              <p className="font-display text-3xl font-bold text-[#D4AF37] tabular-nums sm:text-4xl">
                {stat.num}
              </p>
              <p className={`mt-1 text-xs font-medium text-[#FAFAF5]/95 sm:text-sm ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
                {language === 'ur' ? stat.labelUr : stat.labelEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Five Daily Islamic Reminders */}
      <DailyGuidanceSection />

      {/* 4. Featured Islamic Articles & Editor's Picks */}
      <section className="islamic-lattice-light border-b border-[#E5E2D6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Featured Islamic Articles (8 cols) */}
            <div className="lg:col-span-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-[#087A55] uppercase">
                    {language === 'ur' ? 'نمایاں مضامین' : 'Featured Islamic Articles'}
                  </p>
                  <h2
                    className={`mt-1.5 text-[#064E3B] ${
                      language === 'ur'
                        ? 'font-urdu text-2xl sm:text-3xl font-bold'
                        : 'font-display text-3xl font-semibold tracking-tight'
                    }`}
                  >
                    {language === 'ur' ? 'قرآن، سنت اور رمضان کے خصوصی مضامین' : 'Essential Teachings & Studies'}
                  </h2>
                </div>
                <a
                  href="/articles"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/articles');
                  }}
                  className="text-xs font-semibold text-[#087A55] hover:text-[#064E3B] whitespace-nowrap shrink-0"
                >
                  {language === 'ur' ? 'سب دیکھیں' : 'View All'}
                </a>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {featuredArticles.map((article, idx) => (
                  <div key={article.id} className={idx === 0 ? 'md:col-span-2' : ''}>
                    <ArticleCard article={article} featured={idx === 0} />
                  </div>
                ))}
              </div>
            </div>

            {/* Editor's Picks Sidebar (4 cols) */}
            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-[#D4AF37]/40 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold tracking-widest text-[#087A55] uppercase">
                  {language === 'ur' ? 'ادارتی انتخاب' : "Editor's Picks"}
                </p>
                <h3
                  className={`mt-1.5 text-[#064E3B] ${
                    language === 'ur' ? 'font-urdu text-xl font-bold' : 'font-display text-2xl font-semibold'
                  }`}
                >
                  {language === 'ur' ? 'خصوصی منتخب تحریریں' : 'Curated Reading List'}
                </h3>

                <div className="mt-5 divide-y divide-[#E5E2D6]">
                  {editorsPicks.map((pick, i) => {
                    const cat = CATEGORIES.find((c) => c.slug === pick.category);
                    return (
                      <a
                        key={pick.id}
                        href={`/article/${pick.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/article/${pick.slug}`);
                        }}
                        className={`block py-4 first:pt-1 last:pb-1 group ${language === 'ur' ? 'text-right' : ''}`}
                      >
                        <div className="flex items-center gap-2 text-xs text-[#202820]/60">
                          <span className="font-mono font-semibold text-[#D4AF37] tabular-nums">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-[#087A55]">
                            {language === 'ur' ? cat?.nameUr : cat?.nameEn}
                          </span>
                        </div>
                        <h4
                          className={`mt-1.5 font-semibold text-[#202820] transition-colors group-hover:text-[#064E3B] ${
                            language === 'ur' ? 'font-urdu-tight text-base' : 'text-sm leading-snug'
                          }`}
                        >
                          {language === 'ur' ? pick.titleUr : pick.titleEn}
                        </h4>
                      </a>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 5. Latest Islamic Stories */}
      <section className="border-b border-[#E5E2D6] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#087A55] uppercase">
                {language === 'ur' ? 'ایمان افروز داستانیں' : 'Latest Islamic Stories'}
              </p>
              <h2
                className={`mt-1.5 text-[#064E3B] ${
                  language === 'ur'
                    ? 'font-urdu text-2xl sm:text-3xl font-bold'
                    : 'font-display text-3xl sm:text-4xl font-semibold tracking-tight'
                }`}
              >
                {language === 'ur'
                  ? 'انبیاء، صحابہؓ اور سچے اسلامی واقعات'
                  : 'True Narratives of Faith, Courage & Mercy'}
              </h2>
            </div>

            <a
              href="/stories"
              onClick={(e) => {
                e.preventDefault();
                navigate('/stories');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#064E3B] hover:text-[#087A55] whitespace-nowrap shrink-0"
            >
              <span>{language === 'ur' ? 'تمام کہانیاں پڑھیں' : 'Explore All Stories'}</span>
              <ArrowRight className={`h-4 w-4 ${language === 'ur' ? 'rotate-180' : ''}`} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {latestStories.map((story) => (
              <ArticleCard key={story.id} article={story} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Most Popular, Recommended Reading & Recently Published */}
      <section className="border-b border-[#E5E2D6] bg-[#FAFAF5] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#087A55] uppercase">
                {language === 'ur' ? 'قارئین کی پسند' : 'Reader Discovery'}
              </p>
              <h2
                className={`mt-1.5 text-[#064E3B] ${
                  language === 'ur'
                    ? 'font-urdu text-2xl sm:text-3xl font-bold'
                    : 'font-display text-3xl sm:text-4xl font-semibold tracking-tight'
                }`}
              >
                {language === 'ur'
                  ? 'مقبول ترین، منتخب اور تازہ شائع شدہ مضامین'
                  : 'Most Popular, Recommended & Recently Published'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#E5E2D6] bg-white p-1.5">
              {[
                { key: 'popular' as const, en: 'Most Popular', ur: 'مقبول ترین' },
                { key: 'recommended' as const, en: 'Recommended Reading', ur: 'تجویز کردہ مطالعہ' },
                { key: 'recent' as const, en: 'Recently Published', ur: 'تازہ شائع شدہ' },
                { key: 'saved' as const, en: `Saved (${bookmarks.length})`, ur: `محفوظ (${bookmarks.length})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setDiscoveryTab(tab.key)}
                  className={`whitespace-nowrap shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    discoveryTab === tab.key
                      ? 'bg-[#064E3B] text-[#FAFAF5]'
                      : 'text-[#202820]/75 hover:text-[#064E3B]'
                  }`}
                >
                  {language === 'ur' ? tab.ur : tab.en}
                </button>
              ))}
            </div>
          </div>

          {discoveryArticles.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-[#E5E2D6] bg-white p-10 text-center">
              <p className="text-sm text-[#202820]/75">
                {language === 'ur'
                  ? 'آپ نے ابھی تک کوئی مضمون محفوظ نہیں کیا۔ کسی بھی مضمون پر بک مارک آئیکن دبائیں۔'
                  : 'No bookmarked articles yet. Click the bookmark icon on any article to save it here.'}
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {discoveryArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. All 12 Islamic Content Categories Grid */}
      <section className="border-b border-[#E5E2D6] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-[#087A55] uppercase">
              {language === 'ur' ? '۱۲ اسلامی شعبہ جات' : '12 Islamic Departments'}
            </p>
            <h2
              className={`mt-2 text-[#064E3B] ${
                language === 'ur'
                  ? 'font-urdu text-2xl sm:text-3xl font-bold'
                  : 'font-display text-3xl sm:text-4xl font-semibold tracking-tight'
              }`}
            >
              {language === 'ur'
                ? 'قرآن، حدیث، تاریخ اور اخلاقی تربیت کے تمام موضوعات'
                : 'Explore All 12 Islamic Content Categories'}
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CATEGORIES.map((category, index) => (
              <a
                key={category.slug}
                href={`/category/${category.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/category/${category.slug}`);
                }}
                className="group flex flex-col justify-between rounded-2xl border border-[#E5E2D6] bg-[#FAFAF5] p-6 transition-all duration-150 hover:border-[#D4AF37] hover:bg-white hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#087A55]">
                    <span className="font-mono tabular-nums font-semibold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <ArrowRight
                      className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${
                        language === 'ur' ? 'rotate-180 group-hover:-translate-x-0.5' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <h3
                    className={`mt-3 text-[#064E3B] ${
                      language === 'ur'
                        ? 'font-urdu text-lg font-bold text-right'
                        : 'font-display text-xl font-semibold'
                    }`}
                  >
                    {language === 'ur' ? category.nameUr : category.nameEn}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-[#D4AF37]">
                    {language === 'ur' ? category.nameEn : category.nameUr}
                  </p>
                  <p
                    className={`mt-3 text-sm leading-relaxed text-[#202820]/75 ${
                      language === 'ur' ? 'font-urdu-tight text-right' : ''
                    }`}
                  >
                    {language === 'ur' ? category.descriptionUr : category.descriptionEn}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Scholarly Authenticity & Bilingual Mission Section */}
      <section className="bg-[#FAFAF5] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-white shadow-sm">
                <ResilientImage
                  src={IMAGES.quranStudy}
                  alt={
                    language === 'ur'
                      ? 'قرآن مجید کا منقش نسخہ اور علمی مطالعہ'
                      : 'Open illuminated Quran manuscript on wooden rehal in serene natural sunlight'
                  }
                  aspectClass="aspect-[4/3]"
                />
              </div>
            </div>

            <div className={`lg:col-span-7 ${language === 'ur' ? 'text-right' : ''}`}>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#087A55] uppercase">
                <ShieldCheck className="h-4 w-4 text-[#087A55]" aria-hidden="true" />
                <span>
                  {language === 'ur' ? 'مستند تحقیق کا عہد' : 'Our Commitment to Authenticity'}
                </span>
              </div>

              <h2
                className={`mt-3 text-[#064E3B] ${
                  language === 'ur'
                    ? 'font-urdu text-2xl sm:text-3xl font-bold'
                    : 'font-display text-3xl sm:text-4xl font-semibold tracking-tight'
                }`}
              >
                {language === 'ur'
                  ? 'بغیر کسی من گھڑت حوالے کے، خالص قرآن و سنت کی روشنی'
                  : 'Verified References. Zero Fabrications. Bilingual Clarity.'}
              </h2>

              <p
                className={`mt-4 text-base leading-relaxed text-[#202820]/80 ${
                  language === 'ur' ? 'font-urdu-tight' : ''
                }`}
              >
                {language === 'ur'
                  ? 'پیغام 360 پر شائع ہونے والا ہر مضمون اور واقعہ مستند قرآنی آیات، صحیح بخاری و صحیح مسلم کی احادیث اور معتبر کتبِ تاریخ کے حوالوں کے ساتھ پیش کیا جاتا ہے، اور تاریخی واقعات کو نبوی روایات سے واضح طور پر الگ بیان کیا جاتا ہے۔'
                  : 'Every article, daily guidance card, and Islamic story on Paigham360 cites exact Surah and Ayah numbers, authenticated Hadith collections with scholarly grading, and transparent distinctions between Prophetic Sunnah and classical historical accounts.'}
              </p>

              <div className="mt-7 flex flex-wrap gap-4">
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/about');
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#064E3B] px-5 py-2.5 text-sm font-semibold text-[#FAFAF5] transition-colors hover:bg-[#087A55]"
                >
                  <span>{language === 'ur' ? 'پیغام 360 کے بارے میں جانیں' : 'About Paigham360'}</span>
                  <ArrowRight className={`h-4 w-4 ${language === 'ur' ? 'rotate-180' : ''}`} aria-hidden="true" />
                </a>
                <a
                  href="/history"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/history');
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#E5E2D6] bg-white px-5 py-2.5 text-sm font-semibold text-[#064E3B] transition-colors hover:border-[#087A55]"
                >
                  <span>{language === 'ur' ? 'اسلامی تاریخ پڑھیں' : 'Explore Islamic History'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
