'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const DocsProvider = dynamic(() => import('../components/DocsProvider'), {
  ssr: false,
});
const ErrorBoundary = dynamic(
  () => import('../components/ErrorBoundary').then(mod => mod.ErrorBoundary),
  { ssr: false }
);
const CommunityFeedback = dynamic(
  () =>
    import('../components/CommunityFeatures').then(
      mod => mod.CommunityFeedback
    ),
  { ssr: false }
);

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsProvider>
      <ErrorBoundary>
        {children}
        {process.env['NEXT_PUBLIC_ENABLE_COMMUNITY_FEATURES'] === 'true' && (
          <CommunityFeedback />
        )}
      </ErrorBoundary>
    </DocsProvider>
  );
}
