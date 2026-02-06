import { useState, useMemo } from 'react';
import {
  priceBondWithSpotRates,
  calculateYTM,
  formatPercent,
  formatCurrency,
} from '../utils/bondMath';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

// Default spot curve (slightly upward sloping)
const defaultSpotRates = [0.05, 0.051, 0.052, 0.0505]; // 6m, 1y, 1.5y, 2y

export default function SpotVsYield() {
  const [spotRates] = useState(defaultSpotRates);

  // Two bonds with different coupons but same maturity
  const bondA = useMemo(() => {
    const result = priceBondWithSpotRates(0.08, 2, spotRates, 100);
    const ytm = calculateYTM(result.price, 0.08, 2, 100);
    return { coupon: 0.08, ...result, ytm };
  }, [spotRates]);

  const bondB = useMemo(() => {
    const result = priceBondWithSpotRates(0.04, 2, spotRates, 100);
    const ytm = calculateYTM(result.price, 0.04, 2, 100);
    return { coupon: 0.04, ...result, ytm };
  }, [spotRates]);

  // Chart data for spot curve
  const spotCurveData = spotRates.map((rate, i) => ({
    years: (i + 1) / 2,
    spotRate: rate * 100,
  }));

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-medium mb-4">Spot Rate vs. Yield: The Key Distinction</h2>
        <p className="text-muted leading-relaxed">
          This is the most common source of confusion in bond math. Let's clear it up.
        </p>
      </section>

      {/* Definitions */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <h3 className="text-lg font-medium text-columbia mb-3">Spot Rate (rₙ)</h3>
          <p className="text-sm text-muted mb-4">
            The interest rate for a <em>zero-coupon bond</em> maturing at time n.
          </p>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-columbia">•</span>
              <span><strong>Market-wide:</strong> One spot rate per maturity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-columbia">•</span>
              <span><strong>Building block:</strong> Used to price any bond</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-columbia">•</span>
              <span><strong>Unique:</strong> Each maturity has exactly one spot rate</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <h3 className="text-lg font-medium text-columbia mb-3">Yield-to-Maturity (YTM)</h3>
          <p className="text-sm text-muted mb-4">
            The single discount rate that prices a <em>specific coupon bond</em>.
          </p>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-columbia">•</span>
              <span><strong>Bond-specific:</strong> Each bond has its own yield</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-columbia">•</span>
              <span><strong>Weighted average:</strong> Of the spot rates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-columbia">•</span>
              <span><strong>IRR:</strong> The return if held to maturity</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Key insight */}
      <section className="p-6 rounded-xl bg-columbia/10 border border-columbia/20">
        <h3 className="text-lg font-medium mb-3">Key Insight</h3>
        <p className="text-sm leading-relaxed">
          For <strong>zero-coupon bonds</strong>, spot rate = yield (they're identical).
          For <strong>coupon bonds</strong>, yield is a weighted average of spot rates, weighted by cash flow timing.
          Two bonds with the same maturity but different coupons will have <strong>different yields</strong> even though they face the <strong>same spot curve</strong>.
        </p>
      </section>

      {/* Interactive demonstration */}
      <section className="space-y-6">
        <h3 className="text-lg font-medium">See It In Action</h3>
        <p className="text-sm text-muted">
          Below are two 2-year bonds priced using the same spot curve. Notice how they have different yields.
        </p>

        {/* Spot Curve */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <h4 className="text-sm font-medium text-muted uppercase tracking-wide mb-4">Spot Curve</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spotCurveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0DFD5" />
                <XAxis dataKey="years" label={{ value: 'Years', position: 'bottom', offset: -5 }} tick={{ fontSize: 12 }} />
                <YAxis domain={['dataMin - 0.1', 'dataMax + 0.1']} tickFormatter={(v) => `${v.toFixed(1)}%`} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${Number(value).toFixed(2)}%`, 'Spot Rate']} />
                <Line type="monotone" dataKey="spotRate" stroke="#6F7F99" strokeWidth={2} dot={{ fill: '#6F7F99', r: 4 }} />
                <ReferenceDot x={2} y={bondA.ytm * 100} r={6} fill="#2563eb" stroke="#fff" strokeWidth={2} />
                <ReferenceDot x={2} y={bondB.ytm * 100} r={6} fill="#dc2626" stroke="#fff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#6F7F99]"></div>
              <span className="text-muted">Spot Curve</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-muted">Bond A Yield</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span className="text-muted">Bond B Yield</span>
            </div>
          </div>
        </div>

        {/* Bond comparison */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 rounded-xl bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <h4 className="font-medium">Bond A: 8% Coupon</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted">Price</div>
                <div className="text-lg font-medium">{formatCurrency(bondA.price)}</div>
              </div>
              <div>
                <div className="text-muted">Yield (YTM)</div>
                <div className="text-lg font-medium text-blue-600">{formatPercent(bondA.ytm)}</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-red-50 border border-red-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <h4 className="font-medium">Bond B: 4% Coupon</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted">Price</div>
                <div className="text-lg font-medium">{formatCurrency(bondB.price)}</div>
              </div>
              <div>
                <div className="text-muted">Yield (YTM)</div>
                <div className="text-lg font-medium text-red-600">{formatPercent(bondB.ytm)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="p-4 rounded-lg bg-surface border border-subtle">
          <p className="text-sm leading-relaxed">
            <strong>Why the difference?</strong> Bond A pays higher coupons earlier, so more of its value comes from
            early cash flows (discounted at lower spot rates). Bond B's value is more weighted toward the final
            payment (discounted at the 2-year spot rate). The yield is a weighted average, and the weights differ.
          </p>
        </div>
      </section>

      {/* Formula reminder */}
      <section className="p-6 rounded-xl bg-surface border border-subtle">
        <h4 className="text-sm font-medium text-muted uppercase tracking-wide mb-4">The Formulas</h4>
        <div className="grid gap-6 md:grid-cols-2 text-sm">
          <div>
            <div className="font-medium mb-2">Discount Factor from Spot Rate</div>
            <div className="font-mono bg-paper p-3 rounded border border-subtle">
              δₙ = 1 / (1 + rₙ/2)^(2n)
            </div>
            <p className="text-muted mt-2 text-xs">The "2" is for semi-annual compounding</p>
          </div>
          <div>
            <div className="font-medium mb-2">Bond Price from Spot Rates</div>
            <div className="font-mono bg-paper p-3 rounded border border-subtle">
              P = Σ CFₜ × δₜ
            </div>
            <p className="text-muted mt-2 text-xs">Sum of cash flows × their discount factors</p>
          </div>
        </div>
      </section>
    </div>
  );
}
