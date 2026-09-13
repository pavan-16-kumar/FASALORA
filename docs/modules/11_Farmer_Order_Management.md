# Module 11: Farmer Order Management
**Purpose:** Handling incoming purchase requests.
**Page:** `New Order Notification & Details`

## UI Elements
- **Notification Alert:** Bell icon / Push notification for new orders.
- **Order Summary Card:** Order ID, Crop Details, Requested Quantity, Total Price, Pickup/Delivery Info.
- **Action Buttons:** `[ ACCEPT ]`, `[ REJECT ]`.

## Functions
- Locks the requested quantity temporarily so it can't be bought by someone else while pending.
- Updates order status to 'ACCEPTED' and triggers the Logistics module, or releases the inventory back if 'REJECTED'.