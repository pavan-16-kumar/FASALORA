'use client';

import React, { useState } from 'react';
import { useFarmConnect } from '@/context/FarmConnectContext';
import { FarmerIDCard } from '@/components/FarmerIDCard';
import { MapPicker } from '@/components/MapPicker';
import {
  Sprout,
  PlusCircle,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Tag,
  ShieldAlert,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export const FarmerPanel: React.FC = () => {
  const {
    activeFarmer,
    farmers,
    crops,
    orders,
    registerFarmer,
    addCropListing,
    updateOrderStatus
  } = useFarmConnect();

  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'register' | 'addCrop' | 'inventory' | 'orders'>('dashboard');

  // Registration Form State
  const [regForm, setRegForm] = useState({
    name: '',
    mobile: '',
    state: 'Telangana',
    district: 'Medchal-Malkajgiri',
    village: '',
    farmArea: 5,
    mainCrop: 'Tomato',
    lat: 17.6056,
    lng: 78.5701
  });

  // Crop Listing Form State
  const [cropForm, setCropForm] = useState({
    cropName: 'Tomato',
    variety: 'Hybrid Sona',
    grade: 'Grade A' as 'Grade A' | 'Grade B' | 'Organic Premium',
    totalQuantity: 500,
    pricePerKg: 35,
    harvestDate: new Date().toISOString().split('T')[0],
    availableFrom: new Date().toISOString().split('T')[0],
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name || !regForm.mobile || !regForm.village) {
      alert('Please fill out all required fields!');
      return;
    }
    const newFarmer = await registerFarmer(regForm);
    alert(`Registration Successful! Generated Standard Farmer ID: ${newFarmer.farmerId}`);
    setActiveSubTab('dashboard');
  };

  const handleListCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFarmer) {
      alert('Please register or select a farmer profile first!');
      return;
    }
    addCropListing({
      farmerId: activeFarmer.farmerId,
      farmerName: activeFarmer.name,
      farmerLocation: `${activeFarmer.district}, ${activeFarmer.state}`,
      cropName: cropForm.cropName,
      variety: cropForm.variety,
      grade: cropForm.grade,
      totalQuantity: Number(cropForm.totalQuantity),
      pricePerKg: Number(cropForm.pricePerKg),
      harvestDate: cropForm.harvestDate,
      availableFrom: cropForm.availableFrom,
      imageUrl: cropForm.imageUrl
    });
    alert('Crop listing added to the direct marketplace inventory!');
    setActiveSubTab('inventory');
  };

  const myCrops = activeFarmer
    ? crops.filter((c) => c.farmerId === activeFarmer.farmerId)
    : crops;
  const myOrders = activeFarmer
    ? orders.filter((o) => o.farmerId === activeFarmer.farmerId)
    : orders;

  const totalStock = myCrops.reduce((acc, c) => acc + c.availableQuantity, 0);
  const totalSold = myCrops.reduce((acc, c) => acc + c.soldQuantity, 0);
  const pendingOrders = myOrders.filter((o) => o.status === 'PENDING');

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Header & Subtab Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)' }}>Farmer Portal</h2>
            <span className="badge badge-green">Producer Engine</span>
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '4px' }}>
            List harvest lots, manage real-time inventory, and verify farm-gate pickups with digital settlements.
          </p>
        </div>

        <div className="tab-bar">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className={`tab-pill ${activeSubTab === 'dashboard' ? 'active' : ''}`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveSubTab('inventory')}
            className={`tab-pill ${activeSubTab === 'inventory' ? 'active' : ''}`}
          >
            📦 My Crops ({myCrops.length})
          </button>
          <button
            onClick={() => setActiveSubTab('orders')}
            className={`tab-pill ${activeSubTab === 'orders' ? 'active' : ''}`}
          >
            🔔 Orders ({pendingOrders.length})
          </button>
          <button
            onClick={() => setActiveSubTab('addCrop')}
            className={`tab-pill ${activeSubTab === 'addCrop' ? 'active' : ''}`}
          >
            + List New Crop
          </button>
          <button
            onClick={() => setActiveSubTab('register')}
            className={`tab-pill ${activeSubTab === 'register' ? 'active' : ''}`}
          >
            👨🌾 Onboard / ID Card
          </button>
        </div>
      </div>

      {/* DASHBOARD TAB */}
      {activeSubTab === 'dashboard' && (
        <div>
          {/* Top Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div className="card" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--muted)', fontSize: '12.5px', fontWeight: 600 }}>
                <span>AVAILABLE PRODUCE</span>
                <Package size={16} color="var(--green-600)" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--ink)', marginTop: '8px' }}>
                {totalStock} <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--muted)' }}>kg in stock</span>
              </div>
            </div>

            <div className="card" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--muted)', fontSize: '12.5px', fontWeight: 600 }}>
                <span>TOTAL DISPATCHED</span>
                <TrendingUp size={16} color="var(--green-600)" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--green-700)', marginTop: '8px' }}>
                {totalSold} <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--muted)' }}>kg sold</span>
              </div>
            </div>

            <div className="card" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--muted)', fontSize: '12.5px', fontWeight: 600 }}>
                <span>PENDING ORDERS</span>
                <Clock size={16} color={pendingOrders.length > 0 ? 'var(--accent)' : 'var(--muted)'} />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: pendingOrders.length > 0 ? 'var(--accent)' : 'var(--ink)', marginTop: '8px' }}>
                {pendingOrders.length} <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--muted)' }}>awaiting pickup</span>
              </div>
            </div>

            <div className="card" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--muted)', fontSize: '12.5px', fontWeight: 600 }}>
                <span>PRICE REALIZATION</span>
                <Sprout size={16} color="var(--green-600)" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--green-700)', marginTop: '8px' }}>
                72% <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--muted)' }}>vs 35% Mandi</span>
              </div>
            </div>
          </div>

          {/* Farmer Digital ID Card & Active Profile */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            {activeFarmer ? (
              <FarmerIDCard farmer={activeFarmer} />
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '32px' }}>
                <Sprout size={36} color="var(--green-600)" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>No Active Farmer Profile</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                  Register to receive your unique verified digital farmer identification number.
                </p>
                <button onClick={() => setActiveSubTab('register')} className="btn btn-primary" style={{ marginTop: '16px' }}>
                  Complete Farmer Onboarding
                </button>
              </div>
            )}

            {/* Quick Actions Panel */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>Fast Actions</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '2px' }}>
                  Common operations for harvest management and dispatch.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                  <button
                    onClick={() => setActiveSubTab('addCrop')}
                    className="btn btn-ghost"
                    style={{ justifyContent: 'flex-start', border: '1px solid var(--border)', textAlign: 'left' }}
                  >
                    <PlusCircle size={16} color="var(--green-600)" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>List New Harvest Batch</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Post produce with custom price/kg</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSubTab('orders')}
                    className="btn btn-ghost"
                    style={{ justifyContent: 'flex-start', border: '1px solid var(--border)', textAlign: 'left' }}
                  >
                    <Clock size={16} color="var(--accent)" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>Review Pending Orders ({pendingOrders.length})</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Accept order to dispatch transporter</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSubTab('inventory')}
                    className="btn btn-ghost"
                    style={{ justifyContent: 'flex-start', border: '1px solid var(--border)', textAlign: 'left' }}
                  >
                    <Layers size={16} color="var(--green-700)" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>Inventory Audit & Price Update</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Adjust prices based on demand</div>
                    </div>
                  </button>
                </div>
              </div>

              <div style={{ background: 'var(--green-50)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--green-100)', marginTop: '14px', fontSize: '12px', color: 'var(--green-700)' }}>
                🔒 <b>Privacy Guard:</b> Your exact GPS coordinates are masked publicly. Buyers only see district tags.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INVENTORY TAB */}
      {activeSubTab === 'inventory' && (
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>Crops in Inventory</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--muted)' }}>
                Track available versus sold quantities with atomic database synchronization.
              </p>
            </div>
            <button onClick={() => setActiveSubTab('addCrop')} className="btn btn-primary">
              <PlusCircle size={16} /> Add Another Crop
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Listing ID</th>
                  <th>Crop Name & Variety</th>
                  <th>Grade</th>
                  <th>Total Lot</th>
                  <th>Available</th>
                  <th>Sold</th>
                  <th>Price/kg</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myCrops.map((c) => {
                  const isLow = c.availableQuantity <= 50 && c.availableQuantity > 0;
                  const isSoldOut = c.availableQuantity === 0;

                  return (
                    <tr key={c.listingId}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--green-700)' }}>
                        {c.listingId}
                      </td>
                      <td>
                        <b>{c.cropName}</b>
                        <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>{c.variety}</div>
                      </td>
                      <td>
                        <span className="badge badge-green">{c.grade}</span>
                      </td>
                      <td>{c.totalQuantity} kg</td>
                      <td style={{ fontWeight: 700, color: isSoldOut ? 'var(--danger)' : isLow ? 'var(--accent)' : 'var(--green-700)' }}>
                        {c.availableQuantity} kg
                      </td>
                      <td>{c.soldQuantity} kg</td>
                      <td style={{ fontWeight: 700 }}>₹{c.pricePerKg}</td>
                      <td>
                        <span className={`badge ${isSoldOut ? 'badge-amber' : isLow ? 'badge-amber' : 'badge-green'}`}>
                          {isSoldOut ? 'Sold Out' : isLow ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS MANAGEMENT TAB */}
      {activeSubTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {myOrders.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <Clock size={36} color="var(--muted)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>No Incoming Purchase Orders</h3>
              <p style={{ color: 'var(--muted)', marginTop: '4px' }}>
                When customers purchase from your crop listings, they will appear here for pickup confirmation.
              </p>
            </div>
          ) : (
            myOrders.map((order) => (
              <div key={order.orderId} className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{order.orderId}</span>
                      <span className="badge badge-green">{order.status}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                      Customer: <b>{order.customerName}</b> ({order.customerMobile}) • Delivery: {order.deliveryAddress}
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--green-700)' }}>
                      ₹{order.cropValue} <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 400 }}>(Farmer Payout)</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Escrow Settlement on Handover</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ fontSize: '13px' }}>
                    Produce Requested: <b>{order.quantity} kg</b> of {order.cropName} @ ₹{order.pricePerKg}/kg
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {order.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => {
                            updateOrderStatus(order.orderId, 'FARMER_ACCEPTED');
                            alert(`Order ${order.orderId} Accepted! Transporter assigned for farm gate collection.`);
                          }}
                          className="btn btn-primary"
                          style={{ padding: '8px 16px', fontSize: '12.5px' }}
                        >
                          <CheckCircle2 size={15} /> Accept & Dispatch Driver
                        </button>
                        <button
                          onClick={() => {
                            updateOrderStatus(order.orderId, 'REJECTED');
                            alert(`Order ${order.orderId} Rejected. Stock returned to available inventory.`);
                          }}
                          className="btn btn-danger"
                          style={{ padding: '8px 14px', fontSize: '12.5px' }}
                        >
                          <XCircle size={15} /> Reject
                        </button>
                      </>
                    )}
                    {order.status !== 'PENDING' && (
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                        Status: <b>{order.status}</b> (Waypoints managed via Transporter Engine)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ADD CROP TAB */}
      {activeSubTab === 'addCrop' && (
        <div className="card" style={{ maxWidth: '680px', margin: '0 auto', padding: '28px' }}>
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '14px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)' }}>List Produce for Direct Sale</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '2px' }}>
              Eliminate mandi broker fees. Set your exact price per kilogram and sell in partial lots.
            </p>
          </div>

          <form onSubmit={handleListCrop} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '5px' }}>
                  Crop Type
                </label>
                <input
                  type="text"
                  value={cropForm.cropName}
                  onChange={(e) => setCropForm({ ...cropForm, cropName: e.target.value })}
                  placeholder="e.g. Tomato, Potato, Rice"
                  className="input-control"
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '5px' }}>
                  Crop Variety
                </label>
                <input
                  type="text"
                  value={cropForm.variety}
                  onChange={(e) => setCropForm({ ...cropForm, variety: e.target.value })}
                  placeholder="e.g. Hybrid Red Sona, Teja"
                  className="input-control"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '5px' }}>
                  Quality Grade
                </label>
                <select
                  value={cropForm.grade}
                  onChange={(e) => setCropForm({ ...cropForm, grade: e.target.value as any })}
                  className="input-control"
                >
                  <option value="Grade A">Grade A</option>
                  <option value="Grade B">Grade B</option>
                  <option value="Organic Premium">Organic Premium</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '5px' }}>
                  Total Lot (kg)
                </label>
                <input
                  type="number"
                  min="1"
                  value={cropForm.totalQuantity}
                  onChange={(e) => setCropForm({ ...cropForm, totalQuantity: Number(e.target.value) })}
                  className="input-control"
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '5px' }}>
                  Your Price (₹/kg)
                </label>
                <input
                  type="number"
                  min="1"
                  value={cropForm.pricePerKg}
                  onChange={(e) => setCropForm({ ...cropForm, pricePerKg: Number(e.target.value) })}
                  className="input-control"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '5px' }}>
                  Harvest Date
                </label>
                <input
                  type="date"
                  value={cropForm.harvestDate}
                  onChange={(e) => setCropForm({ ...cropForm, harvestDate: e.target.value })}
                  className="input-control"
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '5px' }}>
                  Available From Date
                </label>
                <input
                  type="date"
                  value={cropForm.availableFrom}
                  onChange={(e) => setCropForm({ ...cropForm, availableFrom: e.target.value })}
                  className="input-control"
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '5px' }}>
                Photo Image URL
              </label>
              <input
                type="url"
                value={cropForm.imageUrl}
                onChange={(e) => setCropForm({ ...cropForm, imageUrl: e.target.value })}
                className="input-control"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="button" onClick={() => setActiveSubTab('dashboard')} className="btn btn-ghost" style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Confirm & List Produce
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FARMER REGISTRATION & GEOLOCATION TAB */}
      {activeSubTab === 'register' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Form */}
          <div className="card" style={{ padding: '26px' }}>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '14px', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)' }}>Farmer Onboarding</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '2px' }}>
                Generates a standardized Unique Farmer ID card with geolocation verification.
              </p>
            </div>

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '4px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={regForm.name}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                  className="input-control"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '4px' }}>
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={regForm.mobile}
                    onChange={(e) => setRegForm({ ...regForm, mobile: e.target.value })}
                    className="input-control"
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '4px' }}>
                    State
                  </label>
                  <input
                    type="text"
                    value={regForm.state}
                    onChange={(e) => setRegForm({ ...regForm, state: e.target.value })}
                    className="input-control"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '4px' }}>
                    District
                  </label>
                  <input
                    type="text"
                    value={regForm.district}
                    onChange={(e) => setRegForm({ ...regForm, district: e.target.value })}
                    className="input-control"
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '4px' }}>
                    Village / Panchayat
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shamirpet"
                    value={regForm.village}
                    onChange={(e) => setRegForm({ ...regForm, village: e.target.value })}
                    className="input-control"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '4px' }}>
                    Farm Size (Acres)
                  </label>
                  <input
                    type="number"
                    value={regForm.farmArea}
                    onChange={(e) => setRegForm({ ...regForm, farmArea: Number(e.target.value) })}
                    className="input-control"
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '4px' }}>
                    Primary Crop
                  </label>
                  <input
                    type="text"
                    value={regForm.mainCrop}
                    onChange={(e) => setRegForm({ ...regForm, mainCrop: e.target.value })}
                    className="input-control"
                    required
                  />
                </div>
              </div>

              <div style={{ marginTop: '6px' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Generate Unique Farmer ID & Save
                </button>
              </div>
            </form>
          </div>

          {/* Interactive Map Picker */}
          <div className="card" style={{ padding: '26px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={18} color="var(--green-600)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Farm Geofencing & Location Pin</h3>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                Click to place pin at exact farm gate location. Used for driver pickup routing.
              </p>
            </div>

            <div style={{ flex: 1, minHeight: '280px', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              <MapPicker
                lat={regForm.lat}
                lng={regForm.lng}
                interactive={true}
                onLocationSelect={(lat: number, lng: number) => setRegForm({ ...regForm, lat, lng })}
              />
            </div>

            <div style={{ marginTop: '12px', fontSize: '11.5px', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Latitude: <b>{regForm.lat.toFixed(4)}</b></span>
              <span>Longitude: <b>{regForm.lng.toFixed(4)}</b></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
