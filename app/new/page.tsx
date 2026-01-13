import IncidentForm from '@/components/IncidentForm';
import Link from 'next/link';

export default function NewIncidentPage() {
  return (
    <main className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-slate-400 hover:text-white mb-8 inline-block transition-colors">
          ← Volver al mapa
        </Link>
        <IncidentForm />
      </div>
    </main>
  );
}
