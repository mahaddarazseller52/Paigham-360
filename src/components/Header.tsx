import { useState } from 'react';
import { Menu, Search, X, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NAV_ITEMS = [
  { path: '/', labelEn: 'Home', labelUr: 'ہوم' },
  { path: '/quran', labelEn: 'Quran', labelUr: 'قرآن' },
  { path: '/hadith', labelEn: 'Hadith', labelUr: 'حدیث' },
  { path: '/stories', labelEn: 'Islamic Stories', labelUr: 'اسلامی کہانیاں' },
  { path: '/waqiat', labelEn: 'Waqiat', labelUr: 'واقعات' },
  { path: '/duas', labelEn: 'Duas & Azkar', labelUr: 'دعائیں اور اذکار' },
  { path: '/knowledge', labelEn: 'Islamic Knowledge', labelUr: 'اسلامی معلومات' },
  { path: '/about', labelEn: 'About Us', labelUr: 'ہمارے بارے میں' },
  { path: '/contact', labelEn: 'Contact', labelUr: 'رابطہ' },
];

export function Header() {
  const { language, toggleLanguage, currentPath, navigate, setSearchOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#D4AF37]/30 bg-[#FAFAF5]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1380px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087A55] rounded"
        >
          <div className="h-10 w-36 sm:w-40 overflow-hidden flex items-center">
            <img
              src="/assets/aistudio/Paigham-360_92975f3e.png"
              alt="Paigham360 – The Message of Islam"
              className="h-full w-full object-cover object-center mix-blend-multiply"
            />
          </div>
        </a>

        {/* Primary Desktop Navigation */}
        <nav
          aria-label={language === 'ur' ? 'مرکزی مینو' : 'Main Navigation'}
          className="hidden xl:flex items-center gap-4"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087A55] ${
                  language === 'ur' ? 'font-urdu-tight text-sm' : 'text-[13px] font-medium'
                } ${
                  active
                    ? 'border-b-2 border-[#D4AF37] font-semibold text-[#064E3B]'
                    : 'text-[#202820]/80 hover:text-[#064E3B]'
                }`}
              >
                {language === 'ur' ? item.labelUr : item.labelEn}
              </a>
            );
          })}
        </nav>

        {/* Actions: Search + Language Switcher + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={language === 'ur' ? 'تلاش کریں' : 'Search Paigham360'}
            title={language === 'ur' ? 'تلاش کریں (/)' : 'Search (/)'}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E2D6] bg-white text-[#202820] transition-colors hover:border-[#087A55] hover:text-[#064E3B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087A55]"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={language === 'en' ? 'Switch to Urdu' : 'Switch to English'}
            className="flex h-10 items-center gap-2 rounded-lg bg-[#064E3B] px-3.5 py-2 text-xs font-semibold text-[#FAFAF5] transition-colors hover:bg-[#087A55] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <Globe className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span>{language === 'en' ? 'اردو' : 'English'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={language === 'ur' ? 'مینو کھولیں' : 'Toggle navigation menu'}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E2D6] bg-white text-[#202820] xl:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087A55]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Hamburger Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="border-t border-[#E5E2D6] bg-[#FAFAF5] px-4 py-4 xl:hidden"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    navigate(item.path);
                  }}
                  className={`flex min-h-[44px] items-center justify-center rounded-lg px-3 py-2 text-center text-sm transition-colors ${
                    language === 'ur' ? 'font-urdu-tight' : 'font-medium'
                  } ${
                    active
                      ? 'bg-[#064E3B] text-[#FAFAF5]'
                      : 'border border-[#E5E2D6] bg-white text-[#202820] hover:border-[#087A55]'
                  }`}
                >
                  {language === 'ur' ? item.labelUr : item.labelEn}
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
