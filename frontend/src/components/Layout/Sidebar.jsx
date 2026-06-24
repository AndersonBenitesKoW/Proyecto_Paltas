import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGrid, FiImage, FiCamera, FiUpload } from 'react-icons/fi'

const links = [
  { to: '/', label: 'Dashboard', icon: FiGrid },
  { to: '/dataset', label: 'Test Dataset', icon: FiImage },
  { to: '/camera', label: 'Camara', icon: FiCamera },
  { to: '/upload', label: 'Subir Imagen', icon: FiUpload },
]

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-surface-200/80 backdrop-blur-xl border-r border-white/5 z-50 flex flex-col"
    >
      <div className="flex items-center gap-3 px-4 lg:px-6 h-20 border-b border-white/5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-avocado-500 to-avocado-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
          A
        </div>
        <span className="hidden lg:block text-lg font-bold text-white tracking-tight">
          Avocado <span className="text-avocado-400">Pro</span>
        </span>
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-3 py-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 lg:px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-avocado-500/20 text-avocado-400 border border-avocado-500/20'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`
            }
          >
            <link.icon className="text-xl shrink-0" />
            <span className="hidden lg:block text-sm font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 lg:px-6 py-4 border-t border-white/5">
        <div className="hidden lg:flex items-center gap-2 text-xs text-white/30">
          <div className="w-2 h-2 rounded-full bg-avocado-500 animate-pulse" />
          YOLOv11 Online
        </div>
      </div>
    </motion.aside>
  )
}

