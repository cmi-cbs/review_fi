import PageLayout from '../components/PageLayout';

export default function BondBasics() {
  return (
    <PageLayout
      title="Bond Basics"
      concept="Before diving into the math, let's build intuition for what bonds are and how they behave."
    >
      <div className="space-y-6">
        {/* Concept 1: Buying a bond = lending */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <h3 className="text-lg font-medium text-main mb-3">Buying a Bond = Lending Your Money</h3>
          <p className="text-muted leading-relaxed mb-5">
            When you buy a bond, you're the lender. The issuer (a company or government) is borrowing from you. They promise to pay you back the principal at maturity, plus periodic interest along the way.
          </p>
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 p-4 rounded-lg bg-surface border border-subtle text-center">
              <div className="font-medium">You (Bondholder)</div>
              <div className="text-xs text-muted mt-1">The Lender</div>
            </div>
            <div className="flex flex-col items-center text-muted text-xs px-2">
              <span>→</span>
              <span className="my-1">Give money now,</span>
              <span>get it back + interest</span>
              <span>→</span>
            </div>
            <div className="flex-1 p-4 rounded-lg bg-surface border border-subtle text-center">
              <div className="font-medium">Issuer</div>
              <div className="text-xs text-muted mt-1">The Borrower</div>
            </div>
          </div>
        </div>

        {/* Concept 2: Price-yield inverse relationship */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <h3 className="text-lg font-medium text-main mb-3">Why Bond Prices Fall When Interest Rates Rise</h3>
          <p className="text-muted leading-relaxed mb-5">
            Imagine you bought a bond paying 3% interest. Then new bonds start paying 5%. Who would want your old 3% bond at full price? Nobody. You'd have to sell it at a discount to make it attractive.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-surface border border-subtle">
              <div className="font-medium text-red-600 mb-2">Interest Rates ↑</div>
              <div className="text-sm text-muted">Your old bond's fixed payments become less attractive.</div>
              <div className="mt-3 font-medium text-red-600">Bond Price ↓</div>
            </div>
            <div className="p-4 rounded-lg bg-surface border border-subtle">
              <div className="font-medium text-green-600 mb-2">Interest Rates ↓</div>
              <div className="text-sm text-muted">Your old bond's fixed payments become more attractive.</div>
              <div className="mt-3 font-medium text-green-600">Bond Price ↑</div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
