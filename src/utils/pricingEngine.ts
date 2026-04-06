import { pricingConfig } from '../config/pricing'
import type { DeliveryMethod, ProductId } from '../types'

export interface OrderTotalInput {
  productId: ProductId
  deliveryMethod: DeliveryMethod
  deliveryZone: 'pickup' | 'localZone1' | 'localZone2' | 'customQuote'
  organicUpgrade: boolean
  customCarving: boolean
  rushOrder: boolean
}

export interface OrderTotalBreakdown {
  basketPrice: number
  addOnsTotal: number
  deliveryFee: number
  finalTotal: number
  deliveryFeePending: boolean
  estimatedProfit: number
}

const currencyRound = (value: number): number => Math.round(value * 100) / 100

export const getBasketFinalPrice = (productId: ProductId): number =>
  pricingConfig.basketFinalPrices[productId]

export const getDeliveryFee = (deliveryMethod: DeliveryMethod): number => {
  // Delivery fee is not auto-calculated yet.
  if (deliveryMethod === 'pickup') {
    return 0
  }

  return 0
}

const getAddOnsTotal = (
  productId: ProductId,
  organicUpgrade: boolean,
  customCarving: boolean,
  rushOrder: boolean,
): number => {
  let addOns = 0

  if (organicUpgrade && productId !== 'organicArtisanal') {
    addOns += pricingConfig.addOnFees.organicUpgrade
  }

  if (customCarving) {
    addOns += pricingConfig.addOnFees.customCarving
  }

  if (rushOrder) {
    addOns += pricingConfig.addOnFees.rushOrder
  }

  return addOns
}

export const calculateOrderTotal = (
  input: OrderTotalInput,
): OrderTotalBreakdown => {
  const basketPrice = getBasketFinalPrice(input.productId)
  const addOnsTotal = getAddOnsTotal(
    input.productId,
    input.organicUpgrade,
    input.customCarving,
    input.rushOrder,
  )
  const deliveryFee = getDeliveryFee(input.deliveryMethod)
  const finalTotal = basketPrice + addOnsTotal + deliveryFee

  const internalCost = pricingConfig.internalEstimatedCost[input.productId]
  const estimatedProfit = finalTotal - internalCost

  return {
    basketPrice: currencyRound(basketPrice),
    addOnsTotal: currencyRound(addOnsTotal),
    deliveryFee: currencyRound(deliveryFee),
    finalTotal: currencyRound(finalTotal),
    deliveryFeePending: input.deliveryMethod === 'delivery',
    estimatedProfit: currencyRound(estimatedProfit),
  }
}

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)
