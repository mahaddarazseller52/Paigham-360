import { useEffect } from 'react';
import { BarChart3, Database, SearchCheck, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';

export function SetupGuidePage() {
  const { language, updateSeo } = useApp();

  useEffect(() => {
    updateSeo({
      title: 'SEO, Analytics & CMS Setup Guide | Paigham360',
      description:
        'Step-by-step instructions to connect Google Search Console, Google Analytics 4, and an external headless CMS or database to Paigham360.',
      path: '/setup-guide',
    });
  }, [updateSeo]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ labelEn: 'SEO, Analytics & CMS Setup Guide', labelUr: 'SEO اور CMS گائیڈ' }]} />

      <div className="islamic-lattice-dark rounded-2xl p-8 text-[#FAFAF5] sm:p-10">
        <p className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
          Publishing &amp; Technical Operations
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold sm:text-4xl">
          {language === 'ur'
            ? 'گوگل سرچ کنسول، اینالیٹکس اور CMS کنکشن گائیڈ'
            : 'Google Search Console, Analytics & CMS Setup Instructions'}
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-[#FAFAF5]/85">
          Paigham360 ships with live Express routes for <code className="text-[#D4AF37]">/sitemap.xml</code>,{' '}
          <code className="text-[#D4AF37]">/robots.txt</code>, Schema.org JSON-LD, and persistent form endpoints. Follow these steps when publishing to your custom domain.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-[#E5E2D6] bg-white p-6 sm:p-7">
          <div className="flex items-center gap-2 text-[#064E3B]">
            <SearchCheck className="h-5 w-5 text-[#087A55]" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold">1. Google Search Console Setup</h2>
          </div>
          <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-[#202820]/80">
            <li>Open Google Search Console and add your live domain as a Property.</li>
            <li>Verify ownership via DNS TXT record or add the Google verification meta tag inside <code className="bg-[#F3F1E8] px-1.5 py-0.5 rounded text-xs">index.html</code>.</li>
            <li>Set <code className="bg-[#F3F1E8] px-1.5 py-0.5 rounded text-xs">APP_URL</code> in your environment variables to your production HTTPS domain so canonical tags and sitemap links resolve accurately.</li>
            <li>Submit <code className="bg-[#F3F1E8] px-1.5 py-0.5 rounded text-xs">https://yourdomain.com/sitemap.xml</code> in the Sitemaps panel and inspect <code className="bg-[#F3F1E8] px-1.5 py-0.5 rounded text-xs">/robots.txt</code>.</li>
          </ol>
        </section>

        <section className="rounded-2xl border border-[#E5E2D6] bg-white p-6 sm:p-7">
          <div className="flex items-center gap-2 text-[#064E3B]">
            <BarChart3 className="h-5 w-5 text-[#087A55]" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold">2. Google Analytics 4 (GA4)</h2>
          </div>
          <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-[#202820]/80">
            <li>Create a GA4 Web Data Stream in Google Analytics and copy your Measurement ID (e.g., <code className="bg-[#F3F1E8] px-1.5 py-0.5 rounded text-xs">G-XXXXXXXXXX</code>).</li>
            <li>Paste the Google tag (<code className="bg-[#F3F1E8] px-1.5 py-0.5 rounded text-xs">gtag.js</code>) snippet inside <code className="bg-[#F3F1E8] px-1.5 py-0.5 rounded text-xs">index.html</code> right inside the <code className="bg-[#F3F1E8] px-1.5 py-0.5 rounded text-xs">&lt;head&gt;</code> element.</li>
            <li>Because Paigham360 uses clean History API routing (<code className="bg-[#F3F1E8] px-1.5 py-0.5 rounded text-xs">pushState</code>), GA4 Enhanced Measurement automatically records every article and category page view.</li>
          </ol>
        </section>

        <section className="rounded-2xl border border-[#E5E2D6] bg-white p-6 sm:p-7">
          <div className="flex items-center gap-2 text-[#064E3B]">
            <Database className="h-5 w-5 text-[#087A55]" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold">3. Connecting a Headless CMS</h2>
          </div>
          <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-[#202820]/80">
            <li>Paigham360 exposes <code className="bg-[#F3F1E8] px-1.5 py-0.5 rounded text-xs">GET /api/articles</code> from the Express server for clean content separation.</li>
            <li>To manage articles externally via Sanity, Strapi, or Contentful, store your CMS API token in server environment variables and fetch articles inside <code className="bg-[#F3F1E8] px-1.5 py-0.5 rounded text-xs">server.ts</code> before serving <code className="bg-[#F3F1E8] px-1.5 py-0.5 rounded text-xs">/api/articles</code> and <code className="bg-[#F3F1E8] px-1.5 py-0.5 rounded text-xs">/sitemap.xml</code>.</li>
            <li>Keep scholarly verification fields (Surah/Ayah, Hadith grading, and authenticity notes) required in your CMS schema before publishing.</li>
          </ol>
        </section>

        <section className="rounded-2xl border border-[#E5E2D6] bg-white p-6 sm:p-7">
          <div className="flex items-center gap-2 text-[#064E3B]">
            <ShieldCheck className="h-5 w-5 text-[#087A55]" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold">4. Editorial Verification Workflow</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#202820]/80">
            All sample articles included in this release are labeled for editorial review. Before publishing new bilingual content, scholars and editors should verify Arabic diacritics, Surah and Ayah numbering, Hadith authenticity grading (<em>Sahih</em>, <em>Hasan</em>, etc.), and Urdu Nastaliq phrasing.
          </p>
        </section>
      </div>
    </div>
  );
}
