import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function ViewerLayout({ children }: { children: React.ReactNode }) {
  if ((await auth()).sessionClaims?.metadata.role !== null) {
    redirect('/');
  }

  return <>{children}</>
}