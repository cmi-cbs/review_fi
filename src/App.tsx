import { useState, useEffect, useCallback } from 'react';
import WhatIsABond from './pages/WhatIsABond';
import SemiAnnualCompounding from './pages/SemiAnnualCompounding';
import DiscountFactors from './pages/DiscountFactors';
import SpotRates from './pages/SpotRates';
import PricingABond from './pages/PricingABond';
import YieldToMaturity from './pages/YieldToMaturity';
import SpotVsYield from './pages/SpotVsYield';
import PremiumParDiscount from './pages/PremiumParDiscount';

const pages = [
  { id: 'what-is-a-bond', title: 'What is a Bond?', component: WhatIsABond },
  { id: 'compounding', title: 'Semi-Annual Compounding', component: SemiAnnualCompounding },
  { id: 'discount-factors', title: 'Discount Factors', component: DiscountFactors },
  { id: 'spot-rates', title: 'Spot Rates', component: SpotRates },
  { id: 'pricing', title: 'Pricing a Bond', component: PricingABond },
  { id: 'ytm', title: 'Yield-to-Maturity', component: YieldToMaturity },
  { id: 'spot-vs-yield', title: 'Spot vs. Yield', component: SpotVsYield },
  { id: 'premium-par-discount', title: 'Premium, Par, Discount', component: PremiumParDiscount },
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
      {/* Header */}
      <header className="border-b border-subtle bg-surface">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-medium text-main">Bond Math Foundations</h1>
            <p className="text-xs text-muted">Capital Markets & Investments</p>
          </div>
          <div className="text-sm text-muted">
            {currentPage + 1} / {pages.length}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <CurrentPageComponent />
      </main>

      {/* Navigation Footer */}
      <footer className="border-t border-subtle bg-surface">
        <div className="max-w-4xl mx-auto px-6 py-4">
          {/* Page dots */}
          <div className="flex justify-center gap-2 mb-4">
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentPage ? 'bg-columbia' : 'bg-subtle hover:bg-columbia/50'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev/Next buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={goPrev}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 0
                  ? 'text-muted cursor-not-allowed'
                  : 'text-columbia hover:bg-columbia/10'
              }`}
            >
              ← Previous
            </button>

            <span className="text-sm text-muted">
              {pages[currentPage].title}
            </span>

            <button
              onClick={goNext}
              disabled={currentPage === pages.length - 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === pages.length - 1
                  ? 'text-muted cursor-not-allowed'
                  : 'text-columbia hover:bg-columbia/10'
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
