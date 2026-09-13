'use client';

import React from 'react';
import { Wheat, ShieldCheck, MapPin, ChevronRight } from 'lucide-react';
import { FarmerProfile } from '@/types';

interface FarmProfileProps {
  farmer: FarmerProfile;
}

export default function FarmProfile({ farmer }: FarmProfileProps) {
  const fields = [
    { label: 'Farmer Name', value: farmer.name },
    { label: 'Farmer ID', value: farmer.farmerId, mono: true },
    { label: 'Village', value: farmer.village },
    { label: 'Mandal/Block', value: 'Medchal' },
    { label: 'District', value: farmer.district },
    { label: 'State', value: farmer.state },
    { label: 'Farm Area', value: `${farmer.farmArea} Acres` },
    { label: 'Main Crop', value: farmer.mainCrop },
  ];

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
            <Wheat size={17} />
          </div>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>My Farm</h2>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 10px',
            background: 'var(--green-50)',
            border: '1px solid var(--green-100)',
            borderRadius: '999px',
            fontSize: '11.5px',
            fontWeight: 600,
            color: 'var(--green-700)',
          }}
        >
          <ShieldCheck size={13} />
          Verified
        </div>
      </div>

      <div style={{ padding: '20px 22px' }}>
        {/* Location badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '18px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--muted)',
          }}
        >
          <MapPin size={14} style={{ color: 'var(--green-600)' }} />
          {farmer.district}, {farmer.state}
          <span
            style={{
              fontSize: '10.5px',
              fontWeight: 500,
              color: 'var(--muted)',
              background: '#F3F4F6',
              borderRadius: '4px',
              padding: '1px 5px',
              marginLeft: '4px',
            }}
          >
            📍 Region only — GPS private
          </span>
        </div>

        {/* Fields grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '14px 24px',
          }}
          className="farm-profile-grid"
        >
          {fields.map(({ label, value, mono }) => (
            <div key={label}>
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '4px',
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  fontFamily: mono ? 'monospace' : 'inherit',
                  letterSpacing: mono ? '0.03em' : 'inherit',
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
          <button
            id="view-farm-profile-btn"
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
              padding: 0,
            }}
          >
            View Farm Profile <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .farm-profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
