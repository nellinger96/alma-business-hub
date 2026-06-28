import { useState } from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { AuthPage } from './features/auth/AuthPage'
import { PendingApprovalPage } from './features/auth/PendingApprovalPage'
import { BusinessSelectPage } from './features/businesses/BusinessSelectPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { ReportsPage } from './features/reports/ReportsPage'
import { PolicyFormPage } from './features/policies/PolicyFormPage'
import { AdminDashboardPage } from './features/admin/AdminDashboardPage'
import type { WebsiteLead } from './types/websiteLead'
import type { DemoUser } from './types/demoUser'
import type { NexoProfile } from './services/authService'
import { logout as appwriteLogout } from './services/authService'
import { listWebsiteLeads } from './services/leadService'

import AlianzaHome from './pages/alianza/AlianzaHome'
import PetraHome from './pages/petra/PetraHome'

type Screen = 'login' | 'pending' | 'select-business' | 'dashboard' | 'reports' | 'policy-form' | 'admin'
type PublicSite = 'alianza' | 'petra' | null

function getPublicSite(): PublicSite {
  const search = window.location.search.toLowerCase()
  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '')
  const params = new URLSearchParams(window.location.search)

  const site = params.get('site')?.toLowerCase()
  const business = params.get('business')?.toLowerCase()

  if (
    search === '?=petra' ||
    site === 'petra' ||
    business === 'petra' ||
    pathname === '/petra'
  ) {
    return 'petra'
  }

  if (
    search === '?=alianza' ||
    site === 'alianza' ||
    business === 'alianza' ||
    pathname === '/alianza'
  ) {
    return 'alianza'
  }

  return null
}

const almaUser: DemoUser = {
  name: 'Alma Mora',
  email: 'alma@example.com',
  role: 'super_admin',
  roleLabel: 'Super Admin',
  defaultBusiness: 'Alianza',
  allowedBusinesses: ['Alianza', 'Petra Insurance']
}

const demoWebsiteLeads: WebsiteLead[] = [
  {
    id: 'WL-1001',
    business: 'Alianza',
    source: 'Alianza Website Quote Form',
    fullName: 'Luis Hernandez',
    phone: '(714) 555-2290',
    email: 'luis@example.com',
    service: 'Tax Services',
    message: 'I need help filing my taxes and want to know what documents I need.',
    status: 'New',
    assignedTo: 'Unassigned',
    createdAt: 'Today, 9:15 AM'
  },
  {
    id: 'WL-1002',
    business: 'Petra Insurance',
    source: 'Petra Website Quote Form',
    fullName: 'Maria Gonzalez',
    phone: '(714) 555-1822',
    email: 'maria@example.com',
    service: 'Life Insurance',
    message: 'I would like a quote for life insurance for my family.',
    status: 'Assigned',
    assignedTo: 'Petra Team Member',
    createdAt: 'Today, 10:05 AM'
  },
  {
    id: 'WL-1003',
    business: 'Petra Insurance',
    source: 'Petra Website Help Form',
    fullName: 'Jose Ramirez',
    phone: '(909) 555-4410',
    email: 'jose@example.com',
    service: 'Pre-Need Funeral Services',
    message: 'I want information about pre-need funeral planning options.',
    status: 'New',
    assignedTo: 'Unassigned',
    createdAt: 'Today, 11:22 AM'
  },
  {
    id: 'WL-1004',
    business: 'Alianza',
    source: 'Alianza Website Help Form',
    fullName: 'Carmen Lopez',
    phone: '(909) 555-7001',
    email: 'carmen@example.com',
    service: 'Document Filing',
    message: 'I need help filing documents and want to schedule an appointment.',
    status: 'Contacted',
    assignedTo: 'Nelly Lopez',
    createdAt: 'Yesterday, 3:40 PM'
  }
]

function profileToUser(profile: NexoProfile): DemoUser {
  const isSuperAdmin = profile.role === 'super_admin'

  let defaultBusiness: 'Alianza' | 'Petra Insurance' = 'Alianza'
  let allowedBusinesses: Array<'Alianza' | 'Petra Insurance'> = ['Alianza']

  if (isSuperAdmin) {
    allowedBusinesses = ['Alianza', 'Petra Insurance']
    defaultBusiness = 'Alianza'
  } else if (profile.requested_business === 'Petra Insurance') {
    allowedBusinesses = ['Petra Insurance']
    defaultBusiness = 'Petra Insurance'
  } else if (profile.requested_business === 'Both') {
    allowedBusinesses = ['Alianza', 'Petra Insurance']
    defaultBusiness = 'Alianza'
  }

  const roleLabel =
    profile.role === 'super_admin'
      ? 'Super Admin'
      : profile.role === 'admin'
        ? 'Admin'
        : profile.role === 'manager'
          ? 'Manager'
          : profile.role === 'viewer'
            ? 'Viewer'
            : 'Employee'

  return {
    name: profile.full_name,
    email: profile.email,
    role: profile.role,
    roleLabel,
    defaultBusiness,
    allowedBusinesses
  }
}

