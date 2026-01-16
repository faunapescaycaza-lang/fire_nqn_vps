'use client';

import { useState } from 'react';
import { createIncident, updateIncident } from '@/app/actions';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import type { Incident, Image } from '@prisma/client';
import ImageUploader from './ImageUploader'; // Importamos el nuevo componente

// Importar mapa dinámicamente
const LocationPicker = dynamic(() => import('./LocationPicker'), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-slate-800 animate-pulse rounded-xl"></div>
});

interface IncidentFormProps {
  incident?: Incident & { images: Image[] }; // Aseguramos que images esté disponible
}

export default function IncidentForm({ incident }: IncidentFormProps) {
  const router = useRouter();
  const [lat, setLat] = useState<number | null>(incident?.latitude || null);
  const [lng, setLng] = useState<number | null>(incident?.longitude || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]); // Nuevo estado para los archivos
  const isEditMode = incident !== undefined;

  async function handleSubmit(formData: FormData) {
    if (!lat || !lng) {
      alert('Por favor selecciona una ubicación en el mapa.');
      return;
    }
    
    setIsSubmitting(true);
    formData.set('latitude', lat.toString());
    formData.set('longitude', lng.toString());
    
    // Adjuntar los archivos del nuevo estado
    filesToUpload.forEach(file => {
      formData.append('media', file);
    });

    try {
      if (isEditMode) {
        await updateIncident(incident.id, formData);
      } else {
        await createIncident(formData);
      }
      router.push('/');
    } catch (e) {
      console.error(e); // Mejor loguear el error real
      alert(isEditMode ? 'Error al actualizar' : 'Error al publicar');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="glass-panel p-8 space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span>🔥</span> {isEditMode ? 'Editar Reporte de Incendio' : 'Nuevo Reporte de Incendio'}
      </h2>
      
      {/* ... (resto de los inputs como título, fecha, etc. No cambian) ... */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Título del Reporte</label>
        <input 
          name="title" 
          required 
          defaultValue={incident?.title}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white"
          placeholder="Ej: Incendio en Lago Hermoso"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Fecha del Evento</label>
            <input 
              type="date"
              name="date" 
              required 
              defaultValue={incident?.date ? new Date(incident.date).toISOString().split('T')[0] : ''}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white"
            />
        </div>
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Ubicación (Nombre)</label>
            <input 
              name="locationName" 
              required 
              defaultValue={incident?.locationName}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white"
              placeholder="Ej: Frente Aeropuerto Chapelco"
            />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Descripción Detallada</label>
        <textarea 
          name="description" 
          required 
          rows={4}
          defaultValue={incident?.description}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white"
          placeholder="Detalles sobre el incendio, vegetación afectada, estado..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
            <span>🗺️</span> Código o Link del Mapa de Google
        </label>
        <input 
          name="googleMapUrl" 
          defaultValue={incident?.googleMapUrl || ''}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white"
          placeholder='<iframe src="https://..." ...></iframe>'
        />
        <p className="text-xs text-slate-500">Puedes pegar el código completo del iframe o solo la URL.</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
            <span>📷</span> Adjuntar Fotos y Videos
        </label>
        <ImageUploader 
          onFilesChange={setFilesToUpload}
          initialImageUrls={isEditMode ? incident.images.map(img => img.url) : []}
        />
        <p className="text-xs text-slate-500 mt-2">
            {isEditMode ? "Si subes nuevos archivos, se reemplazarán los anteriores." : "Puedes arrastrar y soltar múltiples imágenes o videos."}
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Ubicación en Mapa (Click para seleccionar)</label>
        <div className="rounded-xl overflow-hidden border border-slate-700">
          <LocationPicker 
            onLocationSelect={(lat, lng) => {
              setLat(lat);
              setLng(lng);
            }} 
            initialPosition={isEditMode ? { lat, lng } : undefined}
          />
        </div>
        {lat && <p className="text-xs text-green-400">Coordenadas: {lat.toFixed(4)}, {lng?.toFixed(4)}</p>}
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? (isEditMode ? 'Guardando...' : 'Publicando...') : (isEditMode ? 'Guardar Cambios' : 'Publicar Reporte')}
      </button>
    </form>
  );
}