'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, Wheat, PlusCircle, List, ShoppingBag,
  IndianRupee, Bell, User, LogOut
} from 'lucide-react';
import { useAuth } from '@/context/FarmerAuthContext';

export type DashboardSection =
  | 'dashboard'
  | 'my-farm'
  | 'add-crop'
  | 'my-crops'
  | 'orders'
  | 'earnings'
  | 'notifications'
  | 'profile';

interface SidebarProps {
  active: DashboardSection;
  onNavigate: (section: DashboardSection) => void;
}

const navItems: Array<{ id: DashboardSection; label: string; icon: React.FC<{ size?: number; className?: string }> }> = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'my-farm', label: 'My Farm', icon: Wheat },
  { id: 'add-crop', label: 'Add Crop', icon: PlusCircle },
  { id: 'my-crops', label: 'My Crops', icon: List },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'earnings', label: 'Earnings', icon: IndianRupee },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: User },
];

// Mobile bottom nav (5 primary items)
const mobileItems = navItems.slice(0, 5);

export function DashboardSidebar({ active, onNavigate }: SidebarProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/farmer/login');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        style={{
          width: '220px',
          flexShrink: 0,
          height: 'calc(100vh - 64px)',
          position: 'sticky',
          top: '64px',
          borderRight: '1px solid var(--border)',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 10px',
          overflowY: 'auto',
        }}
        className="sidebar-desktop"
      >
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                id={`sidebar-${id}`}
                onClick={() => onNavigate(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--green-700)' : 'var(--ink-2)',
                  background: isActive ? 'var(--green-50)' : 'transparent',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#F9FAFB';
                    e.currentTarget.style.color = 'var(--ink)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--ink-2)';
                  }
                }}
              >
                <span style={{ color: isActive ? 'var(--green-600)' : 'var(--muted)', flexShrink: 0, display: 'flex' }}>
                  <Icon size={17} />
                </span>
                {label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: '8px' }}>
          <button
            id="sidebar-logout"
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '9px 12px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '13.5px',
              fontWeight: 500,
              color: 'var(--danger)',
              background: 'transparent',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--danger-light)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut size={17} style={{ color: 'var(--danger)', flexShrink: 0 }} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav
        className="sidebar-mobile-bottom"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#fff',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          zIndex: 40,
          height: '60px',
          boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
        }}
      >
        {mobileItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              id={`mobile-nav-${id}`}
              onClick={() => onNavigate(id)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: isActive ? 'var(--green-600)' : 'var(--muted)',
                fontSize: '10px',
                fontWeight: isActive ? 600 : 500,
                paddingBottom: '4px',
              }}
            >
              <Icon size={19} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <style>{`
        .sidebar-desktop { display: flex; }
        .sidebar-mobile-bottom { display: none; }

        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .sidebar-mobile-bottom { display: flex !important; }
        }
      `}</style>
    </>
  );
}
