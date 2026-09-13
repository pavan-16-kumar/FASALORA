'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  UserRole,
  FarmerProfile,
  CropListing,
  CartItem,
  Order,
  OrderStatus,
  TransporterTask,
  Review
} from '@/types';

export interface PlatformStats {
  active_farmers: number;
  total_harvest_kg: number;
  sold_harvest_kg: number;
  extra_income_unlocked_inr: number;
  avg_field_to_fork_hours: number;
  middleman_tiers_bypassed: number;
}

interface FarmConnectContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  farmers: FarmerProfile[];
  crops: CropListing[];
  orders: Order[];
  cart: CartItem[];
  tasks: TransporterTask[];
  reviews: Review[];
  activeFarmer: FarmerProfile | null;
  platformStats: PlatformStats;
  isBackendConnected: boolean;
  backendMode: string;
  backendLatency: number;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  registerFarmer: (data: Omit<FarmerProfile, 'id' | 'farmerId'>) => Promise<FarmerProfile>;
  addCropListing: (data: Omit<CropListing, 'id' | 'listingId' | 'availableQuantity' | 'soldQuantity'>) => Promise<void>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (listingId: string) => void;
  clearCart: () => void;
  placeOrder: (deliveryAddress: string, paymentMethod: 'UPI' | 'COD' | 'Demo Payment') => Promise<Order[]>;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  submitReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}

const FarmConnectContext = createContext<FarmConnectContextType | undefined>(undefined);

// Initial Fallback Data
const INITIAL_FARMER: FarmerProfile = {
  id: 'f-1',
  farmerId: 'FC-TG-MDL-26-000184',
  name: 'Ramesh Kumar',
  mobile: '+91 98765 43210',
  state: 'Telangana',
  district: 'Medchal-Malkajgiri',
  village: 'Shamirpet',
  farmArea: 5,
  mainCrop: 'Tomato',
  lat: 17.6056,
  lng: 78.5701
};

const INITIAL_CROPS: CropListing[] = [
  {
    id: 'c-1',
    listingId: 'CL-TG-TOM-26-004821',
    farmerId: 'FC-TG-MDL-26-000184',
    farmerName: 'Ramesh Kumar',
    farmerLocation: 'Medchal, Telangana',
    cropName: 'Tomato',
    variety: 'Hybrid Red Sona',
    grade: 'Grade A',
    totalQuantity: 500,
    availableQuantity: 340,
    soldQuantity: 160,
    pricePerKg: 30,
    harvestDate: '2026-09-10',
    availableFrom: '2026-09-11',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'c-2',
    listingId: 'CL-TG-RIC-26-001042',
    farmerId: 'FC-TG-MDL-26-000184',
    farmerName: 'Ramesh Kumar',
    farmerLocation: 'Medchal, Telangana',
    cropName: 'Sona Masoori Rice',
    variety: 'Raw Premium Grain',
    grade: 'Organic Premium',
    totalQuantity: 1000,
    availableQuantity: 600,
    soldQuantity: 400,
    pricePerKg: 42,
    harvestDate: '2026-09-01',
    availableFrom: '2026-09-02',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'c-3',
    listingId: 'CL-TG-CHL-26-009912',
    farmerId: 'FC-TG-MDL-26-000215',
    farmerName: 'Venkatesh Rao',
    farmerLocation: 'Ranga Reddy, Telangana',
    cropName: 'Red Chilli',
    variety: 'Teja Spicy',
    grade: 'Grade A',
    totalQuantity: 200,
    availableQuantity: 150,
    soldQuantity: 50,
    pricePerKg: 90,
    harvestDate: '2026-09-08',
    availableFrom: '2026-09-09',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'c-4',
    listingId: 'CL-TG-TUR-26-003310',
    farmerId: 'FC-TG-NZB-26-000302',
    farmerName: 'Anil Reddy',
    farmerLocation: 'Nizamabad, Telangana',
    cropName: 'Turmeric (Haldi)',
    variety: 'Curcumin 5.2% High Grade',
    grade: 'Organic Premium',
    totalQuantity: 350,
    availableQuantity: 310,
    soldQuantity: 40,
    pricePerKg: 125,
    harvestDate: '2026-09-05',
    availableFrom: '2026-09-06',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80'
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'o-1',
    orderId: 'ORD-26-009721',
    customerId: 'cust-101',
    customerName: 'Priya Sharma (Green Hotel)',
    customerMobile: '+91 99887 76655',
    deliveryAddress: 'Plot 42, Jubilee Hills, Hyderabad',
    farmerId: 'FC-TG-MDL-26-000184',
    farmerName: 'Ramesh Kumar',
    farmerLocation: 'Medchal, Telangana',
    cropListingId: 'CL-TG-TOM-26-004821',
    cropName: 'Tomato - Hybrid Red',
    grade: 'Grade A',
    quantity: 20,
    pricePerKg: 30,
    cropValue: 600,
    deliveryFee: 60,
    totalAmount: 660,
    status: 'FARMER_ACCEPTED',
    paymentMethod: 'UPI',
    createdAt: '2026-09-10 09:30 AM'
  }
];

