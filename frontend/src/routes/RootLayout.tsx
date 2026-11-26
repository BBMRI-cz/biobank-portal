import { House } from 'lucide-react'
import { NavLink, Outlet } from 'react-router'

import { cn } from '@/lib/utils'

const navItems = [{ to: '/', label: 'Home', icon: House }]

export function RootLayout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50"
      >
        Skip to content
      </a>
      <header className="border-b bg-card">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-6">
          <span className="font-semibold">Biobank Portal</span>
          <nav aria-label="Main">
            <ul className="flex items-center gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring',
                        isActive && 'bg-accent text-accent-foreground',
                      )
                    }
                  >
                    <Icon className="size-4" aria-hidden />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="mx-auto max-w-7xl p-6 outline-hidden">
        <Outlet />
      </main>
    </>
  )
}
