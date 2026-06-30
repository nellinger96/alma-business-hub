import { Query } from 'appwrite'
import { databases, ID } from '../lib/appwrite'
import { APPWRITE_BUSINESS_IDS, APPWRITE_DATABASE_ID, APPWRITE_TABLES } from '../lib/appwriteConfig'
import type { WebsiteLead } from '../types/websiteLead'

type AppwriteLeadDocument = {
  $id: string
  $createdAt: string
  business_id: string
  service_name: string
  full_name: string
  phone: string
  email?: string
  message?: string
  source: string
  status: string
  assigned_to?: string
  assigned_to_name?: string
}

type CreateWebsiteLeadPayload = {
  business: 'alianza' | 'petra'
  serviceName: string
  fullName: string
  phone: string
  email?: string
  message?: string
  source: string
}

function toAppStatus(status: WebsiteLead['status']) {
  return status.toLowerCase()
}

function toUiStatus(status: string): WebsiteLead['status'] {
  if (status === 'assigned') return 'Assigned'
  if (status === 'contacted') return 'Contacted'
  if (status === 'converted') return 'Converted'
  if (status === 'lost') return 'Lost'
  return 'New'
}

function getBusinessName(businessId: string): WebsiteLead['business'] {
  if (businessId === APPWRITE_BUSINESS_IDS.petra) return 'Petra Insurance'
  return 'Alianza'
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

function mapLead(doc: AppwriteLeadDocument): WebsiteLead {
  return {
    id: doc.$id,
    business: getBusinessName(doc.business_id),
    source: doc.source,
    fullName: doc.full_name,
    phone: doc.phone,
    email: doc.email ?? '',
    service: doc.service_name,
    message: doc.message ?? '',
    status: toUiStatus(doc.status),
    assignedTo: doc.assigned_to_name || 'Unassigned',
    createdAt: formatCreatedAt(doc.$createdAt)
  }
}

export async function createWebsiteLead(payload: CreateWebsiteLeadPayload) {
  const businessId =
    payload.business === 'petra'
      ? APPWRITE_BUSINESS_IDS.petra
      : APPWRITE_BUSINESS_IDS.alianza

  const cleanEmail = payload.email?.trim()
  const cleanMessage = payload.message?.trim()

  const leadData: Record<string, string> = {
    business_id: businessId,
    service_name: payload.serviceName,
    full_name: payload.fullName,
    phone: payload.phone,
    source: payload.source,
    status: 'new'
  }

  if (cleanEmail) {
    leadData.email = cleanEmail
  }

  if (cleanMessage) {
    leadData.message = cleanMessage
  }

  console.log('Creating website lead in Appwrite:', leadData)

  const result = await databases.createDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.websiteLeads,
    ID.unique(),
    leadData
  )

  return mapLead(result as unknown as AppwriteLeadDocument)
}

export async function listWebsiteLeads() {
  const result = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.websiteLeads,
    [Query.orderDesc('$createdAt')]
  )

  return result.documents.map((doc) => mapLead(doc as unknown as AppwriteLeadDocument))
}

export async function updateWebsiteLeadStatus(
  leadId: string,
  status: WebsiteLead['status']
) {
  const result = await databases.updateDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.websiteLeads,
    leadId,
    {
      status: toAppStatus(status)
    }
  )

  return mapLead(result as unknown as AppwriteLeadDocument)
}

export async function assignWebsiteLead(
  leadId: string,
  employeeName: string,
  employeeUserId = ''
) {
  const nextStatus = employeeName === 'Unassigned' ? 'new' : 'assigned'

  const updateData: Record<string, string> = {
    status: nextStatus
  }

  if (employeeName !== 'Unassigned') {
    updateData.assigned_to_name = employeeName
  }

  if (employeeUserId) {
    updateData.assigned_to = employeeUserId
  }

  const result = await databases.updateDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.websiteLeads,
    leadId,
    updateData
  )

  return mapLead(result as unknown as AppwriteLeadDocument)
}