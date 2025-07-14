import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800'>
      <div className='text-center space-y-6 p-8 max-w-md'>
        <h1 className='text-8xl font-bold text-blue-600 dark:text-blue-400'>
          404
        </h1>
        <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200'>
          Page Not Found
        </h2>
        <p className='text-gray-600 dark:text-gray-400'>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href='/'
          className='inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors'
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
