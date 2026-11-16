import { ArrowRight, Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getCategoryBySlug } from '../data/categories';
import type { ArticleItem } from '../types/content';
import { ResilientImage } from './ResilientImage';

interface ArticleCardProps {
  article: ArticleItem;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const { language, navigate, isBookmarked, toggleBookmark } = useApp();
  const category = getCategoryBySlug(article.category);
  const saved = isBookmarked(article.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E2D6] bg-white transition-shadow duration-200 hover:shadow-md">
      <a
        href={`/article/${article.slug}`}
        onClick={(e) => {
          e.preventDefault();
          navigate(`/article/${article.slug}`);
        }}
        className="block overflow-hidden"
      >
        <ResilientImage
          src={article.image}
          alt={language === 'ur' ? article.imageAltUr : article.imageAltEn}
          aspectClass={featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}
          caption={language === 'ur' ? article.titleUr : article.titleEn}
        />
      </a>

      <div className={`flex flex-1 flex-col justify-between p-6 ${language === 'ur' ? 'text-right' : ''}`}>
        <div>
          {/* Clean unboxed metadata with typographic separators */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#202820]/65">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#087A55]">
                {language === 'ur' ? category?.nameUr : category?.nameEn}
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {language === 'ur'
                  ? `${article.readTimeMinutes} منٹ مطالعہ`
                  : `${article.readTimeMinutes} min read`}
              </span>
              {article.isStory && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{language === 'ur' ? 'کہانی / واقعہ' : 'Story'}</span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => toggleBookmark(article.id)}
              aria-label={saved ? 'Remove bookmark' : 'Bookmark article'}
              className={`rounded-md p-1.5 transition-colors ${
                saved
                  ? 'text-[#D4AF37]'
                  : 'text-[#202820]/40 hover:text-[#064E3B]'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
            </button>
          </div>

          <h3
            className={`mt-3 text-[#202820] transition-colors group-hover:text-[#064E3B] ${
              language === 'ur'
                ? 'font-urdu text-lg font-bold'
                : `font-display font-semibold tracking-tight ${featured ? 'text-2xl' : 'text-xl'}`
            }`}
          >
            <a
              href={`/article/${article.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/article/${article.slug}`);
              }}
            >
              {language === 'ur' ? article.titleUr : article.titleEn}
            </a>
          </h3>

          <p
            className={`mt-2.5 line-clamp-3 text-sm leading-relaxed text-[#202820]/75 ${
              language === 'ur' ? 'font-urdu-tight' : ''
            }`}
          >
            {language === 'ur' ? article.excerptUr : article.excerptEn}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#E5E2D6] pt-4 text-xs">
          <span className="truncate text-[#202820]/55">
            {language === 'ur' ? article.hadithReference.sourceUr : article.hadithReference.sourceEn}
          </span>
          <a
            href={`/article/${article.slug}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/article/${article.slug}`);
            }}
            className="inline-flex items-center gap-1.5 font-semibold text-[#064E3B] hover:text-[#087A55] whitespace-nowrap shrink-0"
          >
            <span>{language === 'ur' ? 'مکمل پڑھیں' : 'Read More'}</span>
            <ArrowRight className={`h-3.5 w-3.5 ${language === 'ur' ? 'rotate-180' : ''}`} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
