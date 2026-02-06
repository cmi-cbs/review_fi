import { useState, useEffect, useCallback } from 'react';
import BondBasics from './pages/BondBasics';
import WhatIsABond from './pages/WhatIsABond';
import SemiAnnualCompounding from './pages/SemiAnnualCompounding';
import DiscountFactors from './pages/DiscountFactors';
import SpotRatesAndYield from './pages/SpotRatesAndYield';
import PricingABond from './pages/PricingABond';

const pages = [
  { id: 'basics', title: 'Bond Basics', component: BondBasics },
  { id: 'what-is-a-bond', title: 'What is a Bond?', component: WhatIsABond },
  { id: 'compounding', title: 'Compounding', component: SemiAnnualCompounding },
  { id: 'discount-factors', title: 'Discount Factors', component: DiscountFactors },
  { id: 'spot-yield', title: 'Spot Rates & Yield', component: SpotRatesAndYield },
  { id: 'pricing', title: 'Pricing a Bond', component: PricingABond },
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
      {/* Header with Navigation */}
      <header className="border-b border-subtle bg-surface sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3">
          {/* Title row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <img src="/cgsm-logo.png" alt="CGSM" className="h-10" />
              <div>
                <h1 className="text-lg font-medium text-main">Bond Math Foundations</h1>
                <p className="text-xs text-muted">Capital Markets & Investments</p>
              </div>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                disabled={currentPage === 0}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  currentPage === 0
                    ? 'text-muted cursor-not-allowed'
                    : 'text-columbia hover:bg-columbia/10'
                }`}
              >
                ←
              </button>
              <span className="text-sm text-muted w-12 text-center">
                {currentPage + 1}/{pages.length}
              </span>
              <button
                onClick={goNext}
                disabled={currentPage === pages.length - 1}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  currentPage === pages.length - 1
                    ? 'text-muted cursor-not-allowed'
                    : 'text-columbia hover:bg-columbia/10'
                }`}
              >
                →
              </button>
            </div>
          </div>

          {/* Page tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1">
            {pages.map((page, idx) => (
              <button
                key={page.id}
                onClick={() => goToPage(idx)}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  idx === currentPage
                    ? 'bg-columbia text-white font-medium'
                    : 'text-muted hover:bg-columbia/10 hover:text-main'
                }`}
              >
                {page.title}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-8 w-full">
        <CurrentPageComponent />
      </main>
    </div>
  );
}

export default App;
