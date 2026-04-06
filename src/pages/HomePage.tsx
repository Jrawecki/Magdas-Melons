import { Link } from 'react-router-dom'
import ProductCard from '../components/cards/ProductCard'
import GalleryGrid from '../components/features/GalleryGrid'
import CTASection from '../components/sections/CTASection'
import HeroSection from '../components/sections/HeroSection'
import SectionHeader from '../components/sections/SectionHeader'
import PageMeta from '../components/common/PageMeta'
import { galleryItems } from '../config/gallery'
import { productsConfig } from '../config/products'

function HomePage() {
  return (
    <>
      <PageMeta
        title="Hand-Carved Watermelon Baskets"
        description="Order handcrafted carved watermelon baskets for pickup or local delivery."
      />

      <HeroSection />

      <section className="section band-pink">
        <div className="site-padding">
          <SectionHeader
            eyebrow="Basket Packages"
            title="Pick your basket package"
            description="Select a package below to start placing your order."
          />
          <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {productsConfig.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8">
            <Link to="/order" className="btn-primary">See all package details</Link>
          </div>
        </div>
      </section>

      <section className="section band-green">
        <div className="site-padding">
          <SectionHeader
            eyebrow="How Ordering Works"
            title="Choose package, then place order"
            description="The order form only appears after you select a package."
          />
          <ol className="mt-5 grid gap-3 text-sm text-[#1f4f3d] sm:grid-cols-3">
            <li><span className="font-semibold text-[#141313]">1.</span> Choose your basket package.</li>
            <li><span className="font-semibold text-[#141313]">2.</span> Click Place Order on that package.</li>
            <li><span className="font-semibold text-[#141313]">3.</span> Fill in delivery or pickup details.</li>
          </ol>
        </div>
      </section>

      <section className="section band-white">
        <div className="site-padding">
          <SectionHeader
            eyebrow="Gallery"
            title="Real watermelon bowl photos"
            description="Using your actual bowl photos from your local folder."
          />
          <div className="mt-6">
            <GalleryGrid items={galleryItems} compact />
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to place an order?"
        description="Choose any package and click Place Order."
        primaryLabel="Go To Packages"
        primaryTo="/order"
      />
    </>
  )
}

export default HomePage
