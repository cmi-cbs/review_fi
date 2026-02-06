import { useState, useMemo } from 'react';
import PageLayout from '../components/PageLayout';
import { calculateYTM, priceBondAtYield, formatCurrency, formatPercent } from '../utils/bondMath';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

export default function YieldToMaturity() {
  const [price, setPrice] = useState(98);
  const couponRate = 0.04;
  const maturity = 5;

  // Calculate YTM for current price
  const ytm = useMemo(() => {
    return calculateYTM(price, couponRate, maturity, 100);
  }, [price]);

  // Generate price-yield curve data
  const curveData = useMemo(() => {
    const yields = [];
    for (let y = 0.02; y <= 0.08; y += 0.002) {
      const p = priceBondAtYield(couponRate, maturity, y, 100).price;
      yields.push({ yield: y * 100, price: p });
    }
    return yields;
  }, []);

  return (
    <PageLayout
      title="Yield-to-Maturity"
      concept="YTM is the single discount rate that makes a bond's price equal its discounted cash flows. It's the return you'd earn if you held the bond to maturity."
    >
      <div className="space-y-6">
        {/* Price slider */}
        <div className="p-4 rounded-xl bg-surface border border-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">Bond Price</span>
            <span className="text-lg font-medium text-columbia">{formatCurrency(price)}</span>
          </div>
          <input
            type="range"
            min="85"
            max="115"
            step="0.5"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-columbia"
          />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>$85</span>
            <span>$100 (par)</span>
            <span>$115</span>
          </div>
        </div>

        {/* Price-Yield curve */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-muted uppercase tracking-wide mb-4">
            Price-Yield Relationship (5-year, 4% coupon bond)
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0DFD5" />
                <XAxis
                  dataKey="yield"
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Yield', position: 'bottom', offset: -5 }}
                />
                <YAxis
                  domain={[85, 115]}
                  tickFormatter={(v) => `$${v}`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value, name) => [
                    name === 'price' ? formatCurrency(Number(value)) : `${Number(value).toFixed(2)}%`,
                    name === 'price' ? 'Price' : 'Yield',
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#6F7F99"
                  strokeWidth={2}
                  dot={false}
                />
                <ReferenceDot
                  x={ytm * 100}
                  y={price}
                  r={8}
                  fill="#6F7F99"
                  stroke="#fff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Result */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface border border-subtle text-center">
            <div className="text-xs text-muted uppercase tracking-wide mb-1">Price</div>
            <div className="text-2xl font-medium">{formatCurrency(price)}</div>
          </div>
          <div className="p-4 rounded-xl bg-columbia/10 border border-columbia/20 text-center">
            <div className="text-xs text-columbia uppercase tracking-wide mb-1">Yield-to-Maturity</div>
            <div className="text-2xl font-medium text-columbia">{formatPercent(ytm)}</div>
          </div>
        </div>

        {/* Key insight */}
        <div className="text-sm text-muted text-center">
          <strong>Price and yield move inversely:</strong>{' '}
          {price < 100
            ? 'Price below par → Yield above coupon rate'
            : price > 100
            ? 'Price above par → Yield below coupon rate'
            : 'Price at par → Yield equals coupon rate'}
        </div>
      </div>
    </PageLayout>
  );
}
