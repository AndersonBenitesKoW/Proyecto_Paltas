import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud } from 'react-icons/fi'

export default function DropZone({ onFile, loading }) {
  const onDrop = useCallback(
    (accepted) => {
      if (accepted.length > 0) onFile(accepted[0])
    },
    [onFile]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    disabled: loading,
  })

  return (
    <div
      {...getRootProps()}
      className={`relative rounded-2xl border-2 border-dashed p-16 text-center cursor-pointer transition-all duration-300 ${
        isDragActive
          ? 'border-avocado-500 bg-avocado-500/10'
          : 'border-white/10 hover:border-avocado-500/40 hover:bg-white/[0.02]'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      <FiUploadCloud className="text-5xl text-white/20 mx-auto mb-4" />
      <p className="text-lg text-white/50">
        {isDragActive ? 'Suelta la imagen aquí' : 'Arrastra una imagen o haz clic para seleccionar'}
      </p>
      <p className="text-sm text-white/20 mt-2">JPG, PNG, WebP</p>
    </div>
  )
}
