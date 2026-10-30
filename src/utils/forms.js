export const MAX_PHOTOS = 10

// Vercel rejects function request bodies above 4.5 MB, base64 included.
const PHOTO_BUDGET = 3_800_000

const COMPRESSION_STEPS = [
  { maxSide: 1600, quality: 0.75 },
  { maxSide: 1200, quality: 0.6 },
  { maxSide: 900, quality: 0.5 },
]

const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1])
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })

async function compressImage(file, { maxSide, quality }) {
  let bitmap
  try {
    bitmap = await createImageBitmap(file)
  } catch {
    throw new Error(`Impossible de lire « ${file.name} ». Essayez en JPG ou PNG.`)
  }

  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality))
  return {
    name: `${file.name.replace(/\.[^.]+$/, '') || 'photo'}.jpg`,
    data: await blobToBase64(blob),
  }
}

export async function preparePhotos(files) {
  for (const step of COMPRESSION_STEPS) {
    const photos = await Promise.all(files.map((file) => compressImage(file, step)))
    const size = photos.reduce((total, p) => total + p.data.length, 0)
    if (size <= PHOTO_BUDGET) return photos
  }
  throw new Error('Les photos sont trop lourdes. Retirez-en quelques-unes et réessayez.')
}

export async function postForm(path, payload) {
  let res
  try {
    res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('Connexion impossible. Vérifiez votre réseau et réessayez.')
  }

  if (!res.ok) {
    if (res.status === 413) throw new Error('Les photos sont trop lourdes. Retirez-en quelques-unes et réessayez.')
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || "L'envoi a échoué. Réessayez dans un instant.")
  }
}
