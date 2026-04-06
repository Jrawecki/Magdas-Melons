import type { GalleryItem } from '../../config/gallery'

interface GalleryGridProps {
  items: GalleryItem[]
  compact?: boolean
}

function GalleryGrid({ items, compact = false }: GalleryGridProps) {
  const displayedItems = compact ? items.slice(0, 4) : items

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {displayedItems.map((item) => (
        <figure key={item.title} className="space-y-3">
          <div className="overflow-hidden rounded-xl bg-[#e9f0eb] shadow-soft">
            <div className="aspect-[4/5]">
              <img
                src={item.imagePath}
                alt={item.title}
                className="h-full w-full object-cover object-[50%_68%]"
              />
            </div>
          </div>
          <figcaption>
            <p className="eyebrow">{item.occasion}</p>
            <h3 className="mt-1 font-display text-3xl leading-none text-[#141313]">{item.title}</h3>
            <p className="mt-2 text-sm text-[#27312c]">{item.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default GalleryGrid