export default function App() {
  const publicSite = getPublicSite()

  if (publicSite === 'alianza') {
    return <AlianzaHome />
  }

  if (publicSite === 'petra') {
    return <PetraHome />
  }

  const [screen, setScreen] = useState<Screen>('login')
  const [activeUser, setActiveUser] = useState<DemoUser>(almaUser)
  const [activeProfile, setActiveProfile] = useState<NexoProfile | null>(null)
  const [activeBusiness, setActiveBusiness] = useState<'Alianza' | 'Petra Insurance'>('Alianza')
  const [dashboardTab, setDashboardTab] = useState('home')
  const [activeEmployeeName, setActiveEmployeeName] = useState('Alma Mora')
  const [websiteLeads, setWebsiteLeads] = useState<WebsiteLead[]>([])
  const [isDemoMode, setIsDemoMode] = useState(false)

  const canAccessAdmin = activeUser.role === 'super_admin' || activeUser.role === 'admin'

  const loadRealWebsiteLeads = async () => {
    try {
      const leads = await listWebsiteLeads()
      setWebsiteLeads(leads)
    } catch (error) {
      console.error('Could not load website leads:', error)
      setWebsiteLeads([])
    }
  }

  const handleRealLogin = (profile: NexoProfile | null) => {
    setIsDemoMode(false)
    setWebsiteLeads([])
    setActiveProfile(profile)

    if (!profile || profile.status !== 'active') {
      setScreen('pending')
      return
    }

    void loadRealWebsiteLeads()

    const user = profileToUser(profile)

    setActiveUser(user)
    setActiveBusiness(user.defaultBusiness)
    setActiveEmployeeName(user.name)
    setDashboardTab(user.role === 'super_admin' ? 'home' : 'assigned-leads')

    if (user.role === 'super_admin') {
      setScreen('select-business')
      return
    }

    setScreen('dashboard')
  }

  const handlePendingSignup = (profile: NexoProfile | null) => {
    setIsDemoMode(false)
    setWebsiteLeads([])
    setActiveProfile(profile)
    setScreen('pending')
  }

  const handleDemoLogin = (user: DemoUser) => {
    setIsDemoMode(true)
    setWebsiteLeads(demoWebsiteLeads)
    setActiveProfile(null)
    setActiveUser(user)
    setActiveBusiness(user.defaultBusiness)
    setActiveEmployeeName(user.name)

    if (user.role === 'super_admin') {
      setDashboardTab('home')
      setScreen('select-business')
      return
    }

    setDashboardTab('assigned-leads')
    setScreen('dashboard')
  }

  const handleLogout = async () => {
    try {
      await appwriteLogout()
    } catch {
      // Demo users may not have an Appwrite session.
    }

    setIsDemoMode(false)
    setWebsiteLeads([])
    setActiveProfile(null)
    setActiveUser(almaUser)
    setActiveBusiness('Alianza')
    setActiveEmployeeName('Alma Mora')
    setDashboardTab('home')
    setScreen('login')
  }

  const navigateTo = (nextScreen: Screen, nextDashboardTab?: string) => {
    if (nextScreen === 'admin' && !canAccessAdmin) {
      setScreen('dashboard')
      setDashboardTab('home')
      return
    }

    if (nextDashboardTab) {
      setDashboardTab(nextDashboardTab)
    }

    setScreen(nextScreen)
  }

  const updateActiveBusiness = (business: string) => {
    if (business !== 'Alianza' && business !== 'Petra Insurance') return

    if (!activeUser.allowedBusinesses.includes(business)) return

    setActiveBusiness(business)
  }

  const viewEmployeeDashboard = (employeeName: string, business: string) => {
    setActiveEmployeeName(employeeName)

    if (business === 'Petra Insurance') {
      setActiveBusiness('Petra Insurance')
    }

    if (business === 'Alianza') {
      setActiveBusiness('Alianza')
    }

    setDashboardTab('assigned-leads')
    setScreen('dashboard')
  }

  if (screen === 'login') {
    return (
      <AuthPage
        onRealLogin={handleRealLogin}
        onPendingSignup={handlePendingSignup}
        onDemoLogin={handleDemoLogin}
      />
    )
  }

  if (screen === 'pending') {
    return <PendingApprovalPage profile={activeProfile} onLogout={handleLogout} />
  }

  if (screen === 'select-business') {
    return (
      <BusinessSelectPage
        onSelect={(business) => {
          if (business === 'Alianza' || business === 'Petra Insurance') {
            updateActiveBusiness(business)
          }

          setActiveEmployeeName(activeUser.name)
          setDashboardTab('home')
          setScreen('dashboard')
        }}
        onAdmin={() => setScreen('admin')}
      />
    )
  }

  return (
    <AppLayout
      activeBusiness={activeBusiness}
      setActiveBusiness={updateActiveBusiness}
      allowedBusinesses={activeUser.allowedBusinesses}
      activeScreen={screen}
      navigateTo={navigateTo}
      onLogout={handleLogout}
      activeUser={activeUser}
      canAccessAdmin={canAccessAdmin}
    >
      {screen === 'admin' && (
        <AdminDashboardPage
          onViewEmployee={viewEmployeeDashboard}
          websiteLeads={websiteLeads}
          setWebsiteLeads={setWebsiteLeads}
          isDemoMode={isDemoMode}
        />
      )}

      {screen === 'dashboard' && (
        <DashboardPage
          activeBusiness={activeBusiness}
          activeEmployeeName={activeEmployeeName}
          initialTab={dashboardTab}
          websiteLeads={websiteLeads}
          setWebsiteLeads={setWebsiteLeads}
          isDemoMode={isDemoMode}
        />
      )}

      {screen === 'reports' && <ReportsPage />}
      {screen === 'policy-form' && <PolicyFormPage />}

      {isDemoMode && (
        <div className="demo-mode-floating-label">
          Demo Mode
        </div>
      )}
    </AppLayout>
  )
}