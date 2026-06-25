import {
  AlertCircle,
  BarChart3,
  Calculator,
  CalendarDays,
  Crown,
  DollarSign,
  FileText,
  HelpCircle,
  MessageSquareText,
  NotebookText,
  Search,
  ShieldCheck,
  Trophy,
  Users
} from 'lucide-react'

type Props = {
  activeScreen: string
  navigateTo: (screen: any, dashboardTab?: string) => void
}

export function Sidebar({ activeScreen, navigateTo }: Props) {
  const items = [
    { label: 'Admin Hub', icon: Crown, screen: 'admin' },
    { label: 'My Dashboard', icon: Users, screen: 'dashboard', tab: 'home' },
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

  return (
    <aside className="sidebar">
      <div className="user-box">
        <div className="avatar-circle">A</div>
        <h3>Alma Admin</h3>
        <p>User: Alma</p>
        <p>Profile: Super Admin</p>
        <p>Email: alma@example.com</p>
        <p>Language: en-US</p>
      </div>

      <nav>
        {items.map((item) => {
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
