import {
  HeartPulse,
  Building2,
  Bike,
  Car,
  Home,
  FileBadge,
  FilePlus,
  Waves,
  Landmark,
  ClipboardList,
  FolderOpen,
  FileText,
  CheckCircle2
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
    { id: 'prospects', label: 'Prospects' },
    { id: 'policies', label: 'Policies / Files' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'documents', label: 'Documents' }
  ]

  const categories = [
    { label: 'Life & Health', icon: HeartPulse },
    { label: 'Commercial', icon: Building2 },
    { label: 'Motorcycle', icon: Bike },
    { label: 'Auto', icon: Car },
    { label: 'Home', icon: Home },
    { label: 'Registration Services', icon: FileBadge },
    { label: 'Miscellaneous', icon: FilePlus },
    { label: 'Recreational', icon: Waves },
    { label: 'Income Tax', icon: Landmark }
  ]

  const leads = [
    {
      id: '1365543',
      name: 'Julia Avila',
      phone: '(949) 736-0275',
      lob: '',
      createdBy: 'Giancarlo J Ahumada',
      date: '10/20/2025'
    },
    {
      id: '1340287',
      name: 'Miguel Luna',
      phone: '(714) 781-9362',
      lob: 'Life',
      createdBy: 'Giancarlo J Ahumada',
      date: '08/14/2025'
    },
    {
      id: '1338674',
      name: 'Angela Maria Quinonez Ortega',
      phone: '(714) 335-5401',
      lob: '',
      createdBy: 'Carolina Medina',
      date: '08/09/2025'
    },
    {
      id: '1338673',
      name: 'Raul Ortega Mejia',
      phone: '(714) 335-5401',
      lob: '',
      createdBy: 'Carolina Medina',
      date: '08/09/2025'
    }
  ]

  return (
    <div>
      <div className="page-heading">
        <h1>{activeBusiness} Dashboard</h1>
        <p>Quick access to prospects, policies, files, reports, tasks, and follow-ups.</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && (
        <>
          <section className="category-row">
            {categories.map((category) => {
              const Icon = category.icon

              return (
                <button className="category-card" key={category.label}>
                  <div className="category-icon">
                    <Icon size={34} />
                  </div>
                  <span>{category.label}</span>
                </button>
              )
            })}
          </section>

          <section className="dashboard-stat-grid">
            <div className="dashboard-stat-card">
              <UserIconFallback />
              <span>Prospects</span>
              <strong>42</strong>
            </div>

            <div className="dashboard-stat-card">
              <FolderOpen />
              <span>Open Policies</span>
              <strong>18</strong>
            </div>

            <div className="dashboard-stat-card">
              <ClipboardList />
              <span>Tasks Due</span>
              <strong>9</strong>
            </div>

            <div className="dashboard-stat-card">
              <FileText />
              <span>Documents</span>
              <strong>73</strong>
            </div>
          </section>
        </>
      )}

      {activeTab === 'prospects' && (
        <section className="split-panels">
          <div className="empty-panel">
            <h3>Suspenses</h3>
            <div className="mini-list">
              <p>3 follow-ups due today</p>
              <p>2 missing documents</p>
              <p>1 quote waiting approval</p>
            </div>
          </div>

          <div className="table-panel">
            <h3>Leads/Prospects to Date</h3>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Customer Prospect Name</th>
                    <th>Phone Number Mobile 1</th>
                    <th>Email</th>
                    <th>Referral Name / Source</th>
                    <th>LOB</th>
                    <th>Created by</th>
                    <th>Creation Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <strong>{lead.id}</strong>
                        <br />
                        {lead.name}
                      </td>
                      <td>{lead.phone}</td>
                      <td></td>
                      <td></td>
                      <td>{lead.lob}</td>
                      <td>{lead.createdBy}</td>
                      <td>{lead.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'policies' && (
        <section className="quick-card-grid">
          {['Auto Policy', 'Home Policy', 'Commercial Policy', 'Life Policy', 'Health Policy', 'Registration Services'].map((item) => (
            <div className="quick-card" key={item}>
              <FolderOpen size={38} />
              <h3>{item}</h3>
              <p>Create, update, or review files for {activeBusiness}.</p>
              <button className="teal-button">Open</button>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'tasks' && (
        <section className="task-list">
          {['Call Julia Avila about missing document', 'Review Miguel Luna policy file', 'Assign quote follow-up to Carolina', 'Check pending home policy application'].map((task) => (
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
          {['Driver License', 'Policy PDF', 'Signed Application', 'Proof of Address', 'Payment Receipt', 'Client Notes'].map((doc) => (
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

function UserIconFallback() {
  return <HeartPulse />
}
