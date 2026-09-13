'use client';

import React from 'react';
import { useFarmConnect } from '@/context/FarmConnectContext';
import { CropListing } from '@/types';
import { ShoppingBag, ArrowRight, MapPin, CheckCircle2, Sparkles, Clock } from 'lucide-react';

interface LiveHarvestPreviewProps {
  onOpenMarketplace: () => void;
  onOpenCart: () => void;
}

export const LiveHarvestPreview: React.FC<LiveHarvestPreviewProps> = ({
  onOpenMarketplace,
  onOpenCart
}) => {
  const { crops, addToCart } = useFarmConnect();

  const handleQuickAdd = (crop: CropListing, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      listingId: crop.listingId,
      cropName: crop.cropName,
      farmerId: crop.farmerId,
      farmerName: crop.farmerName,
      grade: crop.grade,
      quantity: 5, // Default 5kg sample quantity
      pricePerKg: crop.pricePerKg,
      cropValue: 5 * crop.pricePerKg,
    });
    onOpenCart();
  };

  return (
    <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
          <div>
            <span className="eyebrow" style={{ marginBottom: '12px' }}>
              <span className="dot" aria-hidden="true"></span>
              Direct From Soil • Live Stream
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.025em' }}>
              Fresh Harvest Batches Ready for Dispatch
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--muted)', marginTop: '8px' }}>
              100% geo-traced directly from certified farmers. Picked within the last 24 hours.
            </p>
          </div>

          <button
            onClick={onOpenMarketplace}
            className="btn btn-ghost"
            style={{ fontWeight: 600, border: '1px solid var(--border-2)' }}
          >
            View All Marketplace Listings ({crops.length})
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Crops Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
          {crops.slice(0, 4).map((crop) => {
            const percentAvailable = Math.round((crop.availableQuantity / crop.totalQuantity) * 100);
            const mandiEst = Math.round(crop.pricePerKg * 0.52);

            return (
              <div
                key={crop.id || crop.listingId}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.22s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--green-500)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                onClick={onOpenMarketplace}
              >
                {/* Crop Image with Badges */}
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden', background: '#F1F5F9' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={crop.imageUrl}
                    alt={crop.cropName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(15, 31, 23, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#A7F3D0',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Sparkles size={12} />
                    {crop.grade}
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '12px',
                      background: 'rgba(255,255,255,0.92)',
                      backdropFilter: 'blur(6px)',
                      color: 'var(--ink)',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Clock size={12} className="text-emerald-700" />
                    Harvested {crop.harvestDate}
                  </div>
                </div>

                {/* Content Area */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <MapPin size={13} className="text-emerald-600" />
                    {crop.farmerLocation} • {crop.farmerName}
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
                    {crop.cropName}
                  </h3>

                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
                    {crop.variety}
                  </div>

                  {/* Stock Bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--muted)', marginBottom: '6px' }}>
                      <span>Stock Available</span>
                      <span style={{ fontWeight: 600, color: 'var(--ink)' }}>
                        {crop.availableQuantity} kg / {crop.totalQuantity} kg
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${percentAvailable}%`,
                          height: '100%',
                          background: percentAvailable > 25 ? 'var(--green-600)' : '#F59E0B',
                          borderRadius: '999px',
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                        Mandi: <s style={{ opacity: 0.7 }}>₹{mandiEst}</s>
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--green-700)' }}>
                        ₹{crop.pricePerKg}
                        <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)' }}> / kg</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(crop, e)}
                      className="btn btn-primary"
                      style={{ padding: '8px 14px', fontSize: '13px' }}
                      title="Quick order 5kg batch"
                    >
                      <ShoppingBag size={14} />
                      Buy 5kg
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
