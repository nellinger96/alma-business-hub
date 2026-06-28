import { useState } from 'react'
import {
  Building2,
  Crown,
  LockKeyhole,
  ShieldCheck,
  UserPlus,
  UserRound
} from 'lucide-react'
import type { DemoUser } from '../../types/demoUser'
import type { NexoProfile } from '../../services/authService'
import { loginWithEmail, registerEmployeeRequest } from '../../services/authService'

type Props = {
  onRealLogin: (profile: NexoProfile | null) => void
  onPendingSignup: (profile: NexoProfile | null) => void
  onDemoLogin: (user: DemoUser) => void
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

export function AuthPage({ onRealLogin, onPendingSignup, onDemoLogin }: Props) {
  const [mode, setMode] = useState<'login' | 'request' | 'demo'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [requestedBusiness, setRequestedBusiness] = useState('Alianza')
  const [requestedRole, setRequestedRole] = useState('Employee')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError('')
    setLoading(true)

    try {
      const result = await loginWithEmail(email, password)
      onRealLogin(result.profile)
    } catch (err) {
      console.error(err)
      setError('Login failed. Check the email and password.')
    } finally {
      setLoading(false)
    }
  }

  const handleRequestAccess = async () => {
    setError('')
    setLoading(true)

    try {
      const result = await registerEmployeeRequest({
        fullName,
        email,
        password,
        phone,
        requestedBusiness,
        requestedRole
      })

      onPendingSignup(result.profile)
    } catch (err) {
      console.error(err)
      setError('Could not create request. Password must be at least 8 characters and the email cannot already exist.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card wide-login-card">
        <div className="login-intro">
          <h1>NEXO OS</h1>
          <p>Business operating system for Alianza Latina and Petra Insurance.</p>
          <span className="demo-login-note">
            Real Appwrite login is now being connected. Demo mode stays available for presentations.
          </span>
        </div>

        <div className="auth-mode-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
            <LockKeyhole size={17} />
            Login
          </button>

          <button className={mode === 'request' ? 'active' : ''} onClick={() => setMode('request')}>
            <UserPlus size={17} />
            Request Access
          </button>

          <button className={mode === 'demo' ? 'active' : ''} onClick={() => setMode('demo')}>
            <Crown size={17} />
            Demo Mode
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {mode === 'login' && (
          <div className="auth-form">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alma@example.com" />

            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />

            <button className="primary-button full" onClick={handleLogin} disabled={loading}>
              {loading ? 'Logging in...' : 'Login to NEXO OS'}
            </button>

            <p className="auth-helper">
              Use Alma’s real Appwrite user email and temporary password once her account is created.
            </p>
          </div>
        )}

        {mode === 'request' && (
          <div className="auth-form">
            <label>Full Name</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Employee name" />

            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="employee@example.com" />

            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="At least 8 characters" />

            <label>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Optional" />

            <label>Requested Business</label>
            <select value={requestedBusiness} onChange={(e) => setRequestedBusiness(e.target.value)}>
              <option>Alianza</option>
              <option>Petra Insurance</option>
              <option>Both</option>
            </select>

            <label>Requested Role</label>
            <select value={requestedRole} onChange={(e) => setRequestedRole(e.target.value)}>
              <option>Employee</option>
              <option>Manager</option>
              <option>Admin</option>
              <option>Viewer</option>
            </select>

            <button className="primary-button full" onClick={handleRequestAccess} disabled={loading}>
              {loading ? 'Submitting...' : 'Request Employee Access'}
            </button>

            <p className="auth-helper">
              New employees will stay pending until Alma approves them.
            </p>
          </div>
        )}

        {mode === 'demo' && (
          <div className="demo-login-grid">
            {demoUsers.map((user) => {
              const Icon = getIcon(user.roleLabel)

              return (
                <button
                  className="demo-role-card"
                  key={user.email}
                  onClick={() => onDemoLogin(user)}
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
        )}
      </div>
    </div>
  )
}
