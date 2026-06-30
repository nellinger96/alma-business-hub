import { Query } from 'appwrite'
import { databases, ID } from '../lib/appwrite'
import { APPWRITE_DATABASE_ID, APPWRITE_TABLES } from '../lib/appwriteConfig'
import type { ClientNote, FollowUpTask } from '../types/workflow'

type AppwriteNoteDocument = {
  $id: string
  $createdAt: string
  client_id: string
  business_id: string
  created_by?: string
  created_by_name: string
  note: string
}

type AppwriteTaskDocument = {
  $id: string
  $createdAt: string
  business_id: string
  client_id?: string
  lead_id?: string
  assigned_to?: string
  assigned_to_name: string
  title: string
  description?: string
  due_date?: string
  status: 'open' | 'completed' | 'cancelled'
  priority: 'low' | 'normal' | 'high'
  created_by?: string
  created_by_name: string
  completed_at?: string
}

type CreateClientNotePayload = {
  clientId: string
  businessId: string
  createdBy?: string
  createdByName: string
  note: string
}

type CreateTaskPayload = {
  businessId: string
  clientId?: string
  leadId?: string
  assignedTo?: string
  assignedToName: string
  title: string
  description?: string
  dueDate?: string
  priority?: FollowUpTask['priority']
  createdBy?: string
  createdByName: string
}

function formatDate(value: string) {
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

function mapNote(doc: AppwriteNoteDocument): ClientNote {
  return {
    id: doc.$id,
    clientId: doc.client_id,
    businessId: doc.business_id,
    createdBy: doc.created_by ?? '',
    createdByName: doc.created_by_name,
    note: doc.note,
    createdAt: formatDate(doc.$createdAt)
  }
}

function mapTask(doc: AppwriteTaskDocument): FollowUpTask {
  return {
    id: doc.$id,
    businessId: doc.business_id,
    clientId: doc.client_id ?? '',
    leadId: doc.lead_id ?? '',
    assignedTo: doc.assigned_to ?? '',
    assignedToName: doc.assigned_to_name,
    title: doc.title,
    description: doc.description ?? '',
    dueDate: doc.due_date ?? '',
    status: doc.status,
    priority: doc.priority,
    createdBy: doc.created_by ?? '',
    createdByName: doc.created_by_name,
    completedAt: doc.completed_at ?? '',
    createdAt: formatDate(doc.$createdAt)
  }
}

export async function listClientNotes(clientId: string) {
  const result = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.clientNotes,
    [
      Query.equal('client_id', clientId),
      Query.orderDesc('$createdAt')
    ]
  )

  return result.documents.map((doc) => mapNote(doc as unknown as AppwriteNoteDocument))
}

export async function createClientNote(payload: CreateClientNotePayload) {
  const result = await databases.createDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.clientNotes,
    ID.unique(),
    {
      client_id: payload.clientId,
      business_id: payload.businessId,
      created_by: payload.createdBy ?? '',
      created_by_name: payload.createdByName,
      note: payload.note
    }
  )

  return mapNote(result as unknown as AppwriteNoteDocument)
}

export async function listClientTasks(clientId: string) {
  const result = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.tasks,
    [
      Query.equal('client_id', clientId),
      Query.orderAsc('due_date')
    ]
  )

  return result.documents.map((doc) => mapTask(doc as unknown as AppwriteTaskDocument))
}

export async function listAssignedOpenTasks(assignedToName: string) {
  const result = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.tasks,
    [
      Query.equal('assigned_to_name', assignedToName),
      Query.equal('status', 'open'),
      Query.orderAsc('due_date')
    ]
  )

  return result.documents.map((doc) => mapTask(doc as unknown as AppwriteTaskDocument))
}

export async function createFollowUpTask(payload: CreateTaskPayload) {
  const taskData: Record<string, string> = {
    business_id: payload.businessId,
    assigned_to_name: payload.assignedToName,
    title: payload.title,
    status: 'open',
    priority: payload.priority ?? 'normal',
    created_by_name: payload.createdByName
  }

  if (payload.clientId) taskData.client_id = payload.clientId
  if (payload.leadId) taskData.lead_id = payload.leadId
  if (payload.assignedTo) taskData.assigned_to = payload.assignedTo
  if (payload.description) taskData.description = payload.description
  if (payload.dueDate) taskData.due_date = payload.dueDate
  if (payload.createdBy) taskData.created_by = payload.createdBy

  const result = await databases.createDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.tasks,
    ID.unique(),
    taskData
  )

  return mapTask(result as unknown as AppwriteTaskDocument)
}

export async function completeTask(taskId: string) {
  const result = await databases.updateDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.tasks,
    taskId,
    {
      status: 'completed',
      completed_at: new Date().toISOString()
    }
  )

  return mapTask(result as unknown as AppwriteTaskDocument)
}

export async function cancelTask(taskId: string) {
  const result = await databases.updateDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.tasks,
    taskId,
    {
      status: 'cancelled'
    }
  )

  return mapTask(result as unknown as AppwriteTaskDocument)
}
