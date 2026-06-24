import {
  LayoutDashboard,
  Crown,
  BarChart3,
  ShieldCheck,
  Menu
} from 'lucide-react'

type Props = {
  activeScreen: string
  setScreen: (screen: any) => void
  onOpenMenu: () => void
}

export function MobileBottomNav({ activeScreen, setScreen, onOpenMenu }: Props) {
  const items = [
    { label: 'Home', icon: LayoutDashboard, screen: 'dashboard' },
    { label: 'Admin', icon: Crown, screen: 'admin' },
    { label: 'Reports', icon: BarChart3, screen: 'reports' },
    { label: 'Policy', icon: ShieldCheck, screen: 'policy-form' }
  ]

  return (
    <nav className="mobile-bottom-nav">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <button
            key={item.label}
            className={activeScreen === item.screen ? 'mobile-nav-item active' : 'mobile-nav-item'}
            onClick={() => setScreen(item.screen)}
          >
            <Icon size={21} />
            <span>{item.label}</span>
          </button>
        )
      })}

      <button className="mobile-nav-item" onClick={onOpenMenu}>
        <Menu size={21} />
        <span>More</span>
      </button>
    </nav>
  )
}
