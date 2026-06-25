import {
  Activity,
  AlertCircle,
  BarChart3,
  Building2,
  CalendarDays,
  ClipboardList,
  Crown,
  DollarSign,
  Eye,
  FileText,
  Medal,
  MessageSquareText,
  ShieldCheck,
  Trophy,
  Users
} from 'lucide-react'
import { useState } from 'react'
import { Tabs } from '../../components/ui/Tabs'

type Props = {
  onViewEmployee: (employeeName: string, business: string) => void
}

export function AdminDashboardPage({ onViewEmployee }: Props) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sales', label: 'Sales' },
    { id: 'competitions', label: 'Competitions' },
    { id: 'employees', label: 'Employees' },
    { id: 'payments', label: 'Payment Plans' },
    { id: 'reports', label: 'Reports' },
    { id: 'activity', label: 'Activity' }
  ]

  const employeeRows = [
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

  return (
    <div>
      <div className="page-heading">
        <h1>Alma Admin Hub</h1>
        <p>Owner dashboard for sales, employees, payment plans, reports, and both businesses.</p>
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
              <DollarSign />
              <span>Total Sales</span>
              <strong>$38.3k</strong>
              <small>This month preview</small>
            </div>

            <div className="admin-stat-card">
              <Users />
              <span>Employees</span>
              <strong>18</strong>
              <small>Across both businesses</small>
            </div>

            <div className="admin-stat-card">
              <ClipboardList />
              <span>Open Tasks</span>
              <strong>24</strong>
              <small>Follow-ups and reminders</small>
            </div>
          </section>

          <section className="quick-card-grid">
            <div className="quick-card">
              <Trophy size={38} />
              <h3>Sales Contest</h3>
              <p>Track monthly winners, employee rankings, and prize goals.</p>
              <button className="teal-button" onClick={() => setActiveTab('competitions')}>View Contest</button>
            </div>

            <div className="quick-card">
              <Eye size={38} />
              <h3>View Employee Dashboards</h3>
              <p>Open an employee dashboard to see their clients, tasks, sales, and reports.</p>
              <button className="teal-button" onClick={() => setActiveTab('employees')}>View Employees</button>
            </div>

            <div className="quick-card">
              <MessageSquareText size={38} />
              <h3>Client Messaging</h3>
              <p>Birthday messages, promo coupons, service reminders, and follow-ups.</p>
              <button className="teal-button">Open Messages</button>
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
            <button className="teal-button">View Ranking</button>
          </div>

          <div className="quick-card">
            <Medal size={38} />
            <h3>Top Employees</h3>
            <p>Rank employees by sales, completed files, referrals, or payment collections.</p>
            <button className="teal-button">Open Board</button>
          </div>

          <div className="quick-card">
            <Trophy size={38} />
            <h3>Contest Prize</h3>
            <p>Set monthly contest goals and prizes for Alianza and Petra Insurance.</p>
            <button className="teal-button">Edit Contest</button>
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
            <button className="teal-button">View Plans</button>
          </div>

          <div className="quick-card">
            <AlertCircle size={38} />
            <h3>Late Payments</h3>
            <p>3 payment plans need follow-up this week.</p>
            <button className="teal-button">Follow Up</button>
          </div>

          <div className="quick-card">
            <CalendarDays size={38} />
            <h3>Upcoming Payments</h3>
            <p>See what payments are due today, this week, or this month.</p>
            <button className="teal-button">Open Calendar</button>
          </div>
        </section>
      )}

      {activeTab === 'reports' && (
        <section className="quick-card-grid">
          <div className="quick-card">
            <BarChart3 size={38} />
            <h3>All Business Reports</h3>
            <p>View Alianza, Petra Insurance, or combined reports.</p>
            <button className="teal-button">Open Reports</button>
          </div>

          <div className="quick-card">
            <FileText size={38} />
            <h3>Employee Reports</h3>
            <p>Sales, clients, tasks, payment plans, and performance by employee.</p>
            <button className="teal-button">View Reports</button>
          </div>

          <div className="quick-card">
            <Activity size={38} />
            <h3>Activity Logs</h3>
            <p>Track who created, edited, uploaded, assigned, or completed work.</p>
            <button className="teal-button">View Logs</button>
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
    </div>
  )
}
