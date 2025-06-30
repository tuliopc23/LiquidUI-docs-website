#!/bin/bash

# LiquidUI Package Build Script
echo "🌊 Building LiquidUI Package..."

# Clean dist directory
echo "🧹 Cleaning dist directory..."
rm -rf dist

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the package
echo "🔨 Building components..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📋 Package contents:"
    ls -la dist/
    
    echo ""
    echo "🚀 Ready to publish! Run 'npm publish' to publish to npm"
    echo "📚 Package size:"
    du -sh dist/
else
    echo "❌ Build failed!"
    exit 1
fi 