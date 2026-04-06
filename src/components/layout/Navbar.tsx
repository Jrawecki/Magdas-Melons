import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { brandConfig } from '../../config/brand'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Order', to: '/order' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[#c7ddd1] bg-[#edf7f1]">
      <div className="site-padding flex items-center justify-between py-4">
        <NavLink to="/" className="min-w-0" onClick={() => setMobileOpen(false)}>
          <p className="truncate font-display text-3xl leading-none text-[#141313] sm:text-5xl">
            {brandConfig.businessName}
          </p>
          <p className="mt-1 text-xs text-[#2b624c]">Carved watermelon baskets for local pickup and delivery</p>
        </NavLink>

        <button
          type="button"
          className="rounded-full border border-[#2b624c] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1f4f3d] lg:hidden"
          onClick={() => setMobileOpen((current) => !current)}
          aria-label="Open menu"
        >
          Menu
        </button>

        <nav className="hidden lg:block" aria-label="Main navigation">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-[#141313] text-white'
                        : 'text-[#1f4f3d] hover:bg-[#dcede3]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {mobileOpen && (
        <nav className="site-padding border-t border-[#c7ddd1] py-3 lg:hidden" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm font-semibold ${
                      isActive
                        ? 'bg-[#141313] text-white'
                        : 'text-[#1f4f3d] hover:bg-[#dcede3]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Navbar
