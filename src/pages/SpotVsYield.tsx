import { useMemo } from 'react';
import PageLayout from '../components/PageLayout';
import { priceBondWithSpotRates, calculateYTM, formatCurrency, formatPercent } from '../utils/bondMath';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceDot } from 'recharts';

// Same spot curve for both bonds
const spotRates = [0.05, 0.051, 0.052, 0.0505]; // r0.5, r1, r1.5, r2

export default function SpotVsYield() {
  // Bond A: High coupon
  const bondA = useMemo(() => {
    const result = priceBondWithSpotRates(0.08, 2, spotRates, 100);
    const ytm = calculateYTM(result.price, 0.08, 2, 100);
    return { coupon: 0.08, ...result, ytm };
  }, []);

  // Bond B: Low coupon
  const bondB = useMemo(() => {
    const result = priceBondWithSpotRates(0.04, 2, spotRates, 100);
    const ytm = calculateYTM(result.price, 0.04, 2, 100);
    return { coupon: 0.04, ...result, ytm };
  }, []);

  // Spot curve data for chart
  const spotCurveData = spotRates.map((rate, i) => ({
    years: (i + 1) / 2,
    spotRate: rate * 100,
  }));

  return (
    <PageLayout
      title="Spot Rate vs. Yield"
      concept="Spot rates are market-wide (one per maturity). Yield is bond-specific (depends on coupon timing). For zero-coupon bonds, they're identical. For coupon bonds, yield is a weighted average of spot rates."
    >
      <div className="space-y-6">
        {/* Definitions side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface border border-subtle">
            <div className="text-sm font-medium mb-2">Spot Rate</div>
            <ul className="text-xs text-muted space-y-1">
              <li>• One per maturity</li>
              <li>• Market-wide</li>
              <li>• Building block for pricing</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-columbia/10 border border-columbia/20">
            <div className="text-sm font-medium text-columbia mb-2">Yield (YTM)</div>
            <ul className="text-xs text-muted space-y-1">
              <li>• One per bond</li>
              <li>• Bond-specific</li>
              <li>• Weighted average of spots</li>
            </ul>
          </div>
        </div>

        {/* Chart showing spot curve with yield points */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-muted uppercase tracking-wide mb-4">
            Same Spot Curve, Different Yields
          </div>

          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spotCurveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0DFD5" />
                <XAxis dataKey="years" tickFormatter={(v) => `${v}y`} tick={{ fontSize: 12 }} />
                <YAxis domain={[4.8, 5.4]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="spotRate"
                  stroke="#6F7F99"
                  strokeWidth={2}
                  dot={{ fill: '#6F7F99', r: 4 }}
                />
                {/* Bond A yield */}
                <ReferenceDot x={2} y={bondA.ytm * 100} r={8} fill="#2563eb" stroke="#fff" strokeWidth={2} />
                {/* Bond B yield */}
                <ReferenceDot x={2} y={bondB.ytm * 100} r={8} fill="#dc2626" stroke="#fff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-6 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#6F7F99]" />
              <span className="text-muted">Spot Curve</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="text-muted">Bond A Yield</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-muted">Bond B Yield</span>
            </div>
          </div>
        </div>

        {/* Bond comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="font-medium text-sm">Bond A: 8% Coupon</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-xs text-muted">Price</div>
                <div className="font-medium">{formatCurrency(bondA.price)}</div>
              </div>
              <div>
                <div className="text-xs text-muted">Yield</div>
                <div className="font-medium text-blue-600">{formatPercent(bondA.ytm)}</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-600" />
              <span className="font-medium text-sm">Bond B: 4% Coupon</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-xs text-muted">Price</div>
                <div className="font-medium">{formatCurrency(bondB.price)}</div>
              </div>
              <div>
                <div className="text-xs text-muted">Yield</div>
                <div className="font-medium text-red-600">{formatPercent(bondB.ytm)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="text-sm text-muted text-center">
          Bond A pays more coupons early (discounted at lower spot rates) → lower yield.
          Bond B's value is weighted more toward maturity → yield closer to the 2-year spot.
        </div>
      </div>
    </PageLayout>
  );
}
