import { NextRequest, NextResponse } from 'next/server';
import { serverStore } from '@/lib/server-store';

export async function GET(req: NextRequest) {
  const farmerId = req.nextUrl.searchParams.get('farmerId') || 'FC-TG-MDL-26-000184';

  const myOrders = serverStore.orders.filter((o) => o.farmerId === farmerId);
  const myCrops = serverStore.crops.filter((c) => c.farmerId === farmerId);

  const notifications: Array<{
    id: string;
    type: 'order' | 'stock' | 'pickup' | 'payment';
    title: string;
    body: string;
    timestamp: string;
    unread: boolean;
  }> = [];

  // Order notifications
  myOrders.slice(0, 2).forEach((order, i) => {
    notifications.push({
      id: `notif-order-${i}`,
      type: 'order',
      title: 'New customer order received',
      body: `Order ${order.orderId} — ${order.cropName} (${order.quantity} kg) from ${order.customerName}`,
      timestamp: order.createdAt,
      unread: order.status === 'PENDING',
    });
  });

  // Low stock
  myCrops
    .filter((c) => c.availableQuantity < 100 && c.availableQuantity > 0)
    .slice(0, 1)
    .forEach((crop, i) => {
      notifications.push({
        id: `notif-stock-${i}`,
        type: 'stock',
        title: 'Crop listing running low',
        body: `${crop.cropName} (${crop.listingId}) has only ${crop.availableQuantity} kg left.`,
        timestamp: '2026-09-12 08:00 AM',
        unread: true,
      });
    });

  // Pickup notification
  if (myOrders.some((o) => o.status === 'FARMER_ACCEPTED')) {
    notifications.push({
      id: 'notif-pickup-1',
      type: 'pickup',
      title: 'Pickup scheduled',
      body: 'Raj Logistics will pick up your produce today between 10 AM – 12 PM.',
      timestamp: '2026-09-12 07:30 AM',
      unread: false,
    });
  }

  // Payment notification
  notifications.push({
    id: 'notif-payment-1',
    type: 'payment',
    title: 'Payment settled',
    body: '₹600 credited to your UPI account for Order ORD-26-009721.',
    timestamp: '2026-09-11 06:00 PM',
    unread: false,
  });

  return NextResponse.json(notifications);
}
