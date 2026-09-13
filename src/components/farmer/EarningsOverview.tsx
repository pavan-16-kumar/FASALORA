'use client';

import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

interface WeeklyData {
  day: string;
  amount: number;
}

interface EarningsData {
  thisMonth: number;
  lastMonth: number;
  totalEarnings: number;
  pendingSettlement: number;
  weeklyData: WeeklyData[];
}

interface EarningsOverviewProps {
  data: EarningsData;
}

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function EarningsOverview({ data }: EarningsOverviewProps) {
  const [tab, setTab] = useState<'weekly' | 'monthly'>('weekly');
  const maxAmount = Math.max(...(data.weeklyData.map((d) => d.amount)), 1);

  const summaryCards = [
    { label: 'This Month', value: fmt(data.thisMonth), color: 'var(--green-600)', bg: 'var(--green-50)', border: 'var(--green-100)' },
    { label: 'Last Month',  value: fmt(data.lastMonth), color: 'var(--ink-2)', bg: '#F9FAFB', border: 'var(--border)' },
    { label: 'Total Earnings', value: fmt(data.totalEarnings), color: 'var(--green-700)', bg: 'var(--green-50)', border: 'var(--green-100)' },
    { label: 'Pending Settlement', value: fmt(data.pendingSettlement), color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  ];

  return (
    <div className="card" style={{ padding: '0', marginBottom: '24px', overflow: 'hidden' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 22px',
          borderBottom: '1px solid var(--border)',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              background: 'var(--green-50)',
              border: '1px solid var(--green-100)',
              borderRadius: '10px',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--green-600)',
            }}
          >
            <IndianRupee size={17} />
          </div>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>Earnings Overview</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <TrendingUp size={12} style={{ color: '#16A34A' }} />
              <span style={{ fontSize: '11.5px', color: '#16A34A', fontWeight: 600 }}>+12% vs last month</span>
            </div>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="tab-bar">
          {(['weekly', 'monthly'] as const).map((t) => (
            <button
              key={t}
              id={`earnings-tab-${t}`}
              onClick={() => setTab(t)}
              className={`tab-pill${tab === t ? ' active' : ''}`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderBottom: '1px solid var(--border)',
        }}
        className="earnings-summary-grid"
      >
        {summaryCards.map(({ label, value, color, bg, border }, i) => (
          <div
            key={label}
            style={{
              padding: '16px 20px',
              borderRight: i < summaryCards.length - 1 ? '1px solid var(--border)' : 'none',
              background: bg,
            }}
          >
            <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {label}
            </p>
            <p style={{ fontSize: '1.3rem', fontWeight: 800, color, letterSpacing: '-0.02em', marginTop: '6px' }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div style={{ padding: '24px 22px' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
          {tab === 'weekly' ? 'This Week\'s Sales' : 'Monthly Breakdown'}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '10px',
            height: '120px',
          }}
        >
          {data.weeklyData.map((d) => {
            const pct = maxAmount > 0 ? (d.amount / maxAmount) * 100 : 0;
            return (
              <div
                key={d.day}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  height: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                {/* Amount label */}
                <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 600 }}>
                  {d.amount > 0 ? `₹${(d.amount / 1000).toFixed(1)}k` : ''}
                </span>
                {/* Bar */}
                <div
                  style={{
                    width: '100%',
                    height: `${Math.max(pct, 4)}%`,
                    background: `linear-gradient(180deg, var(--green-500) 0%, var(--green-600) 100%)`,
                    borderRadius: '5px 5px 3px 3px',
                    transition: 'height 0.3s ease',
                    minHeight: '4px',
                    position: 'relative',
                  }}
                />
                {/* Day label */}
                <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .earnings-summary-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 400px) {
          .earnings-summary-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
