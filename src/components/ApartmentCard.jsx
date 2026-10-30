import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Users, Bed, Bath, Shield, Heart, ExternalLink } from 'lucide-react'

const BADGE_STYLES = {
  'Coup de cœur voyageurs': 'from-miami-pink to-miami-orange',
  'Mieux notés':            'from-navy-600 to-navy-800',
  'Populaire':              'from-miami-orange to-miami-pink',
  'Meilleur rapport qualité-prix': 'from-navy-600 to-navy-800',
  'Très demandé':           'from-miami-orange to-miami-pink',
  'Ultra premium':          'from-miami-pink to-miami-orange',
}

export default function ApartmentCard({ apartment, index }) {
  const [liked, setLiked] = useState(false)
  const [imgError, setImgError] = useState(false)

  const fallback = 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80'
  const badgeGradient = BADGE_STYLES[apartment.badge] || 'from-miami-cyan to-miami-pink'
  const airbnbUrl = apartment.airbnbUrl || '#contact'

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div
        className="glass rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full group-hover:border-miami-cyan/20"
        style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.35)' }}
      >
        {/* ── Image (clickable) ── */}
        <a
          href={airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative h-52 overflow-hidden flex-shrink-0 block"
          aria-label={`Voir ${apartment.name} sur Airbnb`}
        >
          <img
            src={imgError ? fallback : apartment.image}
            alt={apartment.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-transparent to-transparent" />

          {/* Airbnb badge on hover */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="flex items-center gap-2 text-white font-semibold text-sm bg-miami-pink/90 rounded-full px-4 py-2 backdrop-blur-sm">
              <ExternalLink size={14} />
              Voir sur Airbnb
            </span>
          </div>

          {/* Verified + badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {apartment.verified && (
              <span className="inline-flex items-center gap-1 bg-white/95 text-navy-900 text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                <Shield size={9} className="text-miami-cyan" />
                Vérifié
              </span>
            )}
            {apartment.badge && (
              <span className={`inline-flex items-center bg-gradient-to-r ${badgeGradient} text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg`}>
                {apartment.badge}
              </span>
            )}
          </div>

          {/* Heart */}
          <button
            onClick={(e) => { e.preventDefault(); setLiked((l) => !l) }}
            className="absolute top-3 right-3 w-9 h-9 glass rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-10"
          >
            <Heart
              size={15}
              className={liked ? 'fill-miami-pink text-miami-pink' : 'text-white'}
            />
          </button>

          {/* Price */}
          {apartment.price != null && (
            <div className="absolute bottom-3 right-3 glass rounded-xl px-3 py-1.5 z-10">
              <span className="gradient-text font-bold text-lg leading-none">{apartment.price} DH</span>
              <span className="text-white/45 text-xs"> /nuit</span>
            </div>
          )}
        </a>

        {/* ── Content ── */}
        <div className="p-5 flex flex-col flex-1">
          {/* Location + rating */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-miami-cyan text-xs font-semibold">
              <MapPin size={11} />
              {apartment.neighborhood}
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Star size={11} className="fill-miami-gold text-miami-gold" />
              <span className="text-white font-semibold">{apartment.rating.toFixed(1).replace('.', ',')}</span>
              <span className="text-white/35 ml-0.5">({apartment.reviews})</span>
            </div>
          </div>

          {/* Name (clickable) */}
          <a
            href={airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold text-[1.05rem] mb-2 group-hover:text-miami-cyan transition-colors leading-snug line-clamp-2 block"
          >
            {apartment.name}
          </a>

          {/* Description */}
          <p className="text-white/45 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
            {apartment.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-white/55 text-sm">
            <div className="flex items-center gap-1.5">
              <Bed size={13} />
              <span>{apartment.bedrooms === 0 ? 'Studio' : `${apartment.bedrooms} ch.`}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath size={13} />
              <span>{apartment.bathrooms} sdb</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={13} />
              <span>{apartment.guests} voyageurs</span>
            </div>
          </div>

          {/* Amenity chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {apartment.amenities.slice(0, 3).map((a) => (
              <span key={a} className="text-[11px] text-white/45 bg-white/5 rounded-full px-2.5 py-1">
                {a}
              </span>
            ))}
            {apartment.amenities.length > 3 && (
              <span className="text-[11px] text-white/28 bg-white/5 rounded-full px-2.5 py-1">
                +{apartment.amenities.length - 3}
              </span>
            )}
          </div>

          {/* CTA → Airbnb */}
          <a
            href={airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center text-sm py-3 flex items-center justify-center gap-2"
          >
            <ExternalLink size={14} />
            Réserver sur Airbnb
          </a>
        </div>
      </div>
    </motion.article>
  )
}
