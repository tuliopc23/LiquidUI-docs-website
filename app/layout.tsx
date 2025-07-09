import type { Metadata } from 'next';
import { Layout, Navbar, Footer } from 'nextra-theme-docs';
import { getPageMap } from 'nextra/page-map';
import { ThemeProvider } from 'next-themes';
import 'nextra-theme-docs/style.css';
import './globals.css';
import PageTransition from '../components/PageTransition';
import { ClientWrapper } from '../components/ClientComponents';

export const metadata: Metadata = {
  title: 'Liquidify - React UI Component Library',
  description:
    'Modern React UI components with glassmorphism design and physics-based interactions',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ClientWrapper>
            <PageTransition>
              <Layout
                pageMap={await getPageMap()}
                docsRepositoryBase='https://github.com/tuliopc23/Liquidify-docs/tree/main'
              >
                <Navbar
                  logo={
                    <span className='hig-headline bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent'>
                      Liquidify
                    </span>
                  }
                />
                <main>{children}</main>
                <Footer>
                  <p className='hig-caption-1 text-apple-gray-600 dark:text-apple-gray-400'>
                    MIT 2024 © Liquidify
                  </p>
                </Footer>
              </Layout>

              {/* SVG Filters for Liquid Glass Effects */}
              <svg style={{ display: 'none' }}>
                <filter
                  id='liquid-lens'
                  x='-50%'
                  y='-50%'
                  width='200%'
                  height='200%'
                >
                  <feImage
                    x='0'
                    y='0'
                    result='normalMap'
                    xlinkHref="data:image/svg+xml;utf8,
                           <svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
                             <radialGradient id='nmap' cx='50%' cy='50%' r='50%'>
                               <stop offset='0%' stopColor='rgb(128,128,255)'/>
                               <stop offset='100%' stopColor='rgb(255,255,255)'/>
                             </radialGradient>
                             <rect width='100%' height='100%' fill='url(#nmap)'/>
                           </svg>"
                  />
                  <feDisplacementMap
                    in='SourceGraphic'
                    in2='normalMap'
                    scale='60'
                    xChannelSelector='R'
                    yChannelSelector='G'
                    result='displaced'
                  />
                  <feMerge>
                    <feMergeNode in='displaced' />
                  </feMerge>
                </filter>

                <filter
                  id='liquid-distortion'
                  x='0%'
                  y='0%'
                  width='100%'
                  height='100%'
                >
                  <feTurbulence
                    type='fractalNoise'
                    baseFrequency='0.008 0.008'
                    numOctaves='2'
                    seed='92'
                    result='noise'
                  />
                  <feGaussianBlur
                    in='noise'
                    stdDeviation='2'
                    result='blurred'
                  />
                  <feDisplacementMap
                    in='SourceGraphic'
                    in2='blurred'
                    scale='70'
                    xChannelSelector='R'
                    yChannelSelector='G'
                  />
                </filter>
              </svg>
            </PageTransition>
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
