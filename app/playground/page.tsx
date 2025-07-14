import Link from 'next/link';

export default function PlaygroundPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto px-6 py-12'>
        <div className='text-center space-y-8'>
          <h1 className='text-4xl font-bold text-blue-600 dark:text-blue-400'>
            Liquidify Playground
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Interactive component demonstrations with real-time editing and
            Apple HIG design principles
          </p>

          <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-2xl mx-auto'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4'>
              Coming Soon
            </h2>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              The interactive playground is currently being rebuilt with the
              latest version of Liquidify. In the meantime, explore our
              component documentation.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/components'
                className='inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors'
              >
                View Components
              </Link>
              <Link
                href='/docs'
                className='inline-flex items-center px-6 py-3 text-sm font-medium text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors border'
              >
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
