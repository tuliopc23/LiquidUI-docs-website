import React from 'react';
import { ComponentShowcase } from './ComponentShowcase';
import {
  GlassButton,
  GlassCard,
  GlassCardHeader,
  GlassCardContent,
  GlassCardTitle,
  GlassCardDescription,
  GlassInput,
  GlassSelect,
  GlassSwitch,
  GlassProgress,
  GlassAvatar,
  GlassCheckbox,
  GlassSlider,
  GlassModal,
  GlassDropdown,
  GlassTooltip,
  GlassLoading,
  GlassBadge,
  type GlassSelectOption,
} from 'liquidify';
import { Download, Heart, Settings, Mail, Star, Zap } from 'lucide-react';

// Example 1: Button Showcase
export const LiquidifyButtonShowcase = () => {
  const buttonCode = `import { GlassButton } from 'liquidify';

<GlassButton variant="primary" size="md">
  Primary Button
</GlassButton>
<GlassButton variant="secondary" size="md">
  Secondary Button  
</GlassButton>
<GlassButton variant="destructive" size="md">
  Destructive Button
</GlassButton>`;

  return (
    <ComponentShowcase
      title="Glass Buttons"
      description="Beautiful glassmorphism buttons with multiple variants and physics-based interactions"
      code={buttonCode}
      forceDarkMode={false} // Let it follow system theme
    >
      <div className="flex flex-wrap gap-4">
        <GlassButton variant="primary" size="md" leftIcon={<Download className="w-4 h-4" />}>
          Primary
        </GlassButton>
        <GlassButton variant="secondary" size="md" leftIcon={<Heart className="w-4 h-4" />}>
          Secondary
        </GlassButton>
        <GlassButton variant="destructive" size="md" leftIcon={<Settings className="w-4 h-4" />}>
          Destructive
        </GlassButton>
        <GlassButton variant="ghost" size="md">
          Ghost
        </GlassButton>
        <GlassButton variant="tertiary" size="md">
          Tertiary
        </GlassButton>
      </div>
    </ComponentShowcase>
  );
};

// Example 2: Card Showcase
export const LiquidifyCardShowcase = () => {
  const cardCode = `import { GlassCard, GlassCardHeader, GlassCardContent, GlassCardTitle, GlassCardDescription } from 'liquidify';

<GlassCard className="max-w-md">
  <GlassCardHeader>
    <GlassCardTitle>Beautiful Glass Card</GlassCardTitle>
    <GlassCardDescription>
      Experience the future of UI design with glassmorphism
    </GlassCardDescription>
  </GlassCardHeader>
  <GlassCardContent>
    <p>Your content goes here...</p>
  </GlassCardContent>
</GlassCard>`;

  return (
    <ComponentShowcase
      title="Glass Cards"
      description="Elegant glassmorphism cards that adapt to any background with beautiful transparency effects"
      code={cardCode}
    >
      <GlassCard className="max-w-md">
        <GlassCardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <GlassCardTitle>Beautiful Glass Card</GlassCardTitle>
              <GlassCardDescription>
                Experience the future of UI design with glassmorphism
              </GlassCardDescription>
            </div>
          </div>
        </GlassCardHeader>
        <GlassCardContent>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            This card demonstrates the beautiful glassmorphism effect from the liquidify library.
            It automatically adapts to light and dark themes.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <GlassButton variant="secondary" size="sm">
              Learn More
            </GlassButton>
          </div>
        </GlassCardContent>
      </GlassCard>
    </ComponentShowcase>
  );
};

// Example 3: Form Components Showcase
export const LiquidifyFormShowcase = () => {
  const [switchValue, setSwitchValue] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState(50);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState('');

  const selectOptions: GlassSelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const formCode = `import { GlassInput, GlassSelect, GlassSwitch, GlassSlider, GlassCheckbox } from 'liquidify';

<div className="space-y-4">
  <GlassInput 
    placeholder="Enter your email" 
    variant="email"
    leftIcon={<Mail className="w-4 h-4" />}
  />
  <GlassSelect 
    options={options}
    placeholder="Select an option"
    value={value}
    onChange={setValue}
  />
  <GlassSwitch 
    label="Enable notifications"
    checked={checked}
    onChange={setChecked}
  />
  <GlassSlider 
    value={value}
    onChange={setValue}
    min={0}
    max={100}
    showValue
  />
  <GlassCheckbox 
    label="I agree to the terms"
    checked={checked}
    onChange={setChecked}
  />
</div>`;

  return (
    <ComponentShowcase
      title="Glass Form Components"
      description="Complete set of form components with glassmorphism design and accessibility features"
      code={formCode}
    >
      <div className="space-y-6 w-full max-w-md">
        <GlassInput 
          placeholder="Enter your email" 
          variant="email"
          leftIcon={<Mail className="w-4 h-4" />}
        />
        
        <GlassSelect 
          options={selectOptions}
          placeholder="Select an option"
          value={selectValue}
          onChange={setSelectValue}
        />
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700 dark:text-gray-300">Enable notifications</span>
          <GlassSwitch 
            checked={switchValue}
            onChange={setSwitchValue}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Volume</span>
            <span className="text-xs text-gray-500">{sliderValue}%</span>
          </div>
          <GlassSlider 
            value={sliderValue}
            onChange={setSliderValue}
            min={0}
            max={100}
            showValue={false}
          />
        </div>
        
        <GlassCheckbox 
          label="I agree to the terms and conditions"
          checked={checkboxValue}
          onChange={(e) => setCheckboxValue(e.target.checked)}
        />
      </div>
    </ComponentShowcase>
  );
};

