import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Check, Copy, ListOrdered, Share2, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ARTICLES, getArticleBySlug } from '../data/articles';
import { getCategoryBySlug } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { ResilientImage } from '../components/ResilientImage';

type ReadingMode = 'bilingual' | 'en' | 'ur';

export function ArticlePage({ slug }: { slug: string }) {
  const { language, navigate, isBookmarked, toggleBookmark, updateSeo } = useApp();
  const articleIndex = Math.max(0, ARTICLES.findIndex((a) => a.slug === slug));
  const article = getArticleBySlug(slug) || ARTICLES[0];
  const category = getCategoryBySlug(article.category);

  const prevArticle = articleIndex > 0 ? ARTICLES[articleIndex - 1] : null;
  const nextArticle = articleIndex < ARTICLES.length - 1 ? ARTICLES[articleIndex + 1] : null;

  const [readingMode, setReadingMode] = useState<ReadingMode>('bilingual');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    updateSeo({
      title: `${article.titleEn} | Paigham360`,
      description: article.excerptEn,
      path: `/article/${article.slug}`,
      type: 'article',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.titleEn,
        alternativeHeadline: article.titleUr,
        description: article.excerptEn,
        datePublished: article.publishedAt,
        author: {
          '@type': 'Organization',
          name: article.authorEn,
        },
        inLanguage: ['en', 'ur'],
        publisher: {
          '@type': 'Organization',
          name: 'Paigham360 – The Message of Islam',
        },
      },
    });
  }, [article, updateSeo]);

  const saved = isBookmarked(article.id);
  const relatedArticles = ARTICLES.filter((a) => article.relatedSlugs.includes(a.slug));

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    `${article.titleEn}\n${article.titleUr}\n${shareUrl}`
  )}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  const showEn = readingMode === 'bilingual' || readingMode === 'en';
  const showUr = readingMode === 'bilingual' || readingMode === 'ur';

  return (
    <>
      {/* Thin Top Reading Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-30 h-0.5 bg-transparent">
        <div
          className="h-full bg-[#D4AF37] transition-[width] duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            {
              labelEn: category?.nameEn || 'Articles',
              labelUr: category?.nameUr || 'مضامین',
              path: `/category/${article.category}`,
            },
            { labelEn: article.titleEn, labelUr: article.titleUr },
          ]}
        />

        {/* Article Header */}
        <header className="border-b border-[#E5E2D6] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#202820]/65">
              <a
                href={`/category/${article.category}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/category/${article.category}`);
                }}
                className="font-semibold text-[#087A55] hover:underline"
              >
                {language === 'ur' ? category?.nameUr : category?.nameEn}
              </a>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-[#087A55]" aria-hidden="true" />
                <span>{language === 'ur' ? article.authorUr : article.authorEn}</span>
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.publishedAt} className="tabular-nums">
                {article.publishedAt}
              </time>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {language === 'ur'
                  ? `${article.readTimeMinutes} منٹ مطالعہ`
                  : `${article.readTimeMinutes} min read`}
              </span>
            </div>

            {/* Reading Mode Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg border border-[#E5E2D6] bg-white p-1">
                {[
                  { id: 'bilingual' as const, label: language === 'ur' ? 'دو لسانی' : 'Bilingual' },
                  { id: 'en' as const, label: 'English (LTR)' },
                  { id: 'ur' as const, label: 'اردو (RTL)' },
                ].map((modeOption) => (
                  <button
                    key={modeOption.id}
                    type="button"
                    onClick={() => setReadingMode(modeOption.id)}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      readingMode === modeOption.id
                        ? 'bg-[#064E3B] text-[#FAFAF5]'
                        : 'text-[#202820]/70 hover:text-[#064E3B]'
                    }`}
                  >
                    {modeOption.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => toggleBookmark(article.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  saved
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#064E3B]'
                    : 'border-[#E5E2D6] bg-white text-[#202820] hover:border-[#087A55]'
                }`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${saved ? 'fill-current text-[#D4AF37]' : ''}`} aria-hidden="true" />
                <span>{saved ? (language === 'ur' ? 'محفوظ شدہ' : 'Saved') : language === 'ur' ? 'محفوظ کریں' : 'Save'}</span>
              </button>
            </div>
          </div>

          {showEn && (
            <h1
              dir="ltr"
              className="font-display mt-6 text-3xl font-bold tracking-tight text-[#064E3B] sm:text-4xl text-balance"
            >
              {article.titleEn}
            </h1>
          )}

          {showUr && (
            <h2
              dir="rtl"
              lang="ur"
              className={`font-urdu mt-4 text-right font-bold text-[#202820] ${
                readingMode === 'ur' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
              }`}
            >
              {article.titleUr}
            </h2>
          )}

          {/* Editorial Review Status */}
          <p className="mt-4 text-xs text-[#087A55]">
            {language === 'ur' ? article.editorialStatusUr : article.editorialStatusEn}
          </p>
        </header>

        {/* Featured Editorial Image */}
        <figure className="mt-8">
          <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-white shadow-sm">
            <ResilientImage
              src={article.image}
              alt={language === 'ur' ? article.imageAltUr : article.imageAltEn}
              aspectClass="aspect-[16/9]"
              caption={article.titleEn}
            />
          </div>
          <figcaption className="mt-2.5 text-xs italic text-[#202820]/60">
            {language === 'ur' ? article.imageAltUr : article.imageAltEn}
          </figcaption>
        </figure>

        {/* Table of Contents */}
        <nav
          aria-label={language === 'ur' ? 'فہرستِ مضمون' : 'Table of Contents'}
          className="mt-8 rounded-2xl border border-[#E5E2D6] bg-[#F3F1E8]/70 p-5 sm:p-6"
        >
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#064E3B] uppercase">
            <ListOrdered className="h-4 w-4 text-[#087A55]" aria-hidden="true" />
            <span>{language === 'ur' ? 'فہرستِ مضمون' : 'Table of Contents'}</span>
          </div>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
            <li>
              <a href="#intro" className="text-[#064E3B] hover:text-[#087A55] hover:underline">
                01. {article.isStory ? (language === 'ur' ? 'واقعے کا تعارف' : 'Story Introduction') : language === 'ur' ? 'تمہید' : 'Introduction'}
              </a>
            </li>
            {article.sections.map((sec, idx) => (
              <li key={idx}>
                <a href={`#section-${idx + 1}`} className="text-[#064E3B] hover:text-[#087A55] hover:underline">
                  {String(idx + 2).padStart(2, '0')}. {language === 'ur' ? sec.headingUr : sec.headingEn}
                </a>
              </li>
            ))}
            <li>
              <a href="#references" className="text-[#064E3B] hover:text-[#087A55] hover:underline">
                {String(article.sections.length + 2).padStart(2, '0')}. {language === 'ur' ? 'قرآنی و حدیثی حوالہ جات' : 'Quran & Hadith References'}
              </a>
            </li>
            <li>
              <a href="#islamic-lesson" className="text-[#064E3B] hover:text-[#087A55] hover:underline">
                {String(article.sections.length + 3).padStart(2, '0')}. {language === 'ur' ? 'سبق آموز بات اور خلاصہ' : 'Main Islamic Lesson & Conclusion'}
              </a>
            </li>
          </ol>
        </nav>

        {/* Story Introduction */}
        <section id="intro" className="mt-8 scroll-mt-24 rounded-2xl border border-[#E5E2D6] bg-white p-6 sm:p-8">
          <p className="text-xs font-bold tracking-widest text-[#087A55] uppercase">
            {article.isStory
              ? language === 'ur'
                ? 'واقعے کا تعارف'
                : 'Story Introduction'
              : language === 'ur'
                ? 'تمہید'
                : 'Introduction'}
          </p>
          {showEn && (
            <p dir="ltr" className="font-editorial mt-3 text-base leading-relaxed text-[#202820] sm:text-lg">
              {article.introEn}
            </p>
          )}
          {showUr && (
            <p dir="rtl" lang="ur" className="font-urdu mt-4 text-right text-lg text-[#202820]">
              {article.introUr}
            </p>
          )}
        </section>

        {/* Important Characters (for Stories) */}
        {article.characters && article.characters.length > 0 && (
          <section className="mt-8 rounded-2xl border border-[#E5E2D6] bg-[#F3F1E8]/70 p-6 sm:p-8">
            <h3 className="text-xs font-bold tracking-widest text-[#064E3B] uppercase">
              {language === 'ur' ? 'اہم شخصیات' : 'Key Figures in This Account'}
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {article.characters.map((char, idx) => (
                <div key={idx} className="rounded-xl border border-[#E5E2D6] bg-white p-4">
                  {showEn && (
                    <div dir="ltr">
                      <p className="font-display text-base font-semibold text-[#064E3B]">{char.nameEn}</p>
                      <p className="mt-1 text-xs text-[#202820]/75">{char.roleEn}</p>
                    </div>
                  )}
                  {showUr && (
                    <div dir="rtl" className={`text-right ${showEn ? 'mt-3 border-t border-[#E5E2D6] pt-2' : ''}`}>
                      <p className="font-urdu-tight text-base font-bold text-[#064E3B]">{char.nameUr}</p>
                      <p className="font-urdu-tight text-xs text-[#202820]/75">{char.roleUr}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Main Formatted Body Sections */}
        <div className="mt-10 space-y-10">
          {article.sections.map((section, idx) => (
            <section
              key={idx}
              id={`section-${idx + 1}`}
              className="scroll-mt-24 border-b border-[#E5E2D6] pb-8 last:border-b-0"
            >
              {showEn && (
                <div dir="ltr" className="max-w-3xl">
                  <h3 className="font-display text-2xl font-semibold text-[#064E3B]">
                    {section.headingEn}
                  </h3>
                  <p className="font-editorial mt-3 text-base leading-[1.85] text-[#202820]/90">
                    {section.bodyEn}
                  </p>
                </div>
              )}

              {showUr && (
                <div dir="rtl" lang="ur" className={`text-right ${showEn ? 'mt-6 rounded-xl bg-white p-6 border border-[#E5E2D6]' : ''}`}>
                  <h3 className="font-urdu text-xl font-bold text-[#064E3B] sm:text-2xl">
                    {section.headingUr}
                  </h3>
                  <p className="font-urdu mt-3 text-base text-[#202820]/90 sm:text-lg">
                    {section.bodyUr}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Quranic Reference & Authentic Hadith Reference */}
        <div id="references" className="mt-10 scroll-mt-24 grid gap-6 md:grid-cols-2">
          <div className="islamic-lattice-dark rounded-2xl border border-[#D4AF37]/40 p-6 text-[#FAFAF5] sm:p-7">
            <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
              {language === 'ur' ? 'قرآنی رہنمائی' : 'Quranic Reference'}
            </p>
            <p dir="rtl" lang="ar" className="font-arabic mt-4 text-right text-xl leading-[2] text-[#FAFAF5]">
              {article.quranReference.arabic}
            </p>
            {showUr && (
              <p dir="rtl" className="font-urdu mt-4 text-right text-base text-[#FAFAF5]/90">
                {article.quranReference.translationUr}
              </p>
            )}
            {showEn && (
              <p dir="ltr" className="font-editorial mt-3 text-sm leading-relaxed text-[#FAFAF5]/90">
                “{article.quranReference.translationEn}”
              </p>
            )}
            <p className="mt-4 border-t border-[#D4AF37]/25 pt-3 text-xs font-semibold text-[#D4AF37]">
              {language === 'ur'
                ? article.quranReference.surahRefUr
                : article.quranReference.surahRefEn}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5E2D6] bg-white p-6 sm:p-7">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold tracking-widest text-[#087A55] uppercase">
                {language === 'ur' ? 'مستند حدیثِ مبارکہ' : 'Hadith Reference'}
              </p>
              <span className="text-xs font-semibold text-[#064E3B]">
                {language === 'ur' ? article.hadithReference.gradeUr : article.hadithReference.gradeEn}
              </span>
            </div>

            {article.hadithReference.arabic && (
              <p dir="rtl" lang="ar" className="font-arabic mt-4 text-right text-lg text-[#064E3B]">
                {article.hadithReference.arabic}
              </p>
            )}

            {showUr && (
              <p dir="rtl" className="font-urdu mt-4 text-right text-base text-[#202820]">
                {article.hadithReference.textUr}
              </p>
            )}

            {showEn && (
              <p dir="ltr" className="font-editorial mt-3 text-sm leading-relaxed text-[#202820]/85">
                “{article.hadithReference.textEn}”
              </p>
            )}

            <p className="mt-4 border-t border-[#E5E2D6] pt-3 text-xs font-semibold text-[#087A55]">
              {language === 'ur'
                ? article.hadithReference.sourceUr
                : article.hadithReference.sourceEn}
            </p>
          </div>
        </div>

        {/* Highlighted Main Islamic Lesson */}
        <section id="islamic-lesson" className="mt-8 scroll-mt-24 rounded-2xl border border-[#D4AF37]/50 bg-[#F3F1E8] p-6 sm:p-8">
          <p className="text-xs font-bold tracking-widest text-[#064E3B] uppercase">
            {language === 'ur' ? 'سبق آموز بات' : 'Main Islamic Lesson'}
          </p>
          {showEn && (
            <p dir="ltr" className="font-display mt-2 text-xl font-semibold text-[#064E3B] sm:text-2xl">
              {article.lessonEn}
            </p>
          )}
          {showUr && (
            <p dir="rtl" lang="ur" className="font-urdu mt-3 text-right text-lg font-bold text-[#202820]">
              {article.lessonUr}
            </p>
          )}
        </section>

        {/* Conclusion & Authenticity Verification */}
        <section className="mt-8 space-y-6 rounded-2xl border border-[#E5E2D6] bg-white p-6 sm:p-8">
          <div>
            <h3 className="text-xs font-bold tracking-widest text-[#087A55] uppercase">
              {language === 'ur' ? 'خلاصہ و نتیجہ' : 'Conclusion'}
            </h3>
            {showEn && (
              <p dir="ltr" className="font-editorial mt-2 text-base leading-relaxed text-[#202820]/90">
                {article.conclusionEn}
              </p>
            )}
            {showUr && (
              <p dir="rtl" lang="ur" className="font-urdu mt-3 text-right text-base text-[#202820]">
                {article.conclusionUr}
              </p>
            )}
          </div>

          <div className="border-t border-[#E5E2D6] pt-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#064E3B]">
              <ShieldCheck className="h-4 w-4 text-[#087A55]" aria-hidden="true" />
              <span>{language === 'ur' ? 'تحقیقی و تاریخی حیثیت' : 'Source Verification & Authenticity Note'}</span>
            </div>
            <p
              dir={language === 'ur' ? 'rtl' : 'ltr'}
              className={`mt-2 text-xs leading-relaxed text-[#202820]/75 ${
                language === 'ur' ? 'font-urdu-tight text-right' : ''
              }`}
            >
              {language === 'ur' ? article.authenticityNoteUr : article.authenticityNoteEn}
            </p>
          </div>
        </section>

        {/* Social Sharing Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E5E2D6] bg-white p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#064E3B]">
            <Share2 className="h-4 w-4 text-[#087A55]" aria-hidden="true" />
            <span>{language === 'ur' ? 'اس علم کو دوسروں تک پہنچائیں' : 'Share This Beneficial Knowledge'}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#087A55] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#064E3B]"
            >
              <span>WhatsApp</span>
            </a>

            <a
              href={facebookHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[#E5E2D6] bg-[#FAFAF5] px-4 py-2 text-xs font-semibold text-[#064E3B] transition-colors hover:border-[#087A55]"
            >
              <span>Facebook</span>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E2D6] bg-white px-4 py-2 text-xs font-semibold text-[#202820] transition-colors hover:border-[#087A55]"
            >
              {linkCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#087A55]" aria-hidden="true" />
                  <span>{language === 'ur' ? 'لنک کاپی ہو گیا' : 'Link Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{language === 'ur' ? 'لنک کاپی کریں' : 'Copy Link'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Previous / Next Article Navigation */}
        <nav
          aria-label={language === 'ur' ? 'پچھلا اور اگلا مضمون' : 'Article Navigation'}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          {prevArticle ? (
            <a
              href={`/article/${prevArticle.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/article/${prevArticle.slug}`);
              }}
              className="flex flex-col justify-between rounded-2xl border border-[#E5E2D6] bg-white p-5 transition-colors hover:border-[#087A55]"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087A55]">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{language === 'ur' ? 'پچھلا مضمون' : 'Previous Article'}</span>
              </span>
              <span className={`mt-2 font-semibold text-[#064E3B] ${language === 'ur' ? 'font-urdu-tight text-right' : 'text-sm'}`}>
                {language === 'ur' ? prevArticle.titleUr : prevArticle.titleEn}
              </span>
            </a>
          ) : (
            <div />
          )}

          {nextArticle && (
            <a
              href={`/article/${nextArticle.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/article/${nextArticle.slug}`);
              }}
              className="flex flex-col justify-between rounded-2xl border border-[#E5E2D6] bg-white p-5 text-right transition-colors hover:border-[#087A55]"
            >
              <span className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-[#087A55]">
                <span>{language === 'ur' ? 'اگلا مضمون' : 'Next Article'}</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className={`mt-2 font-semibold text-[#064E3B] ${language === 'ur' ? 'font-urdu-tight' : 'text-sm'}`}>
                {language === 'ur' ? nextArticle.titleUr : nextArticle.titleEn}
              </span>
            </a>
          )}
        </nav>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-14 border-t border-[#E5E2D6] pt-10">
            <h2
              className={
                language === 'ur'
                  ? 'font-urdu text-2xl font-bold text-[#064E3B]'
                  : 'font-display text-3xl font-semibold text-[#064E3B]'
              }
            >
              {language === 'ur' ? 'متعلقہ مضامین اور واقعات' : 'Related Articles & Stories'}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
