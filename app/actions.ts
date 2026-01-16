'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { writeFile } from 'fs/promises'
import path from 'path'
import { cookies } from 'next/headers'

const prisma = new PrismaClient({
  datasourceUrl: "file:./dev.db"
})

export async function createIncident(formData: FormData) {
  // Verificar seguridad
  const cookieStore = await cookies()
  if (!cookieStore.has('admin_session')) {
    throw new Error('No autorizado')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const latitude = parseFloat(formData.get('latitude') as string)
  const longitude = parseFloat(formData.get('longitude') as string)
  const locationName = formData.get('locationName') as string
  let googleMapUrl = formData.get('googleMapUrl') as string
  const dateStr = formData.get('date') as string

  // Extraer el src si el usuario pegó el <iframe> completo
  if (googleMapUrl && googleMapUrl.includes('<iframe')) {
    const match = googleMapUrl.match(/src="([^"]+)"/);
    if (match && match[1]) {
      googleMapUrl = match[1];
    }
  }
  
  // Procesar Fecha
  const date = dateStr ? new Date(dateStr) : new Date()

  // Procesar Archivos (Fotos y Videos)
  const files = formData.getAll('media') as File[]
  const uploadedPaths: string[] = []

  for (const file of files) {
    if (file.size > 0) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Nombre único para evitar colisiones
      const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      const filePath = path.join(uploadDir, fileName)
      
      // Guardar archivo en disco
      await writeFile(filePath, buffer)
      uploadedPaths.push(`/uploads/${fileName}`)
    }
  }

  await prisma.incident.create({
    data: {
      title,
      description,
      latitude,
      longitude,
      locationName,
      googleMapUrl: googleMapUrl || null,
      date,
      images: {
        create: uploadedPaths.map(url => ({ url }))
      }
    },
  })

  revalidatePath('/')
}

export async function deleteIncident(id: number) {
  // Verificar seguridad
  const cookieStore = await cookies()
  if (!cookieStore.has('admin_session')) {
    throw new Error('No autorizado')
  }

  await prisma.incident.delete({
    where: { id }
  })
  
  revalidatePath('/')
}

export async function getIncidents() {
  return await prisma.incident.findMany({
    orderBy: {
      date: 'desc',
    },
    include: {
      images: true,
    },
  })
}

export async function getIncidentById(id: number) {
  return await prisma.incident.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });
}

export async function updateIncident(id: number, formData: FormData) {
    // Verificar seguridad
    const cookieStore = await cookies()
    if (!cookieStore.has('admin_session')) {
        throw new Error('No autorizado')
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const latitude = parseFloat(formData.get('latitude') as string)
    const longitude = parseFloat(formData.get('longitude') as string)
    const locationName = formData.get('locationName') as string
    let googleMapUrl = formData.get('googleMapUrl') as string
    const dateStr = formData.get('date') as string

    if (googleMapUrl && googleMapUrl.includes('<iframe')) {
        const match = googleMapUrl.match(/src="([^"]+)"/);
        if (match && match[1]) {
            googleMapUrl = match[1];
        }
    }

    const date = dateStr ? new Date(dateStr) : new Date()

    const files = formData.getAll('media') as File[]
    const uploadedPaths: string[] = []

    for (const file of files) {
        if (file.size > 0) {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`
            const uploadDir = path.join(process.cwd(), 'public', 'uploads')
            const filePath = path.join(uploadDir, fileName)
            await writeFile(filePath, buffer)
            uploadedPaths.push(`/uploads/${fileName}`)
        }
    }

    const data: any = {
        title,
        description,
        latitude,
        longitude,
        locationName,
        googleMapUrl: googleMapUrl || null,
        date,
    };

    if (uploadedPaths.length > 0) {
        // Primero, eliminar las imágenes antiguas para este incidente
        await prisma.image.deleteMany({
            where: { incidentId: id }
        });
        
        // Luego, crear las nuevas
        data.images = {
            create: uploadedPaths.map(url => ({ url }))
        };
    }

    await prisma.incident.update({
        where: { id },
        data,
    });

    revalidatePath('/')
    revalidatePath(`/incident/${id}`)
}
