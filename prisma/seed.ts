import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasourceUrl: "file:./dev.db"
})

async function main() {
  const incidents = [
    {
      title: 'Incendios 26/11/2025',
      description: 'Reporte inicial de focos de incendio en la zona.',
      locationName: 'San Martín de los Andes',
      latitude: -39.8142,
      longitude: -71.4279,
      date: new Date('2025-11-26'),
      googleMapUrl: 'https://www.google.com/maps/d/embed?mid=1O9I3XXMJW_iPBP6LUd85RoYDOM5swTw&ehbc=2E312F',
      images: [
        '/Imagenes_26_11_2025/55bd8871-8f9b-48c2-9aa5-a71651f6423b.jpg',
        '/Imagenes_26_11_2025/6ba30875-6fb6-487b-b8af-5bc9afc9c66b.jpg',
        '/Imagenes_26_11_2025/78a32b75-21d9-44c4-a4a1-7d137ac4e8cf (1).jpg',
        '/Imagenes_26_11_2025/78a32b75-21d9-44c4-a4a1-7d137ac4e8cf.jpg',
        '/Imagenes_26_11_2025/9fd816fd-c9e5-416c-b27c-06e7fad304cd.jpg',
        '/Imagenes_26_11_2025/a4451b89-1241-4d24-944d-0d47d6101974.jpg',
        '/Imagenes_26_11_2025/a559292a-4dec-48d9-8d30-33cf9f79395f.jpg',
        '/Imagenes_26_11_2025/ac597cfc-acb7-4877-9caa-34b7c462123a.jpg',
        '/Imagenes_26_11_2025/cd40c639-6e50-4893-bcea-da9219b8de0c.jpg',
        '/Imagenes_26_11_2025/Reporte 28_11_25 12_00 hs.png'
      ]
    },
    {
      title: 'Incendios 28/11/2025',
      description: 'Continuación de los focos ígneos observados. Incluye reportes de viento.',
      locationName: 'San Martín de los Andes',
      latitude: -39.8200,
      longitude: -71.4300,
      date: new Date('2025-11-28'),
      googleMapUrl: 'https://www.google.com/maps/d/embed?mid=1O9I3XXMJW_iPBP6LUd85RoYDOM5swTw&ehbc=2E312F',
      images: [
        '/fire_28_11/Captura de pantalla 2025-11-28 092525.png',
        '/fire_28_11/Captura de pantalla 2025-11-28 092551.png',
        '/fire_28_11/Captura de pantalla 2025-11-28 092601.png',
        '/fire_28_11/Captura de pantalla 2025-11-28 092738.png',
        '/fire_28_11/Captura de pantalla 2025-11-28 092752.png',
        '/fire_28_11/Captura de pantalla 2025-11-28 092808.png',
        '/videos/Grabación de pantalla 2025-11-28 093514.mp4',
        '/videos/Grabación de pantalla 2025-11-28 093558.mp4'
      ]
    },
    {
      title: 'Frente Aeropuerto Chapelco',
      description: 'Incendio forestal afectando arbustos, pastizales y coirones.',
      locationName: 'Aeropuerto Chapelco',
      latitude: -40.0760,
      longitude: -71.1340,
      date: new Date('2025-12-07'),
      googleMapUrl: 'https://www.google.com/maps/d/embed?mid=1iG_oOaW4zHAyE1IIhZgoOX505jPvh4U&ehbc=2E312F',
      images: [
        '/Fire_07_12_2025/Captura de pantalla 2025-12-08 123543.png',
        '/Fire_07_12_2025/Captura de pantalla 2025-12-08 123551.png',
        '/Fire_07_12_2025/Captura de pantalla 2025-12-08 123602.png',
        '/Fire_07_12_2025/Captura de pantalla 2025-12-08 123610.png',
        '/Fire_07_12_2025/Captura de pantalla 2025-12-08 123624.png',
        '/Fire_07_12_2025/Captura de pantalla 2025-12-08 123635.png',
        '/Fire_07_12_2025/Captura de pantalla 2025-12-08 123948.png',
        '/Fire_07_12_2025/Captura de pantalla 2025-12-08 124012.png',
        '/Fire_07_12_2025/Captura de pantalla 2025-12-08 124032.png',
        '/videos/Fire_nqn_27_11_09_30_am.mp4'
      ]
    },
    {
      title: 'Columna de Humo Huiliches',
      description: 'Jurisdicción Provincia. Tormenta Eléctrica.',
      locationName: 'Departamento Huiliches',
      latitude: -39.6380,
      longitude: -71.1820,
      date: new Date('2025-12-08'),
      googleMapUrl: 'https://www.google.com/maps/d/embed?mid=1ctKbLOYLyjo0lCkaeTEWuFCgLjuzZBQ&ehbc=2E312F',
      images: [
        '/Fire_08_12_2025/1.png',
        '/Fire_08_12_2025/2.png'
      ]
    },
    {
      title: 'Parte de Incendios 09/12/2025',
      description: 'Varios focos (Las Taguas, Villa Hermosa, Ruca Ñire) originados por descargas eléctricas.',
      locationName: 'Parque Nacional Lanín',
      latitude: -40.1500,
      longitude: -71.3500,
      date: new Date('2025-12-09'),
      googleMapUrl: 'https://www.google.com/maps/d/embed?mid=19nNKC_V9wUaf9g5VGhNxtVvp0a0OZ0M&ehbc=2E312F',
      images: [
        '/Fire_09_12_2025/Captura de pantalla 2025-12-10 125717.png',
        '/Fire_09_12_2025/Captura de pantalla 2025-12-10 125725.png',
        '/Fire_09_12_2025/WhatsApp Image 2025-12-09 at 4.31.53 PM.jpeg',
        '/Fire_09_12_2025/WhatsApp Video 2025-12-09 at 4.59.22 PM.mp4'
      ]
    },
    {
      title: 'Incendio Depto Huiliches',
      description: 'Foco activo en Departamento Huiliches.',
      locationName: 'Departamento Huiliches',
      latitude: -39.6500,
      longitude: -71.2000,
      date: new Date('2025-12-28'),
      googleMapUrl: 'https://www.google.com/maps/d/embed?mid=1oRs-sxW1zm4WPD0Iki-tWB7RpdNcJeE&ehbc=2E312F',
      images: [
        '/Fire_28_12_2025/WhatsApp Image 2025-12-28 at 9.01.26 PM.jpeg',
        '/Fire_28_12_2025/WhatsApp Image 2025-12-28 at 9.01.27 PM.jpeg',
        '/Fire_28_12_2025/Grabación de pantalla 2025-12-28 185011.mp4',
        '/Fire_28_12_2025/Grabación de pantalla 2025-12-28 233226.mp4',
        '/Fire_28_12_2025/Grabación de pantalla 2025-12-28 233359.mp4',
        '/Fire_28_12_2025/WhatsApp Video 2025-12-28 at 9.01.26 PM.mp4',
        '/Fire_28_12_2025/WhatsApp Video 2025-12-28 at 9.36.21 PM.mp4'
      ]
    },
    {
      title: 'Incendio Lago Hermoso',
      description: 'Foco ígneo con riesgo de propagación en zona de interfase. Detenido.',
      locationName: 'Lago Hermoso',
      latitude: -40.3667,
      longitude: -71.4667,
      date: new Date('2026-01-04'),
      googleMapUrl: 'https://www.google.com/maps/d/embed?mid=1O9I3XXMJW_iPBP6LUd85RoYDOM5swTw&ehbc=2E312F',
      images: [
        '/FIre_04_01_2026/Captura de pantalla 2026-01-04 223010.png',
        '/FIre_04_01_2026/Captura de pantalla 2026-01-04 223016.png',
        '/FIre_04_01_2026/Captura de pantalla 2026-01-04 223029.png',
        '/FIre_04_01_2026/Captura de pantalla 2026-01-04 223034.png',
        '/FIre_04_01_2026/Grabación de pantalla 2026-01-04 163017.mp4',
        '/FIre_04_01_2026/Grabación de pantalla 2026-01-04 163433.mp4',
        '/FIre_04_01_2026/Grabación de pantalla 2026-01-04 164116.mp4'
      ]
    },
  ]

  for (const incident of incidents) {
    const { images, ...data } = incident;
    await prisma.incident.create({
      data: {
        ...data,
        images: {
          create: images.map(url => ({ url }))
        }
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
