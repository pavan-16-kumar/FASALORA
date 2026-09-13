# Module 8: Flexible Quantity Selection
**Purpose:** Allowing partial purchases of large listings.
**Page:** `Crop Details Modal / Page`

## UI Elements
- **Quantity Selector:** `[-] [ Input Box ] [+]` with limits up to the max available stock.
- **Dynamic Price Display:** Auto-calculates `Quantity * Price/kg`.
- **Action Button:** `[ ADD TO CART ]`.

## Functions
- Validates that the requested quantity is > 0 and <= Available Stock.
- Calculates the total crop value instantly as the user types or clicks the stepper.