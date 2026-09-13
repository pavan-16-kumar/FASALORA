'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { FarmConnectProvider, useFarmConnect } from '@/context/FarmConnectContext';
import { FarmerProfile } from '@/types';
import OnboardingHeader from '@/components/farmer-onboarding/OnboardingHeader';
import PersonalInfoCard, { FarmerFormData } from '@/components/farmer-onboarding/PersonalInfoCard';
import GeolocationCard from '@/components/farmer-onboarding/GeolocationCard';
import EscrowPayoutCard from '@/components/farmer-onboarding/EscrowPayoutCard';
import RegistrationSuccessView from '@/components/farmer-onboarding/RegistrationSuccessView';

function FarmerOnboardingContent() {
  const router = useRouter();
  const { registerFarmer, setActiveRole } = useFarmConnect();

  const [formData, setFormData] = useState<FarmerFormData>({
    name: '',
    mobile: '',
    state: 'Telangana',
    district: 'Medchal-Malkajgiri',
    village: '',
    farmArea: 5.0,
    landOwnership: 'Owner',
    mainCrop: 'Tomato',
    lat: 17.6056,
    lng: 78.5701,
    upiId: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredFarmer, setRegisteredFarmer] = useState<FarmerProfile | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleUpdateFormData = (updates: Partial<FarmerFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setErrorMsg(null);
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Form Validations
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full legal name as per land ownership records.');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    if (!formData.mobile.trim() || formData.mobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number for OTP alerts and payouts.');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    if (!formData.village.trim()) {
      setErrorMsg('Please enter your Village or Gram Panchayat.');
      window.scrollTo({ top: 240, behavior: 'smooth' });
      return;
    }

    if (!formData.farmArea || formData.farmArea <= 0) {
      setErrorMsg('Please enter valid farm land area in acres.');
      return;
    }

    try {
      setIsSubmitting(true);
      const newFarmer = await registerFarmer({
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        state: formData.state,
        district: formData.district,
        village: formData.village.trim(),
        farmArea: Number(formData.farmArea),
        mainCrop: formData.mainCrop,
        lat: formData.lat,
        lng: formData.lng,
      });

      setRegisteredFarmer(newFarmer);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      console.error('Registration failed:', err);
      setErrorMsg('Registration could not be completed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleGoToDashboard = () => {
    setActiveRole('farmer');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-(--bg-app) flex flex-col font-(family-name:--font-body)">
      <OnboardingHeader />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
          <Link href="/" className="text-(--muted) hover:text-(--green-700) transition-colors">
            FarmConnect Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-(--muted)" />
          <span className="text-(--ink)">
            {registeredFarmer ? 'Digital ID Card' : 'Farmer Registration'}
          </span>
        </div>

        {/* If registration succeeded, show Module 2: Digital ID Card Screen */}
        {registeredFarmer ? (
          <RegistrationSuccessView
            farmer={registeredFarmer}
            onGoToDashboard={handleGoToDashboard}
          />
        ) : (
          <>
            {/* Page Header & Guided Stepper */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Title Area */}
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="badge badge-green self-start px-3 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 inline" />
                  VERIFIED FARMER PLATFORM
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-(--ink) tracking-tight">
                  Farmer Registration
                </h1>
                <p className="text-sm sm:text-base text-(--muted) leading-relaxed">
                  Register to sell your crops directly with no middlemen. Add your farm location and get your unique Farmer ID.
                </p>
              </div>

              {/* Progress Tracker Card */}
              <div className="card w-full lg:w-95 bg-white p-5 shadow-sm rounded-2xl flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                  <span className="text-emerald-700">Registration Steps</span>
                  <span className="text-(--muted)">Step 1 of 2</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-(--green-600) rounded-full w-1/2"></div>
                </div>

                {/* Step Indicators */}
                <div className="flex items-center justify-between text-[11.5px] font-semibold">
                  <span className="text-(--ink) flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-(--green-600)"></span>
                    1. Details &amp; Location
                  </span>
                  <span className="text-(--muted)">
                    2. Get Farmer ID
                  </span>
                </div>
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div
                style={{
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#991B1B',
                  fontSize: '13.5px',
                  fontWeight: 600,
                }}
              >
                <AlertCircle size={18} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Onboarding Form Cards Grid */}
            <form onSubmit={handleSubmitRegistration} className="flex flex-col gap-8">
              <div className="flex flex-col gap-8">
                {/* 1. Demographics & Land Details */}
                <PersonalInfoCard
                  formData={formData}
                  onChange={handleUpdateFormData}
                />

                {/* 2. Interactive GPS Geofencing Map */}
                <GeolocationCard
                  lat={formData.lat}
                  lng={formData.lng}
                  district={formData.district}
                  state={formData.state}
                  onLocationSelect={(lat, lng) => handleUpdateFormData({ lat, lng })}
                />
              </div>

              {/* 3. Escrow Direct Settlement & Submission */}
              <EscrowPayoutCard
                upiId={formData.upiId}
                mobile={formData.mobile}
                onChange={(upiId) => handleUpdateFormData({ upiId })}
                onSubmit={handleSubmitRegistration}
                isSubmitting={isSubmitting}
              />
            </form>
          </>
        )}
      </main>
    </div>
  );
}

export default function FarmerOnboardingPage() {
  return (
    <FarmConnectProvider>
      <FarmerOnboardingContent />
    </FarmConnectProvider>
  );
}
