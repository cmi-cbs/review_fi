import { useMemo } from 'react';
import PageLayout from '../components/PageLayout';
import MathFormula from '../components/Math';
import { priceBondWithSpotRates, formatCurrency } from '../utils/bondMath';

// Lecture example: 2-year, 4% coupon bond
const couponRate = 0.04;
const maturity = 2;
const spotRates = [0.05, 0.051, 0.052, 0.0505]; // r0.5, r1, r1.5, r2

export default function PricingABond() {
  const result = useMemo(() => {
    return priceBondWithSpotRates(couponRate, maturity, spotRates, 100);
  }, []);

  return (
    <PageLayout
      title="Pricing a Bond"
      concept="A bond's price equals the sum of its discounted cash flows. Each coupon and the final principal payment gets multiplied by its discount factor."
    >
      <div className="space-y-6">
        {/* Example bond */}
        <div className="p-4 rounded-xl bg-columbia/10 border border-columbia/20">
          <div className="text-xs text-columbia uppercase tracking-wide mb-2">Example: 2-Year Treasury Note</div>
          <div className="flex gap-6 text-sm">
            <div><span className="text-muted">Coupon:</span> <span className="font-medium">4%</span></div>
            <div><span className="text-muted">Maturity:</span> <span className="font-medium">2 years</span></div>
            <div><span className="text-muted">Face Value:</span> <span className="font-medium">$100</span></div>
          </div>
        </div>

        {/* Breakdown table */}
        <div className="p-4 rounded-xl bg-surface border border-subtle overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted">
                <th className="pb-2">Period</th>
                <th className="pb-2 text-right">Cash Flow</th>
                <th className="pb-2 text-right">Spot Rate</th>
                <th className="pb-2 text-right">Discount Factor</th>
                <th className="pb-2 text-right">Present Value</th>
              </tr>
            </thead>
            <tbody>
              {result.breakdown.map((row, idx) => (
                <tr key={idx} className="border-t border-subtle">
                  <td className="py-2">{row.years}y</td>
                  <td className="py-2 text-right">{formatCurrency(row.cashFlow)}</td>
                  <td className="py-2 text-right">{(row.spotRate * 100).toFixed(2)}%</td>
                  <td className="py-2 text-right font-mono text-xs">{row.discountFactor.toFixed(4)}</td>
                  <td className="py-2 text-right font-medium">{formatCurrency(row.presentValue)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-columbia font-medium">
                <td colSpan={4} className="py-2 text-right">Bond Price =</td>
                <td className="py-2 text-right text-columbia">{formatCurrency(result.price)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Discount Factor Computation */}
        <div className="p-4 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-muted uppercase tracking-wide mb-3">How Discount Factors Are Computed</div>
          <div className="space-y-3">
            {result.breakdown.map((row, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm font-mono">
                <span className="text-muted">
                  <MathFormula>{`\\delta_{${row.years}} = \\frac{1}{(1 + ${(row.spotRate * 100).toFixed(1)}\\%/2)^{${row.years * 2}}}`}</MathFormula>
                </span>
                <span className="text-columbia font-medium">= {row.discountFactor.toFixed(4)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formula */}
        <div className="text-center p-4 rounded-xl bg-columbia/10 border border-columbia/20">
          <div className="font-mono text-sm text-muted mb-2">
            <MathFormula display>{"P = \\sum_{t} CF_t \\times \\delta_t"}</MathFormula>
          </div>
          <div className="font-mono text-sm">
            P = {result.breakdown.map((r) => r.presentValue.toFixed(2)).join(' + ')} = <span className="text-columbia font-medium">{formatCurrency(result.price)}</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
