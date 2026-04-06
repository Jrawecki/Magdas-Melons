import { Link } from 'react-router-dom'
import { brandConfig } from '../../config/brand'

function HeroSection() {
  return (
    <section className="section band-white">
      <div className="site-padding">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow">Handmade locally</p>
            <h1 className="mt-2 font-display text-5xl leading-[0.96] text-[#141313] sm:text-6xl lg:text-7xl">
              Hand Carved Watermelon Baskets for Any Occasion
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[#2d3b34]">
              Every basket is carved with a handle and filled with fresh fruit for gifts, parties, and special events.
            </p>
            <p className="mt-2 max-w-2xl text-sm text-[#3f2b34]">{brandConfig.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/order" className="btn-primary">Choose a Basket</Link>
              <Link to="/gallery" className="btn-secondary">View Photos</Link>
            </div>
          </div>

          <figure className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-[#e9f0eb] shadow-soft">
            <div className="aspect-[4/5]">
              <img
                src="/watermelon/IMG_0271.jpeg"
                alt="Carved watermelon basket filled with fresh fruit"
                className="h-full w-full object-cover object-[50%_68%]"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default HeroSection


