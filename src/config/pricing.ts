// Safe edits: basket prices are final basket totals for pickup.
// Delivery fee logic is intentionally pending and not automatically calculated yet.

import type { DeliveryMethod, DeliveryZone, ProductId } from '../types'

export interface PricingConfig {
  basketFinalPrices: Record<ProductId, number>
  addOnFees: {
    organicUpgrade: number
    customCarving: number
    rushOrder: number
  }
  internalEstimatedCost: Record<ProductId, number>
}

export const pricingConfig: PricingConfig = {
  basketFinalPrices: {
    classic: 65,
    signature: 80,
    personalized: 105,
    organicArtisanal: 120,
  },
  addOnFees: {
    organicUpgrade: 15,
    customCarving: 12,
    rushOrder: 20,
  },
  internalEstimatedCost: {
    classic: 34,
    signature: 44,
    personalized: 58,
    organicArtisanal: 71,
  },
}

export const deliveryZoneLabels: Record<DeliveryZone, string> = {
  pickup: 'Pickup',
  localZone1: 'Local Zone 1',
  localZone2: 'Local Zone 2',
  customQuote: 'Custom Area (Quote)',
}

export const deliveryMethodLabels: Record<DeliveryMethod, string> = {
  pickup: 'Pickup',
  delivery: 'Delivery',
}
