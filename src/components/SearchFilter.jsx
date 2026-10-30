import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, ChevronDown, X } from 'lucide-react'
import { neighborhoods } from '../data/apartments'

export default function SearchFilter({
  selectedNeighborhood,
  onNeighborhoodChange,
  searchQuery,
  onSearchChange,
  total,
  filtered,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const currentLabel = selectedNeighborhood || 'Tous les quartiers'

  return (
    <div className="mb-12 relative z-40">
      {/* Search bar container */}
      <div className="glass rounded-2xl p-2 max-w-3xl mx-auto flex flex-col sm:flex-row gap-2" style={{ overflow: 'visible' }}>

        {/* Text search */}
        <label className="flex items-center gap-3 flex-1 bg-white/5 rounded-xl px-4 py-3 cursor-text">
          <Search size={17} className="text-miami-cyan flex-shrink-0" />
          <input
            type="text"
            placeholder="Rechercher un appartement, un quartier, un équipement…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent text-white placeholder-white/25 flex-1 outline-none text-sm"
          />
          {searchQuery && (
            <button onClick={() => onSearchChange('')} className="text-white/30 hover:text-white transition-colors">
              <X size={15} />
            </button>
          )}
        </label>

        {/* Neighborhood dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl px-4 py-3 transition-colors w-full sm:w-auto sm:min-w-[180px]"
          >
            <MapPin size={17} className="text-miami-pink flex-shrink-0" />
            <span className="text-white text-sm flex-1 text-left truncate">{currentLabel}</span>
            <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={15} className="text-white/40" />
            </motion.span>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full mt-2 right-0 w-full min-w-[200px] glass-dark rounded-xl overflow-hidden shadow-2xl z-[200]"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {neighborhoods.map((n) => {
                  const active = n === currentLabel
                  return (
                    <button
                      key={n}
                      onClick={() => {
                        onNeighborhoodChange(n === 'Tous les quartiers' ? '' : n)
                        setDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2.5 transition-all hover:bg-white/10 ${
                        active ? 'text-miami-cyan bg-white/6' : 'text-white/65'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all ${active ? 'gradient-miami' : 'bg-white/20'}`}
                        style={active ? { background: 'linear-gradient(135deg,#A83232,#B76E50)' } : {}}
                      />
                      {n}
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search button */}
        <button className="gradient-miami rounded-xl px-6 py-3 text-white text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap flex items-center gap-2 justify-center">
          <Search size={15} />
          Rechercher
        </button>
      </div>

      {/* Active filter chips + result count */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        <span className="text-white/30 text-xs">
          {filtered} résultat{filtered !== 1 ? 's' : ''} sur {total}
        </span>

        {selectedNeighborhood && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onNeighborhoodChange('')}
            className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs text-miami-cyan hover:bg-white/10 transition-colors"
          >
            <MapPin size={11} />
            {selectedNeighborhood}
            <X size={11} className="text-white/40" />
          </motion.button>
        )}

        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onSearchChange('')}
            className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs text-miami-pink hover:bg-white/10 transition-colors"
          >
            <Search size={11} />
            « {searchQuery} »
            <X size={11} className="text-white/40" />
          </motion.button>
        )}
      </div>
    </div>
  )
}