const DEFAULT_STATS: PlatformStats = {
  active_farmers: 1250,
  total_harvest_kg: 86050,
  sold_harvest_kg: 52650,
  extra_income_unlocked_inr: 431500,
  avg_field_to_fork_hours: 13.8,
  middleman_tiers_bypassed: 5
};

export const FarmConnectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('customer');
  const [farmers, setFarmers] = useState<FarmerProfile[]>([INITIAL_FARMER]);
  const [crops, setCrops] = useState<CropListing[]>(INITIAL_CROPS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats>(DEFAULT_STATS);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(true);
  const [backendMode, setBackendMode] = useState<string>('FastAPI Microservice');
  const [backendLatency, setBackendLatency] = useState<number>(8);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [tasks, setTasks] = useState<TransporterTask[]>([
    {
      id: 't-1',
      orderId: 'ORD-26-009721',
      farmerId: 'FC-TG-MDL-26-000184',
      farmerName: 'Ramesh Kumar',
      pickupLocation: 'Medchal Farm, Medchal-Malkajgiri',
      deliveryLocation: 'Jubilee Hills, Hyderabad',
      cropName: 'Tomato',
      quantity: 20,
      status: 'PENDING_PICKUP',
      driverName: 'Raj Logistics'
    }
  ]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const activeFarmer = farmers[0] || null;

  // Real-time backend fetcher
  const refreshData = useCallback(async () => {
    try {
      // 1. Health check
      const healthRes = await fetch('/api/health');
      if (healthRes.ok) {
        const health = await healthRes.json();
        setIsBackendConnected(true);
        setBackendMode(health.mode || 'Connected');
        setBackendLatency(health.latencyMs || 10);
      }

      // 2. Fetch crops
      const cropsRes = await fetch('/api/crops');
      if (cropsRes.ok) {
        const data = await cropsRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setCrops(data);
        }
      }

      // 3. Fetch farmers
      const farmersRes = await fetch('/api/farmers');
      if (farmersRes.ok) {
        const data = await farmersRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setFarmers(data);
        }
      }

      // 4. Fetch platform stats
      const statsRes = await fetch('/api/stats');
      if (statsRes.ok) {
        const data = await statsRes.json();
        setPlatformStats(data);
      }

      // 5. Fetch orders
      const ordersRes = await fetch('/api/orders');
      if (ordersRes.ok) {
        const data = await ordersRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setOrders(data);
        }
      }
    } catch {
      // Keep resilient fallback
    }
  }, []);

  // Initial load and periodic heartbeat
  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 12000);
    return () => clearInterval(interval);
  }, [refreshData]);

  // Register Farmer Helper
  const registerFarmer = async (data: Omit<FarmerProfile, 'id' | 'farmerId'>): Promise<FarmerProfile> => {
    const seq = String(farmers.length + 184).padStart(6, '0');
    const stateCode = data.state === 'Telangana' ? 'TG' : 'AP';
    const distCode = (data.district || 'HYD').substring(0, 3).toUpperCase();
    const generatedFarmerId = `FC-${stateCode}-${distCode}-26-${seq}`;

    const newFarmer: FarmerProfile = {
      ...data,
      id: `f-${Date.now()}`,
      farmerId: generatedFarmerId
    };

    setFarmers((prev) => [newFarmer, ...prev]);

    // Send to backend
    try {
      await fetch('/api/farmers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFarmer)
      });
    } catch (e) {
      console.warn('Backend sync failed for registerFarmer, preserved in local state', e);
    }

    return newFarmer;
  };

  // Add Crop Listing Helper
  const addCropListing = async (data: Omit<CropListing, 'id' | 'listingId' | 'availableQuantity' | 'soldQuantity'>) => {
    const cropCode = data.cropName.substring(0, 3).toUpperCase();
    const seq = String(crops.length + 4821).padStart(6, '0');
    const generatedListingId = `CL-TG-${cropCode}-26-${seq}`;

    const newListing: CropListing = {
      ...data,
      id: `c-${Date.now()}`,
      listingId: generatedListingId,
      availableQuantity: data.totalQuantity,
      soldQuantity: 0,
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
    };

    setCrops((prev) => [newListing, ...prev]);

    try {
      await fetch('/api/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newListing)
      });
    } catch (e) {
      console.warn('Backend sync failed for addCropListing, preserved in local state', e);
    }
  };

  // Cart Helper
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.listingId === item.listingId);
      if (existing) {
        return prev.map((i) =>
          i.listingId === item.listingId
            ? { ...i, quantity: item.quantity, cropValue: item.quantity * item.pricePerKg }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (listingId: string) => {
    setCart((prev) => prev.filter((item) => item.listingId !== listingId));
  };

  const clearCart = () => setCart([]);

  // Place Order Helper (Dynamic stock reduction with backend atomic sync)
  const placeOrder = async (deliveryAddress: string, paymentMethod: 'UPI' | 'COD' | 'Demo Payment'): Promise<Order[]> => {
    const newOrders: Order[] = [];

    for (const item of cart) {
      const crop = crops.find((c) => c.listingId === item.listingId);
      if (!crop) continue;

      const orderQty = Math.min(item.quantity, crop.availableQuantity);
      if (orderQty <= 0) continue;

      const orderSeq = String(orders.length + newOrders.length + 9721).padStart(6, '0');
      const orderId = `ORD-26-${orderSeq}`;
      const deliveryFee = 60;
      const cropValue = orderQty * item.pricePerKg;

      const newOrder: Order = {
        id: `o-${Date.now()}-${Math.random()}`,
        orderId,
        customerId: 'cust-current',
        customerName: 'Suresh Verma',
        customerMobile: '+91 91234 56789',
        deliveryAddress,
        farmerId: crop.farmerId,
        farmerName: crop.farmerName,
        farmerLocation: crop.farmerLocation,
        cropListingId: crop.listingId,
        cropName: crop.cropName,
        grade: crop.grade,
        quantity: orderQty,
        pricePerKg: item.pricePerKg,
        cropValue,
        deliveryFee,
        totalAmount: cropValue + deliveryFee,
        status: 'PENDING',
        paymentMethod,
        createdAt: new Date().toLocaleString()
      };

      newOrders.push(newOrder);

      // Decrement Available Stock dynamically in frontend state
      setCrops((prevCrops) =>
        prevCrops.map((c) =>
          c.listingId === crop.listingId
            ? {
                ...c,
                availableQuantity: c.availableQuantity - orderQty,
                soldQuantity: c.soldQuantity + orderQty
              }
            : c
        )
      );

      // Post to backend
      try {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cropListingId: crop.listingId,
            quantity: orderQty,
            deliveryAddress,
            paymentMethod,
            customerName: 'Suresh Verma',
            customerMobile: '+91 91234 56789'
          })
        });
      } catch (e) {
        console.warn('Backend sync failed for placeOrder, preserved in local state', e);
      }
    }

    setOrders((prev) => [...newOrders, ...prev]);
    clearCart();
    return newOrders;
  };

  // Update Order Status Helper
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.orderId === orderId) {
          const updated = { ...order, status: newStatus };

          if (newStatus === 'FARMER_ACCEPTED') {
            const newTask: TransporterTask = {
              id: `t-${Date.now()}`,
              orderId: order.orderId,
              farmerId: order.farmerId,
              farmerName: order.farmerName,
              pickupLocation: `${order.farmerLocation} Farm`,
              deliveryLocation: order.deliveryAddress,
              cropName: order.cropName,
              quantity: order.quantity,
              status: 'PENDING_PICKUP',
              driverName: 'Raj Logistics'
            };
            setTasks((prevTasks) => [newTask, ...prevTasks]);
          }

          return updated;
        }
        return order;
      })
    );
  };

  // Submit Review Helper
  const submitReview = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `r-${Date.now()}`,
      createdAt: new Date().toLocaleDateString()
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <FarmConnectContext.Provider
      value={{
        activeRole,
        setActiveRole,
        farmers,
        crops,
        orders,
        cart,
        tasks,
        reviews,
        activeFarmer,
        platformStats,
        isBackendConnected,
        backendMode,
        backendLatency,
        isLoading,
        refreshData,
        registerFarmer,
        addCropListing,
        addToCart,
        removeFromCart,
        clearCart,
        placeOrder,
        updateOrderStatus,
        submitReview
      }}
    >
      {children}
    </FarmConnectContext.Provider>
  );
};

export const useFarmConnect = () => {
  const context = useContext(FarmConnectContext);
  if (!context) {
    throw new Error('useFarmConnect must be used within FarmConnectProvider');
  }
  return context;
};
