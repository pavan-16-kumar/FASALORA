'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  ThermometerSnowflake, 
  Layers, 
  CheckCircle2, 
  ArrowUpRight,
  Zap
} from 'lucide-react';

export const BentoGridFeatures: React.FC = () => {
  const [activeTabPrice, setActiveTabPrice] = useState<'farmconnect' | 'mandi'>('farmconnect');

  return (
    <section style={{ padding: '80px 0', background: '#F8FAFC' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span className="eyebrow" style={{ marginBottom: '14px' }}>
            <span className="dot" aria-hidden="true"></span>
            Agritech Architecture
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.025em' }}>
            Engineered for Transparency, Fairness & Zero Spoilage
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', marginTop: '12px', lineHeight: 1.6 }}>
            Cutting-edge spatial mapping, automated quality assessment, and financial routing built for India’s agricultural reality.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-container">
          {/* Card 1: GIS Geofencing & Land Verification (Span 7) */}
          <div className="bento-card bento-item-large" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="bento-icon-pill">
                <MapPin size={22} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--green-700)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Spatial Provenance
              </span>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--ink)', marginTop: '6px', marginBottom: '10px' }}>
                GIS Land Parcel &amp; Geofencing Verification
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '480px' }}>
                Every harvest lot is cryptographically tagged to the farmer’s GPS land boundary. We verify the crop against certified field area to prevent fraudulent third-party re-selling.
              </p>
            </div>

            {/* Visual Geofence Map Mockup */}
            <div
              style={{
                marginTop: '24px',
                background: '#091C14',
                borderRadius: 'var(--radius-sm)',
                padding: '20px',
                color: '#FFFFFF',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(167, 243, 208, 0.2)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="pulse-dot" style={{ width: '8px', height: '8px' }}></span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#A7F3D0' }}>
                    PARCEL #TG-MDL-00184
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>SHAMIRPET CLUSTER</span>
              </div>

              <div style={{ height: '90px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', border: '1px dashed rgba(52, 211, 153, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>LATITUDE</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#F8FAFC' }}>17.6056° N</div>
                </div>
                <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.1)' }}></div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>LONGITUDE</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#F8FAFC' }}>78.5701° E</div>
                </div>
                <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.1)' }}></div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>CROP AREA</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#34D399' }}>5.0 ACRES</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Value Distribution 72% vs 35% (Span 5) */}
          <div className="bento-card bento-item-small" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="bento-icon-pill" style={{ background: '#FEF3C7', borderColor: '#FDE68A', color: '#D97706' }}>
                <TrendingUp size={22} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Economic Justice
              </span>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--ink)', marginTop: '6px', marginBottom: '10px' }}>
                Where Does Your Rupee Go?
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
                Compare the direct farm return between FarmConnect and traditional mandi cartels.
              </p>
            </div>

            {/* Interactive Toggle */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '8px', padding: '4px', marginBottom: '16px' }}>
                <button
                  onClick={() => setActiveTabPrice('farmconnect')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '6px',
                    border: 'none',
                    background: activeTabPrice === 'farmconnect' ? '#FFFFFF' : 'transparent',
                    color: activeTabPrice === 'farmconnect' ? 'var(--green-700)' : 'var(--muted)',
                    boxShadow: activeTabPrice === 'farmconnect' ? 'var(--shadow-sm)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  FarmConnect Direct
                </button>
                <button
                  onClick={() => setActiveTabPrice('mandi')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '6px',
                    border: 'none',
                    background: activeTabPrice === 'mandi' ? '#FFFFFF' : 'transparent',
                    color: activeTabPrice === 'mandi' ? '#DC2626' : 'var(--muted)',
                    boxShadow: activeTabPrice === 'mandi' ? 'var(--shadow-sm)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  Traditional Mandi
                </button>
              </div>

              {activeTabPrice === 'farmconnect' ? (
                <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-100)', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green-700)' }}>Farmer Net Share</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--green-700)' }}>72%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '999px', overflow: 'hidden', marginBottom: '10px' }}>
                    <div style={{ width: '72%', height: '100%', background: 'var(--green-600)', borderRadius: '999px', transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--ink-2)', lineHeight: 1.4 }}>
                    Remaining 28% covers cold transport, quality packaging, and customer savings. Zero commission agents.
                  </div>
                </div>
              ) : (
                <div style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#DC2626' }}>Farmer Net Share</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#DC2626' }}>35%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '999px', overflow: 'hidden', marginBottom: '10px' }}>
                    <div style={{ width: '35%', height: '100%', background: '#DC2626', borderRadius: '999px', transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#991B1B', lineHeight: 1.4 }}>
                    Over 65% vanished into 5 dalal tiers, weigh-bridge cuts, unauthorized deductions, and mandi levies.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: 4°C Monitored Cold Chain (Span 6) */}
          <div className="bento-card bento-item-equal" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="bento-image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bento_cold_storage_v2.jpg"
                alt="Solar Powered Micro Cold Chain Storage Unit"
              />
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(15, 31, 23, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#93C5FD',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  border: '1px solid rgba(147, 197, 253, 0.3)',
                }}
              >
                <ThermometerSnowflake size={13} />
                <span>4.0°C Active Chilling • Solar Hub #HYD-04</span>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Zero Wastage Target
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink)', marginTop: '4px', marginBottom: '8px' }}>
                  Cold Chain &amp; Spoilage Minimization
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  India loses 30% of fruits and vegetables in transit. FarmConnect’s solar micro-hubs maintain continuous temperature telemetry from farm collection to consumer delivery.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div style={{ background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>National Mandi Spoilage</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#DC2626' }}>28% – 32%</div>
                </div>
                <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-100)', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--green-700)' }}>FarmConnect Network Loss</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--green-700)' }}>&lt; 1.4%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Micro-Lot Route Aggregation (Span 6) */}
          <div className="bento-card bento-item-equal">
            <div className="bento-icon-pill" style={{ background: '#F3E8FF', borderColor: '#E9D5FF', color: '#7E22CE' }}>
              <Layers size={22} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#7E22CE', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Inclusive Logistics
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink)', marginTop: '6px', marginBottom: '10px' }}>
              Micro-Lot Route Aggregation
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              Farmers with tiny daily harvests (under 30kg) are often turned away or penalized by bulk carriers. Our clustering algorithm combines multiple village pickups into a single unified route.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink)', fontSize: '13px', fontWeight: 600 }}>
              <CheckCircle2 size={16} className="text-emerald-600" />
              Empowering 85% of India’s small and marginal farmers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
