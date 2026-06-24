import {
  Search,
  FileSearch,
  DownloadCloud,
  BarChart3,
  UserRound,
  Database,
  Building2,
  MonitorCog,
  FileText,
  CreditCard,
  ShieldCheck,
  Crown
} from 'lucide-react'

type Props = {
  activeScreen: string
  setScreen: (screen: any) => void
}

export function Sidebar({ activeScreen, setScreen }: Props) {
  const items = [
    { label: 'Admin Hub', icon: Crown, screen: 'admin' },
    { label: 'Search', icon: Search, screen: 'dashboard' },
    { label: 'Advance Search', icon: FileSearch, screen: 'dashboard' },
    { label: 'Downloads', icon: DownloadCloud, screen: 'dashboard' },
    { label: 'Reports', icon: BarChart3, screen: 'reports' },
    { label: 'Prospects', icon: UserRound, screen: 'dashboard' },
    { label: 'B to B Database', icon: Database, screen: 'dashboard' },
    { label: 'Carrier Directory', icon: Building2, screen: 'dashboard' },
    { label: 'Administration', icon: MonitorCog, screen: 'admin' },
    { label: 'Documents', icon: FileText, screen: 'dashboard' },
    { label: 'Merchant Services', icon: CreditCard, screen: 'dashboard' },
    { label: 'Policy Creation', icon: ShieldCheck, screen: 'policy-form' }
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
