import {
  Activity,
  AlertCircle,
  BarChart3,
  Building2,
  CalendarDays,
  Crown,
  DollarSign,
  Eye,
  FileText,
  MailPlus,
  Medal,
  ShieldCheck,
  Trophy,
  Users
} from 'lucide-react'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { Tabs } from '../../components/ui/Tabs'
import { DemoFeatureModal } from '../../components/ui/DemoFeatureModal'
import { LeadProfileModal } from './components/LeadProfileModal'
import type { WebsiteLead } from '../../types/websiteLead'

type Props = {
  onViewEmployee: (employeeName: string, business: string) => void
  websiteLeads: WebsiteLead[]
  setWebsiteLeads: Dispatch<SetStateAction<WebsiteLead[]>>
}

type EmployeeRow = {
  name: string
  role: string
  business: 'Alianza' | 'Petra Insurance' | 'All Businesses'
  sales: string
  clients: number
}

export function AdminDashboardPage({ onViewEmployee, websiteLeads, setWebsiteLeads }: Props) {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedLead, setSelectedLead] = useState<WebsiteLead | null>(null)
  const [demoFeature, setDemoFeature] = useState<{ title: string; description: string } | null>(null)

  const openDemoFeature = (title: string, description: string) => {
    setDemoFeature({ title, description })
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'website-leads', label: 'Website Leads' },
    { id: 'sales', label: 'Sales' },
    { id: 'competitions', label: 'Competitions' },
    { id: 'employees', label: 'Employees' },
    { id: 'payments', label: 'Payment Plans' },
    { id: 'reports', label: 'Reports' },
    { id: 'activity', label: 'Activity' }
  ]

  const employeeRows: EmployeeRow[] = [
    { name: 'Alma Mora', role: 'Super Admin', business: 'All Businesses', sales: '$18,400', clients: 42 },
    { name: 'Nelly Lopez', role: 'Admin', business: 'Alianza', sales: '$7,850', clients: 31 },
    { name: 'Carolina Medina', role: 'Employee', business: 'Alianza', sales: '$5,200', clients: 24 },
    { name: 'Petra Team Member', role: 'Employee', business: 'Petra Insurance', sales: '$6,900', clients: 19 }
  ]

  const salesRows = [
    { business: 'Alianza', service: 'Tax Services', employee: 'Nelly Lopez', amount: '$350', status: 'Paid', date: 'Today' },
    { business: 'Petra Insurance', service: 'Life Insurance', employee: 'Petra Team Member', amount: '$1,200', status: 'Pending', date: 'Today' },
    { business: 'Alianza', service: 'Document Filing', employee: 'Carolina Medina', amount: '$180', status: 'Paid', date: 'Yesterday' },
    { business: 'Petra Insurance', service: 'Pre-Need Funeral Services', employee: 'Alma Mora', amount: '$2,500', status: 'Payment Plan', date: 'Yesterday' }
  ]

  const leadStats = useMemo(() => {
    return {
      total: websiteLeads.length,
      new: websiteLeads.filter((lead) => lead.status === 'New').length,
      unassigned: websiteLeads.filter((lead) => lead.assignedTo === 'Unassigned').length,
      converted: websiteLeads.filter((lead) => lead.status === 'Converted').length
    }
  }, [websiteLeads])

  const assignLead = (leadId: string, employeeName: string) => {
    const nextStatus = employeeName === 'Unassigned' ? 'New' : 'Assigned'

    setWebsiteLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              assignedTo: employeeName,
              status: nextStatus
            }
          : lead
      )
    )

    setSelectedLead((currentLead) =>
      currentLead && currentLead.id === leadId
        ? {
            ...currentLead,
            assignedTo: employeeName,
            status: nextStatus
          }
        : currentLead
    )
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

    setSelectedLead((currentLead) =>
      currentLead && currentLead.id === leadId
        ? {
            ...currentLead,
            status
          }
        : currentLead
    )
  }

  const getStatusClass = (status: WebsiteLead['status']) => {
    if (status === 'Converted') return 'status-pill active'
    if (status === 'New') return 'status-pill new'
    if (status === 'Lost') return 'status-pill lost'
    return 'status-pill pending'
  }

  return (
    <div>
      <div className="page-heading">
        <h1>Alma Admin Hub</h1>
        <p>Owner dashboard for leads, sales, employees, payment plans, reports, and both businesses.</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && (
        <>
          <section className="admin-stat-grid">
            <div className="admin-stat-card">
              <Building2 />
              <span>Businesses</span>
              <strong>2</strong>
              <small>Alianza + Petra Insurance</small>
            </div>

            <div className="admin-stat-card">
              <MailPlus />
              <span>Website Leads</span>
              <strong>{leadStats.total}</strong>
              <small>{leadStats.unassigned} unassigned</small>
            </div>

            <div className="admin-stat-card">
              <DollarSign />
              <span>Total Sales</span>
              <strong>$38.3k</strong>
              <small>This month preview</small>
            </div>

            <div className="admin-stat-card">
              <Users />
              <span>Employees</span>
              <strong>25</strong>
              <small>5 Alianza + 20 Petra</small>
            </div>
          </section>

          <section className="quick-card-grid">
            <div className="quick-card">
              <MailPlus size={38} />
              <h3>Website Leads Inbox</h3>
              <p>View new quote/help requests from Alianza and Petra websites, then assign them to employees.</p>
              <button className="teal-button" onClick={() => setActiveTab('website-leads')}>
                Open Leads
              </button>
            </div>

            <div className="quick-card">
              <Trophy size={38} />
              <h3>Sales Contest</h3>
              <p>Track monthly winners, employee rankings, and prize goals.</p>
              <button className="teal-button" onClick={() => setActiveTab('competitions')}>
                View Contest
              </button>
            </div>

            <div className="quick-card">
              <Eye size={38} />
              <h3>View Employee Dashboards</h3>
              <p>Open employee dashboards to see assigned leads, clients, tasks, sales, and reports.</p>
              <button className="teal-button" onClick={() => setActiveTab('employees')}>
                View Employees
              </button>
            </div>
          </section>
        </>
      )}

      {activeTab === 'website-leads' && (
        <>
          <section className="admin-stat-grid">
            <div className="admin-stat-card">
              <MailPlus />
              <span>Total Leads</span>
              <strong>{leadStats.total}</strong>
              <small>From public websites</small>
            </div>

            <div className="admin-stat-card">
              <AlertCircle />
              <span>New Leads</span>
              <strong>{leadStats.new}</strong>
              <small>Need review</small>
            </div>

            <div className="admin-stat-card">
              <Users />
              <span>Unassigned</span>
              <strong>{leadStats.unassigned}</strong>
              <small>Need employee assignment</small>
            </div>

            <div className="admin-stat-card">
              <ShieldCheck />
              <span>Converted</span>
              <strong>{leadStats.converted}</strong>
              <small>Turned into clients</small>
            </div>
          </section>

          <section className="table-panel admin-table">
            <h3>Website Leads Inbox</h3>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Lead</th>
                    <th>Business</th>
                    <th>Service</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Assigned To</th>
                    <th>Created</th>
                    <th>Open</th>
                  </tr>
                </thead>

                <tbody>
                  {websiteLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <strong>{lead.id}</strong>
                        <br />
                        {lead.fullName}
                        <br />
                        <small>{lead.phone}</small>
                      </td>
                      <td>{lead.business}</td>
                      <td>{lead.service}</td>
                      <td>{lead.source}</td>
                      <td>
                        <span className={getStatusClass(lead.status)}>
                          {lead.status}
                        </span>
                      </td>
                      <td>{lead.assignedTo}</td>
                      <td>{lead.createdAt}</td>
                      <td>
                        <button
                          className="small-action-button"
                          onClick={() => setSelectedLead(lead)}
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {activeTab === 'sales' && (
        <section className="table-panel admin-table">
          <h3>Sales Tracker</h3>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Service</th>
                  <th>Employee</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {salesRows.map((sale, index) => (
                  <tr key={index}>
                    <td>{sale.business}</td>
                    <td>{sale.service}</td>
                    <td>{sale.employee}</td>
                    <td>{sale.amount}</td>
                    <td>{sale.status}</td>
                    <td>{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'competitions' && (
        <section className="quick-card-grid">
          <div className="quick-card">
            <Crown size={38} />
            <h3>Current Leader</h3>
            <p>Alma Mora is leading this month with $18,400 in sales.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Sales Contest Ranking',
                  'This will show live employee rankings by business, service, sales amount, completed files, and monthly contest goals once Supabase is connected.'
                )
              }
            >
              View Ranking
            </button>
          </div>

          <div className="quick-card">
            <Medal size={38} />
            <h3>Top Employees</h3>
            <p>Rank employees by sales, completed files, referrals, or payment collections.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Top Employee Board',
                  'This will show top employees across Alianza and Petra Insurance, with filters for sales, follow-ups, payment collections, and converted leads.'
                )
              }
            >
              Open Board
            </button>
          </div>

          <div className="quick-card">
            <Trophy size={38} />
            <h3>Contest Prize</h3>
            <p>Set monthly contest goals and prizes for Alianza and Petra Insurance.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Edit Monthly Contest',
                  'This will let Alma create monthly sales contests, set prizes, choose which services count, and track employee performance.'
                )
              }
            >
              Edit Contest
            </button>
          </div>
        </section>
      )}

      {activeTab === 'employees' && (
        <section className="table-panel admin-table">
          <h3>Employee Dashboards</h3>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Role</th>
                  <th>Business Access</th>
                  <th>Sales</th>
                  <th>Clients</th>
                  <th>Dashboard</th>
                </tr>
              </thead>
              <tbody>
                {employeeRows.map((employee) => (
                  <tr key={employee.name}>
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                    <td>{employee.business}</td>
                    <td>{employee.sales}</td>
                    <td>{employee.clients}</td>
                    <td>
                      <button
                        className="small-action-button"
                        onClick={() => onViewEmployee(employee.name, employee.business)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'payments' && (
        <section className="quick-card-grid">
          <div className="quick-card">
            <DollarSign size={38} />
            <h3>Active Payment Plans</h3>
            <p>15 customers currently have active payment plans across both businesses.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Active Payment Plans',
                  'This will show all active payment plans across both businesses, including balance, due date, assigned employee, payment status, and follow-up notes.'
                )
              }
            >
              View Plans
            </button>
          </div>

          <div className="quick-card">
            <AlertCircle size={38} />
            <h3>Late Payments</h3>
            <p>3 payment plans need follow-up this week.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Late Payment Follow-up',
                  'This will help Alma or employees follow up with clients who have late payments using reminders, notes, and payment status tracking.'
                )
              }
            >
              Follow Up
            </button>
          </div>

          <div className="quick-card">
            <CalendarDays size={38} />
            <h3>Upcoming Payments</h3>
            <p>See what payments are due today, this week, or this month.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Payment Calendar',
                  'This will show upcoming payment due dates, client reminders, birthdays, appointments, and follow-up tasks in one calendar view.'
                )
              }
            >
              Open Calendar
            </button>
          </div>
        </section>
      )}

      {activeTab === 'reports' && (
        <section className="quick-card-grid">
          <div className="quick-card">
            <BarChart3 size={38} />
            <h3>All Business Reports</h3>
            <p>View Alianza, Petra Insurance, or combined reports.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'All Business Reports',
                  'This will show combined and separate reports for Alianza and Petra Insurance, including leads, sales, payment plans, employee activity, and service performance.'
                )
              }
            >
              Open Reports
            </button>
          </div>

          <div className="quick-card">
            <FileText size={38} />
            <h3>Employee Reports</h3>
            <p>Sales, clients, tasks, payment plans, and performance by employee.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Employee Reports',
                  'This will show performance by employee, including assigned leads, converted clients, sales, completed tasks, notes, and follow-up activity.'
                )
              }
            >
              View Reports
            </button>
          </div>

          <div className="quick-card">
            <Activity size={38} />
            <h3>Activity Logs</h3>
            <p>Track who created, edited, uploaded, assigned, or completed work.</p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Activity Logs',
                  'This will track who created, edited, assigned, uploaded, followed up, converted, or completed work inside the system.'
                )
              }
            >
              View Logs
            </button>
          </div>
        </section>
      )}

      {activeTab === 'activity' && (
        <section className="empty-state-panel">
          <Activity size={44} />
          <h2>Activity Logs</h2>
          <p>This will show employee actions, client updates, payment plan changes, document uploads, and completed sales.</p>
        </section>
      )}

      {selectedLead && (
        <LeadProfileModal
          lead={selectedLead}
          employees={employeeRows.map((employee) => ({
            name: employee.name,
            business: employee.business
          }))}
          onClose={() => setSelectedLead(null)}
          onAssign={assignLead}
          onStatusChange={updateLeadStatus}
        />
      )}

      {demoFeature && (
        <DemoFeatureModal
          title={demoFeature.title}
          description={demoFeature.description}
          onClose={() => setDemoFeature(null)}
        />
      )}
    </div>
  )
}