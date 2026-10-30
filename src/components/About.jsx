import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Heart, Zap, Users } from 'lucide-react'

function Reveal({ children, delay = 0, x = 0, y = 40 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

const values = [
  { icon: Award,  color: 'text-miami-cyan',   title: 'Excellence',  text: 'Chaque logement passe 80 points de contrôle qualité avant d’être proposé sur notre plateforme.' },
  { icon: Heart,  color: 'text-miami-pink',   title: 'Passion',     text: 'Nous ne sélectionnons que des appartements qui nous enthousiasment vraiment — sans compromis.' },
  { icon: Zap,    color: 'text-miami-orange', title: 'Réactivité',  text: 'Notre équipe répond en 30 minutes, 7 jours sur 7, pour votre entière tranquillité.' },
  { icon: Users,  color: 'text-miami-cyan',   title: 'Communauté',  text: 'Des hôtes locaux authentiques, des quartiers vivants et des expériences vraiment uniques.' },
]

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-36 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220,200,174,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(183,110,80,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Left — image collage */}
          <Reveal x={-60} y={0}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img
                  src="/Gemini_Generated_Image_3c52j33c52j33c52.png"
                  alt="Lothfy S., fondateur de LOFTY PROPERTIES"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 opacity-25"
                  style={{ background: 'linear-gradient(to bottom, transparent 55%, #1C1C1C)' }} />
              </div>

              {/* Founder card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 glass rounded-2xl p-4 max-w-[210px] shadow-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-white"
                    style={{ border: '2px solid rgba(220,200,174,0.5)' }}>
                    <img src="/icons/lp-transparent-192.png" alt="Logo LOFTY PROPERTIES" className="w-full h-full object-contain p-1" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">Lothfy S.</p>
                    <p className="text-white/40 text-xs">Fondateur & CEO</p>
                  </div>
                </div>
                <p className="text-white/60 text-xs italic leading-relaxed">
                  « Marrakech n’est pas qu’une ville, c’est un art de vivre. »
                </p>
              </div>

              {/* Year badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 glass rounded-xl px-4 py-3 text-center shadow-xl">
                <p className="text-2xl font-bold gradient-text leading-none">2026</p>
                <p className="text-white/40 text-[11px] mt-0.5">Fondée à Marrakech</p>
              </div>
            </div>
          </Reveal>

          {/* Right — text */}
          <div className="flex flex-col gap-8">
            <Reveal x={60} y={0}>
              <span className="section-label text-miami-cyan">Notre histoire</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mt-1">
                Une histoire de racines,{' '}
                <span className="gradient-text">de passion et d&apos;ambition</span>
              </h2>
            </Reveal>

            <Reveal x={60} y={0} delay={0.1}>
              <div className="space-y-4">
                <p className="text-white/75 text-lg leading-relaxed font-light">
                  D&apos;origine marocaine, j&apos;ai toujours entretenu un lien profond avec le Maroc, le pays de mes racines et de mon histoire familiale. Depuis mon enfance, Marrakech occupe une place particulière dans mon cœur. Son énergie, son authenticité, sa richesse culturelle et son art de vivre unique m&apos;ont toujours fasciné.
                </p>
                <p className="text-white/75 text-lg leading-relaxed font-light">
                  Au fil des années, une envie s&apos;est transformée en ambition :{' '}
                  <strong className="text-white font-medium">créer quelque chose qui me ressemble, dans cette ville qui m&apos;inspire tant.</strong>
                </p>
                <p className="text-white/75 text-lg leading-relaxed font-light">
                  C&apos;est de cette passion qu&apos;est née <strong className="text-white font-medium">LOFTY PROPERTIES</strong>, avec une vision simple : nous sélectionnons avec soin des appartements à Marrakech, en portant une attention particulière à chaque détail, pour faire de chaque séjour une expérience unique.
                </p>
                <p className="text-white/75 text-lg leading-relaxed font-light">
                  Car chez LOFTY PROPERTIES, nous ne souhaitons pas simplement vous offrir un logement.{' '}
                  <strong className="text-white font-medium">Nous voulons vous faire vivre Marrakech autrement, vous faire découvrir son art de vivre et vous donner, dès les premiers instants, le sentiment d&apos;être chez vous.</strong>
                </p>
              </div>
            </Reveal>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((v, i) => {
                const Icon = v.icon
                return (
                  <Reveal key={v.title} delay={0.1 + i * 0.08} y={20}>
                    <div className="glass rounded-xl p-4 group hover:bg-white/8 transition-all duration-300 cursor-default h-full">
                      <Icon size={22} className={`${v.color} mb-3 group-hover:scale-110 transition-transform duration-300`} />
                      <h3 className="text-white font-semibold mb-1 text-sm">{v.title}</h3>
                      <p className="text-white/45 text-xs leading-relaxed">{v.text}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
