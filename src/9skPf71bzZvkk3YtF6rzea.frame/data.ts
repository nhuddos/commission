export type Finish = 'sketch' | 'rendered'
export type Framing = 'bust' | 'torso' | 'fullbody'

export type Artwork = {
  id: string
  src: string
  alt: string
  finish: Finish | 'chibi'
  framing?: Framing
}

export const PRICES: Record<Finish, Record<Framing, number>> = {
  sketch: { bust: 20, torso: 40, fullbody: 50 },
  rendered: { bust: 50, torso: 65, fullbody: 100 },
}

export const CHIBI_PRICE = 40

export const ADDONS = [
  { id: 'pose', label: 'Detailed pose', price: 20 },
  { id: 'background', label: 'Detailed background', price: 40 },
] as const

export const TURNAROUND = '1–3 weeks'

export type Currency = 'EUR' | 'USD' | 'VND'
export type Rates = Record<Currency, number>

/** Used until live rates load, or if they can't be fetched. */
export const FALLBACK_RATES: Rates = { EUR: 1, USD: 1.16, VND: 30500 }

export function formatPrice(eur: number, currency: Currency, rates: Rates) {
  if (currency === 'EUR') return `€${eur}`
  if (currency === 'USD') return `$${Math.round(eur * rates.USD)}`
  const vnd = Math.round((eur * rates.VND) / 1000) * 1000
  return `${vnd.toLocaleString('vi-VN')}₫`
}

export const FRAMING_LABEL: Record<Framing, string> = {
  bust: 'Bust',
  torso: 'Torso',
  fullbody: 'Full body',
}

