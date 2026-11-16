import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Language } from '../types/content';

interface SeoMeta {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
}

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  currentPath: string;
  navigate: (path: string) => void;
  bookmarks: string[];
  toggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  updateSeo: (meta: SeoMeta) => void;
  isRtl: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

const LANGUAGE_STORAGE_KEY = 'paigham360_lang';
const BOOKMARKS_STORAGE_KEY = 'paigham360_bookmarks';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return saved === 'ur' ? 'ur' : 'en';
    } catch {
      return 'en';
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [searchOpen, setSearchOpen] = useState(false);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // ignore storage restrictions
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  }, [language, setLanguage]);

  useEffect(() => {
    document.documentElement.lang = language === 'ur' ? 'ur' : 'en';
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !searchOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const navigate = useCallback((path: string) => {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    if (normalized !== window.location.pathname) {
      window.history.pushState({}, '', normalized);
      setCurrentPath(normalized);
    }
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleBookmark = useCallback((articleId: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId];
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (articleId: string) => bookmarks.includes(articleId),
    [bookmarks]
  );

  const updateSeo = useCallback((meta: SeoMeta) => {
    document.title = meta.title;

    const setMetaTag = (selector: string, attrName: 'name' | 'property', attrVal: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMetaTag('meta[name="description"]', 'name', 'description', meta.description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', meta.type || 'website');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);

    const canonicalHref = window.location.origin + (meta.path || window.location.pathname);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalHref);

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonicalHref;

    const existingDynamicLd = document.getElementById('paigham360-dynamic-ld');
    if (existingDynamicLd) {
      existingDynamicLd.remove();
    }
    if (meta.jsonLd) {
      const script = document.createElement('script');
      script.id = 'paigham360-dynamic-ld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(meta.jsonLd);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        currentPath,
        navigate,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        searchOpen,
        setSearchOpen,
        updateSeo,
        isRtl: language === 'ur',
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return ctx;
}
