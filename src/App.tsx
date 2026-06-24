import { useState } from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { LoginPage } from './features/auth/LoginPage'
import { BusinessSelectPage } from './features/businesses/BusinessSelectPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { ReportsPage } from './features/reports/ReportsPage'
import { PolicyFormPage } from './features/policies/PolicyFormPage'
import { AdminDashboardPage } from './features/admin/AdminDashboardPage'
import PetraHome from './pages/petra/PetraHome'
import AlianzaHome from './pages/alianza/AlianzaHome'

type Screen = 'login' | 'select-business' | 'dashboard' | 'reports' | 'policy-form' | 'admin'

export default function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [activeBusiness, setActiveBusiness] = useState('Alianza')
  const previewSite = new URLSearchParams(window.location.search).get('site')

if (previewSite === 'petra') {
  return <PetraHome />
}

if (previewSite === 'alianza') {
  return <AlianzaHome />
}

  if (screen === 'login') {
    return <LoginPage onLogin={() => setScreen('select-business')} />
  }

  if (screen === 'select-business') {
    return (
      <BusinessSelectPage
        onSelect={(business) => {
          setActiveBusiness(business)
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
      setScreen={setScreen}
      onLogout={() => setScreen('login')}
    >
      {screen === 'admin' && <AdminDashboardPage />}
      {screen === 'dashboard' && <DashboardPage activeBusiness={activeBusiness} />}
      {screen === 'reports' && <ReportsPage />}
      {screen === 'policy-form' && <PolicyFormPage />}
    </AppLayout>
  )
}
