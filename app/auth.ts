'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const password = formData.get('password') as string
  
  // Clave harcodeada como pediste
  if (password === 'admin123') {
    // Guardar cookie de sesión
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'true', { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 // 24 horas
    })
    redirect('/')
  } else {
    // Si falla, no hacemos nada (el cliente manejará el error visualmente)
    return { error: 'Contraseña incorrecta' }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/')
}

export async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.has('admin_session')
}
