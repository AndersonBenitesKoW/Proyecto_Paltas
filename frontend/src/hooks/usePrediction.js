import { useState, useCallback } from 'react'
import { predictImage, predictFrame } from '../api/avocadoApi'

export function usePrediction() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const predict = useCallback(async (file) => {
    setLoading(true)
    setError(null)
    try {
      const data = await predictImage(file)
      setResult(data)
    } catch (e) {
      setError(e.message || 'Error en la predicción')
      setResult(null)
    }
    setLoading(false)
  }, [])

  const predictFromFrame = useCallback(async (base64) => {
    setLoading(true)
    setError(null)
    try {
      const data = await predictFrame(base64)
      setResult(data)
    } catch (e) {
      setError(e.message || 'Error en la predicción')
    }
    setLoading(false)
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
    setLoading(false)
  }, [])

  return { loading, result, error, predict, predictFromFrame, reset }
}
