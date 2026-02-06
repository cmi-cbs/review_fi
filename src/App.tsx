import { useState } from 'react';
import UseCases from './components/UseCases';
import SpotVsYield from './components/SpotVsYield';
import BondPricing from './components/BondPricing';
import YieldCalculator from './components/YieldCalculator';

type Section = 'use-cases' | 'spot-vs-yield' | 'bond-pricing' | 'yield-calculator';

const sections: { id: Section; label: string }[] = [
  { id: 'use-cases', label: 'Why Bond Math?' },
  { id: 'spot-vs-yield', label: 'Spot vs. Yield' },
  { id: 'bond-pricing', label: 'Bond Pricing' },
  { id: 'yield-calculator', label: 'Yield Calculator' },
];

function App() {
  const [activeSection, setActiveSection] = useState<Section>('use-cases');

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="border-b border-subtle bg-surface">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-medium text-main">Bond Math Review</h1>
          <p className="text-muted mt-1">Capital Markets & Investments | Columbia Business School</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-10 border-b border-subtle bg-paper">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-2 py-3 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'bg-columbia text-white'
                    : 'bg-surface text-main hover:bg-columbia/10'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {activeSection === 'use-cases' && <UseCases onNext={() => setActiveSection('spot-vs-yield')} />}
        {activeSection === 'spot-vs-yield' && <SpotVsYield />}
        {activeSection === 'bond-pricing' && <BondPricing />}
        {activeSection === 'yield-calculator' && <YieldCalculator />}
      </main>

      {/* Footer */}
      <footer className="border-t border-subtle bg-surface mt-12">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <p className="text-sm text-muted">
            Session 4: Fixed Income (1) - Bond Pricing & Interest Rates
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
