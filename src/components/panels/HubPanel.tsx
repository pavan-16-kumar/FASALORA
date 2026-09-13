'use client';

import React, { useState } from 'react';
import { useFarmConnect } from '@/context/FarmConnectContext';
import { Building2, PackageCheck, Truck, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

export const HubPanel: React.FC = () => {
  const { orders } = useFarmConnect();

  const incomingShipments = [
    { id: 'SHIP-101', farmer: 'Ramesh Kumar (FC-TG-MDL-26-000184)', crop: 'Tomato', qty: '100 kg', grade: 'Grade A', status: 'RECEIVED_AT_HUB' },
    { id: 'SHIP-102', farmer: 'Venkatesh Rao (FC-TG-MDL-26-000215)', crop: 'Tomato', qty: '150 kg', grade: 'Grade A', status: 'RECEIVED_AT_HUB' },
    { id: 'SHIP-103', farmer: 'Suresh Patel (FC-TG-MDL-26-000301)', crop: 'Tomato', qty: '80 kg', grade: 'Grade B', status: 'IN_SORTING' }
  ];

  const dispatchQueues = [
    {
      truckId: 'TRK-HYD-09',
      destination: 'Hyderabad Central Market',
      aggregatedQty: '330 kg',
      farmsIncluded: 3,
      capacityUsed: '66%',
      status: 'READY_FOR_DISPATCH'
    }
  ];

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)' }}>Collection & Aggregation Hub</h2>
            <span className="badge badge-green">Regional Depot</span>
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '4px' }}>
            Consolidating small village farm outputs into multi-farm cold truckloads for long-haul city transit.
          </p>
        </div>

        <span className="badge badge-green" style={{ padding: '6px 12px', fontSize: '12px' }}>
          Hub ID: HUB-MEDCHAL-01
        </span>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>Today's Intake</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--ink)', marginTop: '6px' }}>
            330 kg
          </div>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>Sorting Accuracy</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--green-700)', marginTop: '6px' }}>
            98.4%
          </div>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>City Trucks Loaded</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)', marginTop: '6px' }}>
            2 Trucks
          </div>
        </div>
      </div>

      {/* Aggregation Flow Visual */}
      <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '14px' }}>
          Multi-Farm Batch Aggregation Flow
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', background: 'var(--green-50)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--green-100)', fontSize: '13px' }}>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--green-700)' }}>Farmer A (100kg)</span> + 
            <span style={{ fontWeight: 700, color: 'var(--green-700)', marginLeft: '6px' }}>Farmer B (150kg)</span> + 
            <span style={{ fontWeight: 700, color: 'var(--green-700)', marginLeft: '6px' }}>Farmer C (80kg)</span>
          </div>

          <ArrowRight size={18} color="var(--green-600)" />

          <div style={{ background: '#fff', border: '1px solid var(--green-100)', padding: '6px 14px', borderRadius: '8px', fontWeight: 700, color: 'var(--green-700)' }}>
            Depot Grading & Palletizing (330 kg)
          </div>

          <ArrowRight size={18} color="var(--green-600)" />

          <div style={{ background: 'var(--accent-light)', border: '1px solid #FDE68A', padding: '6px 14px', borderRadius: '8px', fontWeight: 700, color: '#92400E' }}>
            1 Consolidated City Truckload
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px' }}>
        {/* Intake Queue */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <PackageCheck size={18} color="var(--green-600)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>Intake & Sorting Queue</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {incomingShipments.map((ship) => (
              <div key={ship.id} style={{ padding: '12px', background: 'var(--bg-surface-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <code style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--green-700)', fontSize: '12px' }}>
                    {ship.id}
                  </code>
                  <span className="badge badge-green">{ship.grade}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '13.5px', marginTop: '4px' }}>
                  {ship.crop} ({ship.qty})
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginTop: '2px' }}>
                  {ship.farmer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Long-Haul Dispatch */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <Truck size={18} color="var(--accent)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>Consolidated City Dispatches</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {dispatchQueues.map((q) => (
              <div key={q.truckId} style={{ padding: '14px', background: 'var(--green-50)', border: '1px solid var(--green-100)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--green-700)' }}>{q.truckId}</span>
                  <span className="badge badge-amber">{q.status}</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '6px' }}>
                  Destination: {q.destination}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                  Payload: <b>{q.aggregatedQty}</b> ({q.farmsIncluded} farms combined) • Capacity: {q.capacityUsed}
                </div>
                <button
                  onClick={() => alert(`Consolidated Truck ${q.truckId} departed for ${q.destination}!`)}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '12px', fontSize: '12.5px', padding: '8px' }}
                >
                  Authorize Truck Departure
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
