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

  return (
    <PageLayout
      title="What is a Bond?"
      concept="A bond is a loan with three defining features: the par value (what you get back), the coupon (periodic interest), and the maturity (when it ends)."
    >
      <div className="space-y-8">
        {/* Feature cards */}
        <div className="grid grid-cols-3 gap-4">
          {features.map((feature) => {
            const isActive = highlighted === feature.id;
            const styles = featureStyles[feature.id];
            return (
              <button
                key={feature.id}
                onMouseEnter={() => setHighlighted(feature.id)}
                onMouseLeave={() => setHighlighted(null)}
                onClick={() => setHighlighted(highlighted === feature.id ? null : feature.id)}
                className="p-4 rounded-xl text-left transition-all"
                style={{
                  backgroundColor: isActive ? styles.bg : '#F2F0E8',
                  border: `2px solid ${isActive ? styles.border : '#E0DFD5'}`,
                }}
              >
                <div
                  className="font-medium mb-1"
                  style={{ color: isActive ? styles.text : '#2A2F36' }}
                >
                  {feature.label}
                </div>
                <div className="text-xs text-muted">{feature.description}</div>
              </button>
            );
          })}
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
                  transform: `translateY(-50%) ${highlighted === 'coupon' ? 'scale(1.1)' : ''}`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium"
                  style={{
                    backgroundColor: highlighted === 'coupon' ? '#DCFCE7' : '#F2F0E8',
                    border: highlighted === 'coupon' ? 'none' : '1px solid #E0DFD5',
                    color: highlighted === 'coupon' ? '#15803D' : '#2A2F36',
                  }}
                >
                  C
                </div>
                <div className="text-xs text-muted mt-2 text-center">{i * 0.5}y</div>
              </div>
            ))}

            {/* Final payment (coupon + par) */}
            <div
              className="absolute top-1/2 -translate-y-1/2 right-0 transition-all"
              style={{
                transform: `translateY(-50%) ${highlighted === 'maturity' || highlighted === 'par' ? 'scale(1.1)' : ''}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex flex-col items-center justify-center text-xs font-medium"
                style={{
                  backgroundColor:
                    highlighted === 'maturity'
                      ? '#FEF3C7'
                      : highlighted === 'par'
                      ? '#DBEAFE'
                      : '#F2F0E8',
                  border:
                    highlighted === 'maturity' || highlighted === 'par'
                      ? 'none'
                      : '1px solid #E0DFD5',
                  color:
                    highlighted === 'maturity'
                      ? '#B45309'
                      : highlighted === 'par'
                      ? '#1D4ED8'
                      : '#2A2F36',
                }}
              >
                <span>C</span>
                <span className={highlighted === 'par' ? 'font-bold' : ''}>+100</span>
              </div>
              <div
                className="text-xs mt-2 text-center font-medium px-2 py-0.5 rounded"
                style={{
                  backgroundColor: highlighted === 'maturity' ? '#FEF3C7' : 'transparent',
                  color: highlighted === 'maturity' ? '#B45309' : '#666A70',
                }}
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
