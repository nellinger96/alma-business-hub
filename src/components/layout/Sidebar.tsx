import {
  AlertCircle,
  BarChart3,
  Calculator,
  CalendarDays,
  Crown,
  DollarSign,
  FileText,
  HelpCircle,
  Inbox,
  MessageSquareText,
  NotebookText,
  Search,
  ShieldCheck,
  Trophy,
  Users
} from 'lucide-react'
import type { DemoUser } from '../../types/demoUser'

type Props = {
  activeScreen: string
  navigateTo: (screen: any, dashboardTab?: string) => void
  activeUser: DemoUser
  canAccessAdmin: boolean
}

export function Sidebar({ activeScreen, navigateTo, activeUser, canAccessAdmin }: Props) {
  const items = [
    { label: 'Admin Hub', icon: Crown, screen: 'admin', adminOnly: true },
    { label: 'My Dashboard', icon: Users, screen: 'dashboard', tab: 'home' },
    { label: 'Assigned Leads', icon: Inbox, screen: 'dashboard', tab: 'assigned-leads' },
    { label: 'Client Directory', icon: Search, screen: 'dashboard', tab: 'clients' },
    { label: 'Sales Contest', icon: Trophy, screen: 'dashboard', tab: 'sales' },
    { label: 'Payment Plans', icon: DollarSign, screen: 'dashboard', tab: 'payments' },
    { label: 'Policies / Files', icon: ShieldCheck, screen: 'dashboard', tab: 'policies' },
    { label: 'Messages', icon: MessageSquareText, screen: 'dashboard', tab: 'messages' },
    { label: 'Alerts', icon: AlertCircle, screen: 'dashboard', tab: 'home' },
    { label: 'Calendar', icon: CalendarDays, screen: 'dashboard', tab: 'calendar' },
    { label: 'Notes', icon: NotebookText, screen: 'dashboard', tab: 'tools' },
    { label: 'Calculator', icon: Calculator, screen: 'dashboard', tab: 'tools' },
    { label: 'Reports', icon: BarChart3, screen: 'reports' },
    { label: 'Documents', icon: FileText, screen: 'dashboard', tab: 'policies' },
    { label: 'Get Help', icon: HelpCircle, screen: 'dashboard', tab: 'tools' }
  ]

  const visibleItems = items.filter((item) => {
    if (item.adminOnly && !canAccessAdmin) return false
    return true
  })

  return (
    <aside className="sidebar">
      <div className="user-box">
        <div className="avatar-circle">
          {activeUser.name.charAt(0)}
        </div>
        <h3>{activeUser.name}</h3>
        <p>Profile: {activeUser.roleLabel}</p>
        <p>Email: {activeUser.email}</p>
        <p>
          Access: {activeUser.allowedBusinesses.join(' + ')}
        </p>
      </div>

      <nav>
        {visibleItems.map((item) => {
          const Icon = item.icon

          return (
            <button
              key={item.label}
              className={activeScreen === item.screen ? 'sidebar-item active' : 'sidebar-item'}
              onClick={() => navigateTo(item.screen, item.tab)}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
