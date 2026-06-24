import { useRef, useEffect } from 'react'

const CLASS_COLORS = {
  Primera: '#52b788',
  Segunda: '#ffd166',
  Tercera: '#ef476f',
}

export default function ResultCanvas({ imageUrl, detections }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !imageUrl) return
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const maxW = 800
      const scale = Math.min(1, maxW / img.width)
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      detections.forEach((det) => {
        const [x1, y1, x2, y2] = det.bbox.map((v) => v * scale)
        const w = x2 - x1
        const h = y2 - y1
        const color = CLASS_COLORS[det.class] || '#ffffff'

        ctx.strokeStyle = color
        ctx.lineWidth = 3
        ctx.strokeRect(x1, y1, w, h)

        ctx.fillStyle = color
        ctx.font = 'bold 14px Inter, sans-serif'
        const label = `${det.class} ${(det.confidence * 100).toFixed(1)}%`
        const tw = ctx.measureText(label).width
        ctx.fillRect(x1, y1 - 28, tw + 16, 28)
        ctx.fillStyle = '#0a0f1e'
        ctx.fillText(label, x1 + 8, y1 - 8)
      })
    }
    img.src = imageUrl
  }, [imageUrl, detections])

  if (!imageUrl) return null

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-auto" />
    </div>
  )
}
