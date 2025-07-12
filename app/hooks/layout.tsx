// Force all hooks pages to be dynamic
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = false;

export default function HooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
