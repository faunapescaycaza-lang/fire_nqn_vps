"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface DetailMapProps {
  lat: number;
  lng: number;
  title: string;
}

export default function DetailMap({ lat, lng, title }: DetailMapProps) {
  return (
    <MapContainer 
      center={[lat, lng]} 
      zoom={13} 
      style={{ height: '400px', width: '100%', borderRadius: '1rem' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]} icon={icon}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
}
