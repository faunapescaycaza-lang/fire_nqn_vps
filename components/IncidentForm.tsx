'use client';

import { useState } from 'react';
import { createIncident } from '@/app/actions';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Importar mapa dinámicamente
const LocationPicker = dynamic(() => import('./LocationPicker'), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-slate-800 animate-pulse rounded-xl"></div>
});

export default function IncidentForm() {
  const router = useRouter();
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (lat && lng) {
      setIsSubmitting(true);
      formData.set('latitude', lat.toString());
      formData.set('longitude', lng.toString());
      
      try {
        await createIncident(formData);
        router.push('/');
      } catch (e) {
        alert('Error al publicar');
        setIsSubmitting(false);
      }
    } else {
      alert('Por favor selecciona una ubicación en el mapa.');
    }
  }

  return (
    <form action={handleSubmit} className="glass-panel p-8 space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span>🔥</span> Nuevo Reporte de Incendio
      </h2>
      
      {/* Título */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Título del Reporte</label>
        <input 
          name="title" 
          required 
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white"
          placeholder="Ej: Incendio en Lago Hermoso"
        />
      </div>

      {/* Fecha y Ubicación (Nombre) en la misma fila */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Fecha del Evento</label>
            <input 
            type="date"
            name="date" 
            required 
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white"
            />
        </div>
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Ubicación (Nombre)</label>
            <input 
            name="locationName" 
            required 
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white"
            placeholder="Ej: Frente Aeropuerto Chapelco"
            />
        </div>
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Descripción Detallada</label>
        <textarea 
          name="description" 
          required 
          rows={4}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white"
          placeholder="Detalles sobre el incendio, vegetación afectada, estado..."
        />
      </div>

      {/* URL Mapa Google */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
            <span>🗺️</span> Código o Link del Mapa de Google
        </label>
        <input 
          name="googleMapUrl" 
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white"
          placeholder='<iframe src="https://..." ...></iframe>'
        />
        <p className="text-xs text-slate-500">Puedes pegar el código completo del iframe o solo la URL.</p>
      </div>

      {/* Subida de Archivos */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
            <span>📷</span> Adjuntar Fotos y Videos
        </label>
        <div className="relative border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
            <input 
                type="file" 
                name="media" 
                multiple 
                accept="image/*,video/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-slate-400">
                <p>Arrastra archivos aquí o haz clic</p>
                <p className="text-xs mt-1">Soporta JPG, PNG, MP4</p>
            </div>
        </div>
      </div>

      {/* Mapa Picker */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Ubicación en Mapa (Click para seleccionar)</label>
        <div className="rounded-xl overflow-hidden border border-slate-700">
          <LocationPicker onLocationSelect={(lat: number, lng: number) => {
            setLat(lat);
            setLng(lng);
          }} />
        </div>
        {lat && <p className="text-xs text-green-400">Coordenadas: {lat.toFixed(4)}, {lng.toFixed(4)}</p>}
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Publicando...' : 'Publicar Reporte'}
      </button>
    </form>
  );
}