import Link from 'next/link'

const actions = [
  { label: 'Send Money', href: '/transfers', icon: 'fa-paper-plane' },
  { label: 'Deposit', href: '/deposits', icon: 'fa-arrow-down' },
  { label: 'Cards', href: '/cards', icon: 'fa-credit-card' },
  { label: 'Statements', href: '/transactions', icon: 'fa-file-alt' },
]

export default function QuickActions() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '14px 22px',
            border: '1px solid #eef3fc',
            textDecoration: 'none',
            color: '#001f3f',
            fontWeight: 500,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <i className={`fas ${action.icon}`} style={{ color: '#D4AF37', fontSize: '0.9rem' }}></i>
          {action.label}
        </Link>
      ))}
    </div>
  )
}