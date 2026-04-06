import CTASection from '../components/sections/CTASection'
import SectionHeader from '../components/sections/SectionHeader'
import PageMeta from '../components/common/PageMeta'

function AboutPage() {
  return (
    <>
      <PageMeta
        title="About"
        description="About our local handmade carved watermelon basket business."
      />

      <section className="section band-pink">
        <div className="site-padding">
          <SectionHeader
            eyebrow="About"
            title="A local handmade basket business"
            description="We focus on carved watermelon baskets with fresh fruit and clear local ordering."
          />

          <div className="mt-6 grid gap-6 text-sm text-[#3f2b34] md:grid-cols-2">
            <article>
              <h3 className="text-lg font-semibold text-[#141313]">Hand carved quality</h3>
              <p className="mt-2">Every basket is carved by hand with a handle and arranged carefully for presentation.</p>
            </article>
            <article>
              <h3 className="text-lg font-semibold text-[#141313]">Fresh to order</h3>
              <p className="mt-2">We prepare baskets close to your event date for freshness and quality.</p>
            </article>
            <article>
              <h3 className="text-lg font-semibold text-[#141313]">Local service only</h3>
              <p className="mt-2">Right now we serve local pickup and local delivery only.</p>
            </article>
            <article>
              <h3 className="text-lg font-semibold text-[#141313]">Made for real occasions</h3>
              <p className="mt-2">Birthdays, showers, gifts, holiday tables, and small events.</p>
            </article>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to order one?"
        description="Go to packages and choose the basket you want."
        primaryLabel="View Packages"
        primaryTo="/order"
      />
    </>
  )
}

export default AboutPage
