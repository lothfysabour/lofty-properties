export default function Footer({ navigate }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/6 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-white flex-shrink-0" style={{ border: '1px solid rgba(220,200,174,0.5)' }}>
              <img src="/icons/lp-transparent-192.png" alt="LOFTY PROPERTIES" className="w-full h-full object-contain p-1" />
            </div>
            <div className="leading-none">
              <span className="text-white font-bold text-sm">LOFTY </span>
              <span className="gradient-text font-bold text-sm">PROPERTIES</span>
              <p className="text-white/30 text-[10px] tracking-widest uppercase mt-0.5">Luxury Marrakech</p>
            </div>
          </div>

          {/* Copy */}
          <p className="text-white/25 text-xs text-center">
            © {year} LOFTY PROPERTIES — Tous droits réservés.{' '}
            <span className="hidden sm:inline">Locations courte durée haut de gamme à Marrakech, Maroc.</span>
          </p>

          {/* Links */}
          <div className="flex gap-5 text-white/28 text-xs flex-wrap justify-center">
            <button onClick={() => navigate('list-property')} className="hover:text-miami-orange transition-colors">
              Confier mon bien
            </button>
            {['Confidentialité', 'Conditions', 'Plan du site'].map((l) => (
              <a key={l} href="#" className="hover:text-miami-cyan transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
