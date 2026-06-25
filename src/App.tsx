import { useState } from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { LoginPage } from './features/auth/LoginPage'
import { BusinessSelectPage } from './features/businesses/BusinessSelectPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { ReportsPage } from './features/reports/ReportsPage'
import { PolicyFormPage } from './features/policies/PolicyFormPage'
import { AdminDashboardPage } from './features/admin/AdminDashboardPage'

type Screen = 'login' | 'select-business' | 'dashboard' | 'reports' | 'policy-form' | 'admin'

export default function App() {
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
