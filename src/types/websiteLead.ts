export type LeadStatus = 'New' | 'Assigned' | 'Contacted' | 'Converted' | 'Lost'

export type WebsiteLead = {
  id: string
  business: 'Alianza' | 'Petra Insurance'
  source: string
  fullName: string
  phone: string
  email: string
  service: string
  message: string
  status: LeadStatus
  assignedTo: string
  createdAt: string
}
