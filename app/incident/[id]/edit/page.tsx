import IncidentForm from '@/components/IncidentForm';
import { getIncidentById } from '@/app/actions';
import Link from 'next/link';
import BackButton from '@/components/BackButton'; // Asumiendo que tienes este componente

export default async function EditIncidentPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  if (isNaN(id)) {
    return (
      <main className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] text-center">
        <h1 className="text-2xl text-white">Incidente no válido</h1>
        <Link href="/" className="text-slate-400 hover:text-white mt-4 inline-block">
          Volver al mapa
        </Link>
      </main>
    );
  }

  const incident = await getIncidentById(id);

  if (!incident) {
    return (
      <main className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] text-center">
        <h1 className="text-2xl text-white">Incidente no encontrado</h1>
        <Link href="/" className="text-slate-400 hover:text-white mt-4 inline-block">
          Volver al mapa
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-start mb-8">
          <BackButton />
        </div>
        <IncidentForm incident={incident} />
      </div>
    </main>
  );
}