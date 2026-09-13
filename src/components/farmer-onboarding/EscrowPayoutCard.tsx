'use client';

import React from 'react';
import { CreditCard, ShieldCheck, Zap, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

interface EscrowPayoutCardProps {
  upiId: string;
  mobile: string;
  onChange: (upiId: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export default function EscrowPayoutCard({
  upiId,
  mobile,
  onChange,
  onSubmit,
  isSubmitting,
}: EscrowPayoutCardProps) {
  const suggestedUpi = mobile ? `${mobile}@upi` : 'farmer@upi';

  return (
    <div className="card w-full flex flex-col gap-5" style={{ padding: '28px', background: '#FFFFFF' }}>
      {/* Card Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-(--green-50) border border-(--green-100) flex items-center justify-center text-(--green-600)">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-(--ink)">3. Bank Payment Details</h2>
            <p className="text-xs text-(--muted)">Get paid directly to your bank account with zero fees</p>
          </div>
        </div>
        <div className="badge badge-green">
          <Lock className="w-3.5 h-3.5" />
          <span>Secure Payments</span>
        </div>
      </div>

      {/* Payout Input Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-(--ink) flex justify-between uppercase tracking-wider">
            <span>Your UPI ID <span className="text-red-500">*</span></span>
            <button
              type="button"
              onClick={() => onChange(suggestedUpi)}
              className="text-emerald-700 hover:underline lowercase font-semibold text-[11px]"
            >
              Use mobile UPI ({suggestedUpi})
            </button>
          </label>
          <div className="relative">
            <input
              type="text"
              className="input-control font-mono font-medium"
              placeholder="e.g. 9876543210@upi or ramesh@sbi"
              value={upiId}
              onChange={(e) => onChange(e.target.value)}
              required
            />
          </div>
          <p className="text-[11px] text-(--muted)">
            Works with PhonePe, Google Pay, BHIM, Paytm, or any bank UPI.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 bg-gray-50 border border-(--border) rounded-xl text-center">
            <Zap className="w-4 h-4 text-amber-600 mx-auto mb-1" />
            <div className="text-xs font-bold text-(--ink)">Instant Payout</div>
            <div className="text-[10.5px] text-(--muted) mt-0.5">Right after your crop is picked up</div>
          </div>
          <div className="p-3 bg-gray-50 border border-(--border) rounded-xl text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
            <div className="text-xs font-bold text-(--ink)">No Middleman Fees</div>
            <div className="text-[10.5px] text-(--muted) mt-0.5">You get the full price for your crops</div>
          </div>
          <div className="p-3 bg-gray-50 border border-(--border) rounded-xl text-center">
            <CheckCircle2 className="w-4 h-4 text-blue-600 mx-auto mb-1" />
            <div className="text-xs font-bold text-(--ink)">Guaranteed Payment</div>
            <div className="text-[10.5px] text-(--muted) mt-0.5">Money is secured before pickup</div>
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="pt-3 border-t border-(--border)">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="btn btn-primary btn-shimmer w-full"
            style={{
              padding: '16px 28px',
              fontSize: '16px',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(47, 133, 90, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <span>{isSubmitting ? 'Creating Farmer ID...' : 'Get Farmer ID & Complete Registration'}</span>
            <ArrowRight size={18} />
          </button>
          <p className="text-[11.5px] text-center text-(--muted) mt-2.5">
            By registering, your farm is verified on the FarmConnect platform.
          </p>
        </div>
      </div>
    </div>
  );
}
