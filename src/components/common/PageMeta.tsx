import { Helmet } from 'react-helmet-async'
import { brandConfig } from '../../config/brand'

interface PageMetaProps {
  title: string
  description: string
}

function PageMeta({ title, description }: PageMetaProps) {
  const fullTitle = 'Watermelon Baskets'
  const socialTitle = `${title} | ${brandConfig.businessName}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}

export default PageMeta
