export type DemoRole = 'super_admin' | 'admin' | 'manager' | 'employee' | 'viewer'

export type DemoUser = {
  name: string
  email: string
  role: DemoRole
  roleLabel: string
  defaultBusiness: 'Alianza' | 'Petra Insurance'
  allowedBusinesses: Array<'Alianza' | 'Petra Insurance'>
}
