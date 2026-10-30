import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Upload, X, CheckCircle,
  Building2, FileText, TrendingUp, User,
} from 'lucide-react'
import { MAX_PHOTOS, postForm, preparePhotos } from '../utils/forms'

/* ── Shared styles ─────────────────────────────────────────── */
const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/22 outline-none focus:border-miami-cyan/60 transition-colors text-sm'
const labelClass = 'block text-white/40 text-[11px] tracking-widest uppercase mb-2'

/* ── Section card ──────────────────────────────────────────── */
function SectionCard({ number, icon: Icon, title, subtitle, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className="glass rounded-2xl p-6 sm:p-8"
    >
      <div className="flex items-start gap-4 mb-8">
        <div className="w-11 h-11 gradient-miami rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <Icon size={19} className="text-white" />
        </div>
        <div>
          <span className="gradient-text font-bold text-[11px] tracking-widest uppercase">Étape {number}</span>
          <h3 className="text-white font-semibold text-xl leading-tight mt-0.5">{title}</h3>
          <p className="text-white/38 text-sm mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-6">{children}</div>
    </motion.div>
  )
}

/* ── Radio group ───────────────────────────────────────────── */
function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`flex items-center gap-2.5 cursor-pointer px-4 py-2.5 rounded-xl border transition-all duration-200 select-none ${
            value === opt.value
              ? 'border-miami-cyan/60 bg-miami-cyan/10 text-miami-cyan'
              : 'border-white/10 bg-white/5 text-white/55 hover:border-white/22 hover:text-white/75'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <span
            className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              value === opt.value ? 'border-miami-cyan' : 'border-white/30'
            }`}
          >
            {value === opt.value && (
              <span className="w-1.5 h-1.5 rounded-full bg-miami-cyan block" />
            )}
          </span>
          <span className="text-sm font-medium">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}

