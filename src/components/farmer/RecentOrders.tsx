'use client';

import React from 'react';
import { ShoppingBag, Eye, ChevronRight, ArrowRight } from 'lucide-react';
import { Order, OrderStatus } from '@/types';

interface RecentOrdersProps {
  orders: Order[];
  onViewAll: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

const STATUS_META: Record<OrderStatus, { label: string; bg: string; color: string; border: string }> = {
  PENDING:         { label: 'New Order',        bg: '#FFFBEB', color: '#92400E', border: '#FDE68A' },
  FARMER_ACCEPTED: { label: 'Accepted',         bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' },
  PICKED_UP:       { label: 'Pickup Scheduled', bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  AT_HUB:          { label: 'At Hub',           bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE' },
  OUT_FOR_DELIVERY:{ label: 'Out for Delivery', bg: '#FFF7ED', color: '#C2410C', border: '#FED7AA' },
  DELIVERED:       { label: 'Delivered',        bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' },
  SETTLED:         { label: 'Completed',        bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' },
  REJECTED:        { label: 'Rejected',         bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const meta = STATUS_META[status] || STATUS_META.PENDING;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 9px',
        borderRadius: '999px',
        fontSize: '11.5px',
        fontWeight: 600,
        background: meta.bg,
        color: meta.color,
        border: `1px solid ${meta.border}`,
        whiteSpace: 'nowrap',
      }}
    >
      {meta.label}
    </span>
  );
}

export default function RecentOrders({ orders, onViewAll, onUpdateStatus }: RecentOrdersProps) {
  const recent = orders.slice(0, 5);

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
            <ShoppingBag size={17} />
          </div>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>Recent Orders</h2>
            <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '1px' }}>
              {orders.length} total order{orders.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <button
          id="view-all-orders-btn"
          onClick={onViewAll}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--green-700)',
          }}
        >
          View All Orders <ArrowRight size={14} />
        </button>
      </div>

      {/* Empty State */}
      {recent.length === 0 ? (
        <div
          style={{
            padding: '48px 24px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              background: 'var(--green-50)',
              borderRadius: '14px',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--green-600)',
              margin: '0 auto 14px',
            }}
          >
            <ShoppingBag size={24} />
          </div>
          <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)' }}>No orders yet</p>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '6px' }}>
            Orders from buyers will appear here once your crops are listed.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="orders-table-wrap" style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ minWidth: '700px' }}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Crop</th>
                  <th>Qty</th>
                  <th>Buyer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: '12.5px', fontWeight: 600, color: 'var(--ink)' }}>
                        {order.orderId}
                      </span>
                    </td>
                    <td>
                      <div>
                        <p style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '13px' }}>{order.cropName}</p>
                        <p style={{ fontSize: '11.5px', color: 'var(--muted)' }}>{order.grade}</p>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--ink-2)' }}>{order.quantity} kg</td>
                    <td>
                      <p style={{ fontSize: '13px', color: 'var(--ink-2)' }}>{order.customerName.split('(')[0].trim()}</p>
                    </td>
                    <td>
                      <p style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '13px' }}>₹{order.cropValue.toLocaleString('en-IN')}</p>
                    </td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          id={`view-order-${order.orderId}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'var(--green-50)',
                            border: '1px solid var(--green-100)',
                            borderRadius: '7px',
                            padding: '5px 10px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: 'var(--green-700)',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <Eye size={13} /> View
                        </button>
                        {order.status === 'PENDING' && (
                          <button
                            id={`accept-order-${order.orderId}`}
                            onClick={() => onUpdateStatus(order.orderId, 'FARMER_ACCEPTED')}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: 'var(--green-600)',
                              border: 'none',
                              borderRadius: '7px',
                              padding: '5px 10px',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: '#fff',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Accept
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="orders-mobile-cards" style={{ display: 'none', flexDirection: 'column', gap: '1px' }}>
            {recent.map((order) => (
              <div
                key={order.id}
                style={{
                  padding: '14px 18px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 600, color: 'var(--ink)' }}>
                      {order.orderId}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                  <p style={{ marginTop: '5px', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)' }}>{order.cropName}</p>
                  <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{order.quantity} kg · {order.customerName.split('(')[0].trim()}</p>
                  <p style={{ marginTop: '4px', fontSize: '14px', fontWeight: 700, color: 'var(--green-700)' }}>₹{order.cropValue.toLocaleString('en-IN')}</p>
                </div>
                <button
                  style={{
                    background: 'var(--green-50)',
                    border: '1px solid var(--green-100)',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--green-700)',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <Eye size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* View All Footer */}
          <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', background: 'var(--green-50)' }}>
            <button
              onClick={onViewAll}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--green-700)',
              }}
            >
              View All Orders <ChevronRight size={14} />
            </button>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 640px) {
          .orders-table-wrap { display: none !important; }
          .orders-mobile-cards { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
