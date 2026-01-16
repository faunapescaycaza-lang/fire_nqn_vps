import Link from 'next/link';
import { getIncidents } from './actions';
import { checkAuth, logout } from './auth';
import GlassCard from '@/components/GlassCard';
import DeleteButton from '@/components/DeleteButton';
import EditButton from '@/components/EditButton';

export default async function Home() {
  const incidents = await getIncidents();
  const isAdmin = await checkAuth();

  return (
    <main className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
              Fire Plataforma NQN
            </h1>
            <p className="text-slate-400 mt-2">Monitoreo de Incendios Forestales 2025-2026</p>
          </div>
          
          <div className="flex gap-4 items-center">
            {isAdmin ? (
                <>
                  <form action={logout}>
                    <button className="text-slate-400 hover:text-white text-sm">Salir</button>
                  </form>
                  <Link 
                    href="/new"
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-orange-500/20 flex items-center gap-2"
                  >
                    <span>+</span> Reportar
                  </Link>
                </>
            ) : (
                <Link href="/login" className="text-slate-500 hover:text-orange-500 transition-colors">
                    Admin
                </Link>
            )}
          </div>
        </div>

        {/* Mapa General Original */}
        <div className="glass-panel overflow-hidden mb-12 h-[500px] border border-slate-700 shadow-2xl">
          <iframe 
            src="https://www.google.com/maps/d/embed?mid=1O9I3XXMJW_iPBP6LUd85RoYDOM5swTw&ehbc=2E312F" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }}
          ></iframe>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {incidents.map((incident) => (
            <div key={incident.id} className="relative group">
                {isAdmin && (
                  <>
                    <DeleteButton id={incident.id} />
                    <EditButton id={incident.id} />
                  </>
                )}
                <Link href={`/incident/${incident.id}`}>
                <GlassCard 
                    title={incident.title}
                    description={incident.description}
                    imageUrl={incident.images[0]?.url || '/placeholder.png'}
                    date={incident.date}
                />
                </Link>
            </div>
          ))}
        </div>

        {incidents.length === 0 && (
          <div className="text-center py-20 glass-panel">
            <h2 className="text-2xl font-semibold text-slate-300">No hay incendios reportados</h2>
            <p className="text-slate-500 mt-2">Sé el primero en reportar uno.</p>
          </div>
        )}
      </div>
    </main>
  );
}
