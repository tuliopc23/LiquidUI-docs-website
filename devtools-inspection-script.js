// LiqUIdify DevTools Inspection Script
// Copy and paste this into the browser console at http://localhost:3002

console.log('🔍 LiqUIdify Baseline Inspection Script');
console.log('=======================================');

// 1. Font Weight and Family Inspection
function inspectHeroFonts() {
  console.log('\n1. 📝 Hero Title Font Inspection:');

  const heroTitle = document.querySelector('h1');
  if (heroTitle) {
    const computedStyle = getComputedStyle(heroTitle);
    console.log('✅ Hero Title Found');
    console.log('   Font Family:', computedStyle.fontFamily);
    console.log('   Font Weight:', computedStyle.fontWeight);
    console.log('   Font Size:', computedStyle.fontSize);
    console.log('   Letter Spacing:', computedStyle.letterSpacing);
    console.log('   Line Height:', computedStyle.lineHeight);
  } else {
    console.log('❌ Hero title h1 not found');
  }
}

// 2. Loaded Fonts Check
function inspectLoadedFonts() {
  console.log('\n2. 🔤 Loaded Fonts:');

  // Check if fonts are loaded
  if (document.fonts) {
    const loadedFonts = Array.from(document.fonts.values());
    console.log(`✅ Found ${loadedFonts.length} loaded fonts:`);

    const fontFamilies = new Set();
    loadedFonts.forEach(font => {
      if (font.status === 'loaded') {
        fontFamilies.add(font.family);
        console.log(`   ✅ ${font.family} (${font.weight} ${font.style})`);
      }
    });

    // Check for expected fonts
    const expectedFonts = ['Inter', 'JetBrains Mono'];
    expectedFonts.forEach(fontFamily => {
      const hasFont = Array.from(fontFamilies).some(f => f.includes(fontFamily));
      console.log(`   ${hasFont ? '✅' : '❌'} ${fontFamily}: ${hasFont ? 'Loaded' : 'Missing'}`);
    });
  } else {
    console.log('❌ document.fonts API not available');
  }
}

// 3. Border Radius Inspection
function inspectBorderRadius() {
  console.log('\n3. 📐 Border Radius Inspection:');

  // Check cards in "What's New" section
  const whatsNewCards = document.querySelectorAll('.flex.flex-col.bg-white.rounded-2xl');
  console.log(`✅ Found ${whatsNewCards.length} "What's New" cards:`);

  whatsNewCards.forEach((card, index) => {
    const computedStyle = getComputedStyle(card);
    console.log(`   Card ${index + 1}: border-radius: ${computedStyle.borderRadius}`);
  });

  // Check Component Showcase containers
  const showcaseContainers = document.querySelectorAll('.component-showcase');
  console.log(`✅ Found ${showcaseContainers.length} Component Showcase containers:`);

  showcaseContainers.forEach((container, index) => {
    const computedStyle = getComputedStyle(container);
    console.log(`   Showcase ${index + 1}: border-radius: ${computedStyle.borderRadius}`);
  });

  // Check glass components
  const glassCards = document.querySelectorAll('.glass-card');
  const glassButtons = document.querySelectorAll('.glass-button');
  const liquidGlass = document.querySelectorAll('.liquid-glass');

  console.log(`✅ Glass Components:`);
  console.log(`   Glass Cards: ${glassCards.length} found`);
  console.log(`   Glass Buttons: ${glassButtons.length} found`);
  console.log(`   Liquid Glass: ${liquidGlass.length} found`);

  if (glassCards.length > 0) {
    const style = getComputedStyle(glassCards[0]);
    console.log(`   Glass Card border-radius: ${style.borderRadius}`);
  }
}

