import React, { useEffect, useMemo, useState } from 'react';
import { Mail, MapPin, Send, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';

export function ContactPage() {
  const { language, updateSeo } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [challengeSeed, setChallengeSeed] = useState(0);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const challenge = useMemo(() => {
    const a = ((challengeSeed + 3) % 6) + 2;
    const b = ((challengeSeed + 5) % 5) + 3;
    return { a, b, expected: a + b };
  }, [challengeSeed]);

  useEffect(() => {
    updateSeo({
      title: 'Contact Us – رابطہ کریں | Paigham360',
      description:
        'Reach the Paigham360 editorial team for topic suggestions, source feedback, bilingual collaborations, or community questions.',
      path: '/contact',
    });
  }, [updateSeo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          website: honeypot,
          captchaExpected: challenge.expected,
          captchaAnswer: Number(captchaAnswer),
        }),
      });
      const data = (await res.json()) as { ok: boolean; messageEn?: string; messageUr?: string };
      if (res.ok && data.ok) {
        setStatus('success');
        setFeedback(language === 'ur' ? (data.messageUr || '') : (data.messageEn || ''));
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setCaptchaAnswer('');
        setChallengeSeed((s) => s + 1);
      } else {
        setStatus('error');
        setFeedback(language === 'ur' ? (data.messageUr || '') : (data.messageEn || 'Submission failed.'));
      }
    } catch {
      setStatus('error');
      setFeedback(
        language === 'ur'
          ? 'پیغام بھیجنے میں دشواری پیش آئی، دوبارہ کوشش کریں۔'
          : 'Unable to send your message right now. Please try again.'
      );
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ labelEn: 'Contact Us', labelUr: 'رابطہ کریں' }]} />

      <div className="grid gap-10 lg:grid-cols-12">
        <div className={`lg:col-span-5 ${language === 'ur' ? 'text-right' : ''}`}>
          <p className="text-xs font-semibold tracking-widest text-[#087A55] uppercase">
            {language === 'ur' ? 'رابطہ و تجاویز' : 'Get in Touch'}
          </p>
          <h1
            className={`mt-2 text-[#064E3B] ${
              language === 'ur'
                ? 'font-urdu text-3xl font-bold'
                : 'font-display text-4xl font-semibold'
            }`}
          >
            {language === 'ur' ? 'پیغام 360 سے رابطہ کریں' : 'Contact Paigham360'}
          </h1>
          <p className={`mt-3 text-sm leading-relaxed text-[#202820]/75 ${language === 'ur' ? 'font-urdu-tight' : ''}`}>
            {language === 'ur'
              ? 'نئے موضوعات کی تجویز، حوالہ جات کی تصدیق یا کسی بھی تعلیمی سوال کے لیے ہمیں پیغام ارسال کیجیے۔'
              : 'Share article topic requests, scholarly feedback, Urdu/English translation suggestions, or general inquiries with our editorial team.'}
          </p>

          <div className="mt-8 space-y-4 rounded-2xl border border-[#E5E2D6] bg-white p-6">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-[#087A55]" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold text-[#064E3B]">
                  {language === 'ur' ? 'ادارتی ای میل' : 'Editorial Email'}
                </p>
                <p className="text-sm text-[#202820]/80">editorial@paigham360.org</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-[#087A55]" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold text-[#064E3B]">
                  {language === 'ur' ? 'عالمی آن لائن پلیٹ فارم' : 'Global Digital Platform'}
                </p>
                <p className="text-sm text-[#202820]/80">
                  {language === 'ur'
                    ? 'اردو اور انگریزی قارئین کی خدمت'
                    : 'Serving Urdu & English readers worldwide'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-t border-[#E5E2D6] pt-4">
              <Shield className="mt-0.5 h-5 w-5 text-[#087A55]" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold text-[#064E3B]">
                  {language === 'ur' ? 'محفوظ و اسپام سے پاک رابطہ' : 'Protected Submission'}
                </p>
                <p className="text-xs text-[#202820]/70">
                  {language === 'ur'
                    ? 'تمام پیغامات سرور پر محفوظ اور اسپام تحفظ کے ساتھ موصول ہوتے ہیں۔'
                    : 'Submissions are validated, rate-limited, and verified on our Express backend.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-[#E5E2D6] bg-white p-6 sm:p-8"
          >
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-[#064E3B]">
                  {language === 'ur' ? 'مکمل نام' : 'Full Name'}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  minLength={2}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-lg border border-[#E5E2D6] bg-[#FAFAF5] px-3.5 text-sm text-[#202820] focus:border-[#087A55] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-[#064E3B]">
                  {language === 'ur' ? 'ای میل پتہ' : 'Email Address'}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-lg border border-[#E5E2D6] bg-[#FAFAF5] px-3.5 text-sm text-[#202820] focus:border-[#087A55] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#064E3B]">
                {language === 'ur' ? 'موضوع' : 'Subject'}
              </label>
              <input
                id="contact-subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={language === 'ur' ? 'مثلاً نیا مضمون یا تجویز' : 'Topic request, feedback, or inquiry'}
                className="mt-1.5 h-11 w-full rounded-lg border border-[#E5E2D6] bg-[#FAFAF5] px-3.5 text-sm text-[#202820] focus:border-[#087A55] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-[#064E3B]">
                {language === 'ur' ? 'پیغام' : 'Message'}
              </label>
              <textarea
                id="contact-message"
                rows={5}
                required
                minLength={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#E5E2D6] bg-[#FAFAF5] p-3.5 text-sm text-[#202820] focus:border-[#087A55] focus:outline-none"
              />
            </div>

            {/* Human verification anti-spam challenge */}
            <div>
              <label htmlFor="contact-captcha" className="block text-xs font-semibold text-[#064E3B]">
                {language === 'ur'
                  ? `سیکیورٹی سوال: ${challenge.a} + ${challenge.b} کتنا ہوتا ہے؟`
                  : `Spam Protection Check: What is ${challenge.a} + ${challenge.b}?`}
              </label>
              <input
                id="contact-captcha"
                type="number"
                required
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder={language === 'ur' ? 'جواب درج کریں' : 'Enter total'}
                className="mt-1.5 h-11 w-40 rounded-lg border border-[#E5E2D6] bg-[#FAFAF5] px-3.5 text-sm text-[#202820] tabular-nums focus:border-[#087A55] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#064E3B] px-6 text-sm font-semibold text-[#FAFAF5] transition-colors hover:bg-[#087A55] disabled:opacity-60"
            >
              <Send className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
              <span>
                {status === 'submitting'
                  ? language === 'ur'
                    ? 'ارسال ہو رہا ہے...'
                    : 'Sending...'
                  : language === 'ur'
                    ? 'پیغام بھیجیں'
                    : 'Send Message'}
              </span>
            </button>

            {feedback && (
              <p
                role="status"
                className={`rounded-lg border p-3 text-xs font-medium ${
                  status === 'error'
                    ? 'border-red-200 bg-red-50 text-red-800'
                    : 'border-[#087A55]/30 bg-[#087A55]/10 text-[#064E3B]'
                }`}
              >
                {feedback}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
