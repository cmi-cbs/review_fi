import PageLayout from '../components/PageLayout';
import MathFormula from '../components/Math';

export default function SpotRatesAndYield() {
  return (
    <PageLayout
      title="Spot Rates vs. Yield"
      concept="These two terms are very confusing. Here's the difference: spot rates are the market's discount rates (one per maturity), while yield is a single summary rate for a specific bond."
    >
      <div className="space-y-6">
        {/* The Bank Analogy */}
        <div className="p-6 rounded-xl bg-columbia/10 border border-columbia/20">
          <h3 className="text-lg font-medium text-columbia mb-3">The Bank Analogy</h3>
          <p className="text-main leading-relaxed">
            Your bank offers you a 3-year locked savings account, but with a weird feature:
            the interest rate changes each year. You earn 3% the first year, 4% the second,
            5% the third. <strong>Those are your spot rates.</strong>
          </p>
          <p className="text-main leading-relaxed mt-3">
            Now a different bank says "I'll give you one fixed rate for all 3 years,
            and you'll end up with the exact same balance at the end."
            <strong> That fixed rate is your yield.</strong>
          </p>
        </div>

        {/* Definitions side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-surface border border-subtle">
            <h4 className="font-medium text-main mb-2">Spot Rate</h4>
            <p className="text-sm text-muted mb-3">
              The yield on a <strong>zero-coupon bond</strong> of a specific maturity.
              We use spot rates for discounting cash flows.
            </p>
            <div className="text-sm text-muted">
              <div className="flex justify-between py-1 border-b border-subtle">
                <span>1-year spot rate <span className="text-blue-600 font-mono">r1</span>:</span>
                <span className="font-mono">3.0%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-subtle">
                <span>2-year spot rate <span className="text-green-600 font-mono">r2</span>:</span>
                <span className="font-mono">4.0%</span>
              </div>
              <div className="flex justify-between py-1">
                <span>3-year spot rate <span className="text-amber-600 font-mono">r3</span>:</span>
                <span className="font-mono">5.0%</span>
              </div>
            </div>
            <p className="text-xs text-muted mt-3">
              One rate per maturity. Market-wide.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-subtle">
            <h4 className="font-medium text-main mb-2">Yield (YTM)</h4>
            <p className="text-sm text-muted mb-3">
              The <strong>expected return</strong> on a bond if you hold it to maturity.
              A single rate that summarizes all cash flows.
            </p>
            <div className="text-sm text-muted">
              <div className="flex justify-between py-1 border-b border-subtle">
                <span>3-year bond, 4% coupon:</span>
                <span className="font-mono text-purple-600">y = 4.2%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-subtle">
                <span>3-year bond, 6% coupon:</span>
                <span className="font-mono text-purple-600">y = 4.5%</span>
              </div>
              <div className="flex justify-between py-1">
                <span>3-year zero-coupon:</span>
                <span className="font-mono text-purple-600">y = 5.0%</span>
              </div>
            </div>
            <p className="text-xs text-muted mt-3">
              One rate per bond. Depends on coupon timing.
            </p>
          </div>
        </div>

        {/* The Connection with colored formulas */}
        <div className="p-5 rounded-xl bg-surface border border-subtle">
          <h4 className="font-medium text-main mb-3">The Connection</h4>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-muted mb-2">
                <strong>Pricing uses spot rates:</strong> Each cash flow is discounted by its own spot rate.
              </p>
              <div className="text-xs bg-paper p-3 rounded">
                <MathFormula display>{"P = \\frac{C}{(1+{\\color{blue}r_1})} + \\frac{C}{(1+{\\color{green}r_2})^2} + \\frac{C+100}{(1+{\\color{orange}r_3})^3}"}</MathFormula>
              </div>
            </div>
            <div>
              <p className="text-muted mb-2">
                <strong>YTM is the average:</strong> A single rate that gives the same price.
              </p>
              <div className="text-xs bg-paper p-3 rounded">
                <MathFormula display>{"P = \\frac{C}{(1+{\\color{purple}y})} + \\frac{C}{(1+{\\color{purple}y})^2} + \\frac{C+100}{(1+{\\color{purple}y})^3}"}</MathFormula>
              </div>
            </div>
          </div>
        </div>

        {/* Special case - not as footnote */}
        <div className="p-5 rounded-xl bg-columbia/10 border border-columbia/20">
          <h4 className="font-medium text-columbia mb-2">Special Case: Zero-Coupon Bonds</h4>
          <p className="text-main">
            For a zero-coupon bond, the spot rate and yield are identical.
            There's only one cash flow, so there's nothing to "average" over.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
