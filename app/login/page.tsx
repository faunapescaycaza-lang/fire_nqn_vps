'use client';

import { login } from '@/app/auth';
import { useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState('');

  async function handleSubmit(formData: FormData) {
    const res = await login(formData);
    if (res?.error) {
      setError(res.error);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
          Acceso Administrador
        </h1>
        
        <form action={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Contraseña</label>
            <input 
              type="password" 
              name="password"
              required 
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white"
              placeholder="Ingrese la clave..."
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
}
