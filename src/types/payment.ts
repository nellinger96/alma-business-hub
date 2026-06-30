export type PaymentPlan = {
  id: string
  businessId: string
  clientId: string
  clientName: string
  assignedToName: string
  serviceName: string
  totalAmount: number
  downPayment: number
  balance: number
  monthlyPayment: number
  months: number
  nextDueDate: string
  status: 'active' | 'paid' | 'late' | 'cancelled'
  notes: string
  createdByName: string
  createdAt: string
}
