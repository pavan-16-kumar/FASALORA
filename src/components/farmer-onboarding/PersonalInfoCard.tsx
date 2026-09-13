'use client';

import React from 'react';
import { UserCircle, User, ShieldCheck, MapPin, Sprout, Layers } from 'lucide-react';

export interface FarmerFormData {
  name: string;
  mobile: string;
  state: string;
  district: string;
  village: string;
  farmArea: number;
  landOwnership: 'Owner' | 'Tenant' | 'Cooperative';
  mainCrop: string;
  lat: number;
  lng: number;
  upiId: string;
}

interface PersonalInfoCardProps {
  formData: FarmerFormData;
  onChange: (updates: Partial<FarmerFormData>) => void;
}

const STATE_DISTRICTS: Record<string, string[]> = {
  Telangana: ['Medchal-Malkajgiri', 'Rangareddy', 'Warangal Urban', 'Nizamabad', 'Karimnagar', 'Khammam'],
  'Andhra Pradesh': ['Krishna', 'Guntur', 'Visakhapatnam', 'Chittoor', 'East Godavari', 'Kurnool'],
  Maharashtra: ['Pune', 'Nashik', 'Nagpur', 'Ahmednagar', 'Solapur', 'Kolhapur'],
  Karnataka: ['Bengaluru Rural', 'Kolar', 'Mysuru', 'Belagavi', 'Shimoga', 'Mandya'],
  Punjab: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Sangrur'],
};

const POPULAR_CROPS = [
  'Tomato',
  'Sona Masoori Rice',
  'Red Chilli',
  'Turmeric',
  'Onion',
  'Green Capsicum',
  'Potato',
  'Cotton'
];

export default function PersonalInfoCard({ formData, onChange }: PersonalInfoCardProps) {
  const currentDistricts = STATE_DISTRICTS[formData.state] || STATE_DISTRICTS['Telangana'];

  const handleStateChange = (newState: string) => {
    const districts = STATE_DISTRICTS[newState] || ['General District'];
    onChange({
      state: newState,
      district: districts[0] || '',
    });
  };

  return (
    <div className="card w-full flex flex-col gap-6" style={{ padding: '28px', background: '#FFFFFF' }}>
      {/* Card Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-(--green-50) border border-(--green-100) flex items-center justify-center text-(--green-600)">
            <UserCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-(--ink)">1. Farmer &amp; Land Details</h2>
            <p className="text-sm text-(--muted) mt-1">Your personal and farm information</p>
          </div>
        </div>
        <div className="badge badge-green">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Required Details</span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Full Name & Mobile Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-(--ink) flex gap-1 uppercase tracking-wider">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="input-control w-full"
                style={{ paddingRight: '36px' }}
                placeholder="e.g., Ramesh Kumar Reddy"
                value={formData.name}
                onChange={(e) => onChange({ name: e.target.value })}
                required
              />
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <p className="text-[11px] text-(--muted)">
              Your name exactly as it appears on your ID or land documents.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-(--ink) flex justify-between uppercase tracking-wider">
              <span>Mobile Number <span className="text-red-500">*</span></span>
              <span className="text-emerald-700 font-semibold lowercase text-[11px]">For Updates</span>
            </label>
            <div className="flex gap-2 w-full">
              <div className="flex items-center gap-1.5 bg-gray-50 border border-(--border) rounded-lg px-2.5 py-2 text-xs font-semibold text-(--ink) shrink-0">
                <span>🇮🇳 +91</span>
              </div>
              <input
                type="tel"
                className="input-control flex-1 font-mono text-sm font-semibold"
                placeholder="9876543210"
                value={formData.mobile}
                onChange={(e) => onChange({ mobile: e.target.value })}
                maxLength={10}
                required
              />
            </div>
            <p className="text-[11px] text-(--muted)">
              We will use this to send you updates and payment alerts.
            </p>
          </div>
        </div>

        {/* State & District Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-(--ink) uppercase tracking-wider">
              State <span className="text-red-500">*</span>
            </label>
            <select
              className="input-control"
              value={formData.state}
              onChange={(e) => handleStateChange(e.target.value)}
            >
              {Object.keys(STATE_DISTRICTS).map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-(--ink) uppercase tracking-wider">
              District <span className="text-red-500">*</span>
            </label>
            <select
              className="input-control"
              value={formData.district}
              onChange={(e) => onChange({ district: e.target.value })}
            >
              {currentDistricts.map((dst) => (
                <option key={dst} value={dst}>
                  {dst}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Village / Gram Panchayat & Farm Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-(--ink) uppercase tracking-wider">
              Village <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="input-control"
                placeholder="e.g. Shamirpet Village"
                value={formData.village}
                onChange={(e) => onChange({ village: e.target.value })}
                required
              />
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-(--ink) uppercase tracking-wider flex justify-between">
              <span>Farm Size (in Acres) <span className="text-red-500">*</span></span>
              <span className="text-amber-700 font-semibold lowercase text-[11px]">Land Size</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="200"
                className="input-control font-semibold"
                placeholder="5.0"
                value={formData.farmArea || ''}
                onChange={(e) => onChange({ farmArea: parseFloat(e.target.value) || 0 })}
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                Acres
              </span>
            </div>
          </div>
        </div>

        {/* Land Ownership Type */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold text-(--ink) uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            Are you the owner or a tenant?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['Owner', 'Tenant', 'Cooperative'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onChange({ landOwnership: type })}
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: formData.landOwnership === type ? '2px solid var(--green-600)' : '1px solid var(--border)',
                  background: formData.landOwnership === type ? 'var(--green-50)' : '#FFFFFF',
                  color: formData.landOwnership === type ? 'var(--green-700)' : 'var(--ink-2)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'center'
                }}
              >
                {type === 'Owner' && '🏡 Land Owner'}
                {type === 'Tenant' && '🤝 Tenant Farmer'}
                {type === 'Cooperative' && '🚜 Cooperative'}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Crop Selector Chips */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold text-(--ink) uppercase tracking-wider flex items-center gap-1.5">
            <Sprout className="w-4 h-4 text-emerald-600" />
            What is your main crop? <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2.5">
            {POPULAR_CROPS.map((crop) => {
              const isSelected = formData.mainCrop === crop;
              return (
                <button
                  key={crop}
                  type="button"
                  onClick={() => onChange({ mainCrop: crop })}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: isSelected ? '1.5px solid var(--green-600)' : '1px solid var(--border)',
                    background: isSelected ? 'var(--green-600)' : '#F8FAFC',
                    color: isSelected ? '#FFFFFF' : 'var(--ink-2)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {crop}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
