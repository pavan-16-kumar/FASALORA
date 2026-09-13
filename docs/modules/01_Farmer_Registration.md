# Module 1: Farmer Registration
**Purpose:** Onboarding farmers onto the platform.
**Page:** `Farmer Registration Page`

## UI Elements
- **Text Inputs:** Full Name, Mobile Number, Village/Area, Farm Area (in Acres).
- **Dropdowns:** State, District, Main Crop (e.g., Tomato, Rice).
- **Map Component:** A clickable interactive map for "Farm Location" selection.
- **Action Button:** `[ REGISTER FARMER ]`

## Functions
- Validates all input fields (e.g., valid mobile number, non-empty fields).
- Captures exact latitude and longitude from the Map Component in the background.
- Submits the payload to the backend to create a farmer profile.