import { Plus, UserPlus, X } from 'lucide-react'
import { useState } from 'react'
import { createManualClient } from '../../../services/clientService'
import type { ClientRecord } from '../../../types/client'

type Props = {
  activeBusiness: string
  activeEmployeeName: string
  isPetra: boolean
  onClose: () => void
  onClientCreated: (client: ClientRecord) => void
}

export function AddClientModal({
  activeBusiness,
  activeEmployeeName,
  isPetra,
  onClose,
  onClientCreated
}: Props) {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState(isPetra ? 'Life Insurance' : 'Tax Services')
  const [status, setStatus] = useState('active')
  const [birthday, setBirthday] = useState('')
  const [notes, setNotes] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const services = isPetra
    ? ['Life Insurance', 'Pre-Need Funeral Services', 'Medicare']
    : ['Tax Services', 'Document Filing', 'ITIN', 'Translations', 'Family Petitions', 'Work Permits', 'Dual Citizenship']

  const handleSubmit = async () => {
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage('Full name and phone are required.')
      return
    }

    setIsSaving(true)
    setErrorMessage('')

    try {
      const newClient = await createManualClient({
        business: activeBusiness as ClientRecord['business'],
        fullName,
        phone,
        email,
        service,
        status,
        birthday,
        notes,
        assignedToName: activeEmployeeName,
        source: 'Manual Entry'
      })

      onClientCreated(newClient)
      onClose()
    } catch (error) {
      console.error('Could not create manual client:', error)
      setErrorMessage('Could not create client. Check Appwrite client permissions.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="demo-modal add-client-modal">
        <div className="demo-modal-head">
          <div>
            <span className="real-data-chip">Manual Client Entry</span>
            <h2>Add Client</h2>
            <p>{activeBusiness} • Assigned to {activeEmployeeName}</p>
          </div>

          <button onClick={onClose} aria-label="Close add client modal">
            <X size={20} />
          </button>
        </div>

        {errorMessage && (
          <div className="auth-error" style={{ marginBottom: 16 }}>
            {errorMessage}
          </div>
        )}

        <div className="add-client-form">
          <label>Full Name *</label>
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Client full name"
          />

          <label>Phone *</label>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Client phone number"
          />

          <label>Email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Client email"
          />

          <div className="workflow-form-row">
            <div>
              <label>Service</label>
              <select value={service} onChange={(event) => setService(event.target.value)}>
                {services.map((serviceOption) => (
                  <option value={serviceOption} key={serviceOption}>
                    {serviceOption}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Status</label>
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="active">Active</option>
                <option value="new">New</option>
                <option value="needs_follow_up">Needs Follow-Up</option>
                <option value="waiting_documents">Waiting Documents</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <label>Birthday</label>
          <input
            value={birthday}
            onChange={(event) => setBirthday(event.target.value)}
            placeholder="Example: July 12"
          />

          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Optional notes about this client..."
          />
        </div>

        <div className="modal-actions">
          <button className="secondary-button" onClick={onClose}>
            Cancel
          </button>

          <button className="primary-button" onClick={handleSubmit} disabled={isSaving}>
            <Plus size={17} />
            {isSaving ? 'Saving...' : 'Add Client'}
          </button>
        </div>

        <div className="preview-note">
          <UserPlus size={16} />
          Manual clients will appear in the Client Directory and can use notes/tasks like converted leads.
        </div>
      </div>
    </div>
  )
}
