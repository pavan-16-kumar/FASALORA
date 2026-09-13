'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/FarmerAuthContext';
import FarmerDashboard from '@/components/farmer/FarmerDashboard';

export default function FarmerDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Wait for localStorage hydration before redirecting
    if (!isLoading && !isAuthenticated) {
      router.replace('/farmer/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show nothing while hydrating auth state to avoid flash
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-surface-subtle)',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--green-100)',
            borderTopColor: 'var(--green-600)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 500 }}>Loading your dashboard…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Not authenticated → redirect handled by useEffect, show nothing
  if (!isAuthenticated) return null;

  return <FarmerDashboard />;
}
