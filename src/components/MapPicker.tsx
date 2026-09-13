'use client';

import React, { useEffect, useState } from 'react';
import { Navigation } from 'lucide-react';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('./LeafletMap'), { 
  ssr: false,
  loading: () => (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e8f5ee' }}>
      <div style={{
        animation: 'pulse 1.5s ease-in-out infinite',
        color: 'var(--primary)',
        fontWeight: 600,
        fontSize: '14px'
      }}>
        Loading interactive map...
      </div>
    </div>
  )
});

interface MapPickerProps {
  lat: number;
  lng: number;
  label?: string;
  onLocationSelect?: (lat: number, lng: number) => void;
  interactive?: boolean;
}

export const MapPicker: React.FC<MapPickerProps> = ({
  lat,
  lng,
  label = 'Selected Location',
  onLocationSelect,
  interactive = false
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          background: 'var(--bg-surface-muted)',
          borderRadius: 'inherit',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <LeafletMap lat={lat} lng={lng} interactive={interactive} onLocationSelect={onLocationSelect} />
      
      {/* Coords overlay */}
      <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          right: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
          zIndex: 1000
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(6px)',
          border: '1px solid var(--border)',
          padding: '4px 10px',
          borderRadius: '8px',
          fontSize: '0.65rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Navigation size={11} color="var(--accent)" />
          Lat: {lat.toFixed(4)}°, Lng: {lng.toFixed(4)}°
        </div>
        {interactive && (
          <span style={{
            background: 'var(--primary-light)',
            border: '1px solid rgba(45,122,79,0.25)',
            color: 'var(--primary)',
            fontSize: '0.62rem',
            fontWeight: 600,
            padding: '3px 8px',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            Click map to re-position
          </span>
        )}
      </div>
    </div>
  );
};
