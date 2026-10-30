import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Instagram, Facebook, MessageSquare, CheckCircle } from 'lucide-react'
import { postForm } from '../utils/forms'

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/22 outline-none focus:border-miami-cyan/60 transition-colors text-sm'

const emptyForm = { name: '', email: '', phone: '', neighborhood: '', message: '', website: '' }

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState(emptyForm)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await postForm('/api/contact', form)
      setSent(true)
      setTimeout(() => setSent(false), 5000)
      setForm(emptyForm)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(183,110,80,0.5) 0%, transparent 65%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-label text-miami-orange"
          >
            Contactez-nous
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-4xl lg:text-5xl font-bold text-white mt-1"
          >
            Commencez votre{' '}
            <span className="gradient-text">aventure marrakchie</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* ── Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-white font-semibold text-xl mb-3">Parlons de votre séjour</h3>
              <p className="text-white/45 leading-relaxed text-sm">
                Notre équipe est disponible 7 jours sur 7 pour vous aider à trouver
                l&apos;appartement idéal et organiser le séjour de vos rêves à Marrakech.
              </p>
            </div>

            {[
              { Icon: Phone,  color: 'text-miami-cyan',   label: 'Téléphone', value: '+212 7 84 98 49 02' },
              { Icon: Mail,   color: 'text-miami-orange', label: 'E-mail',    value: 'loftymarrakech@gmail.com' },
              { Icon: MapPin, color: 'text-miami-orange', label: 'Ville',     value: 'Marrakech, Maroc' },
            ].map(({ Icon, color, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className={`${color} mt-0.5 flex-shrink-0`}><Icon size={20} /></div>
                <div>
                  <p className="text-white/35 text-[11px] tracking-widest uppercase mb-0.5">{label}</p>
                  <p className="text-white font-medium text-sm">{value}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div>
              <p className="text-white/35 text-[11px] tracking-widest uppercase mb-4">Suivez-nous</p>
              <div className="flex gap-3">
                {[
                  { Icon: Instagram,     label: 'Instagram', color: 'hover:text-miami-pink', href: '#' },
                  { Icon: Facebook,      label: 'Facebook',  color: 'hover:text-miami-cyan', href: '#' },
                  { Icon: MessageSquare, label: 'WhatsApp',  color: 'hover:text-green-400',  href: '#' },
                ].map(({ Icon, label, color, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`w-11 h-11 glass rounded-xl flex items-center justify-center text-white/45 ${color} transition-all duration-300 hover:bg-white/10 hover:scale-110`}
                  >
                    <Icon size={19} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-7 sm:p-8">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <div className="w-16 h-16 gradient-miami rounded-full flex items-center justify-center mb-5 shadow-lg">
                      <CheckCircle size={28} className="text-white" />
                    </div>
                    <h3 className="text-white text-xl font-semibold mb-2">Message envoyé !</h3>
                    <p className="text-white/45 text-sm">Notre équipe vous répondra sous 2 heures.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Nom complet *</label>
                        <input type="text" required placeholder="Votre nom" value={form.name} onChange={set('name')} className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">E-mail *</label>
                        <input type="email" required placeholder="vous@exemple.com" value={form.email} onChange={set('email')} className={inputClass} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Téléphone</label>
                        <input type="tel" placeholder="+212 6 00 00 00 00" value={form.phone} onChange={set('phone')} className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Quartier souhaité</label>
                        <select value={form.neighborhood} onChange={set('neighborhood')} className={inputClass} style={{ colorScheme: 'dark' }}>
                          <option value="">Choisir un quartier…</option>
                          {['Palmeraie', 'Guéliz', 'Hivernage', 'Médina', 'Agdal'].map((n) => (
                            <option key={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/40 text-[11px] tracking-widest uppercase mb-2">Message *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Parlez-nous de votre séjour idéal à Marrakech…"
                        value={form.message}
                        onChange={set('message')}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={form.website}
                      onChange={set('website')}
                      className="hidden"
                    />

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-wait"
                    >
                      <Send size={17} />
                      {sending ? 'Envoi en cours…' : 'Envoyer le message'}
                    </button>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
