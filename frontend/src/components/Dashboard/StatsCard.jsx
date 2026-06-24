import { motion } from 'framer-motion'

export default function StatsCard({ title, value, subtitle, color = '#52b788', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card flex flex-col gap-2"
    >
      <span className="text-sm text-white/50 font-medium">{title}</span>
      <span className="text-3xl font-bold text-white" style={{ color }}>
        {value}
      </span>
      {subtitle && (
        <span className="text-xs text-white/30">{subtitle}</span>
      )}
    </motion.div>
  )
}
