import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LazyMap from '@/components/LazyMap';
import ImageGallery from '@/components/ImageGallery';

const prisma = new PrismaClient();

export default async function IncidentDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const incident = await prisma.incident.findUnique({
    where: { id: parseInt(id) },
    include: {
      images: true
    }
  });

  if (!incident) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8 sm:p-20">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-slate-400 hover:text-white mb-8 inline-block transition-colors">
          ← Volver al listado
        </Link>

        <div className="glass-panel overflow-hidden mb-8">
          <div className="relative h-[50vh] w-full">
            <img 
              src={incident.images[0]?.url || '/placeholder.png'} 
              alt={incident.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{incident.title}</h1>
              <p className="text-orange-400 font-medium text-lg">{incident.locationName}</p>
              <p className="text-slate-300 text-sm mt-1">
                {new Date(incident.date).toLocaleDateString('es-AR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          <div className="p-8">
            <div className="prose prose-invert max-w-none mb-10">
              <p className="text-slate-200 text-lg leading-relaxed">
                {incident.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mapa */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span>📍</span> Ubicación
                  </h3>
                  <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl h-[300px]">
                    {incident.googleMapUrl ? (
                      <iframe 
                        src={incident.googleMapUrl} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }}
                        loading="lazy"
                      ></iframe>
                    ) : (
                      <LazyMap 
                        lat={incident.latitude} 
                        lng={incident.longitude} 
                        title={incident.title} 
                      />
                    )}
                  </div>
                </div>

                {/* Galería */}
                <div className="space-y-4">
                   <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span>📷</span> Galería de Imágenes
                  </h3>
                   <ImageGallery images={incident.images} />
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
