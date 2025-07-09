# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js documentation site built with Nextra for the Liquidify component library. Liquidify is a React UI component library featuring glassmorphism design and physics-based interactions.

## Development Commands

### Essential Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run type-check` - TypeScript type checking
- `npm run lint` - ESLint code linting

### Testing Commands

- `npm run test` - Run unit tests (Jest)
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:e2e` - Run end-to-end tests (Playwright)
- `npm run test:all` - Run all tests (unit + E2E + type-check + lint)

### Quality Assurance

- `npm run lighthouse` - Run Lighthouse CI performance tests
- `npm run a11y-test` - Run accessibility tests with Pa11y
- `npm run build:analyze` - Analyze bundle size

## Architecture

### Core Structure

- **Nextra Framework**: Documentation is built using MDX files in `/pages/` directory
- **Component Documentation**: Each component has its own MDX file in `/pages/components/`
- **Live Examples**: Interactive component demonstrations using the Liquidify library
- **Theme Configuration**: Custom Nextra theme in `theme.config.tsx`

### Key Directories

- `/components/` - React components specific to the documentation site
- `/pages/` - Nextra MDX documentation pages with automatic routing
- `/pages/components/` - Individual component documentation pages
- `/styles/` - Global CSS and Tailwind configuration
- `/liquidui-package/` - The actual Liquidify component library source
- `/__tests__/` - Jest unit tests
- `/tests/e2e/` - Playwright end-to-end tests

### Configuration Files

- `next.config.js` - Next.js configuration with Nextra, Sentry, and performance optimizations
- `theme.config.tsx` - Nextra theme customization with branding and navigation
- `tailwind.config.js` - Tailwind CSS configuration for glassmorphism effects
- `jest.config.js` - Jest configuration with 70% coverage threshold
- `playwright.config.ts` - E2E testing across Chrome, Firefox, and Safari
- `lighthouserc.js` - Performance testing with 90%+ thresholds

## Development Patterns

### Documentation Pages

- Use MDX format for component documentation
- Include live component examples with code snippets
- Follow the established pattern in `/pages/components/` for consistency
- Include prop tables, usage examples, and accessibility notes

### Component Development

- Components in `/components/` are for the documentation site itself
- Actual UI components are in `/liquidui-package/`
- Follow TypeScript strict mode requirements
- Use Tailwind CSS for styling with glassmorphism utilities

### Testing Requirements

- Unit tests must maintain 70% coverage threshold
- E2E tests should cover critical user journeys
- All tests must pass before deployment
- Use `npm run test:all` to verify everything before committing

## Performance & Quality Standards

### Performance Expectations

- Lighthouse scores must be 90%+ across all metrics
- Bundle analysis is available via `npm run build:analyze`
- Images are optimized through Next.js Image component

### Accessibility

- Pa11y accessibility tests must pass
- Documentation examples should demonstrate accessible patterns
- Dark mode support is implemented via next-themes

### Error Monitoring

- Sentry integration for production error tracking
- Build failures are tracked and reported
- Performance regressions are monitored via Lighthouse CI

## Deployment

- Vercel deployment with automatic builds on push
- Environment-specific configurations in `vercel.json`
- Build optimization includes bundle analysis and tree shaking
- Both development and production builds are tested in CI/CD
