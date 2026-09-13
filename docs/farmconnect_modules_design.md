# 🌾 FarmConnect – Comprehensive Module & UI Design

This document provides a detailed breakdown of the end-to-end journey for FarmConnect (SIH26033). It categorizes the 19 logical modules into actionable UI pages, detailing the specific elements and their functions for each page.

---

## 🌾 1. FARMER PANEL

### Module 1: Farmer Registration
**Purpose:** Onboarding farmers onto the platform.
**Page:** `Farmer Registration Page`
- **UI Elements:**
  - **Text Inputs:** Full Name, Mobile Number, Village/Area, Farm Area (in Acres).
  - **Dropdowns:** State, District, Main Crop (e.g., Tomato, Rice).
  - **Map Component:** A clickable interactive map for "Farm Location" selection.
  - **Action Button:** `[ REGISTER FARMER ]`
- **Functions:**
  - Validates all input fields (e.g., valid mobile number, non-empty fields).
  - Captures exact latitude and longitude from the Map Component in the background.
  - Submits the payload to the backend to create a farmer profile.

### Module 2: Unique Farmer ID Generation
**Purpose:** Creating a standardized digital identity for the farmer.
**Page:** `Registration Success Screen / Digital ID Card`
- **UI Elements:**
  - **Status Indicator:** Success Icon and Welcome Message.
  - **Text Display:** The generated Farmer ID (e.g., `FC-TG-MDL-26-000184`).
  - **Action Buttons:** `[ 📋 Copy ID ]`, `[ ⬇ Download Card ]`, `[ GO TO FARM DASHBOARD ]`.
- **Functions:**
  - Displays the backend-generated ID dynamically based on the farmer's region and registration date.
  - Copies the ID to the clipboard.
  - Generates a PDF or Image of the ID card for the farmer to download.
  - Navigates the user to their main dashboard.

### Module 3: Farmer Profile & Farm Location
**Purpose:** The central hub for the farmer's activities.
**Page:** `Farmer Dashboard`
- **UI Elements:**
  - **Sidebar/Navigation:** Dashboard, My Farm, My Crops, Orders, Earnings, Logistics, Notifications, Settings.
  - **Profile Summary Card:** Name, Farmer ID, Generalized Location (e.g., Medchal, Telangana) for privacy.
  - **Metrics Cards:** Active Listings, Pending Orders, Available Stock, Total Sales.
- **Functions:**
  - Fetches and displays real-time aggregated metrics from the database.
  - Masks exact GPS coordinates, displaying only district and state to the public.
  - Acts as the routing gateway to all other farmer functionalities.

### Module 4: Crop Listing / Sell Crop
**Purpose:** Allowing farmers to put their inventory up for sale.
**Page:** `Add Crop Page`
- **UI Elements:**
  - **Dropdowns:** Crop Type, Variety, Grade.
  - **Number Inputs:** Quantity (in kg/tons), Price per kg (₹).
  - **Date Pickers:** Harvest Date, Available From Date.
  - **File Uploader:** `[ + Upload Photos ]` for crop images.
  - **Action Button:** `[ LIST CROP ]`.
- **Functions:**
  - Processes image uploads and stores them securely.
  - Validates pricing and quantity inputs.
  - Generates a unique `Crop Listing ID` (e.g., `CL-TG-TOM-26-004821`) upon submission and updates the inventory.

### Module 5: Crop Inventory
**Purpose:** Tracking what is sold and what is left.
**Page:** `My Crops / Inventory Table`
- **UI Elements:**
  - **Data Table:** Columns for Crop Name, Listed Quantity, Sold Quantity, Available Quantity, and Price.
  - **Status Badges:** "In Stock", "Low Stock", "Sold Out".
  - **Action Menu:** Edit Listing, Update Quantity, Remove Listing.
- **Functions:**
  - Automatically calculates `Available Quantity = Listed - Sold`.
  - Enables farmers to adjust prices dynamically based on market demand.

### Module 11: Farmer Order Management
**Purpose:** Handling incoming purchase requests.
**Page:** `New Order Notification & Details`
- **UI Elements:**
  - **Notification Alert:** Bell icon / Push notification for new orders.
  - **Order Summary Card:** Order ID, Crop Details, Requested Quantity, Total Price, Pickup/Delivery Info.
  - **Action Buttons:** `[ ACCEPT ]`, `[ REJECT ]`.
- **Functions:**
  - Locks the requested quantity temporarily so it can't be bought by someone else while pending.
  - Updates order status to 'ACCEPTED' and triggers the Logistics module, or releases the inventory back if 'REJECTED'.

---

## 🛒 2. CUSTOMER PANEL

### Module 6: Customer Registration
**Purpose:** Onboarding buyers (individuals, retailers, restaurants).
**Page:** `Customer Signup Page`
- **UI Elements:**
  - **Text Inputs:** Name, Mobile, Complete Delivery Address, PIN Code.
  - **Radio Buttons:** Customer Type (Consumer, Retailer, Wholesaler).
  - **Action Button:** `[ REGISTER ]`.
- **Functions:**
  - Creates customer profile.
  - Geocodes the address to prepare for route optimization later.

### Module 7: Customer Crop Marketplace (Discovery)
**Purpose:** Browsing and finding crops.
**Page:** `Marketplace Homepage & Search`
- **UI Elements:**
  - **Search Bar & Filters:** Search by name, filter by Category, Price, Distance, Grade.
  - **Crop Cards:** Displays Crop Image, Name, Grade, Price/kg, Available Quantity, Farmer Name, and generalized distance (e.g., "Nearby").
  - **Action Button:** `[ BUY NOW ]` (Opens product details).
