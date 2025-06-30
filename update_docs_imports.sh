#!/bin/bash

# Script to update the documentation website to use the new LiquidUI package

echo "🔄 Updating documentation website to use new LiquidUI package..."

# First, let's build the new package
echo "📦 Building LiquidUI package..."
cd liquidui-package
npm install
npm run build
cd ..

# Update package.json to use local package
echo "🔗 Linking local LiquidUI package..."
npm uninstall @tuliocunha23/liquidui
npm install ./liquidui-package

# Update imports in components
echo "🔧 Updating component imports..."

# Update GlassComponents.tsx to import from the package
cat > components/GlassComponents.tsx << 'EOF'
// Re-export LiquidUI components for backward compatibility
export {
  GlassButton,
  GlassCard,
  GlassInput,
  GlassTextarea,
  GlassSelect,
  GlassCheckbox,
  GlassSwitch,
  GlassSlider,
  GlassProgress,
  GlassAvatar,
  GlassBadge,
  GlassModal,
  GlassHero,
  GlassHeader,
  GlassFooter,
  GlassFeatureShowcase,
  GlassFloatingAction,
  GlassToast,
  ThemeProvider,
  useTheme,
  useToast
} from "@tuliocunha23/liquidui";
EOF

echo "✅ Documentation website updated successfully!"
echo "🚀 You can now run 'npm run dev' to test the updated website"
echo "📝 All components now use the real LiquidUI package instead of local implementations" 