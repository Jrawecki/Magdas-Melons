// Safe edits: update basket names, descriptions, image file paths, and optional fruit add-ons here.

import type { ProductConfig } from '../types'

export const productsConfig: ProductConfig[] = [
  {
    id: 'classic',
    name: 'Classic Watermelon Basket',
    tagline: 'Clean carved basket with handle and mixed fruit.',
    description:
      'A carved watermelon basket with handle, filled with fresh fruit and arranged for simple, everyday celebrations.',
    imagePath: '/watermelon/IMG_0250.jpeg',
  },
  {
    id: 'signature',
    name: 'Signature Carved Basket',
    tagline: 'Extra carving detail and polished presentation.',
    description:
      'A carved basket with decorative detail for parties, hosting tables, and gift moments.',
    badges: ['Most Popular'],
    imagePath: '/watermelon/IMG_0252.jpeg',
  },
  {
    id: 'personalized',
    name: 'Personalized Basket',
    tagline: 'Custom carving details for your occasion.',
    description:
      'A carved basket customized with your event theme, initials, or requested style notes.',
    badges: ['Custom'],
    imagePath: '/watermelon/IMG_0260.jpeg',
  },
  {
    id: 'organicArtisanal',
    name: 'Organic Artisanal Basket',
    tagline: 'Organic fruit and premium hand-finished carving.',
    description:
      'Our premium carved basket made with organic fruit selection and a refined handmade finish.',
    badges: ['Organic', 'Premium'],
    imagePath: '/watermelon/IMG_0247.jpeg',
  },
]

export const includedFruits: string[] = [
  'Watermelon',
  'Strawberries',
  'Blueberries',
  'Blackberries',
  'Raspberries',
  'Grapes',
]

export const optionalFruitAddOns: string[] = [
  'Dark chocolate covered strawberries',
  'White chocolate covered strawberries',
]


