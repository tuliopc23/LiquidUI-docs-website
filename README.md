# Liquidify Documentation

Professional documentation site for **Liquidify** - A production-ready React component library with glassmorphism design and physics-based interactions.

🌐 **Live Site**: [liquidify-docs.vercel.app](https://liquidify-docs.vercel.app)

## ✨ Features

- **40+ Components** with glassmorphism design
- **Interactive Examples** with live previews
- **Comprehensive API Documentation**
- **Real-world Patterns** and use cases
- **TypeScript Support** with full type definitions
- **Accessibility Guidelines** and best practices
- **Performance Optimized** with Next.js 15 and Turbopack

## 🚀 Tech Stack

- **Framework**: Next.js 15 with Turbopack and App Router
- **Documentation**: Nextra 2.13+ with MDX
- **Styling**: Tailwind CSS 3.4+ with glassmorphism effects
- **TypeScript**: 5.0+ with strict type safety
- **Testing**: Jest + React Testing Library + Playwright
- **CI/CD**: GitHub Actions with automated testing and deployment
- **Performance**: Lighthouse CI + Bundle Analyzer + Pa11y
- **Dependencies**: Renovate + Dependabot for automated updates
- **Deployment**: Vercel with automatic previews and caching

## 📚 Documentation Sections

### Core Components
- **Forms**: Input, Textarea, Select with validation
- **Feedback**: Modal, Toast, Progress indicators
- **Navigation**: Buttons, Cards, Dropdowns
- **Layout**: Hero, Header, Footer sections

### Examples & Patterns
- **Dashboard Layouts** - Complete responsive dashboards
- **Login Forms** - Beautiful authentication flows
- **E-commerce Cards** - Product showcase patterns
- **Data Tables** - Interactive tables with sorting

## 🛠️ Development

### Prerequisites
- Node.js 18+ (recommended: Node.js 20)
- npm 9+

### Quick Start
```bash
# Clone the repository
git clone https://github.com/tuliopc23/Liquidify-docs.git
cd Liquidify-docs

# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Open http://localhost:3000 in your browser
```

### Development Commands

#### Core Development
```bash
npm run dev              # Start development server with hot reload
npm run build            # Build for production
npm run start            # Start production server
npm run clean            # Clean build cache
```

#### Code Quality & Testing
```bash
npm run lint             # ESLint code quality check (max 0 warnings)
npm run type-check       # TypeScript validation
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run test:ci          # Run tests in CI mode
npm run test:all         # Run all tests (type-check + lint + test:ci)
npm run test:e2e         # Run Playwright end-to-end tests
```

#### Performance & Quality Analysis
```bash
npm run build:analyze    # Bundle size analysis with webpack-bundle-analyzer
npm run analyze          # Alternative bundle analysis command
npm run lighthouse       # Lighthouse CI performance tests
npm run a11y-test        # Pa11y accessibility compliance testing
```

### Development Workflow

1. **Start Development**: `npm run dev`
2. **Make Changes**: Edit files in `pages/`, `components/`, or `styles/`
3. **Check Quality**: `npm run test:all`
4. **Build & Test**: `npm run build`
5. **Performance Check**: `npm run lighthouse` (optional)

### Project Structure
```
liquidify-docs/
├── components/          # Reusable React components
├── pages/              # Next.js pages and documentation
├── styles/             # Global styles and Tailwind config
├── __tests__/          # Unit tests
├── .github/            # GitHub Actions workflows
├── .lighthouseci/      # Lighthouse CI configuration
└── public/             # Static assets
```

## 📊 Performance & Quality

- **Lighthouse Score**: 90+ (Performance, Accessibility, SEO)
- **Bundle Size**: Optimized with code splitting
- **Accessibility**: WCAG 2.1 AA compliant
- **Type Safety**: 100% TypeScript coverage

## 🎯 Production Ready

This documentation site includes:

✅ **Professional landing page** with animations  
✅ **Complete component documentation** (6 core components)  
✅ **Real-world examples** and patterns  
✅ **Performance monitoring** setup  
✅ **Accessibility testing** automation  
✅ **SEO optimization** with meta tags  

## 📈 Analytics & Monitoring

- **Performance**: Lighthouse CI with automated testing
- **Accessibility**: pa11y-ci for WCAG compliance
- **Bundle Analysis**: Webpack bundle analyzer
- **Core Web Vitals**: Real user monitoring

## 🔗 Links

- **Live Documentation**: [liquidify-docs.vercel.app](https://liquidify-docs.vercel.app)
- **Documentation Repository**: [github.com/tuliopc23/Liquidify-docs](https://github.com/tuliopc23/Liquidify-docs)
- **Component Library**: [github.com/tuliopc23/Liquidify](https://github.com/tuliopc23/Liquidify)
- **NPM Package**: [`liquidify`](https://www.npmjs.com/package/liquidify)
- **Storybook**: [lib.useliquidify.dev](https://lib.useliquidify.dev/)

---

Built with ❤️ using **Liquidify** components and glassmorphism design principles.
