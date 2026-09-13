import { NextRequest, NextResponse } from 'next/server';
import { serverStore } from '@/lib/server-store';

export async function GET(req: NextRequest) {
  const farmerId = req.nextUrl.searchParams.get('farmerId') || 'FC-TG-MDL-26-000184';
  const farmer = serverStore.farmers.find((f) => f.farmerId === farmerId);
  if (!farmer) {
    return NextResponse.json({ error: 'Farmer not found' }, { status: 404 });
  }
  // Strip GPS from public response
  const { lat: _lat, lng: _lng, ...publicFarmer } = farmer;
  return NextResponse.json(publicFarmer);
}
