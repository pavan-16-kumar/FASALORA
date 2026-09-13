'use client';

import React from 'react';
import { PlusCircle, List, Sparkles } from 'lucide-react';

interface AddCropCTAProps {
  onAddCrop: () => void;
  onViewCrops: () => void;
}

export default function AddCropCTA({ onAddCrop, onViewCrops }: AddCropCTAProps) {
  return (
    <div
      className="card"
      style={{
        padding: '24px 28px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap',
        borderColor: 'var(--green-100)',
        background: 'linear-gradient(135deg, #FFFFFF 0%, var(--green-50) 100%)',
      }}
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1, minWidth: '240px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            background: 'var(--green-600)',
            borderRadius: '13px',
            display: 'grid',
            placeItems: 'center',
            color: '#fff',
            flexShrink: 0,
          }}
        >
          <Sparkles size={22} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--ink)' }}>
            Ready to sell your next harvest?
          </h2>
          <p style={{ marginTop: '5px', fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.55, maxWidth: '480px' }}>
            List your produce and make it available to buyers across the Fasalora marketplace.
          </p>
        </div>
      </div>

      {/* Right: Buttons */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flexShrink: 0 }}>
        <button
          id="add-new-crop-btn"
          onClick={onAddCrop}
          className="btn btn-primary"
          style={{ gap: '7px' }}
        >
          <PlusCircle size={16} />
          Add New Crop
        </button>
        <button
          id="view-my-crops-btn"
          onClick={onViewCrops}
          className="btn btn-ghost"
          style={{ gap: '7px' }}
        >
          <List size={16} />
          View My Crops
        </button>
      </div>
    </div>
  );
}
