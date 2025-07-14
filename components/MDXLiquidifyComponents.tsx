'use client';

import React from 'react';
import { ClientOnlyWrapper } from './ClientOnlyWrapper';
import dynamic from 'next/dynamic';

// Create static-friendly versions of Liquidify components for MDX
const createStaticComponent = (
  componentName: string,
  variant: 'card' | 'button' | 'panel' | 'default' = 'default'
) => {
  return dynamic(
    () =>
      import('liquidify')
        .then(mod => {
          const component = (
            mod as unknown as Record<string, React.ComponentType>
          )[componentName];
          if (!component) {
            return {
              default: () => (
                <ClientOnlyWrapper variant={variant}>{null}</ClientOnlyWrapper>
              ),
            };
          }
          return { default: component };
        })
        .catch(() => {
          return {
            default: () => (
              <ClientOnlyWrapper variant={variant}>{null}</ClientOnlyWrapper>
            ),
          };
        }),
    {
      ssr: false, // Disable SSR for proper static export
      loading: () => (
        <div className='animate-pulse bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20'>
          <div className='h-4 bg-white/20 rounded w-3/4' />
        </div>
      ),
    }
  );
};

// Static-friendly Glass components for MDX - Only components that actually exist
export const GlassSlider = createStaticComponent('GlassSlider', 'default');
export const GlassInput = createStaticComponent('GlassInput', 'default');
export const GlassTextarea = createStaticComponent('GlassTextarea', 'default');
export const GlassSelect = createStaticComponent('GlassSelect', 'default');
export const GlassCheckbox = createStaticComponent('GlassCheckbox', 'default');
export const GlassModal = createStaticComponent('GlassModal', 'panel');
export const GlassTooltip = createStaticComponent('GlassTooltip', 'default');
export const GlassProgress = createStaticComponent('GlassProgress', 'default');
export const GlassTable = createStaticComponent('GlassTable', 'card');
export const GlassBadge = createStaticComponent('GlassBadge', 'button');
export const GlassAvatar = createStaticComponent('GlassAvatar', 'default');
export const GlassPopover = createStaticComponent('GlassPopover', 'panel');
export const GlassDatePicker = createStaticComponent(
  'GlassDatePicker',
  'default'
);
export const GlassFileUpload = createStaticComponent('GlassFileUpload', 'card');
export const GlassSearch = createStaticComponent('GlassSearch', 'default');
export const GlassLoading = createStaticComponent('GlassLoading', 'default');
export const GlassMobileNav = createStaticComponent('GlassMobileNav', 'panel');
export const GlassResponsiveCard = createStaticComponent(
  'GlassResponsiveCard',
  'card'
);
export const GlassResponsiveButton = createStaticComponent(
  'GlassResponsiveButton',
  'button'
);

// Additional components that exist in the package
export const GlassSwitch = createStaticComponent('GlassSwitch', 'button');
export const GlassSpinner = createStaticComponent('GlassSpinner', 'default');
export const GlassSkeleton = createStaticComponent('GlassSkeleton', 'default');
export const GlassNumberInput = createStaticComponent(
  'GlassNumberInput',
  'default'
);
export const GlassCombobox = createStaticComponent('GlassCombobox', 'default');
export const GlassAccordion = createStaticComponent(
  'GlassAccordion',
  'default'
);
export const GlassAccordionItem = createStaticComponent(
  'GlassAccordionItem',
  'default'
);
export const GlassAccordionTrigger = createStaticComponent(
  'GlassAccordionTrigger',
  'button'
);
export const GlassAccordionContent = createStaticComponent(
  'GlassAccordionContent',
  'default'
);
export const GlassDrawer = createStaticComponent('GlassDrawer', 'panel');
export const GlassDrawerTrigger = createStaticComponent(
  'GlassDrawerTrigger',
  'button'
);
export const GlassDrawerContent = createStaticComponent(
  'GlassDrawerContent',
  'panel'
);
export const GlassDrawerHeader = createStaticComponent(
  'GlassDrawerHeader',
  'default'
);
export const GlassDrawerTitle = createStaticComponent(
  'GlassDrawerTitle',
  'default'
);
export const GlassDrawerDescription = createStaticComponent(
  'GlassDrawerDescription',
  'default'
);
export const GlassDrawerBody = createStaticComponent(
  'GlassDrawerBody',
  'default'
);
export const GlassDrawerFooter = createStaticComponent(
  'GlassDrawerFooter',
  'default'
);
export const GlassDrawerClose = createStaticComponent(
  'GlassDrawerClose',
  'button'
);
export const GlassPagination = createStaticComponent(
  'GlassPagination',
  'default'
);
export const GlassFormField = createStaticComponent(
  'GlassFormField',
  'default'
);

// Use correct names for radio components
export const GlassRadioGroup = createStaticComponent(
  'GlassRadioGroup',
  'default'
);
export const GlassRadioItem = createStaticComponent(
  'GlassRadioItem',
  'default'
);

// Use correct name for breadcrumbs
export const GlassBreadcrumbs = createStaticComponent(
  'GlassBreadcrumbs',
  'default'
);

// Create placeholders for components that don't exist but are referenced in docs
export const GlassRadio = GlassRadioItem; // Alias for compatibility
export const GlassBreadcrumb = GlassBreadcrumbs; // Alias for compatibility

// For components that don't exist, create high-quality placeholders
const createPlaceholderComponent = (
  name: string,
  variant: 'card' | 'button' | 'panel' | 'default' = 'default'
) => {
  return function PlaceholderComponent() {
    return (
      <ClientOnlyWrapper variant={variant}>
        <div className='text-center p-4 text-white/70'>
          <span className='text-blue-200'>✨ {name}</span> - Coming Soon
        </div>
      </ClientOnlyWrapper>
    );
  };
};

// High-quality placeholders for missing components
export const GlassNavbar = createPlaceholderComponent('GlassNavbar', 'panel');
export const GlassSidebar = createPlaceholderComponent('GlassSidebar', 'panel');
export const GlassToggleButton = createPlaceholderComponent(
  'GlassToggleButton',
  'button'
);
export const GlassIconButton = createPlaceholderComponent(
  'GlassIconButton',
  'button'
);
export const GlassButtonGroup = createPlaceholderComponent(
  'GlassButtonGroup',
  'default'
);
export const GlassCommand = createPlaceholderComponent('GlassCommand', 'panel');
