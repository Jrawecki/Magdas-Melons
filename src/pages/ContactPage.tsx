import SectionHeader from '../components/sections/SectionHeader'
import PageMeta from '../components/common/PageMeta'
import { brandConfig } from '../config/brand'

function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact"
        description="Contact Magda's Melons for questions about local basket orders."
      />

      <section className="section band-white">
        <div className="site-padding">
          <SectionHeader
            eyebrow="Contact"
            title="Questions before ordering?"
            description="Reach out and we can help you choose a basket style and pickup or delivery timing."
          />

          <div className="mt-6 grid gap-4 text-base text-[#27312c] sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#2b624c]">Phone</p>
              <p className="mt-1">{brandConfig.contactPhone}</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#2b624c]">Email</p>
              <p className="mt-1">{brandConfig.contactEmail}</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#2b624c]">Service</p>
              <p className="mt-1">Local pickup and local delivery.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
