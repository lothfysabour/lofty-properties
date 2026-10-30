import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Building } from 'lucide-react'

const navLinks = [
  { label: 'Accueil',       href: '#hero' },
  { label: 'À propos',      href: '#about' },
  { label: 'Appartements',  href: '#apartments' },
  { label: 'Contact',       href: '#contact' },
]

export default function Navbar({ navigate, currentPage }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* If we're on a sub-page, clicking a nav link brings us home first */
  const handleLink = (href) => {
    if (currentPage !== 'home') {
      navigate('home')
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }, 120)
    }
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-3 group">
            <div
              className="w-11 h-11 rounded-full overflow-hidden bg-white flex-shrink-0 transition-all duration-300"
              style={{ border: '2px solid rgba(220,200,174,0.6)' }}
            >
              <img
                src="/icons/lp-transparent-192.png"
                alt="Logo LOFTY PROPERTIES"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="leading-none">
              <p className="font-display font-bold text-base sm:text-xl text-white tracking-wider sm:tracking-widest">
                LOFTY <span className="gradient-text">PROPERTIES</span>
              </p>
              <p className="text-[10px] text-white/35 font-light tracking-[0.22em] uppercase mt-0.5">
                Luxury Marrakech
              </p>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={currentPage === 'home' ? link.href : undefined}
                onClick={() => handleLink(link.href)}
                className="relative text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 group cursor-pointer"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px gradient-miami rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* List Your Property CTA */}
            <button
              onClick={() => navigate('list-property')}
              className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-300 ${
                currentPage === 'list-property'
                  ? 'gradient-miami text-white border-transparent'
                  : 'border-miami-orange/50 text-miami-orange hover:border-miami-orange hover:bg-miami-orange/10'
              }`}
            >
              <Building size={14} />
              Confier mon bien
            </button>

            <a href="#contact" onClick={() => handleLink('#contact')} className="btn-primary text-sm py-2.5 px-6">
              Réserver
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-xl glass hover:bg-white/10 transition-all"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-dark border-t border-white/8"
          >
            <div className="px-5 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={currentPage === 'home' ? link.href : undefined}
                  onClick={() => handleLink(link.href)}
                  className="text-white/75 hover:text-miami-cyan text-base font-medium transition-colors py-3 border-b border-white/5 last:border-0 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { navigate('list-property'); setMenuOpen(false) }}
                className="mt-2 flex items-center justify-center gap-2 border border-miami-orange/50 text-miami-orange rounded-full py-3 text-sm font-semibold hover:bg-miami-orange/10 transition-colors"
              >
                <Building size={15} />
                Confier mon bien
              </button>
              <a
                href="#contact"
                onClick={() => handleLink('#contact')}
                className="btn-primary text-center mt-2"
              >
                Réserver
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
