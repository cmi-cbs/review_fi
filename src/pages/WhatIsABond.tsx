import { useState } from 'react';
import PageLayout from '../components/PageLayout';

type Feature = 'par' | 'coupon' | 'maturity' | null;

export default function WhatIsABond() {
  const [highlighted, setHighlighted] = useState<Feature>(null);

  const features = [
    {
      id: 'par' as const,
      label: 'Par Value',
      description: 'The face value you receive at maturity. Usually $100 or $1,000.',
      color: 'bg-blue-100 border-blue-300',
      highlight: 'text-blue-600',
    },
    {
      id: 'coupon' as const,
      label: 'Coupon',
      description: 'Periodic interest payments, typically semi-annual in the U.S.',
      color: 'bg-green-100 border-green-300',
      highlight: 'text-green-600',
    },
    {
      id: 'maturity' as const,
      label: 'Maturity',
      description: 'The date when the bond expires and par value is repaid.',
      color: 'bg-amber-100 border-amber-300',
      highlight: 'text-amber-600',
    },
  ];

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
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                highlighted === feature.id ? feature.color : 'bg-surface border-subtle'
              }`}
            >
              <div className={`font-medium mb-1 ${highlighted === feature.id ? feature.highlight : ''}`}>
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
                className={`absolute top-1/2 -translate-y-1/2 transition-all ${
                  highlighted === 'coupon' ? 'scale-110' : ''
                }`}
                style={{ left: `${i * 20}%` }}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                  highlighted === 'coupon' ? 'bg-green-100 text-green-700' : 'bg-surface border border-subtle'
                }`}>
                  C
                </div>
                <div className="text-xs text-muted mt-2 text-center">{i * 0.5}y</div>
              </div>
            ))}

            {/* Final payment (coupon + par) */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 right-0 transition-all ${
                highlighted === 'maturity' || highlighted === 'par' ? 'scale-110' : ''
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center text-xs font-medium ${
                highlighted === 'maturity'
                  ? 'bg-amber-100 text-amber-700'
                  : highlighted === 'par'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-surface border border-subtle'
              }`}>
                <span>C</span>
                <span className={highlighted === 'par' ? 'font-bold' : ''}>+100</span>
              </div>
              <div className="text-xs text-muted mt-2 text-center">2y</div>
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
