import { useState, useEffect, useCallback } from 'react';
import BondBasics from './pages/BondBasics';
import WhatIsABond from './pages/WhatIsABond';
import SemiAnnualCompounding from './pages/SemiAnnualCompounding';
import DiscountFactors from './pages/DiscountFactors';
import SpotRatesAndYield from './pages/SpotRatesAndYield';
import PricingABond from './pages/PricingABond';

const pages = [
  { id: 'basics', title: 'Basics', component: BondBasics },
  { id: 'what-is-a-bond', title: 'Anatomy', component: WhatIsABond },
  { id: 'compounding', title: 'Compounding', component: SemiAnnualCompounding },
  { id: 'discount-factors', title: 'Discount Factors', component: DiscountFactors },
  { id: 'spot-yield', title: 'Spot & Yield', component: SpotRatesAndYield },
  { id: 'pricing', title: 'Pricing', component: PricingABond },
];

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const goToPage = useCallback((index: number) => {
    if (index >= 0 && index < pages.length) {
      setCurrentPage(index);
    }
  }, []);

  const goNext = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const goPrev = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const CurrentPageComponent = pages[currentPage].component;

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Header with Navigation Tabs */}
      <header className="border-b border-subtle bg-surface sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-medium text-main">Bond Math Foundations</h1>
              <p className="text-xs text-muted">Capital Markets & Investments | Columbia Business School</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                disabled={currentPage === 0}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 0
                    ? 'text-muted cursor-not-allowed'
                    : 'text-columbia hover:bg-columbia/10'
                }`}
                aria-label="Previous page"
              >
                ←
              </button>
              <span className="text-sm text-muted px-2">
                {currentPage + 1} / {pages.length}
              </span>
              <button
                onClick={goNext}
                disabled={currentPage === pages.length - 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === pages.length - 1
                    ? 'text-muted cursor-not-allowed'
                    : 'text-columbia hover:bg-columbia/10'
                }`}
                aria-label="Next page"
              >
                →
              </button>
            </div>
          </div>

          {/* Page Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1">
            {pages.map((page, idx) => (
              <button
                key={page.id}
                onClick={() => goToPage(idx)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  idx === currentPage
                    ? 'bg-columbia text-white'
                    : 'bg-warm-surface text-muted hover:bg-columbia/10 hover:text-columbia'
                }`}
              >
                {page.title}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <CurrentPageComponent />
      </main>
    </div>
  );
}

export default App;
