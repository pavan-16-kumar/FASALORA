import { NextResponse } from 'next/server';
import { FASTAPI_URL, serverStore } from '@/lib/server-store';
import { CropListing } from '@/types';

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600);
    const res = await fetch(`${FASTAPI_URL}/api/crops`, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const fastApiCrops = await res.json();
      if (Array.isArray(fastApiCrops) && fastApiCrops.length > 0) {
        // Map backend snake_case to frontend camelCase if needed, or merge
        const mapped = fastApiCrops.map((c: any) => ({
          id: c.id || `c-${c.listing_id || Date.now()}`,
          listingId: c.listing_id || c.listingId || `CL-TG-TOM-26-004821`,
          farmerId: c.farmer_id || c.farmerId,
          farmerName: c.farmer_name || c.farmerName || 'Ramesh Kumar',
          farmerLocation: c.farmer_location || c.farmerLocation || 'Medchal, Telangana',
          cropName: c.crop_name || c.cropName,
          variety: c.variety,
          grade: c.grade || 'Grade A',
          totalQuantity: c.total_quantity || c.totalQuantity,
          availableQuantity: c.available_quantity ?? c.availableQuantity ?? c.total_quantity,
          soldQuantity: c.sold_quantity ?? c.soldQuantity ?? 0,
          pricePerKg: c.price_per_kg || c.pricePerKg,
          harvestDate: c.harvest_date || c.harvestDate,
          availableFrom: c.available_from || c.availableFrom,
          imageUrl: c.image_url || c.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
        }));
        return NextResponse.json(mapped);
      }
    }
  } catch {
    // Graceful fallback to serverStore
  }

  return NextResponse.json(serverStore.crops);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cropCode = (body.cropName || 'CRP').substring(0, 3).toUpperCase();
    const seq = String(serverStore.crops.length + 4821).padStart(6, '0');
    const generatedListingId = `CL-TG-${cropCode}-26-${seq}`;

    const newListing: CropListing = {
      ...body,
      id: `c-${Date.now()}`,
      listingId: generatedListingId,
      availableQuantity: body.totalQuantity,
      soldQuantity: 0,
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
    };

    serverStore.crops.unshift(newListing);

    // Forward asynchronously to FastAPI if active
    try {
      fetch(`${FASTAPI_URL}/api/crops/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer_id: body.farmerId,
          crop_name: body.cropName,
          variety: body.variety,
          grade: body.grade,
          total_quantity: body.totalQuantity,
          price_per_kg: body.pricePerKg,
          harvest_date: body.harvestDate,
          available_from: body.availableFrom,
          image_url: newListing.imageUrl
        })
      }).catch(() => {});
    } catch {}

    return NextResponse.json({ message: 'Crop listing created successfully', crop: newListing });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invalid payload' }, { status: 400 });
  }
}
