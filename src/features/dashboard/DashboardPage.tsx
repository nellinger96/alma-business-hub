import {
  HeartPulse,
  Landmark,
  FileText,
  ClipboardList,
  FolderOpen,
  CheckCircle2,
  ShieldCheck,
  FileCheck2
} from 'lucide-react'
import { useState } from 'react'
import { Tabs } from '../../components/ui/Tabs'

type Props = {
  activeBusiness: string
}

export function DashboardPage({ activeBusiness }: Props) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'clients', label: activeBusiness === 'Petra Insurance' ? 'Clients' : 'Customers' },
    { id: 'services', label: 'Services' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'documents', label: 'Documents' }
  ]

  const isPetra = activeBusiness === 'Petra Insurance'

  const services = isPetra
    ? [
        {
          label: 'Life Insurance',
          description: 'Manage life insurance leads, clients, policies, documents, and follow-ups.',
          icon: HeartPulse
        },
        {
          label: 'Pre-Need Funeral Services',
          description: 'Track funeral planning clients, service details, documents, and appointment follow-ups.',
          icon: ShieldCheck
        }
      ]
    : [
        {
          label: 'Tax Services',
          description: 'Manage tax customers, filing status, required documents, and follow-ups.',
          icon: Landmark
        },
        {
          label: 'Document Filing',
          description: 'Track document preparation, customer paperwork, filing progress, and completion status.',
          icon: FileCheck2
        }
      ]

  const rows = isPetra
    ? [
        {
          id: 'P-1001',
          name: 'Maria Gonzalez',
          phone: '(714) 555-1822',
          service: 'Life Insurance',
          createdBy: 'Alma Mora',
          status: 'Needs Follow-up',
          date: '06/23/2026'
        },
        {
          id: 'P-1002',
          name: 'Jose Ramirez',
          phone: '(909) 555-4410',
          service: 'Pre-Need Funeral Services',
          createdBy: 'Petra Team',
          status: 'Documents Pending',
          date: '06/23/2026'
        },
        {
          id: 'P-1003',
          name: 'Ana Martinez',
          phone: '(951) 555-9033',
          service: 'Life Insurance',
          createdBy: 'Alma Mora',
          status: 'Quote Review',
          date: '06/22/2026'
        }
      ]
    : [
        {
          id: 'A-2001',
          name: 'Luis Hernandez',
          phone: '(714) 555-2290',
          service: 'Tax Services',
          createdBy: 'Alianza Team',
          status: 'Missing W-2',
          date: '06/23/2026'
        },
        {
          id: 'A-2002',
          name: 'Carmen Lopez',
          phone: '(909) 555-7001',
          service: 'Document Filing',
          createdBy: 'Alianza Team',
          status: 'In Progress',
          date: '06/23/2026'
        },
        {
          id: 'A-2003',
          name: 'Miguel Torres',
          phone: '(951) 555-1188',
          service: 'Tax Services',
          createdBy: 'Alma Mora',
          status: 'Ready to File',
          date: '06/22/2026'
        }
      ]

  return (
    <div>
      <div className="page-heading">
        <h1>{activeBusiness} Dashboard</h1>
        <p>
          {isPetra
            ? 'Manage life insurance clients, pre-need funeral service clients, documents, and follow-ups.'
            : 'Manage tax customers, document filing customers, paperwork, tasks, and follow-ups.'}
        </p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && (
        <>
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

          <section className="dashboard-stat-grid">
            <div className="dashboard-stat-card">
              <FileText />
              <span>{isPetra ? 'Active Clients' : 'Active Customers'}</span>
              <strong>{isPetra ? '82' : '126'}</strong>
            </div>

            <div className="dashboard-stat-card">
              <FolderOpen />
              <span>Open Files</span>
              <strong>{isPetra ? '18' : '31'}</strong>
            </div>

            <div className="dashboard-stat-card">
              <ClipboardList />
              <span>Tasks Due</span>
              <strong>{isPetra ? '10' : '14'}</strong>
            </div>

            <div className="dashboard-stat-card">
              <FileCheck2 />
              <span>Pending Documents</span>
              <strong>{isPetra ? '4' : '9'}</strong>
            </div>
          </section>
        </>
      )}

      {activeTab === 'clients' && (
        <section className="split-panels">
          <div className="empty-panel">
            <h3>Follow-ups</h3>
            <div className="mini-list">
              <p>{isPetra ? '2 life insurance follow-ups' : '4 tax filing follow-ups'}</p>
              <p>{isPetra ? '1 pre-need appointment pending' : '3 document filing customers pending'}</p>
              <p>{isPetra ? '4 documents waiting review' : '9 documents missing'}</p>
            </div>
          </div>

          <div className="table-panel">
            <h3>{isPetra ? 'Clients to Date' : 'Customers to Date'}</h3>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>ID / Name</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Created by</th>
                    <th>Creation Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <strong>{row.id}</strong>
                        <br />
                        {row.name}
                      </td>
                      <td>{row.phone}</td>
                      <td>{row.service}</td>
                      <td>{row.status}</td>
                      <td>{row.createdBy}</td>
                      <td>{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'services' && (
        <section className="quick-card-grid">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <div className="quick-card" key={service.label}>
                <Icon size={38} />
                <h3>{service.label}</h3>
                <p>{service.description}</p>
                <button className="teal-button">Open</button>
              </div>
            )
          })}
        </section>
      )}

      {activeTab === 'tasks' && (
        <section className="task-list">
          {(isPetra
            ? [
                'Call Maria Gonzalez about life insurance quote',
                'Review Jose Ramirez pre-need service documents',
                'Schedule follow-up appointment for Ana Martinez',
                'Check pending beneficiary information'
              ]
            : [
                'Request missing W-2 from Luis Hernandez',
                'Review Carmen Lopez document filing packet',
                'Confirm Miguel Torres tax filing status',
                'Upload completed document filing receipt'
              ]
          ).map((task) => (
            <div className="task-item" key={task}>
              <CheckCircle2 />
              <div>
                <strong>{task}</strong>
                <p>Assigned task preview. This will connect to real employee tasks later.</p>
              </div>
              <span className="status-pill pending">Pending</span>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'documents' && (
        <section className="quick-card-grid">
          {(isPetra
            ? ['Application', 'Beneficiary Info', 'Policy PDF', 'ID Document', 'Payment Receipt', 'Client Notes']
            : ['W-2', '1099', 'ID Document', 'Tax Return Draft', 'Filing Receipt', 'Customer Notes']
          ).map((doc) => (
            <div className="quick-card" key={doc}>
              <FileText size={38} />
              <h3>{doc}</h3>
              <p>Document placeholder for static prototype.</p>
              <button className="teal-button">View</button>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
