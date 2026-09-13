'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, ShieldCheck, EyeOff, CheckCircle2, Sparkles } from 'lucide-react';
import { MapPicker } from '@/components/MapPicker';

interface GeolocationCardProps {
  lat: number;
  lng: number;
  district: string;
  state: string;
  onLocationSelect: (lat: number, lng: number) => void;
}

export default function GeolocationCard({
  lat,
  lng,
  district,
  state,
  onLocationSelect
}: GeolocationCardProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string>('Standard Cluster Center');

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = Number(position.coords.latitude.toFixed(4));
        const userLng = Number(position.coords.longitude.toFixed(4));
        onLocationSelect(userLat, userLng);
        setLocationStatus('Verified Device GPS Lock');
        setIsLocating(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        // Fallback for demo: pick nearby coordinate
        const fallbackLat = Number((17.6056 + (Math.random() - 0.5) * 0.02).toFixed(4));
        const fallbackLng = Number((78.5701 + (Math.random() - 0.5) * 0.02).toFixed(4));
        onLocationSelect(fallbackLat, fallbackLng);
        setLocationStatus('Simulated GPS Field Lock');
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="card w-full flex flex-col gap-5" style={{ padding: '28px', background: '#FFFFFF' }}>
      {/* Card Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-(--green-50) border border-(--green-100) flex items-center justify-center text-(--green-600)">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-(--ink)">2. Farm Location</h2>
            <p className="text-xs text-(--muted)">Click the map or use GPS to pin your farm</p>
          </div>
        </div>
        <div className="badge badge-green">
          <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>
          <span>{locationStatus}</span>
        </div>
      </div>

      {/* GPS Action Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-gray-50 border border-(--border) p-3 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-(--ink)">
          <Sparkles size={15} className="text-emerald-600" />
          <span>Farm Region: <b>{district || 'Medchal'}, {state || 'Telangana'}</b></span>
        </div>

        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={isLocating}
          className="btn btn-ghost"
          style={{
            padding: '7px 14px',
            fontSize: '12px',
            fontWeight: 700,
            background: '#FFFFFF',
            border: '1px solid var(--border-2)',
            color: 'var(--green-700)',
          }}
        >
          <Navigation size={14} className={isLocating ? 'animate-spin' : ''} />
          {isLocating ? 'Finding Location...' : 'Use My Location'}
        </button>
      </div>

      {/* Interactive Leaflet Map Component */}
      <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', minHeight: '340px', border: '1px solid var(--border)' }}>
        <MapPicker
          lat={lat}
          lng={lng}
          interactive={true}
          onLocationSelect={onLocationSelect}
          label="Pickup Location"
        />
      </div>

      {/* Coordinate Readout */}
      <div className="grid grid-cols-2 gap-3 bg-gray-50 border border-(--border) p-3.5 rounded-xl">
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-wider text-(--muted)">Latitude (N)</div>
          <div className="text-base font-mono font-bold text-(--ink) mt-0.5">{lat.toFixed(4)}° N</div>
        </div>
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-wider text-(--muted)">Longitude (E)</div>
          <div className="text-base font-mono font-bold text-(--ink) mt-0.5">{lng.toFixed(4)}° E</div>
        </div>
      </div>

      {/* Privacy Masking Guarantee */}
      <div
        style={{
          background: 'var(--green-50)',
          border: '1px solid var(--green-100)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <EyeOff size={18} className="text-emerald-700 shrink-0 mt-0.5" />
        <div style={{ fontSize: '11.5px', color: 'var(--ink-2)', lineHeight: 1.45 }}>
          <b>Privacy Protected:</b> Buyers only see your district and state (e.g. <i>{district}, {state}</i>). Your exact location is only shared with our pickup drivers.
        </div>
      </div>
    </div>
  );
}
