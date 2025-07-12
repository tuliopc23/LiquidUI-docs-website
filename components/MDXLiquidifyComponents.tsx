'use client';

import { ClientOnlyWrapper } from './ClientOnlyWrapper';
import dynamic from 'next/dynamic';

// Create client-only versions of all Liquidify components for MDX
const createClientOnlyComponent = (
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
            // Return a fallback component if the specific component doesn't exist
            return {
              default: () => (
                <ClientOnlyWrapper variant={variant}>{null}</ClientOnlyWrapper>
              ),
            };
          }
          return { default: component };
        })
        .catch(() => {
          // Return fallback on import error
          return {
            default: () => (
              <ClientOnlyWrapper variant={variant}>{null}</ClientOnlyWrapper>
            ),
          };
        }),
    {
      ssr: false,
      loading: () => (
        <ClientOnlyWrapper variant={variant}>{null}</ClientOnlyWrapper>
      ),
    }
  );
};

// Client-only Glass components for MDX - Only components that actually exist
export const GlassSlider = createClientOnlyComponent('GlassSlider', 'default');
export const GlassInput = createClientOnlyComponent('GlassInput', 'default');
export const GlassTextarea = createClientOnlyComponent(
  'GlassTextarea',
  'default'
);
export const GlassSelect = createClientOnlyComponent('GlassSelect', 'default');
export const GlassCheckbox = createClientOnlyComponent(
  'GlassCheckbox',
  'default'
);
export const GlassModal = createClientOnlyComponent('GlassModal', 'panel');
export const GlassTooltip = createClientOnlyComponent(
  'GlassTooltip',
  'default'
);
export const GlassProgress = createClientOnlyComponent(
  'GlassProgress',
  'default'
);
export const GlassTable = createClientOnlyComponent('GlassTable', 'card');
export const GlassBadge = createClientOnlyComponent('GlassBadge', 'button');
export const GlassAvatar = createClientOnlyComponent('GlassAvatar', 'default');
export const GlassPopover = createClientOnlyComponent('GlassPopover', 'panel');
export const GlassDatePicker = createClientOnlyComponent(
  'GlassDatePicker',
  'default'
);
export const GlassFileUpload = createClientOnlyComponent(
  'GlassFileUpload',
  'card'
);
export const GlassSearch = createClientOnlyComponent('GlassSearch', 'default');
export const GlassLoading = createClientOnlyComponent(
  'GlassLoading',
  'default'
);
export const GlassMobileNav = createClientOnlyComponent(
  'GlassMobileNav',
  'panel'
);
export const GlassResponsiveCard = createClientOnlyComponent(
  'GlassResponsiveCard',
  'card'
);
export const GlassResponsiveButton = createClientOnlyComponent(
  'GlassResponsiveButton',
  'button'
);

// Additional components that exist in the package
export const GlassSwitch = createClientOnlyComponent('GlassSwitch', 'button');
export const GlassSpinner = createClientOnlyComponent(
  'GlassSpinner',
  'default'
);
export const GlassSkeleton = createClientOnlyComponent(
  'GlassSkeleton',
  'default'
);
export const GlassNumberInput = createClientOnlyComponent(
  'GlassNumberInput',
  'default'
);
export const GlassCombobox = createClientOnlyComponent(
  'GlassCombobox',
  'default'
);
export const GlassAccordion = createClientOnlyComponent(
  'GlassAccordion',
  'default'
);
export const GlassAccordionItem = createClientOnlyComponent(
  'GlassAccordionItem',
  'default'
);
export const GlassAccordionTrigger = createClientOnlyComponent(
  'GlassAccordionTrigger',
  'button'
);
export const GlassAccordionContent = createClientOnlyComponent(
  'GlassAccordionContent',
  'default'
);
export const GlassDrawer = createClientOnlyComponent('GlassDrawer', 'panel');
export const GlassDrawerTrigger = createClientOnlyComponent(
  'GlassDrawerTrigger',
  'button'
);
export const GlassDrawerContent = createClientOnlyComponent(
  'GlassDrawerContent',
  'panel'
);
export const GlassDrawerHeader = createClientOnlyComponent(
  'GlassDrawerHeader',
  'default'
);
export const GlassDrawerTitle = createClientOnlyComponent(
  'GlassDrawerTitle',
  'default'
);
export const GlassDrawerDescription = createClientOnlyComponent(
  'GlassDrawerDescription',
  'default'
);
export const GlassDrawerBody = createClientOnlyComponent(
  'GlassDrawerBody',
  'default'
);
export const GlassDrawerFooter = createClientOnlyComponent(
  'GlassDrawerFooter',
  'default'
);
export const GlassDrawerClose = createClientOnlyComponent(
  'GlassDrawerClose',
  'button'
);
export const GlassPagination = createClientOnlyComponent(
  'GlassPagination',
  'default'
);
export const GlassFormField = createClientOnlyComponent(
  'GlassFormField',
  'default'
);

// Use correct names for radio components
export const GlassRadioGroup = createClientOnlyComponent(
  'GlassRadioGroup',
  'default'
);
export const GlassRadioItem = createClientOnlyComponent(
  'GlassRadioItem',
  'default'
);

// Use correct name for breadcrumbs
export const GlassBreadcrumbs = createClientOnlyComponent(
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
