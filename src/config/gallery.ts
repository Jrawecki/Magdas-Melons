// Safe edits: update gallery image paths and captions here.

export interface GalleryItem {
  title: string
  caption: string
  occasion: string
  imagePath: string
}

export const galleryItems: GalleryItem[] = [
  {
    title: 'Birthday Basket',
    caption: 'Carved basket centerpiece for birthday tables.',
    occasion: 'Birthdays',
    imagePath: '/watermelon/IMG_0254.jpeg',
  },
  {
    title: 'Baby Shower Basket',
    caption: 'Soft, elegant basket styling for showers.',
    occasion: 'Baby Showers',
    imagePath: '/watermelon/IMG_0258.jpeg',
  },
  {
    title: 'Gift Basket',
    caption: 'Hand-carved basket prepared as a thoughtful gift.',
    occasion: 'Gifts',
    imagePath: '/watermelon/IMG_0264.jpeg',
  },
  {
    title: 'Holiday Basket',
    caption: 'Seasonal fruit display for gatherings and hosting.',
    occasion: 'Holidays',
    imagePath: '/watermelon/IMG_0269.jpeg',
  },
  {
    title: 'Premium Custom Basket',
    caption: 'Detailed personalized carving work for milestone events.',
    occasion: 'Custom Events',
    imagePath: '/watermelon/IMG_0275.jpeg',
  },
]
