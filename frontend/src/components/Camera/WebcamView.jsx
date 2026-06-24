import { useRef, useCallback, useState } from 'react'
import Webcam from 'react-webcam'
import { FiCamera, FiRefreshCw } from 'react-icons/fi'

export default function WebcamView({ onCapture, loading }) {
  const webcamRef = useRef(null)
  const [facingMode, setFacingMode] = useState('environment')

  const capture = useCallback(() => {
    const imgSrc = webcamRef.current?.getScreenshot()
    if (imgSrc) onCapture(imgSrc)
  }, [onCapture])

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'))
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/50 aspect-video max-w-2xl mx-auto">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode, width: 1280, height: 720 }}
          className="w-full h-full object-cover"
          mirrored={facingMode === 'user'}
        />
        <div className="absolute inset-0 border-[3px] border-dashed border-avocado-500/30 rounded-xl pointer-events-none" />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={capture}
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          <FiCamera className="text-lg" />
          {loading ? 'Analizando...' : 'Capturar y Analizar'}
        </button>
        <button
          onClick={toggleCamera}
          className="px-4 py-3 rounded-xl glass text-white/70 hover:text-white transition-all"
          title="Cambiar cámara"
        >
          <FiRefreshCw className="text-lg" />
        </button>
      </div>
    </div>
  )
}
