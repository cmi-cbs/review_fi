import { useMemo } from 'react';
import PageLayout from '../components/PageLayout';
import MathFormula from '../components/Math';
import { discountFactor, formatCurrency } from '../utils/bondMath';

export default function DiscountFactors() {
  const rate = 5; // Fixed rate for simplicity

  const data = useMemo(() => {
    return [0.5, 1, 1.5, 2, 3, 5].map((years) => ({
      years,
      df: discountFactor(rate / 100, years),
      pv: 100 * discountFactor(rate / 100, years),
    }));
  }, []);

  return (
    <PageLayout
      title="Discount Factors"
      concept="If I promise to give you a dollar next year, what would you pay me for that promise today? Maybe 95 cents. That 0.95 is your discount factor. It's the exchange rate between future dollars and today's dollars."
    >
      <div className="space-y-6">
        {/* Key insight box */}
        <div className="p-5 rounded-xl bg-columbia/10 border border-columbia/20">
          <p className="text-main leading-relaxed">
            A discount factor is just <strong>a price</strong>: how much is $1 delivered
            at time t worth right now? The spot rate is a different way of expressing
            that same price (annualized, in percentage terms).
          </p>
        </div>

        {/* Visual timeline */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-muted uppercase tracking-wide mb-6">
            Present Value of $100 at Different Times (at {rate}% rate)
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
                    <div className="text-xs font-mono text-columbia">d = {d.df.toFixed(3)}</div>
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
        <div className="p-4 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-muted uppercase tracking-wide mb-2">The Formula</div>
          <div className="text-center py-2">
            <MathFormula display>{"\\delta_n = \\frac{1}{(1 + r/2)^{2n}}"}</MathFormula>
          </div>
          <div className="text-xs text-muted text-center mt-2">
            where r = annual rate, n = years, and the 2's are for semi-annual compounding
          </div>
        </div>

        {/* Choosing the discount rate */}
        <div className="p-5 rounded-xl bg-surface border border-subtle">
          <h4 className="font-medium text-main mb-3">Choosing the Discount Rate</h4>
          <p className="text-sm text-muted mb-4">
            "What rate should I use?" is really the question "What else could I do with this money at similar risk?"
            The discount rate is your <strong>opportunity cost</strong>, adjusted for how nervous the cash flow makes you.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-medium shrink-0">1</div>
              <div className="flex-1">
                <span className="font-medium">Time alone:</span>{' '}
                <span className="text-muted">Even if guaranteed, a dollar tomorrow is worth less. That's the risk-free rate (Treasury yields).</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-xs font-medium shrink-0">2</div>
              <div className="flex-1">
                <span className="font-medium">+ Default risk:</span>{' '}
                <span className="text-muted">Chance you don't get paid? Demand more. That's the credit spread.</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-medium shrink-0">3</div>
              <div className="flex-1">
                <span className="font-medium">+ Everything else:</span>{' '}
                <span className="text-muted">Liquidity, tax treatment, optionality. Each friction adds more.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
