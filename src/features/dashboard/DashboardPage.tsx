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
  Inbox,
  Landmark,
  MessageSquareText,
  NotebookText,
  Search,
  ShieldCheck,
  Trophy,
  Users,
  X
} from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { Tabs } from '../../components/ui/Tabs'
import { DemoFeatureModal } from '../../components/ui/DemoFeatureModal'
import { ClientProfileModal } from './components/ClientProfileModal'
import type { WebsiteLead } from '../../types/websiteLead'

type Props = {
  activeBusiness: string
  activeEmployeeName: string
  initialTab: string
  websiteLeads: WebsiteLead[]
  setWebsiteLeads: Dispatch<SetStateAction<WebsiteLead[]>>
}

type Client = {
  id: string
  name: string
  phone: string
  service: string
  status: string
  birthday: string
}

export function DashboardPage({
  activeBusiness,
  activeEmployeeName,
  initialTab,
  websiteLeads,
  setWebsiteLeads
}: Props) {
  const [activeTab, setActiveTab] = useState(initialTab || 'home')
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [messagePreview, setMessagePreview] = useState<{ title: string; body: string } | null>(null)
  const [demoFeature, setDemoFeature] = useState<{ title: string; description: string } | null>(null)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [clientSearch, setClientSearch] = useState('')
  const [noteText, setNoteText] = useState('')
  const [notes, setNotes] = useState<string[]>(['Called client. Waiting for missing documents.'])
  const [saleAmount, setSaleAmount] = useState('1200')
  const [downPayment, setDownPayment] = useState('200')
  const [months, setMonths] = useState('4')

  useEffect(() => {
    setActiveTab(initialTab || 'home')
  }, [initialTab])

  const isPetra = activeBusiness === 'Petra Insurance'
  const isAlmaView = activeEmployeeName === 'Alma Admin' || activeEmployeeName === 'Alma Mora'

  const openDemoFeature = (title: string, description: string) => {
    setDemoFeature({ title, description })
  }

  const assignedLeads = websiteLeads.filter((lead) => {
    const belongsToBusiness = lead.business === activeBusiness
    const belongsToEmployee = lead.assignedTo === activeEmployeeName

    return belongsToBusiness && (belongsToEmployee || isAlmaView)
  })

  const monthlyPayment = useMemo(() => {
    const total = Number(saleAmount) || 0
    const down = Number(downPayment) || 0
    const term = Math.max(Number(months) || 1, 1)

    return Math.max((total - down) / term, 0).toFixed(2)
  }, [saleAmount, downPayment, months])

  const tabs = [
    { id: 'home', label: 'My Dashboard' },
    { id: 'assigned-leads', label: 'Assigned Leads' },
    { id: 'clients', label: isPetra ? 'My Clients' : 'My Customers' },
    { id: 'sales', label: 'Sales' },
    { id: 'payments', label: 'Payment Plans' },
    { id: 'policies', label: isPetra ? 'Policies' : 'Files' },
    { id: 'messages', label: 'Messages' },
    { id: 'tools', label: 'Tools' },
    { id: 'calendar', label: 'Calendar' },
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

  const clients: Client[] = isPetra
    ? [
        { id: 'P-1001', name: 'Maria Gonzalez', phone: '(714) 555-1822', service: 'Life Insurance', status: 'Needs Follow-up', birthday: 'June 28' },
        { id: 'P-1002', name: 'Jose Ramirez', phone: '(909) 555-4410', service: 'Pre-Need Funeral Services', status: 'Payment Plan', birthday: 'July 2' },
        { id: 'P-1003', name: 'Ana Martinez', phone: '(951) 555-9033', service: 'Life Insurance', status: 'Quote Review', birthday: 'July 10' },
        { id: 'P-1004', name: 'Rosa Flores', phone: '(626) 555-0198', service: 'Pre-Need Funeral Services', status: 'Appointment Scheduled', birthday: 'July 15' }
      ]
    : [
        { id: 'A-2001', name: 'Luis Hernandez', phone: '(714) 555-2290', service: 'Tax Services', status: 'Missing W-2', birthday: 'June 27' },
        { id: 'A-2002', name: 'Carmen Lopez', phone: '(909) 555-7001', service: 'Document Filing', status: 'In Progress', birthday: 'July 4' },
        { id: 'A-2003', name: 'Miguel Torres', phone: '(951) 555-1188', service: 'Tax Services', status: 'Ready to File', birthday: 'July 12' },
        { id: 'A-2004', name: 'Sofia Ramirez', phone: '(626) 555-4031', service: 'Document Filing', status: 'Needs Signature', birthday: 'July 18' }
      ]

  const filteredClients = clients.filter((client) => {
    const search = clientSearch.toLowerCase()

    return (
      client.name.toLowerCase().includes(search) ||
      client.phone.toLowerCase().includes(search) ||
      client.service.toLowerCase().includes(search) ||
      client.status.toLowerCase().includes(search) ||
      client.id.toLowerCase().includes(search)
    )
  })

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

  const toggleTask = (task: string) => {
    if (completedTasks.includes(task)) {
      setCompletedTasks(completedTasks.filter((item) => item !== task))
    } else {
      setCompletedTasks([...completedTasks, task])
    }
  }

  const updateLeadStatus = (leadId: string, status: WebsiteLead['status']) => {
    setWebsiteLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              status
            }
          : lead
      )
    )
  }

  const getStatusClass = (status: WebsiteLead['status']) => {
    if (status === 'Converted') return 'status-pill active'
    if (status === 'New') return 'status-pill new'
    if (status === 'Lost') return 'status-pill lost'
    return 'status-pill pending'
  }

  const openBirthdayText = (clientName: string) => {
    setMessagePreview({
      title: `Birthday text to ${clientName}`,
      body: `Hi ${clientName}, happy birthday from ${activeBusiness}! We hope you have a blessed and beautiful day. Thank you for trusting our team.`
    })
  }

  const openLeadText = (lead: WebsiteLead) => {
    setMessagePreview({
      title: `Follow-up text to ${lead.fullName}`,
      body: `Hi ${lead.fullName}, this is ${activeEmployeeName} from ${activeBusiness}. Thank you for requesting information about ${lead.service}. I wanted to follow up and see when would be a good time to help you.`
    })
  }

  const openPromoText = () => {
    setMessagePreview({
      title: 'Promo coupon text',
      body: isPetra
        ? `Hi! This is ${activeBusiness}. We are currently helping families review life insurance and pre-need funeral planning options. Reply YES if you would like a quick quote or appointment.`
        : `Hi! This is ${activeBusiness}. We are offering a limited-time promo for tax services and document filing. Reply YES if you would like help getting started.`
    })
  }

  const addNote = () => {
    if (!noteText.trim()) return

    setNotes([noteText.trim(), ...notes])
    setNoteText('')
  }

  return (
    <div>
      <div className="page-heading">
        <h1>{activeEmployeeName} Dashboard</h1>
        <p>
          {activeBusiness} workspace for assigned leads, clients, alerts, payment plans, services, sales contests, messages, notes, and reports.
        </p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'home' && (
        <>
          <section className="dashboard-stat-grid">
            <div className="dashboard-stat-card">
              <Inbox />
              <span>Assigned Leads</span>
              <strong>{assignedLeads.length}</strong>
            </div>

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
            {tasks.map((task) => {
              const isComplete = completedTasks.includes(task)

              return (
                <div className={isComplete ? 'task-item complete' : 'task-item'} key={task}>
                  <CheckCircle2 />
                  <div>
                    <strong>{task}</strong>
                    <p>{isComplete ? 'Completed in demo mode.' : 'Daily task preview. Click complete to test the workflow.'}</p>
                  </div>
                  <button className={isComplete ? 'status-pill active' : 'status-pill pending'} onClick={() => toggleTask(task)}>
                    {isComplete ? 'Complete' : 'Pending'}
                  </button>
                </div>
              )
            })}
          </section>
        </>
      )}

      {activeTab === 'assigned-leads' && (
        <section className="table-panel admin-table">
          <div className="directory-header">
            <div>
              <h3>My Assigned Leads</h3>
              <p>
                {isAlmaView
                  ? 'Alma/admin preview: showing all leads for this selected business.'
                  : 'Employee preview: showing only leads assigned to this employee.'}
              </p>
            </div>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Lead</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Source</th>
                  <th>Text</th>
                  <th>Contacted</th>
                  <th>Convert</th>
                </tr>
              </thead>
              <tbody>
                {assignedLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <strong>{lead.id}</strong>
                      <br />
                      {lead.fullName}
                      <br />
                      <small>{lead.phone}</small>
                    </td>
                    <td>{lead.service}</td>
                    <td>
                      <span className={getStatusClass(lead.status)}>
                        {lead.status}
                      </span>
                    </td>
                    <td>{lead.assignedTo}</td>
                    <td>{lead.source}</td>
                    <td>
                      <button className="small-action-button" onClick={() => openLeadText(lead)}>
                        Text
                      </button>
                    </td>
                    <td>
                      <button className="small-action-button secondary-small" onClick={() => updateLeadStatus(lead.id, 'Contacted')}>
                        Contacted
                      </button>
                    </td>
                    <td>
                      <button className="small-action-button" onClick={() => updateLeadStatus(lead.id, 'Converted')}>
                        Convert
                      </button>
                    </td>
                  </tr>
                ))}

                {assignedLeads.length === 0 && (
                  <tr>
                    <td colSpan={8}>No assigned leads yet. Assign one from Alma Admin Hub → Website Leads.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'clients' && (
        <section className="table-panel admin-table">
          <div className="directory-header">
            <div>
              <h3>{isPetra ? 'My Client Directory' : 'My Customer Directory'}</h3>
              <p>Search, open profiles, send texts, review payment plans, and track follow-ups.</p>
            </div>

            <div className="directory-search">
              <Search size={18} />
              <input
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                placeholder="Search name, phone, service, status..."
              />
            </div>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID / Name</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Birthday</th>
                  <th>Profile</th>
                  <th>Text</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <button className="link-button" onClick={() => setSelectedClient(client)}>
                        <strong>{client.id}</strong>
                        <br />
                        {client.name}
                      </button>
                    </td>
                    <td>{client.phone}</td>
                    <td>{client.service}</td>
                    <td>{client.status}</td>
                    <td>{client.birthday}</td>
                    <td>
                      <button className="small-action-button" onClick={() => setSelectedClient(client)}>
                        Open
                      </button>
                    </td>
                    <td>
                      <button className="small-action-button secondary-small" onClick={() => openBirthdayText(client.name)}>
                        Text
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredClients.length === 0 && (
                  <tr>
                    <td colSpan={7}>No clients found in this demo search.</td>
                  </tr>
                )}
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
            <p>Track completed sales for the selected business.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'My Sales Completed',
                  'This will show the employee’s completed sales, service type, amount, date, status, and commission/performance once connected to Supabase.'
                )
              }
            >
              View Sales
            </button>
          </div>

          <div className="quick-card">
            <Trophy size={38} />
            <h3>Sales Contest</h3>
            <p>You are currently ranked #2 this month. Close $1,200 more to reach #1.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'My Sales Contest',
                  'This will show the employee’s ranking, monthly goal, prize progress, and how much more they need to reach the next position.'
                )
              }
            >
              View Contest
            </button>
          </div>

          <div className="quick-card">
            <ClipboardList size={38} />
            <h3>Pending Sales</h3>
            <p>Follow up with clients who are close to closing.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Pending Sales Follow-ups',
                  'This will show leads and clients who are close to closing, need a call back, need missing documents, or need payment follow-up.'
                )
              }
            >
              Open Follow-ups
            </button>
          </div>
        </section>
      )}

      {activeTab === 'payments' && (
        <section className="quick-card-grid">
          <div className="quick-card">
            <CalendarDays size={38} />
            <h3>Upcoming Payments</h3>
            <p>3 payment plans are due this week.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Upcoming Payments',
                  'This will show upcoming payment due dates, payment plan status, reminders, and follow-up notes for assigned clients.'
                )
              }
            >
              View Calendar
            </button>
          </div>

          <div className="quick-card">
            <AlertCircle size={38} />
            <h3>Late Payments</h3>
            <p>1 customer needs a payment reminder today.</p>
            <button className="teal-button" onClick={openPromoText}>
              Send Reminder
            </button>
          </div>

          <div className="quick-card">
            <Calculator size={38} />
            <h3>Payment Plan Calculator</h3>
            <p>Use the calculator inside Tools to estimate monthly payments.</p>
            <button className="teal-button" onClick={() => setActiveTab('tools')}>
              Open Calculator
            </button>
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
              <button
                className="teal-button"
                onClick={() =>
                  openDemoFeature(
                    item,
                    isPetra
                      ? 'This will open Petra Insurance client files, policies, applications, beneficiary information, notes, and uploaded documents.'
                      : 'This will open Alianza customer files, tax documents, filing receipts, IDs, notes, and uploaded paperwork.'
                  )
                }
              >
                View
              </button>
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
            <button className="teal-button" onClick={() => openBirthdayText(clients[0].name)}>
              Preview Text
            </button>
          </div>

          <div className="quick-card">
            <MessageSquareText size={38} />
            <h3>Promo Coupons</h3>
            <p>Text clients promo coupons and seasonal offers.</p>
            <button className="teal-button" onClick={openPromoText}>
              Create Promo
            </button>
          </div>

          <div className="quick-card">
            <AlertCircle size={38} />
            <h3>Service Reminders</h3>
            <p>Remind clients about documents, payments, appointments, or renewals.</p>
            <button className="teal-button" onClick={openPromoText}>
              Send Reminder
            </button>
          </div>
        </section>
      )}

      {activeTab === 'tools' && (
        <section className="tools-grid">
          <div className="tool-panel">
            <div className="tool-panel-head">
              <Calculator />
              <h3>Payment Calculator</h3>
            </div>

            <label>Total Sale / Balance</label>
            <input value={saleAmount} onChange={(e) => setSaleAmount(e.target.value)} />

            <label>Down Payment</label>
            <input value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />

            <label>Months</label>
            <input value={months} onChange={(e) => setMonths(e.target.value)} />

            <div className="calculator-result">
              Estimated monthly payment:
              <strong>${monthlyPayment}</strong>
            </div>
          </div>

          <div className="tool-panel">
            <div className="tool-panel-head">
              <NotebookText />
              <h3>Notes</h3>
            </div>

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a note for this client or follow-up..."
            />

            <button className="primary-button full" onClick={addNote}>
              Add Note
            </button>

            <div className="notes-list">
              {notes.map((note, index) => (
                <div className="note-item" key={`${note}-${index}`}>
                  {note}
                </div>
              ))}
            </div>
          </div>

          <div className="tool-panel">
            <div className="tool-panel-head">
              <HelpCircle />
              <h3>Get Help</h3>
            </div>

            <p>Quick internal help area for scripts, workflows, training, and questions.</p>

            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Internal Help Center',
                  'This will include training scripts, how-to guides, service workflows, sales scripts, FAQs, and internal help for employees.'
                )
              }
            >
              Open Help Center
            </button>
          </div>
        </section>
      )}

      {activeTab === 'calendar' && (
        <section className="quick-card-grid">
          <div className="quick-card">
            <CalendarDays size={38} />
            <h3>Today</h3>
            <p>10:00 AM - Follow up with client</p>
            <p>1:30 PM - Payment plan reminder</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Add Calendar Event',
                  'This will let employees create appointments, follow-up reminders, payment reminders, birthdays, and document deadlines.'
                )
              }
            >
              Add Event
            </button>
          </div>

          <div className="quick-card">
            <AlertCircle size={38} />
            <h3>Upcoming</h3>
            <p>3 birthdays, 2 payment reminders, and 4 file follow-ups this week.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Weekly Calendar View',
                  'This will show the employee’s weekly follow-ups, payment reminders, client appointments, birthdays, and pending tasks.'
                )
              }
            >
              View Week
            </button>
          </div>
        </section>
      )}

      {activeTab === 'reports' && (
        <section className="quick-card-grid">
          <div className="quick-card">
            <FileText size={38} />
            <h3>My Sales Report</h3>
            <p>See your sales by day, week, month, service, and business.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'My Sales Report',
                  'This will show this employee’s sales by day, week, month, business, service, and conversion status.'
                )
              }
            >
              View Report
            </button>
          </div>

          <div className="quick-card">
            <ClipboardList size={38} />
            <h3>My Task Report</h3>
            <p>Track completed tasks, pending work, and follow-up performance.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'My Task Report',
                  'This will show completed tasks, pending tasks, missed follow-ups, client notes, and daily productivity.'
                )
              }
            >
              View Tasks
            </button>
          </div>

          <div className="quick-card">
            <Trophy size={38} />
            <h3>Contest Report</h3>
            <p>View your position in the sales contest and what you need to move up.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Contest Report',
                  'This will show the employee’s contest ranking, sales progress, monthly goals, and prize status.'
                )
              }
            >
              View Contest
            </button>
          </div>
        </section>
      )}

      {selectedClient && (
        <ClientProfileModal
          client={selectedClient}
          activeBusiness={activeBusiness}
          isPetra={isPetra}
          onClose={() => setSelectedClient(null)}
          onBirthdayText={openBirthdayText}
          onPromoText={openPromoText}
        />
      )}

      {demoFeature && (
        <DemoFeatureModal
          title={demoFeature.title}
          description={demoFeature.description}
          onClose={() => setDemoFeature(null)}
        />
      )}

      {messagePreview && (
        <div className="modal-backdrop">
          <div className="demo-modal">
            <div className="demo-modal-head">
              <h2>{messagePreview.title}</h2>
              <button onClick={() => setMessagePreview(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="message-preview-box">
              {messagePreview.body}
            </div>

            <div className="modal-actions">
              <button className="secondary-button" onClick={() => setMessagePreview(null)}>
                Cancel
              </button>
              <button className="primary-button" onClick={() => setMessagePreview(null)}>
                Demo Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}