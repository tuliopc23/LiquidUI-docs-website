import React from 'react'
import Head from 'next/head'

export default function TypographyTest() {
  return (
    <>
      <Head>
        <title>Typography System Test | Liquidify</title>
        <meta name="description" content="Typography system test page for responsive breakpoints and hierarchy validation" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-display-4xl font-black text-gray-900 dark:text-white mb-4">
              Typography System Test
            </h1>
            <p className="text-body-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Testing responsive breakpoints from 320px to 1536px with hierarchical clarity
            </p>
          </header>

          {/* Display Scale */}
          <section className="mb-16">
            <h2 className="text-subtitle-xl font-semibold text-gray-800 dark:text-gray-200 mb-8 border-b pb-2">
              Display Scale (Hero Sections)
            </h2>
            <div className="space-y-6">
              <div className="text-display-5xl text-gray-900 dark:text-white">Display 5XL - Hero Text</div>
              <div className="text-display-4xl text-gray-900 dark:text-white">Display 4XL - Major Headlines</div>
              <div className="text-display-3xl text-gray-900 dark:text-white">Display 3XL - Page Headers</div>
              <div className="text-display-2xl text-gray-900 dark:text-white">Display 2XL - Section Headers</div>
              <div className="text-display-xl text-gray-900 dark:text-white">Display XL - Large Headers</div>
              <div className="text-display-lg text-gray-900 dark:text-white">Display LG - Medium Headers</div>
              <div className="text-display-md text-gray-900 dark:text-white">Display MD - Small Headers</div>
              <div className="text-display-sm text-gray-900 dark:text-white">Display SM - Compact Headers</div>
            </div>
          </section>

          {/* Title/Subtitle Scale */}
          <section className="mb-16">
            <h2 className="text-subtitle-xl font-semibold text-gray-800 dark:text-gray-200 mb-8 border-b pb-2">
              Title Scale (Section Headings)
            </h2>
            <div className="space-y-4">
              <div className="text-subtitle-2xl text-gray-800 dark:text-gray-200">Subtitle 2XL - Large Section Title</div>
              <div className="text-subtitle-xl text-gray-800 dark:text-gray-200">Subtitle XL - Section Title</div>
              <div className="text-subtitle-lg text-gray-800 dark:text-gray-200">Subtitle LG - Subsection Title</div>
              <div className="text-subtitle-md text-gray-800 dark:text-gray-200">Subtitle MD - Small Section Title</div>
              <div className="text-subtitle-sm text-gray-800 dark:text-gray-200">Subtitle SM - Compact Section Title</div>
            </div>
          </section>

          {/* Body Scale */}
          <section className="mb-16">
            <h2 className="text-subtitle-xl font-semibold text-gray-800 dark:text-gray-200 mb-8 border-b pb-2">
              Body Scale (Content & Paragraphs)
            </h2>
            <div className="space-y-6">
              <div className="text-body-2xl text-gray-700 dark:text-gray-300">
                <strong>Body 2XL:</strong> This is large body text, perfect for important introductory paragraphs or key statements that need to stand out while maintaining excellent readability.
              </div>
              <div className="text-body-xl text-gray-700 dark:text-gray-300">
                <strong>Body XL:</strong> This is extra large body text, ideal for lead paragraphs, introductory content, or highlighting important information in a clean, readable format.
              </div>
              <div className="text-body-lg text-gray-700 dark:text-gray-300">
                <strong>Body LG:</strong> This is large body text that provides excellent readability for main content areas. It&apos;s perfect for blog posts, articles, and primary content sections.
              </div>
              <div className="text-body-md text-gray-700 dark:text-gray-300">
                <strong>Body MD:</strong> This is the standard body text size, providing optimal readability for most content. It strikes the perfect balance between readability and efficient use of space.
              </div>
              <div className="text-body-sm text-gray-600 dark:text-gray-400">
                <strong>Body SM:</strong> This is small body text, useful for secondary information, captions, or areas where space is limited but readability remains important.
              </div>
              <div className="text-body-xs text-gray-600 dark:text-gray-400">
                <strong>Body XS:</strong> This is extra small body text, perfect for footnotes, metadata, fine print, or any content that needs to be present but not prominent.
              </div>
            </div>
          </section>

          {/* Caption Scale */}
          <section className="mb-16">
            <h2 className="text-subtitle-xl font-semibold text-gray-800 dark:text-gray-200 mb-8 border-b pb-2">
              Caption Scale (Metadata & Labels)
            </h2>
            <div className="space-y-4">
              <div className="text-caption text-gray-500 dark:text-gray-500">
                Caption Text - For Image Captions, Metadata, Labels
              </div>
            </div>
          </section>

          {/* Font Family Tests */}
          <section className="mb-16">
            <h2 className="text-subtitle-xl font-semibold text-gray-800 dark:text-gray-200 mb-8 border-b pb-2">
              Font Family Tests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-subtitle-md font-medium text-gray-700 dark:text-gray-300 mb-4">Sans (Inter)</h3>
                <div className="font-sans space-y-2">
                  <div className="text-body-lg">Inter Regular - The quick brown fox jumps over the lazy dog</div>
                  <div className="text-body-lg font-medium">Inter Medium - The quick brown fox jumps over the lazy dog</div>
                  <div className="text-body-lg font-semibold">Inter Semibold - The quick brown fox jumps over the lazy dog</div>
                  <div className="text-body-lg font-bold">Inter Bold - The quick brown fox jumps over the lazy dog</div>
                </div>
              </div>
              <div>
                <h3 className="text-subtitle-md font-medium text-gray-700 dark:text-gray-300 mb-4">Mono (JetBrains Mono)</h3>
                <div className="font-mono space-y-2">
                  <div className="text-body-lg">JetBrains Mono Regular - console.log(&apos;Hello World&apos;)</div>
                  <div className="text-body-lg font-bold">JetBrains Mono Bold - const typography = &apos;awesome&apos;</div>
                </div>
              </div>
            </div>
          </section>

          {/* Responsive Test Grid */}
          <section className="mb-16">
            <h2 className="text-subtitle-xl font-semibold text-gray-800 dark:text-gray-200 mb-8 border-b pb-2">
              Responsive Hierarchy Test
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-display-2xl text-gray-900 dark:text-white mb-4">Responsive Header</h3>
              <h4 className="text-subtitle-lg text-gray-700 dark:text-gray-300 mb-4">Responsive Subheader</h4>
              <p className="text-body-lg text-gray-600 dark:text-gray-400 mb-4">
                This paragraph tests how the typography scales across different breakpoints. The text should remain readable and maintain proper hierarchy at all screen sizes.
              </p>
              <p className="text-body-md text-gray-600 dark:text-gray-400 mb-4">
                Standard body text that should scale appropriately on mobile devices while maintaining readability.
              </p>
              <div className="text-caption text-gray-500 dark:text-gray-500">
                Caption text for metadata and small details
              </div>
            </div>
          </section>

          {/* Breakpoint Indicators */}
          <section className="mb-16">
            <h2 className="text-subtitle-xl font-semibold text-gray-800 dark:text-gray-200 mb-8 border-b pb-2">
              Current Breakpoint
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg sm:hidden">
                <span className="text-body-md font-medium text-red-800 dark:text-red-200">XS: &lt; 640px</span>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-lg hidden sm:block md:hidden">
                <span className="text-body-md font-medium text-orange-800 dark:text-orange-200">SM: 640px - 768px</span>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg hidden md:block lg:hidden">
                <span className="text-body-md font-medium text-yellow-800 dark:text-yellow-200">MD: 768px - 1024px</span>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg hidden lg:block xl:hidden">
                <span className="text-body-md font-medium text-green-800 dark:text-green-200">LG: 1024px - 1280px</span>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg hidden xl:block 2xl:hidden">
                <span className="text-body-md font-medium text-blue-800 dark:text-blue-200">XL: 1280px - 1536px</span>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg hidden 2xl:block">
                <span className="text-body-md font-medium text-purple-800 dark:text-purple-200">2XL: &gt; 1536px</span>
              </div>
            </div>
          </section>

          {/* Font Loading Test */}
          <section className="mb-16">
            <h2 className="text-subtitle-xl font-semibold text-gray-800 dark:text-gray-200 mb-8 border-b pb-2">
              Font Loading Test (Fallback Stacks)
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <p className="text-body-md text-gray-700 dark:text-gray-300 mb-2">
                <strong>Instructions:</strong> Block fonts in DevTools Network tab to test fallback behavior.
              </p>
              <p className="text-body-sm text-gray-600 dark:text-gray-400">
                Fallback fonts should gracefully degrade while maintaining readability and similar line heights.
              </p>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
