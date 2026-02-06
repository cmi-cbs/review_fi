import { useState, useMemo } from 'react';
import {
  priceBondWithSpotRates,
  formatPercent,
  formatCurrency,
} from '../utils/bondMath';

// Preset examples from lecture
const presets = {
  'slide20': {
    name: 'Slide 20 Example',
    description: '2-year, 4% coupon bond',
    maturity: 2,
    couponRate: 4,
    spotRates: [5, 5.1, 5.2, 5.05],
    expectedPrice: 98.0216,
  },
  'custom': {
    name: 'Custom',
    description: 'Enter your own values',
    maturity: 2,
    couponRate: 4,
    spotRates: [4, 4.2, 4.4, 4.5],
    expectedPrice: null,
  },
};

type PresetKey = keyof typeof presets;

export default function BondPricing() {
  const [preset, setPreset] = useState<PresetKey>('slide20');
  const [maturity, setMaturity] = useState(presets.slide20.maturity);
  const [couponRate, setCouponRate] = useState(presets.slide20.couponRate);
  const [spotRates, setSpotRates] = useState<number[]>(presets.slide20.spotRates);
  const [faceValue] = useState(100);

  // Generate correct number of spot rate inputs based on maturity
  const numPeriods = Math.round(maturity * 2);

  // Ensure spotRates array matches numPeriods
  useMemo(() => {
    if (spotRates.length !== numPeriods) {
      const newRates = [...spotRates];
      while (newRates.length < numPeriods) {
        newRates.push(newRates[newRates.length - 1] || 4);
      }
      while (newRates.length > numPeriods) {
        newRates.pop();
      }
      setSpotRates(newRates);
    }
  }, [numPeriods, spotRates.length]);

  // Calculate bond price
  const result = useMemo(() => {
    const rates = spotRates.map(r => r / 100); // Convert to decimal
    return priceBondWithSpotRates(couponRate / 100, maturity, rates, faceValue);
  }, [couponRate, maturity, spotRates, faceValue]);

  // Load preset
  const loadPreset = (key: PresetKey) => {
    setPreset(key);
    const p = presets[key];
    setMaturity(p.maturity);
    setCouponRate(p.couponRate);
    setSpotRates([...p.spotRates]);
  };

  // Update individual spot rate
  const updateSpotRate = (index: number, value: number) => {
    const newRates = [...spotRates];
    newRates[index] = value;
    setSpotRates(newRates);
    setPreset('custom');
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-medium mb-4">Computing Bond Prices</h2>
        <p className="text-muted leading-relaxed">
          Given a bond's characteristics and the spot curve, calculate its fair price by discounting
          each cash flow by its corresponding spot rate.
        </p>
      </section>

      {/* Formula */}
      <section className="p-6 rounded-xl bg-surface border border-subtle">
        <h3 className="text-sm font-medium text-muted uppercase tracking-wide mb-4">The Formula</h3>
        <div className="font-mono text-center text-lg bg-paper p-4 rounded border border-subtle">
          P = Σ (C/2) / (1 + r<sub>t</sub>/2)<sup>t</sup> + M / (1 + r<sub>N</sub>/2)<sup>2N</sup>
        </div>
        <p className="text-sm text-muted text-center mt-3">
          Sum each cash flow (coupon or principal) discounted by its spot rate with semi-annual compounding
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
        {presets[preset].expectedPrice && (
          <p className="text-sm text-muted mt-2">
            Expected result: {formatCurrency(presets[preset].expectedPrice!)}
          </p>
        )}
      </section>

      {/* Inputs */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Bond characteristics */}
        <div className="p-6 rounded-xl bg-surface border border-subtle space-y-4">
          <h3 className="font-medium">Bond Characteristics</h3>

          <div>
            <label className="block text-sm text-muted mb-1">Maturity (years)</label>
            <select
              value={maturity}
              onChange={(e) => {
                setMaturity(Number(e.target.value));
                setPreset('custom');
              }}
              className="w-full px-3 py-2 rounded-lg border border-subtle bg-paper focus:outline-none focus:border-columbia"
            >
              {[0.5, 1, 1.5, 2, 2.5, 3, 4, 5].map((y) => (
                <option key={y} value={y}>{y} year{y !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Annual Coupon Rate (%)</label>
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
              className="w-full px-3 py-2 rounded-lg border border-subtle bg-paper focus:outline-none focus:border-columbia"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Face Value ($)</label>
            <input
              type="number"
              value={faceValue}
              disabled
              className="w-full px-3 py-2 rounded-lg border border-subtle bg-paper/50 text-muted"
            />
          </div>
        </div>

        {/* Spot rates */}
        <div className="p-6 rounded-xl bg-surface border border-subtle space-y-4">
          <h3 className="font-medium">Spot Rates (%)</h3>
          <p className="text-xs text-muted">Enter annualized spot rates for each semi-annual period</p>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {spotRates.slice(0, numPeriods).map((rate, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-sm text-muted w-16">{(idx + 1) / 2}y:</span>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => updateSpotRate(idx, Number(e.target.value))}
                  step="0.1"
                  min="0"
                  max="20"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-subtle bg-paper focus:outline-none focus:border-columbia text-sm"
                />
                <span className="text-sm text-muted">%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="p-6 rounded-xl bg-columbia/10 border border-columbia/20">
        <h3 className="font-medium mb-4">Bond Price</h3>
        <div className="text-4xl font-medium text-columbia mb-4">
          {formatCurrency(result.price)}
        </div>

        {/* Cash flow breakdown */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-columbia/20">
                <th className="text-left py-2 pr-4 text-muted font-medium">Period</th>
                <th className="text-right py-2 px-4 text-muted font-medium">Cash Flow</th>
                <th className="text-right py-2 px-4 text-muted font-medium">Spot Rate</th>
                <th className="text-right py-2 px-4 text-muted font-medium">Discount Factor</th>
                <th className="text-right py-2 pl-4 text-muted font-medium">Present Value</th>
              </tr>
            </thead>
            <tbody>
              {result.breakdown.map((row, idx) => (
                <tr key={idx} className="border-b border-columbia/10">
                  <td className="py-2 pr-4">{row.years}y</td>
                  <td className="text-right py-2 px-4">{formatCurrency(row.cashFlow)}</td>
                  <td className="text-right py-2 px-4">{formatPercent(row.spotRate)}</td>
                  <td className="text-right py-2 px-4">{row.discountFactor.toFixed(4)}</td>
                  <td className="text-right py-2 pl-4 font-medium">{formatCurrency(row.presentValue)}</td>
                </tr>
              ))}
              <tr className="font-medium">
                <td colSpan={4} className="py-2 pr-4 text-right">Total:</td>
                <td className="text-right py-2 pl-4 text-columbia">{formatCurrency(result.price)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Verification note */}
      {preset === 'slide20' && (
        <section className="p-4 rounded-lg bg-green-50 border border-green-200">
          <p className="text-sm text-green-800">
            <strong>Verification:</strong> This matches the Slide 20 example from class.
            Price = 1.9512 + 1.9018 + 1.8518 + 92.3169 = $98.0216
          </p>
        </section>
      )}
    </div>
  );
}
