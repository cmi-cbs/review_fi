import { useState, useMemo } from 'react';
import PageLayout from '../components/PageLayout';
import { priceBondAtYield, formatCurrency, formatPercent } from '../utils/bondMath';

export default function PremiumParDiscount() {
  const [coupon, setCoupon] = useState(5);
  const [ytm, setYtm] = useState(5);
  const maturity = 5;

  const result = useMemo(() => {
    return priceBondAtYield(coupon / 100, maturity, ytm / 100, 100);
  }, [coupon, ytm]);

  const bondType = useMemo(() => {
    if (result.price > 100.1) return 'premium';
    if (result.price < 99.9) return 'discount';
    return 'par';
  }, [result.price]);

  const typeColors = {
    premium: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
    par: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700' },
    discount: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
  };

  return (
    <PageLayout
      title="Premium, Par, Discount"
      concept="The relationship between a bond's coupon rate and yield determines whether it trades above, at, or below par value."
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface border border-subtle">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">Coupon Rate</span>
              <span className="text-lg font-medium">{coupon}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={coupon}
              onChange={(e) => setCoupon(Number(e.target.value))}
              className="w-full accent-columbia"
            />
          </div>

          <div className="p-4 rounded-xl bg-surface border border-subtle">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">Yield (YTM)</span>
              <span className="text-lg font-medium text-columbia">{ytm}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={ytm}
              onChange={(e) => setYtm(Number(e.target.value))}
              className="w-full accent-columbia"
            />
          </div>
        </div>

        {/* Visual price bar */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-muted uppercase tracking-wide mb-4">
            Price Relative to Par
          </div>

          <div className="relative h-24">
            {/* Par line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 text-xs text-muted">$100 (par)</div>

            {/* Price indicator */}
            <div
              className="absolute top-12 transition-all duration-300"
              style={{
                left: `${Math.min(Math.max((result.price / 200) * 100, 5), 95)}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div
                className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center ${typeColors[bondType].bg} ${typeColors[bondType].border} border-2`}
              >
                <div className={`text-lg font-medium ${typeColors[bondType].text}`}>
                  {formatCurrency(result.price, 0)}
                </div>
              </div>
            </div>

            {/* Scale */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted">
              <span>$80</span>
              <span>$120</span>
            </div>
          </div>
        </div>

        {/* Result card */}
        <div className={`p-6 rounded-xl ${typeColors[bondType].bg} ${typeColors[bondType].border} border`}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-muted uppercase">Coupon</div>
              <div className="text-xl font-medium">{formatPercent(coupon / 100)}</div>
            </div>
            <div>
              <div className="text-xs text-muted uppercase">vs</div>
              <div className={`text-xl font-medium ${typeColors[bondType].text}`}>
                {coupon > ytm ? '>' : coupon < ytm ? '<' : '='}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted uppercase">Yield</div>
              <div className="text-xl font-medium text-columbia">{formatPercent(ytm / 100)}</div>
            </div>
          </div>

          <div className={`text-center mt-4 text-lg font-medium ${typeColors[bondType].text}`}>
            {bondType === 'premium' && '→ Premium Bond (Price > Par)'}
            {bondType === 'par' && '→ Par Bond (Price ≈ Par)'}
            {bondType === 'discount' && '→ Discount Bond (Price < Par)'}
          </div>
        </div>

        {/* Summary table */}
        <div className="p-4 rounded-xl bg-surface border border-subtle">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted">
                <th className="pb-2">Type</th>
                <th className="pb-2">Condition</th>
                <th className="pb-2">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className={bondType === 'premium' ? 'font-medium text-green-700' : ''}>
                <td className="py-1">Premium</td>
                <td>Coupon &gt; Yield</td>
                <td>Price &gt; $100</td>
              </tr>
              <tr className={bondType === 'par' ? 'font-medium text-gray-700' : ''}>
                <td className="py-1">Par</td>
                <td>Coupon = Yield</td>
                <td>Price = $100</td>
              </tr>
              <tr className={bondType === 'discount' ? 'font-medium text-red-700' : ''}>
                <td className="py-1">Discount</td>
                <td>Coupon &lt; Yield</td>
                <td>Price &lt; $100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
