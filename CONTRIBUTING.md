# Contributing to LiquidUI Documentation

Thank you for your interest in contributing to the LiquidUI documentation! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork the repository**
   ```bash
   git clone https://github.com/tuliopc23/LiquidUI-docs-website.git
   cd LiquidUI-docs-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Make your changes and test locally**

## 📝 What Can You Contribute?

### Documentation Improvements
- Fix typos, grammar, or unclear explanations
- Add missing examples or use cases
- Improve component documentation
- Enhance code snippets and examples
- Add troubleshooting guides

### Component Examples
- Create real-world usage examples
- Add interactive demos
- Improve existing examples with better patterns
- Add accessibility examples

### Technical Improvements
- Fix broken links
- Improve SEO and metadata
- Enhance site performance
- Fix responsive design issues

## 🛠️ Development Guidelines

### File Structure
```
├── pages/                  # Documentation pages (MDX)
├── public/                 # Static assets
├── components/             # React components for the site
├── styles/                 # Global styles
└── liquidui-package/       # Component library source
```

### Writing Documentation

#### MDX Guidelines
- Use consistent heading hierarchy (h1 → h2 → h3)
- Include code examples for all concepts
- Add TypeScript types when relevant
- Use proper syntax highlighting
- Include accessibility considerations

#### Component Documentation Structure
```markdown
# Component Name

Brief description of the component and its purpose.

## Installation

## Basic Usage

## Props

## Examples

## Accessibility

## Best Practices

## Related Components
```

#### Code Style
- Use TypeScript for all examples
- Follow the existing code formatting
- Include proper imports
- Add comments for complex examples
- Use meaningful variable names

### Testing Your Changes

Before submitting a pull request:

1. **Run the development server**
   ```bash
   npm run dev
   ```

2. **Check for build errors**
   ```bash
   npm run build
   ```

3. **Run linting**
   ```bash
   npm run lint
   ```

4. **Test accessibility**
   ```bash
   npm run a11y-test
   ```

5. **Verify links work**
   - Test all internal links
   - Verify external links are valid
   - Check component examples render correctly

## 📋 Pull Request Process

### Before Submitting

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Keep changes focused and atomic
   - Write clear commit messages
   - Test your changes thoroughly

3. **Update documentation**
   - Update relevant documentation
   - Add examples if applicable
   - Update the changelog if needed

### Pull Request Guidelines

1. **Clear Title and Description**
   - Use descriptive titles
   - Explain what changes were made and why
   - Link to any relevant issues

2. **PR Template**
   ```markdown
   ## Description
   Brief description of the changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement
   - [ ] Other (please describe):

   ## Testing
   - [ ] Local testing completed
   - [ ] Build passes
   - [ ] Accessibility tested
   - [ ] Links verified

   ## Screenshots (if applicable)

   ## Additional Notes
   ```

3. **Review Process**
   - Respond to feedback promptly
   - Make requested changes
   - Keep the PR up to date with main branch

## 🎨 Design Guidelines

### Visual Consistency
- Follow the existing design system
- Use consistent spacing and typography
- Maintain the glassmorphism aesthetic
- Ensure responsive design

### Component Examples
- Show both simple and complex use cases
- Include interactive examples when possible
- Demonstrate different states (loading, error, etc.)
- Add accessibility features

### Screenshots and Media
- Use high-quality, consistent screenshots
- Show examples in both light and dark themes
- Include mobile responsive views
- Compress images for web optimization

## 🐛 Reporting Issues

### Bug Reports
When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

### Feature Requests
For new features:
- Describe the feature and its use case
- Explain why it would be valuable
- Provide examples or mockups if possible
- Consider implementation complexity

### Documentation Issues
For documentation problems:
- Specify which page/section
- Describe what's unclear or incorrect
- Suggest improvements
- Provide better examples if possible

## 📊 Content Guidelines

### Writing Style
- Use clear, concise language
- Write for developers of all skill levels
- Include practical examples
- Explain the "why" not just the "how"
- Use active voice when possible

### Code Examples
- Start with simple examples
- Progress to more complex use cases
- Include error handling
- Show best practices
- Add TypeScript types

### Accessibility
- Include accessibility considerations for all components
- Provide ARIA examples
- Explain keyboard navigation
- Consider screen reader users
- Follow WCAG 2.1 guidelines

## 🏆 Recognition

Contributors will be recognized in:
- The repository contributors section
- Release notes (for significant contributions)
- Documentation credits

## ❓ Getting Help

- **GitHub Issues**: [Report bugs or get help](https://github.com/tuliocunha23/liquidui/issues)
- **Issues**: [GitHub Issues](https://github.com/tuliopc23/LiquidUI-docs-website/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tuliopc23/LiquidUI-docs-website/discussions)

## 📜 Code of Conduct

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## 🙏 Thank You!

Your contributions help make LiquidUI better for everyone. Whether you're fixing a typo or adding a major feature, every contribution is valuable and appreciated!