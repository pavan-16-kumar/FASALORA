'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sprout, Bell, ChevronDown, User, Settings, LogOut, X
} from 'lucide-react';
import { useAuth } from '@/context/FarmerAuthContext';

interface DashboardHeaderProps {
  notificationCount?: number;
  onNotificationClick?: () => void;
}

export default function DashboardHeader({ notificationCount = 2, onNotificationClick }: DashboardHeaderProps) {
  const router = useRouter();
  const { farmer, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/farmer/login');
  };

  const initials = farmer?.name
    ? farmer.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'FK';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '16px',
      }}
    >
      {/* Logo */}
      <Link href="/farmer/dashboard" className="logo" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <div className="logo-mark">
          <Sprout size={18} />
        </div>
        <div>
          <div className="logo-word">FASALORA</div>
          <div style={{ fontSize: '9.5px', color: 'var(--muted)', letterSpacing: '0.04em', marginTop: '-2px', fontWeight: 500 }}>
            Smart Farm-to-Customer Network
          </div>
        </div>
      </Link>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right actions */}
      <div ref={dropRef} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Notification Bell */}
        <button
          id="notif-bell-btn"
          onClick={() => { setNotifOpen((o) => !o); setDropdownOpen(false); if (onNotificationClick) onNotificationClick(); }}
          style={{
            position: 'relative',
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            width: '38px',
            height: '38px',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            color: 'var(--ink-2)',
            transition: 'background 0.15s ease, border-color 0.15s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--green-50)'; e.currentTarget.style.borderColor = 'var(--green-100)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          aria-label="Notifications"
        >
          <Bell size={17} />
          {notificationCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '16px',
                height: '16px',
                background: '#EF4444',
                color: '#fff',
                borderRadius: '50%',
                fontSize: '10px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid #fff',
              }}
            >
              {notificationCount}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            id="farmer-profile-btn"
            onClick={() => { setDropdownOpen((o) => !o); setNotifOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '5px 10px 5px 5px',
              cursor: 'pointer',
              transition: 'background 0.15s ease, border-color 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--green-50)'; e.currentTarget.style.borderColor = 'var(--green-100)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            {/* Avatar */}
            <div
              style={{
                width: '28px',
                height: '28px',
                background: 'var(--green-600)',
                color: '#fff',
                borderRadius: '8px',
                display: 'grid',
                placeItems: 'center',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.03em',
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {farmer?.name || 'Farmer'}
              </span>
              <span style={{ fontSize: '10.5px', color: 'var(--muted)', lineHeight: 1.2 }}>Verified Farmer</span>
            </div>
            <ChevronDown
              size={14}
              style={{
                color: 'var(--muted)',
                transition: 'transform 0.2s ease',
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                boxShadow: 'var(--shadow-lg)',
                width: '200px',
                zIndex: 100,
                overflow: 'hidden',
                animation: 'fadeSlideDown 0.12s ease',
              }}
            >
              {/* Farmer info header */}
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>{farmer?.name}</p>
                <p style={{ fontSize: '11.5px', color: 'var(--muted)', marginTop: '2px' }}>{farmer?.farmerId}</p>
              </div>
              {/* Menu items */}
              <div style={{ padding: '6px' }}>
                {[
                  { icon: User, label: 'Profile', id: 'dd-profile' },
                  { icon: Settings, label: 'Settings', id: 'dd-settings' },
                ].map(({ icon: Icon, label, id }) => (
                  <button
                    key={id}
                    id={id}
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--ink-2)',
                      fontSize: '13.5px',
                      fontWeight: 500,
                      transition: 'background 0.12s ease',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--green-50)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                  >
                    <Icon size={15} style={{ color: 'var(--muted)' }} />
                    {label}
                  </button>
                ))}
                <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />
                <button
                  id="dd-logout"
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '9px 10px',
                    borderRadius: '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--danger)',
                    fontSize: '13.5px',
                    fontWeight: 500,
                    transition: 'background 0.12s ease',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--danger-light)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
