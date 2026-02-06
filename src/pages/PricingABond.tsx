import { useMemo } from 'react';
import PageLayout from '../components/PageLayout';
import { priceBondWithSpotRates, formatCurrency } from '../utils/bondMath';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Lecture example: 2-year, 4% coupon bond
const couponRate = 0.04;
const maturity = 2;
const spotRates = [0.05, 0.051, 0.052, 0.0505]; // r0.5, r1, r1.5, r2

export default function PricingABond() {
  const result = useMemo(() => {
    return priceBondWithSpotRates(couponRate, maturity, spotRates, 100);
  }, []);

  const chartData = result.breakdown.map((row) => ({
    period: `${row.years}y`,
    cashFlow: row.cashFlow,
    presentValue: row.presentValue,
  }));

  return (
    <PageLayout
      title="Pricing a Bond"
      concept="A bond's price equals the sum of its discounted cash flows. Each coupon and the final principal payment gets multiplied by its discount factor."
    >
      <div className="space-y-6">
        {/* Example bond */}
        <div className="p-4 rounded-xl bg-columbia/10 border border-columbia/20">
          <div className="text-xs text-columbia uppercase tracking-wide mb-2">Example: 2-Year Treasury Note</div>
          <div className="flex gap-6 text-sm">
            <div><span className="text-muted">Coupon:</span> <span className="font-medium">4%</span></div>
            <div><span className="text-muted">Maturity:</span> <span className="font-medium">2 years</span></div>
            <div><span className="text-muted">Face Value:</span> <span className="font-medium">$100</span></div>
          </div>
        </div>

        {/* Cash flow waterfall */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-muted uppercase tracking-wide mb-4">
            Cash Flows → Present Values
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0DFD5" />
                <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value, name) => [
                    formatCurrency(Number(value)),
                    name === 'cashFlow' ? 'Cash Flow' : 'Present Value',
                  ]}
                />
                <Bar dataKey="cashFlow" name="cashFlow" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={index} fill="#cbd5e1" />
                  ))}
                </Bar>
                <Bar dataKey="presentValue" name="presentValue" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={index} fill="#6F7F99" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#cbd5e1]" />
              <span className="text-muted">Cash Flow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-columbia" />
              <span className="text-muted">Present Value</span>
            </div>
          </div>
        </div>

        {/* Breakdown table */}
        <div className="p-4 rounded-xl bg-surface border border-subtle overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted">
                <th className="pb-2">Period</th>
                <th className="pb-2 text-right">Cash Flow</th>
                <th className="pb-2 text-right">Spot Rate</th>
                <th className="pb-2 text-right">Discount Factor</th>
                <th className="pb-2 text-right">Present Value</th>
              </tr>
            </thead>
            <tbody>
              {result.breakdown.map((row, idx) => (
                <tr key={idx} className="border-t border-subtle">
                  <td className="py-2">{row.years}y</td>
                  <td className="py-2 text-right">{formatCurrency(row.cashFlow)}</td>
                  <td className="py-2 text-right">{(row.spotRate * 100).toFixed(2)}%</td>
                  <td className="py-2 text-right font-mono text-xs">{row.discountFactor.toFixed(4)}</td>
                  <td className="py-2 text-right font-medium">{formatCurrency(row.presentValue)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-columbia font-medium">
                <td colSpan={4} className="py-2 text-right">Bond Price =</td>
                <td className="py-2 text-right text-columbia">{formatCurrency(result.price)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Formula */}
        <div className="text-center font-mono text-sm text-muted">
          P = Σ CFₜ × δₜ = {result.breakdown.map((r) => r.presentValue.toFixed(2)).join(' + ')} = {formatCurrency(result.price)}
        </div>
      </div>
    </PageLayout>
  );
}
