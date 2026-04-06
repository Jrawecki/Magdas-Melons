import { Link } from 'react-router-dom'

interface CTASectionProps {
  title: string
  description: string
  primaryLabel: string
  primaryTo: string
  secondaryLabel?: string
  secondaryTo?: string
}

function CTASection({
  title,
  description,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
}: CTASectionProps) {
  return (
    <section className="section band-pink">
      <div className="site-padding">
        <h3 className="font-display text-4xl leading-none text-[#141313] sm:text-5xl">{title}</h3>
        <p className="mt-3 max-w-2xl text-base text-[#3f2b34]">{description}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to={primaryTo} className="btn-primary">{primaryLabel}</Link>
          {secondaryLabel && secondaryTo && (
            <Link to={secondaryTo} className="btn-secondary">{secondaryLabel}</Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default CTASection
