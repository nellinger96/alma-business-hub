import { Query } from 'appwrite'
import { databases } from '../lib/appwrite'
import { APPWRITE_DATABASE_ID, APPWRITE_TABLES } from '../lib/appwriteConfig'
import type { NexoProfile } from './authService'

export async function listPendingProfiles() {
  const result = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.profiles,
    [
      Query.equal('status', 'pending'),
      Query.orderDesc('$createdAt')
    ]
  )

  return result.documents as unknown as NexoProfile[]
}

export async function listActiveProfiles() {
  const result = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.profiles,
    [
      Query.equal('status', 'active'),
      Query.orderAsc('full_name')
    ]
  )

  return result.documents as unknown as NexoProfile[]
}

export async function approveProfile(
  profileId: string,
  role: NexoProfile['role'],
  requestedBusiness: string,
  approvedBy = 'Alma Mora'
) {
  const result = await databases.updateDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.profiles,
    profileId,
    {
      status: 'active',
      role,
      requested_business: requestedBusiness,
      approved_by: approvedBy,
      approved_at: new Date().toISOString()
    }
  )

  return result as unknown as NexoProfile
}

export async function rejectProfile(profileId: string, approvedBy = 'Alma Mora') {
  const result = await databases.updateDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.profiles,
    profileId,
    {
      status: 'rejected',
      approved_by: approvedBy,
      approved_at: new Date().toISOString()
    }
  )

  return result as unknown as NexoProfile
}