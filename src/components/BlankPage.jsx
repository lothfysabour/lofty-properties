import { ArrowLeft } from 'lucide-react'

export default function BlankPage({ navigate, title }) {
  return (
    <div className="min-h-screen bg-navy-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 text-white/38 hover:text-miami-cyan transition-colors text-sm mb-8 group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Retour à l&apos;accueil
        </button>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">{title}</h1>
      </div>
    </div>
  )
}