// Example 4: Progress and Avatar Showcase
export const LiquidifyMiscShowcase = () => {
  const miscCode = `import { GlassProgress, GlassAvatar } from 'liquidify';

<div className="space-y-4">
  <GlassProgress value={75} max={100} color="blue" showValue />
  <GlassAvatar 
    src="/avatar.jpg" 
    alt="User Avatar" 
    size="lg" 
    status="online" 
  />
</div>`;

  return (
    <ComponentShowcase
      title="Progress & Avatar Components"
      description="Beautiful progress indicators and avatar components with status indicators"
      code={miscCode}
    >
      <div className="space-y-6 w-full max-w-md">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Upload Progress</span>
            <span className="text-xs text-gray-500">75%</span>
          </div>
          <GlassProgress value={75} max={100} color="blue" showValue={false} />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Download Progress</span>
            <span className="text-xs text-gray-500">45%</span>
          </div>
          <GlassProgress value={45} max={100} color="green" showValue={false} />
        </div>
        
        <div className="flex items-center space-x-4">
          <GlassAvatar 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="User Avatar" 
            size="lg" 
            status="online" 
            showBorder
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
            <p className="text-xs text-gray-500">Online now</p>
          </div>
        </div>
      </div>
    </ComponentShowcase>
  );
};

// Example 5: Dropdown and Interaction Components
export const LiquidifyInteractionShowcase = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const dropdownItems = [
    { label: 'Edit Profile', value: 'edit', icon: <Settings className="w-4 h-4" /> },
    { label: 'Settings', value: 'settings', icon: <Settings className="w-4 h-4" /> },
    { label: 'Logout', value: 'logout' },
  ];

  const interactionCode = `import { GlassDropdown, GlassTooltip, GlassModal, GlassBadge } from 'liquidify';

<GlassDropdown 
  trigger={<GlassButton>Options</GlassButton>}
  items={dropdownItems}
  onSelect={(value) => console.log(value)}
/>

<GlassTooltip content="This is a helpful tooltip">
  <GlassButton>Hover me</GlassButton>
</GlassTooltip>

<GlassBadge variant="success">New</GlassBadge>`;

  return (
    <ComponentShowcase
      title="Interactive Components"
      description="Dropdown menus, tooltips, modals, and badges with smooth glass effects"
      code={interactionCode}
    >
      <div className="space-y-6 w-full max-w-md">
        <div className="flex items-center gap-4">
          <GlassDropdown 
            trigger={<GlassButton variant="secondary">Options Menu</GlassButton>}
            items={dropdownItems}
            onSelect={(value) => console.log('Selected:', value)}
          />
          
          <GlassTooltip content="This is a helpful tooltip with glass styling">
            <GlassButton variant="ghost">Hover for tooltip</GlassButton>
          </GlassTooltip>
        </div>
        
        <div className="flex items-center gap-2">
          <GlassBadge variant="default">Default</GlassBadge>
          <GlassBadge variant="success">Success</GlassBadge>
          <GlassBadge variant="warning">Warning</GlassBadge>
          <GlassBadge variant="error">Error</GlassBadge>
        </div>
        
        <GlassButton 
          variant="primary" 
          onClick={() => setModalOpen(true)}
          className="w-full"
        >
          Open Modal
        </GlassButton>
        
        <GlassLoading size="md" variant="spinner" text="Loading components..." />
      </div>
      
      <GlassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Glass Modal Example"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            This is a beautiful glass modal with blur effects and smooth animations.
          </p>
          <div className="flex justify-end space-x-2">
            <GlassButton variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" onClick={() => setModalOpen(false)}>
              Confirm
            </GlassButton>
          </div>
        </div>
      </GlassModal>
    </ComponentShowcase>
  );
};

// Example showcasing all components together
export const LiquidifyOverviewShowcase = () => {
  return (
    <div className="space-y-8">
      <LiquidifyButtonShowcase />
      <LiquidifyCardShowcase />
      <LiquidifyFormShowcase />
      <LiquidifyMiscShowcase />
      <LiquidifyInteractionShowcase />
    </div>
  );
};
