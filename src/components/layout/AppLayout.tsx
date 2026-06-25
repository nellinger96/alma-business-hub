import { ReactNode, useState } from 'react'
import {
  Menu,
  BarChart3,
  Users,
  ListChecks,
  FileText,
  Search,
  CalendarDays,
  Bell,
  LogOut,
  BriefcaseBusiness,
  X
} from 'lucide-react'
import { Sidebar } from './Sidebar'
import { RightPanel } from './RightPanel'
import { MobileBottomNav } from './MobileBottomNav'
import type { DemoUser } from '../../types/demoUser'

type Props = {
  children: ReactNode
  activeBusiness: string
  setActiveBusiness: (business: string) => void
  allowedBusinesses: string[]
  activeScreen: string
  navigateTo: (screen: any, dashboardTab?: string) => void
  onLogout: () => void
  activeUser: DemoUser
  canAccessAdmin: boolean
}

export function AppLayout({
  children,
  activeBusiness,
  setActiveBusiness,
  allowedBusinesses,
  activeScreen,
  navigateTo,
  onLogout,
  activeUser,
  canAccessAdmin
}: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMobileNavigate = (screen: any, dashboardTab?: string) => {
    navigateTo(screen, dashboardTab)
    setMobileMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <button className="icon-button" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>

          <button className="icon-button desktop-only" onClick={() => navigateTo('reports')}>
            <BarChart3 size={23} />
          </button>

          <button className="icon-button desktop-only" onClick={() => navigateTo('dashboard', 'clients')}>
            <Users size={23} />
          </button>

          <button className="icon-button desktop-only" onClick={() => navigateTo('dashboard', 'assigned-leads')}>
            <ListChecks size={23} />
          </button>

          <button className="icon-button desktop-only" onClick={() => navigateTo('dashboard', 'policies')}>
            <FileText size={23} />
          </button>

          <div className="business-label desktop-only">
            <BriefcaseBusiness size={16} />
            <span>{activeBusiness.toUpperCase()}</span>
          </div>
        </div>

        <div className="brand-mark">Alma Hub</div>

        <div className="topbar-right">
          <span className="demo-badge desktop-only">{activeUser.roleLabel}</span>

          <div className="quick-search desktop-only">
            <input placeholder="Quick Search..." />
            <button>
              <Search size={18} />
            </button>
          </div>

          <select
            className="business-switcher desktop-only"
            value={activeBusiness}
            onChange={(e) => setActiveBusiness(e.target.value)}
            disabled={allowedBusinesses.length === 1}
          >
            {allowedBusinesses.map((business) => (
              <option key={business}>{business}</option>
            ))}
          </select>

          <button className="icon-button notification desktop-only" onClick={() => navigateTo('dashboard', 'assigned-leads')}>
            <Users size={23} />
            <span>3</span>
          </button>

          <button className="icon-button desktop-only" onClick={() => navigateTo('dashboard', 'calendar')}>
            <CalendarDays size={23} />
          </button>

          <button className="icon-button notification desktop-only" onClick={() => navigateTo('dashboard', 'home')}>
            <Bell size={23} />
            <span>6</span>
          </button>

          <button className="icon-button" onClick={onLogout} aria-label="Log out">
            <LogOut size={23} />
          </button>
        </div>
      </header>

      <div className="mobile-control-bar">
        <select
          value={activeBusiness}
          onChange={(e) => setActiveBusiness(e.target.value)}
          disabled={allowedBusinesses.length === 1}
        >
          {allowedBusinesses.map((business) => (
            <option key={business}>{business}</option>
          ))}
        </select>

        <div className="mobile-search">
          <Search size={17} />
          <input placeholder="Quick Search..." />
        </div>
      </div>

      <div className="workspace">
        <Sidebar
          activeScreen={activeScreen}
          navigateTo={navigateTo}
          activeUser={activeUser}
          canAccessAdmin={canAccessAdmin}
        />

        <main className="main-content">
          {children}
        </main>

        <RightPanel />
      </div>

      {mobileMenuOpen && (
        <div className="mobile-drawer-layer">
          <button
            className="mobile-drawer-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          />

          <div className="mobile-drawer">
            <div className="mobile-drawer-head">
              <strong>Menu</strong>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>

            <Sidebar
              activeScreen={activeScreen}
              navigateTo={handleMobileNavigate}
              activeUser={activeUser}
              canAccessAdmin={canAccessAdmin}
            />
          </div>
        </div>
      )}

      <MobileBottomNav
        activeScreen={activeScreen}
        navigateTo={navigateTo}
        onOpenMenu={() => setMobileMenuOpen(true)}
        canAccessAdmin={canAccessAdmin}
      />
    </div>
  )
}
