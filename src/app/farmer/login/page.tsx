'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sprout, Phone, Lock, AlertCircle, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { FarmerAuthProvider, useAuth } from '@/context/FarmerAuthContext';
import { FarmConnectProvider, useFarmConnect } from '@/context/FarmConnectContext';

function FarmerLoginForm() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const { farmers } = useFarmConnect();

  const [mobile, setMobile] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already authenticated → go straight to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/farmer/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!mobile.trim() || mobile.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!pin || pin.length < 4) {
      setError('Please enter your 4-digit PIN.');
      return;
    }

    setIsLoading(true);
    // Simulate async auth check (100ms for feel)
    await new Promise((r) => setTimeout(r, 900));

    // Demo auth: find farmer by mobile OR allow demo PIN 1234 with any registered mobile
    const normalised = mobile.replace(/\D/g, '').slice(-10);
    const matched = farmers.find(
      (f) => f.mobile.replace(/\D/g, '').slice(-10) === normalised
    );

    if (matched && pin === '1234') {
      login(matched);
      router.push('/farmer/dashboard');
    } else if (!matched) {
      setError('No farmer account found with this mobile number. Please register first.');
      setIsLoading(false);
    } else {
      setError('Incorrect PIN. Use demo PIN: 1234');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-surface-subtle)' }}>
      {/* Header */}
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="logo">
            <div className="logo-mark">
              <Sprout size={18} />
            </div>
            <div>
              <div className="logo-word">FASALORA</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.04em', marginTop: '-2px' }}>
                Smart Farm-to-Customer Network
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div style={{ width: '100%', maxWidth: '440px' }}>
          {/* Card */}
          <div className="card" style={{ padding: '36px 32px' }}>
            {/* Icon + Title */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'var(--green-50)',
                  border: '1px solid var(--green-100)',
                  borderRadius: '16px',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--green-600)',
                  margin: '0 auto 16px',
                }}
              >
                <Sprout size={26} />
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                Farmer Login
              </h1>
              <p style={{ marginTop: '6px', fontSize: '14px', color: 'var(--muted)' }}>
                Sign in to your FASALORA farmer account
              </p>
            </div>

            {/* Demo hint */}
            <div
              style={{
                background: 'var(--green-50)',
                border: '1px solid var(--green-100)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <ShieldCheck size={16} style={{ color: 'var(--green-600)', marginTop: '1px', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--green-700)' }}>Demo Credentials</p>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                  Mobile: <strong>+91 98765 43210</strong> &nbsp;|&nbsp; PIN: <strong>1234</strong>
                </p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  marginBottom: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#991B1B',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Mobile */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink-2)', marginBottom: '6px' }}>
                  Registered Mobile Number
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--muted)',
                    }}
                  />
                  <input
                    id="farmer-mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => { setMobile(e.target.value); setError(null); }}
                    placeholder="+91 98765 43210"
                    className="input-control"
                    style={{ paddingLeft: '40px' }}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
              </div>

              {/* PIN */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink-2)', marginBottom: '6px' }}>
                  4-Digit PIN
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--muted)',
                    }}
                  />
                  <input
                    id="farmer-pin"
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => { setPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setError(null); }}
                    placeholder="• • • •"
                    className="input-control"
                    style={{ paddingLeft: '40px', paddingRight: '44px', letterSpacing: '0.2em' }}
                    inputMode="numeric"
                    maxLength={4}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin((s) => !s)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--muted)',
                      padding: '4px',
                    }}
                    aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
                  >
                    {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                id="farmer-login-btn"
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '13px 24px', fontSize: '15px', marginTop: '4px' }}
              >
                {isLoading ? (
                  <>
                    <span
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255,255,255,0.4)',
                        borderTopColor: '#fff',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'spin 0.7s linear infinite',
                      }}
                    />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Footer links */}
            <div style={{ marginTop: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
                Not registered yet?{' '}
                <Link href="/farmer/onboarding" style={{ color: 'var(--green-700)', fontWeight: 600 }}>
                  Register as Farmer
                </Link>
              </p>
              <Link href="/" style={{ fontSize: '12.5px', color: 'var(--muted)' }}>
                ← Back to FASALORA Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default function FarmerLoginPage() {
  return (
    <FarmConnectProvider>
      <FarmerAuthProvider>
        <FarmerLoginForm />
      </FarmerAuthProvider>
    </FarmConnectProvider>
  );
}
