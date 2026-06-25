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
  setScreen: (screen: any) => void
}

export function Sidebar({ activeScreen, setScreen }: Props) {
  const items = [
    { label: 'Admin Hub', icon: Crown, screen: 'admin' },
    { label: 'My Dashboard', icon: Users, screen: 'dashboard' },
    { label: 'Client Directory', icon: Search, screen: 'dashboard' },
    { label: 'Sales Contest', icon: Trophy, screen: 'dashboard' },
    { label: 'Payment Plans', icon: DollarSign, screen: 'dashboard' },
    { label: 'Policies / Files', icon: ShieldCheck, screen: 'policy-form' },
    { label: 'Messages', icon: MessageSquareText, screen: 'dashboard' },
    { label: 'Alerts', icon: AlertCircle, screen: 'dashboard' },
    { label: 'Calendar', icon: CalendarDays, screen: 'dashboard' },
    { label: 'Notes', icon: NotebookText, screen: 'dashboard' },
    { label: 'Calculator', icon: Calculator, screen: 'dashboard' },
    { label: 'Reports', icon: BarChart3, screen: 'reports' },
    { label: 'Documents', icon: FileText, screen: 'dashboard' },
    { label: 'Get Help', icon: HelpCircle, screen: 'dashboard' }
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
              onClick={() => setScreen(item.screen)}
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