- **Functions:**
  - Queries the database for active `Crop Listing IDs`.
  - Implements sorting algorithms (e.g., nearest first, lowest price first).

### Module 8: Flexible Quantity Selection
**Purpose:** Allowing partial purchases of large listings.
**Page:** `Crop Details Modal / Page`
- **UI Elements:**
  - **Quantity Selector:** `[-] [ Input Box ] [+]` with limits up to the max available stock.
  - **Dynamic Price Display:** Auto-calculates `Quantity * Price/kg`.
  - **Action Button:** `[ ADD TO CART ]`.
- **Functions:**
  - Validates that the requested quantity is > 0 and <= Available Stock.
  - Calculates the total crop value instantly as the user types or clicks the stepper.

### Module 9: Cart & Checkout
**Purpose:** Finalizing the purchase.
**Page:** `Cart & Checkout Page`
- **UI Elements:**
  - **Line Items:** List of crops, quantities, and individual totals.
  - **Cost Breakdown:** Crop Subtotal, Estimated Delivery Fee, Grand Total.
  - **Address Selector:** Confirm or change delivery location.
  - **Payment Options:** Radio buttons (UPI, COD, Demo Payment).
  - **Action Button:** `[ PLACE ORDER ]`.
- **Functions:**
  - Calculates distance-based delivery fees dynamically.
  - Processes the (simulated) payment gateway transaction.

### Module 16: Delivery Tracking
**Purpose:** Keeping the customer informed.
**Page:** `Live Order Tracking`
- **UI Elements:**
  - **Progress Stepper:** Placed -> Accepted -> Picked Up -> In Transit -> Out for Delivery -> Delivered.
  - **Map View (Optional):** Live or estimated location of the transporter.
  - **ETA Text:** Estimated time of arrival.
- **Functions:**
  - Listens to webhooks or database updates from the Transporter App to update the status in real-time.

### Module 19: Rating & Feedback
**Purpose:** Building trust and quality control.
**Page:** `Order Completed Review Modal`
- **UI Elements:**
  - **Star Ratings (1-5):** Separate ratings for Farmer, Crop Quality, and Delivery.
  - **Text Area:** Comment/Feedback box.
  - **Action Button:** `[ SUBMIT REVIEW ]`.
- **Functions:**
  - Saves the reviews to the respective Farmer and Transporter profiles, affecting their overall platform rating.

---

## ⚙️ 3. CORE SYSTEM (Backend & Admin)

### Module 10: Order Creation
**Purpose:** Central transaction generation.
**Background Process:**
- **Functions:**
  - Generates a unique `Order ID` (e.g., `ORD-26-009721`).
  - Creates relational links between Customer ID, Farmer ID, and Crop Listing ID.
  - Deducts the requested quantity from the Crop Inventory immediately.

### Module 18: Payment & Farmer Settlement
**Purpose:** Managing the money flow securely.
**Background Process / Admin Page:**
- **Functions:**
  - Holds funds in an escrow-like state until delivery is confirmed.
  - Calculates splits: e.g., ₹600 to Farmer's wallet, ₹60 to Logistics wallet.
  - Triggers simulated settlement payouts.

---

## 🚚 4. TRANSPORTER PANEL

### Module 12: Pickup Management
**Purpose:** Informing logistics of a new job.
**Page:** `Transporter Tasks List`
- **UI Elements:**
  - **Task Cards:** Farmer Location, Crop Type, Quantity to pick up, Scheduled Time.
  - **Action Button:** `[ NAVIGATE TO FARM ]`, `[ CONFIRM PICKUP ]`.
- **Functions:**
  - Updates system status to "Picked Up".
  - Logs the timestamp of collection.

### Module 14: Transporter Module
**Purpose:** Main interface for the driver.
**Page:** `Transporter Dashboard`
- **UI Elements:**
  - **Daily Summary:** Total Tasks, Total Distance, Completed Deliveries.
  - **Itinerary List:** Ordered list of stops (Farms, Hubs, Customers).
  - **Action Button:** `[ VIEW ROUTE ]`.
- **Functions:**
  - Consolidates pickups and drop-offs into a single scrollable timeline.

### Module 17: Customer Delivery
**Purpose:** Final handover.
**Page:** `Proof of Delivery Screen`
- **UI Elements:**
  - **Delivery Summary:** Customer Name, Order ID, Expected Quantity.
  - **Checkbox/Signature:** Verification of quantity and quality.
  - **Action Button:** `[ ✓ Confirm Delivery ]`.
- **Functions:**
  - Triggers the Payment Settlement module upon confirmation.
  - Sends the "Order Delivered" notification to the customer.

---

## 🏢 5. INTELLIGENCE & HUB PANEL

### Module 13: Collection / Aggregation Hub (Optional/Advanced)
**Purpose:** Consolidating small loads for efficiency.
**Page:** `Hub Manager Interface`
- **UI Elements:**
  - **Incoming Shipments Table:** Expected arrivals from various farms.
  - **Sorting Interface:** Tools to scan/verify received goods, grade them, and re-package.
  - **Dispatch Queue:** Grouping multiple orders going to the same city into one large truck load.
- **Functions:**
  - Reassigns custody of the crop from Local Transporter to Hub, and then to Long-Haul Transporter.

### Module 15: Route Optimization
**Purpose:** AI/Algorithmic routing for minimal fuel and time.
**Background Process:**
- **Functions:**
  - Takes inputs: Farmer GPS, Customer GPS, Hub GPS, Vehicle Capacity, Crop Weights.
  - Runs algorithms (like Traveling Salesperson or VRP - Vehicle Routing Problem).
  - Outputs an ordered list of waypoints sent directly to the Transporter's Itinerary (Module 14).
