import type { Metadata } from 'next'
import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import { ThemeProvider } from 'next-themes'
import 'nextra-theme-docs/style.css'
import './globals.css'
import GlassBackground from '../components/ui/GlassBackground'

export const metadata: Metadata = {
  title: 'Liquidify - React UI Component Library',
  description: 'Modern React UI components with glassmorphism design and physics-based interactions',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlassBackground variant="gradient" animated={true}>
            <Layout
              pageMap={await getPageMap()}
              docsRepositoryBase="https://github.com/tuliopc23/Liquidify-docs/tree/main"
            >
              <Navbar 
                logo={
                  <span className="hig-headline bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent">Liquidify</span>
                }
              />
              <main>
                {children}
              </main>
              <Footer>
                <p className="hig-caption-1 text-apple-gray-600 dark:text-apple-gray-400">MIT 2024 © Liquidify</p>
              </Footer>
            </Layout>
          </GlassBackground>
        </ThemeProvider>
      </body>
    </html>
  )
}