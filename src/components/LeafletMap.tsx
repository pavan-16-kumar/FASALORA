'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

// Fix leaflet marker icons
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ position, setPosition, interactive }: any) {
  const map = useMapEvents({
    click(e) {
      if (interactive) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      }
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position} icon={icon}></Marker>
  );
}

export default function LeafletMap({ lat, lng, interactive, onLocationSelect }: any) {
  const position = [lat, lng];
  
  return (
    <MapContainer center={position as any} zoom={14} style={{ height: '100%', width: '100%', zIndex: 0 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker 
        position={position} 
        interactive={interactive}
        setPosition={(pos: any) => {
          if (onLocationSelect) onLocationSelect(Number(pos.lat.toFixed(4)), Number(pos.lng.toFixed(4)));
        }} 
      />
    </MapContainer>
  );
}
