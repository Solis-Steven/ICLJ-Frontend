import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ICLJ',
  description: 'Aplicación para administrar la Iglesia Casa de Luz Jireh',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}