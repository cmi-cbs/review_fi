import { useState, useMemo } from 'react';
import {
  calculateYTM,
  priceBondAtYield,
  classifyBond,
  formatPercent,
  formatCurrency,
} from '../utils/bondMath';

// Preset examples from lecture
const presets = {
  'slide25': {
    name: 'Slide 25 Example',
    description: '3-year, 2.75% coupon at $98.307',
    price: 98.307,
    couponRate: 2.75,
    maturity: 3,
  },
  'slide23_A': {
    name: 'Slide 23 Bond A',
    description: '10-year, 4.5% coupon at $102',
    price: 102,
    couponRate: 4.5,
    maturity: 10,
  },
  'slide23_B': {
    name: 'Slide 23 Bond B',
    description: '10-year, 3.75% coupon at $98',
    price: 98,
    couponRate: 3.75,
    maturity: 10,
  },
  'custom': {
    name: 'Custom',
    description: 'Enter your own values',
    price: 100,
    couponRate: 5,
    maturity: 5,
  },
};

type PresetKey = keyof typeof presets;

export default function YieldCalculator() {
  const [preset, setPreset] = useState<PresetKey>('slide25');
  const [price, setPrice] = useState(presets.slide25.price);
  const [couponRate, setCouponRate] = useState(presets.slide25.couponRate);
  const [maturity, setMaturity] = useState(presets.slide25.maturity);
  const [faceValue] = useState(100);

  // Calculate YTM
  const ytm = useMemo(() => {
    return calculateYTM(price, couponRate / 100, maturity, faceValue);
  }, [price, couponRate, maturity, faceValue]);

  // Get cash flow breakdown at this yield
  const breakdown = useMemo(() => {
    return priceBondAtYield(couponRate / 100, maturity, ytm, faceValue);
  }, [couponRate, maturity, ytm, faceValue]);

  // Classify bond
  const bondType = useMemo(() => {
    return classifyBond(price, faceValue);
  }, [price, faceValue]);

  // Load preset
  const loadPreset = (key: PresetKey) => {
    setPreset(key);
    const p = presets[key];
    setPrice(p.price);
    setCouponRate(p.couponRate);
    setMaturity(p.maturity);
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-medium mb-4">Computing Yields</h2>
        <p className="text-muted leading-relaxed">
          Given a bond's price, coupon, and maturity, calculate its yield-to-maturity (YTM).
          The yield is the single discount rate that makes the present value of cash flows equal the price.
        </p>
      </section>

      {/* Formula */}
      <section className="p-6 rounded-xl bg-surface border border-subtle">
        <h3 className="text-sm font-medium text-muted uppercase tracking-wide mb-4">The Formula</h3>
        <div className="font-mono text-center text-lg bg-paper p-4 rounded border border-subtle">
          P = Σ CF / (1 + y/2)<sup>t</sup>  →  Solve for y
        </div>
        <p className="text-sm text-muted text-center mt-3">
          The yield is the IRR of the bond's cash flows. We use numerical methods to solve.
        </p>
      </section>

      {/* Preset selector */}
      <section>
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(presets) as PresetKey[]).map((key) => (
            <button
              key={key}
              onClick={() => loadPreset(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                preset === key
                  ? 'bg-columbia text-white'
                  : 'bg-surface border border-subtle text-main hover:bg-columbia/10'
              }`}
            >
              {presets[key].name}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted mt-2">{presets[preset].description}</p>
      </section>

      {/* Inputs */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="p-6 rounded-xl bg-surface border border-subtle space-y-4">
          <h3 className="font-medium">Price</h3>
          <input
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
              setPreset('custom');
            }}
            step="0.01"
            min="1"
            max="200"
            className="w-full px-3 py-2 rounded-lg border border-subtle bg-paper focus:outline-none focus:border-columbia text-lg"
          />
          <p className="text-xs text-muted">Current market price ($)</p>
        </div>

        <div className="p-6 rounded-xl bg-surface border border-subtle space-y-4">
          <h3 className="font-medium">Coupon Rate</h3>
          <input
            type="number"
            value={couponRate}
            onChange={(e) => {
              setCouponRate(Number(e.target.value));
              setPreset('custom');
            }}
            step="0.25"
            min="0"
            max="20"
            className="w-full px-3 py-2 rounded-lg border border-subtle bg-paper focus:outline-none focus:border-columbia text-lg"
          />
          <p className="text-xs text-muted">Annual coupon rate (%)</p>
        </div>

        <div className="p-6 rounded-xl bg-surface border border-subtle space-y-4">
          <h3 className="font-medium">Maturity</h3>
          <select
            value={maturity}
            onChange={(e) => {
              setMaturity(Number(e.target.value));
              setPreset('custom');
            }}
            className="w-full px-3 py-2 rounded-lg border border-subtle bg-paper focus:outline-none focus:border-columbia text-lg"
          >
            {[1, 2, 3, 5, 7, 10, 20, 30].map((y) => (
              <option key={y} value={y}>{y} year{y !== 1 ? 's' : ''}</option>
            ))}
          </select>
          <p className="text-xs text-muted">Time to maturity</p>
        </div>
      </section>

      {/* Result */}
      <section className="p-6 rounded-xl bg-columbia/10 border border-columbia/20">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-medium text-muted uppercase tracking-wide mb-2">Yield-to-Maturity</h3>
            <div className="text-4xl font-medium text-columbia">
              {formatPercent(ytm)}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted uppercase tracking-wide mb-2">Bond Type</h3>
            <div className={`text-2xl font-medium capitalize ${
              bondType === 'premium' ? 'text-green-600' :
              bondType === 'discount' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {bondType}
            </div>
            <p className="text-xs text-muted mt-1">
              {bondType === 'premium' && 'Price > Face Value → Coupon > Yield'}
              {bondType === 'discount' && 'Price < Face Value → Coupon < Yield'}
              {bondType === 'par' && 'Price ≈ Face Value → Coupon ≈ Yield'}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted uppercase tracking-wide mb-2">Verification</h3>
            <p className="text-sm">
              Price at yield: {formatCurrency(breakdown.price)}
            </p>
            <p className="text-xs text-muted mt-1">
              {Math.abs(breakdown.price - price) < 0.01 ? '✓ Matches input price' : '≈ Close to input price'}
            </p>
          </div>
        </div>
      </section>

      {/* Cash flow breakdown */}
      <section className="p-6 rounded-xl bg-surface border border-subtle">
        <h3 className="font-medium mb-4">Cash Flow Breakdown at YTM = {formatPercent(ytm)}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-subtle">
                <th className="text-left py-2 pr-4 text-muted font-medium">Period</th>
                <th className="text-right py-2 px-4 text-muted font-medium">Cash Flow</th>
                <th className="text-right py-2 px-4 text-muted font-medium">Discount Factor</th>
                <th className="text-right py-2 pl-4 text-muted font-medium">Present Value</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.breakdown.slice(0, 10).map((row, idx) => (
                <tr key={idx} className="border-b border-subtle/50">
                  <td className="py-2 pr-4">{row.years}y</td>
                  <td className="text-right py-2 px-4">{formatCurrency(row.cashFlow)}</td>
                  <td className="text-right py-2 px-4">{row.discountFactor.toFixed(4)}</td>
                  <td className="text-right py-2 pl-4">{formatCurrency(row.presentValue)}</td>
                </tr>
              ))}
              {breakdown.breakdown.length > 10 && (
                <tr className="text-muted">
                  <td colSpan={4} className="py-2 text-center">... {breakdown.breakdown.length - 10} more periods ...</td>
                </tr>
              )}
              <tr className="font-medium">
                <td colSpan={3} className="py-2 pr-4 text-right">Total:</td>
                <td className="text-right py-2 pl-4 text-columbia">{formatCurrency(breakdown.price)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Comparison insight for slide 23 */}
      {(preset === 'slide23_A' || preset === 'slide23_B') && (
        <section className="p-6 rounded-xl bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium text-yellow-800 mb-3">Slide 23 Comparison</h3>
          <p className="text-sm text-yellow-800 mb-4">
            Both bonds have the same 10-year maturity, but which is the better deal?
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded bg-white border border-yellow-200">
              <div className="font-medium">Bond A: 4.5% coupon @ $102</div>
              <div className="text-sm text-muted">
                YTM ≈ {formatPercent(calculateYTM(102, 0.045, 10, 100))}
              </div>
            </div>
            <div className="p-4 rounded bg-white border border-yellow-200">
              <div className="font-medium">Bond B: 3.75% coupon @ $98</div>
              <div className="text-sm text-muted">
                YTM ≈ {formatPercent(calculateYTM(98, 0.0375, 10, 100))}
              </div>
            </div>
          </div>
          <p className="text-sm text-yellow-800 mt-4">
            <strong>Answer:</strong> Compare yields, not prices or coupons! The higher-yielding bond offers the better return.
          </p>
        </section>
      )}

      {/* Premium/Par/Discount explanation */}
      <section className="p-6 rounded-xl bg-surface border border-subtle">
        <h3 className="font-medium mb-4">Premium, Par, and Discount Bonds</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-subtle">
                <th className="text-left py-2 pr-4 font-medium">Type</th>
                <th className="text-left py-2 px-4 font-medium">Price vs. Face</th>
                <th className="text-left py-2 pl-4 font-medium">Coupon vs. Yield</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-subtle/50">
                <td className="py-2 pr-4 text-green-600 font-medium">Premium</td>
                <td className="py-2 px-4">Price &gt; $100</td>
                <td className="py-2 pl-4">Coupon &gt; Yield</td>
              </tr>
              <tr className="border-b border-subtle/50">
                <td className="py-2 pr-4 text-gray-600 font-medium">Par</td>
                <td className="py-2 px-4">Price = $100</td>
                <td className="py-2 pl-4">Coupon = Yield</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-red-600 font-medium">Discount</td>
                <td className="py-2 px-4">Price &lt; $100</td>
                <td className="py-2 pl-4">Coupon &lt; Yield</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
