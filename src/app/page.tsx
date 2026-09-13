'use client';

import React, { useState } from 'react';
import { FarmConnectProvider, useFarmConnect } from '@/context/FarmConnectContext';
import { Header } from '@/components/Header';
import { MandiTicker } from '@/components/home/MandiTicker';
import { SupplyChainSimulator } from '@/components/home/SupplyChainSimulator';
import { LiveHarvestPreview } from '@/components/home/LiveHarvestPreview';
import { BentoGridFeatures } from '@/components/home/BentoGridFeatures';
import { CustomerPanel } from '@/components/panels/CustomerPanel';
import { FarmerPanel } from '@/components/panels/FarmerPanel';
import { TransporterPanel } from '@/components/panels/TransporterPanel';
import { HubPanel } from '@/components/panels/HubPanel';
import { AdminPanel } from '@/components/panels/AdminPanel';
import { UserRole } from '@/types';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  MapPin, 
  Clock, 
  Users, 
  Scale,
  Award,
  ShoppingCart,
  Sprout,
  Truck,
  Warehouse
} from 'lucide-react';

const MainApplication: React.FC = () => {
  const { activeRole, setActiveRole, platformStats } = useFarmConnect();
  const [currentTab, setCurrentTab] = useState<'home' | UserRole>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSelectTab = (tab: 'home' | UserRole) => {
    setCurrentTab(tab);
    if (tab !== 'home') {
      setActiveRole(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegisterFarmer = () => {
    window.location.href = '/farmer/onboarding';
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)' }}>
      {/* 1. Live APMC Mandi vs FarmConnect Ticker Bar */}
      <MandiTicker />

      {/* 2. Sticky Platform Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenRegisterFarmer={handleOpenRegisterFarmer}
      />

      <main style={{ flex: 1 }}>
        {/* ============ HOME / LANDING VIEW ============ */}
        {currentTab === 'home' && (
          <div>
            {/* 3. CINEMATIC AGRICULTURAL HERO WITH FARM BACKGROUND */}
            <section className="hero-farming">
              <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
                {/* Live Pill Badge */}
                <div className="hero-farming-badge">
                  <span className="pulse-dot" style={{ width: '7px', height: '7px' }}></span>
                  <span>Smart India Hackathon 2026 • Direct Farm-to-Consumer Trade</span>
                </div>

                {/* Meaningful Problem-Solving Headline */}
                <h1 className="hero-farming-title">
                  Connecting Farmers Directly to Buyers,<br />
                  Eliminating Middlemen for <span className="highlight">Fair Agricultural Trade.</span>
                </h1>

                {/* Substantive, Impactful Sub-Headline */}
                <p className="hero-farming-sub">
                  FarmConnect tackles the agricultural intermediary crisis by connecting verified farmers directly with families, restaurants, and retail buyers. Farmers earn up to 75% of the consumer rupee with instant digital settlement, while buyers receive fresh, traceable harvest straight from the field.
                </p>

                {/* Action CTAs */}
                <div style={{ marginTop: '36px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
                  <button
                    onClick={() => handleSelectTab('customer')}
                    className="btn btn-primary btn-shimmer"
                    style={{
                      padding: '14px 28px',
                      fontSize: '15px',
                      fontWeight: 600,
                      boxShadow: '0 8px 24px rgba(47, 133, 90, 0.4)',
                    }}
                  >
                    Buy Directly from Farmers
                    <ArrowRight size={17} />
                  </button>
                  <button
                    onClick={handleOpenRegisterFarmer}
                    style={{
                      padding: '14px 26px',
                      fontSize: '15px',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#FFFFFF',
                      backdropFilter: 'blur(12px)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    }}
                  >
                    <MapPin size={17} className="text-emerald-300" />
                    Register as a Verified Farmer
                  </button>
                </div>

                {/* Glassmorphic Metrics Counters (Live Platform Stats) */}
                <div className="glass-metrics-grid">
                  <div className="glass-metric-card">
                    <div className="glass-metric-value">
                      ₹{(platformStats.extra_income_unlocked_inr / 100000).toFixed(1)}L+
                    </div>
                    <div className="glass-metric-label">
                      <TrendingUp size={14} className="text-emerald-300" />
                      Extra Farmer Earnings Unlocked
                    </div>
                  </div>

                  <div className="glass-metric-card">
                    <div className="glass-metric-value">
                      {(platformStats.total_harvest_kg / 1000).toFixed(0)}k+ kg
                    </div>
                    <div className="glass-metric-label">
                      <Scale size={14} className="text-emerald-300" />
                      Fresh Harvest Saved From Middlemen
                    </div>
                  </div>

                  <div className="glass-metric-card">
                    <div className="glass-metric-value">
                      {platformStats.active_farmers.toLocaleString()}+
                    </div>
                    <div className="glass-metric-label">
                      <Users size={14} className="text-emerald-300" />
                      Verified Smallholder Farmers
                    </div>
                  </div>

                  <div className="glass-metric-card">
                    <div className="glass-metric-value">
                      &lt; {platformStats.avg_field_to_fork_hours} hrs
                    </div>
                    <div className="glass-metric-label">
                      <Clock size={14} className="text-emerald-300" />
                      Soil-to-Kitchen Turnaround
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. INTERACTIVE 4-STAGE SUPPLY CHAIN SIMULATOR */}
            <SupplyChainSimulator onSelectRole={handleSelectTab} />

            {/* 5. LIVE HARVEST MARKETPLACE STREAM (CONNECTED TO /api/crops) */}
            <LiveHarvestPreview
              onOpenMarketplace={() => handleSelectTab('customer')}
              onOpenCart={() => setIsCartOpen(true)}
            />

            {/* 6. MODERN AGRITECH BENTO-GRID ARCHITECTURE */}
            <BentoGridFeatures />

            {/* 7. UNIFIED STAKEHOLDER CLOSING CALL-TO-ACTION BANNER */}
            <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
              <div className="container">
                <div 
                  style={{ 
                    background: 'linear-gradient(135deg, #091C14 0%, #143828 100%)', 
                    borderRadius: 'var(--radius-lg)', 
                    padding: '56px 40px',
                    color: '#FFFFFF',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 12px 36px rgba(15, 31, 23, 0.15)',
                    border: '1px solid rgba(167, 243, 208, 0.2)'
                  }}
                >
                  <span className="eyebrow" style={{ background: 'rgba(255,255,255,0.1)', color: '#A7F3D0', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <Sparkles size={13} className="text-emerald-300" />
                    Transforming Indian Agriculture
                  </span>
                  <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.025em', maxWidth: '680px', margin: '0 auto 14px' }}>
                    Ready to Cut Out Middlemen and Trade Directly?
                  </h2>
                  <p style={{ fontSize: '15px', color: '#94A3B8', maxWidth: '620px', margin: '0 auto 32px', lineHeight: 1.6 }}>
                    Join over 1,250+ verified farmers and conscious consumers experiencing transparent pricing, verifiable QR origin, and zero middlemen commissions.
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginBottom: '28px' }}>
                    <button
                      onClick={() => handleSelectTab('customer')}
                      className="btn btn-primary"
                      style={{ padding: '13px 26px', fontSize: '14.5px', fontWeight: 600 }}
                    >
                      <ShoppingCart size={17} />
                      Shop Fresh Produce
                    </button>
                    <button
                      onClick={handleOpenRegisterFarmer}
                      style={{
                        padding: '13px 24px',
                        fontSize: '14.5px',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255, 255, 255, 0.12)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                      }}
                    >
                      <Sprout size={17} className="text-emerald-300" />
                      Register as a Farmer
                    </button>
                  </div>

                  {/* Subtle Operational Access Links */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '12.5px', color: '#94A3B8', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                    <span>Operational Portals:</span>
                    <button 
                      onClick={() => handleSelectTab('transporter')} 
                      style={{ background: 'none', border: 'none', color: '#A7F3D0', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
                    >
                      Logistics Fleet
                    </button>
                    <span>•</span>
                    <button 
                      onClick={() => handleSelectTab('hub')} 
                      style={{ background: 'none', border: 'none', color: '#A7F3D0', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
                    >
                      Collection Hubs
                    </button>
                    <span>•</span>
                    <button 
                      onClick={() => handleSelectTab('admin')} 
                      style={{ background: 'none', border: 'none', color: '#A7F3D0', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
                    >
                      Admin Intelligence
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ============ INDIVIDUAL PORTAL VIEWS ============ */}
        {currentTab !== 'home' && (
          <div className="container" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
            {currentTab === 'customer' && (
              <CustomerPanel
                isCartOpen={isCartOpen}
                onCloseCart={() => setIsCartOpen(false)}
              />
            )}
            {currentTab === 'farmer' && <FarmerPanel />}
            {currentTab === 'transporter' && <TransporterPanel />}
            {currentTab === 'hub' && <HubPanel />}
            {currentTab === 'admin' && <AdminPanel />}
          </div>
        )}
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="logo-word" style={{ fontSize: '14px' }}>FARMCONNECT</span>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>• Farm-to-Consumer Direct Supply Chain</span>
            </div>
            <p>© 2026 FarmConnect. Empowering smallholder farmers with technology, fair prices, and direct market access.</p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <button onClick={() => handleSelectTab('customer')}>Marketplace</button>
            <button onClick={() => handleSelectTab('farmer')}>For Farmers</button>
            <button onClick={() => handleSelectTab('transporter')}>Logistics</button>
            <button onClick={() => handleSelectTab('hub')}>Hubs</button>
            <button onClick={() => handleSelectTab('admin')}>Admin</button>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default function Page() {
  return (
    <FarmConnectProvider>
      <MainApplication />
    </FarmConnectProvider>
  );
}
