import PageLayout from '../components/PageLayout';
import MathFormula from '../components/Math';

export default function BondBasics() {
  return (
    <PageLayout
      title="Bond Basics"
      concept="This refresher covers the mathematical foundations of fixed income. We start with the key insight: buying a bond is lending money."
    >
      <div className="space-y-6">
        {/* Key Insight 1 */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-columbia uppercase tracking-wide mb-3">Key Insight</div>
          <h3 className="text-xl font-medium text-main mb-3">Buying a Bond = Lending Money</h3>
          <p className="text-main leading-relaxed">
            When you buy a bond, you are lending money to the issuer (a government or corporation).
            In return, they promise to pay you interest (coupons) and return your principal at maturity.
          </p>
        </div>

        {/* Key Insight 2 */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-columbia uppercase tracking-wide mb-3">The Inverse Relationship</div>
          <h3 className="text-xl font-medium text-main mb-3">When Interest Rates Rise, Bond Prices Fall</h3>
          <p className="text-main leading-relaxed mb-4">
            A bond price is what you pay today to receive money in the future.
            If interest rates are high, you don't need to set aside as much today to reach your target.
            Higher rates → pay less today → lower price.
          </p>
          <div className="flex justify-center">
            <div className="font-mono text-lg">
              <MathFormula display>{"P = \\sum_{t=1}^{T} \\frac{CF_t}{(1+r)^t}"}</MathFormula>
            </div>
          </div>
          <p className="text-sm text-muted text-center mt-3">
            As <MathFormula>{"r"}</MathFormula> increases, the denominator grows, so <MathFormula>{"P"}</MathFormula> decreases.
          </p>
        </div>

      </div>
    </PageLayout>
  );
}
