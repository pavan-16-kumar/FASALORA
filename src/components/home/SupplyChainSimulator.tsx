'use client';

import React, { useState } from 'react';
import { UserRole } from '@/types';
import { 
  Sprout, 
  Truck, 
  Warehouse, 
  Home as HomeIcon, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ThermometerSnowflake, 
  MapPin, 
  QrCode,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';

interface StageInfo {
  id: number;
  role: UserRole;
  title: string;
  badge: string;
  tagline: string;
  image: string;
  imageCaption: string;
  icon: React.ReactNode;
  telemetry: {
    label: string;
    value: string;
    sub: string;
  }[];
  details: string;
  actionText: string;
}

const STAGES: StageInfo[] = [
  {
    id: 1,
    role: 'farmer',
    title: '1. Geofenced Harvest Listing',
    badge: 'Farm Level • Step 1',
    tagline: 'Farmer logs crop polygon, grade & sets zero-middleman price',
    image: '/sim_stage_farmer.jpg',
    imageCaption: 'Field GPS Polygon Mapping in Shamirpet, Telangana',
    icon: <Sprout size={22} className="text-emerald-600" />,
    telemetry: [
      { label: 'GPS Geofence', value: '17.6056° N, 78.5701° E', sub: 'Verified parcel in Shamirpet' },
      { label: 'Quality Grading', value: 'Grade A Premium', sub: 'Brix 5.4° optical refractometer' },
      { label: 'Farmer Direct Payout', value: '₹30.00 / kg', sub: 'vs ₹14 mandi baseline (+114%)' }
    ],
    details: 'Smallholder and organic farmers register their harvest in under 2 minutes. The geo-tagged digital identity links each lot directly to the field coordinates, ensuring complete provenance and fair direct compensation without commission agents.',
    actionText: 'Open Farmer Onboarding & Land Mapping'
  },
  {
    id: 2,
    role: 'transporter',
    title: '2. Dynamic Route Pickup',
    badge: 'Logistics Fleet • Step 2',
    tagline: 'AI clusters small farm parcels for unified low-emission pickup',
    image: '/sim_stage_logistics.jpg',
    imageCaption: 'Solar-Assisted Refrigerated EV Pickup Fleet',
    icon: <Truck size={22} className="text-emerald-600" />,
    telemetry: [
      { label: 'Cold Chain Status', value: '4.2° C Active', sub: 'Sensor-monitored refrigerated bay' },
      { label: 'Route Efficiency', value: '28% Distance Saved', sub: 'Multi-stop cluster collection algorithm' },
      { label: 'Fleet Turnaround', value: '2 hrs 10 mins', sub: 'Farm gate to hub transit window' }
    ],
    details: 'Logistics partners are assigned auto-optimized route waypoints. Even farmers with small yields (under 30 kg) are aggregated seamlessly without paying punitive individual freight rates.',
    actionText: 'View Logistics Fleet Operations'
  },
  {
    id: 3,
    role: 'hub',
    title: '3. FarmConnect Collection Hub',
    badge: 'Regional Hub • Step 3',
    tagline: 'Automated QC sorting, lot consolidation & barcode serialization',
    image: '/sim_stage_hub.jpg',
    imageCaption: 'Consolidation & Automated Weigh Sorting Hub',
    icon: <Warehouse size={22} className="text-emerald-600" />,
    telemetry: [
      { label: 'Cluster Facility', value: 'Medchal Hub #04', sub: 'Solar-powered cold storage' },
      { label: 'Batch Serialization', value: 'QR-TG-TOM-004821', sub: 'Tamper-evident lot stamping' },
      { label: 'Post-Harvest Loss', value: '< 1.4% Spoilage', sub: 'Industry standard mandi loss is 30%' }
    ],
    details: 'Harvested produce arrives at regional micro-hubs within hours. Lots are weighed with digital certified scales, inspected for grade fidelity, and packaged in breathable compostable crates for city dispatch.',
    actionText: 'Explore Regional Collection Hub'
  },
  {
    id: 4,
    role: 'customer',
    title: '4. Doorstep Delivery & Escrow',
    badge: 'Customer Doorstep • Step 4',
    tagline: 'Consumer scans QR provenance, escrow instantly pays farmer',
    image: '/sim_stage_delivery.jpg',
    imageCaption: 'Doorstep Farm-Fresh Delivery with QR Provenance',
    icon: <HomeIcon size={22} className="text-emerald-600" />,
    telemetry: [
      { label: 'Farm-to-Door Time', value: '11 hrs 40 mins', sub: 'Harvested this morning, on table tonight' },
      { label: 'Escrow Settlement', value: 'Instant UPI Payout', sub: 'Triggered upon delivery confirmation' },
      { label: 'Consumer Savings', value: '18% Below Supermarket', sub: 'Zero distributor markup passed to consumer' }
    ],
    details: 'Consumers receive hyper-fresh produce that never spent days rotting in transit yards. Scanning the crate QR displays the farmer portrait, harvest timestamp, and soil test results, while automated escrow releases instant payment.',
    actionText: 'Explore Customer Marketplace'
  }
];

interface SupplyChainSimulatorProps {
  onSelectRole: (role: UserRole) => void;
}

export const SupplyChainSimulator: React.FC<SupplyChainSimulatorProps> = ({ onSelectRole }) => {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const currentStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];

  return (
    <section style={{ padding: '80px 0 60px', background: '#F0FDF4' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 40px' }}>
          <span className="eyebrow" style={{ marginBottom: '14px', background: '#FFFFFF' }}>
            <span className="dot" aria-hidden="true"></span>
            Biophilic Supply Chain Architecture
          </span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.025em' }}>
            Live Farm-to-Fork Supply Chain Simulator
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', marginTop: '12px', lineHeight: 1.6 }}>
            Click through each operational phase to inspect live AI-generated field telemetry, 
            cold-chain logistics tracking, and automated escrow payout triggers.
          </p>
        </div>

        {/* Dynamic Route Progress Flow Bar */}
        <div style={{ maxWidth: '820px', margin: '0 auto 32px', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            {/* Background connecting track */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                left: '24px',
                right: '24px',
                height: '3px',
                background: '#DDE3DE',
                zIndex: 1,
              }}
            >
              {/* Active progress fill */}
              <div
                style={{
                  height: '100%',
                  background: 'var(--green-600)',
                  width: `${((activeStageId - 1) / 3) * 100}%`,
                  transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              ></div>
            </div>

            {STAGES.map((s) => {
              const isPastOrCurrent = s.id <= activeStageId;
              const isCurrent = s.id === activeStageId;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStageId(s.id)}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    background: isCurrent ? 'var(--green-600)' : isPastOrCurrent ? 'var(--green-700)' : '#FFFFFF',
                    color: isPastOrCurrent ? '#FFFFFF' : 'var(--muted)',
                    border: `2px solid ${isPastOrCurrent ? 'var(--green-600)' : '#CBD5E1'}`,
                    borderRadius: '999px',
                    width: '38px',
                    height: '38px',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: isCurrent ? '0 0 0 4px rgba(47, 133, 90, 0.25)' : 'none',
                    transition: 'all 0.25s ease',
                  }}
                  title={s.title}
                >
                  {isPastOrCurrent && !isCurrent ? <Check size={16} /> : s.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Steps Interactive Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {STAGES.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`sim-node ${isActive ? 'is-active' : ''}`}
                style={{ textAlign: 'left', width: '100%' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: isActive ? 'var(--green-100)' : '#F1F5F9',
                      display: 'grid',
                      placeItems: 'center',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    {stage.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '999px',
                      background: isActive ? 'var(--green-600)' : '#E2E8F0',
                      color: isActive ? '#FFFFFF' : '#475569',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Phase {stage.id}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--ink)' }}>{stage.title}</div>
                <div style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '4px', lineHeight: 1.4 }}>
                  {stage.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Details & Telemetry Console */}
        <div
          key={activeStageId}
          className="stage-animated-content"
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
            {/* Visual Image Presentation */}
            <div>
              <div className="sim-stage-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentStage.image}
                  alt={currentStage.title}
                />
                <div className="sim-stage-image-overlay">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="pulse-dot" style={{ width: '7px', height: '7px' }}></span>
                    <span style={{ fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.02em' }}>
                      {currentStage.imageCaption}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--green-700)', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  <Sparkles size={16} />
                  {currentStage.badge}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                  {currentStage.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '18px' }}>
                  {currentStage.details}
                </p>
                <button
                  onClick={() => onSelectRole(currentStage.role)}
                  className="btn btn-primary"
                  style={{ padding: '11px 22px' }}
                >
                  {currentStage.actionText}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Live Telemetry Dashboard */}
            <div
              style={{
                background: '#091C14',
                borderRadius: 'var(--radius)',
                padding: '24px',
                color: '#FFFFFF',
                border: '1px solid rgba(167, 243, 208, 0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', color: '#A7F3D0' }}>
                  STAGE {currentStage.id} TELEMETRY FEED
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#34D399' }}>
                  <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>
                  REAL-TIME SYNC
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {currentStage.telemetry.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t.label}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#F8FAFC', marginTop: '3px' }}>
                      {t.value}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#34D399', marginTop: '2px' }}>
                      {t.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
