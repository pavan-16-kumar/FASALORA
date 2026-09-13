export type UserRole = 'farmer' | 'customer' | 'transporter' | 'hub' | 'admin';

export interface FarmerProfile {
  id: string;
  farmerId: string; // Format: FC-TG-MDL-26-000184
  name: string;
  mobile: string;
  state: string;
  district: string;
  village: string;
  farmArea: number;
  mainCrop: string;
  lat: number;
  lng: number;
}

export interface CropListing {
  id: string;
  listingId: string; // Format: CL-TG-TOM-26-004821
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  cropName: string;
  variety: string;
  grade: 'Grade A' | 'Grade B' | 'Organic Premium';
  totalQuantity: number; // in kg
  availableQuantity: number; // in kg
  soldQuantity: number; // in kg
  pricePerKg: number; // in INR
  harvestDate: string;
  availableFrom: string;
  imageUrl: string;
}

export interface CartItem {
  listingId: string;
  cropName: string;
  farmerId: string;
  farmerName: string;
  grade: string;
  quantity: number; // in kg
  pricePerKg: number;
  cropValue: number;
}

export type OrderStatus = 
  | 'PENDING'
  | 'FARMER_ACCEPTED'
  | 'PICKED_UP'
  | 'AT_HUB'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'SETTLED'
  | 'REJECTED';

export interface Order {
  id: string;
  orderId: string; // Format: ORD-26-009721
  customerId: string;
  customerName: string;
  customerMobile: string;
  deliveryAddress: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  cropListingId: string;
  cropName: string;
  grade: string;
  quantity: number; // in kg
  pricePerKg: number;
  cropValue: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: 'UPI' | 'COD' | 'Demo Payment';
  createdAt: string;
}

export interface TransporterTask {
  id: string;
  orderId: string;
  farmerName: string;
  farmerId: string;
  pickupLocation: string;
  deliveryLocation: string;
  cropName: string;
  quantity: number;
  status: 'PENDING_PICKUP' | 'IN_TRANSIT' | 'DELIVERED';
  driverName: string;
}

export interface Review {
  id: string;
  orderId: string;
  farmerRating: number;
  cropQualityRating: number;
  deliveryRating: number;
  comment: string;
  createdAt: string;
}
