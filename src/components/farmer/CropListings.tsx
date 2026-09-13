'use client';

import React from 'react';
import { List, PlusCircle, Pencil, RefreshCcw, Eye } from 'lucide-react';
import { CropListing } from '@/types';

interface CropListingsProps {
  crops: CropListing[];
  onAddCrop: () => void;
  onEditCrop?: (id: string) => void;
}

const GRADE_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  'Grade A':        { bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' },
  'Grade B':        { bg: '#FFFBEB', color: '#92400E', border: '#FDE68A' },
  'Organic Premium':{ bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE' },
};

function GradeBadge({ grade }: { grade: string }) {
  const meta = GRADE_COLORS[grade] || GRADE_COLORS['Grade A'];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '999px',
        fontSize: '10.5px',
        fontWeight: 600,
        background: meta.bg,
        color: meta.color,
        border: `1px solid ${meta.border}`,
      }}
    >
      {grade}
    </span>
  );
}

export default function CropListings({ crops, onAddCrop, onEditCrop }: CropListingsProps) {
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
            <List size={17} />
          </div>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>My Crop Listings</h2>
            <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '1px' }}>
              {crops.length} listing{crops.length !== 1 ? 's' : ''} active
            </p>
          </div>
        </div>
        <button id="add-crop-listing-btn" onClick={onAddCrop} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '13px', gap: '6px' }}>
          <PlusCircle size={14} /> Add Crop
        </button>
      </div>

      {/* Empty State */}
      {crops.length === 0 ? (
        <div style={{ padding: '48px 24px', textAlign: 'center' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              background: 'var(--green-50)',
              borderRadius: '14px',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--green-600)',
              margin: '0 auto 14px',
            }}
          >
            <List size={24} />
          </div>
          <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)' }}>No crops listed yet</p>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '6px', marginBottom: '18px' }}>
            Start selling your produce on Fasalora.
          </p>
          <button id="add-first-crop-btn" onClick={onAddCrop} className="btn btn-primary" style={{ gap: '7px' }}>
            <PlusCircle size={15} />
            Add Your First Crop
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0',
          }}
          className="crops-grid"
        >
          {crops.map((crop, i) => {
            const isLast = i === crops.length - 1;
            const isLastRow = i >= crops.length - (crops.length % 3 || 3);
            return (
              <div
                key={crop.id}
                style={{
                  padding: '18px 20px',
                  borderRight: (i + 1) % 3 !== 0 && !isLast ? '1px solid var(--border)' : 'none',
                  borderBottom: !isLastRow ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#FAFAFA'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
              >
                {/* Crop Image */}
                <div
                  style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '12px',
                    background: 'var(--green-50)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={crop.imageUrl}
                    alt={crop.cropName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>

                {/* Crop Info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>{crop.cropName}</h3>
                  <GradeBadge grade={crop.grade} />
                </div>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '10px' }}>{crop.variety}</p>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '10px' }}>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: 'var(--green-700)' }}>₹{crop.pricePerKg}/kg</p>
                    <p style={{ fontSize: '11px', color: 'var(--muted)' }}>Price</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)' }}>{crop.availableQuantity} kg</p>
                    <p style={{ fontSize: '11px', color: 'var(--muted)' }}>Available</p>
                  </div>
                </div>

                {/* Listing ID + Harvest */}
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '10.5px', fontFamily: 'monospace', color: 'var(--muted)', fontWeight: 600 }}>{crop.listingId}</p>
                  <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                    Harvest: {new Date(crop.harvestDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                {/* Status + Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '3px 9px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: crop.availableQuantity > 0 ? 'var(--green-50)' : '#F3F4F6',
                      color: crop.availableQuantity > 0 ? 'var(--green-700)' : 'var(--muted)',
                      border: `1px solid ${crop.availableQuantity > 0 ? 'var(--green-100)' : '#E5E7EB'}`,
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: crop.availableQuantity > 0 ? 'var(--green-500)' : '#9CA3AF',
                      }}
                    />
                    {crop.availableQuantity > 0 ? 'Active' : 'Sold Out'}
                  </span>

                  <div style={{ display: 'flex', gap: '5px' }}>
                    {[
                      { id: `edit-crop-${crop.id}`, icon: Pencil, label: 'Edit', action: () => onEditCrop?.(crop.id) },
                      { id: `stock-crop-${crop.id}`, icon: RefreshCcw, label: 'Stock', action: () => {} },
                      { id: `view-crop-${crop.id}`, icon: Eye, label: 'View', action: () => {} },
                    ].map(({ id, icon: Icon, label, action }) => (
                      <button
                        key={id}
                        id={id}
                        onClick={action}
                        title={label}
                        style={{
                          width: '30px',
                          height: '30px',
                          background: 'none',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          display: 'grid',
                          placeItems: 'center',
                          cursor: 'pointer',
                          color: 'var(--muted)',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--green-50)';
                          e.currentTarget.style.borderColor = 'var(--green-100)';
                          e.currentTarget.style.color = 'var(--green-700)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'none';
                          e.currentTarget.style.borderColor = 'var(--border)';
                          e.currentTarget.style.color = 'var(--muted)';
                        }}
                      >
                        <Icon size={13} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .crops-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .crops-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
