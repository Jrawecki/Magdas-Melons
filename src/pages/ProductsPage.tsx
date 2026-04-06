import ProductCard from '../components/cards/ProductCard'
import CTASection from '../components/sections/CTASection'
import SectionHeader from '../components/sections/SectionHeader'
import PageMeta from '../components/common/PageMeta'
import { pricingConfig } from '../config/pricing'
import { includedFruits, productsConfig } from '../config/products'
import { formatCurrency } from '../utils/pricingEngine'

function ProductsPage() {
  return (
    <>
      <PageMeta
        title="Order"
        description="Choose a watermelon basket package and place your order."
      />

      <section className="section band-white">
        <div className="site-padding">
          <SectionHeader
            eyebrow="Packages"
            title="Choose your package"
            description="Click Place Order on the package you want."
          />

          <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {productsConfig.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section band-green">
        <div className="site-padding grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-4xl leading-none text-[#141313]">Fruit options</h3>
            <p className="mt-3 text-sm text-[#1f4f3d]">You can choose which fruits are included during checkout:</p>
            <ul className="mt-3 space-y-1 text-sm text-[#1f4f3d]">
              {includedFruits.map((fruit) => (
                <li key={fruit}>• {fruit}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-4xl leading-none text-[#141313]">Add-ons</h3>
            <ul className="mt-3 space-y-1 text-sm text-[#1f4f3d]">
              <li>• Organic fruit upgrade: {formatCurrency(pricingConfig.addOnFees.organicUpgrade)}</li>
              <li>• Custom carving detail: {formatCurrency(pricingConfig.addOnFees.customCarving)}</li>
              <li>• Rush order: {formatCurrency(pricingConfig.addOnFees.rushOrder)}</li>
              <li>• Delivery fee: confirmed after address (not auto-calculated yet)</li>
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="Need help choosing a package?"
        description="Use the contact page and we can help you decide."
        primaryLabel="Contact Us"
        primaryTo="/contact"
      />
    </>
  )
}

export default ProductsPage
