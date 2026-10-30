import nodemailer from 'nodemailer'

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const display = (value) => (value === undefined || value === null || value === '' ? '—' : String(value))

export const isEmail = (value) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  try {
    return JSON.parse(req.body || '{}')
  } catch {
    return {}
  }
}

export async function sendMail({ subject, title, replyTo, rows, attachments = [] }) {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) throw new Error('GMAIL_USER or GMAIL_APP_PASSWORD is not set')

  const text = rows.map(([label, value]) => `${label} : ${display(value)}`).join('\n')
  const html = `
    <h2 style="font-family:sans-serif;color:#1a1a1a">${escapeHtml(title)}</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) => `
        <tr>
          <td style="padding:6px 16px 6px 0;color:#777;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
          <td style="padding:6px 0;color:#1a1a1a;white-space:pre-wrap">${escapeHtml(display(value))}</td>
        </tr>`,
        )
        .join('')}
    </table>`

  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } })
  await transporter.sendMail({
    from: `"Site Lofty Properties" <${user}>`,
    to: process.env.MAIL_TO || user,
    replyTo,
    subject,
    text,
    html,
    attachments,
  })
}
