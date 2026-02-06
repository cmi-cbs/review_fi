import { useState, useMemo } from 'react';
import PageLayout from '../components/PageLayout';
import { discountFactor, formatCurrency } from '../utils/bondMath';

export default function DiscountFactors() {
  const [rate, setRate] = useState(5);

  const data = useMemo(() => {
    return [0.5, 1, 1.5, 2, 3, 5].map((years) => ({
      years,
      df: discountFactor(rate / 100, years),
      pv: 100 * discountFactor(rate / 100, years),
    }));
  }, [rate]);

  return (
    <PageLayout
      title="Discount Factors"
      concept="A discount factor (δ) is the price today of receiving $1 in the future. It's always less than 1 because money now is worth more than money later."
    >
      <div className="space-y-6">
        {/* Rate slider */}
        <div className="p-4 rounded-xl bg-surface border border-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">Interest Rate</span>
            <span className="text-lg font-medium text-columbia">{rate}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="12"
            step="0.5"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-columbia"
          />
        </div>

        {/* Visual timeline */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-muted uppercase tracking-wide mb-6">
            Present Value of $100 at Different Times
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="flex justify-between items-end h-48">
              {data.map((d) => (
                <div key={d.years} className="flex flex-col items-center">
                  {/* Bar representing PV */}
                  <div
                    className="w-12 bg-columbia rounded-t transition-all duration-300"
                    style={{ height: `${d.df * 180}px` }}
                  >
                    <div className="text-xs text-white text-center pt-2 font-medium">
                      {formatCurrency(d.pv, 0)}
                    </div>
                  </div>
                  {/* Label */}
                  <div className="mt-2 text-center">
                    <div className="text-xs text-muted">{d.years}y</div>
                    <div className="text-xs font-mono text-columbia">δ = {d.df.toFixed(3)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* $100 reference line */}
            <div className="absolute top-0 left-0 right-0 border-t-2 border-dashed border-subtle">
              <span className="absolute -top-5 right-0 text-xs text-muted">$100 (future value)</span>
            </div>
          </div>
        </div>

        {/* Formula */}
        <div className="p-4 rounded-xl bg-columbia/10 border border-columbia/20">
          <div className="text-xs text-columbia uppercase tracking-wide mb-2">The Formula</div>
          <div className="font-mono text-center text-lg">
            δₙ = 1 / (1 + r/2)^(2n)
          </div>
          <div className="text-xs text-muted text-center mt-2">
            where r = annual rate, n = years, and the 2's are for semi-annual compounding
          </div>
        </div>

        {/* Key insight */}
        <div className="text-sm text-muted text-center">
          Higher rates → lower discount factors → money in the future is worth less today
        </div>
      </div>
    </PageLayout>
  );
}
