import { Navigate, useParams } from 'react-router-dom'
import InquiryForm from '../components/features/InquiryForm'
import PageMeta from '../components/common/PageMeta'
import SectionHeader from '../components/sections/SectionHeader'
import { productsConfig } from '../config/products'
import type { ProductId } from '../types'

function OrderRequestPage() {
  const { productId } = useParams<{ productId: ProductId }>()

  const product = productsConfig.find((item) => item.id === productId)

  if (!productId || !product) {
    return <Navigate to="/order" replace />
  }

  return (
    <>
      <PageMeta
        title={`Order ${product.name}`}
        description={`Place your order request for ${product.name}.`}
      />

      <section className="section band-green">
        <div className="site-padding grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeader
              eyebrow="Order Request"
              title={product.name}
              description="Complete the form to place your order for this basket."
            />
            <div className="mt-6 mx-auto max-w-md overflow-hidden rounded-xl bg-[#e9f0eb] shadow-soft">
              <div className="aspect-[4/5]">
                <img
                  src={product.imagePath}
                  alt={product.name}
                  className="h-full w-full object-cover object-[50%_68%]"
                />
              </div>
            </div>
          </div>

          <InquiryForm productId={product.id} />
        </div>
      </section>
    </>
  )
}

export default OrderRequestPage
