import { NextRequest, NextResponse } from 'next/server';
import { serverStore } from '@/lib/server-store';

export async function GET(req: NextRequest) {
  const farmerId = req.nextUrl.searchParams.get('farmerId') || 'FC-TG-MDL-26-000184';
  const myCrops = serverStore.crops.filter((c) => c.farmerId === farmerId);
  return NextResponse.json(myCrops);
}