// Loads every image in src/images and gives back its final URL.
// If this file lives in src/data/index.ts instead of src/data.ts, change './images' to '../images'.
const images = import.meta.glob('./images/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const img = (file: string) => images[`./images/${file}`]

export const ARTWORKS: Artwork[] = [
  // Rendered · bust
  { id: 'bustrender1', src: img('bustrender1.png'), alt: 'Cat-eared boy in a hoodie resting his chin on his hand', finish: 'rendered', framing: 'bust' },
  { id: 'bustrender2', src: img('bustrender2.png'), alt: 'Woman with glasses and hoop earrings humming, music notes beside her', finish: 'rendered', framing: 'bust' },
  { id: 'bustrender3', src: img('bustrender3.png'), alt: 'Painterly portrait of a girl with a black bob and a pink collar', finish: 'rendered', framing: 'bust' },
  { id: 'bustrender4', src: img('bustrender4.png'), alt: 'Teal-haired girl with a spiked choker holding a taco', finish: 'rendered', framing: 'bust' },
  { id: 'bustrender5', src: img('bustrender5.png'), alt: 'Glitch-art portrait with stacked warning dialogs', finish: 'rendered', framing: 'bust' },
  { id: 'bustrender6', src: img('bustrender6.png'), alt: 'Green pony creature with orange spots on a dark background', finish: 'rendered', framing: 'bust' },
  // Rendered · torso
  { id: 'halfbodyrender1', src: img('halfbodyrender1.png'), alt: 'Poster-style girl with a swirl eye over large type', finish: 'rendered', framing: 'torso' },
  { id: 'halfbodyrender2', src: img('halfbodyrender2.jpg'), alt: 'Long-haired man in white robes with a headband', finish: 'rendered', framing: 'torso' },
  { id: 'halfbodyrender3', src: img('halfbodyrender3.png'), alt: 'Cat-eared boy in a hoodie waving with a grin', finish: 'rendered', framing: 'torso' },
  { id: 'halfbodyrender4', src: img('halfbodyrender4.png'), alt: 'Cat-eared boy in a hoodie looking upward', finish: 'rendered', framing: 'torso' },
  { id: 'halfbodyrender5', src: img('halfbodyrender5.png'), alt: 'Smiling girl with a headband in a pink framed character card', finish: 'rendered', framing: 'torso' },
  // Sketch · bust
  { id: 'bustsketch1', src: img('bustsketch1.png'), alt: 'Blue line sketch of a wavy-haired girl with wide eyes and a finger in her open mouth', finish: 'sketch', framing: 'bust' },
  { id: 'bustsketch2', src: img('bustsketch2.png'), alt: 'Navy sketch of a girl leaning over an ornate hand mirror', finish: 'sketch', framing: 'bust' },
  { id: 'bustsketch3', src: img('bustsketch3.png'), alt: 'Blue sketch of a girl in a frilly maid outfit with a hair ribbon, smiling with a tear', finish: 'sketch', framing: 'bust' },
  { id: 'bustsketch4', src: img('bustsketch4.png'), alt: 'Blue sketch of a character framing one eye with both hands', finish: 'sketch', framing: 'bust' },
  { id: 'bustsketch5', src: img('bustsketch5.png'), alt: 'Purple sketch of a short-haired character with a sideways glance', finish: 'sketch', framing: 'bust' },
  { id: 'bustsketch6', src: img('bustsketch6.png'), alt: 'Purple sketch of a smiling short-haired character in a scarf, holding a ribbon', finish: 'sketch', framing: 'bust' },
  { id: 'bustsketch7', src: img('bustsketch7.png'), alt: 'Purple sketch of a smirking character looking down, with a high ponytail and epaulettes', finish: 'sketch', framing: 'bust' },
  { id: 'bustsketch11', src: img('bustsketch11.png'), alt: 'Black and white portrait of a girl with large butterfly wings in her hair', finish: 'sketch', framing: 'bust' },
  { id: 'bustsketch12', src: img('bustsketch12.png'), alt: 'Black and white sketch of a long-haired girl with her hand at her chin', finish: 'sketch', framing: 'bust' },
  { id: 'bustsketch13', src: img('bustsketch13.png'), alt: 'Black and white sketch of two girls leaning their heads together', finish: 'sketch', framing: 'bust' },
  // Sketch · torso
  { id: 'halfbodysketch1', src: img('halfbodysketch1.png'), alt: 'Grinning ponytailed character in a wrapped robe with a question mark', finish: 'sketch', framing: 'torso' },
  { id: 'halfbodysketch2', src: img('halfbodysketch2.png'), alt: 'Two martial artists in white robes, one holding a wooden sword', finish: 'sketch', framing: 'torso' },
  { id: 'halfbodysketch3', src: img('halfbodysketch3.png'), alt: 'Blue line sketch of two girls with headbands, one surrounded by hearts', finish: 'sketch', framing: 'torso' },
  { id: 'halfbodysketch4', src: img('halfbodysketch4.png'), alt: 'Laughing woman in a blue strapless dress with arms raised', finish: 'sketch', framing: 'torso' },
  { id: 'halfbodysketch5', src: img('halfbodysketch5.png'), alt: 'Pink-haired girl with glasses taking a selfie in bed with plushies', finish: 'sketch', framing: 'torso' },
  { id: 'halfbodysketch6', src: img('halfbodysketch6.png'), alt: 'Monochrome sketch of a short-haired figure looking back over the shoulder', finish: 'sketch', framing: 'torso' },
  { id: 'halfbodysketch7', src: img('halfbodysketch7.png'), alt: 'Couple by the sea with speech bubbles saying we made it and yes', finish: 'sketch', framing: 'torso' },
  // Sketch · full body
  { id: 'fullbodysketch1', src: img('fullbodysketch1.png'), alt: 'Pastel twin-tailed girl jumping with a peace sign', finish: 'sketch', framing: 'fullbody' },
  { id: 'fullbodysketch2', src: img('fullbodysketch2.png'), alt: 'Two cheerleaders sitting with pom-poms raised', finish: 'sketch', framing: 'fullbody' },
  { id: 'fullbodysketch3', src: img('fullbodysketch3.png'), alt: 'Line sketch of two sisters sitting hand in hand', finish: 'sketch', framing: 'fullbody' },
  { id: 'fullbodysketch4', src: img('fullbodysketch4.png'), alt: 'Girl in a school uniform lifting the hem of her red skirt', finish: 'sketch', framing: 'fullbody' },
  // Chibi
  { id: 'chibi1', src: img('chibi.png'), alt: 'Character sheet of a purple cat-eared girl in a yellow sweater and navy dress, with colour palette', finish: 'chibi' },
]