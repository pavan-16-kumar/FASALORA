'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/FarmerAuthContext';
import { useFarmConnect } from '@/context/FarmConnectContext';
import { CropListing, Order, OrderStatus } from '@/types';

import DashboardHeader from './DashboardHeader';
import { DashboardSidebar, DashboardSection } from './DashboardSidebar';
import WelcomeBanner from './WelcomeBanner';
import FarmerStats from './FarmerStats';
import AddCropCTA from './AddCropCTA';
import RecentOrders from './RecentOrders';
import CropListings from './CropListings';
import EarningsOverview from './EarningsOverview';
import FarmProfile from './FarmProfile';
import NotificationsPanel from './NotificationsPanel';
import QuickActions from './QuickActions';

interface EarningsData {
  thisMonth: number;
  lastMonth: number;
  totalEarnings: number;
  pendingSettlement: number;
  weeklyData: Array<{ day: string; amount: number }>;
}

type NotifType = 'order' | 'stock' | 'pickup' | 'payment';

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  timestamp: string;
  unread: boolean;
}

export default function FarmerDashboard() {
  const router = useRouter();
  const { farmer } = useAuth();
  const { crops, orders, updateOrderStatus } = useFarmConnect();

  const [activeSection, setActiveSection] = useState<DashboardSection>('dashboard');

  // Stats
  const [stats, setStats] = useState({ activeCrops: 0, availableQty: 0, newOrders: 0, totalSales: 0 });
  const [earnings, setEarnings] = useState<EarningsData>({
    thisMonth: 12400,
    lastMonth: 10800,
    totalEarnings: 48700,
    pendingSettlement: 3200,
    weeklyData: [
      { day: 'Mon', amount: 1488 },
      { day: 'Tue', amount: 2232 },
      { day: 'Wed', amount: 1116 },
      { day: 'Thu', amount: 2728 },
      { day: 'Fri', amount: 1860 },
      { day: 'Sat', amount: 1736 },
      { day: 'Sun', amount: 1240 },
    ],
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifCount, setNotifCount] = useState(0);

  // Derived data: filter to this farmer
  const farmerId = farmer?.farmerId || 'FC-TG-MDL-26-000184';
  const myOrders: Order[] = orders.filter((o) => o.farmerId === farmerId);
  const myCrops: CropListing[] = crops.filter((c) => c.farmerId === farmerId);

  // Load farmer-specific API data
  const loadFarmerData = useCallback(async () => {
    if (!farmerId) return;
    try {
      const [statsRes, earningsRes, notifRes] = await Promise.all([
        fetch(`/api/farmers/me/stats?farmerId=${farmerId}`),
        fetch(`/api/farmers/me/earnings?farmerId=${farmerId}`),
        fetch(`/api/farmers/me/notifications?farmerId=${farmerId}`),
      ]);

      if (statsRes.ok) {
        const s = await statsRes.json();
        setStats(s);
      } else {
        // Compute stats from local context
        setStats({
          activeCrops: myCrops.filter((c) => c.availableQuantity > 0).length,
          availableQty: myCrops.reduce((s, c) => s + c.availableQuantity, 0),
          newOrders: myOrders.filter((o) => o.status === 'PENDING').length,
          totalSales: myOrders.reduce((s, o) => s + (o.status !== 'REJECTED' ? o.cropValue : 0), 0),
        });
      }

      if (earningsRes.ok) {
        const e = await earningsRes.json();
        setEarnings(e);
      }

      if (notifRes.ok) {
        const n = await notifRes.json();
        setNotifications(n);
        setNotifCount(n.filter((x: Notification) => x.unread).length);
      }
    } catch {
      // Fallback to context-derived stats
      setStats({
        activeCrops: myCrops.filter((c) => c.availableQuantity > 0).length,
        availableQty: myCrops.reduce((s, c) => s + c.availableQuantity, 0),
        newOrders: myOrders.filter((o) => o.status === 'PENDING').length,
        totalSales: myOrders.reduce((s, o) => s + (o.status !== 'REJECTED' ? o.cropValue : 0), 0),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farmerId]);

  useEffect(() => {
    loadFarmerData();
  }, [loadFarmerData]);

  const handleNavigate = (section: DashboardSection) => {
    setActiveSection(section);
    if (section === 'add-crop') {
      router.push('/farmer/onboarding');
    }
  };

  if (!farmer) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-surface-subtle)' }}>
      {/* Header */}
      <DashboardHeader
        notificationCount={notifCount}
        onNotificationClick={() => setActiveSection('notifications')}
      />

      {/* Body */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <DashboardSidebar active={activeSection} onNavigate={handleNavigate} />

        {/* Main content */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            padding: '28px 28px 100px',
            maxWidth: '100%',
          }}
          className="dashboard-main"
        >
          {/* ── DASHBOARD (default) ── */}
          {activeSection === 'dashboard' && (
            <>
              <WelcomeBanner farmer={farmer} />
              <FarmerStats
                activeCrops={stats.activeCrops}
                availableQty={stats.availableQty}
                newOrders={stats.newOrders}
                totalSales={stats.totalSales}
              />
              <QuickActions
                onAddCrop={() => handleNavigate('add-crop')}
                onMyOrders={() => handleNavigate('orders')}
                onUpdateStock={() => handleNavigate('my-crops')}
                onViewEarnings={() => handleNavigate('earnings')}
              />
              <AddCropCTA
                onAddCrop={() => handleNavigate('add-crop')}
                onViewCrops={() => handleNavigate('my-crops')}
              />
              <RecentOrders
                orders={myOrders}
                onViewAll={() => handleNavigate('orders')}
                onUpdateStatus={(orderId, status) => updateOrderStatus(orderId, status)}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="bottom-grid">
                <EarningsOverview data={earnings} />
                <FarmProfile farmer={farmer} />
              </div>
              <NotificationsPanel notifications={notifications} />
            </>
          )}

          {/* ── MY FARM ── */}
          {activeSection === 'my-farm' && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>My Farm</h1>
                <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>Your farm profile and land details.</p>
              </div>
              <FarmProfile farmer={farmer} />
            </>
          )}

          {/* ── MY CROPS ── */}
          {activeSection === 'my-crops' && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>My Crop Listings</h1>
                <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>{myCrops.length} listing{myCrops.length !== 1 ? 's' : ''} on the marketplace.</p>
              </div>
              <CropListings crops={myCrops} onAddCrop={() => handleNavigate('add-crop')} />
            </>
          )}

          {/* ── ORDERS ── */}
          {activeSection === 'orders' && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Orders</h1>
                <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>{myOrders.length} total order{myOrders.length !== 1 ? 's' : ''}.</p>
              </div>
              <RecentOrders
                orders={myOrders}
                onViewAll={() => {}}
                onUpdateStatus={(orderId, status) => updateOrderStatus(orderId, status)}
              />
            </>
          )}

          {/* ── EARNINGS ── */}
          {activeSection === 'earnings' && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Earnings</h1>
                <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>Your sales revenue and settlement overview.</p>
              </div>
              <EarningsOverview data={earnings} />
            </>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeSection === 'notifications' && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Notifications</h1>
                <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>Order alerts and farm updates.</p>
              </div>
              <NotificationsPanel notifications={notifications} />
            </>
          )}

          {/* ── PROFILE ── */}
          {(activeSection === 'profile') && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Profile</h1>
                <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>Your FASALORA farmer account details.</p>
              </div>
              <WelcomeBanner farmer={farmer} />
              <FarmProfile farmer={farmer} />
            </>
          )}
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bottom-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .dashboard-main { padding: 20px 16px 80px !important; }
        }
      `}</style>
    </div>
  );
}
