import { Link } from 'react-router-dom'
import type { ProductConfig } from '../../types'
import { formatCurrency, getBasketFinalPrice } from '../../utils/pricingEngine'

interface ProductCardProps {
  product: ProductConfig
}

function ProductCard({ product }: ProductCardProps) {
  const price = getBasketFinalPrice(product.id)

  return (
    <article className="space-y-4">
      <figure className="overflow-hidden rounded-xl bg-[#e9f0eb] shadow-soft">
        <div className="aspect-[4/5]">
          <img
            src={product.imagePath}
            alt={product.name}
            className="h-full w-full object-cover object-[50%_68%]"
          />
        </div>
      </figure>

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-3xl leading-none text-[#141313]">{product.name}</h3>
        <p className="text-sm font-semibold text-[#1f4f3d]">{formatCurrency(price)}</p>
      </div>

      <p className="text-sm font-semibold text-[#2c4a3d]">{product.tagline}</p>
      <p className="text-sm text-[#27312c]">{product.description}</p>

      {product.badges && product.badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <span key={badge} className="text-xs font-semibold uppercase tracking-[0.1em] text-[#a53053]">
              {badge}
            </span>
          ))}
        </div>
      )}

      <Link to={`/order/${product.id}/request`} className="btn-primary">
        Place Order
      </Link>
    </article>
  )
}

export default ProductCard
