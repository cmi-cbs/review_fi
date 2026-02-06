import { useState } from 'react';
import PageLayout from '../components/PageLayout';

type Feature = 'par' | 'coupon' | 'maturity' | null;

const featureStyles = {
  par: { bg: '#DBEAFE', border: '#3B82F6', text: '#1D4ED8' },
  coupon: { bg: '#DCFCE7', border: '#22C55E', text: '#15803D' },
  maturity: { bg: '#FEF3C7', border: '#F59E0B', text: '#B45309' },
};

export default function WhatIsABond() {
  const [highlighted, setHighlighted] = useState<Feature>(null);

  const features = [
    {
      id: 'par' as const,
      label: 'Par Value',
      description: 'The face value you receive at maturity. Usually $100 or $1,000.',
    },
    {
      id: 'coupon' as const,
      label: 'Coupon',
      description: 'Periodic interest payments, typically semi-annual in the U.S.',
    },
    {
      id: 'maturity' as const,
      label: 'Maturity',
      description: 'The date when the bond expires and par value is repaid.',
    },
  ];

  const getCardStyle = (id: Feature) => {
    if (highlighted === id && id) {
      const style = featureStyles[id];
      return {
        backgroundColor: style.bg,
        borderColor: style.border,
        borderWidth: '2px',
      };
    }
    return {
      backgroundColor: 'var(--color-warm-surface)',
      borderColor: 'var(--color-border-subtle)',
      borderWidth: '2px',
    };
  };

  const getTextStyle = (id: Feature) => {
    if (highlighted === id && id) {
      return { color: featureStyles[id].text };
    }
    return {};
  };

  return (
    <PageLayout
      title="What is a Bond?"
      concept="A bond is a loan with three defining features: the par value (what you get back), the coupon (periodic interest), and the maturity (when it ends)."
    >
      <div className="space-y-8">
        {/* Feature cards */}
        <div className="grid grid-cols-3 gap-4">
          {features.map((feature) => (
            <button
              key={feature.id}
              onMouseEnter={() => setHighlighted(feature.id)}
              onMouseLeave={() => setHighlighted(null)}
              onClick={() => setHighlighted(highlighted === feature.id ? null : feature.id)}
              className="p-4 rounded-xl transition-all text-left"
              style={getCardStyle(feature.id)}
            >
              <div className="font-medium mb-1" style={getTextStyle(feature.id)}>
                {feature.label}
              </div>
              <div className="text-xs text-muted">{feature.description}</div>
            </button>
          ))}
        </div>

        {/* Cash flow timeline */}
        <div className="p-6 rounded-xl bg-surface border border-subtle">
          <div className="text-xs text-muted uppercase tracking-wide mb-4">Cash Flow Timeline</div>

          <div className="relative h-32">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-subtle" />

            {/* Today marker */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <div className="w-3 h-3 rounded-full bg-columbia" />
              <div className="text-xs text-muted mt-2">Today</div>
            </div>

            {/* Coupon payments */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 transition-all"
                style={{
                  left: `${i * 20}%`,
                  transform: `translateY(-50%) ${highlighted === 'coupon' ? 'scale(1.1)' : 'scale(1)'}`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-colors"
                  style={
                    highlighted === 'coupon'
                      ? { backgroundColor: featureStyles.coupon.bg, color: featureStyles.coupon.text }
                      : { backgroundColor: 'var(--color-warm-surface)', border: '1px solid var(--color-border-subtle)' }
                  }
                >
                  C
                </div>
                <div className="text-xs text-muted mt-2 text-center">{i * 0.5}y</div>
              </div>
            ))}

            {/* Final payment (coupon + par) */}
            <div
              className="absolute top-1/2 right-0 transition-all"
              style={{
                transform: `translateY(-50%) ${highlighted === 'par' ? 'scale(1.1)' : 'scale(1)'}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-colors"
                style={
                  highlighted === 'par'
                    ? { backgroundColor: featureStyles.par.bg, color: featureStyles.par.text }
                    : { backgroundColor: 'var(--color-warm-surface)', border: '1px solid var(--color-border-subtle)' }
                }
              >
                <span>C</span>
                <span className={highlighted === 'par' ? 'font-bold' : ''}>+100</span>
              </div>
              {/* 2y label - highlights on maturity */}
              <div
                className="text-xs mt-2 text-center px-2 py-0.5 rounded transition-colors"
                style={
                  highlighted === 'maturity'
                    ? { backgroundColor: featureStyles.maturity.bg, color: featureStyles.maturity.text, fontWeight: 600 }
                    : { color: 'var(--color-text-muted)' }
                }
              >
                2y
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 text-xs text-muted">
            <span><strong>C</strong> = Coupon payment</span>
            <span><strong>100</strong> = Par value</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
