# Module 4: Crop Listing / Sell Crop
**Purpose:** Allowing farmers to put their inventory up for sale.
**Page:** `Add Crop Page`

## UI Elements
- **Dropdowns:** Crop Type, Variety, Grade.
- **Number Inputs:** Quantity (in kg/tons), Price per kg (₹).
- **Date Pickers:** Harvest Date, Available From Date.
- **File Uploader:** `[ + Upload Photos ]` for crop images.
- **Action Button:** `[ LIST CROP ]`.

## Functions
- Processes image uploads and stores them securely.
- Validates pricing and quantity inputs.
- Generates a unique `Crop Listing ID` (e.g., `CL-TG-TOM-26-004821`) upon submission and updates the inventory.