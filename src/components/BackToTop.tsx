import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function BackToTop() {
  const { language } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 360);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={language === 'ur' ? 'اوپر جائیں' : 'Back to top'}
      className="fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#064E3B] text-[#FAFAF5] shadow-lg transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#087A55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
    >
      <ArrowUp className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
    </button>
  );
}
