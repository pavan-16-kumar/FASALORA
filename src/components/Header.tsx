'use client';

import React from 'react';
import { useFarmConnect } from '@/context/FarmConnectContext';
import { UserRole } from '@/types';
import { ShoppingCart, Activity } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | UserRole;
  onSelectTab: (tab: 'home' | UserRole) => void;
  onOpenCart?: () => void;
  onOpenRegisterFarmer?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenCart,
  onOpenRegisterFarmer,
}) => {
  const { cart, isBackendConnected, backendLatency, backendMode } = useFarmConnect();
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Logo */}
        <button
          onClick={() => onSelectTab('home')}
          className="logo"
          aria-label="FarmConnect home"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span className="logo-mark" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21V10.5" />
              <path d="M12 11c0-3.9 3.1-7 7-7 0 3.9-3.1 7-7 7Z" />
              <path d="M12 15.5c0-2.8-2.2-5-5-5 0 2.8 2.2 5 5 5Z" />
            </svg>
          </span>
          <span className="logo-word">FARMCONNECT</span>
        </button>

        {/* Primary Navigation */}
        <nav className="main-nav" aria-label="Primary">
          <button
            onClick={() => onSelectTab('home')}
            className={currentTab === 'home' ? 'is-active' : ''}
          >
            Home
          </button>
          <button
            onClick={() => onSelectTab('customer')}
            className={currentTab === 'customer' ? 'is-active' : ''}
          >
            Marketplace
          </button>
          <button
            onClick={() => onSelectTab('farmer')}
            className={currentTab === 'farmer' ? 'is-active' : ''}
          >
            For Farmers
          </button>
          <button
            onClick={() => onSelectTab('transporter')}
            className={currentTab === 'transporter' ? 'is-active' : ''}
          >
            Logistics
          </button>
          <button
            onClick={() => onSelectTab('hub')}
            className={currentTab === 'hub' ? 'is-active' : ''}
          >
            Hubs
          </button>
          <button
            onClick={() => onSelectTab('admin')}
            className={currentTab === 'admin' ? 'is-active' : ''}
          >
            Admin
          </button>
        </nav>

        {/* Right Actions */}
        <div className="header-actions">
          {/* Cart button */}
          <button
            onClick={onOpenCart}
            style={{
              position: 'relative',
              padding: '8px 12px',
              background: totalCartCount > 0 ? 'var(--green-50)' : '#fff',
              border: '1px solid var(--border-2)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: totalCartCount > 0 ? 'var(--green-700)' : 'var(--ink-2)',
              fontSize: '13.5px',
              fontWeight: 500,
              transition: 'all .16s ease',
            }}
            title="View Shopping Cart"
          >
            <ShoppingCart size={17} />
            <span style={{ display: 'none' }} className="sm:inline">Cart</span>
            {totalCartCount > 0 && (
              <span
                style={{
                  background: 'var(--green-600)',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 700,
                  borderRadius: '999px',
                  padding: '1px 6px',
                  lineHeight: 1.2,
                }}
              >
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Register as farmer CTA */}
          <button
            onClick={onOpenRegisterFarmer || (() => onSelectTab('farmer'))}
            className="btn btn-primary"
          >
            Register as Farmer
          </button>
        </div>
      </div>
    </header>
  );
};
