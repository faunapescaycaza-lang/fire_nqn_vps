"use client";
import { useState } from 'react';

interface Image {
  id: number;
  url: string;
}

interface ImageGalleryProps {
  images: Image[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isVideo = (url: string) => url.toLowerCase().endsWith('.mp4');

  return (
    <>
      {/* Grilla de Miniaturas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img) => (
          <div 
            key={img.id} 
            onClick={() => setSelectedImage(img.url)}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-slate-700 relative group"
          >
            {isVideo(img.url) ? (
              <>
                <video 
                  src={img.url} 
                  className="w-full h-full object-cover" 
                  muted 
                  playsInline // Para móviles
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                   <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                       <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                     </svg>
                   </div>
                </div>
              </>
            ) : (
              <img src={img.url} alt="Evidencia" className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Botón Cerrar */}
          <button 
            className="absolute top-5 right-5 text-white/70 hover:text-white p-2 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {isVideo(selectedImage) ? (
            <video 
              src={selectedImage} 
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              controls 
              autoPlay 
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img 
              src={selectedImage} 
              alt="Vista ampliada" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          )}
        </div>
      )}
    </>
  );
}
