import {
  Building2,
  Users,
  ClipboardList,
  FileText,
  ShieldCheck,
  Activity,
  BriefcaseBusiness,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'
import { Tabs } from '../../components/ui/Tabs'

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'businesses', label: 'Businesses' },
    { id: 'employees', label: 'Employees' },
    { id: 'activity', label: 'Activity' },
    { id: 'permissions', label: 'Permissions' },
    { id: 'reports', label: 'Reports' }
  ]

  const employeeRows = [
    { name: 'Alma Mora', role: 'Super Admin', business: 'All Businesses', status: 'Active' },
    { name: 'Nelly Lopez', role: 'Admin', business: 'Alianza', status: 'Active' },
    { name: 'Carolina Medina', role: 'Employee', business: 'Alianza', status: 'Active' },
    { name: 'Petra Team Member', role: 'Employee', business: 'Petra Insurance', status: 'Pending' }
  ]

  return (
    <div>
      <div className="page-heading">
        <h1>Alma Admin Hub</h1>
        <p>Owner view for managing Alianza, Petra Insurance, employees, permissions, and activity.</p>
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
              <Users />
              <span>Employees</span>
              <strong>8</strong>
              <small>Across both businesses</small>
            </div>

            <div className="admin-stat-card">
              <ClipboardList />
              <span>Open Tasks</span>
              <strong>24</strong>
              <small>Follow-ups and reminders</small>
            </div>

            <div className="admin-stat-card">
              <FileText />
              <span>Documents</span>
              <strong>146</strong>
              <small>Client and policy files</small>
            </div>
          </section>

          <section className="admin-business-grid">
            <div className="business-summary-card">
              <div className="business-summary-head">
                <BriefcaseBusiness />
                <div>
                  <h2>Alianza</h2>
                  <p>Insurance services, prospects, policies, files, and reports.</p>
                </div>
              </div>

              <div className="mini-metrics">
                <span><strong>126</strong> Clients</span>
                <span><strong>14</strong> Open Tasks</span>
                <span><strong>7</strong> Pending Docs</span>
              </div>
            </div>

            <div className="business-summary-card">
              <div className="business-summary-head">
                <BriefcaseBusiness />
                <div>
                  <h2>Petra Insurance</h2>
                  <p>Separate business dashboard with its own clients, files, and employees.</p>
                </div>
              </div>

              <div className="mini-metrics">
                <span><strong>82</strong> Clients</span>
                <span><strong>10</strong> Open Tasks</span>
                <span><strong>4</strong> Pending Docs</span>
              </div>
            </div>
          </section>

          <section className="table-panel admin-table">
            <h3>Recent Activity</h3>
            <table>
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Business</th>
                  <th>User</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>New prospect created</td>
                  <td>Alianza</td>
                  <td>Carolina Medina</td>
                  <td>Today, 9:15 AM</td>
                </tr>
                <tr>
                  <td>Policy document uploaded</td>
                  <td>Petra Insurance</td>
                  <td>Petra Team Member</td>
                  <td>Today, 10:22 AM</td>
                </tr>
                <tr>
                  <td>Task assigned</td>
                  <td>Alianza</td>
                  <td>Alma Mora</td>
                  <td>Yesterday, 4:40 PM</td>
                </tr>
              </tbody>
            </table>
          </section>
        </>
      )}

      {activeTab === 'businesses' && (
        <section className="admin-business-grid">
          <div className="business-summary-card">
            <h2>Alianza</h2>
            <p>This business has its own employees, clients, policies, tasks, reports, and documents.</p>
            <button className="primary-button">Open Alianza Dashboard</button>
          </div>

          <div className="business-summary-card">
            <h2>Petra Insurance</h2>
            <p>This business stays separated from Alianza, but Alma can oversee both from this admin hub.</p>
            <button className="primary-button">Open Petra Dashboard</button>
          </div>
        </section>
      )}

      {activeTab === 'employees' && (
        <section className="table-panel admin-table">
          <h3>Employee Accounts</h3>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th>Business Access</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employeeRows.map((employee) => (
                <tr key={employee.name}>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.business}</td>
                  <td>
                    <span className={employee.status === 'Active' ? 'status-pill active' : 'status-pill pending'}>
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {activeTab === 'activity' && (
        <section className="empty-state-panel">
          <Activity size={44} />
          <h2>Activity Logs</h2>
          <p>This will show who created, edited, uploaded, assigned, or completed work across both businesses.</p>
        </section>
      )}

      {activeTab === 'permissions' && (
        <section className="empty-state-panel">
          <ShieldCheck size={44} />
          <h2>Permissions Preview</h2>
          <p>After Supabase is connected, this is where Alma can manage who can access Alianza, Petra Insurance, or both.</p>
        </section>
      )}

      {activeTab === 'reports' && (
        <section className="empty-state-panel">
          <AlertCircle size={44} />
          <h2>Admin Reports</h2>
          <p>Alma will be able to view reports for Alianza, Petra Insurance, or both businesses combined.</p>
        </section>
      )}
    </div>
  )
}
