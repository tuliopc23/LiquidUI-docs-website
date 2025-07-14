'use client';

import {
  AppleText,
  AppleSection,
  AppleCard,
  AppleButton,
} from './AppleHIGSystem';

export function StaticShowcase() {
  return (
    <div className='py-20 showcase-container min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      {/* Hero Section */}
      <AppleSection
        title='Experience Liquidify'
        subtitle='Beautiful liquid glass components with premium Apple HIG design and animations'
        centered={true}
        className='mb-20'
      >
        <div />
      </AppleSection>

      {/* Component Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto px-6'>
        <AppleCard className='p-6'>
          <AppleText
            variant='title3'
            color='accent'
            className='block mb-3 font-semibold'
          >
            Premium Glass Buttons
          </AppleText>
          <AppleText variant='callout' color='secondary' className='block mb-6'>
            Apple HIG-compliant buttons with magnetic hover effects and
            haptic-style feedback
          </AppleText>
          <div className='space-y-3'>
            <AppleButton variant='primary' size='lg' className='w-full'>
              Primary Action
            </AppleButton>
            <AppleButton variant='secondary' size='md' className='w-full'>
              Secondary Action
            </AppleButton>
            <AppleButton variant='tertiary' size='md' className='w-full'>
              Tertiary Action
            </AppleButton>
          </div>
        </AppleCard>

        <AppleCard className='p-6'>
          <AppleText
            variant='title3'
            color='accent'
            className='block mb-3 font-semibold'
          >
            Advanced Input Elements
          </AppleText>
          <AppleText variant='callout' color='secondary' className='block mb-6'>
            Liquid glass inputs with premium focus animations and Apple HIG
            accessibility
          </AppleText>
          <div className='space-y-4'>
            <div className='w-full h-12 bg-white/10 border border-white/20 rounded-xl backdrop-blur-md p-3 text-sm placeholder-gray-500'>
              Full Name
            </div>
            <div className='w-full h-12 bg-white/10 border border-white/20 rounded-xl backdrop-blur-md p-3 text-sm placeholder-gray-500'>
              Email Address
            </div>
            <div className='w-full h-12 bg-white/10 border border-white/20 rounded-xl backdrop-blur-md p-3 text-sm placeholder-gray-500'>
              Select Department
            </div>
          </div>
        </AppleCard>

        <AppleCard className='p-6'>
          <AppleText
            variant='title3'
            color='accent'
            className='block mb-3 font-semibold'
          >
            Interactive Components
          </AppleText>
          <AppleText variant='callout' color='secondary' className='block mb-6'>
            Premium liquid glass components with Apple&apos;s elevation system
            and micro-interactions
          </AppleText>
          <div className='space-y-4'>
            <AppleCard className='p-4' interactive={true}>
              <AppleText variant='headline' className='block mb-2'>
                Interactive Card
              </AppleText>
              <AppleText variant='footnote' color='secondary' className='block'>
                Click me for haptic feedback
              </AppleText>
            </AppleCard>
            <AppleCard className='p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10'>
              <AppleText variant='headline' className='block mb-2'>
                Premium Glass
              </AppleText>
              <AppleText variant='footnote' color='secondary' className='block'>
                Enhanced with gradient overlay
              </AppleText>
            </AppleCard>
          </div>
        </AppleCard>
      </div>

      {/* Call to Action */}
      <AppleSection className='mt-24'>
        <div className='text-center'>
          <AppleCard className='max-w-3xl mx-auto p-8'>
            <div className='mb-8'>
              <AppleText
                variant='title2'
                className='block mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold'
              >
                Ready to Build Premium Interfaces?
              </AppleText>
              <AppleText
                variant='body'
                color='secondary'
                className='block max-w-2xl mx-auto'
              >
                Start creating beautiful liquid glass interfaces with our
                comprehensive component library, featuring Apple HIG compliance
                and premium animations.
              </AppleText>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <AppleButton variant='primary' size='lg'>
                Get Started →
              </AppleButton>
              <AppleButton variant='secondary' size='lg'>
                View Documentation
              </AppleButton>
            </div>
          </AppleCard>
        </div>
      </AppleSection>
    </div>
  );
}

export default StaticShowcase;
