import { Link } from 'react-router-dom'
import PageMeta from '../components/common/PageMeta'

function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Page Not Found"
        description="The page you requested is unavailable."
      />
      <section className="section">
        <div className="site-padding text-center">
          <h1 className="font-display text-5xl leading-none text-[#201712]">Page not found</h1>
          <p className="mt-3 text-sm text-[#5c4b40]">
            That page does not exist. Return to home.
          </p>
          <Link to="/" className="btn-primary mt-6">Back to Home</Link>
        </div>
      </section>
    </>
  )
}

export default NotFoundPage
