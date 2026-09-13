'use client';

import React, { useState } from 'react';
import { FarmerProfile } from '@/types';
import { Copy, Check, Download, MapPin, ShieldCheck } from 'lucide-react';

interface FarmerIDCardProps {
  farmer: FarmerProfile;
}

export const FarmerIDCard: React.FC<FarmerIDCardProps> = ({ farmer }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(farmer.farmerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    alert(`Downloading Digital ID Card for ${farmer.name} (${farmer.farmerId})`);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, var(--green-700) 0%, var(--green-600) 100%)',
        borderRadius: 'var(--radius)',
        padding: '22px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 24px -4px rgba(47, 133, 90, 0.28)',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20px',
          left: '-20px',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          pointerEvents: 'none',
        }}
      />

      {/* Card Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.18)',
          paddingBottom: '12px',
          marginBottom: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21V10.5" />
              <path d="M12 11c0-3.9 3.1-7 7-7 0 3.9-3.1 7-7 7Z" />
              <path d="M12 15.5c0-2.8-2.2-5-5-5 0 2.8 2.2 5 5 5Z" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, opacity: 0.9 }}>
              FARMCONNECT PRODUCER PASSPORT
            </div>
            <div style={{ fontSize: '10px', opacity: 0.75 }}>Govt. Verified Agricultural ID</div>
          </div>
        </div>

        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.25)',
            padding: '3px 8px',
            borderRadius: '999px',
            fontSize: '10.5px',
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          <ShieldCheck size={12} /> VERIFIED
        </span>
      </div>

      {/* Farmer ID Display */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '10.5px', opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
          Standardized Farmer ID
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <code
            style={{
              fontFamily: 'monospace',
              fontSize: '1.05rem',
              fontWeight: 700,
              background: 'rgba(255,255,255,0.14)',
              border: '1px solid rgba(255,255,255,0.22)',
              padding: '5px 10px',
              borderRadius: '8px',
              letterSpacing: '0.04em',
              flex: 1,
            }}
          >
            {farmer.farmerId}
          </code>
          <button
            onClick={handleCopy}
            style={{
              padding: '6px 8px',
              background: 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            title="Copy ID"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
        </div>
      </div>

      {/* Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12.5px' }}>
        <div>
          <div style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase' }}>Cultivator</div>
          <div style={{ fontWeight: 700, marginTop: '2px' }}>{farmer.name}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase' }}>Main Commodity</div>
          <div style={{ fontWeight: 700, marginTop: '2px' }}>{farmer.mainCrop}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase' }}>Location</div>
          <div style={{ fontWeight: 600, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={11} style={{ opacity: 0.85 }} />
            {farmer.village}, {farmer.district}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase' }}>Farm Holding</div>
          <div style={{ fontWeight: 600, marginTop: '2px' }}>{farmer.farmArea} Acres</div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '14px',
          paddingTop: '10px',
          borderTop: '1px solid rgba(255,255,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '11px', opacity: 0.75 }}>GPS Privacy Masked</span>
        <button
          onClick={handleDownload}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff',
            padding: '5px 12px',
            borderRadius: '999px',
            fontSize: '11.5px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
        >
          <Download size={12} /> Download ID Card
        </button>
      </div>
    </div>
  );
};
