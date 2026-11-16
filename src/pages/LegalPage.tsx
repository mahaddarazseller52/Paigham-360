import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';

type LegalType = 'privacy' | 'disclaimer' | 'terms';

const LEGAL_CONTENT: Record<
  LegalType,
  {
    path: string;
    titleEn: string;
    titleUr: string;
    sections: Array<{ headingEn: string; headingUr: string; bodyEn: string; bodyUr: string }>;
  }
> = {
  privacy: {
    path: '/privacy-policy',
    titleEn: 'Privacy Policy',
    titleUr: 'رازداری کی پالیسی',
    sections: [
      {
        headingEn: 'Information We Collect',
        headingUr: 'معلومات کا تحفظ',
        bodyEn:
          'Paigham360 respects your privacy. Reading articles, daily Ayat, Hadith, or Duas requires no registration. Language preferences and saved bookmarks are stored locally in your browser. If you voluntarily subscribe to our newsletter or submit the contact form, your email and message are used solely to respond to you or send requested educational updates.',
        bodyUr:
          'پیغام 360 آپ کی رازداری کا مکمل احترام کرتا ہے۔ مضامین، آیات اور احادیث کے مطالعے کے لیے کسی اکاؤنٹ کی ضرورت نہیں۔ زبان کی ترجیح اور محفوظ کردہ مضامین آپ کے براؤزر میں محفوظ رہتے ہیں۔ نیوز لیٹر یا رابطہ فارم کے ذریعے دیا گیا ای میل صرف تعلیمی پیغامات یا آپ کے سوال کے جواب کے لیے استعمال کیا جاتا ہے۔',
      },
      {
        headingEn: 'Third-Party Sharing & Security',
        headingUr: 'معلومات کی رازداری',
        bodyEn:
          'We never sell, rent, or trade visitor emails or inquiries with advertisers or third-party data brokers.',
        bodyUr:
          'ہم قارئین کے ای میل پتے یا ذاتی پیغامات کسی تیسرے فریق یا اشتہاری ادارے کو ہرگز فراہم نہیں کرتے۔',
      },
    ],
  },
  disclaimer: {
    path: '/disclaimer',
    titleEn: 'Scholarly Disclaimer',
    titleUr: 'تحقیقی و علمی وضاحت',
    sections: [
      {
        headingEn: 'Educational Purpose & Fatwa Distinction',
        headingUr: 'تعلیمی مقصد اور فتویٰ سے فرق',
        bodyEn:
          'Paigham360 provides authentic Islamic educational content—Quranic translations, Sahih Hadith, historical Waqiat, and moral stories—for general learning and spiritual reflection. Content on this platform is not a substitute for personalized legal rulings (Fatwa) from qualified Islamic scholars regarding specific personal, marital, or financial cases.',
        bodyUr:
          'پیغام 360 پر شائع ہونے والا مواد عمومی دینی تعلیم، قرآنی فہم، مستند احادیث اور اخلاقی تربیت کے لیے پیش کیا جاتا ہے۔ مخصوص ذاتی، عائلی یا مالی مسائل کے شرعی حکم (فتویٰ) کے لیے مستند علمائے کرام و مفتیانِ کرام سے براہِ راست رجوع کیجیے۔',
      },
      {
        headingEn: 'Source Transparency',
        headingUr: 'حوالہ جات کی شفافیت',
        bodyEn:
          'Every Quranic verse and Hadith cites its Surah/Ayah or primary compilation and grading. Historical Waqiat outside canonical Hadith collections are explicitly labeled as classical historical narratives.',
        bodyUr:
          'ہر قرآنی آیت اور حدیث کے ساتھ مکمل حوالہ درج کیا جاتا ہے، جبکہ کتبِ تاریخ سے منقول واقعات کی تاریخی حیثیت کو احادیثِ مبارکہ سے الگ واضح کر دیا جاتا ہے۔',
      },
    ],
  },
  terms: {
    path: '/terms',
    titleEn: 'Terms & Conditions',
    titleUr: 'شرائط و ضوابط',
    sections: [
      {
        headingEn: 'Acceptable Educational Use',
        headingUr: 'تعلیمی و غیر تجارتی استعمال',
        bodyEn:
          'Visitors are welcome to read, share links, and distribute beneficial knowledge from Paigham360 for non-commercial educational and da‘wah purposes while preserving accurate citations and attribution.',
        bodyUr:
          'قارئین پیغام 360 کے مضامین اور پیغامات کو غیر تجارتی دینی و تعلیمی مقاصد کے لیے مستند حوالوں کے ساتھ شیئر کر سکتے ہیں۔',
      },
      {
        headingEn: 'Content Updates & Accuracy',
        headingUr: 'تصحیح اور بہتری',
        bodyEn:
          'Our editorial team continuously reviews translations and references for clarity and precision. If you notice any typographical error, please reach out via our Contact page.',
        bodyUr:
          'ادارتی ٹیم تراجم اور حوالہ جات کی صحت کا مسلسل جائزہ لیتی رہتی ہے۔ کسی بھی کتابت کی غلطی کی نشاندہی کے لیے رابطہ صفحہ استعمال کیجیے۔',
      },
    ],
  },
};

export function LegalPage({ type }: { type: LegalType }) {
  const { language, updateSeo } = useApp();
  const doc = LEGAL_CONTENT[type];

  useEffect(() => {
    updateSeo({
      title: `${doc.titleEn} | Paigham360`,
      description: `${doc.titleEn} for Paigham360 – The Message of Islam.`,
      path: doc.path,
    });
  }, [doc, updateSeo]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ labelEn: doc.titleEn, labelUr: doc.titleUr }]} />

      <div className="rounded-2xl border border-[#E5E2D6] bg-white p-8 sm:p-10">
        <h1
          className={`text-[#064E3B] ${
            language === 'ur'
              ? 'font-urdu text-3xl font-bold text-right'
              : 'font-display text-4xl font-semibold'
          }`}
        >
          {language === 'ur' ? doc.titleUr : doc.titleEn}
        </h1>
        <p className="mt-2 text-xs text-[#202820]/55">Effective Year: 2026 · Paigham360</p>

        <div className="mt-8 space-y-8 border-t border-[#E5E2D6] pt-8">
          {doc.sections.map((sec, idx) => (
            <section key={idx} className={language === 'ur' ? 'text-right' : ''}>
              <h2
                className={`text-[#064E3B] ${
                  language === 'ur' ? 'font-urdu text-xl font-bold' : 'font-display text-2xl font-semibold'
                }`}
              >
                {language === 'ur' ? sec.headingUr : sec.headingEn}
              </h2>
              <p
                className={`mt-2.5 text-base leading-relaxed text-[#202820]/80 ${
                  language === 'ur' ? 'font-urdu-tight' : ''
                }`}
              >
                {language === 'ur' ? sec.bodyUr : sec.bodyEn}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
