import { Clock, LogOut, ShieldCheck } from 'lucide-react'
import type { NexoProfile } from '../../services/authService'

type Props = {
  profile: NexoProfile | null
  onLogout: () => void
}

export function PendingApprovalPage({ profile, onLogout }: Props) {
  return (
    <div className="login-page">
      <div className="login-card wide-login-card">
        <div className="pending-approval-card">
          <div className="pending-icon">
            <Clock size={42} />
          </div>

          <h1>Waiting for Approval</h1>

          <p>
            Your NEXO OS account request has been created, but it needs to be approved before you can access a dashboard.
          </p>

          <div className="pending-details">
            <div>
              <span>Name</span>
              <strong>{profile?.full_name ?? 'Account profile pending'}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{profile?.email ?? 'No profile found'}</strong>
            </div>

            <div>
              <span>Requested Business</span>
              <strong>{profile?.requested_business ?? 'Pending'}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{profile?.status ?? 'pending'}</strong>
            </div>
          </div>

          <div className="pending-note">
            <ShieldCheck size={20} />
            <span>
              Alma or a system admin will approve the employee account, assign business access, and unlock the correct dashboard.
            </span>
          </div>

          <button className="secondary-button" onClick={onLogout}>
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
