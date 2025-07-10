'use client';

import { useState } from 'react';
import {
  GlassButton,
  GlassCard,
  GlassInput,
  GlassCheckbox,
  GlassSwitch,
  GlassBadge,
  GlassProgress,
  GlassAvatar,
  GlassModal,
  GlassTooltip,
  GlassDropdown,
  GlassSelect,
  GlassSlider,
  GlassSearch,
  GlassTextarea,
  GlassLoading,
  GlassTabs,
  ThemeProvider,
} from 'liquidify';

export default function LiquidifyInteractiveDemo() {
  const [inputValue, setInputValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(65);
  const [searchValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [textareaValue, setTextareaValue] = useState('');
  const [activeTab] = useState('tab1');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    console.info('Action completed!');
  };

  const updateProgress = () => {
    const newProgress = Math.min(progress + 10, 100);
    setProgress(newProgress);
  };

  return (
    <ThemeProvider>
      <div className='space-y-8 p-6'>
        <div className='text-center mb-8'>
          <h2 className='hig-title-1 mb-4 bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent'>
            Liquidify Interactive Demo
          </h2>
          <p className='hig-body text-apple-gray-600 dark:text-apple-gray-300'>
            Experience real Liquidify components with live interactions
          </p>
        </div>

        {/* Buttons Section */}
        <GlassCard className='p-6'>
          <h3 className='hig-headline mb-4'>Glass Buttons</h3>
          <div className='flex flex-wrap gap-4'>
            <GlassButton
              variant='primary'
              onClick={handleButtonClick}
              loading={loading}
            >
              {loading ? 'Loading...' : 'Primary Action'}
            </GlassButton>
            <GlassButton variant='secondary'>Secondary</GlassButton>
            <GlassButton variant='tertiary' size='sm'>
              Tertiary Small
            </GlassButton>
            <GlassButton variant='ghost' size='lg'>
              Ghost Large
            </GlassButton>
            <GlassButton variant='destructive' disabled>
              Destructive (Disabled)
            </GlassButton>
          </div>
        </GlassCard>

        {/* Form Controls Section */}
        <GlassCard className='p-6'>
          <h3 className='hig-headline mb-4'>Form Controls</h3>
          <div className='space-y-4'>
            <div>
              <label className='hig-callout block mb-2'>Glass Input</label>
              <GlassInput
                placeholder='Enter some text...'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className='w-full max-w-sm'
              />
              {inputValue && (
                <p className='hig-caption-1 mt-2 text-apple-gray-500'>
                  You typed: {inputValue}
                </p>
              )}
            </div>

            <div>
              <label className='hig-callout block mb-2'>Glass Search</label>
              <GlassSearch
                placeholder='Search components...'
                className='w-full max-w-sm'
              />
            </div>

            <div>
              <label className='hig-callout block mb-2'>Glass Select</label>
              <GlassSelect
                value={selectValue}
                onChange={value => setSelectValue(value)}
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' },
                ]}
                placeholder='Select an option...'
                className='w-full max-w-sm'
              />
            </div>

            <div>
              <label className='hig-callout block mb-2'>Glass Textarea</label>
              <GlassTextarea
                placeholder='Enter a longer message...'
                value={textareaValue}
                onChange={e => setTextareaValue(e.target.value)}
                rows={3}
                className='w-full max-w-sm'
              />
            </div>

            <div>
              <label className='hig-callout block mb-2'>
                Glass Slider: {sliderValue}%
              </label>
              <GlassSlider
                value={sliderValue}
                onChange={value => setSliderValue(value)}
                min={0}
                max={100}
                step={1}
                className='w-full max-w-sm'
              />
            </div>

            <div className='flex items-center gap-4'>
              <GlassCheckbox
                checked={checkboxValue}
                onChange={e => setCheckboxValue(e.target.checked)}
                label='Glass Checkbox'
              />
              <GlassSwitch
                checked={switchValue}
                onChange={checked => setSwitchValue(checked)}
                label='Glass Switch'
              />
            </div>
          </div>
        </GlassCard>

        {/* Display Components Section */}
        <GlassCard className='p-6'>
          <h3 className='hig-headline mb-4'>Display Components</h3>
          <div className='space-y-6'>
            {/* Avatars and Badges */}
            <div className='flex items-center gap-4'>
              <GlassAvatar
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
                alt='User Avatar'
                size='lg'
                status='online'
              />
              <div className='space-y-2'>
                <div className='flex gap-2'>
                  <GlassBadge variant='default'>Default</GlassBadge>
                  <GlassBadge variant='success'>Success</GlassBadge>
                  <GlassBadge variant='warning'>Warning</GlassBadge>
                  <GlassBadge variant='error'>Error</GlassBadge>
                </div>
                <p className='hig-caption-1 text-apple-gray-500'>
                  Avatar with status indicator and various badge styles
                </p>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className='flex items-center justify-between mb-2'>
                <span className='hig-callout'>Progress: {progress}%</span>
                <GlassButton
                  size='xs'
                  onClick={updateProgress}
                  disabled={progress >= 100}
                >
                  +10%
                </GlassButton>
              </div>
              <GlassProgress
                value={progress}
                max={100}
                className='w-full'
                showValue={false}
                color='blue'
              />
            </div>
          </div>
        </GlassCard>

        {/* Interactive Features */}
        <GlassCard className='p-6' hover>
          <h3 className='hig-headline mb-4'>Interactive Features</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h4 className='hig-callout mb-3'>State Management</h4>
              <div className='space-y-2 hig-caption-1'>
                <div>
                  Input Value:{' '}
                  <code className='liquid-glass-thin px-2 py-1 rounded'>
                    {inputValue || 'empty'}
                  </code>
                </div>
                <div>
                  Search Value:{' '}
                  <code className='liquid-glass-thin px-2 py-1 rounded'>
                    {searchValue || 'empty'}
                  </code>
                </div>
                <div>
                  Select Value:{' '}
                  <code className='liquid-glass-thin px-2 py-1 rounded'>
                    {selectValue || 'none'}
                  </code>
                </div>
                <div>
                  Slider Value:{' '}
                  <code className='liquid-glass-thin px-2 py-1 rounded'>
                    {sliderValue}%
                  </code>
                </div>
                <div>
                  Checkbox:{' '}
                  <code className='liquid-glass-thin px-2 py-1 rounded'>
                    {checkboxValue.toString()}
                  </code>
                </div>
                <div>
                  Switch:{' '}
                  <code className='liquid-glass-thin px-2 py-1 rounded'>
                    {switchValue.toString()}
                  </code>
                </div>
                <div>
                  Active Tab:{' '}
                  <code className='liquid-glass-thin px-2 py-1 rounded'>
                    {activeTab}
                  </code>
                </div>
                <div>
                  Loading:{' '}
                  <code className='liquid-glass-thin px-2 py-1 rounded'>
                    {loading.toString()}
                  </code>
                </div>
                <div>
                  Progress:{' '}
                  <code className='liquid-glass-thin px-2 py-1 rounded'>
                    {progress}%
                  </code>
                </div>
              </div>
            </div>

            <div>
              <h4 className='hig-callout mb-3'>Component Features</h4>
              <ul className='space-y-1 hig-caption-1 text-apple-gray-600 dark:text-apple-gray-300'>
                <li>✅ Glassmorphism effects</li>
                <li>✅ Magnetic hover interactions</li>
                <li>✅ Loading states</li>
                <li>✅ Accessibility support</li>
                <li>✅ Theme provider integration</li>
                <li>✅ Apple HIG compliance</li>
              </ul>
            </div>
          </div>
        </GlassCard>

        {/* Navigation & Layout */}
        <GlassCard className='p-6'>
          <h3 className='hig-headline mb-4'>Navigation & Layout</h3>
          <div className='space-y-4'>
            <div>
              <label className='hig-callout block mb-2'>Glass Tabs</label>
              <GlassTabs
                tabs={[
                  { id: 'tab1', label: 'Tab 1', content: 'Content for tab 1' },
                  { id: 'tab2', label: 'Tab 2', content: 'Content for tab 2' },
                  { id: 'tab3', label: 'Tab 3', content: 'Content for tab 3' },
                ]}
              />
            </div>

            <div>
              <label className='hig-callout block mb-2'>Glass Dropdown</label>
              <GlassDropdown
                trigger={
                  <GlassButton variant='secondary'>Open Menu</GlassButton>
                }
                items={[
                  { label: 'Profile', value: 'profile' },
                  { label: 'Settings', value: 'settings' },
                  { label: 'Logout', value: 'logout' },
                ]}
              />
            </div>

            <div>
              <label className='hig-callout block mb-2'>Glass Modal</label>
              <GlassButton onClick={() => setIsModalOpen(true)}>
                Open Modal
              </GlassButton>
              <GlassModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title='Glass Modal'
              >
                <p className='hig-body mb-4'>
                  This is a glass modal with blur effects.
                </p>
                <div className='flex justify-end gap-2'>
                  <GlassButton
                    variant='secondary'
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton
                    variant='primary'
                    onClick={() => setIsModalOpen(false)}
                  >
                    Confirm
                  </GlassButton>
                </div>
              </GlassModal>
            </div>
          </div>
        </GlassCard>

        {/* Loading & Feedback */}
        <GlassCard className='p-6'>
          <h3 className='hig-headline mb-4'>Loading & Feedback</h3>
          <div className='space-y-4'>
            <div>
              <label className='hig-callout block mb-2'>Glass Loading</label>
              <div className='flex items-center gap-4'>
                <GlassLoading variant='spinner' size='sm' />
                <GlassLoading variant='dots' size='md' />
                <GlassLoading variant='pulse' size='lg' />
              </div>
            </div>

            <div>
              <label className='hig-callout block mb-2'>Glass Tooltip</label>
              <GlassTooltip content='This is a tooltip with glass effects'>
                <GlassButton variant='secondary'>Hover for tooltip</GlassButton>
              </GlassTooltip>
            </div>
          </div>
        </GlassCard>

        {/* Code Example */}
        <GlassCard className='p-6'>
          <h3 className='hig-headline mb-4'>Code Example</h3>
          <pre className='liquid-glass p-4 rounded-apple-lg overflow-x-auto hig-caption-1 font-mono'>
            <code>{`import { 
  GlassButton, 
  GlassCard, 
  GlassInput,
  GlassSearch,
  GlassSelect,
  GlassSlider,
  GlassModal,
  GlassLoading,
  ThemeProvider 
} from 'liquidify'

export function MyComponent() {
  return (
    <ThemeProvider>
      <GlassCard className="p-6">
        <h3>My Glass Interface</h3>
        <GlassSearch placeholder="Search..." />
        <GlassSelect 
          options={[
            { value: 'option1', label: 'Option 1' }
          ]}
        />
        <GlassSlider min={0} max={100} />
        <GlassButton variant="primary">
          Submit
        </GlassButton>
      </GlassCard>
    </ThemeProvider>
  )
}`}</code>
          </pre>
        </GlassCard>
      </div>
    </ThemeProvider>
  );
}
