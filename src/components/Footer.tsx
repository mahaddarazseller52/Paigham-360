import React, { useState } from 'react';
import { Mail, Send, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';

export function Footer() {
  const { language, navigate } = useApp();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language, consent, website: honeypot }),
      });
      const data = (await res.json()) as { ok: boolean; messageEn?: string; messageUr?: string };
      if (res.ok && data.ok) {
        setStatus('success');
        setFeedback(language === 'ur' ? (data.messageUr || '') : (data.messageEn || ''));
        setEmail('');
        setConsent(false);
      } else {
        setStatus('error');
        setFeedback(language === 'ur' ? (data.messageUr || '') : (data.messageEn || 'Subscription failed.'));
      }
    } catch {
      setStatus('error');
      setFeedback(
        language === 'ur'
          ? 'نیٹ ورک خرابی کے باعث درخواست مکمل نہ ہو سکی۔'
          : 'Unable to connect right now. Please try again.'
      );
    }
  };

  return (
    <footer className="islamic-lattice-dark border-t-2 border-[#D4AF37]/50 text-[#FAFAF5]">
      {/* Newsletter Subscription Banner */}
      <div className="border-b border-[#D4AF37]/25 bg-[#053e2f]/90">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-xl">
            <h3
              className={
                language === 'ur'
                  ? 'font-urdu text-xl font-bold text-[#D4AF37]'
                  : 'font-display text-2xl sm:text-3xl font-semibold text-[#FAFAF5]'
              }
            >
              {language === 'ur'
                ? 'ہفتہ وار قرآنی پیغامات اور سبق آموز واقعات حاصل کریں'
                : 'Subscribe for Weekly Quranic Reflections & Islamic Stories'}
            </h3>
            <p className="mt-1.5 text-sm text-[#FAFAF5]/80">
              {language === 'ur'
                ? 'قرآن و سنت کی روشنی میں مستند مضامین براہِ راست اپنے ای میل پر پائیے۔'
                : 'Authentic reminders, Sahih Hadith insights, and inspiring stories delivered respectfully to your inbox.'}
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md space-y-2.5">
            {/* Hidden spam honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                {language === 'ur' ? 'ای میل پتہ' : 'Email address'}
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'ur' ? 'اپنا ای میل درج کریں' : 'Enter your email address'}
                className="h-11 flex-1 rounded-lg border border-[#D4AF37]/40 bg-[#FAFAF5] px-4 text-sm text-[#202820] placeholder-[#202820]/50 focus:border-[#D4AF37] focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-5 text-sm font-semibold text-[#202820] transition-colors hover:bg-[#e5c252] disabled:opacity-60 whitespace-nowrap shrink-0"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>{language === 'ur' ? 'سبسکرائب کریں' : 'Subscribe'}</span>
              </button>
            </div>

            <label className="flex items-start gap-2 text-xs text-[#FAFAF5]/80 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 h-3.5 w-3.5 rounded border-[#D4AF37] accent-[#D4AF37]"
              />
              <span className={language === 'ur' ? 'font-urdu-tight' : ''}>
                {language === 'ur'
                  ? 'میں پیغام 360 سے تعلیمی ای میلز وصول کرنے اور رازداری کی پالیسی سے اتفاق کرتا ہوں۔'
                  : 'I consent to receive educational Islamic updates from Paigham360 and accept the Privacy Policy.'}
              </span>
            </label>

            {feedback && (
              <p
                role="status"
                className={`text-xs font-medium ${
                  status === 'error' ? 'text-amber-200' : 'text-[#D4AF37]'
                }`}
              >
                {feedback}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Main Dark Emerald & Gold Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo, Introduction & Contact */}
          <div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="inline-flex items-center rounded-xl border border-[#D4AF37]/40 bg-white px-3 py-1 shadow-sm"
            >
              <div className="h-10 w-36 overflow-hidden flex items-center">
                <img
                  src="/assets/aistudio/Paigham-360_92975f3e.png"
                  alt="Paigham360 – The Message of Islam"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </a>

            <p className="mt-3 text-xs font-semibold text-[#D4AF37]">
              {language === 'ur'
                ? 'اسلام کی روشنی، زندگی کی رہنمائی'
                : 'Discover Islam. Learn. Reflect. Inspire.'}
            </p>

            <p
              className={`mt-3 text-sm leading-relaxed text-[#FAFAF5]/80 ${
                language === 'ur' ? 'font-urdu-tight' : ''
              }`}
            >
              {language === 'ur'
                ? 'پیغام 360 ایک مستند بین الاقوامی اسلامی تعلیمی پلیٹ فارم ہے جو ہر عمر کے قارئین کے لیے قرآن، صحیح حدیث، اسلامی تاریخ اور سبق آموز واقعات پیش کرتا ہے۔'
                : 'Paigham360 is an international Islamic educational platform presenting authentic Quranic teachings, Sahih Hadith, Islamic heritage, and bilingual stories.'}
            </p>

            <div className="mt-5 space-y-2 text-xs text-[#FAFAF5]/85">
              <a
                href="mailto:mahad4mahaddarazseller52@gmail.com"
                className="flex items-center gap-2 hover:text-[#D4AF37]"
              >
                <Mail className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                <span>mahad4mahaddarazseller52@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
              {language === 'ur' ? 'فوری نیویگیشن' : 'Quick Navigation'}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { path: '/', en: 'Home', ur: 'ہوم' },
                { path: '/quran', en: 'Quran', ur: 'قرآن مجید' },
                { path: '/hadith', en: 'Hadith', ur: 'احادیث مبارکہ' },
                { path: '/stories', en: 'Islamic Stories', ur: 'اسلامی کہانیاں' },
                { path: '/waqiat', en: 'Islamic Waqiat', ur: 'سبق آموز واقعات' },
                { path: '/duas', en: 'Duas & Azkar', ur: 'دعائیں اور اذکار' },
                { path: '/history', en: 'Islamic History', ur: 'اسلامی تاریخ' },
                { path: '/knowledge', en: 'Islamic Knowledge', ur: 'اسلامی معلومات' },
              ].map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.path);
                    }}
                    className="text-[#FAFAF5]/80 transition-colors hover:text-[#D4AF37]"
                  >
                    {language === 'ur' ? link.ur : link.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Islamic Categories */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
              {language === 'ur' ? 'اسلامی شعبہ جات' : 'Islamic Categories'}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.slice(4, 12).map((cat) => (
                <li key={cat.slug}>
                  <a
                    href={`/category/${cat.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/category/${cat.slug}`);
                    }}
                    className="text-[#FAFAF5]/80 transition-colors hover:text-[#D4AF37]"
                  >
                    {language === 'ur' ? cat.nameUr : cat.nameEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Policies, Setup & Social */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
              {language === 'ur' ? 'ادارہ، پالیسیاں اور رابطہ' : 'Platform & Connect'}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { path: '/about', en: 'About Paigham360', ur: 'پیغام 360 کا تعارف' },
                { path: '/contact', en: 'Contact Us', ur: 'رابطہ کریں' },
                { path: '/setup-guide', en: 'SEO, Analytics & CMS Guide', ur: 'SEO اور CMS گائیڈ' },
                { path: '/privacy-policy', en: 'Privacy Policy', ur: 'رازداری کی پالیسی' },
                { path: '/disclaimer', en: 'Disclaimer', ur: 'تحقیقی وضاحت' },
                { path: '/terms', en: 'Terms & Conditions', ur: 'شرائط و ضوابط' },
              ].map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.path);
                    }}
                    className="text-[#FAFAF5]/80 transition-colors hover:text-[#D4AF37]"
                  >
                    {language === 'ur' ? link.ur : link.en}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Sharing & SEO Links */}
            <div className="mt-5 border-t border-[#D4AF37]/25 pt-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#FAFAF5]/80">
                <span className="inline-flex items-center gap-1 text-[#D4AF37]">
                  <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Share:</span>
                </span>
                <a
                  href="https://wa.me/923313935888"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#D4AF37]"
                >
                  WhatsApp (03313935888)
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#D4AF37]"
                >
                  Facebook
                </a>
                <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37]">
                  Sitemap
                </a>
                <a href="/robots.txt" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37]">
                  Robots.txt
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#D4AF37]/25 pt-6 text-xs text-[#FAFAF5]/75 sm:flex-row">
          <p>© 2026 Paigham360. All Rights Reserved.</p>
          <p className="font-urdu-tight text-sm text-[#D4AF37]">
            اسلام کی روشنی، زندگی کی رہنمائی
          </p>
        </div>
      </div>
    </footer>
  );
}
