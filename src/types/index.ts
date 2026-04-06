export type ProductId = 'classic' | 'signature' | 'personalized' | 'organicArtisanal'

export type DeliveryMethod = 'pickup' | 'delivery'

export type DeliveryZone = 'pickup' | 'localZone1' | 'localZone2' | 'customQuote'

export type PreferredContactMethod = 'phone' | 'email' | 'text'

export interface ProductConfig {
  id: ProductId
  name: string
  description: string
  tagline: string
  badges?: string[]
  imagePath: string
}
