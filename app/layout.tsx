import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SidebarLayout from '@/components/SidebarLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-700">
          <SidebarLayout />
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </body>

      {/* <body className={inter.className}>{children}</body> */}
    </html>
  )
}

