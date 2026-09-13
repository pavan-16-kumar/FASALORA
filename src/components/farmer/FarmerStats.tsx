'use client';

import React from 'react';
import { Sprout, Package, ShoppingBag, IndianRupee, TrendingUp, TrendingDown } from 'lucide-react';

interface FarmerStatsProps {
  activeCrops: number;
  availableQty: number;
  newOrders: number;
  totalSales: number;
}

interface StatCard {
  id: string;
  label: string;
  value: string;
  icon: React.FC<{ size?: number }>;
  iconColor: string;
  iconBg: string;
  trend?: { direction: 'up' | 'down'; text: string };
}

export default function FarmerStats({ activeCrops, availableQty, newOrders, totalSales }: FarmerStatsProps) {
  const stats: StatCard[] = [
    {
      id: 'stat-active-crops',
      label: 'Active Crops',
      value: String(activeCrops),
      icon: Sprout,
      iconColor: '#16A34A',
      iconBg: '#F0FDF4',
      trend: { direction: 'up', text: '+2 this week' },
    },
    {
      id: 'stat-available-qty',
      label: 'Available Quantity',
      value: `${availableQty.toLocaleString('en-IN')} kg`,
      icon: Package,
      iconColor: '#2563EB',
      iconBg: '#EFF6FF',
      trend: { direction: 'down', text: '−160 kg sold' },
    },
    {
      id: 'stat-new-orders',
      label: 'New Orders',
      value: String(newOrders),
      icon: ShoppingBag,
      iconColor: '#D97706',
      iconBg: '#FFFBEB',
      trend: { direction: 'up', text: 'Needs action' },
    },
    {
      id: 'stat-total-sales',
      label: 'Total Sales',
      value: `₹${totalSales.toLocaleString('en-IN')}`,
      icon: IndianRupee,
      iconColor: 'var(--green-600)',
      iconBg: 'var(--green-50)',
      trend: { direction: 'up', text: '+12% vs last month' },
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '14px',
        marginBottom: '24px',
      }}
      className="stats-grid"
    >
      {stats.map(({ id, label, value, icon: Icon, iconColor, iconBg, trend }) => (
        <div
          key={id}
          id={id}
          className="card"
          style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-md)';
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = '';
            (e.currentTarget as HTMLDivElement).style.transform = '';
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: '40px',
              height: '40px',
              background: iconBg,
              borderRadius: '11px',
              display: 'grid',
              placeItems: 'center',
              color: iconColor,
              border: `1px solid ${iconBg === 'var(--green-50)' ? 'var(--green-100)' : 'transparent'}`,
            }}
          >
            <Icon size={20} />
          </div>

          {/* Value */}
          <div>
            <p
              style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--ink)',
                lineHeight: 1.1,
              }}
            >
              {value}
            </p>
            <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '4px', fontWeight: 500 }}>
              {label}
            </p>
          </div>

          {/* Trend */}
          {trend && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11.5px',
                fontWeight: 600,
                color: trend.direction === 'up' ? '#16A34A' : '#D97706',
              }}
            >
              {trend.direction === 'up' ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {trend.text}
            </div>
          )}
        </div>
      ))}

      <style>{`
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
