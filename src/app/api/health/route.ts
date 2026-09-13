import { NextResponse } from 'next/server';
import { FASTAPI_URL, serverStore } from '@/lib/server-store';

export async function GET() {
  const startTime = Date.now();
  let isFastApiActive = false;
  let fastApiData: Record<string, unknown> | null = null;
  let latencyMs = 0;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600);
    const res = await fetch(`${FASTAPI_URL}/api/health`, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      fastApiData = await res.json();
      isFastApiActive = true;
      latencyMs = Date.now() - startTime;
    }
  } catch {
    isFastApiActive = false;
    latencyMs = Date.now() - startTime;
  }

  return NextResponse.json({
    status: 'healthy',
    mode: isFastApiActive ? 'FastAPI Microservice (Connected)' : 'Next.js App Engine (Active)',
    isFastApiActive,
    latencyMs,
    fastApiData,
    localState: {
      farmers: serverStore.farmers.length,
      crops: serverStore.crops.length,
      orders: serverStore.orders.length,
    },
    timestamp: new Date().toISOString(),
  });
}