/* ── Number selector ───────────────────────────────────────── */
function NumberSelector({ label, options, value, onChange }) {
  return (
    <div>
      <p className={labelClass}>{label}</p>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`w-16 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
              value === opt
                ? 'border-miami-cyan/60 bg-miami-cyan/10 text-miami-cyan'
                : 'border-white/10 bg-white/5 text-white/50 hover:border-white/25 hover:text-white/75'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── File drop zone ────────────────────────────────────────── */
function FileDropZone({ files, setFiles }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const addFiles = useCallback(
    (incoming) => {
      const imgs = Array.from(incoming).filter((f) => f.type.startsWith('image/'))
      setFiles((prev) => [...prev, ...imgs].slice(0, MAX_PHOTOS))
    },
    [setFiles],
  )

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
          dragging
            ? 'border-miami-cyan bg-miami-cyan/8 scale-[1.01]'
            : 'border-white/13 bg-white/3 hover:border-white/28 hover:bg-white/5'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
        <Upload
          size={30}
          className={`mx-auto mb-3 transition-colors ${dragging ? 'text-miami-cyan' : 'text-white/22'}`}
        />
        <p className="text-white/50 text-sm font-medium">
          Glissez-déposez vos photos ici, ou{' '}
          <span className="text-miami-cyan underline underline-offset-2">parcourez vos fichiers</span>
        </p>
        <p className="text-white/25 text-xs mt-1">
          JPG, PNG, HEIC — jusqu&apos;à {MAX_PHOTOS} photos, même prises au téléphone
        </p>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
          {files.map((file, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden aspect-square bg-white/5 group">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
              >
                <X size={10} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Main page ─────────────────────────────────────────────── */
export default function ListProperty({ navigate }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', referral: '',
    neighborhood: '', neighborhoodOther: '', address: '',
    propertyType: '',
    bedrooms: '', bathrooms: '',
    hoaPermission: '', availability: '', furnished: '',
    listingLink: '', message: '', website: '',
  })
  const [files, setFiles]       = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending]   = useState(false)
  const [error, setError]       = useState('')

  const set      = (key) => (e)  => setForm((f) => ({ ...f, [key]: e.target.value }))
  const setRadio = (key) => (val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const photos = await preparePhotos(files)
      await postForm('/api/list-property', { ...form, photos })
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-900">

      {/* ── Hero header ─────────────────────────────────────── */}
      <div className="relative pt-24 pb-14 overflow-hidden">
        {/* Background tints */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(220,200,174,0.07) 0%, rgba(168,50,50,0.07) 50%, rgba(183,110,80,0.07) 100%)' }}
        />
        <div className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(220,200,174,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,50,50,0.07) 0%, transparent 70%)' }} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back button */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 text-white/38 hover:text-miami-cyan transition-colors text-sm mb-8 group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Retour à l&apos;accueil
          </button>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label text-miami-cyan mb-2 inline-block">Pour les propriétaires</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Confiez votre bien<br />
              <span className="gradient-text">à Lofty Properties</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-xl">
              Nous nous occupons de tout — de la mise en valeur professionnelle à une gestion des voyageurs digne d&apos;un 5 étoiles.
              Remplissez le formulaire ci-dessous et notre équipe évaluera tout le potentiel de votre bien.
            </p>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-white/8"
          >
            {[
              { value: '+40%',  label: 'vs. revenus en location longue durée' },
              { value: '48h',   label: 'Délai de réponse garanti' },
              { value: '100%',  label: 'Entièrement géré par notre équipe' },
            ].map((s) => (
              <div key={s.label}>
                <p className="gradient-text font-bold text-2xl leading-none">{s.value}</p>
                <p className="text-white/35 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Form ────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-28">

        {submitted ? (
          /* Success state */
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 gradient-miami rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle size={36} className="text-white" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-3">Bien envoyé !</h2>
            <p className="text-white/50 text-lg mb-2">Merci, {form.name || 'cher propriétaire'}.</p>
            <p className="text-white/32 text-sm mb-10 max-w-md mx-auto leading-relaxed">
              Nous étudions chaque demande sous <strong className="text-white/55">48 heures</strong>.
              Si votre bien correspond aux standards de Lofty Properties, nous organiserons une visite privée ou un appel vidéo.
            </p>
            <button
              onClick={() => { navigate('home'); setSubmitted(false) }}
              className="btn-primary px-10 py-3"
            >
              Retour à l&apos;accueil
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ── Section 1: Personal Info ───────────────────── */}
            <SectionCard
              number="01"
              icon={User}
              title="Les bases"
              subtitle="Parlez-nous un peu de vous"
              delay={0}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Nom complet *</label>
                  <input
                    type="text" required
                    placeholder="Votre nom"
                    value={form.name} onChange={set('name')}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Adresse e-mail *</label>
                  <input
                    type="email" required
                    placeholder="vous@exemple.com"
                    value={form.email} onChange={set('email')}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Numéro de téléphone *</label>
                  <input
                    type="tel" required
                    placeholder="+212 6 00 00 00 00"
                    value={form.phone} onChange={set('phone')}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Comment nous avez-vous connus ?</label>
                  <select
                    value={form.referral} onChange={set('referral')}
                    className={inputClass} style={{ colorScheme: 'dark' }}
                  >
                    <option value="">Choisir…</option>
                    <option>Recherche Google</option>
                    <option>Réseaux sociaux</option>
                    <option>Recommandation / Bouche-à-oreille</option>
                    <option>Autre</option>
                  </select>
                </div>
              </div>
            </SectionCard>

            {/* ── Section 2: The Property ────────────────────── */}
            <SectionCard
              number="02"
              icon={Building2}
              title="Le bien"
              subtitle="Parlez-nous de votre appartement"
              delay={0.05}
            >
              <div className={`grid gap-5 ${form.neighborhood === 'Autre (préciser ci-dessous)' ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
                <div>
                  <label className={labelClass}>Quartier à Marrakech *</label>
                  <select
                    required
                    value={form.neighborhood} onChange={set('neighborhood')}
                    className={inputClass} style={{ colorScheme: 'dark' }}
                  >
                    <option value="">Choisir un quartier…</option>
                    <option>Palmeraie</option>
                    <option>Guéliz</option>
                    <option>Hivernage</option>
                    <option>Médina</option>
                    <option>Agdal</option>
                    <option>Autre (préciser ci-dessous)</option>
                  </select>
                </div>
                {form.neighborhood === 'Autre (préciser ci-dessous)' && (
                  <div>
                    <label className={labelClass}>Merci de préciser</label>
                    <input
                      type="text"
                      placeholder="Nom du quartier"
                      value={form.neighborhoodOther} onChange={set('neighborhoodOther')}
                      className={inputClass}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className={labelClass}>Adresse exacte du bien *</label>
                <input
                  type="text" required
                  placeholder="ex. Résidence, n° d&apos;appartement, quartier, Marrakech"
                  value={form.address} onChange={set('address')}
                  className={inputClass}
                />
                <p className="text-white/22 text-xs mt-1.5">
                  Indiquez le numéro d&apos;appartement ou d&apos;immeuble le cas échéant.
                </p>
              </div>

              <div>
                <label className={labelClass}>Type de bien *</label>
                <RadioGroup
                  name="propertyType"
                  value={form.propertyType}
                  onChange={setRadio('propertyType')}
                  options={[
                    { value: 'loft',      label: 'Loft' },
                    { value: 'condo',     label: 'Appartement' },
                    { value: 'penthouse', label: 'Penthouse' },
                    { value: 'house',     label: 'Maison / Villa' },
                  ]}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <NumberSelector
                  label="Chambres"
                  options={['1', '2', '3', '4+']}
                  value={form.bedrooms}
                  onChange={(v) => setForm((f) => ({ ...f, bedrooms: v }))}
                />
                <NumberSelector
                  label="Salles de bain"
                  options={['1', '1,5', '2', '2,5+']}
                  value={form.bathrooms}
                  onChange={(v) => setForm((f) => ({ ...f, bathrooms: v }))}
                />
              </div>
            </SectionCard>

            {/* ── Section 3: Status & Regulations ───────────── */}
            <SectionCard
              number="03"
              icon={FileText}
              title="Les détails"
              subtitle="Quelques questions réglementaires importantes"
              delay={0.1}
            >
              <div>
                <label className={labelClass}>
                  Le règlement de copropriété / de la résidence autorise-t-il la location courte durée ? *
                </label>
                <RadioGroup
                  name="hoaPermission"
                  value={form.hoaPermission}
                  onChange={setRadio('hoaPermission')}
                  options={[
                    { value: 'yes',     label: 'Oui' },
                    { value: 'no',      label: 'Non' },
                    { value: 'unknown', label: "Je ne sais pas — j'ai besoin d'aide pour vérifier" },
                  ]}
                />
              </div>

              <div>
                <label className={labelClass}>Le bien est-il actuellement disponible à la location ?</label>
                <RadioGroup
                  name="availability"
                  value={form.availability}
                  onChange={setRadio('availability')}
                  options={[
                    { value: 'now',      label: 'Oui, immédiatement' },
                    { value: '3months',  label: 'D’ici 3 mois' },
                    { value: 'later',    label: 'Plus tard dans l’année' },
                  ]}
                />
              </div>

              <div>
                <label className={labelClass}>Est-il déjà meublé avec un haut niveau de finition ?</label>
                <RadioGroup
                  name="furnished"
                  value={form.furnished}
                  onChange={setRadio('furnished')}
                  options={[
                    { value: 'yes',     label: 'Oui, prêt à accueillir' },
                    { value: 'partial', label: 'Partiellement meublé' },
                    { value: 'no',      label: "Non — j'aimerais profiter de l'expertise déco de Lofty" },
                  ]}
                />
              </div>
            </SectionCard>

            {/* ── Section 4: Vision & Media ──────────────────── */}
            <SectionCard
              number="04"
              icon={TrendingUp}
              title="La vision"
              subtitle="Aidez-nous à comprendre le potentiel de votre bien"
              delay={0.15}
            >
              <div>
                <label className={labelClass}>Lien vers une annonce existante (facultatif)</label>
                <input
                  type="url"
                  placeholder="https://www.airbnb.fr/rooms/..."
                  value={form.listingLink} onChange={set('listingLink')}
                  className={inputClass}
                />
                <p className="text-white/22 text-xs mt-1.5">
                  Uniquement un lien Airbnb.
                </p>
              </div>

              <div>
                <label className={labelClass}>Photos du bien</label>
                <FileDropZone files={files} setFiles={setFiles} />
                <p className="text-white/22 text-xs mt-2">
                  Même de simples photos prises au téléphone conviennent — nous voulons juste voir l’espace.
                </p>
              </div>

              <div>
                <label className={labelClass}>Message / Informations complémentaires</label>
                <textarea
                  rows={5}
                  placeholder="Racontez-nous l’histoire de votre bien — ses atouts, vos attentes de revenus, vos questions éventuelles…"
                  value={form.message} onChange={set('message')}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </SectionCard>

            {/* ── CTA ───────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center pt-4"
            >
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
                className="btn-primary px-12 py-5 text-lg inline-flex items-center gap-3 disabled:opacity-60 disabled:cursor-wait"
              >
                <TrendingUp size={20} />
                {sending ? 'Envoi en cours…' : 'Maximiser mes revenus avec Lofty'}
              </button>

              {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

              {/* Reassurance text */}
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-white/10" />
                <p className="text-white/32 text-sm max-w-sm leading-relaxed">
                  Nous étudions chaque demande sous{' '}
                  <span className="text-white/55 font-semibold">48 heures</span>.
                  Si votre bien correspond aux standards de Lofty Properties, nous organiserons
                  une visite privée ou un appel vidéo.
                </p>
                <div className="h-px w-12 bg-white/10" />
              </div>
            </motion.div>

          </form>
        )}
      </div>
    </div>
  )
}
