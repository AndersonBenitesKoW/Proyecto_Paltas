import { motion } from 'framer-motion'
import { getDatasetImageUrl } from '../../api/avocadoApi'

const CLASS_BADGES = {
  Primera: 'bg-[#52b788]/20 text-[#52b788] border-[#52b788]/30',
  Segunda: 'bg-[#ffd166]/20 text-[#ffd166] border-[#ffd166]/30',
  Tercera: 'bg-[#ef476f]/20 text-[#ef476f] border-[#ef476f]/30',
}

export default function ImageGallery({ images, filter, selected, onSelect }) {
  const filtered = filter === 'all' ? images : images.filter((img) => img.ground_truth === filter)

  if (filtered.length === 0) {
    return (
      <div className="text-center py-20 text-white/30">
        <p className="text-lg">No hay imágenes en esta categoría</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {filtered.map((img, i) => {
        const isSelected = selected?.filename === img.filename
        return (
          <motion.button
            key={img.filename}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => onSelect(img)}
            className={`relative rounded-xl overflow-hidden aspect-square group cursor-pointer border-2 transition-all duration-300 ${
              isSelected
                ? 'border-avocado-500 ring-2 ring-avocado-500/50'
                : 'border-white/5 hover:border-white/20'
            }`}
          >
            <img
              src={getDatasetImageUrl(img.split, img.filename)}
              alt={img.filename}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {img.ground_truth && (
              <span
                className={`absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                  CLASS_BADGES[img.ground_truth] || 'bg-white/10 text-white/70'
                }`}
              >
                {img.ground_truth}
              </span>
            )}
            {isSelected && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-avocado-500 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
