import type { Metadata } from 'next';
import { FarmConnectProvider } from '@/context/FarmConnectContext';
import { FarmerAuthProvider } from '@/context/FarmerAuthContext';

export const metadata: Metadata = {
  title: 'Farmer Dashboard — FASALORA',
  description: 'Manage your crops, orders and earnings on FASALORA Smart Farm-to-Customer Network.',
};

export default function FarmerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FarmConnectProvider>
      <FarmerAuthProvider>
        {children}
      </FarmerAuthProvider>
    </FarmConnectProvider>
  );
}
