'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FarmerProfile } from '@/types';

interface FarmerAuthState {
  farmer: FarmerProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface FarmerAuthContextType extends FarmerAuthState {
  login: (farmer: FarmerProfile) => void;
  logout: () => void;
}

const FarmerAuthContext = createContext<FarmerAuthContextType | undefined>(undefined);

const STORAGE_KEY = 'fasalora_farmer_session';

export const FarmerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farmer, setFarmer] = useState<FarmerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FarmerProfile;
        if (parsed?.id && parsed?.farmerId) {
          setFarmer(parsed);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((farmerData: FarmerProfile) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(farmerData));
    } catch {
      // localStorage unavailable (SSR/private mode) — keep in-memory only
    }
    setFarmer(farmerData);
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setFarmer(null);
  }, []);

  return (
    <FarmerAuthContext.Provider
      value={{
        farmer,
        isAuthenticated: !!farmer,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </FarmerAuthContext.Provider>
  );
};

export const useAuth = (): FarmerAuthContextType => {
  const ctx = useContext(FarmerAuthContext);
  if (!ctx) throw new Error('useAuth must be used within FarmerAuthProvider');
  return ctx;
};
