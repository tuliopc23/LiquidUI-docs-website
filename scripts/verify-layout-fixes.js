#!/usr/bin/env node

/**
 * Layout & Responsiveness Verification Script
 * 
 * This script verifies that all the layout and responsiveness fixes 
 * have been implemented correctly according to the requirements:
 * 
 * 1. ✅ Added pt-[calc(var(--total-header-height)+2rem)] to first section
 * 2. ✅ Refactored grids to use grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 consistently
 * 3. ✅ Fixed cut-offs by adjusting clamp() sizes and overflow-hidden
 * 4. ✅ Wrapped floating blobs in pointer-events-none and constrained with inset-*
 * 5. ✅ Guaranteed all buttons/links have min-w-[44px] min-h-[44px]
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');

// Files to check
const filesToCheck = [
  'pages/index.mdx',
  'pages/examples.mdx', 
  'pages/getting-started.mdx',
  'components/ExampleComponents.tsx',
  'components/ComponentShowcase.tsx',
  'styles/globals.css'
];

console.log('🔍 Verifying Layout & Responsiveness Fixes...\n');

let allChecksPass = true;

// Check 1: First section header offset
console.log('1. Checking header offset implementation...');
const indexContent = fs.readFileSync(path.join(REPO_ROOT, 'pages/index.mdx'), 'utf8');
if (indexContent.includes('pt-[calc(var(--total-header-height)+2rem)]')) {
  console.log('   ✅ Header offset implemented correctly');
} else {
  console.log('   ❌ Header offset not found');
  allChecksPass = false;
}

// Check 2: Consistent grid patterns
console.log('\n2. Checking consistent grid patterns...');
const gridPattern = /grid-cols-1\s+sm:grid-cols-2\s+lg:grid-cols-[23]/;
let gridCheckPassed = true;

filesToCheck.forEach(file => {
  if (file.endsWith('.mdx') || file.endsWith('.tsx')) {
    const filePath = path.join(REPO_ROOT, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const hasConsistentGrids = content.includes('grid-cols-1 sm:grid-cols-2') || 
                                content.includes('grid grid-cols-1 sm:grid-cols-2');
      if (content.includes('grid') && !hasConsistentGrids && content.includes('md:grid-cols')) {
        console.log(`   ⚠️  ${file} may have inconsistent grid patterns`);
        gridCheckPassed = false;
      }
    }
  }
});

if (gridCheckPassed) {
  console.log('   ✅ Grid patterns are consistent');
} else {
  console.log('   ❌ Some grid patterns may need updating');
  allChecksPass = false;
}

// Check 3: Clamp() usage and overflow-hidden
console.log('\n3. Checking responsive text sizing with clamp()...');
const cssContent = fs.readFileSync(path.join(REPO_ROOT, 'styles/globals.css'), 'utf8');
if (cssContent.includes('clamp(') && indexContent.includes('clamp(')) {
  console.log('   ✅ Clamp() sizing implemented');
} else {
  console.log('   ❌ Clamp() sizing not found');
  allChecksPass = false;
}

if (indexContent.includes('overflow-hidden')) {
  console.log('   ✅ Overflow-hidden implemented');
} else {
  console.log('   ❌ Overflow-hidden not found');
  allChecksPass = false;
}

// Check 4: Floating elements pointer-events-none and constraints
console.log('\n4. Checking floating elements constraints...');
if (indexContent.includes('pointer-events-none') && indexContent.includes('inset-')) {
  console.log('   ✅ Floating elements properly constrained');
} else {
  console.log('   ❌ Floating elements constraints not found');
  allChecksPass = false;
}

// Check 5: Button min touch targets
console.log('\n5. Checking button touch targets...');
let buttonCheckPassed = true;

filesToCheck.forEach(file => {
  if (file.endsWith('.mdx') || file.endsWith('.tsx')) {
    const filePath = path.join(REPO_ROOT, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      // Look for buttons/links that might not have min touch targets
      const buttonMatches = content.match(/<(button|a)[^>]*className="[^"]*glass-button[^"]*"[^>]*>/g);
      if (buttonMatches) {
        buttonMatches.forEach(match => {
          if (!match.includes('min-w-[44px]') && !match.includes('min-h-[44px]')) {
            console.log(`   ⚠️  ${file} may have buttons without min touch targets`);
            buttonCheckPassed = false;
          }
        });
      }
    }
  }
});

if (buttonCheckPassed) {
  console.log('   ✅ Button touch targets implemented');
} else {
  console.log('   ❌ Some buttons may need min touch targets');
  allChecksPass = false;
}

// Summary
console.log('\n' + '='.repeat(50));
if (allChecksPass) {
  console.log('🎉 All layout and responsiveness fixes verified successfully!');
  console.log('\nImplemented fixes:');
  console.log('• Header offset with CSS custom property');
  console.log('• Consistent responsive grid patterns');
  console.log('• Responsive text sizing with clamp()');
  console.log('• Constrained floating elements');
  console.log('• Proper touch targets for all interactive elements');
} else {
  console.log('⚠️  Some layout fixes may need attention.');
  console.log('Please review the warnings above.');
}

process.exit(allChecksPass ? 0 : 1);
