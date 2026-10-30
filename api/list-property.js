import { isEmail, readJsonBody, sendMail } from './_mailer.js'

const MAX_PHOTOS = 10

const PROPERTY_TYPES = { loft: 'Loft', condo: 'Appartement', penthouse: 'Penthouse', house: 'Maison / Villa' }
const HOA_PERMISSION = { yes: 'Oui', no: 'Non', unknown: 'Je ne sais pas' }
const AVAILABILITY = { now: 'Immédiatement', '3months': "D'ici 3 mois", later: "Plus tard dans l'année" }
const FURNISHED = { yes: 'Oui, prêt à accueillir', partial: 'Partiellement meublé', no: 'Non' }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const body = readJsonBody(req)

  // Honeypot: real visitors never see this field, so a value means a bot.
  if (body.website) return res.status(200).json({ ok: true })

  if (!body.name || !isEmail(body.email) || !body.phone || !body.neighborhood || !body.address) {
    return res.status(400).json({ error: 'Merci de remplir tous les champs obligatoires.' })
  }

  const photos = Array.isArray(body.photos) ? body.photos.slice(0, MAX_PHOTOS) : []
  const attachments = photos
    .filter((p) => p && typeof p.data === 'string')
    .map((p, i) => ({
      filename: typeof p.name === 'string' && p.name ? p.name : `photo-${i + 1}.jpg`,
      content: p.data,
      encoding: 'base64',
    }))

  const neighborhood =
    body.neighborhood.startsWith('Autre') && body.neighborhoodOther
      ? `Autre : ${body.neighborhoodOther}`
      : body.neighborhood

  try {
    await sendMail({
      subject: `Nouveau bien proposé — ${body.name} (${neighborhood})`,
      title: 'Nouveau bien proposé par un propriétaire',
      replyTo: body.email,
      rows: [
        ['Nom', body.name],
        ['E-mail', body.email],
        ['Téléphone', body.phone],
        ['Nous a connus via', body.referral],
        ['Quartier', neighborhood],
        ['Adresse', body.address],
        ['Type de bien', PROPERTY_TYPES[body.propertyType] ?? body.propertyType],
        ['Chambres', body.bedrooms],
        ['Salles de bain', body.bathrooms],
        ['Location courte durée autorisée', HOA_PERMISSION[body.hoaPermission] ?? body.hoaPermission],
        ['Disponibilité', AVAILABILITY[body.availability] ?? body.availability],
        ['Meublé', FURNISHED[body.furnished] ?? body.furnished],
        ['Annonce existante', body.listingLink],
        ['Photos jointes', String(attachments.length)],
        ['Message', body.message],
      ],
      attachments,
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('list-property form:', err)
    return res.status(500).json({ error: "L'envoi a échoué. Réessayez dans un instant." })
  }
}
