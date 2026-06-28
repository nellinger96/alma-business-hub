import { Account, Client, Databases, ID, Storage } from 'appwrite'

const endpoint =
  import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://sfo.cloud.appwrite.io/v1'

const projectId =
  import.meta.env.VITE_APPWRITE_PROJECT_ID || '6a3e344800374737c60b'

console.log('Appwrite endpoint:', endpoint)
console.log('Appwrite project:', projectId)

export const appwriteClient = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)

export const account = new Account(appwriteClient)
export const databases = new Databases(appwriteClient)
export const storage = new Storage(appwriteClient)
export { ID }