import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [detections, setDetections] = useState([]);
  const [stats, setStats] = useState({ primera: 0, segunda: 0, descarte: 0, recommendation: '' });
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post('http://localhost:8000/predict', formData);
      setDetections(response.data.detections);
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const drawBoundingBoxes = () => {
    if (!image) return;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      detections.forEach(det => {
        const [x1, y1, x2, y2] = det.bbox;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        ctx.fillStyle = 'red';
        ctx.fillText(`${det.class} (${(det.confidence * 100).toFixed(2)}%)`, x1, y1 - 5);
      });
    };
    img.src = URL.createObjectURL(image);
  };

  React.useEffect(() => {
    if (detections.length > 0) {
      drawBoundingBoxes();
    }
  }, [detections]);

  return (
    <div className="App">
      <h1>Avocado Quality Detection</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleSubmit} disabled={loading}>Analyze</button>
      {loading && <p>Processing...</p>}
      {image && <canvas id="canvas"></canvas>}
      <div>
        <h2>Statistics</h2>
        <p>Primera: {stats.primera}%</p>
        <p>Segunda: {stats.segunda}%</p>
        <p>Descarte: {stats.descarte}%</p>
        <p>Recommendation: {stats.recommendation}</p>
      </div>
    </div>
  );
}

export default App;