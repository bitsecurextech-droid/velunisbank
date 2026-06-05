'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Sidebar from '@/components/layout/Sidebar'
import PinSetupModal from '@/components/dashboard/PinSetupModal'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, accessToken } = useAuthStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [pinNeeded, setPinNeeded] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!accessToken) {
      router.push('/login')
    }
  }, [accessToken, router])

  useEffect(() => {
    if (user && user.isPinSet === false) {
      setPinNeeded(true)
    }
  }, [user])

  // Avoid hydration mismatch – only render after client mount
  if (!mounted) return null
  if (!user) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6fb' }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: '250px', padding: '32px' }}>
        {children}
      </main>

      {pinNeeded && (
        <PinSetupModal
          onComplete={() => {
            setPinNeeded(false)
            // refresh the user object in store (optional)
            useAuthStore.getState().refreshUser?.()
          }}
        />
      )}
    </div>
  )
}