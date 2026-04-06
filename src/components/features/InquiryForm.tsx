import { useMemo, useState } from 'react'
import { Turnstile } from 'react-turnstile'
import {
  includedFruits,
  optionalFruitAddOns,
  productsConfig,
} from '../../config/products'
import type { DeliveryMethod, PreferredContactMethod, ProductId } from '../../types'
import { calculateOrderTotal, formatCurrency } from '../../utils/pricingEngine'

interface InquiryFormProps {
  productId: ProductId
}

interface InquiryFormState {
  fullName: string
  phone: string
  email: string
  preferredContactMethod: PreferredContactMethod
  eventDate: string
  occasion: string
  deliveryMethod: DeliveryMethod
  deliveryStreet: string
  deliveryCity: string
  deliveryState: string
  deliveryZip: string
  selectedFruits: string[]
  selectedOptionalFruits: string[]
  organicUpgrade: boolean
  customCarving: boolean
  customCarvingDetails: string
  rushOrder: boolean
  notes: string
}

const initialState = (): InquiryFormState => ({
  fullName: '',
  phone: '',
  email: '',
  preferredContactMethod: 'phone',
  eventDate: '',
  occasion: '',
  deliveryMethod: 'pickup',
  deliveryStreet: '',
  deliveryCity: '',
  deliveryState: '',
  deliveryZip: '',
  selectedFruits: [...includedFruits],
  selectedOptionalFruits: [],
  organicUpgrade: false,
  customCarving: false,
  customCarvingDetails: '',
  rushOrder: false,
  notes: '',
})

