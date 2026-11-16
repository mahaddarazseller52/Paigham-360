export type Language = 'en' | 'ur';

export type CategorySlug =
  | 'holy-quran'
  | 'sahih-hadith'
  | 'islamic-stories'
  | 'islamic-waqiat'
  | 'stories-of-prophets'
  | 'stories-of-sahaba'
  | 'islamic-history'
  | 'duas-azkar'
  | 'islamic-knowledge'
  | 'islamic-stories-for-kids'
  | 'islamic-manners'
  | 'ramadan-special-days';

export interface CategoryInfo {
  slug: CategorySlug;
  nameEn: string;
  nameUr: string;
  descriptionEn: string;
  descriptionUr: string;
  image: string;
}

export type DailyItemType = 'ayat' | 'hadith' | 'reminder' | 'dua' | 'quote';

export interface DailyContentItem {
  id: string;
  type: DailyItemType;
  labelEn: string;
  labelUr: string;
  arabic?: string;
  transliteration?: string;
  english: string;
  urdu: string;
  referenceEn: string;
  referenceUr: string;
  authenticityEn: string;
  authenticityUr: string;
  reflectionEn: string;
  reflectionUr: string;
}

export interface ArticleSection {
  headingEn: string;
  headingUr: string;
  bodyEn: string;
  bodyUr: string;
}

export interface StoryCharacter {
  nameEn: string;
  nameUr: string;
  roleEn: string;
  roleUr: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  category: CategorySlug;
  isStory: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  isEditorsPick?: boolean;
  isRecommended?: boolean;
  authorEn: string;
  authorUr: string;
  editorialStatusEn: string;
  editorialStatusUr: string;
  publishedAt: string;
  readTimeMinutes: number;
  image: string;
  imageAltEn: string;
  imageAltUr: string;
  titleEn: string;
  titleUr: string;
  excerptEn: string;
  excerptUr: string;
  introEn: string;
  introUr: string;
  characters?: StoryCharacter[];
  sections: ArticleSection[];
  quranReference: {
    arabic: string;
    translationEn: string;
    translationUr: string;
    surahRefEn: string;
    surahRefUr: string;
  };
  hadithReference: {
    arabic?: string;
    textEn: string;
    textUr: string;
    sourceEn: string;
    sourceUr: string;
    gradeEn: string;
    gradeUr: string;
  };
  authenticityNoteEn: string;
  authenticityNoteUr: string;
  lessonEn: string;
  lessonUr: string;
  conclusionEn: string;
  conclusionUr: string;
  relatedSlugs: string[];
}

export interface SurahSummary {
  number: number;
  nameArabic: string;
  nameEn: string;
  nameUr: string;
  meaningEn: string;
  meaningUr: string;
  revelationEn: 'Makki' | 'Madani';
  revelationUr: string;
  versesCount: number;
  featuredAyahArabic: string;
  featuredAyahEn: string;
  featuredAyahUr: string;
  featuredAyahNumber: number;
}

export interface DuaItem {
  id: string;
  occasionEn: string;
  occasionUr: string;
  titleEn: string;
  titleUr: string;
  arabic: string;
  transliteration: string;
  translationEn: string;
  translationUr: string;
  sourceEn: string;
  sourceUr: string;
}
