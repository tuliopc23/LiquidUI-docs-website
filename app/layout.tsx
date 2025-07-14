import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientLayout from './ClientLayout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Liquidify - Modern Glassmorphism UI Library',
  description:
    'Beautiful, accessible React components with glassmorphism design system',
  keywords: [
    'React',
    'UI Library',
    'Glassmorphism',
    'Components',
    'TypeScript',
  ],
  authors: [{ name: 'Tulio Pinheiro Cunha' }],
  creator: 'Tulio Pinheiro Cunha',
  publisher: 'Liquidify',
  openGraph: {
    title: 'Liquidify - Modern Glassmorphism UI Library',
    description:
      'Beautiful, accessible React components with glassmorphism design system',
    url: 'https://liquidify-docs.vercel.app',
    siteName: 'Liquidify Docs',
    images: [
      {
        url: 'https://liquidify-docs.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Liquidify UI Library',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liquidify - Modern Glassmorphism UI Library',
    description:
      'Beautiful, accessible React components with glassmorphism design system',
    images: ['https://liquidify-docs.vercel.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env['GOOGLE_SITE_VERIFICATION'],
  },
};

export const dynamic = 'force-static';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* Analytics Scripts */}
        {process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS_ID'] && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS_ID']}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS_ID']}');
                `,
              }}
            />
          </>
        )}

        {/* Vercel Analytics */}
        {process.env['NEXT_PUBLIC_VERCEL_ANALYTICS_ID'] && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/"+key+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.15.3";
                analytics.load("${process.env['NEXT_PUBLIC_VERCEL_ANALYTICS_ID']}");
                analytics.page();
                }}();
              `,
            }}
          />
        )}

        {/* Plausible Analytics (Privacy-focused alternative) */}
        {process.env['NEXT_PUBLIC_PLAUSIBLE_DOMAIN'] && (
          <script
            defer
            data-domain={process.env['NEXT_PUBLIC_PLAUSIBLE_DOMAIN']}
            src='https://plausible.io/js/script.js'
          />
        )}

        {/* Preload critical resources */}
        <link
          rel='preload'
          href='/fonts/inter-var.woff2'
          as='font'
          type='font/woff2'
          crossOrigin=''
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
