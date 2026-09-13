import { NextResponse } from 'next/server';
import { FASTAPI_URL, serverStore } from '@/lib/server-store';
import { FarmerProfile } from '@/types';

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600);
    const res = await fetch(`${FASTAPI_URL}/api/farmers`, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const fastApiFarmers = await res.json();
      if (Array.isArray(fastApiFarmers) && fastApiFarmers.length > 0) {
        const mapped = fastApiFarmers.map((f: any) => ({
          id: f.id || `f-${f.farmer_id || Date.now()}`,
          farmerId: f.farmer_id || f.farmerId || 'FC-TG-MDL-26-000184',
          name: f.name,
          mobile: f.mobile,
          state: f.state,
          district: f.district,
          village: f.village,
          farmArea: f.farm_area ?? f.farmArea ?? 5,
          mainCrop: f.main_crop ?? f.mainCrop ?? 'Tomato',
          lat: f.lat ?? 17.6056,
          lng: f.lng ?? 78.5701
        }));
        return NextResponse.json(mapped);
      }
    }
  } catch {
    // Fallback to serverStore
  }

  return NextResponse.json(serverStore.farmers);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const seq = String(serverStore.farmers.length + 184).padStart(6, '0');
    const stateCode = data.state === 'Telangana' ? 'TG' : 'AP';
    const distCode = (data.district || 'HYD').substring(0, 3).toUpperCase();
    const generatedFarmerId = `FC-${stateCode}-${distCode}-26-${seq}`;

    const newFarmer: FarmerProfile = {
      ...data,
      id: `f-${Date.now()}`,
      farmerId: generatedFarmerId
    };

    serverStore.farmers.unshift(newFarmer);

    // Forward to FastAPI if active
    try {
      fetch(`${FASTAPI_URL}/api/farmers/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          mobile: data.mobile,
          state: data.state,
          district: data.district,
          village: data.village,
          farm_area: data.farmArea,
          main_crop: data.mainCrop,
          lat: data.lat,
          lng: data.lng
        })
      }).catch(() => {});
    } catch {}

    return NextResponse.json({ message: 'Farmer registered successfully', farmer: newFarmer });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invalid payload' }, { status: 400 });
  }
}
