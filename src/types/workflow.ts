export type ClientNote = {
  id: string
  clientId: string
  businessId: string
  createdBy: string
  createdByName: string
  note: string
  createdAt: string
}

export type FollowUpTask = {
  id: string
  businessId: string
  clientId: string
  leadId: string
  assignedTo: string
  assignedToName: string
  title: string
  description: string
  dueDate: string
  status: 'open' | 'completed' | 'cancelled'
  priority: 'low' | 'normal' | 'high'
  createdBy: string
  createdByName: string
  completedAt: string
  createdAt: string
}
