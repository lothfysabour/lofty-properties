import { isEmail, readJsonBody, sendMail } from './_mailer.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, phone, neighborhood, message, website } = readJsonBody(req)

  // Honeypot: real visitors never see this field, so a value means a bot.
  if (website) return res.status(200).json({ ok: true })

  if (!name || !isEmail(email) || !message) {
    return res.status(400).json({ error: 'Merci de renseigner votre nom, un e-mail valide et un message.' })
  }

  try {
    await sendMail({
      subject: `Nouveau message — ${name}`,
      title: 'Nouveau message depuis le site',
      replyTo: email,
      rows: [
        ['Nom', name],
        ['E-mail', email],
        ['Téléphone', phone],
        ['Quartier souhaité', neighborhood],
        ['Message', message],
      ],
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact form:', err)
    return res.status(500).json({ error: "L'envoi a échoué. Réessayez dans un instant." })
  }
}
