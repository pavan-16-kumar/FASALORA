import { NextRequest, NextResponse } from 'next/server';
import { serverStore } from '@/lib/server-store';

export async function GET(req: NextRequest) {
  const farmerId = req.nextUrl.searchParams.get('farmerId') || 'FC-TG-MDL-26-000184';
  const myOrders = serverStore.orders.filter(
    (o) => o.farmerId === farmerId && o.status !== 'REJECTED'
  );

  // Generate weekly mock earnings based on real orders + synthetic history
  const thisMonth = myOrders.reduce((sum, o) => sum + o.cropValue, 0) || 12400;
  const lastMonth = Math.floor(thisMonth * 0.87) || 10800;
  const totalEarnings = thisMonth + lastMonth + 25600;
  const pendingSettlement = myOrders
    .filter((o) => o.status === 'FARMER_ACCEPTED' || o.status === 'PICKED_UP')
    .reduce((sum, o) => sum + o.cropValue, 0) || 3200;

  // Weekly breakdown for chart (last 7 days, synthetic but realistic)
  const weeklyData = [
    { day: 'Mon', amount: Math.floor(thisMonth * 0.12) },
    { day: 'Tue', amount: Math.floor(thisMonth * 0.18) },
    { day: 'Wed', amount: Math.floor(thisMonth * 0.09) },
    { day: 'Thu', amount: Math.floor(thisMonth * 0.22) },
    { day: 'Fri', amount: Math.floor(thisMonth * 0.15) },
    { day: 'Sat', amount: Math.floor(thisMonth * 0.14) },
    { day: 'Sun', amount: Math.floor(thisMonth * 0.10) },
  ];

  return NextResponse.json({ thisMonth, lastMonth, totalEarnings, pendingSettlement, weeklyData });
}
