import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Home, RotateCcw } from 'lucide-react'
import { apartments } from '../data/apartments'
import ApartmentCard from './ApartmentCard'
import SearchFilter from './SearchFilter'

export default function ApartmentGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [selectedNeighborhood, setSelectedNeighborhood] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return apartments.filter((apt) => {
      const matchNeighborhood = !selectedNeighborhood || apt.neighborhood === selectedNeighborhood
      const matchSearch =
        !q ||
        apt.name.toLowerCase().includes(q) ||
        apt.neighborhood.toLowerCase().includes(q) ||
        apt.description.toLowerCase().includes(q) ||
        apt.amenities.some((a) => a.toLowerCase().includes(q))
      return matchNeighborhood && matchSearch
    })
  }, [selectedNeighborhood, searchQuery])

  return (
    <section id="apartments" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label text-miami-cyan"
          >
            Nos appartements
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl lg:text-5xl font-bold text-white mt-1 mb-4"
          >
            Trouvez votre{' '}
            <span className="gradient-text">refuge idéal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-white/45 text-lg max-w-xl mx-auto"
          >
            Une sélection haut de gamme dans les plus beaux quartiers de Marrakech
          </motion.p>
        </div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <SearchFilter
            selectedNeighborhood={selectedNeighborhood}
            onNeighborhoodChange={setSelectedNeighborhood}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            total={apartments.length}
            filtered={filtered.length}
          />
        </motion.div>

        {/* Cards grid or empty state */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((apt, i) => (
                <ApartmentCard key={apt.id} apartment={apt} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-24 text-center"
            >
              <div className="w-20 h-20 glass rounded-full flex items-center justify-center mb-6">
                <Home size={30} className="text-white/25" />
              </div>
              <p className="text-white/55 text-xl font-medium mb-2">Aucun appartement trouvé</p>
              <p className="text-white/30 text-sm mb-8">Essayez d&apos;ajuster vos critères de recherche</p>
              <button
                onClick={() => { setSelectedNeighborhood(''); setSearchQuery('') }}
                className="btn-primary text-sm px-7 py-3 flex items-center gap-2"
              >
                <RotateCcw size={15} />
                Réinitialiser les filtres
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
