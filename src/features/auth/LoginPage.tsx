import type { DemoUser } from '../../types/demoUser'
import {
  Building2,
  Crown,
  ShieldCheck,
  UserRound
} from 'lucide-react'

type Props = {
  onLogin: (user: DemoUser) => void
}

const demoUsers: DemoUser[] = [
  {
    name: 'Alma Mora',
    email: 'alma@example.com',
    role: 'super_admin',
    roleLabel: 'Super Admin',
    defaultBusiness: 'Alianza',
    allowedBusinesses: ['Alianza', 'Petra Insurance']
  },
  {
    name: 'Nelly Lopez',
    email: 'nelly@example.com',
    role: 'manager',
    roleLabel: 'Alianza Manager',
    defaultBusiness: 'Alianza',
    allowedBusinesses: ['Alianza']
  },
  {
    name: 'Carolina Medina',
    email: 'carolina@example.com',
    role: 'employee',
    roleLabel: 'Alianza Employee',
    defaultBusiness: 'Alianza',
    allowedBusinesses: ['Alianza']
  },
  {
    name: 'Petra Team Member',
    email: 'petra@example.com',
    role: 'employee',
    roleLabel: 'Petra Employee',
    defaultBusiness: 'Petra Insurance',
    allowedBusinesses: ['Petra Insurance']
  }
]

function getIcon(roleLabel: string) {
  if (roleLabel.includes('Super')) return Crown
  if (roleLabel.includes('Manager')) return ShieldCheck
  if (roleLabel.includes('Petra')) return Building2
  return UserRound
}

export function LoginPage({ onLogin }: Props) {
  return (
    <div className="login-page">
      <div className="login-card wide-login-card">
        <div className="login-intro">
          <h1>NEXO OS</h1>
          <p>Demo login preview for Alma, managers, and employees.</p>
          <span className="demo-login-note">
            Supabase Auth will replace these demo buttons after employee accounts are created.
          </span>
        </div>

        <div className="demo-login-grid">
          {demoUsers.map((user) => {
            const Icon = getIcon(user.roleLabel)

            return (
              <button
                className="demo-role-card"
                key={user.email}
                onClick={() => onLogin(user)}
              >
                <div className="demo-role-icon">
                  <Icon size={28} />
                </div>

                <div>
                  <strong>{user.roleLabel}</strong>
                  <span>{user.name}</span>
                  <small>
                    {user.allowedBusinesses.length > 1
                      ? 'Access: Alianza + Petra Insurance'
                      : `Access: ${user.defaultBusiness}`}
                  </small>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
