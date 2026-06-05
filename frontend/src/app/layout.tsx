import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Velunis Bank - Banking Without Borders',
  description: 'Premium international banking for modern individuals and businesses.',
  icons: {
    icon: 'https://res.cloudinary.com/dkomucpin/image/upload/v1780595302/velunis_icon_favicon_zpbqv2.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body style={{ margin: 0, background: '#f4f6fb', fontFamily: "'Inter', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}