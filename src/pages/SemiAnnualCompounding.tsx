import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import MathFormula from '../components/Math';

export default function SemiAnnualCompounding() {
  const [rate, setRate] = useState(5);

  const annualYear1 = 100 * (1 + rate / 100);
  const semiAnnualYear1 = 100 * Math.pow(1 + rate / 100 / 2, 2);
  const annualYear5 = 100 * Math.pow(1 + rate / 100, 5);
  const semiAnnualYear5 = 100 * Math.pow(1 + rate / 100 / 2, 10);
  const difference5y = semiAnnualYear5 - annualYear5;

  return (
    <PageLayout
      title="Semi-Annual Compounding"
      concept={`In the U.S., bond interest compounds twice a year. A "${rate}% rate" means ${(rate / 2).toFixed(2)}% every 6 months, and you earn interest on your interest.`}
    >
      <div className="space-y-6">
        {/* Rate slider */}
        <div className="p-4 rounded-xl bg-surface border border-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">Annual Rate</span>
            <span className="text-lg font-medium text-columbia">{rate}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-columbia"
          />
        </div>

        {/* Math breakdown with X and checkmark */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface border border-subtle relative">
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-100 border-2 border-red-400 flex items-center justify-center text-red-600 font-bold text-lg">
              ✕
            </div>
            <div className="text-xs text-muted uppercase tracking-wide mb-2">Annual</div>
            <div className="font-mono text-sm mb-2">
              <MathFormula>{"100 \\times (1 + r)^n"}</MathFormula>
            </div>
            <div className="font-mono text-sm text-muted">
              $100 × (1 + {rate}%)¹ = ${annualYear1.toFixed(2)}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-subtle relative">
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-green-100 border-2 border-green-400 flex items-center justify-center text-green-600 font-bold text-lg">
              ✓
            </div>
            <div className="text-xs text-columbia uppercase tracking-wide mb-2">Semi-Annual (U.S. Bonds)</div>
            <div className="font-mono text-sm mb-2">
              <MathFormula>{"100 \\times (1 + r/2)^{2n}"}</MathFormula>
            </div>
            <div className="font-mono text-sm text-muted">
              $100 × (1 + {rate / 2}%)² = ${semiAnnualYear1.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="text-sm text-muted text-center">
          After 5 years, the extra compounding gives you{' '}
          <span className="font-medium text-columbia">
            ${difference5y.toFixed(2)} more
          </span>
        </div>
      </div>
    </PageLayout>
  );
}
