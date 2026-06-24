import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import DashboardPage from './pages/DashboardPage'
import DatasetPage from './pages/DatasetPage'
import CameraPage from './pages/CameraPage'
import UploadPage from './pages/UploadPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dataset" element={<DatasetPage />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </Layout>
  )
}
