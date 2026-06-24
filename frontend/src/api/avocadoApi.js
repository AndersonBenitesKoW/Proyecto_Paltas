import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

export const getDatasetImages = (split = 'test') =>
  api.get('/dataset/list', { params: { split } }).then(r => r.data)

export const getDatasetImageUrl = (split, filename) =>
  `http://localhost:8000/api/dataset/image/${split}/${encodeURIComponent(filename)}`

export const getModelInfo = () =>
  api.get('/model/info').then(r => r.data)

export const predictImage = (file) => {
  const fd = new FormData()
  fd.append('file', file)
  return api.post('/predict', fd).then(r => r.data)
}

export const predictFrame = (base64Image) =>
  api.post('/predict-frame', { image: base64Image }).then(r => r.data)

export default api
