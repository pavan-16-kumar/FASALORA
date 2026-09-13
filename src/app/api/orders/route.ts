import { NextResponse } from 'next/server';
import { FASTAPI_URL, serverStore } from '@/lib/server-store';
import { Order } from '@/types';

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600);
    const res = await fetch(`${FASTAPI_URL}/api/orders`, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const fastApiOrders = await res.json();
      if (Array.isArray(fastApiOrders) && fastApiOrders.length > 0) {
        return NextResponse.json(fastApiOrders);
      }
    }
  } catch {}

  return NextResponse.json(serverStore.orders);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      cropListingId,
      quantity,
      deliveryAddress,
      paymentMethod = 'UPI',
      customerName = 'Suresh Verma',
      customerMobile = '+91 91234 56789'
    } = body;

    const crop = serverStore.crops.find((c) => c.listingId === cropListingId);
    if (!crop) {
      return NextResponse.json({ error: 'Crop listing not found' }, { status: 404 });
    }

    if (crop.availableQuantity < quantity) {
      return NextResponse.json({ error: 'Requested quantity exceeds available stock' }, { status: 400 });
    }

    // Decrement stock atomically
    crop.availableQuantity -= quantity;
    crop.soldQuantity += quantity;

    const orderSeq = String(serverStore.orders.length + 9721).padStart(6, '0');
    const orderId = `ORD-26-${orderSeq}`;
    const cropValue = quantity * crop.pricePerKg;
    const deliveryFee = 60;

    const newOrder: Order = {
      id: `o-${Date.now()}-${Math.random()}`,
      orderId,
      customerId: 'cust-current',
      customerName,
      customerMobile,
      deliveryAddress,
      farmerId: crop.farmerId,
      farmerName: crop.farmerName,
      farmerLocation: crop.farmerLocation,
      cropListingId: crop.listingId,
      cropName: crop.cropName,
      grade: crop.grade,
      quantity,
      pricePerKg: crop.pricePerKg,
      cropValue,
      deliveryFee,
      totalAmount: cropValue + deliveryFee,
      status: 'PENDING',
      paymentMethod,
      createdAt: new Date().toLocaleString()
    };

    serverStore.orders.unshift(newOrder);

    // Forward to FastAPI if active
    try {
      fetch(`${FASTAPI_URL}/api/orders/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName,
          customer_mobile: customerMobile,
          deliveryAddress,
          crop_listing_id: cropListingId,
          quantity,
          price_per_kg: crop.pricePerKg,
          payment_method: paymentMethod
        })
      }).catch(() => {});
    } catch {}

    return NextResponse.json({ message: 'Order created successfully', order: newOrder });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invalid payload' }, { status: 400 });
  }
}
