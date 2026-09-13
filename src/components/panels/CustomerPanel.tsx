'use client';

import React, { useState } from 'react';
import { useFarmConnect } from '@/context/FarmConnectContext';
import { CropListing, Order } from '@/types';
import {
  Search,
  ShoppingCart,
  MapPin,
  CheckCircle2,
  Truck,
  Star,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  PackageCheck,
  Calendar,
  X
} from 'lucide-react';

interface CustomerPanelProps {
  isCartOpen?: boolean;
  onCloseCart?: () => void;
}

export const CustomerPanel: React.FC<CustomerPanelProps> = ({ isCartOpen = false, onCloseCart }) => {
  const {
    crops,
    cart,
    orders,
    addToCart,
    removeFromCart,
    placeOrder,
    submitReview
  } = useFarmConnect();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('ALL');

  // Quantity Modal State
  const [selectedCrop, setSelectedCrop] = useState<CropListing | null>(null);
  const [selectedQty, setSelectedQty] = useState<number>(10);

  // Internal Cart Drawer State (sync with prop)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(isCartOpen);
  const effectiveCartOpen = isCartOpen || cartDrawerOpen;

  // Checkout State
  const [showCheckout, setShowCheckout] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('Plot 42, Jubilee Hills, Hyderabad');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD' | 'Demo Payment'>('UPI');

  // Review Modal State
  const [reviewOrder, setReviewOrder] = useState<Order | null>(null);
  const [farmerRating, setFarmerRating] = useState(5);
  const [cropRating, setCropRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [comment, setComment] = useState('');

  // Active view tab inside Customer panel: 'marketplace' or 'orders'
  const [subTab, setSubTab] = useState<'marketplace' | 'orders'>('marketplace');

  // Filter Crops
  const filteredCrops = crops.filter((c) => {
    const matchesSearch =
      c.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.farmerLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'ALL' || c.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const handleOpenQuantityModal = (crop: CropListing) => {
    setSelectedCrop(crop);
    setSelectedQty(Math.min(20, crop.availableQuantity));
  };

  const handleAddToCartConfirm = () => {
    if (!selectedCrop) return;
    addToCart({
      listingId: selectedCrop.listingId,
      cropName: selectedCrop.cropName,
      farmerId: selectedCrop.farmerId,
      farmerName: selectedCrop.farmerName,
      grade: selectedCrop.grade,
      quantity: selectedQty,
      pricePerKg: selectedCrop.pricePerKg,
      cropValue: selectedQty * selectedCrop.pricePerKg
    });
    setSelectedCrop(null);
    setCartDrawerOpen(true);
  };

  const handlePlaceOrderSubmit = async () => {
    if (cart.length === 0) return;
    const createdOrders = await placeOrder(deliveryAddress, paymentMethod);
    alert(`Order Placed Successfully! Created ${createdOrders.length} Order(s).`);
    setShowCheckout(false);
    setCartDrawerOpen(false);
    if (onCloseCart) onCloseCart();
    setSubTab('orders');
  };

  const handleSubmitReviewForm = () => {
    if (!reviewOrder) return;
    submitReview({
      orderId: reviewOrder.orderId,
      farmerRating,
      cropQualityRating: cropRating,
      deliveryRating,
      comment
    });
    alert('Thank you! Your verified rating was submitted directly to the farmer & transporter.');
    setReviewOrder(null);
    setComment('');
  };

  const cartTotalCropValue = cart.reduce((acc, item) => acc + item.cropValue, 0);
  const deliveryFee = cart.length > 0 ? 60 : 0;
  const grandTotal = cartTotalCropValue + deliveryFee;

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Subtab Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)' }}>
            {subTab === 'marketplace' ? 'Fresh Crop Marketplace' : 'My Orders & Live Tracking'}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>
            {subTab === 'marketplace'
              ? 'Direct from verified farm gates. Choose exact quantities with zero commission markups.'
              : 'Real-time state updates from farm pickup to doorstep handover.'}
          </p>
        </div>

        <div className="tab-bar">
          <button
            onClick={() => setSubTab('marketplace')}
            className={`tab-pill ${subTab === 'marketplace' ? 'active' : ''}`}
          >
            🌾 Browse Marketplace ({crops.length})
          </button>
          <button
            onClick={() => setSubTab('orders')}
            className={`tab-pill ${subTab === 'orders' ? 'active' : ''}`}
          >
            📦 My Orders ({orders.length})
          </button>
        </div>
      </div>

      {subTab === 'marketplace' ? (
        <>
          {/* Search & Filter Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'center',
              marginBottom: '28px',
              background: '#fff',
              padding: '14px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ flex: '1', minWidth: '240px', position: 'relative' }}>
              <Search
                size={18}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}
              />
              <input
                type="text"
                placeholder="Search crops, varieties, or farm locations (e.g. Tomato, Shamirpet)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-control"
                style={{ paddingLeft: '38px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', marginRight: '4px' }}>Grade:</span>
              {(['ALL', 'Grade A', 'Grade B', 'Organic Premium'] as const).map((grade) => (
                <button
                  key={grade}
                  onClick={() => setGradeFilter(grade)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: gradeFilter === grade ? 'var(--green-600)' : 'var(--border-2)',
                    background: gradeFilter === grade ? 'var(--green-50)' : '#fff',
                    color: gradeFilter === grade ? 'var(--green-700)' : 'var(--ink-2)',
                    transition: 'all .16s ease',
                  }}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Crops Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '22px' }}>
            {filteredCrops.map((crop) => {
              const soldPercentage = Math.round(
                (crop.soldQuantity / crop.totalQuantity) * 100
              );

              return (
                <div
                  key={crop.listingId}
                  className="card"
                  style={{
                    padding: '0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Crop Image */}
                  <div style={{ position: 'relative', height: '170px', width: '100%', overflow: 'hidden' }}>
                    <img
                      src={crop.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'}
                      alt={crop.cropName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                      <span className="badge badge-green" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)' }}>
                        <ShieldCheck size={12} /> {crop.grade}
                      </span>
                    </div>
                    <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                      <span
                        style={{
                          background: 'rgba(15, 31, 23, 0.85)',
                          color: '#fff',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 600,
                        }}
                      >
                        {crop.listingId}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>{crop.cropName}</h3>
                        <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '2px' }}>{crop.variety}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--green-700)' }}>
                          ₹{crop.pricePerKg}
                          <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--muted)' }}>/kg</span>
                        </div>
                      </div>
                    </div>

                    {/* Farm info */}
                    <div style={{ marginTop: '12px', padding: '10px', background: 'var(--green-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--green-100)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--green-700)', fontWeight: 600 }}>
                        <MapPin size={13} />
                        <span>{crop.farmerLocation}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11.5px', color: 'var(--muted)' }}>
                        <span>Cultivator: <b>{crop.farmerName}</b></span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Calendar size={11} /> Harvest: {crop.harvestDate}
                        </span>
                      </div>
                    </div>

                    {/* Stock status */}
                    <div style={{ marginTop: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
                        <span style={{ color: 'var(--muted)' }}>Available Stock</span>
                        <span style={{ fontWeight: 600, color: crop.availableQuantity > 50 ? 'var(--ink)' : 'var(--danger)' }}>
                          {crop.availableQuantity} kg / {crop.totalQuantity} kg
                        </span>
                      </div>
                      <div style={{ height: '5px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${100 - soldPercentage}%`,
                            background: crop.availableQuantity > 50 ? 'var(--green-600)' : 'var(--accent)',
                            borderRadius: '99px',
                          }}
                        />
                      </div>
                    </div>

                    {/* CTA */}
                    <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                      <button
                        onClick={() => handleOpenQuantityModal(crop)}
                        disabled={crop.availableQuantity <= 0}
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                      >
                        {crop.availableQuantity > 0 ? 'Buy Custom Lot (from 1 kg)' : 'Sold Out'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Orders & Live Tracking View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <PackageCheck size={42} style={{ color: 'var(--muted)', margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>No Orders Placed Yet</h3>
              <p style={{ color: 'var(--muted)', marginTop: '6px' }}>Browse our direct farm listings and purchase custom quantities.</p>
              <button onClick={() => setSubTab('marketplace')} className="btn btn-primary" style={{ marginTop: '16px' }}>
                Go to Marketplace
              </button>
            </div>
          ) : (
            orders.map((order) => {
              const statusSteps = ['PENDING', 'ACCEPTED', 'ASSIGNED', 'PICKED_UP', 'AT_HUB', 'DELIVERED'];
              const currentStepIndex = statusSteps.indexOf(order.status);

              return (
                <div key={order.orderId} className="card" style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>{order.orderId}</span>
                        <span className="badge badge-green">{order.status}</span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '4px' }}>
                        Placed on {order.createdAt} • Delivery to: <b>{order.deliveryAddress}</b>
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--green-700)' }}>
                        ₹{order.totalAmount}
                      </div>
                      <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>Payment: {order.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '14px 0', fontSize: '13px' }}>
                    <div>
                      <b>{order.cropName}</b> ({order.quantity} kg @ ₹{order.pricePerKg}/kg)
                      <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                        Farmer: {order.farmerName} • {order.farmerLocation}
                      </div>
                    </div>
                    <div>
                      {order.status === 'DELIVERED' && (
                        <button
                          onClick={() => setReviewOrder(order)}
                          className="btn btn-ghost"
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          <Star size={14} color="var(--accent)" /> Rate Experience
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress Tracker Stepper */}
                  <div style={{ marginTop: '16px', padding: '14px', background: 'var(--green-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--green-100)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                      {statusSteps.map((step, idx) => {
                        const isDone = idx <= currentStepIndex;
                        const isCurrent = idx === currentStepIndex;

                        return (
                          <div key={step} style={{ textAlign: 'center', flex: 1, zIndex: 1 }}>
                            <div
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: isDone ? 'var(--green-600)' : '#fff',
                                border: `2px solid ${isDone ? 'var(--green-600)' : 'var(--border-2)'}`,
                                color: isDone ? '#fff' : 'var(--muted)',
                                display: 'grid',
                                placeItems: 'center',
                                margin: '0 auto 6px',
                                fontSize: '11px',
                                fontWeight: 700,
                              }}
                            >
                              {isDone ? '✓' : idx + 1}
                            </div>
                            <span
                              style={{
                                fontSize: '10.5px',
                                fontWeight: isCurrent ? 700 : 500,
                                color: isCurrent ? 'var(--green-700)' : 'var(--muted)',
                                textTransform: 'capitalize',
                              }}
                            >
                              {step.toLowerCase().replace('_', ' ')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* QUANTITY SELECTION MODAL */}
      {selectedCrop && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>Select Custom Quantity</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{selectedCrop.cropName} • {selectedCrop.variety}</p>
              </div>
              <button
                onClick={() => setSelectedCrop(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '16px', background: 'var(--green-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--green-100)', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--ink-2)' }}>Total Lot Available:</span>
                <b>{selectedCrop.availableQuantity} kg</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--ink-2)' }}>Direct Farm Gate Price:</span>
                <b style={{ color: 'var(--green-700)' }}>₹{selectedCrop.pricePerKg} / kg</b>
              </div>
            </div>

            {/* Stepper */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '20px 0' }}>
              <button
                onClick={() => setSelectedQty(Math.max(1, selectedQty - 5))}
                className="btn btn-ghost"
                style={{ width: '42px', height: '42px', padding: 0, borderRadius: '50%' }}
              >
                <Minus size={18} />
              </button>

              <div style={{ textAlign: 'center' }}>
                <input
                  type="number"
                  min="1"
                  max={selectedCrop.availableQuantity}
                  value={selectedQty}
                  onChange={(e) => setSelectedQty(Math.min(selectedCrop.availableQuantity, Math.max(1, Number(e.target.value))))}
                  style={{
                    width: '100px',
                    textAlign: 'center',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    border: '1px solid var(--border-2)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '6px',
                    color: 'var(--green-700)',
                  }}
                />
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Kilograms (kg)</div>
              </div>

              <button
                onClick={() => setSelectedQty(Math.min(selectedCrop.availableQuantity, selectedQty + 5))}
                className="btn btn-ghost"
                style={{ width: '42px', height: '42px', padding: 0, borderRadius: '50%' }}
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Total Price Calculation */}
            <div style={{ textAlign: 'center', padding: '12px', borderTop: '1px solid var(--border)', margin: '16px 0' }}>
              <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Calculated Total: </span>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--green-700)' }}>
                ₹{selectedQty * selectedCrop.pricePerKg}
              </span>
              <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                🛡️ Placing item in cart triggers a 10-minute atomic hold on inventory.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setSelectedCrop(null)} className="btn btn-ghost" style={{ flex: 1 }}>
                Cancel
              </button>
              <button onClick={handleAddToCartConfirm} className="btn btn-primary" style={{ flex: 2 }}>
                <ShoppingCart size={16} /> Add to Cart ({selectedQty} kg)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART & CHECKOUT MODAL */}
      {effectiveCartOpen && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '560px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingCart size={20} color="var(--green-600)" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)' }}>Your Farm Basket</h3>
              </div>
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  if (onCloseCart) onCloseCart();
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                <p style={{ color: 'var(--muted)' }}>Your cart is empty.</p>
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    if (onCloseCart) onCloseCart();
                  }}
                  className="btn btn-primary"
                  style={{ marginTop: '16px' }}
                >
                  Browse Marketplace
                </button>
              </div>
            ) : (
              <div>
                {/* Cart Line Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto', marginBottom: '16px' }}>
                  {cart.map((item) => (
                    <div
                      key={item.listingId}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 12px',
                        background: 'var(--bg-surface-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13.5px' }}>{item.cropName}</div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                          {item.quantity} kg × ₹{item.pricePerKg} • {item.farmerName}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontWeight: 700, color: 'var(--green-700)', fontSize: '14px' }}>
                          ₹{item.cropValue}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.listingId)}
                          style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '2px' }}
                          title="Remove"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery & Payment Form */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '6px' }}>
                    Delivery Address (Doorstep)
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="input-control"
                    style={{ marginBottom: '12px' }}
                  />

                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: '6px' }}>
                    Payment Mode
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    {(['UPI', 'COD', 'Demo Payment'] as const).map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        type="button"
                        style={{
                          padding: '8px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          border: `1.5px solid ${paymentMethod === method ? 'var(--green-600)' : 'var(--border-2)'}`,
                          background: paymentMethod === method ? 'var(--green-50)' : '#fff',
                          color: paymentMethod === method ? 'var(--green-700)' : 'var(--ink-2)',
                        }}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div style={{ background: 'var(--green-50)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--green-100)', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--muted)' }}>Produce Subtotal</span>
                    <span>₹{cartTotalCropValue}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--muted)' }}>Cold Logistics & Farm Pickup</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px', fontWeight: 700, color: 'var(--green-700)', borderTop: '1px dashed var(--green-100)', paddingTop: '6px', marginTop: '6px' }}>
                    <span>Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setCartDrawerOpen(false);
                      if (onCloseCart) onCloseCart();
                    }}
                    className="btn btn-ghost"
                    style={{ flex: 1 }}
                  >
                    Continue Browsing
                  </button>
                  <button onClick={handlePlaceOrderSubmit} className="btn btn-primary" style={{ flex: 2 }}>
                    Confirm & Place Order (₹{grandTotal})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3-WAY RATING & REVIEW MODAL */}
      {reviewOrder && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
              Rate Order #{reviewOrder.orderId}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '18px' }}>
              Your feedback is verified and rewards farmers directly while optimizing logistics routes.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '18px' }}>
              {/* Farmer Rating */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Farmer & Harvest Authenticity</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFarmerRating(s)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: s <= farmerRating ? '#F59E0B' : '#D1D5DB' }}
                    >
                      <Star size={20} fill={s <= farmerRating ? '#F59E0B' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Crop Quality Rating */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Crop Freshness & Grade</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setCropRating(s)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: s <= cropRating ? '#F59E0B' : '#D1D5DB' }}
                    >
                      <Star size={20} fill={s <= cropRating ? '#F59E0B' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Rating */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Transporter Speed & Handling</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setDeliveryRating(s)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: s <= deliveryRating ? '#F59E0B' : '#D1D5DB' }}
                    >
                      <Star size={20} fill={s <= deliveryRating ? '#F59E0B' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="Share additional details about taste, quality, packaging..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="input-control"
                rows={3}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setReviewOrder(null)} className="btn btn-ghost" style={{ flex: 1 }}>
                Cancel
              </button>
              <button onClick={handleSubmitReviewForm} className="btn btn-primary" style={{ flex: 1 }}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
