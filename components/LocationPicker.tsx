"use client";
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix icons de Leaflet en Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ onSelect, initialPosition }: { onSelect: (lat: number, lng: number) => void, initialPosition?: { lat: number, lng: number } }) {
  const [position, setPosition] = useState<L.LatLng | null>(initialPosition ? L.latLng(initialPosition.lat, initialPosition.lng) : null);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  useEffect(() => {
    if (initialPosition?.lat && initialPosition.lng) {
      map.setView([initialPosition.lat, initialPosition.lng], map.getZoom());
    }
  }, [initialPosition, map]);

  return position ? <Marker position={position} icon={icon} /> : null;
}

export default function LocationPicker({ onLocationSelect, initialPosition }: { onLocationSelect: (lat: number, lng: number) => void, initialPosition?: { lat: any, lng: any }}) {
  const centerLat = initialPosition?.lat || -39.8142;
  const centerLng = initialPosition?.lng || -71.4279;

  return (
    <MapContainer center={[centerLat, centerLng]} zoom={9} style={{ height: '300px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker onSelect={onLocationSelect} initialPosition={initialPosition} />
    </MapContainer>
  );
}
