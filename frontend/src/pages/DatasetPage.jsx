import { useState, useEffect, useCallback } from 'react'
import { getDatasetImages, getDatasetImageUrl } from '../api/avocadoApi'
import { usePrediction } from '../hooks/usePrediction'
import ImageGallery from '../components/Dataset/ImageGallery'
import ResultCanvas from '../components/Prediction/ResultCanvas'
import StatsPanel from '../components/Prediction/StatsPanel'

const FILTERS = ['all', 'Primera', 'Segunda', 'Tercera']

export default function DatasetPage() {
  const [images, setImages] = useState([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const { loading, result, predict, reset } = usePrediction()

  useEffect(() => {
    getDatasetImages('test').then((data) => setImages(data.images || [])).catch(() => {})
  }, [])

  const handleSelect = useCallback(
    (img) => {
      reset()
      setSelected(img)
      fetch(getDatasetImageUrl(img.split, img.filename))
        .then((r) => r.blob())
        .then((blob) => {
          const file = new File([blob], img.filename, { type: blob.type })
          predict(file)
        })
    },
    [predict, reset]
  )

  const filteredCount =
    filter === 'all' ? images.length : images.filter((i) => i.ground_truth === filter).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Test Dataset</h1>
        <p className="text-white/40 mt-1">
          Selecciona una imagen del dataset de validación para probar el modelo
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f
                ? 'bg-avocado-500/20 text-avocado-400 border border-avocado-500/30'
                : 'glass text-white/50 hover:text-white/70'
            }`}
          >
            {f === 'all' ? 'Todas' : f}
            {f !== 'all' && (
              <span className="ml-2 text-xs opacity-60">
                ({images.filter((i) => i.ground_truth === f).length})
              </span>
            )}
          </button>
        ))}
        <span className="text-xs text-white/30 ml-auto">{filteredCount} imágenes</span>
      </div>

      <ImageGallery images={images} filter={filter} selected={selected} onSelect={handleSelect} />

      {loading && (
        <div className="card text-center py-12">
          <div className="w-10 h-10 border-2 border-avocado-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Analizando imagen...</p>
        </div>
      )}

      {result && selected && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
          <div className="lg:col-span-2">
            <ResultCanvas
              imageUrl={getDatasetImageUrl(selected.split, selected.filename)}
              detections={result.detections}
            />
            {selected.ground_truth && (
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="text-white/40">Clase real:</span>
                <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-white/10 text-white/70 border border-white/10">
                  {selected.ground_truth}
                </span>
              </div>
            )}
          </div>
          <div>
            <StatsPanel stats={result.stats} />
          </div>
        </div>
      )}
    </div>
  )
}
