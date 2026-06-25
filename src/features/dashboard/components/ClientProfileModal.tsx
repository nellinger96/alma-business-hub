import {
  AlertCircle,
  CalendarDays,
  DollarSign,
  FileText,
  Gift,
  MessageSquareText,
  NotebookText,
  Phone,
  UserRound,
  X
} from 'lucide-react'

type Client = {
  id: string
  name: string
  phone: string
  service: string
  status: string
  birthday: string
}

type Props = {
  client: Client
  activeBusiness: string
  isPetra: boolean
  onClose: () => void
  onBirthdayText: (clientName: string) => void
  onPromoText: () => void
}

export function ClientProfileModal({
  client,
  activeBusiness,
  isPetra,
  onClose,
  onBirthdayText,
  onPromoText
}: Props) {
  return (
    <div className="modal-backdrop">
      <div className="client-profile-modal">
        <div className="client-profile-head">
          <div>
            <span className="demo-badge light">Demo Client Profile</span>
            <h2>{client.name}</h2>
            <p>{activeBusiness} • {client.service}</p>
          </div>

          <button onClick={onClose} aria-label="Close profile">
            <X size={22} />
          </button>
        </div>

        <div className="client-profile-grid">
          <div className="client-info-card">
            <UserRound />
            <span>Client ID</span>
            <strong>{client.id}</strong>
          </div>

          <div className="client-info-card">
            <Phone />
            <span>Phone</span>
            <strong>{client.phone}</strong>
          </div>

          <div className="client-info-card">
            <AlertCircle />
            <span>Status</span>
            <strong>{client.status}</strong>
          </div>

          <div className="client-info-card">
            <Gift />
            <span>Birthday</span>
            <strong>{client.birthday}</strong>
          </div>
        </div>

        <div className="client-profile-sections">
          <section className="client-section-card">
            <div className="client-section-title">
              <DollarSign />
              <h3>Payment Plan</h3>
            </div>

            <div className="payment-preview">
              <div>
                <span>Total Balance</span>
                <strong>{isPetra ? '$1,200' : '$350'}</strong>
              </div>

              <div>
                <span>Down Payment</span>
                <strong>{isPetra ? '$200' : '$100'}</strong>
              </div>

              <div>
                <span>Monthly</span>
                <strong>{isPetra ? '$250/mo' : '$125/mo'}</strong>
              </div>

              <div>
                <span>Next Due</span>
                <strong>July 1</strong>
              </div>
            </div>
          </section>

          <section className="client-section-card">
            <div className="client-section-title">
              <FileText />
              <h3>{isPetra ? 'Policies / Files' : 'Customer Files'}</h3>
            </div>

            <div className="mini-file-list">
              {(isPetra
                ? ['Application pending review', 'ID document uploaded', 'Beneficiary info needed']
                : ['ID document uploaded', 'Missing W-2 / income document', 'Filing receipt pending']
              ).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </section>

          <section className="client-section-card">
            <div className="client-section-title">
              <NotebookText />
              <h3>Notes</h3>
            </div>

            <div className="mini-file-list">
              <p>Called client. Waiting for missing documents.</p>
              <p>Client prefers text message follow-up.</p>
              <p>Next follow-up: tomorrow morning.</p>
            </div>
          </section>

          <section className="client-section-card">
            <div className="client-section-title">
              <CalendarDays />
              <h3>Upcoming Actions</h3>
            </div>

            <div className="mini-file-list">
              <p>Send payment reminder</p>
              <p>Confirm missing document</p>
              <p>Schedule next appointment</p>
            </div>
          </section>
        </div>

        <div className="client-profile-actions">
          <button className="primary-button" onClick={() => onBirthdayText(client.name)}>
            <Gift size={17} />
            Birthday Text
          </button>

          <button className="teal-button" onClick={onPromoText}>
            <MessageSquareText size={17} />
            Promo Text
          </button>

          <button className="secondary-button">
            Add Note
          </button>

          <button className="secondary-button">
            Mark Follow-up Done
          </button>
        </div>
      </div>
    </div>
  )
}
