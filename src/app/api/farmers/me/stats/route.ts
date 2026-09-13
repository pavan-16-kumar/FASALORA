import { NextRequest, NextResponse } from 'next/server';
import { serverStore } from '@/lib/server-store';

export async function GET(req: NextRequest) {
  const farmerId = req.nextUrl.searchParams.get('farmerId') || 'FC-TG-MDL-26-000184';

  const myCrops = serverStore.crops.filter((c) => c.farmerId === farmerId);
  const myOrders = serverStore.orders.filter((o) => o.farmerId === farmerId);

  const activeCrops = myCrops.filter((c) => c.availableQuantity > 0).length;
  const availableQty = myCrops.reduce((sum, c) => sum + c.availableQuantity, 0);
  const newOrders = myOrders.filter((o) => o.status === 'PENDING').length;
  const totalSales = myOrders.reduce((sum, o) => sum + (o.status !== 'REJECTED' ? o.cropValue : 0), 0);

  return NextResponse.json({ activeCrops, availableQty, newOrders, totalSales });
}
