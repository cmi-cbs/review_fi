import { useState, useMemo } from 'react';
import PageLayout from '../components/PageLayout';
import MathFormula from '../components/Math';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function SemiAnnualCompounding() {
  const [rate, setRate] = useState(5);

  const data = useMemo(() => {
    const years = [1, 2, 3, 4, 5];
    return years.map((year) => {
      const annual = 100 * window.Math.pow(1 + rate / 100, year);
      const semiAnnual = 100 * window.Math.pow(1 + rate / 100 / 2, year * 2);
      return {
        year: `Year ${year}`,
        annual: annual,
        semiAnnual: semiAnnual,
        difference: semiAnnual - annual,
      };
    });
  }, [rate]);

  const maxValue = window.Math.ceil(data[4].semiAnnual / 5) * 5;
  const yTicks = [];
  for (let v = 100; v <= maxValue; v += 5) {
    yTicks.push(v);
  }

  return (
    <PageLayout
      title="Semi-Annual Compounding"
      concept={`In the U.S., bond interest compounds twice a year. A "${rate}% rate" means ${(rate / 2).toFixed(1)}% every 6 months, and you earn interest on your interest.`}
    >
      <div className="space-y-6">
        {/* Rate slider */}
        <div className="p-4 rounded-xl bg-surface border border-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">Annual Rate</span>
            <span className="text-lg font-medium text-columbia">{rate}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-columbia"
          />
        </div>

        {/* Comparison chart */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-muted uppercase tracking-wide mb-4">Growth of $100 at {rate}%</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0DFD5" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis
                  domain={[100, maxValue]}
                  ticks={yTicks}
                  tickFormatter={(v) => `$${v}`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value, name) => [
                    `$${Number(value).toFixed(2)}`,
                    name === 'annual' ? 'Annual' : 'Semi-Annual',
                  ]}
                />
                <Bar dataKey="annual" name="annual" radius={[4, 4, 0, 0]}>
                  {data.map((_, index) => (
                    <Cell key={index} fill="#94a3b8" />
                  ))}
                </Bar>
                <Bar dataKey="semiAnnual" name="semiAnnual" radius={[4, 4, 0, 0]}>
                  {data.map((_, index) => (
                    <Cell key={index} fill="#6F7F99" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#94a3b8]" />
              <span className="text-muted">Annual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-columbia" />
              <span className="text-muted">Semi-Annual</span>
            </div>
          </div>
        </div>

        {/* Math formulas with X and checkmark */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface border border-subtle">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 text-lg">✗</span>
              <span className="text-xs text-muted uppercase tracking-wide">Annual</span>
            </div>
            <div className="text-center">
              <MathFormula display>{`\\$100 \\times (1 + ${rate}\\%)^1 = \\$${(100 * (1 + rate / 100)).toFixed(2)}`}</MathFormula>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-columbia/10 border border-columbia/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-500 text-lg">✓</span>
              <span className="text-xs text-columbia uppercase tracking-wide">Semi-Annual</span>
            </div>
            <div className="text-center">
              <MathFormula display>{`\\$100 \\times (1 + ${rate/2}\\%)^2 = \\$${(100 * window.Math.pow(1 + rate / 100 / 2, 2)).toFixed(2)}`}</MathFormula>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted text-center">
          After 5 years, the extra compounding gives you{' '}
          <span className="font-medium text-columbia">${data[4].difference.toFixed(2)} more</span>
        </div>
      </div>
    </PageLayout>
  );
}
