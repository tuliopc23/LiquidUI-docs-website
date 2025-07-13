import { Layout, Navbar, Footer } from 'nextra-theme-docs';

// Force all docs pages to be dynamic
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = false;

export default function DocsLayout({
  children,
  pageOpts,
}: {
  children: React.ReactNode;
  pageOpts: { pageMap: unknown[] };
}) {
  return (
    <Layout
      navbar={<Navbar logo={<span className='font-bold'>Liquidify</span>} />}
      footer={<Footer />}
      pageMap={pageOpts.pageMap}
    >
      {children}
    </Layout>
  );
}
