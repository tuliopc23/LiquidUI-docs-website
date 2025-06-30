# LiquidUI 🌊

[![npm version](https://badge.fury.io/js/@tuliocunha23%2Fliquidui.svg)](https://badge.fury.io/js/@tuliocunha23%2Fliquidui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Modern React component library with glassmorphism effects and liquid animations. Built with TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎨 **Beautiful Glassmorphism Design** - Stunning glass effects with backdrop blur
- 🌊 **Liquid Animations** - Smooth, physics-based animations
- 🎯 **TypeScript First** - Full type safety out of the box
- 📱 **Responsive** - Mobile-first design approach
- ♿ **Accessible** - WCAG compliant components
- 🎭 **Themeable** - Dark/light mode support
- 🚀 **Performance Optimized** - Minimal bundle size
- 🔧 **Customizable** - Easy to extend and customize

## 📦 Installation

```bash
npm install @tuliocunha23/liquidui
```

## 🚀 Quick Start

1. **Install the package:**

```bash
npm install @tuliocunha23/liquidui
```

2. **Import styles in your CSS file:**

```css
@import '@tuliocunha23/liquidui/css';
```

3. **Use components:**

```tsx
import { GlassButton, GlassCard, ThemeProvider } from '@tuliocunha23/liquidui';

function App() {
  return (
    <ThemeProvider>
      <GlassCard>
        <h1>Welcome to LiquidUI</h1>
        <GlassButton variant="primary">
          Get Started
        </GlassButton>
      </GlassCard>
    </ThemeProvider>
  );
}
```

## 🧩 Components

### Core Components
- `GlassButton` - Glassmorphism buttons with multiple variants
- `GlassCard` - Flexible container with glass effects
- `GlassInput` - Form inputs with glass styling
- `GlassTextarea` - Multi-line text inputs
- `GlassSelect` - Dropdown selectors
- `GlassCheckbox` - Checkboxes with glass effects
- `GlassSwitch` - Toggle switches
- `GlassSlider` - Range sliders
- `GlassProgress` - Progress bars
- `GlassAvatar` - User avatars
- `GlassBadge` - Status indicators

### Layout Components
- `GlassNavbar` - Navigation bars
- `GlassSidebar` - Side navigation
- `GlassHeader` - Page headers
- `GlassFooter` - Page footers
- `GlassHero` - Hero sections
- `GlassFeatureShowcase` - Feature displays

### Feedback Components
- `GlassModal` - Modal dialogs
- `GlassToast` - Notifications
- `GlassTooltip` - Tooltips
- `GlassLoading` - Loading indicators

## 🎨 Theming

LiquidUI supports dark/light themes out of the box:

```tsx
import { ThemeProvider, useTheme } from '@tuliocunha23/liquidui';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle theme
    </button>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="my-theme">
      <ThemeToggle />
    </ThemeProvider>
  );
}
```

## 🔧 Customization

All components accept className props and can be customized with Tailwind CSS:

```tsx
<GlassButton 
  variant="primary" 
  className="bg-gradient-to-r from-purple-500 to-pink-500"
>
  Custom Button
</GlassButton>
```

## 📚 Documentation

Visit our [documentation site](https://docs-one-taupe.vercel.app) for:
- Complete API reference
- Interactive examples
- Design guidelines
- Migration guides

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Tulio Pinheiro Cunha](https://github.com/tuliopc23)

## 🙏 Acknowledgments

- Inspired by Apple's design philosophy
- Built with amazing open-source tools
- Thanks to the React and Tailwind communities

---

Made with ❤️ by [Tulio Pinheiro Cunha](https://github.com/tuliopc23) 