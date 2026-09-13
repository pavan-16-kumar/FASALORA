# Module 10: Order Creation
**Purpose:** Central transaction generation.
**Background Process:**

## Elements & Data Flow
- **Data Entities:** Order ID, Customer ID, Farmer ID, Crop Listing ID.
- **Status Tracker:** Defaults to 'PENDING'.

## Functions
- Generates a unique `Order ID` (e.g., `ORD-26-009721`).
- Creates relational links between Customer ID, Farmer ID, and Crop Listing ID.
- Deducts the requested quantity from the Crop Inventory immediately.