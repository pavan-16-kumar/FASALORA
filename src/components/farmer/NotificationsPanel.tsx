'use client';

import React from 'react';
import { Bell, ShoppingBag, Package, Truck, IndianRupee, Circle } from 'lucide-react';

type NotifType = 'order' | 'stock' | 'pickup' | 'payment';

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  timestamp: string;
  unread: boolean;
}

interface NotificationsPanelProps {
  notifications: Notification[];
}

const NOTIF_META: Record<NotifType, { icon: React.FC<{ size?: number }>; color: string; bg: string; border: string }> = {
  order:   { icon: ShoppingBag, color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  stock:   { icon: Package,     color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
  pickup:  { icon: Truck,       color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
  payment: { icon: IndianRupee, color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
};

export default function NotificationsPanel({ notifications }: NotificationsPanelProps) {
  const unreadCount = notifications.filter((n) => n.unread).length;

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
              position: 'relative',
            }}
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '8px',
                  height: '8px',
                  background: '#EF4444',
                  borderRadius: '50%',
                  border: '1.5px solid #fff',
                }}
              />
            )}
          </div>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>Notifications</h2>
            {unreadCount > 0 && (
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '1px' }}>
                {unreadCount} unread
              </p>
            )}
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            id="mark-all-read-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12.5px',
              fontWeight: 600,
              color: 'var(--green-700)',
            }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Empty State */}
      {notifications.length === 0 ? (
        <div style={{ padding: '40px 24px', textAlign: 'center' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'var(--green-50)',
              borderRadius: '12px',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--green-600)',
              margin: '0 auto 12px',
            }}
          >
            <Bell size={22} />
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>No notifications yet</p>
          <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '4px' }}>
            Order updates and alerts will appear here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {notifications.map((notif, i) => {
            const meta = NOTIF_META[notif.type];
            const Icon = meta.icon;
            const isLast = i === notifications.length - 1;
            return (
              <div
                key={notif.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '14px 22px',
                  borderBottom: !isLast ? '1px solid var(--border)' : 'none',
                  background: notif.unread ? '#FAFCFB' : 'transparent',
                  transition: 'background 0.15s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F9FAFB'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = notif.unread ? '#FAFCFB' : 'transparent'; }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    background: meta.bg,
                    border: `1px solid ${meta.border}`,
                    borderRadius: '10px',
                    display: 'grid',
                    placeItems: 'center',
                    color: meta.color,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <p style={{ fontSize: '13.5px', fontWeight: notif.unread ? 700 : 600, color: 'var(--ink)' }}>
                      {notif.title}
                    </p>
                    {notif.unread && (
                      <Circle size={7} style={{ color: 'var(--green-500)', fill: 'var(--green-500)', flexShrink: 0 }} />
                    )}
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '3px', lineHeight: 1.5 }}>
                    {notif.body}
                  </p>
                  <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '5px', fontWeight: 500 }}>
                    {notif.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
