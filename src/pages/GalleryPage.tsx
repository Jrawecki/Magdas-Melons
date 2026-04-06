import GalleryGrid from '../components/features/GalleryGrid'
import CTASection from '../components/sections/CTASection'
import SectionHeader from '../components/sections/SectionHeader'
import PageMeta from '../components/common/PageMeta'
import { galleryItems } from '../config/gallery'

function GalleryPage() {
  return (
    <>
      <PageMeta
        title="Gallery"
        description="Browse carved watermelon basket photos."
      />

      <section className="section band-white">
        <div className="site-padding">
          <SectionHeader
            eyebrow="Gallery"
            title="Watermelon bowl photos"
            description="Real photos from your watermelon bowls folder."
          />

          <div className="mt-6">
            <GalleryGrid items={galleryItems} />
          </div>
        </div>
      </section>

      <CTASection
        title="See a style you like?"
        description="Go to packages and place your order from that package card."
        primaryLabel="Go To Packages"
        primaryTo="/order"
      />
    </>
  )
}

export default GalleryPage
