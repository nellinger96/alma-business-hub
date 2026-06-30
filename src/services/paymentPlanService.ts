import { Query } from 'appwrite'
import { databases, ID } from '../lib/appwrite'
import { APPWRITE_DATABASE_ID, APPWRITE_TABLES } from '../lib/appwriteConfig'
import type { PaymentPlan } from '../types/payment'

type AppwritePaymentPlanDocument = {
  $id: string
  $createdAt: string
  business_id: string
  client_id: string
  client_name: string
  assigned_to_name: string
  service_name: string
  total_amount: number
  down_payment: number
  balance: number
  monthly_payment: number
  months: number
  next_due_date?: string
  status: PaymentPlan['status']
  notes?: string
  created_by_name: string
}

type CreatePaymentPlanPayload = {
  businessId: string
  clientId: string
  clientName: string
  assignedToName: string
  serviceName: string
  totalAmount: number
  downPayment: number
  months: number
  nextDueDate?: string
  notes?: string
  createdByName: string
}

function formatCreatedAt(value: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(value))
  } catch {
    return value
  }
}

function mapPaymentPlan(doc: AppwritePaymentPlanDocument): PaymentPlan {
  return {
    id: doc.$id,
    businessId: doc.business_id,
    clientId: doc.client_id,
    clientName: doc.client_name,
    assignedToName: doc.assigned_to_name,
    serviceName: doc.service_name,
    totalAmount: doc.total_amount,
    downPayment: doc.down_payment,
    balance: doc.balance,
    monthlyPayment: doc.monthly_payment,
    months: doc.months,
    nextDueDate: doc.next_due_date ?? '',
    status: doc.status,
    notes: doc.notes ?? '',
    createdByName: doc.created_by_name,
    createdAt: formatCreatedAt(doc.$createdAt)
  }
}

export async function listClientPaymentPlans(clientId: string) {
  const result = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.paymentPlans,
    [
      Query.equal('client_id', clientId),
      Query.orderDesc('$createdAt')
    ]
  )

  return result.documents.map((doc) =>
    mapPaymentPlan(doc as unknown as AppwritePaymentPlanDocument)
  )
}

export async function createPaymentPlan(payload: CreatePaymentPlanPayload) {
  const totalAmount = Number(payload.totalAmount) || 0
  const downPayment = Number(payload.downPayment) || 0
  const months = Math.max(Number(payload.months) || 1, 1)
  const balance = Math.max(totalAmount - downPayment, 0)
  const monthlyPayment = Number((balance / months).toFixed(2))

  const paymentData: Record<string, string | number> = {
    business_id: payload.businessId,
    client_id: payload.clientId,
    client_name: payload.clientName,
    assigned_to_name: payload.assignedToName,
    service_name: payload.serviceName,
    total_amount: totalAmount,
    down_payment: downPayment,
    balance,
    monthly_payment: monthlyPayment,
    months,
    status: 'active',
    created_by_name: payload.createdByName
  }

  if (payload.nextDueDate) {
    paymentData.next_due_date = payload.nextDueDate
  }

  if (payload.notes?.trim()) {
    paymentData.notes = payload.notes.trim()
  }

  const result = await databases.createDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.paymentPlans,
    ID.unique(),
    paymentData
  )

  return mapPaymentPlan(result as unknown as AppwritePaymentPlanDocument)
}

export async function updatePaymentPlanStatus(
  paymentPlanId: string,
  status: PaymentPlan['status']
) {
  const result = await databases.updateDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.paymentPlans,
    paymentPlanId,
    { status }
  )

  return mapPaymentPlan(result as unknown as AppwritePaymentPlanDocument)
}
