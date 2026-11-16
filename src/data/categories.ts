import type { CategoryInfo } from '../types/content';

export const IMAGES = {
  heroMosque: '/src/assets/images/hero_mosque_emerald_1794838467907.jpg',
  quranStudy: '/src/assets/images/quran_manuscript_study_1794838468601.jpg',
  lanternRamadan: '/src/assets/images/islamic_lantern_ramadan_1794838468288.jpg',
  madinahCourtyard: '/src/assets/images/madinah_courtyard_heritage_1794838469958.jpg',
  libraryDesk: '/src/assets/images/calligraphy_library_desk_1794838470344.jpg',
} as const;

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'holy-quran',
    nameEn: 'Quran',
    nameUr: 'قرآن مجید',
    descriptionEn: 'Authentic Quranic teachings, thematic reflections, Surah overviews, and Urdu & English translations.',
    descriptionUr: 'قرآن مجید کی مستند تعلیمات، سورتوں کا تعارف، اور اردو و انگریزی تراجم کے ساتھ تدبر۔',
    image: IMAGES.quranStudy,
  },
  {
    slug: 'sahih-hadith',
    nameEn: 'Hadith',
    nameUr: 'احادیث مبارکہ',
    descriptionEn: 'Verified Prophetic traditions from Sahih al-Bukhari, Sahih Muslim, and major Sunan collections.',
    descriptionUr: 'صحیح بخاری، صحیح مسلم اور مستند کتبِ حدیث سے منتخب احادیث مبارکہ مع تخریج۔',
    image: IMAGES.libraryDesk,
  },
  {
    slug: 'islamic-stories',
    nameEn: 'Islamic Stories',
    nameUr: 'اسلامی کہانیاں',
    descriptionEn: 'Inspiring true narratives rooted in Quran and authentic Sunnah for reflection across all ages.',
    descriptionUr: 'قرآن و سنت سے ماخوذ سچے اور روح پرور اسلامی واقعات و کہانیاں۔',
    image: IMAGES.madinahCourtyard,
  },
  {
    slug: 'islamic-waqiat',
    nameEn: 'Islamic Waqiat',
    nameUr: 'سبق آموز واقعات',
    descriptionEn: 'Thought-provoking classical events of wisdom, justice, and character with transparent sourcing.',
    descriptionUr: 'عدل، حکمت اور اخلاق کے سبق آموز واقعات مستند تاریخی حوالوں کے ساتھ۔',
    image: IMAGES.lanternRamadan,
  },
  {
    slug: 'stories-of-prophets',
    nameEn: 'Stories of Prophets',
    nameUr: 'انبیاء کرام کے واقعات',
    descriptionEn: 'Lives, trials, and steadfast faith of the Prophets (AS) as narrated in the Noble Quran.',
    descriptionUr: 'قرآن مجید میں بیان کردہ انبیاء کرام علیہم السلام کے ایمان افروز حالات و واقعات۔',
    image: IMAGES.madinahCourtyard,
  },
  {
    slug: 'stories-of-sahaba',
    nameEn: 'Stories of Sahaba',
    nameUr: 'صحابہ کرام کے واقعات',
    descriptionEn: 'Courage, sincerity, and devotion of the Companions (RA) who carried the message of Islam.',
    descriptionUr: 'نبی کریم ﷺ کے جاں نثار صحابہ کرام رضی اللہ عنہم کی سیرت اور قربانیاں۔',
    image: IMAGES.heroMosque,
  },
  {
    slug: 'islamic-history',
    nameEn: 'Islamic History',
    nameUr: 'اسلامی تاریخ',
    descriptionEn: 'Centuries of scholarship, institutions, civilization, and spiritual heritage in the Muslim world.',
    descriptionUr: 'عالمِ اسلام کی علمی و تہذیبی تاریخ، جامعات اور روشن ابواب کا مستند تذکرہ۔',
    image: IMAGES.libraryDesk,
  },
  {
    slug: 'duas-azkar',
    nameEn: 'Duas & Azkar',
    nameUr: 'دعائیں اور اذکار',
    descriptionEn: 'Masnoon supplications from the Quran and Sunnah for morning, evening, and daily life.',
    descriptionUr: 'صبح و شام اور روزمرہ زندگی کی مسنون دعائیں اور اذکار مع عربی متن و ترجمہ۔',
    image: IMAGES.lanternRamadan,
  },
  {
    slug: 'islamic-knowledge',
    nameEn: 'Islamic Knowledge',
    nameUr: 'اسلامی معلومات',
    descriptionEn: 'Essential foundations of faith, worship, pillars of Islam, and clear answers for learners.',
    descriptionUr: 'ارکانِ اسلام، عقائد اور بنیادی دینی معلومات کا آسان اور مستند خلاصہ۔',
    image: IMAGES.quranStudy,
  },
  {
    slug: 'islamic-stories-for-kids',
    nameEn: 'Islamic Stories for Kids',
    nameUr: 'بچوں کی کہانیاں',
    descriptionEn: 'Gentle, authentic stories teaching children mercy, honesty, gratitude, and love for Allah.',
    descriptionUr: 'بچوں کے لیے رحمدلی، سچائی اور حسنِ اخلاق سکھانے والی دلچسپ اسلامی کہانیاں۔',
    image: IMAGES.madinahCourtyard,
  },
  {
    slug: 'islamic-manners',
    nameEn: 'Islamic Manners',
    nameUr: 'اسلامی اخلاق و آداب',
    descriptionEn: 'Prophetic guidance on kindness to parents, truthfulness, humility, and community harmony.',
    descriptionUr: 'والدین کا احترام، سچائی، تواضع اور معاشرتی آداب پر نبوی رہنمائی۔',
    image: IMAGES.libraryDesk,
  },
  {
    slug: 'ramadan-special-days',
    nameEn: 'Ramadan & Islamic Events',
    nameUr: 'رمضان اور اسلامی ایام',
    descriptionEn: 'Spiritual preparation for Ramadan, Laylatul Qadr, Dhul Hijjah, and blessed Islamic occasions.',
    descriptionUr: 'ماہِ رمضان، شبِ قدر، ذوالحجہ اور دیگر بابرکت اسلامی ایام کی فضیلت اور اعمال۔',
    image: IMAGES.lanternRamadan,
  },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
