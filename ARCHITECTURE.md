# Architecture & Component Conventions

This document outlines the architecture and component conventions for the LiquidiUI documentation website.

## Component Structure

Components are organized into two main directories:

- `components/`: Contains reusable, high-level components used across the application.
- `pages/components/`: Contains documentation-specific components and example usage for each component.

### Core Components (`components/`)

- **ComponentShowcase**: A component for displaying live examples with code snippets.
- **Button**: A reusable button component with consistent styling and animations.
- **Card**: A versatile card component with glassmorphism effects.
- **PlaceholderComponents**: Placeholder components for upcoming `glass-ui` features.

### Documentation Components (`pages/components/`)

- **ExampleComponents.tsx**: A central file containing all example components used in the documentation.
- **MDX Files**: Each component has its own `.mdx` file for detailed documentation, props, and usage guidelines.

## Styling

- **Tailwind CSS**: We use Tailwind CSS for all styling, with a custom theme defined in `tailwind.config.js`.
- **`clsx` & `glass-ui-tulio`**: Class names are combined using `clsx` (via `cn` from `glass-ui-tulio`) for better readability and conditional styling.
- **Utility Functions**: Common Tailwind class combinations are extracted into utility functions in `components/utils/classNames.ts` to ensure consistency and reduce duplication.

## Component Conventions

- **Functional Components**: All components should be functional components using React Hooks.
- **File-Scoped Components**: Components should be defined in their own files, with one component per file.
- **TSDoc Comments**: All public props for components should be documented using TSDoc comments.
- **Props Interface**: Each component should have a clear `Props` interface defining its public API.
- **Reusability**: Components should be designed for reusability, with a focus on composition.

## Future Improvements

- **Unit Tests**: Add unit tests for all components using a testing framework like Jest or Vitest.
- **Storybook**: Implement Storybook for isolated component development and testing.
- **Performance Optimization**: Continue to monitor and optimize component performance, especially for complex components with physics-based animations.

