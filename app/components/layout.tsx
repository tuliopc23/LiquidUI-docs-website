// Force all component pages to be dynamic
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = false;

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
