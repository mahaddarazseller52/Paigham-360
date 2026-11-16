import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ARTICLES } from './src/data/articles.ts';
import { CATEGORIES } from './src/data/categories.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

interface NewsletterRecord {
  email: string;
  language: string;
  consent: boolean;
  subscribedAt: string;
}

interface ContactRecord {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

interface SubmissionsStore {
  newsletter: NewsletterRecord[];
  contacts: ContactRecord[];
}

const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');

function loadStore(): SubmissionsStore {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as Partial<SubmissionsStore>;
      return {
        newsletter: Array.isArray(parsed.newsletter) ? parsed.newsletter : [],
        contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
      };
    }
  } catch {
    // fallback to clean memory store
  }
  return { newsletter: [], contacts: [] };
}

function saveStore(store: SubmissionsStore): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch {
    // ignore read-only fs environments gracefully
  }
}

const store = loadStore();
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 12;
  const recent = (rateLimitMap.get(ip) || []).filter((ts) => now - ts < windowMs);
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return recent.length > maxRequests;
}

function getBaseUrl(req: Request): string {
  const configured = process.env.APP_URL;
  if (configured && configured !== 'MY_APP_URL') {
    return configured.replace(/\/$/, '');
  }
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const host = req.headers['x-forwarded-host'] || req.get('host') || `localhost:${PORT}`;
  return `${proto}://${host}`.replace(/\/$/, '');
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'paigham360', articlesCount: ARTICLES.length });
  });

  app.get('/api/articles', (_req: Request, res: Response) => {
    res.json({
      ok: true,
      categories: CATEGORIES,
      articles: ARTICLES,
    });
  });

  app.post('/api/newsletter', (req: Request, res: Response) => {
    const clientIp = req.ip || 'unknown';
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        messageEn: 'Too many requests. Please wait a moment before trying again.',
        messageUr: 'بہت زیادہ درخواستیں موصول ہوئیں، براہِ کرم چند لمحے انتظار کیجیے۔',
      });
      return;
    }

    // Honeypot spam check
    if (typeof req.body?.website === 'string' && req.body.website.trim().length > 0) {
      res.status(400).json({ ok: false, messageEn: 'Invalid submission.', messageUr: 'درخواست مسترد کر دی گئی۔' });
      return;
    }

    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const language = req.body?.language === 'ur' ? 'ur' : 'en';
    const consent = Boolean(req.body?.consent);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        ok: false,
        messageEn: 'Please enter a valid email address.',
        messageUr: 'براہِ کرم درست ای میل پتہ درج کیجیے۔',
      });
      return;
    }

    if (!consent) {
      res.status(400).json({
        ok: false,
        messageEn: 'Please tick the email consent checkbox before subscribing.',
        messageUr: 'سبسکرائب کرنے سے پہلے ای میل رضامندی کا خانہ منتخب کیجیے۔',
      });
      return;
    }

    const alreadySubscribed = store.newsletter.some((item) => item.email === email);
    if (!alreadySubscribed) {
      store.newsletter.push({
        email,
        language,
        consent: true,
        subscribedAt: new Date().toISOString(),
      });
      saveStore(store);
    }

    res.json({
      ok: true,
      alreadySubscribed,
      messageEn: alreadySubscribed
        ? 'This email is already subscribed to Paigham360 weekly reflections.'
        : 'Thank you for subscribing to Paigham360. May Allah bless your pursuit of knowledge.',
      messageUr: alreadySubscribed
        ? 'یہ ای میل پہلے سے پیغام 360 کے ہفتہ وار پیغامات کے لیے رجسٹرڈ ہے۔'
        : 'پیغام 360 کو سبسکرائب کرنے کا شکریہ۔ اللہ آپ کے علم میں برکت عطا فرمائے۔',
    });
  });

  app.post('/api/contact', (req: Request, res: Response) => {
    const clientIp = req.ip || 'unknown';
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        messageEn: 'Too many submissions. Please wait a minute and try again.',
        messageUr: 'براہِ کرم ایک منٹ انتظار کر کے دوبارہ کوشش کیجیے۔',
      });
      return;
    }

    // Honeypot spam check
    if (typeof req.body?.website === 'string' && req.body.website.trim().length > 0) {
      res.status(400).json({ ok: false, messageEn: 'Spam detected.', messageUr: 'غیر مجاز درخواست۔' });
      return;
    }

    // Arithmetic anti-spam check
    const expectedAnswer = Number(req.body?.captchaExpected);
    const providedAnswer = Number(req.body?.captchaAnswer);
    if (!Number.isFinite(expectedAnswer) || providedAnswer !== expectedAnswer) {
      res.status(400).json({
        ok: false,
        messageEn: 'Please answer the security verification question correctly.',
        messageUr: 'براہِ کرم سیکیورٹی سوال کا درست جواب درج کیجیے۔',
      });
      return;
    }

    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
    const subject = typeof req.body?.subject === 'string' ? req.body.subject.trim() : '';
    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.length < 2 || !emailRegex.test(email) || message.length < 10) {
      res.status(400).json({
        ok: false,
        messageEn: 'Please provide your full name, a valid email address, and a message of at least 10 characters.',
        messageUr: 'براہِ کرم اپنا مکمل نام، درست ای میل اور کم از کم ۱۰ حروف پر مشتمل پیغام تحریر کیجیے۔',
      });
      return;
    }

    store.contacts.push({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      submittedAt: new Date().toISOString(),
    });
    saveStore(store);

    res.json({
      ok: true,
      messageEn: 'JazakAllahu Khayran! Your message has been securely saved for the Paigham360 editorial team.',
      messageUr: 'جزاک اللہ خیراً! آپ کا پیغام پیغام 360 کی ادارتی ٹیم کو محفوظ طریقے سے موصول ہو گیا ہے۔',
    });
  });

  app.get('/robots.txt', (req: Request, res: Response) => {
    const baseUrl = getBaseUrl(req);
    const content = [
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      '',
      `Sitemap: ${baseUrl}/sitemap.xml`,
    ].join('\n');
    res.type('text/plain').send(content);
  });

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const baseUrl = getBaseUrl(req);
    const staticPages = [
      { path: '/', priority: '1.0', changefreq: 'daily' },
      { path: '/quran', priority: '0.9', changefreq: 'weekly' },
      { path: '/hadith', priority: '0.9', changefreq: 'weekly' },
      { path: '/stories', priority: '0.9', changefreq: 'weekly' },
      { path: '/waqiat', priority: '0.9', changefreq: 'weekly' },
      { path: '/duas', priority: '0.9', changefreq: 'weekly' },
      { path: '/knowledge', priority: '0.9', changefreq: 'weekly' },
      { path: '/history', priority: '0.85', changefreq: 'weekly' },
      { path: '/articles', priority: '0.85', changefreq: 'daily' },
      { path: '/about', priority: '0.6', changefreq: 'monthly' },
      { path: '/contact', priority: '0.6', changefreq: 'monthly' },
      { path: '/setup-guide', priority: '0.5', changefreq: 'monthly' },
      { path: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
      { path: '/disclaimer', priority: '0.4', changefreq: 'yearly' },
      { path: '/terms', priority: '0.4', changefreq: 'yearly' },
    ];

    const categoryUrls = CATEGORIES.map((cat) => ({
      path: `/category/${cat.slug}`,
      priority: '0.8',
      changefreq: 'weekly',
    }));

    const articleUrls = ARTICLES.map((article) => ({
      path: `/article/${article.slug}`,
      priority: '0.85',
      changefreq: 'monthly',
      lastmod: article.publishedAt,
    }));

    const allUrls: Array<{ path: string; priority: string; changefreq: string; lastmod?: string }> = [
      ...staticPages,
      ...categoryUrls,
      ...articleUrls,
    ];

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...allUrls.map((entry) => {
        const loc = escapeXml(`${baseUrl}${entry.path}`);
        const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : '';
        return `  <url>\n    <loc>${loc}</loc>${lastmod}\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`;
      }),
      '</urlset>',
    ].join('\n');

    res.type('application/xml').send(xml);
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Paigham360 server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Paigham360 server:', err);
  process.exit(1);
});
