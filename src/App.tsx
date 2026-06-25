import { useState } from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { LoginPage } from './features/auth/LoginPage'
import { BusinessSelectPage } from './features/businesses/BusinessSelectPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { ReportsPage } from './features/reports/ReportsPage'
import { PolicyFormPage } from './features/policies/PolicyFormPage'
import { AdminDashboardPage } from './features/admin/AdminDashboardPage'

import AlianzaHome from './pages/alianza/AlianzaHome'
import PetraHome from './pages/petra/PetraHome'

type Screen = 'login' | 'select-business' | 'dashboard' | 'reports' | 'policy-form' | 'admin'
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

export default function App() {
  const publicSite = getPublicSite()

  if (publicSite === 'alianza') {
    return <AlianzaHome />
  }

  if (publicSite === 'petra') {
    return <PetraHome />
  }

  const [screen, setScreen] = useState<Screen>('login')
  const [activeBusiness, setActiveBusiness] = useState('Alianza')
  const [dashboardTab, setDashboardTab] = useState('home')
  const [activeEmployeeName, setActiveEmployeeName] = useState('Alma Admin')

  const navigateTo = (nextScreen: Screen, nextDashboardTab?: string) => {
    if (nextDashboardTab) {
      setDashboardTab(nextDashboardTab)
    }

    setScreen(nextScreen)
  }

  const viewEmployeeDashboard = (employeeName: string, business: string) => {
    setActiveEmployeeName(employeeName)

    if (business === 'Petra Insurance') {
      setActiveBusiness('Petra Insurance')
    }

    if (business === 'Alianza') {
      setActiveBusiness('Alianza')
    }

    setDashboardTab('home')
    setScreen('dashboard')
  }

  if (screen === 'login') {
    return <LoginPage onLogin={() => setScreen('select-business')} />
  }

  if (screen === 'select-business') {
    return (
      <BusinessSelectPage
        onSelect={(business) => {
          setActiveBusiness(business)
          setActiveEmployeeName('Alma Admin')
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
      setActiveBusiness={setActiveBusiness}
      activeScreen={screen}
      navigateTo={navigateTo}
      onLogout={() => setScreen('login')}
    >
      {screen === 'admin' && <AdminDashboardPage onViewEmployee={viewEmployeeDashboard} />}
      {screen === 'dashboard' && (
        <DashboardPage
          activeBusiness={activeBusiness}
          activeEmployeeName={activeEmployeeName}
          initialTab={dashboardTab}
        />
      )}
      {screen === 'reports' && <ReportsPage />}
      {screen === 'policy-form' && <PolicyFormPage />}
    </AppLayout>
  )
}
