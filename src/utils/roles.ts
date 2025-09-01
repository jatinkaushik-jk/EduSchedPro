import { Roles } from '@/types/globals'
import { auth } from '@clerk/nextjs/server'

// Check user role exists or not
export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
}

// Get user role
export const userRole = async () => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role;
}
