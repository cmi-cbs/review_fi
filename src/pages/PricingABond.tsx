import { useMemo } from 'react';
import PageLayout from '../components/PageLayout';
import MathFormula from '../components/Math';
import { formatCurrency } from '../utils/bondMath';

// Simple 2-year bond: $2 coupon every 6 months, $100 par at end
const spotRates = [0.05, 0.051, 0.052, 0.0505]; // r0.5, r1, r1.5, r2

export default function PricingABond() {
  const result = useMemo(() => {
    const periods = [
      { years: 0.5, cashFlow: 2, spotRate: spotRates[0] },
      { years: 1, cashFlow: 2, spotRate: spotRates[1] },
      { years: 1.5, cashFlow: 2, spotRate: spotRates[2] },
      { years: 2, cashFlow: 102, spotRate: spotRates[3] },
    ];

    const breakdown = periods.map(p => {
      const df = 1 / Math.pow(1 + p.spotRate / 2, p.years * 2);
      return {
        years: p.years,
        cashFlow: p.cashFlow,
        spotRate: p.spotRate,
        discountFactor: df,
        presentValue: p.cashFlow * df,
        // For showing the computation
        periods: p.years * 2,
      };
    });

    const price = breakdown.reduce((sum, row) => sum + row.presentValue, 0);
    return { breakdown, price };
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
            <div><span className="text-muted">Coupon:</span> <span className="font-medium">4% (= $2 semi-annual)</span></div>
            <div><span className="text-muted">Maturity:</span> <span className="font-medium">2 years</span></div>
            <div><span className="text-muted">Face Value:</span> <span className="font-medium">$100</span></div>
          </div>
        </div>

        {/* Main pricing table */}
        <div className="p-5 rounded-xl bg-surface border border-subtle overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted">
                <th className="pb-3">Period</th>
                <th className="pb-3 text-right">Cash Flow</th>
                <th className="pb-3 text-right">Spot Rate</th>
                <th className="pb-3 text-right">Discount Factor</th>
                <th className="pb-3 text-right">Present Value</th>
              </tr>
            </thead>
            <tbody>
              {result.breakdown.map((row, idx) => (
                <tr key={idx} className="border-t border-subtle">
                  <td className="py-3">{row.years}y</td>
                  <td className="py-3 text-right">{formatCurrency(row.cashFlow)}</td>
                  <td className="py-3 text-right">{(row.spotRate * 100).toFixed(2)}%</td>
                  <td className="py-3 text-right font-mono text-xs">{row.discountFactor.toFixed(4)}</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(row.presentValue)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-columbia font-medium">
                <td colSpan={4} className="py-3 text-right">Bond Price =</td>
                <td className="py-3 text-right text-columbia text-lg">{formatCurrency(result.price)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* How discount factor is computed */}
        <div className="p-5 rounded-xl bg-surface border border-subtle">
          <h4 className="font-medium text-main mb-3">How Discount Factor is Computed</h4>
          <div className="space-y-3 text-sm">
            {result.breakdown.map((row, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-muted w-12">{row.years}y:</span>
                <div className="flex-1 font-mono text-xs bg-paper p-2 rounded">
                  <MathFormula>{`\\delta = \\frac{1}{(1 + ${(row.spotRate * 100 / 2).toFixed(2)}\\%)^{${row.periods}}} = ${row.discountFactor.toFixed(4)}`}</MathFormula>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-4">
            Each period is 6 months. So 0.5y = 1 period, 1y = 2 periods, etc.
            The spot rate is halved for semi-annual compounding.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
