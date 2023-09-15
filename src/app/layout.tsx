import './globals.css'
import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import MainLayout from '../components/layout/MainLayout'
import { GlobalContextProvider } from '@/context/globalContext'
import Loader from '../components/Loader/Loader'
import { Suspense } from 'react'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic']
})

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
      <body className={barlow.className}>
        <GlobalContextProvider>
            <MainLayout>
              <Suspense fallback={'cargando......'}>
                {children}
              </Suspense>
              
            </MainLayout>
        </GlobalContextProvider>
      </body>
    </html>
  )
}
