// Force the root page to be dynamic
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = false;

// Import the MDX content
import HomePage from './page.mdx';

export default function Page() {
  return <HomePage />;
}
