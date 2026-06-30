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
  RefreshCw,
  Search,
  ShieldCheck,
  Trophy,
  Users
} from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { Tabs } from '../../components/ui/Tabs'
import { DemoFeatureModal } from '../../components/ui/DemoFeatureModal'
import { LeadProfileModal } from './components/LeadProfileModal'
import type { WebsiteLead } from '../../types/websiteLead'
import type { NexoProfile } from '../../services/authService'
import { createClientFromLead } from '../../services/clientService'
import {
  assignWebsiteLead as assignWebsiteLeadInAppwrite,
  listWebsiteLeads,
  updateWebsiteLeadStatus as updateWebsiteLeadStatusInAppwrite
} from '../../services/leadService'
import {
  approveProfile,
  listActiveProfiles,
  listPendingProfiles,
  rejectProfile
} from '../../services/profileService'

type Props = {
  onViewEmployee: (employeeName: string, business: string) => void
  websiteLeads: WebsiteLead[]
  setWebsiteLeads: Dispatch<SetStateAction<WebsiteLead[]>>
  isDemoMode: boolean
}

type EmployeeRow = {
  name: string
  email: string
  role: string
  business: 'Alianza' | 'Petra Insurance' | 'All Businesses'
  sales: string
  clients: string
  userId?: string
  profileId?: string
}

type BusinessFilter = 'All' | 'Alianza' | 'Petra Insurance'
type StatusFilter = 'All' | WebsiteLead['status']

function getBusinessAccess(profile: NexoProfile): EmployeeRow['business'] {
  if (profile.requested_business === 'Petra Insurance') return 'Petra Insurance'
  if (profile.requested_business === 'Both') return 'All Businesses'
  return 'Alianza'
}

function getRoleLabel(role: NexoProfile['role']) {
  if (role === 'super_admin') return 'Super Admin'
  if (role === 'admin') return 'Admin'
  if (role === 'manager') return 'Manager'
  if (role === 'viewer') return 'Viewer'
  return 'Employee'
}

