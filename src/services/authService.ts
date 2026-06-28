import { Query } from 'appwrite'
import { account, databases, ID } from '../lib/appwrite'
import { APPWRITE_DATABASE_ID, APPWRITE_TABLES } from '../lib/appwriteConfig'

export type NexoProfile = {
  $id: string
  user_id: string
  full_name: string
  email: string
  phone?: string
  role: 'super_admin' | 'admin' | 'manager' | 'employee' | 'viewer'
  status: 'pending' | 'active' | 'rejected' | 'disabled'
  requested_business?: string
  requested_role?: string
  approved_by?: string
  approved_at?: string
}

export type RegisterPayload = {
  fullName: string
  email: string
  password: string
  phone?: string
  requestedBusiness: string
  requestedRole: string
}

export async function getCurrentUser() {
  try {
    return await account.get()
  } catch {
    return null
  }
}

export async function getCurrentProfile(): Promise<NexoProfile | null> {
  const user = await getCurrentUser()

  if (!user) return null

  const result = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.profiles,
    [Query.equal('user_id', user.$id)]
  )

  return (result.documents[0] as unknown as NexoProfile) ?? null
}

export async function loginWithEmail(email: string, password: string) {
  const cleanEmail = email.trim().toLowerCase()

  const existingUser = await getCurrentUser()

  if (existingUser) {
    const existingEmail = existingUser.email?.toLowerCase()

    if (existingEmail === cleanEmail) {
      const profile = await getCurrentProfile()
      return { user: existingUser, profile }
    }

    try {
      await account.deleteSession('current')
    } catch {
      // Ignore session cleanup error.
    }
  }

  await account.createEmailPasswordSession(cleanEmail, password)

  const user = await account.get()
  const profile = await getCurrentProfile()

  return { user, profile }
}

export async function registerEmployeeRequest(payload: RegisterPayload) {
  try {
    await account.deleteSession('current')
  } catch {
    // Ignore if no session exists.
  }

  const user = await account.create(
    ID.unique(),
    payload.email.trim().toLowerCase(),
    payload.password,
    payload.fullName
  )

  await account.createEmailPasswordSession(
    payload.email.trim().toLowerCase(),
    payload.password
  )

  const profile = await databases.createDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_TABLES.profiles,
    ID.unique(),
    {
      user_id: user.$id,
      full_name: payload.fullName,
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone ?? '',
      role: 'employee',
      status: 'pending',
      requested_business: payload.requestedBusiness,
      requested_role: payload.requestedRole
    }
  )

  return { user, profile: profile as unknown as NexoProfile }
}

export async function logout() {
  try {
    await account.deleteSession('current')
  } catch {
    // Ignore if already logged out.
  }
}