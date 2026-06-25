import {
  AlertCircle,
  Calculator,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  FileText,
  Gift,
  Handshake,
  HeartPulse,
  HelpCircle,
  Landmark,
  MessageSquareText,
  NotebookText,
  ShieldCheck,
  Trophy,
  Users
} from 'lucide-react'
import { useState } from 'react'
import { Tabs } from '../../components/ui/Tabs'

type Props = {
  activeBusiness: string
}

export function DashboardPage({ activeBusiness }: Props) {
  const [activeTab, setActiveTab] = useState('home')
  const isPetra = activeBusiness === 'Petra Insurance'

  const tabs = [
    { id: 'home', label: 'My Dashboard' },
    { id: 'clients', label: isPetra ? 'My Clients' : 'My Customers' },
    { id: 'sales', label: 'Sales' },
    { id: 'payments', label: 'Payment Plans' },
    { id: 'policies', label: isPetra ? 'Policies' : 'Files' },
    { id: 'messages', label: 'Messages' },
    { id: 'tools', label: 'Tools' },
    { id: 'reports', label: 'My Reports' }
  ]

  const services = isPetra
    ? [
        { label: 'Life Insurance', icon: HeartPulse, description: 'Quote, track, and manage life insurance clients.' },
        { label: 'Pre-Need Funeral Services', icon: ShieldCheck, description: 'Manage pre-need funeral service clients and documents.' }
      ]
    : [
        { label: 'Tax Services', icon: Landmark, description: 'Track tax customers, documents, payments, and filing status.' },
        { label: 'Document Filing', icon: FileCheck2, description: 'Manage document filing customers, paperwork, and completion status.' }
      ]

  const clients = isPetra
    ? [
        { id: 'P-1001', name: 'Maria Gonzalez', phone: '(714) 555-1822', service: 'Life Insurance', status: 'Needs Follow-up', birthday: 'June 28' },
        { id: 'P-1002', name: 'Jose Ramirez', phone: '(909) 555-4410', service: 'Pre-Need Funeral Services', status: 'Payment Plan', birthday: 'July 2' },
        { id: 'P-1003', name: 'Ana Martinez', phone: '(951) 555-9033', service: 'Life Insurance', status: 'Quote Review', birthday: 'July 10' }
      ]
    : [
        { id: 'A-2001', name: 'Luis Hernandez', phone: '(714) 555-2290', service: 'Tax Services', status: 'Missing W-2', birthday: 'June 27' },
        { id: 'A-2002', name: 'Carmen Lopez', phone: '(909) 555-7001', service: 'Document Filing', status: 'In Progress', birthday: 'July 4' },
        { id: 'A-2003', name: 'Miguel Torres', phone: '(951) 555-1188', service: 'Tax Services', status: 'Ready to File', birthday: 'July 12' }
      ]

  const tasks = isPetra
    ? [
        'Call Maria Gonzalez about life insurance quote',
        'Review Jose Ramirez pre-need documents',
        'Send birthday text to upcoming client',
        'Follow up on pending payment plan'
      ]
    : [
        'Request missing W-2 from Luis Hernandez',
        'Review Carmen Lopez document filing packet',
        'Send promo coupon text to tax customers',
        'Follow up on pending payment plan'
      ]

  return (
    <div>
      <div className="page-heading">
        <h1>{activeBusiness} Employee Dashboard</h1>
        <p>
          Your personal workspace for clients, alerts, payment plans, services, sales contests, messages, notes, and reports.
        </p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'home' && (
        <>
          <section className="dashboard-stat-grid">
            <div className="dashboard-stat-card">
              <Users />
              <span>{isPetra ? 'My Clients' : 'My Customers'}</span>
              <strong>{isPetra ? '19' : '31'}</strong>
            </div>

            <div className="dashboard-stat-card">
              <Handshake />
              <span>My Sales</span>
              <strong>{isPetra ? '$6.9k' : '$7.8k'}</strong>
            </div>

            <div className="dashboard-stat-card">
              <AlertCircle />
              <span>Alerts</span>
              <strong>6</strong>
            </div>

            <div className="dashboard-stat-card">
              <Trophy />
              <span>Contest Rank</span>
              <strong>#2</strong>
            </div>
          </section>

          <section className="service-row">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <button className="service-card" key={service.label}>
                  <div className="category-icon">
                    <Icon size={34} />
                  </div>
                  <span>{service.label}</span>
                  <p>{service.description}</p>
                </button>
              )
            })}
          </section>

          <section className="task-list">
            {tasks.map((task) => (
              <div className="task-item" key={task}>
                <CheckCircle2 />
                <div>
                  <strong>{task}</strong>
                  <p>Daily task preview. This will become a real assigned task after Supabase is connected.</p>
                </div>
                <span className="status-pill pending">Pending</span>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'clients' && (
        <section className="table-panel admin-table">
          <h3>{isPetra ? 'My Client Directory' : 'My Customer Directory'}</h3>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID / Name</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Birthday</th>
                  <th>Text</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <strong>{client.id}</strong>
                      <br />
                      {client.name}
                    </td>
                    <td>{client.phone}</td>
                    <td>{client.service}</td>
                    <td>{client.status}</td>
                    <td>{client.birthday}</td>
                    <td><button className="small-action-button">Text</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'sales' && (
        <section className="quick-card-grid">
          <div className="quick-card">
            <Handshake size={38} />
            <h3>My Sales Completed</h3>
            <p>Track your completed sales for the selected business.</p>
            <button className="teal-button">View Sales</button>
          </div>

          <div className="quick-card">
            <Trophy size={38} />
            <h3>Sales Contest</h3>
            <p>See your rank, goal, and how close you are to winning.</p>
            <button className="teal-button">View Contest</button>
          </div>

          <div className="quick-card">
            <ClipboardList size={38} />
            <h3>Pending Sales</h3>
            <p>Follow up with clients who are close to closing.</p>
            <button className="teal-button">Open Follow-ups</button>
          </div>
        </section>
      )}

      {activeTab === 'payments' && (
        <section className="quick-card-grid">
          <div className="quick-card">
            <CalendarDays size={38} />
            <h3>Upcoming Payments</h3>
            <p>See client payment plans due today, this week, or this month.</p>
            <button className="teal-button">View Calendar</button>
          </div>

          <div className="quick-card">
            <AlertCircle size={38} />
            <h3>Late Payments</h3>
            <p>Customers who need a payment reminder or follow-up.</p>
            <button className="teal-button">Send Reminder</button>
          </div>

          <div className="quick-card">
            <FileText size={38} />
            <h3>Payment Notes</h3>
            <p>Track notes, promises to pay, and next due dates.</p>
            <button className="teal-button">Open Notes</button>
          </div>
        </section>
      )}

      {activeTab === 'policies' && (
        <section className="quick-card-grid">
          {(isPetra
            ? ['Life Insurance Policies', 'Pre-Need Files', 'Applications', 'Beneficiary Info', 'Policy PDFs', 'Client Notes']
            : ['Tax Files', 'Document Filing Cases', 'Customer IDs', 'Tax Return Drafts', 'Filing Receipts', 'Customer Notes']
          ).map((item) => (
            <div className="quick-card" key={item}>
              <FileText size={38} />
              <h3>{item}</h3>
              <p>Open and review files related to your assigned clients.</p>
              <button className="teal-button">View</button>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'messages' && (
        <section className="quick-card-grid">
          <div className="quick-card">
            <Gift size={38} />
            <h3>Happy Birthday Text</h3>
            <p>Send birthday messages to clients with upcoming birthdays.</p>
            <button className="teal-button">Send Text</button>
          </div>

          <div className="quick-card">
            <MessageSquareText size={38} />
            <h3>Promo Coupons</h3>
            <p>Text clients promo coupons and seasonal offers.</p>
            <button className="teal-button">Create Promo</button>
          </div>

          <div className="quick-card">
            <AlertCircle size={38} />
            <h3>Service Reminders</h3>
            <p>Remind clients about documents, payments, appointments, or renewals.</p>
            <button className="teal-button">Send Reminder</button>
          </div>
        </section>
      )}

      {activeTab === 'tools' && (
        <section className="quick-card-grid">
          <div className="quick-card">
            <Calculator size={38} />
            <h3>Calculator</h3>
            <p>Quick calculator for payments, fees, premiums, tax estimates, or balances.</p>
            <button className="teal-button">Open Calculator</button>
          </div>

          <div className="quick-card">
            <NotebookText size={38} />
            <h3>Notes</h3>
            <p>Personal notes and client notes for follow-up tracking.</p>
            <button className="teal-button">Open Notes</button>
          </div>

          <div className="quick-card">
            <HelpCircle size={38} />
            <h3>Get Help</h3>
            <p>Quick help section for workflows, questions, scripts, and internal guidance.</p>
            <button className="teal-button">Get Help</button>
          </div>
        </section>
      )}

      {activeTab === 'reports' && (
        <section className="quick-card-grid">
          <div className="quick-card">
            <FileText size={38} />
            <h3>My Sales Report</h3>
            <p>See your sales by day, week, month, service, and business.</p>
            <button className="teal-button">View Report</button>
          </div>

          <div className="quick-card">
            <ClipboardList size={38} />
            <h3>My Task Report</h3>
            <p>Track completed tasks, pending work, and follow-up performance.</p>
            <button className="teal-button">View Tasks</button>
          </div>

          <div className="quick-card">
            <Trophy size={38} />
            <h3>Contest Report</h3>
            <p>View your position in the sales contest and what you need to move up.</p>
            <button className="teal-button">View Contest</button>
          </div>
        </section>
      )}
    </div>
  )
}
