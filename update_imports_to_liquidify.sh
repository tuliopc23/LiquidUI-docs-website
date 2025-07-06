#!/bin/bash

# Script to update all imports from @tuliocunha23/liquidui to liquidify

OLD_PACKAGE="@tuliocunha23/liquidui"
NEW_PACKAGE="liquidify"

echo "🔄 Updating all imports from $OLD_PACKAGE to $NEW_PACKAGE..."

# Find all files with the old import and update them
FILES_TO_UPDATE=$(find . \( -name "*.tsx" -o -name "*.ts" -o -name "*.mdx" -o -name "*.md" -o -name "*.js" -o -name "*.json" \) -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./.next/*" | xargs grep -l "$OLD_PACKAGE" 2>/dev/null)

for FILE in $FILES_TO_UPDATE; do
    if [ -f "$FILE" ]; then
        echo "📝 Updating $FILE"
        sed -i "s|$OLD_PACKAGE|$NEW_PACKAGE|g" "$FILE"
    fi
done

# Update package.json
echo "📦 Updating package.json dependencies..."
npm uninstall $OLD_PACKAGE
npm install $NEW_PACKAGE

# Update GlassComponents.tsx to import from the package
echo "🔧 Updating GlassComponents.tsx..."
cat > components/GlassComponents.tsx << 'EOF'
// Re-export Liquidify components for backward compatibility
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
} from "liquidify";
EOF

echo "✅ All imports updated successfully!"
echo "🚀 You can now run 'npm run dev' to test the updated website"
echo "📝 All components now use the real Liquidify package instead of local implementations"