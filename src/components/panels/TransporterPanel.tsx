'use client';

import React, { useState } from 'react';
import { useFarmConnect } from '@/context/FarmConnectContext';
import { Truck, Navigation, CheckCircle2, MapPin, Package, ShieldCheck, ArrowRight } from 'lucide-react';

export const TransporterPanel: React.FC = () => {
  const { tasks, updateOrderStatus } = useFarmConnect();
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  const activeTask = tasks[activeTaskIndex] || null;

  const handleMarkPickedUp = (orderId: string) => {
    updateOrderStatus(orderId, 'PICKED_UP');
    alert(`Order #${orderId} picked up from farm! Transporter status updated.`);
  };

  const handleMarkOutForDelivery = (orderId: string) => {
    updateOrderStatus(orderId, 'AT_HUB');
    alert(`Order #${orderId} delivered to regional cold aggregation hub.`);
  };

  const handleConfirmDelivery = (orderId: string) => {
    updateOrderStatus(orderId, 'DELIVERED');
    alert(`Order #${orderId} successfully delivered! Instant escrow settlement released.`);
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)' }}>Logistics & Dispatch</h2>
            <span className="badge badge-green">VRP Route Engine</span>
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '4px' }}>
            First-mile farm collection, waypoint routing, and proof-of-delivery handover.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-green" style={{ padding: '6px 12px', fontSize: '12px' }}>
            🚚 Driver: Raj Logistics (Active)
          </span>
        </div>
      </div>

      {/* Driver Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>Assigned Farm Pickups</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--ink)', marginTop: '6px' }}>
            {tasks.length}
          </div>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>Optimized Route Distance</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--green-700)', marginTop: '6px' }}>
            42.8 km
          </div>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>Estimated Driver Earnings</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)', marginTop: '6px' }}>
            ₹480
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px' }}>
        {/* Task List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>Assigned Itinerary</h3>

          {tasks.map((task, idx) => {
            const isSelected = activeTaskIndex === idx;

            return (
              <div
                key={task.id}
                onClick={() => setActiveTaskIndex(idx)}
                className="card"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--green-600)' : 'var(--border)',
                  background: isSelected ? 'var(--green-50)' : '#fff',
                  transition: 'all .16s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <code style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--green-700)', fontSize: '13px' }}>
                    {task.orderId}
                  </code>
                  <span className="badge badge-green">{task.status}</span>
                </div>

                <div style={{ fontWeight: 700, fontSize: '14px', marginTop: '6px', color: 'var(--ink)' }}>
                  {task.cropName} ({task.quantity} kg)
                </div>

                <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} color="var(--accent)" />
                    <span><b>Pickup:</b> {task.pickupLocation}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Navigation size={13} color="var(--green-600)" />
                    <span><b>Drop:</b> {task.deliveryLocation}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Task Details & Action Stepper */}
        {activeTask && (
          <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>Job #{activeTask.orderId}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>Assigned to vehicle: AP-09-TG-4421</p>
                </div>
                <span className="badge badge-green">{activeTask.status}</span>
              </div>

              <div style={{ padding: '14px', background: 'var(--green-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--green-100)', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-2)' }}>Cargo Specification:</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--green-700)', marginTop: '4px' }}>
                  {activeTask.quantity} kg • {activeTask.cropName}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px' }}>
                  <b>Cold Chain Requirement:</b> Ambient ventilated crates / 18-22°C.
                </div>
              </div>

              {/* Waypoints */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'grid', placeItems: 'center', fontSize: '11px', fontWeight: 700 }}>
                    1
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Farm Gate Collection</div>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)' }}>{activeTask.pickupLocation}</div>
                  </div>
                </div>

                <div style={{ marginLeft: '11px', borderLeft: '2px dashed var(--border-2)', height: '16px' }} />

                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--green-100)', color: 'var(--green-700)', display: 'grid', placeItems: 'center', fontSize: '11px', fontWeight: 700 }}>
                    2
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>End Handover Point</div>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)' }}>{activeTask.deliveryLocation}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Actions */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', marginBottom: '4px' }}>
                Dispatch Progression:
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={() => handleMarkPickedUp(activeTask.orderId)}
                  className="btn btn-ghost"
                  style={{ border: '1px solid var(--border-2)', fontSize: '12.5px' }}
                >
                  Confirm Farm Pickup
                </button>
                <button
                  onClick={() => handleMarkOutForDelivery(activeTask.orderId)}
                  className="btn btn-ghost"
                  style={{ border: '1px solid var(--border-2)', fontSize: '12.5px' }}
                >
                  Arrived at Hub
                </button>
              </div>

              <button
                onClick={() => handleConfirmDelivery(activeTask.orderId)}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '4px' }}
              >
                <CheckCircle2 size={16} /> Confirm Proof of Delivery (POD)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
