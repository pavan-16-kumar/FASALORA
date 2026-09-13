'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FarmerProfile } from '@/types';
import { FarmerIDCard } from '@/components/FarmerIDCard';
import { CheckCircle2, Copy, Check, Download, ArrowRight, Sprout, ShieldCheck, Sparkles } from 'lucide-react';

interface RegistrationSuccessViewProps {
  farmer: FarmerProfile;
  onGoToDashboard: () => void;
}

export default function RegistrationSuccessView({
  farmer,
  onGoToDashboard,
}: RegistrationSuccessViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(farmer.farmerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    alert(`Downloading Digital Producer Passport for ${farmer.name} (${farmer.farmerId})...`);
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto py-4">
      {/* Top Banner & Welcome Indicator */}
      <div className="text-center flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-700 shadow-sm animate-bounce">
          <CheckCircle2 size={36} />
        </div>

        <span className="badge badge-green px-3 py-1 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} className="text-emerald-700" />
          Farmer Verification Successful
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-(--ink) tracking-tight">
          Welcome to FarmConnect, {farmer.name}!
        </h1>

        <p className="text-sm sm:text-base text-(--muted) max-w-lg leading-relaxed">
          Your farm at <b>{farmer.village}, {farmer.district}</b> has been mapped and verified. You are now officially registered as a farmer.
        </p>
      </div>

      {/* Generated ID Highlight Banner */}
      <div className="w-full bg-emerald-900 text-white rounded-2xl p-5 border border-emerald-700 shadow-md flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-300">
            Your Farmer ID
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white mt-1">
            {farmer.farmerId}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyId}
            className="btn btn-ghost"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#FFFFFF',
              fontSize: '13px',
              padding: '8px 16px',
            }}
          >
            {copied ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} />}
            {copied ? 'Copied to Clipboard!' : 'Copy ID'}
          </button>
        </div>
      </div>

      {/* Holographic Digital ID Card Preview */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-(--muted)">
            Digital Farmer ID Card
          </span>
          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <ShieldCheck size={14} />
            Verified Secure
          </span>
        </div>
        <FarmerIDCard farmer={farmer} />
      </div>

      {/* Action Buttons (Module 2 Requirements) */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-(--border)">
        <button
          onClick={handleDownload}
          className="btn btn-outline w-full sm:w-auto"
          style={{ padding: '12px 20px', fontSize: '14px', fontWeight: 600 }}
        >
          <Download size={16} />
          Download ID Card
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="btn btn-ghost w-full sm:w-auto text-center"
            style={{ padding: '12px 18px', fontSize: '14px' }}
          >
            Return to Home
          </Link>
          <button
            onClick={onGoToDashboard}
            className="btn btn-primary btn-shimmer w-full sm:w-auto"
            style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 700 }}
          >
            <Sprout size={17} />
            Go to Dashboard &amp; Sell Crops
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
