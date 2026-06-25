import {
  LayoutDashboard,
  Crown,
  BarChart3,
  MessageSquareText,
  Inbox,
  Menu
} from 'lucide-react'

type Props = {
  activeScreen: string
  navigateTo: (screen: any, dashboardTab?: string) => void
  onOpenMenu: () => void
  canAccessAdmin: boolean
}

export function MobileBottomNav({ activeScreen, navigateTo, onOpenMenu, canAccessAdmin }: Props) {
  const items = canAccessAdmin
    ? [
        { label: 'Home', icon: LayoutDashboard, screen: 'dashboard', tab: 'home' },
        { label: 'Admin', icon: Crown, screen: 'admin' },
        { label: 'Reports', icon: BarChart3, screen: 'reports' },
        { label: 'Text', icon: MessageSquareText, screen: 'dashboard', tab: 'messages' }
      ]
    : [
        { label: 'Home', icon: LayoutDashboard, screen: 'dashboard', tab: 'home' },
        { label: 'Leads', icon: Inbox, screen: 'dashboard', tab: 'assigned-leads' },
        { label: 'Reports', icon: BarChart3, screen: 'reports' },
        { label: 'Text', icon: MessageSquareText, screen: 'dashboard', tab: 'messages' }
      ]

  return (
    <nav className="mobile-bottom-nav">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <button
            key={item.label}
            className={activeScreen === item.screen ? 'mobile-nav-item active' : 'mobile-nav-item'}
            onClick={() => navigateTo(item.screen, item.tab)}
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
