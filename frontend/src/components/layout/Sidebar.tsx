'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import {
  LayoutDashboard,
  Landmark,
  CreditCard,
  ArrowRightLeft,
  PiggyBank,
  ReceiptText,
  Users,
  Headset,
  Settings,
  LogOut,
  ArrowUpRight,
  User,
  Wallet,
  Building2,
} from 'lucide-react'

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/accounts', label: 'Accounts', icon: Landmark },
  { href: '/cards', label: 'Cards', icon: CreditCard },
  { href: '/transfers', label: 'Transfers', icon: ArrowRightLeft },
  { href: '/deposits', label: 'Deposits', icon: PiggyBank },
  { href: '/withdrawals', label: 'Withdrawals', icon: ArrowUpRight },
  { href: '/transactions', label: 'Transactions', icon: ReceiptText },
  { href: '/loans', label: 'Loans', icon: Building2 },
  { href: '/beneficiaries', label: 'Beneficiaries', icon: Users },
  { href: '/digital-assets', label: 'Digital Assets', icon: Wallet },
  { href: '/support', label: 'Support', icon: Headset },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '250px',
        background: '#001f3f',
        color: '#C7CDD6',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <Link
        href="/dashboard"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '32px',
          textDecoration: 'none',
        }}
      >
        <img
          src="https://res.cloudinary.com/dkomucpin/image/upload/v1780595302/velunis_icon_favicon_zpbqv2.png"
          alt="Velunis"
          style={{ height: '36px' }}
        />
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#D4AF37',
            fontSize: '1.3rem',
            fontWeight: 700,
          }}
        >
          VELUNIS
        </span>
      </Link>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          overflowY: 'auto',
        }}
      >
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: active ? '#D4AF37' : '#C7CDD6',
                background: active ? 'rgba(212,175,55,0.08)' : 'transparent',
                fontWeight: active ? 600 : 400,
                transition: 'all 0.2s',
              }}
            >
              <link.icon size={20} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* User and Logout */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '12px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#D4AF37',
              color: '#001f3f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '14px',
            }}
          >
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div style={{ fontSize: '14px' }}>
            <p style={{ color: 'white' }}>{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '10px',
            color: '#C7CDD6',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}