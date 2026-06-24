import { useState, useCallback } from 'react'
import { usePrediction } from '../hooks/usePrediction'
import WebcamView from '../components/Camera/WebcamView'
import ResultCanvas from '../components/Prediction/ResultCanvas'
import StatsPanel from '../components/Prediction/StatsPanel'

export default function CameraPage() {
  const [capturedImage, setCapturedImage] = useState(null)
  const { loading, result, predict, error } = usePrediction()

  const handleCapture = useCallback(
    (imgSrc) => {
      setCapturedImage(imgSrc)
      predict(frameDataURLtoFile(imgSrc))
    },
    [predict]
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Camara</h1>
        <p className="text-white/40 mt-1">
          Captura una foto con tu camara para clasificar las paltas en tiempo real
        </p>
      </div>

      <WebcamView onCapture={handleCapture} loading={loading} />

      {error && (
        <div className="card text-center py-4 border-red-500/20">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {loading && (
        <div className="card text-center py-8">
          <div className="w-10 h-10 border-2 border-avocado-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Analizando imagen...</p>
        </div>
      )}

      {result && capturedImage && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
          <div className="lg:col-span-2">
            <ResultCanvas imageUrl={capturedImage} detections={result.detections} />
          </div>
          <div>
            <StatsPanel stats={result.stats} />
          </div>
        </div>
      )}
    </div>
  )
}

function frameDataURLtoFile(dataUrl) {
  const [header, data] = dataUrl.split(',')
  const mime = header.match(/:(.*?);/)[1]
  const byteString = atob(data)
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i)
  return new File([ab], 'capture.jpg', { type: mime })
}
