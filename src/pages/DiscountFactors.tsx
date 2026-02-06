import PageLayout from '../components/PageLayout';
import MathFormula from '../components/Math';

export default function DiscountFactors() {
  return (
    <PageLayout
      title="Discount Factors"
      concept="A discount factor is the price today of receiving $1 in the future. Think of it as an exchange rate between future dollars and present dollars."
    >
      <div className="space-y-6">
        {/* Exchange Rate Analogy */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-columbia uppercase tracking-wide mb-3">The Exchange Rate Analogy</div>
          <p className="text-main leading-relaxed mb-4">
            Just like you exchange euros for dollars at a rate, you "exchange" future money for present money.
            A discount factor of 0.95 means $1 in the future is worth $0.95 today.
          </p>
          <div className="flex justify-center items-center gap-4 text-lg">
            <div className="p-3 rounded-lg bg-surface border border-subtle text-center">
              <div className="font-medium">$0.95</div>
              <div className="text-xs text-muted">Today</div>
            </div>
            <div className="text-columbia font-medium">→ grows to →</div>
            <div className="p-3 rounded-lg bg-surface border border-subtle text-center">
              <div className="font-medium">$1.00</div>
              <div className="text-xs text-muted">Future</div>
            </div>
          </div>
        </div>

        {/* Formula */}
        <div className="p-4 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-columbia uppercase tracking-wide mb-2">The Formula</div>
          <div className="font-mono text-center text-lg">
            <MathFormula display>{"\\delta_n = \\frac{1}{(1 + r/2)^{2n}}"}</MathFormula>
          </div>
          <div className="text-xs text-muted text-center mt-2">
            where r = annual rate, n = years, and the 2s are for semi-annual compounding
          </div>
        </div>

        {/* Key insight */}
        <div className="text-sm text-muted text-center">
          Higher rates → lower discount factors → money in the future is worth less today
        </div>
      </div>
    </PageLayout>
  );
}
