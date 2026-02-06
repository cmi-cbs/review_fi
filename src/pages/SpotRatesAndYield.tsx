import PageLayout from '../components/PageLayout';
import MathFormula from '../components/Math';

export default function SpotRatesAndYield() {
  return (
    <PageLayout
      title="Spot Rates & Yield"
      concept="Spot rates and yield-to-maturity (YTM) are two ways to express interest rates. They're related but serve different purposes."
    >
      <div className="space-y-6">
        {/* Bank Analogy */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-columbia uppercase tracking-wide mb-3">The Bank Analogy</div>
          <p className="text-main leading-relaxed mb-4">
            Think of a bank that offers different deposit rates for different maturities.
            You might get 4% for a 1-year CD, 4.5% for a 2-year CD, and 5% for a 3-year CD.
          </p>
          <div className="flex justify-center gap-4">
            <div className="text-center p-3 rounded-lg bg-surface border border-subtle">
              <div className="text-2xl font-medium text-columbia">
                <MathFormula>{"r_1"}</MathFormula> = 4%
              </div>
              <div className="text-xs text-muted mt-1">1-year</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-surface border border-subtle">
              <div className="text-2xl font-medium text-columbia">
                <MathFormula>{"r_2"}</MathFormula> = 4.5%
              </div>
              <div className="text-xs text-muted mt-1">2-year</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-surface border border-subtle">
              <div className="text-2xl font-medium text-columbia">
                <MathFormula>{"r_3"}</MathFormula> = 5%
              </div>
              <div className="text-xs text-muted mt-1">3-year</div>
            </div>
          </div>
          <p className="text-sm text-muted text-center mt-4">
            These are <strong>spot rates</strong>: the rate for lending from today to a specific future date.
          </p>
        </div>

        {/* Spot Rates */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-columbia uppercase tracking-wide mb-3">Spot Rates</div>
          <p className="text-main leading-relaxed mb-3">
            A spot rate <MathFormula>{"r_n"}</MathFormula> is the interest rate for a zero-coupon loan from today until time <MathFormula>{"n"}</MathFormula>.
            Each maturity has its own spot rate, forming the <strong>term structure</strong> of interest rates.
          </p>
          <div className="flex justify-center">
            <div className="font-mono">
              <MathFormula display>{"\\delta_n = \\frac{1}{(1 + r_n/2)^{2n}}"}</MathFormula>
            </div>
          </div>
          <p className="text-sm text-muted text-center mt-2">
            Spot rates determine discount factors
          </p>
        </div>

        {/* Yield-to-Maturity */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-columbia uppercase tracking-wide mb-3">Yield-to-Maturity (YTM)</div>
          <p className="text-main leading-relaxed mb-3">
            YTM is the single discount rate that makes a bond's price equal its discounted cash flows.
            It's the <strong>expected return</strong> if you hold to maturity and reinvest coupons at the same rate.
          </p>
          <div className="flex justify-center">
            <div className="font-mono">
              <MathFormula display>{"P = \\sum_{t=1}^{T} \\frac{CF_t}{(1 + y/2)^{2t}}"}</MathFormula>
            </div>
          </div>
        </div>

        {/* Key Difference */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface border border-subtle">
            <div className="text-sm font-medium text-main mb-2">Spot Rates</div>
            <ul className="text-sm text-muted space-y-1">
              <li>• One per maturity</li>
              <li>• Market-wide</li>
              <li>• Different rate for each cash flow</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-subtle">
            <div className="text-sm font-medium text-main mb-2">Yield (YTM)</div>
            <ul className="text-sm text-muted space-y-1">
              <li>• One per bond</li>
              <li>• Bond-specific</li>
              <li>• Same rate for all cash flows</li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-muted text-center">
          For zero-coupon bonds, spot rate = yield (since there's only one cash flow).
        </p>
      </div>
    </PageLayout>
  );
}
