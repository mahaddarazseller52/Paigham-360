import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ARTICLES } from '../data/articles';
import { CATEGORIES, getCategoryBySlug } from '../data/categories';
import { MASNOON_DUAS } from '../data/dailyContent';

export function SearchModal() {
  const { searchOpen, setSearchOpen, language, navigate } = useApp();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
      setSelectedCategory('all');
    }
  }, [searchOpen]);

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      const catMatch = selectedCategory === 'all' || article.category === selectedCategory;
      if (!catMatch) return false;
      if (!q) return true;
      const haystack = [
        article.titleEn,
        article.titleUr,
        article.excerptEn,
        article.excerptUr,
        article.quranReference.surahRefEn,
        article.hadithReference.sourceEn,
        article.lessonEn,
        article.lessonUr,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, selectedCategory]);

  const matchingDuas = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || (selectedCategory !== 'all' && selectedCategory !== 'duas-azkar')) return [];
    return MASNOON_DUAS.filter((dua) =>
      [dua.titleEn, dua.titleUr, dua.occasionEn, dua.occasionUr, dua.translationEn, dua.translationUr]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [query, selectedCategory]);

  if (!searchOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={language === 'ur' ? 'تلاش' : 'Search Paigham360'}
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#202820]/60 px-4 pt-12 pb-8 backdrop-blur-sm sm:pt-20"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl border border-[#E5E2D6] bg-[#FAFAF5] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="flex items-center gap-3 border-b border-[#E5E2D6] bg-white px-5 py-4">
          <Search className="h-5 w-5 shrink-0 text-[#087A55]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'ur'
                ? 'قرآن، حدیث، اسلامی واقعات، دعائیں یا موضوع تلاش کریں...'
                : 'Search Quran teachings, Sahih Hadith, stories, Waqiat, or Duas...'
            }
            className={`w-full bg-transparent text-base text-[#202820] placeholder-[#202820]/45 focus:outline-none ${
              language === 'ur' ? 'font-urdu-tight text-right' : ''
            }`}
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label={language === 'ur' ? 'بند کریں' : 'Close search'}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#202820]/60 transition-colors hover:bg-[#F3F1E8] hover:text-[#202820]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Category Quick Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-[#E5E2D6] bg-[#F3F1E8]/60 px-5 py-2.5">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#064E3B] text-[#FAFAF5]'
                : 'bg-white text-[#202820]/80 hover:text-[#064E3B]'
            }`}
          >
            {language === 'ur' ? 'تمام موضوعات' : 'All Topics'}
          </button>
          {CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-[#064E3B] text-[#FAFAF5]'
                  : 'bg-white text-[#202820]/80 hover:text-[#064E3B]'
              }`}
            >
              {language === 'ur' ? cat.nameUr : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {filteredArticles.length === 0 && matchingDuas.length === 0 ? (
            <div className="py-10 text-center">
              <BookOpen className="mx-auto mb-3 h-8 w-8 text-[#087A55]/50" aria-hidden="true" />
              <p className="text-sm font-medium text-[#202820]">
                {language === 'ur'
                  ? 'اس تلاش سے مطابقت رکھنے والا کوئی مضمون نہیں ملا۔'
                  : 'No articles or stories matched your search query.'}
              </p>
              <p className="mt-1 text-xs text-[#202820]/60">
                {language === 'ur'
                  ? 'کسی دوسرے لفظ مثلاً قرآن، بخاری، عمر، بلال یا رمضان سے تلاش کریں۔'
                  : 'Try keywords like Quran, Bukhari, Cave, Umar, Bilal, Ramadan, or Parents.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {matchingDuas.map((dua) => (
                <button
                  key={dua.id}
                  type="button"
                  onClick={() => navigate('/duas')}
                  className="flex w-full items-start justify-between gap-4 rounded-xl border border-[#E5E2D6] bg-white p-4 text-left transition-colors hover:border-[#087A55]"
                >
                  <div className={language === 'ur' ? 'text-right w-full' : ''}>
                    <div className="text-xs text-[#087A55]">
                      {language === 'ur' ? `دعائیں اور اذکار · ${dua.occasionUr}` : `Duas & Azkar · ${dua.occasionEn}`}
                    </div>
                    <h4 className={`mt-1 font-semibold text-[#202820] ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
                      {language === 'ur' ? dua.titleUr : dua.titleEn}
                    </h4>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#087A55]" aria-hidden="true" />
                </button>
              ))}

              {filteredArticles.map((article) => {
                const cat = getCategoryBySlug(article.category);
                return (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => navigate(`/article/${article.slug}`)}
                    className="flex w-full items-start justify-between gap-4 rounded-xl border border-[#E5E2D6] bg-white p-4 text-left transition-colors hover:border-[#087A55]"
                  >
                    <div className={`min-w-0 flex-1 ${language === 'ur' ? 'text-right' : ''}`}>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#202820]/60">
                        <span className="font-medium text-[#087A55]">
                          {language === 'ur' ? cat?.nameUr : cat?.nameEn}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">
                          {language === 'ur'
                            ? `${article.readTimeMinutes} منٹ مطالعہ`
                            : `${article.readTimeMinutes} min read`}
                        </span>
                      </div>
                      <h4 className={`mt-1 font-semibold text-[#202820] ${language === 'ur' ? 'font-urdu-tight text-base' : 'text-sm sm:text-base'}`}>
                        {language === 'ur' ? article.titleUr : article.titleEn}
                      </h4>
                      <p className={`mt-1 line-clamp-1 text-xs text-[#202820]/70 ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
                        {language === 'ur' ? article.excerptUr : article.excerptEn}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#087A55]" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
