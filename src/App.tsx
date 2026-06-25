import { useState } from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { LoginPage } from './features/auth/LoginPage'
import { BusinessSelectPage } from './features/businesses/BusinessSelectPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { ReportsPage } from './features/reports/ReportsPage'
import { PolicyFormPage } from './features/policies/PolicyFormPage'
import { AdminDashboardPage } from './features/admin/AdminDashboardPage'

type Screen = 'login' | 'select-business' | 'dashboard' | 'reports' | 'policy-form' | 'admin'

function getInitialWorkspace() {
  const search = window.location.search.toLowerCase()

  if (search.includes('petra')) {
    return {
      screen: 'dashboard' as Screen,
      business: 'Petra Insurance',
      dashboardTab: 'home',
      employeeName: 'Alma Admin'
    }
  }

  if (search.includes('alianza')) {
    return {
      screen: 'dashboard' as Screen,
      business: 'Alianza',
      dashboardTab: 'home',
      employeeName: 'Alma Admin'
    }
  }

  if (search.includes('admin')) {
    return {
      screen: 'admin' as Screen,
      business: 'Alianza',
      dashboardTab: 'home',
      employeeName: 'Alma Admin'
    }
  }

  return {
    screen: 'login' as Screen,
    business: 'Alianza',
    dashboardTab: 'home',
    employeeName: 'Alma Admin'
  }
}

function updateBusinessUrl(business: string) {
  const businessParam = business === 'Petra Insurance' ? 'petra' : 'alianza'
  window.history.replaceState(null, '', `/?business=${businessParam}`)
}

export default function App() {
  const initialWorkspace = getInitialWorkspace()

  const [screen, setScreen] = useState<Screen>(initialWorkspace.screen)
  const [activeBusiness, setActiveBusinessState] = useState(initialWorkspace.business)
  const [dashboardTab, setDashboardTab] = useState(initialWorkspace.dashboardTab)
  const [activeEmployeeName, setActiveEmployeeName] = useState(initialWorkspace.employeeName)

  const setActiveBusiness = (business: string) => {
    setActiveBusinessState(business)
    updateBusinessUrl(business)
  }

  const navigateTo = (nextScreen: Screen, nextDashboardTab?: string) => {
    if (nextDashboardTab) {
      setDashboardTab(nextDashboardTab)
    }

    if (nextScreen === 'admin') {
      window.history.replaceState(null, '', '/?admin')
    }

    if (nextScreen === 'dashboard') {
      updateBusinessUrl(activeBusiness)
    }

    setScreen(nextScreen)
  }

  const viewEmployeeDashboard = (employeeName: string, business: string) => {
    setActiveEmployeeName(employeeName)

    if (business === 'Petra Insurance') {
      setActiveBusinessState('Petra Insurance')
      updateBusinessUrl('Petra Insurance')
    }

    if (business === 'Alianza') {
      setActiveBusinessState('Alianza')
      updateBusinessUrl('Alianza')
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
          setActiveBusinessState(business)
          updateBusinessUrl(business)
          setActiveEmployeeName('Alma Admin')
          setDashboardTab('home')
          setScreen('dashboard')
        }}
        onAdmin={() => {
          window.history.replaceState(null, '', '/?admin')
          setScreen('admin')
        }}
      />
    )
  }

  return (
    <AppLayout
      activeBusiness={activeBusiness}
      setActiveBusiness={setActiveBusiness}
      activeScreen={screen}
      navigateTo={navigateTo}
      onLogout={() => {
        window.history.replaceState(null, '', '/')
        setScreen('login')
      }}
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
