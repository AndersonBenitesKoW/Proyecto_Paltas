import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCpu, FiGrid, FiImage, FiCamera, FiUpload } from 'react-icons/fi'
import { getModelInfo } from '../api/avocadoApi'
import StatsCard from '../components/Dashboard/StatsCard'

export default function DashboardPage() {
  const [modelInfo, setModelInfo] = useState(null)

  useEffect(() => {
    getModelInfo().then(setModelInfo).catch(() => {})
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-white">
          Avocado <span className="text-avocado-400">Pro</span>
        </h1>
        <p className="text-white/40 mt-2">Sistema de clasificación de calibre de paltas con IA</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Modelo"
          value={modelInfo?.model || 'YOLOv11'}
          subtitle="Detección de objetos"
          color="#52b788"
          delay={0}
        />
        <StatsCard
          title="Clases"
          value={modelInfo?.classes?.length || 3}
          subtitle="Primera, Segunda, Tercera"
          color="#ffd166"
          delay={0.1}
        />
        <StatsCard
          title="Modos"
          value="3"
          subtitle="Dataset, Cámara, Upload"
          color="#52b788"
          delay={0.2}
        />
        <StatsCard
          title="Estado"
          value="Online"
          subtitle="Listo para predecir"
          color="#52b788"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card space-y-4"
        >
          <h2 className="text-xl font-semibold text-white">Bienvenido</h2>
          <p className="text-white/50 leading-relaxed">
            Este sistema utiliza un modelo <strong className="text-white/80">YOLOv11</strong> entrenado 
            para detectar y clasificar paltas por calibre en tres categorías:
          </p>
          <div className="flex gap-4 flex-wrap">
            {[
              { label: 'Primera', color: '#52b788' },
              { label: 'Segunda', color: '#ffd166' },
              { label: 'Tercera', color: '#ef476f' },
            ].map((c) => (
              <span
                key={c.label}
                className="px-3 py-1.5 rounded-lg text-sm font-medium"
                style={{
                  background: `${c.color}20`,
                  color: c.color,
                  border: `1px solid ${c.color}30`,
                }}
              >
                {c.label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card space-y-4"
        >
          <h2 className="text-xl font-semibold text-white">Acceso Rápido</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: FiImage, label: 'Test Dataset', desc: 'Prueba con imagenes del dataset', to: '/dataset' },
              { icon: FiCamera, label: 'Camara', desc: 'Clasifica en tiempo real', to: '/camera' },
              { icon: FiUpload, label: 'Subir Imagen', desc: 'Analiza tus propias fotos', to: '/upload' },
              { icon: FiGrid, label: 'Resultados', desc: 'Mira las estadisticas', to: '/dataset' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.to}
                className="glass rounded-xl p-4 hover:border-avocado-500/30 transition-all group"
              >
                <item.icon className="text-2xl text-avocado-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-white/30 mt-1">{item.desc}</p>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
