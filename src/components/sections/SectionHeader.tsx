import type { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  center?: boolean
  actions?: ReactNode
}

function SectionHeader({
  eyebrow,
  title,
  description,
  center = false,
  actions,
}: SectionHeaderProps) {
  return (
    <header className={center ? 'text-center' : 'text-left'}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 font-display text-4xl leading-none text-[#141313] sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-3xl text-base text-[#2d3b34]">{description}</p>
      )}
      {actions && <div className="mt-5">{actions}</div>}
    </header>
  )
}

export default SectionHeader
