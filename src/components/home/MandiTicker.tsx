'use client';

import React from 'react';
import { useFarmConnect } from '@/context/FarmConnectContext';
import { TrendingUp, ShieldCheck, Activity } from 'lucide-react';

interface TickerItemData {
  crop: string;
  mandiPrice: number;
  farmConnectPrice: number;
  farmerGainPercent: number;
}

const TICKER_DATA: TickerItemData[] = [
  { crop: 'Tomato (Hybrid Red)', mandiPrice: 14, farmConnectPrice: 30, farmerGainPercent: 114 },
  { crop: 'Sona Masoori Rice', mandiPrice: 28, farmConnectPrice: 42, farmerGainPercent: 50 },
  { crop: 'Red Chilli (Teja)', mandiPrice: 65, farmConnectPrice: 90, farmerGainPercent: 38 },
  { crop: 'Turmeric (Curcumin 5%)', mandiPrice: 85, farmConnectPrice: 125, farmerGainPercent: 47 },
  { crop: 'Onion (Grade A)', mandiPrice: 16, farmConnectPrice: 26, farmerGainPercent: 62 },
  { crop: 'Green Capsicum', mandiPrice: 32, farmConnectPrice: 48, farmerGainPercent: 50 },
];

export const MandiTicker: React.FC = () => {
  const { isBackendConnected, backendMode, backendLatency } = useFarmConnect();

  return (
    <div className="ticker-bar-wrap">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Static Prefix Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 16px',
            background: '#091C14',
            zIndex: 10,
            borderRight: '1px solid rgba(255,255,255,0.12)',
            flexShrink: 0,
          }}
        >
          <span className="pulse-dot" aria-hidden="true"></span>
          <span style={{ fontWeight: 700, letterSpacing: '0.04em', fontSize: '12px', color: '#A7F3D0' }}>
            LIVE MANDI PULSE
          </span>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 7px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.08)',
              color: '#94A3B8',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Activity size={12} className="text-emerald-400" />
            {isBackendConnected ? `${backendLatency}ms • ${backendMode}` : 'Offline Mode'}
          </span>
        </div>

        {/* Scrolling Continuous Track */}
        <div style={{ overflow: 'hidden', flex: 1, position: 'relative' }}>
          <div className="ticker-track">
            {/* Duplicated array to create seamless loop */}
            {[...TICKER_DATA, ...TICKER_DATA].map((item, idx) => (
              <div key={idx} className="ticker-item">
                <span style={{ fontWeight: 600, color: '#F8FAFC' }}>{item.crop}</span>
                <span style={{ color: '#94A3B8' }}>
                  Mandi: <s style={{ opacity: 0.7 }}>₹{item.mandiPrice}/kg</s>
                </span>
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>
                  FarmConnect: <strong style={{ color: '#FBBF24' }}>₹{item.farmConnectPrice}/kg</strong>
                </span>
                <span className="ticker-diff-positive">
                  +{item.farmerGainPercent}% Farmer Income
                </span>
                <span style={{ opacity: 0.25, margin: '0 8px' }}>•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
