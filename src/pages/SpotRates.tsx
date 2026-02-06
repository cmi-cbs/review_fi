import { useState, useMemo } from 'react';
import PageLayout from '../components/PageLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { discountFactor } from '../utils/bondMath';

type CurveShape = 'normal' | 'inverted' | 'flat' | 'humped';

const curveShapes: { id: CurveShape; label: string; rates: number[] }[] = [
  { id: 'normal', label: 'Normal', rates: [3.5, 4.0, 4.3, 4.5, 4.6, 4.7] },
  { id: 'inverted', label: 'Inverted', rates: [5.5, 5.2, 4.8, 4.5, 4.3, 4.2] },
  { id: 'flat', label: 'Flat', rates: [4.5, 4.5, 4.5, 4.5, 4.5, 4.5] },
  { id: 'humped', label: 'Humped', rates: [3.5, 4.5, 5.0, 4.8, 4.5, 4.3] },
];

const maturities = [0.5, 1, 1.5, 2, 3, 5];

export default function SpotRates() {
  const [shape, setShape] = useState<CurveShape>('normal');

  const currentCurve = curveShapes.find((c) => c.id === shape)!;

  const data = useMemo(() => {
    return maturities.map((years, idx) => ({
      years,
      rate: currentCurve.rates[idx],
      df: discountFactor(currentCurve.rates[idx] / 100, years),
    }));
  }, [currentCurve]);

  return (
    <PageLayout
      title="Spot Rates"
      concept="The spot rate (rₙ) is the interest rate for lending money from today until time n with no intermediate payments. Each maturity has its own spot rate."
    >
      <div className="space-y-6">
        {/* Shape selector */}
        <div className="flex gap-2 justify-center">
          {curveShapes.map((c) => (
            <button
              key={c.id}
              onClick={() => setShape(c.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                shape === c.id
                  ? 'bg-columbia text-white'
                  : 'bg-surface border border-subtle hover:bg-columbia/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Yield curve */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-muted uppercase tracking-wide mb-4">
            Yield Curve ({shape.charAt(0).toUpperCase() + shape.slice(1)})
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0DFD5" />
                <XAxis
                  dataKey="years"
                  tickFormatter={(v) => `${v}y`}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={[3, 6]}
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value) => [`${Number(value).toFixed(2)}%`, 'Spot Rate']}
                  labelFormatter={(label) => `Maturity: ${label} years`}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#6F7F99"
                  strokeWidth={3}
                  dot={{ fill: '#6F7F99', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Discount factors table */}
        <div className="p-4 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-muted uppercase tracking-wide mb-3">
            Corresponding Discount Factors
          </div>
          <div className="flex justify-between">
            {data.map((d) => (
              <div key={d.years} className="text-center">
                <div className="text-xs text-muted">{d.years}y</div>
                <div className="text-sm font-medium text-columbia">{d.rate}%</div>
                <div className="text-xs font-mono text-muted">δ = {d.df.toFixed(3)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interpretation */}
        <div className="text-sm text-muted text-center">
          {shape === 'normal' && 'Normal curve: long-term rates > short-term rates (most common)'}
          {shape === 'inverted' && 'Inverted curve: short-term rates > long-term rates (recession signal)'}
          {shape === 'flat' && 'Flat curve: same rate for all maturities (transitional)'}
          {shape === 'humped' && 'Humped curve: medium-term rates peak (sometimes seen in practice)'}
        </div>
      </div>
    </PageLayout>
  );
}
