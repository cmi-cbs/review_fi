interface UseCasesProps {
  onNext: () => void;
}

const useCases = [
  {
    role: 'Portfolio Manager',
    question: 'Which bond is a better deal?',
    scenario: 'You have $1M to invest. Bond A offers a 4.5% coupon at $102, Bond B offers 3.75% at $98. Same maturity.',
    insight: 'You need to compare yields, not prices or coupons alone.',
  },
  {
    role: 'Corporate Treasurer',
    question: 'What price should we issue at?',
    scenario: 'Your company wants to issue a 5-year bond with a 4% coupon. Current spot rates range from 3.8% to 4.2%.',
    insight: 'Pricing requires discounting each cash flow by its corresponding spot rate.',
  },
  {
    role: 'Risk Manager',
    question: 'How much will we lose if rates rise?',
    scenario: 'Your bond portfolio is worth $50M. The Fed signals rate hikes.',
    insight: 'Bond prices and interest rates move inversely. Understanding this relationship is critical.',
  },
  {
    role: 'Trader',
    question: 'Is this bond mispriced?',
    scenario: 'A bond is trading at $97.50, but your model says it should be $98.02 based on the spot curve.',
    insight: 'Arbitrage opportunities arise when market prices deviate from theoretical prices.',
  },
];

export default function UseCases({ onNext }: UseCasesProps) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-medium mb-4">Why Learn Bond Math?</h2>
        <p className="text-muted leading-relaxed">
          Bond math isn't just academic. Every day, professionals across finance rely on these
          calculations to make real decisions worth millions of dollars.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {useCases.map((useCase, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-surface border border-subtle"
          >
            <div className="text-xs font-medium text-columbia uppercase tracking-wide mb-2">
              {useCase.role}
            </div>
            <h3 className="text-lg font-medium mb-3">{useCase.question}</h3>
            <p className="text-sm text-muted mb-4">{useCase.scenario}</p>
            <p className="text-sm font-medium text-columbia">{useCase.insight}</p>
          </div>
        ))}
      </section>

      <section className="p-6 rounded-xl bg-columbia/10 border border-columbia/20">
        <h3 className="text-lg font-medium mb-3">The Core Questions</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-columbia text-white flex items-center justify-center text-xs font-medium">1</span>
            <div>
              <span className="font-medium">Spot Rate vs. Yield</span>
              <span className="text-muted"> — What's the difference, and why does it matter?</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-columbia text-white flex items-center justify-center text-xs font-medium">2</span>
            <div>
              <span className="font-medium">Bond Pricing</span>
              <span className="text-muted"> — How do we calculate a bond's fair value from spot rates?</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-columbia text-white flex items-center justify-center text-xs font-medium">3</span>
            <div>
              <span className="font-medium">Yield Calculation</span>
              <span className="text-muted"> — Given a price, how do we find the yield?</span>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-lg bg-columbia text-white font-medium hover:bg-columbia-600 transition-colors"
        >
          Start with Spot vs. Yield →
        </button>
      </div>
    </div>
  );
}
