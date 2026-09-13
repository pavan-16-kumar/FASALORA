'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, CheckCircle, User, ChevronDown } from 'lucide-react';

export default function OnboardingHeader() {
  return (
    <header className="w-full bg-white border-b border-(--border) px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-lg bg-(--green-50) border border-(--green-100) text-(--green-600) flex items-center justify-center">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21V10.5" />
            <path d="M12 11c0-3.9 3.1-7 7-7 0 3.9-3.1 7-7 7Z" />
            <path d="M12 15.5c0-2.8-2.2-5-5-5 0 2.8 2.2 5 5 5Z" />
          </svg>
        </span>
        <span className="text-sm font-bold tracking-[0.14em] text-(--ink)">FARMCONNECT</span>
      </Link>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-(--border-2) bg-white hover:bg-(--green-50) transition-colors">
          <span className="text-xs font-semibold text-(--ink)">A/अ</span>
          <span className="text-xs font-medium text-(--ink-2)">English (IN)</span>
          <ChevronDown className="w-3.5 h-3.5 text-(--muted)" />
        </button>

        {/* Verified Badge */}
        <div className="badge badge-green">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Producer Protocol</span>
        </div>

        {/* Profile Avatar */}
        <Link href="/" className="w-8 h-8 rounded-full bg-(--ink) flex items-center justify-center hover:opacity-90 transition-opacity">
          <User className="w-4 h-4 text-white" />
        </Link>
      </div>
    </header>
  );
}
