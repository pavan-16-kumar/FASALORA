'use client';

import React, { useState } from 'react';
import { ShieldCheck, CreditCard, X } from 'lucide-react';
import { FarmerProfile } from '@/types';

interface WelcomeBannerProps {
  farmer: FarmerProfile;
}

export default function WelcomeBanner({ farmer }: WelcomeBannerProps) {
  const [idCardOpen, setIdCardOpen] = useState(false);

  const firstName = farmer.name.split(' ')[0];

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '24px',
        }}
      >
        {/* Left: Greeting */}
        <div>
          <h1
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: 'var(--ink)',
              lineHeight: 1.2,
            }}
          >
            Welcome back, {firstName} 👋
          </h1>
          <p style={{ marginTop: '6px', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
            Manage your farm, crops, orders and earnings from one place.
          </p>
        </div>

        {/* Right: Verified Identity Card */}
        <div
          style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: 'var(--shadow-sm)',
            flexShrink: 0,
            minWidth: '260px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              background: 'var(--green-50)',
              border: '1px solid var(--green-100)',
              borderRadius: '11px',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--green-600)',
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--green-700)' }}>
                Farmer ID
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  background: 'var(--green-50)',
                  color: 'var(--green-700)',
                  border: '1px solid var(--green-100)',
                  borderRadius: '999px',
                  padding: '1px 7px',
                }}
              >
                Verified
              </span>
            </div>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--ink)',
                fontFamily: 'monospace',
                letterSpacing: '0.04em',
                marginTop: '3px',
              }}
            >
              {farmer.farmerId}
            </p>
          </div>
          <button
            id="view-id-card-btn"
            onClick={() => setIdCardOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'var(--green-50)',
              border: '1px solid var(--green-100)',
              borderRadius: '8px',
              padding: '6px 11px',
              color: 'var(--green-700)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--green-100)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--green-50)'; }}
          >
            <CreditCard size={13} />
            View ID Card
          </button>
        </div>
      </div>

      {/* ID Card Modal */}
      {idCardOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setIdCardOpen(false)}
          style={{ cursor: 'pointer' }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '380px', padding: '0', overflow: 'hidden', cursor: 'default' }}
          >
            {/* Card Header */}
            <div style={{ background: 'var(--green-600)', padding: '20px 24px', color: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: '11px', letterSpacing: '0.08em', fontWeight: 600, opacity: 0.8 }}>FASALORA</p>
                  <p style={{ fontSize: '10px', opacity: 0.7, marginTop: '2px' }}>Smart Farm-to-Customer Network</p>
                </div>
                <button
                  onClick={() => setIdCardOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '6px', width: '28px', height: '28px', display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#fff' }}
                >
                  <X size={14} />
                </button>
              </div>
              {/* Avatar */}
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '14px',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#fff',
                    border: '2px solid rgba(255,255,255,0.3)',
                  }}
                >
                  {farmer.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#fff' }}>{farmer.name}</p>
                  <p style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>Registered Farmer · Telangana</p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: '20px 24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { label: 'Farmer ID', value: farmer.farmerId },
                  { label: 'Mobile', value: farmer.mobile },
                  { label: 'District', value: farmer.district },
                  { label: 'State', value: farmer.state },
                  { label: 'Village', value: farmer.village },
                  { label: 'Farm Area', value: `${farmer.farmArea} Acres` },
                  { label: 'Main Crop', value: farmer.mainCrop },
                  { label: 'Status', value: '✓ Verified' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginTop: '3px' }}>{value}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', padding: '10px 12px', background: 'var(--green-50)', borderRadius: '8px', border: '1px solid var(--green-100)' }}>
                <p style={{ fontSize: '11px', color: 'var(--green-700)', fontWeight: 500 }}>
                  🔒 GPS location is private and not shown publicly — only region is displayed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