function InquiryForm({ productId }: InquiryFormProps) {
  const [formState, setFormState] = useState<InquiryFormState>(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [widgetKey, setWidgetKey] = useState(0)
  const turnstileSiteKey = (import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '').trim()
  const orderApiPath = (import.meta.env.VITE_ORDER_API_PATH ?? '/api/order').trim() || '/api/order'

  const selectedProduct = productsConfig.find((product) => product.id === productId)

  const updateField = <K extends keyof InquiryFormState>(
    key: K,
    value: InquiryFormState[K],
  ) => {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const toggleFruit = (fruit: string) => {
    setFormState((current) => {
      const exists = current.selectedFruits.includes(fruit)
      return {
        ...current,
        selectedFruits: exists
          ? current.selectedFruits.filter((item) => item !== fruit)
          : [...current.selectedFruits, fruit],
      }
    })
  }

  const toggleOptionalFruit = (fruit: string) => {
    setFormState((current) => {
      const exists = current.selectedOptionalFruits.includes(fruit)
      return {
        ...current,
        selectedOptionalFruits: exists
          ? current.selectedOptionalFruits.filter((item) => item !== fruit)
          : [...current.selectedOptionalFruits, fruit],
      }
    })
  }

  const total = useMemo(
    () =>
      calculateOrderTotal({
        productId,
        deliveryMethod: formState.deliveryMethod,
        deliveryZone: formState.deliveryMethod === 'pickup' ? 'pickup' : 'localZone1',
        organicUpgrade: formState.organicUpgrade,
        customCarving: formState.customCarving,
        rushOrder: formState.rushOrder,
      }),
    [formState, productId],
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)
    setIsSubmitting(true)

    if (!selectedProduct) {
      setSubmitError('Unable to send your order request right now.')
      setIsSubmitting(false)
      return
    }

    if (!turnstileSiteKey) {
      setSubmitError('Captcha is not configured yet.')
      setIsSubmitting(false)
      return
    }

    if (!turnstileToken.trim()) {
      setSubmitError('Please complete the captcha before submitting.')
      setIsSubmitting(false)
      return
    }

    const deliveryAddress =
      formState.deliveryMethod === 'delivery'
        ? [
            formState.deliveryStreet,
            formState.deliveryCity,
            formState.deliveryState,
            formState.deliveryZip,
          ]
            .filter(Boolean)
            .join(', ')
        : 'Pickup'

    const payload = {
      _subject: `New Order Request - ${selectedProduct.name}`,
      _template: 'table',
      name: formState.fullName,
      phone: formState.phone,
      email: formState.email,
      _replyto: formState.email,
      preferred_contact: formState.preferredContactMethod,
      event_date: formState.eventDate || 'Not provided',
      occasion: formState.occasion || 'Not provided',
      product_name: selectedProduct.name,
      delivery_method: formState.deliveryMethod,
      delivery_address: deliveryAddress,
      standard_fruits:
        formState.selectedFruits.length > 0
          ? formState.selectedFruits.join(', ')
          : 'None selected',
      optional_fruits:
        formState.selectedOptionalFruits.length > 0
          ? formState.selectedOptionalFruits.join(', ')
          : 'None',
      organic_upgrade: formState.organicUpgrade ? 'Yes' : 'No',
      custom_carving: formState.customCarving ? 'Yes' : 'No',
      custom_carving_details: formState.customCarvingDetails || 'None',
      rush_order: formState.rushOrder ? 'Yes' : 'No',
      notes: formState.notes || 'None',
      basket_price_preview: formatCurrency(total.basketPrice),
      add_ons_preview: formatCurrency(total.addOnsTotal),
      total_preview: formatCurrency(total.finalTotal),
      submitted_from: window.location.href,
      turnstileToken: turnstileToken.trim(),
    }

    try {
      const response = await fetch(orderApiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const responseText = await response.text()
      let result: { success?: boolean; message?: string } = {}
      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText) as { success?: boolean; message?: string }
        } catch {
          result = {}
        }
      }

      if (!response.ok || !result.success) {
        const statusMessage = `Request failed (${response.status}).`
        throw new Error(result.message || statusMessage)
      }

      setSubmitted(true)
      setTurnstileToken('')
      setFormState(initialState())
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Unable to send your order request right now.',
      )
      setTurnstileToken('')
      setWidgetKey((current) => current + 1)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!selectedProduct) {
    return null
  }

  if (submitted) {
    return (
      <section className="section-tight">
        <p className="eyebrow">Request Sent</p>
        <h3 className="mt-2 font-display text-4xl leading-none text-[#141313]">
          Order request received.
        </h3>
        <p className="mt-3 text-sm text-[#2a302c]">
          We will contact you shortly to confirm your {selectedProduct.name} details.
        </p>
        <button
          type="button"
          className="btn-primary mt-6"
          onClick={() => {
            setSubmitted(false)
            setFormState(initialState())
          }}
        >
          Submit Another Request
        </button>
      </section>
    )
  }

  return (
    <form className="section-tight" onSubmit={handleSubmit}>
      <div className="mb-5 rounded-xl bg-[#f0eee8] p-4">
        <p className="text-sm font-semibold text-[#141313]">Ordering: {selectedProduct.name}</p>
        <p className="mt-1 text-sm text-[#27312c]">
          Basket price: {formatCurrency(total.basketPrice)}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field-label sm:col-span-2">
          Full Name
          <input
            required
            className="field"
            type="text"
            value={formState.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
          />
        </label>

        <label className="field-label">
          Phone
          <input
            required
            className="field"
            type="tel"
            value={formState.phone}
            onChange={(event) => updateField('phone', event.target.value)}
          />
        </label>

        <label className="field-label">
          Email
          <input
            required
            className="field"
            type="email"
            value={formState.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </label>

        <label className="field-label">
          Preferred Contact
          <select
            className="field"
            value={formState.preferredContactMethod}
            onChange={(event) =>
              updateField('preferredContactMethod', event.target.value as PreferredContactMethod)
            }
          >
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="text">Text</option>
          </select>
        </label>

        <label className="field-label">
          Event Date
          <input
            className="field"
            type="date"
            value={formState.eventDate}
            onChange={(event) => updateField('eventDate', event.target.value)}
          />
        </label>

        <label className="field-label sm:col-span-2">
          Occasion
          <input
            className="field"
            type="text"
            placeholder="Birthday, shower, gift, holiday, etc."
            value={formState.occasion}
            onChange={(event) => updateField('occasion', event.target.value)}
          />
        </label>

        <label className="field-label">
          Pickup or Delivery
          <select
            className="field"
            value={formState.deliveryMethod}
            onChange={(event) =>
              updateField('deliveryMethod', event.target.value as DeliveryMethod)
            }
          >
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery</option>
          </select>
        </label>

        {formState.deliveryMethod === 'delivery' && (
          <>
            <label className="field-label sm:col-span-2">
              Delivery Street Address
              <input
                required
                className="field"
                type="text"
                value={formState.deliveryStreet}
                onChange={(event) => updateField('deliveryStreet', event.target.value)}
              />
            </label>

            <label className="field-label">
              City
              <input
                required
                className="field"
                type="text"
                value={formState.deliveryCity}
                onChange={(event) => updateField('deliveryCity', event.target.value)}
              />
            </label>

            <label className="field-label">
              State
              <input
                required
                className="field"
                type="text"
                value={formState.deliveryState}
                onChange={(event) => updateField('deliveryState', event.target.value)}
              />
            </label>

            <label className="field-label">
              ZIP Code
              <input
                required
                className="field"
                type="text"
                value={formState.deliveryZip}
                onChange={(event) => updateField('deliveryZip', event.target.value)}
              />
            </label>
          </>
        )}

        <fieldset className="sm:col-span-2">
          <legend className="field-label">Standard fruit options</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {includedFruits.map((fruit) => (
              <label key={fruit} className="flex items-center gap-2 text-sm text-[#27312c]">
                <input
                  type="checkbox"
                  checked={formState.selectedFruits.includes(fruit)}
                  onChange={() => toggleFruit(fruit)}
                />
                {fruit}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="sm:col-span-2">
          <legend className="field-label">Optional (not included by default)</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {optionalFruitAddOns.map((fruit) => (
              <label key={fruit} className="flex items-center gap-2 text-sm text-[#27312c]">
                <input
                  type="checkbox"
                  checked={formState.selectedOptionalFruits.includes(fruit)}
                  onChange={() => toggleOptionalFruit(fruit)}
                />
                {fruit}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="field-label flex items-center gap-2 text-sm text-[#27312c]">
          <input
            type="checkbox"
            checked={formState.organicUpgrade}
            onChange={(event) => updateField('organicUpgrade', event.target.checked)}
          />
          Organic fruit upgrade
        </label>

        <label className="field-label flex items-center gap-2 text-sm text-[#27312c]">
          <input
            type="checkbox"
            checked={formState.customCarving}
            onChange={(event) => updateField('customCarving', event.target.checked)}
          />
          Add custom carving detail
        </label>

        {formState.customCarving && (
          <label className="field-label sm:col-span-2">
            Custom carving details
            <textarea
              className="field min-h-[90px]"
              value={formState.customCarvingDetails}
              onChange={(event) => updateField('customCarvingDetails', event.target.value)}
              placeholder="Names, initials, theme, words, style, etc."
            />
          </label>
        )}

        <label className="field-label flex items-center gap-2 text-sm text-[#27312c] sm:col-span-2">
          <input
            type="checkbox"
            checked={formState.rushOrder}
            onChange={(event) => updateField('rushOrder', event.target.checked)}
          />
          Rush order
        </label>

        <label className="field-label sm:col-span-2">
          Notes
          <textarea
            className="field min-h-[100px]"
            value={formState.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            placeholder="Any timing details or special requests"
          />
        </label>
      </div>

      <section className="mt-7 rounded-xl bg-[#f0eee8] p-4 text-sm text-[#27312c]">
        <h4 className="font-semibold text-[#141313]">Current total preview</h4>
        <dl className="mt-2 space-y-1">
          <div className="flex justify-between"><dt>Basket</dt><dd>{formatCurrency(total.basketPrice)}</dd></div>
          <div className="flex justify-between"><dt>Add-ons</dt><dd>{formatCurrency(total.addOnsTotal)}</dd></div>
          {formState.deliveryMethod === 'pickup' ? (
            <div className="flex justify-between"><dt>Delivery</dt><dd>{formatCurrency(0)}</dd></div>
          ) : (
            <div className="flex justify-between"><dt>Delivery</dt><dd>To be confirmed from address</dd></div>
          )}
          <div className="flex justify-between pt-1 font-semibold text-[#141313]"><dt>Current total</dt><dd>{formatCurrency(total.finalTotal)}</dd></div>
        </dl>
      </section>

      {turnstileSiteKey ? (
        <div className="mt-5">
          <p className="mb-2 text-xs uppercase tracking-[0.1em] text-[#2b624c]">
            Captcha verification
          </p>
          <Turnstile
            key={widgetKey}
            sitekey={turnstileSiteKey}
            theme="light"
            onVerify={(token) => {
              setTurnstileToken(token)
              setSubmitError(null)
            }}
            onExpire={() => setTurnstileToken('')}
            onError={() => {
              setTurnstileToken('')
              setSubmitError('Captcha failed to load. Refresh and try again.')
            }}
          />
        </div>
      ) : (
        <p className="mt-5 rounded-lg border border-[#d17f7f] bg-[#fff1f1] px-3 py-2 text-sm text-[#7d2020]">
          Captcha is not configured. Set `VITE_TURNSTILE_SITE_KEY` in your environment.
        </p>
      )}

      {submitError && (
        <p className="mt-4 rounded-lg border border-[#d17f7f] bg-[#fff1f1] px-3 py-2 text-sm text-[#7d2020]">
          {submitError}
        </p>
      )}

      <button type="submit" className="btn-primary mt-6" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Order Request'}
      </button>
    </form>
  )
}

export default InquiryForm