export function AdminDashboardPage({
  onViewEmployee,
  websiteLeads,
  setWebsiteLeads,
  isDemoMode
}: Props) {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedLead, setSelectedLead] = useState<WebsiteLead | null>(null)
  const [demoFeature, setDemoFeature] = useState<{ title: string; description: string } | null>(null)

  const [leadSearch, setLeadSearch] = useState('')
  const [businessFilter, setBusinessFilter] = useState<BusinessFilter>('All')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [pendingProfiles, setPendingProfiles] = useState<NexoProfile[]>([])
  const [isLoadingPending, setIsLoadingPending] = useState(false)
  const [pendingError, setPendingError] = useState('')

  const [activeProfiles, setActiveProfiles] = useState<NexoProfile[]>([])
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false)
  const [employeeError, setEmployeeError] = useState('')

  const openDemoFeature = (title: string, description: string) => {
    setDemoFeature({ title, description })
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'website-leads', label: 'Website Leads' },
    { id: 'pending-accounts', label: 'Pending Accounts' },
    { id: 'sales', label: 'Sales' },
    { id: 'competitions', label: 'Competitions' },
    { id: 'employees', label: 'Employees' },
    { id: 'payments', label: 'Payment Plans' },
    { id: 'reports', label: 'Reports' },
    { id: 'activity', label: 'Activity' }
  ]

  const demoEmployeeRows: EmployeeRow[] = [
    {
      name: 'Alma Mora',
      email: 'alma@example.com',
      role: 'Super Admin',
      business: 'All Businesses',
      sales: '$18,400',
      clients: '42'
    },
    {
      name: 'Nelly Lopez',
      email: 'nelly@example.com',
      role: 'Admin',
      business: 'Alianza',
      sales: '$7,850',
      clients: '31'
    },
    {
      name: 'Carolina Medina',
      email: 'carolina@example.com',
      role: 'Employee',
      business: 'Alianza',
      sales: '$5,200',
      clients: '24'
    },
    {
      name: 'Petra Team Member',
      email: 'petra@example.com',
      role: 'Employee',
      business: 'Petra Insurance',
      sales: '$6,900',
      clients: '19'
    }
  ]

  const realEmployeeRows = useMemo<EmployeeRow[]>(() => {
    return activeProfiles.map((profile) => ({
      name: profile.full_name,
      email: profile.email,
      role: getRoleLabel(profile.role),
      business: getBusinessAccess(profile),
      sales: 'Preview',
      clients: 'Preview',
      userId: profile.user_id,
      profileId: profile.$id
    }))
  }, [activeProfiles])

  const employeeRows = isDemoMode ? demoEmployeeRows : realEmployeeRows

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

  const filteredWebsiteLeads = useMemo(() => {
    const search = leadSearch.trim().toLowerCase()

    return websiteLeads.filter((lead) => {
      const matchesSearch =
        !search ||
        lead.fullName.toLowerCase().includes(search) ||
        lead.phone.toLowerCase().includes(search) ||
        lead.email.toLowerCase().includes(search) ||
        lead.service.toLowerCase().includes(search) ||
        lead.source.toLowerCase().includes(search) ||
        lead.id.toLowerCase().includes(search)

      const matchesBusiness =
        businessFilter === 'All' || lead.business === businessFilter

      const matchesStatus =
        statusFilter === 'All' || lead.status === statusFilter

      return matchesSearch && matchesBusiness && matchesStatus
    })
  }, [websiteLeads, leadSearch, businessFilter, statusFilter])

  const refreshWebsiteLeads = async () => {
    if (isDemoMode) return

    setIsRefreshing(true)

    try {
      const freshLeads = await listWebsiteLeads()
      setWebsiteLeads(freshLeads)
    } catch (error) {
      console.error('Could not refresh website leads:', error)
      openDemoFeature(
        'Could not refresh leads',
        'NEXO OS could not refresh the live Appwrite leads. Check Appwrite permissions, internet connection, or console errors.'
      )
    } finally {
      setIsRefreshing(false)
    }
  }

  const clearLeadFilters = () => {
    setLeadSearch('')
    setBusinessFilter('All')
    setStatusFilter('All')
  }

  const loadPendingProfiles = async () => {
    setIsLoadingPending(true)
    setPendingError('')

    try {
      const profiles = await listPendingProfiles()
      setPendingProfiles(profiles)
    } catch (error) {
      console.error('Could not load pending profiles:', error)
      setPendingError('Could not load pending accounts. Check Appwrite profile permissions.')
    } finally {
      setIsLoadingPending(false)
    }
  }

  const loadActiveProfiles = async () => {
    if (isDemoMode) return

    setIsLoadingEmployees(true)
    setEmployeeError('')

    try {
      const profiles = await listActiveProfiles()
      setActiveProfiles(profiles)
    } catch (error) {
      console.error('Could not load active profiles:', error)
      setEmployeeError('Could not load active employees. Check Appwrite profile permissions.')
    } finally {
      setIsLoadingEmployees(false)
    }
  }

  useEffect(() => {
    if (!isDemoMode) {
      void loadActiveProfiles()
    }
  }, [isDemoMode])

  useEffect(() => {
    if (activeTab === 'pending-accounts') {
      void loadPendingProfiles()
    }

    if (activeTab === 'employees') {
      void loadActiveProfiles()
    }
  }, [activeTab])

  const handleApproveProfile = async (
    profile: NexoProfile,
    role: NexoProfile['role'],
    requestedBusiness: string
  ) => {
    try {
      await approveProfile(profile.$id, role, requestedBusiness)

      setPendingProfiles((currentProfiles) =>
        currentProfiles.filter((item) => item.$id !== profile.$id)
      )

      await loadActiveProfiles()
    } catch (error) {
      console.error('Could not approve profile:', error)
      setPendingError('Could not approve this account. Check Appwrite permissions.')
    }
  }

  const handleRejectProfile = async (profile: NexoProfile) => {
    try {
      await rejectProfile(profile.$id)

      setPendingProfiles((currentProfiles) =>
        currentProfiles.filter((item) => item.$id !== profile.$id)
      )
    } catch (error) {
      console.error('Could not reject profile:', error)
      setPendingError('Could not reject this account. Check Appwrite permissions.')
    }
  }

  const assignLead = async (leadId: string, employeeName: string) => {
    const nextStatus = employeeName === 'Unassigned' ? 'New' : 'Assigned'
    const assignedProfile = activeProfiles.find(
      (profile) => profile.full_name === employeeName
    )

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

    if (!isDemoMode) {
      try {
        await assignWebsiteLeadInAppwrite(
          leadId,
          employeeName,
          assignedProfile?.user_id || ''
        )
      } catch (error) {
        console.error('Could not assign lead:', error)
      }
    }
  }

  const updateLeadStatus = async (leadId: string, status: WebsiteLead['status']) => {
  const leadToConvert = websiteLeads.find((lead) => lead.id === leadId)

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

  if (!isDemoMode) {
    try {
      await updateWebsiteLeadStatusInAppwrite(leadId, status)

      if (status === 'Converted' && leadToConvert) {
        await createClientFromLead({
          ...leadToConvert,
          status: 'Converted'
        })
      }
    } catch (error) {
      console.error('Could not update lead status or create client:', error)
    }
  }
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
        <h1>NEXO OS Admin Command Center</h1>
        <p>Owner dashboard for Alianza Latina, Petra Insurance, website leads, employees, payment plans, reports, and activity.</p>
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
              <strong>{isDemoMode ? '$38.3k' : 'Preview'}</strong>
              <small>{isDemoMode ? 'Demo preview' : 'Sales tracking coming next'}</small>
            </div>

            <div className="admin-stat-card">
              <Users />
              <span>Employees</span>
              <strong>{isDemoMode ? '25' : activeProfiles.length}</strong>
              <small>{isDemoMode ? 'Demo employees' : 'Active Appwrite profiles'}</small>
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
              <Users size={38} />
              <h3>Pending Accounts</h3>
              <p>Approve employee access requests and decide what business dashboard they can use.</p>
              <button className="teal-button" onClick={() => setActiveTab('pending-accounts')}>
                Review Accounts
              </button>
            </div>

            <div className="quick-card">
              <Eye size={38} />
              <h3>Active Employees</h3>
              <p>View approved employees and open their dashboard view.</p>
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
              <small>{isDemoMode ? 'Demo website leads' : 'From Appwrite'}</small>
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
            <div className="table-panel-head">
              <div>
                <h3>Website Leads Inbox</h3>
                <p>
                  Showing {filteredWebsiteLeads.length} of {websiteLeads.length} leads.
                </p>
              </div>

              <div className="lead-actions">
                <span className={isDemoMode ? 'preview-data-chip' : 'real-data-chip'}>
                  {isDemoMode ? 'Demo Preview' : 'Live Appwrite Data'}
                </span>

                <button
                  className="small-action-button secondary-small"
                  onClick={refreshWebsiteLeads}
                  disabled={isDemoMode || isRefreshing}
                >
                  <RefreshCw size={15} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
            </div>

            <div className="lead-filter-row">
              <div className="directory-search lead-search">
                <Search size={18} />
                <input
                  value={leadSearch}
                  onChange={(event) => setLeadSearch(event.target.value)}
                  placeholder="Search name, phone, service, source..."
                />
              </div>

              <select
                value={businessFilter}
                onChange={(event) => setBusinessFilter(event.target.value as BusinessFilter)}
                className="lead-filter-select"
              >
                <option value="All">All businesses</option>
                <option value="Alianza">Alianza</option>
                <option value="Petra Insurance">Petra Insurance</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                className="lead-filter-select"
              >
                <option value="All">All statuses</option>
                <option value="New">New</option>
                <option value="Assigned">Assigned</option>
                <option value="Contacted">Contacted</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>

              <button className="small-action-button secondary-small" onClick={clearLeadFilters}>
                Clear
              </button>
            </div>

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
                  {filteredWebsiteLeads.map((lead) => (
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

                  {websiteLeads.length === 0 && (
                    <tr>
                      <td colSpan={8}>
                        No real website leads yet. Submit a test form from the Alianza or Petra website, then click Refresh.
                      </td>
                    </tr>
                  )}

                  {websiteLeads.length > 0 && filteredWebsiteLeads.length === 0 && (
                    <tr>
                      <td colSpan={8}>
                        No leads match these filters. Try clearing the search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {activeTab === 'pending-accounts' && (
        <section className="table-panel admin-table">
          <div className="table-panel-head">
            <div>
              <h3>Pending Employee Accounts</h3>
              <p>
                Review employee access requests, approve their role, and choose which business dashboard they can access.
              </p>
            </div>

            <div className="lead-actions">
              <span className="real-data-chip">Live Appwrite Profiles</span>

              <button
                className="small-action-button secondary-small"
                onClick={loadPendingProfiles}
                disabled={isLoadingPending}
              >
                <RefreshCw size={15} />
                {isLoadingPending ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>

          {pendingError && (
            <div className="auth-error" style={{ marginBottom: 16 }}>
              {pendingError}
            </div>
          )}

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Requester</th>
                  <th>Phone</th>
                  <th>Requested Business</th>
                  <th>Requested Role</th>
                  <th>Approve As</th>
                  <th>Reject</th>
                </tr>
              </thead>

              <tbody>
                {pendingProfiles.map((profile) => {
                  const requestedBusiness = profile.requested_business || 'Alianza'
                  const requestedRole = profile.requested_role || 'employee'

                  return (
                    <tr key={profile.$id}>
                      <td>
                        <strong>{profile.full_name}</strong>
                        <br />
                        <small>{profile.email}</small>
                      </td>

                      <td>{profile.phone || 'No phone'}</td>

                      <td>
                        <select
                          defaultValue={requestedBusiness}
                          className="lead-filter-select"
                          id={`business-${profile.$id}`}
                        >
                          <option value="Alianza">Alianza</option>
                          <option value="Petra Insurance">Petra Insurance</option>
                          <option value="Both">Both Businesses</option>
                        </select>
                      </td>

                      <td>{requestedRole}</td>

                      <td>
                        <div className="approval-actions">
                          <button
                            className="small-action-button"
                            onClick={() => {
                              const select = document.getElementById(
                                `business-${profile.$id}`
                              ) as HTMLSelectElement | null

                              void handleApproveProfile(
                                profile,
                                'employee',
                                select?.value || requestedBusiness
                              )
                            }}
                          >
                            Employee
                          </button>

                          <button
                            className="small-action-button secondary-small"
                            onClick={() => {
                              const select = document.getElementById(
                                `business-${profile.$id}`
                              ) as HTMLSelectElement | null

                              void handleApproveProfile(
                                profile,
                                'manager',
                                select?.value || requestedBusiness
                              )
                            }}
                          >
                            Manager
                          </button>

                          <button
                            className="small-action-button secondary-small"
                            onClick={() => {
                              const select = document.getElementById(
                                `business-${profile.$id}`
                              ) as HTMLSelectElement | null

                              void handleApproveProfile(
                                profile,
                                'admin',
                                select?.value || requestedBusiness
                              )
                            }}
                          >
                            Admin
                          </button>
                        </div>
                      </td>

                      <td>
                        <button
                          className="small-action-button danger-small"
                          onClick={() => void handleRejectProfile(profile)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  )
                })}

                {!isLoadingPending && pendingProfiles.length === 0 && (
                  <tr>
                    <td colSpan={6}>
                      No pending employee requests right now. Test this by using the Request Access form from the login page.
                    </td>
                  </tr>
                )}

                {isLoadingPending && (
                  <tr>
                    <td colSpan={6}>Loading pending accounts...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'employees' && (
        <section className="table-panel admin-table">
          <div className="table-panel-head">
            <div>
              <h3>Active Employees</h3>
              <p>
                Approved Appwrite profiles. These are the real users who can log into NEXO OS.
              </p>
            </div>

            <div className="lead-actions">
              <span className={isDemoMode ? 'preview-data-chip' : 'real-data-chip'}>
                {isDemoMode ? 'Demo Employees' : 'Live Appwrite Profiles'}
              </span>

              <button
                className="small-action-button secondary-small"
                onClick={loadActiveProfiles}
                disabled={isDemoMode || isLoadingEmployees}
              >
                <RefreshCw size={15} />
                {isLoadingEmployees ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>

          {employeeError && (
            <div className="auth-error" style={{ marginBottom: 16 }}>
              {employeeError}
            </div>
          )}

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
                  <tr key={employee.profileId || employee.name}>
                    <td>
                      <strong>{employee.name}</strong>
                      <br />
                      <small>{employee.email}</small>
                    </td>
                    <td>{employee.role}</td>
                    <td>{employee.business}</td>
                    <td>{employee.sales}</td>
                    <td>{employee.clients}</td>
                    <td>
                      <button
                        className="small-action-button"
                        onClick={() =>
                          onViewEmployee(
                            employee.name,
                            employee.business === 'All Businesses' ? 'Alianza' : employee.business
                          )
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {!isLoadingEmployees && employeeRows.length === 0 && (
                  <tr>
                    <td colSpan={6}>
                      No active employees found. Approve a pending account first.
                    </td>
                  </tr>
                )}

                {isLoadingEmployees && (
                  <tr>
                    <td colSpan={6}>Loading active employees...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'sales' && (
        <section className="table-panel admin-table">
          <h3>Sales Tracker</h3>
          <p className="preview-note">
            {isDemoMode ? 'Demo sales preview.' : 'Sales tracking is not connected yet. This section is preview-only.'}
          </p>

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
                    <td>{isDemoMode ? sale.amount : 'Preview'}</td>
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
            <p>
              {isDemoMode
                ? 'Alma Mora is leading this month with $18,400 in sales.'
                : 'Contest data will activate after sales tracking is connected.'}
            </p>
            <button
              className="teal-button"
              onClick={() =>
                openDemoFeature(
                  'Sales Contest Ranking',
                  'This will show live employee rankings by business, service, sales amount, completed files, and monthly contest goals once backend sales tracking is connected.'
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

      {activeTab === 'payments' && (
        <section className="quick-card-grid">
          <div className="quick-card">
            <DollarSign size={38} />
            <h3>Active Payment Plans</h3>
            <p>
              {isDemoMode
                ? '15 customers currently have active payment plans across both businesses.'
                : 'Payment plans will activate after client/payment tables are connected.'}
            </p>
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
            <p>
              {isDemoMode
                ? '3 payment plans need follow-up this week.'
                : 'Late payment tracking will activate after payment plans are connected.'}
            </p>
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