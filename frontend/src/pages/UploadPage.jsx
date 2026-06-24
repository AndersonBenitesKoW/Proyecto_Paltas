import { useState, useCallback } from "react"
import { usePrediction } from "../hooks/usePrediction"
import DropZone from "../components/Upload/DropZone"
import ResultCanvas from "../components/Prediction/ResultCanvas"
import StatsPanel from "../components/Prediction/StatsPanel"

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const { loading, result, predict, reset } = usePrediction()

  const handleFile = useCallback(
    (f) => {
      reset()
      setFile(f)
      setPreview(URL.createObjectURL(f))
      predict(f)
    },
    [predict, reset]
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Subir Imagen</h1>
        <p className="text-white/40 mt-1">
          Arrastra o selecciona una imagen de paltas para clasificarlas
        </p>
      </div>

      <DropZone onFile={handleFile} loading={loading} />

      {loading && (
        <div className="card text-center py-8">
          <div className="w-10 h-10 border-2 border-avocado-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Analizando imagen...</p>
        </div>
      )}

      {result && preview && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
          <div className="lg:col-span-2">
            <ResultCanvas imageUrl={preview} detections={result.detections} />
          </div>
          <div>
            <StatsPanel stats={result.stats} />
          </div>
        </div>
      )}
    </div>
  )
}
