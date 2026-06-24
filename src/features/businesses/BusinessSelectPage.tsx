type Props = {
  onSelect: (business: string) => void
  onAdmin: () => void
}

export function BusinessSelectPage({ onSelect, onAdmin }: Props) {
  return (
    <div className="business-select-page">
      <div className="business-select-card">
        <h1>Select Workspace</h1>
        <p>Choose which dashboard you want to open.</p>

        <div className="business-options">
          <button onClick={onAdmin}>
            <strong>Alma Admin Hub</strong>
            <span>Owner view for both businesses, employees, activity, permissions, and reports.</span>
          </button>

          <button onClick={() => onSelect('Alianza')}>
            <strong>Alianza</strong>
            <span>Insurance services, prospects, policies, reports, documents, and tasks.</span>
          </button>

          <button onClick={() => onSelect('Petra Insurance')}>
            <strong>Petra Insurance</strong>
            <span>Separate business dashboard for clients, policies, tasks, documents, and reports.</span>
          </button>
        </div>
      </div>
    </div>
  )
}
