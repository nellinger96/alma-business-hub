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

type Props = {
  children: ReactNode
  activeBusiness: string
  setActiveBusiness: (business: string) => void
  activeScreen: string
  setScreen: (screen: any) => void
  onLogout: () => void
}

export function AppLayout({
  children,
  activeBusiness,
  setActiveBusiness,
  activeScreen,
  setScreen,
  onLogout
}: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMobileNavigate = (screen: any) => {
    setScreen(screen)
    setMobileMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <button className="icon-button" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>

          <button className="icon-button desktop-only">
            <BarChart3 size={23} />
          </button>

          <button className="icon-button desktop-only">
            <Users size={23} />
          </button>

          <button className="icon-button desktop-only">
            <ListChecks size={23} />
          </button>

          <button className="icon-button desktop-only">
            <FileText size={23} />
          </button>

          <div className="business-label desktop-only">
            <BriefcaseBusiness size={16} />
            <span>{activeBusiness.toUpperCase()}</span>
          </div>
        </div>

        <div className="brand-mark">Alma Hub</div>

        <div className="topbar-right">
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
          >
            <option>Alianza</option>
            <option>Petra Insurance</option>
          </select>

          <button className="icon-button notification desktop-only">
            <Users size={23} />
            <span>3</span>
          </button>

          <button className="icon-button desktop-only">
            <CalendarDays size={23} />
          </button>

          <button className="icon-button notification desktop-only">
            <Bell size={23} />
            <span>29</span>
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
        >
          <option>Alianza</option>
          <option>Petra Insurance</option>
        </select>

        <div className="mobile-search">
          <Search size={17} />
          <input placeholder="Quick Search..." />
        </div>
      </div>

      <div className="workspace">
        <Sidebar activeScreen={activeScreen} setScreen={setScreen} />

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

            <Sidebar activeScreen={activeScreen} setScreen={handleMobileNavigate} />
          </div>
        </div>
      )}

      <MobileBottomNav
        activeScreen={activeScreen}
        setScreen={setScreen}
        onOpenMenu={() => setMobileMenuOpen(true)}
      />
    </div>
  )
}
