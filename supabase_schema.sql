-- ========================================================
-- FarmConnect (SIH26033) Complete PostgreSQL / Supabase Schema
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. FARMERS TABLE (Module 1, 2, 3)
CREATE TABLE IF NOT EXISTS farmers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farmer_id VARCHAR(30) UNIQUE NOT NULL, -- e.g. FC-TG-MDL-26-000184
  full_name VARCHAR(100) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  state VARCHAR(50) NOT NULL,
  district VARCHAR(50) NOT NULL,
  village VARCHAR(50) NOT NULL,
  farm_area NUMERIC(6,2) NOT NULL,
  main_crop VARCHAR(50) NOT NULL,
  latitude NUMERIC(9,6) NOT NULL,
  longitude NUMERIC(9,6) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CROP LISTINGS TABLE (Module 4, 5, 7)
CREATE TABLE IF NOT EXISTS crop_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id VARCHAR(30) UNIQUE NOT NULL, -- e.g. CL-TG-TOM-26-004821
  farmer_id VARCHAR(30) REFERENCES farmers(farmer_id) ON DELETE CASCADE,
  crop_name VARCHAR(100) NOT NULL,
  variety VARCHAR(100),
  grade VARCHAR(30) NOT NULL DEFAULT 'Grade A',
  total_quantity NUMERIC(10,2) NOT NULL,
  available_quantity NUMERIC(10,2) NOT NULL,
  sold_quantity NUMERIC(10,2) DEFAULT 0,
  price_per_kg NUMERIC(8,2) NOT NULL,
  harvest_date DATE,
  available_from DATE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CUSTOMERS TABLE (Module 6)
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(100) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  customer_type VARCHAR(30) DEFAULT 'Consumer',
  delivery_address TEXT NOT NULL,
  pin_code VARCHAR(10) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ORDERS TABLE (Module 9, 10, 11)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id VARCHAR(30) UNIQUE NOT NULL, -- e.g. ORD-26-009721
  customer_id UUID REFERENCES customers(id),
  farmer_id VARCHAR(30) REFERENCES farmers(farmer_id),
  crop_listing_id VARCHAR(30) REFERENCES crop_listings(listing_id),
  crop_name VARCHAR(100) NOT NULL,
  quantity NUMERIC(10,2) NOT NULL,
  price_per_kg NUMERIC(8,2) NOT NULL,
  crop_value NUMERIC(10,2) NOT NULL,
  delivery_fee NUMERIC(8,2) NOT NULL DEFAULT 60.00,
  total_amount NUMERIC(10,2) NOT NULL,
  status VARCHAR(30) DEFAULT 'PENDING',
  payment_method VARCHAR(30) DEFAULT 'UPI',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TRANSPORTER TASKS TABLE (Module 12, 14, 15, 17)
CREATE TABLE IF NOT EXISTS transporter_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id VARCHAR(30) REFERENCES orders(order_id) ON DELETE CASCADE,
  driver_name VARCHAR(100) DEFAULT 'Raj Logistics',
  pickup_location TEXT NOT NULL,
  delivery_location TEXT NOT NULL,
  quantity NUMERIC(10,2) NOT NULL,
  status VARCHAR(30) DEFAULT 'PENDING_PICKUP',
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. COLLECTION HUB BATCHES TABLE (Module 13)
CREATE TABLE IF NOT EXISTS hub_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id VARCHAR(30) UNIQUE NOT NULL,
  hub_name VARCHAR(100) DEFAULT 'Medchal Hub 01',
  destination_city VARCHAR(100) NOT NULL,
  aggregated_quantity NUMERIC(10,2) NOT NULL,
  status VARCHAR(30) DEFAULT 'IN_SORTING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. REVIEWS & RATINGS TABLE (Module 19)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id VARCHAR(30) REFERENCES orders(order_id),
  farmer_rating INT CHECK (farmer_rating BETWEEN 1 AND 5),
  crop_quality_rating INT CHECK (crop_quality_rating BETWEEN 1 AND 5),
  delivery_rating INT CHECK (delivery_rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