// 4. Animation and Performance Inspection
function inspectAnimations() {
  console.log('\n4. 🎬 Animation Inspection:');

  // Check for Framer Motion elements
  const framerElements = document.querySelectorAll('[data-framer-motion-element]');
  console.log(`✅ Found ${framerElements.length} Framer Motion elements`);

  // Check for performance optimization CSS variables
  const rootStyle = getComputedStyle(document.documentElement);
  const animationDuration = rootStyle.getPropertyValue('--animation-duration');
  const animationComplexity = rootStyle.getPropertyValue('--animation-complexity');
  const disableAnimations = rootStyle.getPropertyValue('--disable-complex-animations');
  const mobileBlurReduction = rootStyle.getPropertyValue('--mobile-blur-reduction');

  console.log('   CSS Variables:');
  console.log(`   --animation-duration: ${animationDuration || 'not set'}`);
  console.log(`   --animation-complexity: ${animationComplexity || 'not set'}`);
  console.log(`   --disable-complex-animations: ${disableAnimations || 'not set'}`);
  console.log(`   --mobile-blur-reduction: ${mobileBlurReduction || 'not set'}`);

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  console.log(`   Prefers Reduced Motion: ${prefersReducedMotion ? 'YES' : 'NO'}`);

  // Check for motion elements with GPU acceleration
  const motionElements = document.querySelectorAll('.motion-element');
  console.log(`   Motion elements with GPU acceleration: ${motionElements.length}`);
}

// 5. Performance Metrics
function inspectPerformance() {
  console.log('\n5. ⚡ Performance Metrics:');

  // Memory usage (if available)
  if (performance.memory) {
    const memory = performance.memory;
    console.log(`   JS Heap Size: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB used`);
    console.log(`   JS Heap Limit: ${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB limit`);
  }

  // Check for will-change properties
  const elementsWithWillChange = Array.from(document.querySelectorAll('*')).filter(el => {
    const style = getComputedStyle(el);
    return style.willChange && style.willChange !== 'auto';
  });

  console.log(`   Elements with will-change: ${elementsWithWillChange.length}`);

  // List some examples
  elementsWithWillChange.slice(0, 5).forEach((el, index) => {
    const style = getComputedStyle(el);
    console.log(`     ${index + 1}. ${el.className.split(' ')[0]}: ${style.willChange}`);
  });
}

// 6. Mobile Detection and Optimization
function inspectMobileOptimizations() {
  console.log('\n6. 📱 Mobile Optimizations:');

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  console.log(`   Is Mobile Viewport: ${isMobile ? 'YES' : 'NO'}`);

  // Check for mobile-specific blur reductions
  if (isMobile) {
    const glassElements = document.querySelectorAll('.liquid-glass, .glass-card, .glass-button');
    console.log(`   Glass elements for mobile blur check: ${glassElements.length}`);

    if (glassElements.length > 0) {
      const style = getComputedStyle(glassElements[0]);
      console.log(`   Sample backdrop-filter: ${style.backdropFilter}`);
    }
  }

  // Check device capabilities
  const deviceMemory = navigator.deviceMemory;
  const connection = navigator.connection;

  console.log(`   Device Memory: ${deviceMemory ? deviceMemory + 'GB' : 'Unknown'}`);
  if (connection) {
    console.log(`   Connection Type: ${connection.effectiveType || 'Unknown'}`);
  }
}

// Run all inspections
function runFullInspection() {
  inspectHeroFonts();
  inspectLoadedFonts();
  inspectBorderRadius();
  inspectAnimations();
  inspectPerformance();
  inspectMobileOptimizations();

  console.log('\n🎯 Baseline Inspection Complete!');
  console.log('Save these results and compare after implementing fixes.');
}

// Auto-run or provide manual controls
console.log('\nAvailable functions:');
console.log('- runFullInspection() - Run all checks');
console.log('- inspectHeroFonts() - Check hero title fonts');
console.log('- inspectLoadedFonts() - Check loaded font files');
console.log('- inspectBorderRadius() - Check border-radius values');
console.log('- inspectAnimations() - Check animation setup');
console.log('- inspectPerformance() - Check performance metrics');
console.log('- inspectMobileOptimizations() - Check mobile optimizations');

// Auto-run full inspection
setTimeout(() => {
  console.log('\n🚀 Auto-running full inspection in 2 seconds...');
  setTimeout(runFullInspection, 2000);
}, 1000);
