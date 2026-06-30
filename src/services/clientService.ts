import { Query } from 'appwrite'
import { databases, ID } from '../lib/appwrite'
import { APPWRITE_BUSINESS_IDS, APPWRITE_DATABASE_ID, APPWRITE_TABLES } from '../lib/appwriteConfig'
import type { ClientRecord } from '../types/client'
import type { WebsiteLead } from '../types/websiteLead'

type AppwriteClientDocument = {
  $id: string
  $createdAt: string
  business_id: string
  created_from_lead_id?: string
  assigned_to?: string
  assigned_to_name?: string
  full_name: string
  phone: string
  email?: string
  service_name: string
  status: string
  source: string
  notes?: string
  birthday?: string
  last_contacted_at?: string
}

type CreateManualClientPayload = {
  business: ClientRecord['business']
  fullName: string
  phone: string
  email?: string
  service: string
  status?: string
  source?: string
  notes?: string
  birthday?: string
  assignedTo?: string
  assignedToName?: string
}

function getBusinessId(business: WebsiteLead['business'] | ClientRecord['business']) {
  return business === 'Petra Insurance'
    ? APPWRITE_BUSINESS_IDS.petra
    : APPWRITE_BUSINESS_IDS.alianza
}

function getBusinessName(businessId: string): ClientRecord['business'] {
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

function mapClient(doc: AppwriteClientDocument): ClientRecord {
  return {
    id: doc.$id,
    business: getBusinessName(doc.business_id),
    businessId: doc.business_id,
    createdFromLeadId: doc.created_from_lead_id ?? '',
    assignedTo: doc.assigned_to ?? '',
    assignedToName: doc.assigned_to_name || 'Unassigned',
    fullName: doc.full_name,
    phone: doc.phone,
    email: doc.email ?? '',
    service: doc.service_name,
    status: doc.status,
    source: doc.source,
    notes: doc.notes ?? '',
    birthday: doc.birthday ?? '',
    lastContactedAt: doc.last_contacted_at ?? '',
    createdAt: formatCreatedAt(doc.$createdAt)
  }
}

export async function listClients() {
  const result = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.clients,
    [Query.orderDesc('$createdAt')]
  )

  return result.documents.map((doc) => mapClient(doc as unknown as AppwriteClientDocument))
}

export async function listClientsByBusiness(business: ClientRecord['business']) {
  const businessId = getBusinessId(business)

  const result = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.clients,
    [
      Query.equal('business_id', businessId),
      Query.orderDesc('$createdAt')
    ]
  )

  return result.documents.map((doc) => mapClient(doc as unknown as AppwriteClientDocument))
}

export async function createClientFromLead(lead: WebsiteLead) {
  const existing = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.clients,
    [Query.equal('created_from_lead_id', lead.id)]
  )

  if (existing.documents[0]) {
    return mapClient(existing.documents[0] as unknown as AppwriteClientDocument)
  }

  const businessId = getBusinessId(lead.business)

  const clientData: Record<string, string> = {
    business_id: businessId,
    created_from_lead_id: lead.id,
    assigned_to_name: lead.assignedTo === 'Unassigned' ? '' : lead.assignedTo,
    full_name: lead.fullName,
    phone: lead.phone,
    service_name: lead.service,
    status: 'active',
    source: lead.source,
    notes: lead.message || ''
  }

  if (lead.email.trim()) {
    clientData.email = lead.email.trim()
  }

  const result = await databases.createDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.clients,
    ID.unique(),
    clientData
  )

  return mapClient(result as unknown as AppwriteClientDocument)
}

export async function createManualClient(payload: CreateManualClientPayload) {
  const businessId = getBusinessId(payload.business)

  const cleanEmail = payload.email?.trim()
  const cleanNotes = payload.notes?.trim()
  const cleanBirthday = payload.birthday?.trim()
  const cleanAssignedTo = payload.assignedTo?.trim()
  const cleanAssignedToName = payload.assignedToName?.trim()

  const clientData: Record<string, string> = {
    business_id: businessId,
    full_name: payload.fullName.trim(),
    phone: payload.phone.trim(),
    service_name: payload.service,
    status: payload.status || 'active',
    source: payload.source || 'Manual Entry'
  }

  if (cleanEmail) clientData.email = cleanEmail
  if (cleanNotes) clientData.notes = cleanNotes
  if (cleanBirthday) clientData.birthday = cleanBirthday
  if (cleanAssignedTo) clientData.assigned_to = cleanAssignedTo
  if (cleanAssignedToName) clientData.assigned_to_name = cleanAssignedToName

  const result = await databases.createDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.clients,
    ID.unique(),
    clientData
  )

  return mapClient(result as unknown as AppwriteClientDocument)
}

export async function updateClientStatus(clientId: string, status: string) {
  const result = await databases.updateDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.clients,
    clientId,
    { status }
  )

  return mapClient(result as unknown as AppwriteClientDocument)
}
