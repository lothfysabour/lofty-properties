import { motion } from 'framer-motion'
import { ChevronDown, MapPin, Star, Shield } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Background image + overlays */}
      <div className="absolute inset-0">
        <img
          src="https://imagedelivery.net/UpBbDZmjrt-WGPYbM3yOCA/27-marrakech-article-755-top-marrakech-tips-for-travellers-1292001543687907d381acd1.15716280/w=1920,h=780"
          alt="Marrakech"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(28,28,28,0.35) 0%, rgba(28,28,28,0.58) 50%, rgba(28,28,28,0.97) 100%)' }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{ background: 'radial-gradient(ellipse at 70% 35%, rgba(183,110,80,0.30) 0%, transparent 55%), radial-gradient(ellipse at 25% 65%, rgba(168,50,50,0.22) 0%, transparent 55%)' }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  `${4 + (i % 3) * 3}px`,
            height: `${4 + (i % 3) * 3}px`,
            background: i % 2 === 0 ? '#DCC8AE' : '#B76E50',
            left: `${10 + i * 13}%`,
            top:  `${15 + (i % 4) * 18}%`,
            opacity: 0.5,
          }}
          animate={{ y: [0, -22, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 pt-24">

        {/* Top badge */}
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 text-sm">
          <MapPin size={14} className="text-miami-cyan" />
          <span className="text-white/75">Marrakech, Maroc — Locations haut de gamme</span>
          <div className="flex items-center gap-1 ml-2 border-l border-white/15 pl-2">
            <Star size={12} className="fill-miami-gold text-miami-gold" />
            <span className="text-miami-gold font-semibold">5,0</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.1)} className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-bold text-white leading-tight mb-2">
          Vivez
        </motion.h1>
        <motion.div {...fadeUp(0.2)}>
          <span className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-bold gradient-text text-shadow-glow">
            l&apos;expérience Lofty
          </span>
        </motion.div>

        {/* Subtext */}
        <motion.p {...fadeUp(0.3)} className="mt-7 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
          Des appartements haut de gamme soigneusement sélectionnés à Marrakech.
          Des penthouses aux lofts d&apos;artiste — le séjour idéal vous attend.
        </motion.p>

        {/* Stats row */}
        <motion.div {...fadeUp(0.4)} className="flex items-center justify-center gap-10 sm:gap-16 mt-10 mb-10">
          {[
            { value: '15+',   label: 'Logements' },
            { value: '1 000+', label: 'Séjours' },
            { value: '5,0 ★', label: 'Note moyenne' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold gradient-text">{s.value}</p>
              <p className="text-[11px] text-white/40 mt-1 tracking-widest uppercase">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#apartments" className="btn-primary px-10 py-4 text-base">
            Découvrir les appartements
          </a>
          <a href="#about" className="btn-outline px-10 py-4 text-base">
            Notre histoire
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div {...fadeUp(0.65)} className="flex flex-wrap items-center justify-center gap-5 mt-10">
          {[
            { icon: <Shield size={13} className="text-miami-cyan" />, text: 'Logements vérifiés' },
            { icon: <Star   size={13} className="text-miami-gold" />, text: 'Superhôtes certifiés' },
            { icon: <MapPin size={13} className="text-miami-orange" />, text: '6 quartiers d’exception' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-white/38 text-xs">
              {item.icon}
              <span>{item.text}</span>
              {i < 2 && <span className="ml-5 hidden sm:block w-px h-4 bg-white/15" />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/35 hover:text-white/70 transition-colors"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Découvrir</span>
        <ChevronDown size={18} />
      </motion.a>
    </section>
  )
}
