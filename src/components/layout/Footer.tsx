import { brandConfig } from '../../config/brand'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-14 bg-[#141313] text-[#f8f7f4]">
      <div className="site-padding py-10">
        <div className="grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <section>
            <h2 className="font-display text-2xl">{brandConfig.businessName}</h2>
            <p className="mt-2 text-[#dceade]">{brandConfig.tagline}</p>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f6d8df]">Service</h3>
            <p className="mt-2 text-[#dceade]">{brandConfig.serviceArea}</p>
            <p className="mt-1 text-[#dceade]">Pickup and local delivery only.</p>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f6d8df]">Contact</h3>
            <p className="mt-2 text-[#dceade]">{brandConfig.contactEmail}</p>
            <p className="text-[#dceade]">{brandConfig.contactPhone}</p>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f6d8df]">Social</h3>
            <div className="mt-2 flex gap-3">
              <a href={brandConfig.instagramUrl} target="_blank" rel="noreferrer" className="text-[#dceade] underline-offset-2 hover:underline">
                Instagram
              </a>
              <a href={brandConfig.facebookUrl} target="_blank" rel="noreferrer" className="text-[#dceade] underline-offset-2 hover:underline">
                Facebook
              </a>
            </div>
            <p className="mt-3 text-xs text-[#b6c8ba]">© {year} {brandConfig.businessName}</p>
          </section>
        </div>
      </div>
    </footer>
  )
}

export default Footer
