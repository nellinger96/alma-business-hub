import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
  X
} from 'lucide-react'
import type { WebsiteLead } from '../../../types/websiteLead'

type EmployeeOption = {
  name: string
  business: 'Alianza' | 'Petra Insurance' | 'All Businesses'
}

type Props = {
  lead: WebsiteLead
  employees: EmployeeOption[]
  onClose: () => void
  onAssign: (leadId: string, employeeName: string) => void
  onStatusChange: (leadId: string, status: WebsiteLead['status']) => void
}

export function LeadProfileModal({
  lead,
  employees,
  onClose,
  onAssign,
  onStatusChange
}: Props) {
  const availableEmployees = employees.filter((employee) => {
    return employee.business === lead.business || employee.business === 'All Businesses'
  })

  return (
    <div className="modal-backdrop">
      <div className="lead-profile-modal">
        <div className="lead-profile-head">
          <div>
            <span className="demo-badge light">Website Lead</span>
            <h2>{lead.fullName}</h2>
            <p>{lead.business} • {lead.service}</p>
          </div>

          <button onClick={onClose} aria-label="Close lead profile">
            <X size={22} />
          </button>
        </div>

        <div className="lead-profile-grid">
          <div className="client-info-card">
            <Building2 />
            <span>Business</span>
            <strong>{lead.business}</strong>
          </div>

          <div className="client-info-card">
            <UserRound />
            <span>Status</span>
            <strong>{lead.status}</strong>
          </div>

          <div className="client-info-card">
            <Phone />
            <span>Phone</span>
            <strong>{lead.phone}</strong>
          </div>

          <div className="client-info-card">
            <Mail />
            <span>Email</span>
            <strong>{lead.email}</strong>
          </div>
        </div>

        <div className="lead-profile-body">
          <section className="client-section-card">
            <div className="client-section-title">
              <MessageSquareText />
              <h3>Lead Message</h3>
            </div>

            <p className="lead-message-box">{lead.message}</p>
          </section>

          <section className="client-section-card">
            <div className="client-section-title">
              <AlertCircle />
              <h3>Assignment</h3>
            </div>

            <label>Assign lead to employee</label>
            <select
              value={lead.assignedTo}
              onChange={(e) => onAssign(lead.id, e.target.value)}
              className="lead-select"
            >
              <option value="Unassigned">Unassigned</option>
              {availableEmployees.map((employee) => (
                <option key={employee.name} value={employee.name}>
                  {employee.name}
                </option>
              ))}
            </select>

            <p className="lead-helper-text">
              In the real version, employees will only see leads assigned to them.
            </p>
          </section>
        </div>

        <div className="lead-profile-actions">
          <button
            className="secondary-button"
            onClick={() => onStatusChange(lead.id, 'Contacted')}
          >
            Mark Contacted
          </button>

          <button
            className="primary-button"
            onClick={() => onStatusChange(lead.id, 'Converted')}
          >
            <CheckCircle2 size={17} />
            Convert to Client
          </button>

          <button
            className="secondary-button"
            onClick={() => onStatusChange(lead.id, 'Lost')}
          >
            Mark Lost
          </button>
        </div>
      </div>
    </div>
  )
}
