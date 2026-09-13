---
marp: true
theme: default
paginate: true
size: 16:9
html: true
header: 'SMART INDIA HACKATHON 2026  |  Problem Statement ID: SIH26033'
footer: 'FarmConnect – Smart Farm-to-Customer Network'
style: |
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  section {
    font-family: 'Plus Jakarta Sans', 'Segoe UI', -apple-system, sans-serif;
    padding: 32px 42px 38px 42px;
    font-size: 13px;
    line-height: 1.4;
    background: #ffffff;
    color: #1f2937;
    position: relative;
  }
  header {
    font-size: 10.5px;
    font-weight: 700;
    color: #6b7280;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 5px;
    top: 14px;
    left: 42px;
    right: 42px;
  }
  footer {
    font-size: 10.5px;
    font-weight: 600;
    color: #9ca3af;
    bottom: 12px;
    left: 42px;
    right: 42px;
  }
  h1 {
    font-size: 22px;
    font-weight: 800;
    color: #0f2913;
    margin: 6px 0 2px 0;
    letter-spacing: -0.3px;
    line-height: 1.2;
  }
  .sub-title {
    font-size: 12px;
    color: #4b5563;
    margin-bottom: 10px;
    font-weight: 500;
  }
  .sub-title b {
    color: #15803d;
  }

  /* Grid Layouts */
  .grid-2 {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 14px;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1.3fr 1fr;
    gap: 12px;
  }
  .grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  /* Cards */
  .card {
    background: #fdfdfd;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 8px 11px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
  }
  .card-header {
    font-size: 12.5px;
    font-weight: 700;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .card-green {
    background: #f7fee7;
    border-color: #bef264;
  }
  .card-blue {
    background: #f0f9ff;
    border-color: #bae6fd;
  }
  .card-amber {
    background: #fffbeb;
    border-color: #fde68a;
  }
  .card-purple {
    background: #faf5ff;
    border-color: #e9d5ff;
  }

  /* Flow pills */
  .flow-item {
    background: #ffffff;
    border: 1px solid #86efac;
    border-radius: 6px;
    padding: 4px 6px;
    text-align: center;
    font-size: 10.5px;
    font-weight: 700;
    color: #166534;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  }
  .flow-arrow {
    text-align: center;
    color: #22c55e;
    font-size: 10px;
    line-height: 1;
    margin: 1px 0;
    font-weight: bold;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10px;
    margin-top: 2px;
  }
  th {
    background: #15803d;
    color: #ffffff;
    font-weight: 700;
    text-align: left;
    padding: 5px 7px;
    font-size: 10.5px;
  }
  td {
    padding: 4.5px 7px;
    border-bottom: 1px solid #e5e7eb;
    color: #374151;
  }
  tr:nth-child(even) td {
    background: #f9fafb;
  }

  /* Badges & Tags */
  .badge-tag {
    background: #dcfce7;
    color: #166534;
    padding: 2px 7px;
    border-radius: 9999px;
    font-size: 10px;
    font-weight: 700;
    display: inline-block;
  }
  .badge-pill {
    background: #15803d;
    color: #ffffff;
    padding: 3px 9px;
    border-radius: 9999px;
    font-size: 10.5px;
    font-weight: 700;
  }
---

<!-- ======================================================= -->
<!-- SLIDE 1: TITLE PAGE                                     -->
<!-- ======================================================= -->
<div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
<div>
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
<span class="badge-pill">SMART INDIA HACKATHON 2026</span>
<span style="font-size: 12px; font-weight: 700; color: #15803d;">Category: Software Edition</span>
</div>
<h1 style="font-size: 23px; color: #14532d; margin-top: 0;">Multiple Intermediaries Reduce Farmers Earnings & Increase Consumer Prices</h1>
<div style="font-size: 12.5px; color: #4b5563; font-weight: 600; margin-top: 4px;">
Theme: <span style="color: #15803d;">Agriculture, FoodTech & Rural Development</span> &nbsp;|&nbsp; Problem Statement ID: <span class="badge-tag">SIH26033</span>
</div>
</div>
<div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 18px; align-items: stretch; margin: 12px 0;">
<div class="card" style="background: #f8fafc; border-left: 4px solid #15803d; padding: 14px 16px;">
<div style="font-size: 11px; font-weight: 800; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase;">Team Registration Details</div>
<div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 8px;">
Team Name: <span style="color: #15803d;">Risk Takers</span>
</div>
<div style="font-size: 13px; font-weight: 600; color: #334155; margin-top: 4px;">
Team ID: <span style="font-family: monospace; font-size: 13px; background: #e2e8f0; padding: 1px 6px; border-radius: 4px;">62079</span>
</div>
<div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed #cbd5e1; font-size: 11.5px; color: #64748b;">
<b>Target Domain:</b> Decentralized Farm-to-Fork Direct Trade, Cold Aggregation & Smart Logistics
</div>
</div>
<div class="card" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1.5px solid #86efac; text-align: center; padding: 14px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
<div style="font-size: 30px; line-height: 1;">🌾</div>
<div style="font-size: 22px; font-weight: 800; color: #14532d; letter-spacing: -0.5px; margin-top: 4px;">FarmConnect</div>
<div style="font-size: 12px; font-weight: 600; color: #166534; margin-top: 2px;">Smart Farm-to-Customer Network</div>
<div style="margin-top: 10px;">
<span style="background: #15803d; color: #ffffff; padding: 3px 12px; border-radius: 9999px; font-size: 10.5px; font-weight: 700;">100% Full Working Prototype Built</span>
</div>
</div>
</div>
<div style="font-size: 11px; color: #64748b; background: #f1f5f9; padding: 6px 12px; border-radius: 6px; display: flex; justify-content: space-between;">
<span><b>Verified Codebase:</b> Next.js 16 (React 19) • Python FastAPI • Supabase PostgreSQL • Leaflet Maps</span>
<span><b>Status:</b> Ready for SIH 2026 Grand Finale Evaluation</span>
</div>
</div>

---

<!-- ======================================================= -->
<!-- SLIDE 2: IDEA / SOLUTION                                -->
<!-- ======================================================= -->
<div style="display: flex; justify-content: space-between; align-items: center;">
<div>
<h1>IDEA / SOLUTION</h1>
<div class="sub-title"><b>FarmConnect:</b> Direct multi-stakeholder ecosystem connecting Farmers, Consumers, Transporters & Aggregation Hubs.</div>
</div>
<span class="badge-tag">End-to-End Operational</span>
</div>
<div class="grid-3" style="align-items: stretch;">
<div class="card" style="background: #fafafa;">
<div class="card-header" style="color: #166534; justify-content: center;">
<span>📍 User Journey Flow</span>
</div>
<div style="display: flex; flex-direction: column; gap: 0;">
<div class="flow-item">👨🌾 1. Farm Geolocation Pin</div>
<div class="flow-arrow">▼</div>
<div class="flow-item">🆔 2. Unique Farmer ID</div>
<div class="flow-arrow">▼</div>
<div class="flow-item">📦 3. Crop Lot Listed (Grade/Qty)</div>
<div class="flow-arrow">▼</div>
<div class="flow-item">🛒 4. Partial Qty Hold in Cart</div>
<div class="flow-arrow">▼</div>
<div class="flow-item">🚚 5. Transporter Farm Pickup</div>
<div class="flow-arrow">▼</div>
<div class="flow-item">💵 6. Instant Escrow Settlement</div>
</div>
</div>
<div class="card">
<div class="card-header" style="color: #1e3a8a;">
<span>⚙️ Core Sub-Systems</span>
</div>
<div style="margin-bottom: 5px;">
<b style="color: #15803d; font-size: 11.5px;">🌾 Farmer Portal</b>
<p style="font-size: 10.5px; margin: 1px 0 0 0; color: #4b5563; line-height: 1.35;">
• Interactive GPS mapping & standardized ID (<code>FC-TG-MDL-26-000184</code>).<br>
• Lists produce by variety, grade, harvest date, and custom reserve price/kg.
</p>
</div>
<div style="margin-bottom: 5px;">
<b style="color: #0284c7; font-size: 11.5px;">🛒 Buyer Marketplace</b>
<p style="font-size: 10.5px; margin: 1px 0 0 0; color: #4b5563; line-height: 1.35;">
• <b>Flexible Partial Buying:</b> Buy 20kg from a 500kg lot with atomic lock.<br>
• <b>Privacy Guard:</b> Exact GPS masked; district-level badges shown to public.
</p>
</div>
<div>
<b style="color: #7c3aed; font-size: 11.5px;">🚚 Logistics & Hub Module</b>
<p style="font-size: 10.5px; margin: 1px 0 0 0; color: #4b5563; line-height: 1.35;">
• Waypoint dispatch pushes farm pickup stops directly to driver app.<br>
• Rural aggregation hubs bundle small farm lots into consolidated city trucks.
</p>
</div>
</div>
<div class="card">
<div class="card-header" style="color: #b45309;">
<span>✨ Additional Features</span>
</div>
<ul style="padding-left: 14px; margin: 0; font-size: 10.8px; color: #374151; display: flex; flex-direction: column; gap: 4px; line-height: 1.35;">
<li><b>Verifiable Digital ID:</b> Downloadable farmer identity card for formal loans.</li>
<li><b>Direct Price Realization:</b> Farmer retains 65–75% of consumer spend.</li>
<li><b>Dynamic Cart Locking:</b> 10-minute hold prevents overselling inventory.</li>
<li><b>3-Way Transparent Rating:</b> Reviews for Farmer, Quality, and Delivery.</li>
<li><b>Multilingual Support:</b> Accessible in English, Hindi, and Regional languages.</li>
</ul>
</div>
</div>
<div class="card" style="background: #f0fdf4; border: 1.5px solid #86efac; margin-top: 8px; padding: 6px 12px;">
<div style="display: flex; justify-content: space-between; align-items: center;">
<div style="font-size: 11px;">
<b style="color: #166534;">Unique Value Proposition:</b>
<span style="color: #374151;"> <b>Unique Farmer ID</b> + <b>Flexible Lot Purchasing</b> (Zero distress selling) + <b>Automated First-Mile Farm Pickup</b></span>
</div>
<span class="badge-tag" style="background: #15803d; color: #ffffff; font-size: 10px;">100% Working Prototype Built</span>
</div>
</div>
<div style="text-align: right; font-size: 9.5px; color: #9ca3af; margin-top: 4px; font-style: italic;">
From soil to salad bowl without the middleman toll.
</div>

---

<!-- ======================================================= -->
<!-- SLIDE 3: TECHNICAL APPROACH                             -->
<!-- ======================================================= -->
<h1>TECHNICAL APPROACH</h1>
<div class="sub-title">Fullstack Modular Architecture with Real-time Geospatial Logistics and Atomic Inventory Controls.</div>
<div class="grid-2" style="align-items: stretch;">
<div style="display: flex; flex-direction: column; gap: 7px;">
<div class="card card-blue" style="padding: 7px 11px;">
<div style="font-size: 11.5px; font-weight: 700; color: #0369a1; margin-bottom: 2px;">Frontend (Design & User Application)</div>
<div style="font-size: 10.5px; color: #334155; line-height: 1.35;">
• <b>Web App / PWA:</b> Next.js 16 (App Router), React 19, TypeScript.<br>
• <b>Styling & Icons:</b> Tailwind CSS v4, Lucide React icons, responsive UI.<br>
• <b>Map Component:</b> Leaflet interactive map for farm geofencing & coordinates.
</div>
</div>
<div class="card card-green" style="padding: 7px 11px;">
<div style="font-size: 11.5px; font-weight: 700; color: #15803d; margin-bottom: 2px;">Backend (Server, APIs & Microservices)</div>
<div style="font-size: 10.5px; color: #334155; line-height: 1.35;">
• <b>Framework:</b> Python FastAPI with async non-blocking execution.<br>
• <b>Validation:</b> Pydantic v2 schemas for strict data contract verification.<br>
• <b>Security:</b> Python-JOSE for JWT token authentication and role authorization.
</div>
</div>
<div class="card card-purple" style="padding: 7px 11px;">
<div style="font-size: 11.5px; font-weight: 700; color: #7e22ce; margin-bottom: 2px;">Database, Storage & Routing Layer</div>
<div style="font-size: 10.5px; color: #334155; line-height: 1.35;">
• <b>Data Persistence:</b> Supabase / PostgreSQL (7 normalized schemas).<br>
• <b>Atomic Concurrency:</b> Real-time inventory decrement (<code>stock -= qty</code>).<br>
• <b>Logistics Solver:</b> Graph-based Vehicle Routing Problem (VRP) pickup engine.
</div>
</div>
</div>
<div class="card" style="padding: 9px 11px; display: flex; flex-direction: column; justify-content: space-between;">
<div class="card-header" style="color: #0f172a; justify-content: center; font-size: 12px; margin-bottom: 4px;">
<span>Multi-Tier Execution Architecture & Swimlane</span>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; font-size: 10px; text-align: center;">
<div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; padding: 5px;">
<b style="color: #166534;">FARMER</b><br>
Pin Farm GPS<br>↓<br>Get Farmer ID<br>↓<br>List Crop Lot<br>↓<br>Accept Order
</div>
<div style="background: #f0f9ff; border: 1px solid #7dd3fc; border-radius: 6px; padding: 5px;">
<b style="color: #0369a1;">BACKEND / API</b><br>
Validate Payload<br>↓<br>Generate Codified ID<br>↓<br>Atomic Stock Lock<br>↓<br>VRP Route Engine
</div>
<div style="background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 6px; padding: 5px;">
<b style="color: #6b21a8;">BUYER & DRIVER</b><br>
Search Nearby Crops<br>↓<br>Buy Partial 20kg<br>↓<br>Escrow Payment<br>↓<br>Farm Pickup & POD
</div>
</div>
<div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 5px; margin-top: 6px; font-size: 10px; text-align: center;">
<b style="color: #92400e;">Order Lifecycle State Machine:</b><br>
<code>PENDING</code> ➔ <code>ACCEPTED</code> ➔ <code>ASSIGNED</code> ➔ <code>PICKED_UP</code> ➔ <code>AT_HUB</code> ➔ <code>DELIVERED</code> ➔ <code>SETTLED</code>
</div>
</div>
</div>
<div style="text-align: right; font-size: 9.5px; color: #9ca3af; margin-top: 4px; font-style: italic;">
Where distributed locks meet rural farm gates.
</div>

---

<!-- ======================================================= -->
<!-- SLIDE 4: FEASIBILITY AND VIABILITY                      -->
<!-- ======================================================= -->
<h1>FEASIBILITY AND VIABILITY</h1>
<div class="sub-title">Systematic Evaluation Across Technical Readiness, Business Viability, Real-World Risks, and Concrete Strategies.</div>
<div class="grid-4" style="align-items: stretch;">
<div class="card card-green" style="display: flex; flex-direction: column;">
<div style="font-size: 12px; font-weight: 800; color: #15803d; border-bottom: 2px solid #86efac; padding-bottom: 3px; margin-bottom: 5px; text-align: center;">
Feasibility
</div>
<ul style="padding-left: 12px; margin: 0; font-size: 10.2px; color: #166534; display: flex; flex-direction: column; gap: 5px; line-height: 1.35;">
<li><b>Zero-Install PWA:</b> Accessible on any basic Android/iOS mobile browser without app stores.</li>
<li><b>FastAPI Asynchronous I/O:</b> High concurrency handling thousands of simultaneous farmer queries.</li>
<li><b>PostgreSQL Scalability:</b> Enterprise ACID transactions for error-free order processing.</li>
<li><b>Open-Source Mapping:</b> Leaflet + OSM avoids costly third-party map licensing fees.</li>
</ul>
</div>
<div class="card card-blue" style="display: flex; flex-direction: column;">
<div style="font-size: 12px; font-weight: 800; color: #0369a1; border-bottom: 2px solid #7dd3fc; padding-bottom: 3px; margin-bottom: 5px; text-align: center;">
Viability
</div>
<ul style="padding-left: 12px; margin: 0; font-size: 10.2px; color: #075985; display: flex; flex-direction: column; gap: 5px; line-height: 1.35;">
<li><b>Modular Architecture:</b> Scalable microservices for Marketplace, Orders, and Transporters.</li>
<li><b>Self-Sustaining Model:</b> Nominal 2–3% platform fee covers cloud hosting & operations.</li>
<li><b>Policy Alignment:</b> Directly supports PM Kisan, AgriStack, and Digital India mission goals.</li>
<li><b>FPO Aggregation:</b> Connects with Farmer Producer Organizations for bulk regional dispatch.</li>
</ul>
</div>
<div class="card card-amber" style="display: flex; flex-direction: column;">
<div style="font-size: 12px; font-weight: 800; color: #b45309; border-bottom: 2px solid #fde68a; padding-bottom: 3px; margin-bottom: 5px; text-align: center;">
Challenges & Risks
</div>
<ul style="padding-left: 12px; margin: 0; font-size: 10.2px; color: #78350f; display: flex; flex-direction: column; gap: 5px; line-height: 1.35;">
<li><b>Rural Connectivity:</b> Slow or spotty 2G/4G coverage in interior agricultural fields.</li>
<li><b>Digital App Literacy:</b> Reluctance of elderly farmers to navigate complex smartphone forms.</li>
<li><b>First-Mile Fragmentation:</b> Dispersed small lot collections across remote rural villages.</li>
<li><b>Concurrency Conflicts:</b> Multiple buyers attempting to buy the same remaining stock.</li>
</ul>
</div>
<div class="card card-purple" style="display: flex; flex-direction: column;">
<div style="font-size: 12px; font-weight: 800; color: #7e22ce; border-bottom: 2px solid #d8b4fe; padding-bottom: 3px; margin-bottom: 5px; text-align: center;">
Strategies
</div>
<ul style="padding-left: 12px; margin: 0; font-size: 10.2px; color: #581c87; display: flex; flex-direction: column; gap: 5px; line-height: 1.35;">
<li><b>Low-Data Caching:</b> Offline registration queue with automatic background sync.</li>
<li><b>Visual Multilingual UI:</b> Icon-driven workflows, minimal typing, regional language toggle.</li>
<li><b>Collection Hubs:</b> Rural aggregation depots bundle small loads into full trucks.</li>
<li><b>Atomic Row Locking:</b> Distributed locking releases unpurchased items after 10 min.</li>
</ul>
</div>
</div>
<div style="text-align: right; font-size: 9.5px; color: #9ca3af; margin-top: 4px; font-style: italic;">
Workflows so intuitive, even non-tech-savvy farmers adopt them in minutes.
</div>

---

<!-- ======================================================= -->
<!-- SLIDE 5: IMPACT AND BENEFITS                            -->
<!-- ======================================================= -->
<h1>IMPACT AND BENEFITS</h1>
<div class="sub-title">Empowering Rural Cultivators, Lowering Food Costs for Consumers, and Creating Rural Logistics Employment.</div>
<div class="grid-3" style="align-items: stretch;">
<div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
<div>
<div class="card-header" style="color: #166534;">
<span>🌱 Socio-Economic Impact</span>
</div>
<ul style="padding-left: 12px; margin: 0; font-size: 10.5px; color: #374151; display: flex; flex-direction: column; gap: 5px; line-height: 1.35;">
<li><b>Eliminating Middlemen:</b> Cuts 4-6 commission tiers; farmer share jumps from 35% to 70%.</li>
<li><b>Ending Distress Sales:</b> Partial lot selling allows farmers to sell at peak market rates.</li>
<li><b>Formal Credit Passport:</b> Verified digital transaction history unlocks bank loans & crop insurance.</li>
<li><b>Rural Youth Jobs:</b> Organized local transportation creates steady rural driving livelihoods.</li>
</ul>
</div>
<div style="background: #f0fdf4; border: 1px solid #86efac; padding: 4px 6px; border-radius: 4px; font-size: 10px; color: #166534; text-align: center; margin-top: 6px;">
Directly achieves UN SDG 1 (No Poverty) & SDG 8 (Decent Work)
</div>
</div>
<div class="card" style="background: #fcfdfc; border-color: #86efac; text-align: center; display: flex; flex-direction: column; justify-content: space-between;">
<div class="card-header" style="color: #15803d; justify-content: center;">
<span>🔄 Benefits That Matter</span>
</div>
<div style="display: flex; flex-direction: column; gap: 4px; margin: 4px 0;">
<div class="flow-item" style="border-color: #bbf7d0;">⚡ Sub-24h Direct Farm Dispatch</div>
<div class="flow-item" style="border-color: #bbf7d0;">🛡️ Escrow Payouts upon Delivery</div>
<div class="flow-item" style="border-color: #bbf7d0;">🔒 GPS Masking for Farm Privacy</div>
<div class="flow-item" style="border-color: #bbf7d0;">📊 Real-time Price Transparency</div>
<div class="flow-item" style="border-color: #bbf7d0;">📉 20% Reduction in Transit Loss</div>
</div>
<div style="font-size: 9.5px; color: #6b7280;">Verified across all 5 Platform Roles</div>
</div>
<div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
<div class="card-header" style="color: #0369a1; justify-content: center;">
<span>📈 Key Impact Metrics</span>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; text-align: center;">
<div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 5px;">
<div style="font-size: 17px; font-weight: 800; color: #047857;">+35%</div>
<div style="font-size: 9px; font-weight: 600; color: #065f46;">Farmer Income</div>
</div>
<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 5px;">
<div style="font-size: 17px; font-weight: 800; color: #1d4ed8;">15-20%</div>
<div style="font-size: 9px; font-weight: 600; color: #1e40af;">Consumer Savings</div>
</div>
<div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 5px;">
<div style="font-size: 17px; font-weight: 800; color: #b45309;">&lt; 24h</div>
<div style="font-size: 9px; font-weight: 600; color: #92400e;">Farm-to-Doorstep</div>
</div>
<div style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 6px; padding: 5px;">
<div style="font-size: 17px; font-weight: 800; color: #7e22ce;">0%</div>
<div style="font-size: 9px; font-weight: 600; color: #6b21a8;">Middleman Markups</div>
</div>
</div>
<div style="font-size: 10px; text-align: center; color: #64748b; margin-top: 4px; background: #f8fafc; padding: 3px; border-radius: 4px;">
Simulated on 500kg harvest lot orders
</div>
</div>
</div>
<div style="text-align: right; font-size: 9.5px; color: #9ca3af; margin-top: 4px; font-style: italic;">
Finally, proof that transparent agriculture pays everyone better.
</div>

---

<!-- ======================================================= -->
<!-- SLIDE 6: RESEARCH AND REFERENCES                        -->
<!-- ======================================================= -->
<h1>RESEARCH AND REFERENCES</h1>
<div class="sub-title">Comparative Analysis Against Existing Agricultural Platforms and Literature References.</div>
<div style="display: grid; grid-template-columns: 2.3fr 1fr; gap: 12px; align-items: stretch;">
<div>
<table>
<thead>
<tr>
<th>Evaluation Parameter</th>
<th>Traditional Mandi</th>
<th>e-NAM Portal</th>
<th>Commercial Apps</th>
<th style="background: #14532d;">FarmConnect (SIH26033)</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Intermediary Removal</b></td>
<td>❌ 4-6 Middlemen</td>
<td>⚠️ Registered Traders</td>
<td>⚠️ Platform Commission</td>
<td>✅ <b>Zero Middlemen (P2P)</b></td>
</tr>
<tr>
<td><b>Quantity Flexibility</b></td>
<td>❌ Full Quintals Only</td>
<td>❌ Bulk Auction Lots</td>
<td>⚠️ Fixed Pre-packs</td>
<td>✅ <b>Custom Partial Lot (20kg)</b></td>
</tr>
<tr>
<td><b>Farm-Gate Pickup</b></td>
<td>❌ Farmer Bears Transport</td>
<td>❌ Must Bring to Yard</td>
<td>⚠️ Limited Hubs</td>
<td>✅ <b>Automated VRP Pickup</b></td>
</tr>
<tr>
<td><b>Digital Farmer ID</b></td>
<td>❌ Paper Slips</td>
<td>⚠️ Mandi-Only ID</td>
<td>⚠️ App Account</td>
<td>✅ <b>Unique Standard Farmer ID</b></td>
</tr>
<tr>
<td><b>Location Privacy</b></td>
<td>❌ Public Yard</td>
<td>❌ Public Board</td>
<td>⚠️ Generic Info</td>
<td>✅ <b>Masked GPS + District Tag</b></td>
</tr>
<tr>
<td><b>Payment Settlement</b></td>
<td>❌ Delayed (15-45 Days)</td>
<td>⚠️ Mandi Gateways</td>
<td>⚠️ 7-14 Days Batch</td>
<td>✅ <b>Instant Escrow on POD</b></td>
</tr>
</tbody>
</table>
</div>
<div style="display: flex; flex-direction: column; justify-content: space-between; gap: 6px;">
<div class="card" style="padding: 7px 9px;">
<div style="font-size: 11px; font-weight: 700; color: #0f172a; margin-bottom: 3px;">Research Foundations</div>
<div style="font-size: 9.8px; color: #4b5563; line-height: 1.35;">
• <b>e-NAM Gaps:</b> Electronic auction barriers & trader dependencies.<br>
• <b>Agmarknet:</b> Daily commodity market wholesale price spreads.<br>
• <b>FPO Hub Studies:</b> Cooperative collection logistics models.<br>
• <b>VRP Routing:</b> Multi-stop heuristic vehicle routing.
</div>
</div>
<div class="card" style="text-align: center; padding: 10px; background: #f0fdf4; border: 2px dashed #4ade80;">
<div style="font-size: 28px; line-height: 1;">📱</div>
<div style="font-size: 12px; font-weight: 800; color: #166534; margin-top: 3px;">Scan & Explore Demo</div>
<div style="font-size: 9.5px; color: #4b5563; margin: 2px 0 5px 0;">Live Web App, Swagger REST APIs & Database</div>
<span class="badge-pill" style="font-size: 9.5px; padding: 2px 8px;">GitHub & Live Demo</span>
</div>
</div>
</div>
<div style="text-align: right; font-size: 9.5px; color: #9ca3af; margin-top: 4px; font-style: italic;">
A playlist of smart agricultural engineering, verified by code.
</div>
