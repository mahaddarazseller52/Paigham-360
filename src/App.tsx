import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { BackToTop } from './components/BackToTop';
import { HomePage } from './pages/HomePage';
import { QuranPage } from './pages/QuranPage';
import { HadithPage } from './pages/HadithPage';
import { DuasPage } from './pages/DuasPage';
import { HistoryPage } from './pages/HistoryPage';
import { CategoryPage } from './pages/CategoryPage';
import { ArticlePage } from './pages/ArticlePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { SetupGuidePage } from './pages/SetupGuidePage';

function RouterView() {
  const { currentPath } = useApp();
  const cleanPath = currentPath === '/' ? '/' : currentPath.replace(/\/+$/, '');

  if (cleanPath === '/') return <HomePage />;
  if (cleanPath === '/quran') return <QuranPage />;
  if (cleanPath === '/hadith') return <HadithPage />;
  if (cleanPath === '/duas') return <DuasPage />;
  if (cleanPath === '/history') return <HistoryPage />;
  if (cleanPath === '/stories') return <CategoryPage mode="stories" initialCategory="all" />;
  if (cleanPath === '/waqiat') return <CategoryPage mode="waqiat" initialCategory="islamic-waqiat" />;
  if (cleanPath === '/knowledge') return <CategoryPage mode="knowledge" initialCategory="islamic-knowledge" />;
  if (cleanPath === '/articles') return <CategoryPage mode="all" initialCategory="all" />;
  if (cleanPath === '/about') return <AboutPage />;
  if (cleanPath === '/contact') return <ContactPage />;
  if (cleanPath === '/setup-guide') return <SetupGuidePage />;
  if (cleanPath === '/privacy-policy') return <LegalPage type="privacy" />;
  if (cleanPath === '/disclaimer') return <LegalPage type="disclaimer" />;
  if (cleanPath === '/terms') return <LegalPage type="terms" />;

  if (cleanPath.startsWith('/category/')) {
    const slug = cleanPath.replace('/category/', '');
    return <CategoryPage mode="category" initialCategory={slug} />;
  }

  if (cleanPath.startsWith('/article/')) {
    const slug = cleanPath.replace('/article/', '');
    return <ArticlePage slug={slug} />;
  }

  return <HomePage />;
}

export default function App() {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col bg-[#FAFAF5] text-[#202820]">
        <Header />
        <main className="flex-1">
          <RouterView />
        </main>
        <Footer />
        <SearchModal />
        <BackToTop />
      </div>
    </AppProvider>
  );
}
