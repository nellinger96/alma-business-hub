import { FileText } from 'lucide-react'

export function ReportsPage() {
  const groups = [
    {
      title: 'Prospect/Customer',
      cards: [
        'Summary Customer*',
        'Detailed Customers*',
        'Prospect/Customer Notes*',
        'Lead/Referral Report*',
        'Prospect Search'
      ]
    },
    {
      title: 'Policies/Files',
      cards: [
        'Summary Policies/Files Created*',
        'Detailed Policies/Files Created*',
        'Policy/Files Updated*',
        'Notes*',
        'Policy File Locks*',
        'Documents Tab*',
        'Claims Report*',
        'Monthly Payments by Due Date'
      ]
    },
    {
      title: 'LOBs',
      cards: [
        'LOB - Auto*',
        'LOB - Property*',
        'LOB Motorcycle*',
        'LOB Recreational*',
        'LOB - Commercial*',
        'LOB Trucking*',
        'LOB Life*',
        'LOB Health*',
        'LOB Medicare*',
        'LOB Personal Umbrella*',
        'LOB Registration Services*',
        'LOB Miscellaneous*',
        'LOB Income Tax*'
      ]
    }
  ]

  return (
    <div>
      <div className="page-heading">
        <h1>Reports</h1>
        <p>Report center for customers, policies, files, and lines of business.</p>
      </div>

      {groups.map((group) => (
        <section className="report-section" key={group.title}>
          <h2>{group.title}</h2>

          <div className="report-grid">
            {group.cards.map((card) => (
              <div className="report-card" key={card}>
                <div className="report-icon">
                  <FileText size={52} />
                </div>
                <h3>{card}</h3>
                <button className="teal-button">GO!</button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
