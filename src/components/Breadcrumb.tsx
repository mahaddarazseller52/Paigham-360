import { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface BreadcrumbSegment {
  labelEn: string;
  labelUr: string;
  path?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbSegment[] }) {
  const { language, navigate } = useApp();

  useEffect(() => {
    const origin = window.location.origin;
    const itemListElement = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${origin}/`,
      },
      ...items.map((seg, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: language === 'ur' ? seg.labelUr : seg.labelEn,
        item: seg.path ? `${origin}${seg.path}` : window.location.href,
      })),
    ];

    const existing = document.getElementById('paigham360-breadcrumb-ld');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = 'paigham360-breadcrumb-ld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    });
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('paigham360-breadcrumb-ld');
      if (el) el.remove();
    };
  }, [items, language]);

  return (
    <nav
      aria-label={language === 'ur' ? 'راستہ' : 'Breadcrumb'}
      className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[#202820]/65"
    >
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}
        className="hover:text-[#064E3B] transition-colors"
      >
        {language === 'ur' ? 'ہوم' : 'Home'}
      </a>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className="inline-flex items-center gap-2">
            <ChevronRight
              className={`h-3.5 w-3.5 text-[#202820]/40 ${language === 'ur' ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
            {item.path && !isLast ? (
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path!);
                }}
                className="hover:text-[#064E3B] transition-colors"
              >
                {language === 'ur' ? item.labelUr : item.labelEn}
              </a>
            ) : (
              <span className="font-medium text-[#064E3B] line-clamp-1 max-w-[260px] sm:max-w-md">
                {language === 'ur' ? item.labelUr : item.labelEn}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
