'use client';

import React from 'react';
import { PlusCircle, ShoppingBag, RefreshCcw, IndianRupee } from 'lucide-react';

interface QuickActionsProps {
  onAddCrop: () => void;
  onMyOrders: () => void;
  onUpdateStock: () => void;
  onViewEarnings: () => void;
}

export default function QuickActions({ onAddCrop, onMyOrders, onUpdateStock, onViewEarnings }: QuickActionsProps) {
  const actions = [
    {
      id: 'qa-add-crop',
      label: 'Add Crop',
      icon: PlusCircle,
      color: 'var(--green-600)',
      bg: 'var(--green-50)',
      border: 'var(--green-100)',
      action: onAddCrop,
    },
    {
      id: 'qa-my-orders',
      label: 'My Orders',
      icon: ShoppingBag,
      color: '#D97706',
      bg: '#FFFBEB',
      border: '#FDE68A',
      action: onMyOrders,
    },
    {
      id: 'qa-update-stock',
      label: 'Update Stock',
      icon: RefreshCcw,
      color: '#2563EB',
      bg: '#EFF6FF',
      border: '#BFDBFE',
      action: onUpdateStock,
    },
    {
      id: 'qa-view-earnings',
      label: 'View Earnings',
      icon: IndianRupee,
      color: '#16A34A',
      bg: '#F0FDF4',
      border: '#BBF7D0',
      action: onViewEarnings,
    },
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      <p
        style={{
          fontSize: '11.5px',
          fontWeight: 700,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          marginBottom: '12px',
        }}
      >
        Quick Actions
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
        }}
        className="quick-actions-grid"
      >
        {actions.map(({ id, label, icon: Icon, color, bg, border, action }) => (
          <button
            key={id}
            id={id}
            onClick={action}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 12px',
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = border;
              e.currentTarget.style.background = bg;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: '10px',
                display: 'grid',
                placeItems: 'center',
                color,
              }}
            >
              <Icon size={18} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)' }}>{label}</span>
          </button>
        ))}
      </div>

      <style>{`
        @media (max-width: 480px) {
          .quick-actions-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
