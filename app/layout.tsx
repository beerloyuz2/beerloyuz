import './globals.css'
import AuthProvider from '@/providers/AuthProvider'
import { Nunito } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/ui/theme-provider'

const nunitosans = Nunito({
  weight: "400",
  subsets: ["latin"]
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={nunitosans.className}>
        <ThemeProvider  attribute='class' defaultTheme="dark" enableSystem={false} storageKey='beerloyuz-cut'>
          <AuthProvider>
            <Toaster />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
