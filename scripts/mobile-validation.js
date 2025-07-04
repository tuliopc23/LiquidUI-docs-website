#!/usr/bin/env node

/**
 * Mobile Validation Script for Step 7
 * Tests mobile legibility at <=640px, contrast ratios, and accessibility features
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class MobileValidator {
    constructor() {
        this.results = {
            mobile: {},
            contrast: {},
            accessibility: {},
            performance: {}
        };
    }

    async validateMobileLegibility(page) {
        console.log('🔍 Testing mobile legibility at <=640px...');
        
        // Set mobile viewport (640px and below)
        await page.setViewport({ width: 640, height: 1136 });
        
        // Test different mobile sizes
        const mobileViewports = [
            { width: 375, height: 667, name: 'iPhone SE' },
            { width: 414, height: 896, name: 'iPhone XR' },
            { width: 640, height: 1136, name: 'Small Tablet' }
        ];

        for (const viewport of mobileViewports) {
            await page.setViewport(viewport);
            
            console.log(`  Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
            
            // Check text sizes and readability
            const textMetrics = await page.evaluate(() => {
                const elements = [
                    ...document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
                    ...document.querySelectorAll('p, span, div[class*="text"]'),
                    ...document.querySelectorAll('[class*="hero-text"]'),
                    ...document.querySelectorAll('[class*="body-text"]')
                ];

                return elements.map(el => {
                    const styles = window.getComputedStyle(el);
                    const rect = el.getBoundingClientRect();
                    
                    return {
                        tagName: el.tagName,
                        className: el.className,
                        fontSize: parseFloat(styles.fontSize),
                        lineHeight: styles.lineHeight,
                        width: rect.width,
                        height: rect.height,
                        visible: rect.width > 0 && rect.height > 0,
                        overflow: el.scrollWidth > el.clientWidth
                    };
                }).filter(metric => metric.visible);
            });

            // Validate minimum font sizes
            const smallText = textMetrics.filter(m => m.fontSize < 14);
            const oversizedText = textMetrics.filter(m => m.fontSize > 48);
            const overflowingText = textMetrics.filter(m => m.overflow);

            this.results.mobile[viewport.name] = {
                textElements: textMetrics.length,
                smallTextCount: smallText.length,
                oversizedTextCount: oversizedText.length,
                overflowingTextCount: overflowingText.length,
                smallTextElements: smallText.map(t => ({ tagName: t.tagName, className: t.className, fontSize: t.fontSize })),
                overflowingElements: overflowingText.map(t => ({ tagName: t.tagName, className: t.className }))
            };

            // Check for clamp() usage in CSS
            const clampUsage = await page.evaluate(() => {
                const sheets = Array.from(document.styleSheets);
                let clampRules = [];
                
                sheets.forEach(sheet => {
                    try {
                        const rules = Array.from(sheet.cssRules || sheet.rules);
                        rules.forEach(rule => {
                            if (rule.style && rule.selectorText) {
                                Object.values(rule.style).forEach(prop => {
                                    const value = rule.style.getPropertyValue(prop);
                                    if (value && value.includes('clamp(')) {
                                        clampRules.push({
                                            selector: rule.selectorText,
                                            property: prop,
                                            value: value
                                        });
                                    }
                                });
                            }
                        });
                    } catch (e) {
                        // Cross-origin or other issues with stylesheet
                    }
                });
                
                return clampRules;
            });

            this.results.mobile[viewport.name].clampUsage = clampRules.length;
        }
    }

    async validateContrast(page) {
        console.log('🎨 Testing contrast ratios in light/dark themes...');
        
        const themes = ['light', 'dark'];
        
        for (const theme of themes) {
            console.log(`  Testing ${theme} theme...`);
            
            // Toggle theme
            await page.evaluate((theme) => {
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.className = theme;
            }, theme);
            
            // Wait for theme transition
            await page.waitForTimeout(500);
            
            // Check contrast ratios
            const contrastResults = await page.evaluate(() => {
                // Helper function to calculate relative luminance
                function getLuminance(r, g, b) {
                    const [rs, gs, bs] = [r, g, b].map(c => {
                        c = c / 255;
                        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
                    });
                    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
                }
                
                // Helper function to calculate contrast ratio
                function getContrastRatio(rgb1, rgb2) {
                    const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
                    const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
                    const lighter = Math.max(l1, l2);
                    const darker = Math.min(l1, l2);
                    return (lighter + 0.05) / (darker + 0.05);
                }
                
                // Helper function to parse RGB from color string
                function parseRGB(colorStr) {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = colorStr;
                    const color = ctx.fillStyle;
                    
                    let match = color.match(/^#([0-9a-f]{6})$/i);
                    if (match) {
                        const hex = match[1];
                        return {
                            r: parseInt(hex.substr(0, 2), 16),
                            g: parseInt(hex.substr(2, 2), 16),
                            b: parseInt(hex.substr(4, 2), 16)
                        };
                    }
                    
                    match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    if (match) {
                        return {
                            r: parseInt(match[1]),
                            g: parseInt(match[2]),
                            b: parseInt(match[3])
                        };
                    }
                    
                    return { r: 0, g: 0, b: 0 };
                }
                
                const textElements = [
                    ...document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button'),
                    ...document.querySelectorAll('[class*="text"], [class*="hero"], [class*="title"]')
                ];
                
                const contrastIssues = [];
                const goodContrast = [];
                
                textElements.forEach(el => {
                    const styles = window.getComputedStyle(el);
                    const rect = el.getBoundingClientRect();
                    
                    if (rect.width > 0 && rect.height > 0) {
                        const textColor = parseRGB(styles.color);
                        const bgColor = parseRGB(styles.backgroundColor);
                        
                        // If background is transparent, check parent
                        let parent = el.parentElement;
                        let actualBgColor = bgColor;
                        while (parent && (actualBgColor.r === 0 && actualBgColor.g === 0 && actualBgColor.b === 0)) {
                            const parentStyles = window.getComputedStyle(parent);
                            actualBgColor = parseRGB(parentStyles.backgroundColor);
                            parent = parent.parentElement;
                        }
                        
                        const contrastRatio = getContrastRatio(textColor, actualBgColor);
                        const fontSize = parseFloat(styles.fontSize);
                        const isLargeText = fontSize >= 18 || (fontSize >= 14 && styles.fontWeight >= 700);
                        const requiredRatio = isLargeText ? 3 : 4.5;
                        
                        const result = {
                            element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
                            textColor: styles.color,
                            backgroundColor: styles.backgroundColor,
                            contrastRatio: Math.round(contrastRatio * 100) / 100,
                            requiredRatio,
                            passes: contrastRatio >= requiredRatio,
                            fontSize,
                            isLargeText
                        };
                        
                        if (contrastRatio >= requiredRatio) {
                            goodContrast.push(result);
                        } else {
                            contrastIssues.push(result);
                        }
                    }
                });
                
                return {
                    totalElements: textElements.length,
                    contrastIssues,
                    goodContrast: goodContrast.length,
                    averageContrast: goodContrast.reduce((sum, item) => sum + item.contrastRatio, 0) / goodContrast.length
                };
            });
            
            this.results.contrast[theme] = contrastResults;
        }
    }

    async validateAccessibility(page) {
        console.log('♿ Testing accessibility features...');
        
        // Test prefers-reduced-motion
        console.log('  Testing prefers-reduced-motion...');
        await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
        
        const reducedMotionResult = await page.evaluate(() => {
            const animatedElements = document.querySelectorAll('[class*="animate"], [style*="animation"], [style*="transition"]');
            const results = [];
            
            animatedElements.forEach(el => {
                const styles = window.getComputedStyle(el);
                const hasAnimation = styles.animationName !== 'none';
                const hasTransition = styles.transitionDuration !== '0s';
                
                results.push({
                    element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
                    hasAnimation,
                    hasTransition,
                    respectsReducedMotion: !hasAnimation && !hasTransition
                });
            });
            
            return results;
        });
        
        // Test high-contrast mode
        console.log('  Testing high-contrast mode...');
        await page.emulateMediaFeatures([{ name: 'prefers-contrast', value: 'high' }]);
        
        const highContrastResult = await page.evaluate(() => {
            const elements = document.querySelectorAll('.glass-card, .glass-button, .liquid-glass');
            const results = [];
            
            elements.forEach(el => {
                const styles = window.getComputedStyle(el);
                const hasBorder = styles.borderWidth !== '0px';
                const borderColor = styles.borderColor;
                const backgroundColor = styles.backgroundColor;
                
                results.push({
                    element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
                    hasBorder,
                    borderColor,
                    backgroundColor,
                    hasBackdropFilter: styles.backdropFilter !== 'none'
                });
            });
            
            return results;
        });
        
        this.results.accessibility = {
            reducedMotion: {
                totalAnimatedElements: reducedMotionResult.length,
                respectingElements: reducedMotionResult.filter(r => r.respectsReducedMotion).length,
                violatingElements: reducedMotionResult.filter(r => !r.respectsReducedMotion)
            },
            highContrast: {
                glassElements: highContrastResult.length,
                elementsWithBorders: highContrastResult.filter(r => r.hasBorder).length,
                elementsWithBackdrop: highContrastResult.filter(r => r.hasBackdropFilter).length
            }
        };
    }

    async runLighthouseTest() {
        console.log('🚀 Running Lighthouse performance test...');
        
        try {
            const { execSync } = require('child_process');
            
            // Run Lighthouse with focus on CLS and layout shift
            const lighthouseResult = execSync(`
                lighthouse http://localhost:3001 \
                --only-categories=performance \
                --chrome-flags="--headless" \
                --output=json \
                --output-path=./lighthouse-mobile-test.json \
                --emulated-form-factor=mobile \
                --throttling-method=simulate
            `, { encoding: 'utf8', timeout: 60000 });
            
            // Read and parse results
            const results = JSON.parse(fs.readFileSync('./lighthouse-mobile-test.json', 'utf8'));
            
            const cls = results.audits['cumulative-layout-shift'];
            const lcp = results.audits['largest-contentful-paint'];
            const fid = results.audits['max-potential-fid'];
            
            this.results.performance = {
                score: results.categories.performance.score * 100,
                cls: {
                    value: cls.numericValue,
                    score: cls.score,
                    passing: cls.numericValue <= 0.1
                },
                lcp: {
                    value: lcp.numericValue,
                    score: lcp.score,
                    passing: lcp.numericValue <= 2500
                },
                fid: {
                    value: fid.numericValue,
                    score: fid.score,
                    passing: fid.numericValue <= 100
                }
            };
            
            // Clean up
            fs.unlinkSync('./lighthouse-mobile-test.json');
            
        } catch (error) {
            console.error('Lighthouse test failed:', error.message);
            this.results.performance = { error: error.message };
        }
    }

    generateReport() {
        console.log('\n📊 MOBILE VALIDATION REPORT\n');
        console.log('=' .repeat(50));
        
        // Mobile Legibility Report
        console.log('\n📱 MOBILE LEGIBILITY (<=640px)');
        console.log('-'.repeat(30));
        Object.entries(this.results.mobile).forEach(([device, metrics]) => {
            console.log(`\n${device}:`);
            console.log(`  ✓ Text elements: ${metrics.textElements}`);
            console.log(`  ${metrics.smallTextCount === 0 ? '✓' : '⚠'} Small text (< 14px): ${metrics.smallTextCount}`);
            console.log(`  ${metrics.overflowingTextCount === 0 ? '✓' : '⚠'} Overflowing text: ${metrics.overflowingTextCount}`);
            console.log(`  ✓ CSS clamp() usage: ${metrics.clampUsage} rules`);
            
            if (metrics.smallTextElements.length > 0) {
                console.log('    Small text elements:');
                metrics.smallTextElements.forEach(el => {
                    console.log(`      - ${el.tagName}.${el.className}: ${el.fontSize}px`);
                });
            }
        });
        
        // Contrast Report
        console.log('\n🎨 CONTRAST VALIDATION');
        console.log('-'.repeat(25));
        Object.entries(this.results.contrast).forEach(([theme, results]) => {
            const passRate = ((results.goodContrast / results.totalElements) * 100).toFixed(1);
            console.log(`\n${theme.toUpperCase()} Theme:`);
            console.log(`  ✓ Elements tested: ${results.totalElements}`);
            console.log(`  ${results.contrastIssues.length === 0 ? '✓' : '⚠'} Contrast issues: ${results.contrastIssues.length}`);
            console.log(`  ✓ Pass rate: ${passRate}%`);
            console.log(`  ✓ Average contrast: ${results.averageContrast?.toFixed(2) || 'N/A'}`);
            
            if (results.contrastIssues.length > 0) {
                console.log('    Issues found:');
                results.contrastIssues.slice(0, 5).forEach(issue => {
                    console.log(`      - ${issue.element}: ${issue.contrastRatio} (needs ${issue.requiredRatio})`);
                });
                if (results.contrastIssues.length > 5) {
                    console.log(`      ... and ${results.contrastIssues.length - 5} more`);
                }
            }
        });
        
        // Accessibility Report
        console.log('\n♿ ACCESSIBILITY FEATURES');
        console.log('-'.repeat(25));
        const { reducedMotion, highContrast } = this.results.accessibility;
        
        console.log('\nReduced Motion:');
        console.log(`  ✓ Animated elements: ${reducedMotion.totalAnimatedElements}`);
        console.log(`  ${reducedMotion.respectingElements === reducedMotion.totalAnimatedElements ? '✓' : '⚠'} Respecting preference: ${reducedMotion.respectingElements}/${reducedMotion.totalAnimatedElements}`);
        
        console.log('\nHigh Contrast:');
        console.log(`  ✓ Glass elements: ${highContrast.glassElements}`);
        console.log(`  ✓ Elements with borders: ${highContrast.elementsWithBorders}`);
        console.log(`  ✓ Elements with backdrop: ${highContrast.elementsWithBackdrop}`);
        
        // Performance Report
        console.log('\n🚀 PERFORMANCE METRICS');
        console.log('-'.repeat(22));
        if (this.results.performance.error) {
            console.log(`  ❌ Lighthouse test failed: ${this.results.performance.error}`);
        } else {
            const { score, cls, lcp, fid } = this.results.performance;
            console.log(`  ✓ Overall score: ${score.toFixed(1)}/100`);
            console.log(`  ${cls.passing ? '✓' : '⚠'} CLS: ${cls.value.toFixed(4)} (target: ≤0.1)`);
            console.log(`  ${lcp.passing ? '✓' : '⚠'} LCP: ${lcp.value.toFixed(0)}ms (target: ≤2500ms)`);
            console.log(`  ${fid.passing ? '✓' : '⚠'} FID: ${fid.value.toFixed(0)}ms (target: ≤100ms)`);
        }
        
        console.log('\n' + '='.repeat(50));
        console.log('📋 SUMMARY');
        console.log('='.repeat(50));
        
        const issues = [];
        const passes = [];
        
        // Collect issues and passes
        Object.values(this.results.mobile).forEach(metrics => {
            if (metrics.smallTextCount > 0) issues.push(`Small text on mobile: ${metrics.smallTextCount} elements`);
            if (metrics.overflowingTextCount > 0) issues.push(`Text overflow on mobile: ${metrics.overflowingTextCount} elements`);
            if (metrics.clampUsage > 0) passes.push(`Responsive text with clamp(): ${metrics.clampUsage} rules`);
        });
        
        Object.entries(this.results.contrast).forEach(([theme, results]) => {
            if (results.contrastIssues.length > 0) {
                issues.push(`${theme} theme contrast issues: ${results.contrastIssues.length} elements`);
            } else {
                passes.push(`${theme} theme contrast: All elements pass`);
            }
        });
        
        if (reducedMotion.respectingElements < reducedMotion.totalAnimatedElements) {
            issues.push(`Reduced motion: ${reducedMotion.totalAnimatedElements - reducedMotion.respectingElements} elements not respecting preference`);
        } else {
            passes.push('Reduced motion: All animations respect user preference');
        }
        
        if (!this.results.performance.error) {
            if (!this.results.performance.cls.passing) issues.push(`CLS too high: ${this.results.performance.cls.value.toFixed(4)}`);
            if (!this.results.performance.lcp.passing) issues.push(`LCP too slow: ${this.results.performance.lcp.value.toFixed(0)}ms`);
            if (!this.results.performance.fid.passing) issues.push(`FID too high: ${this.results.performance.fid.value.toFixed(0)}ms`);
            
            if (this.results.performance.cls.passing) passes.push('CLS within acceptable range');
            if (this.results.performance.lcp.passing) passes.push('LCP within target range');
            if (this.results.performance.fid.passing) passes.push('FID within target range');
        }
        
        console.log('\n✅ PASSING:');
        passes.forEach(pass => console.log(`  ✓ ${pass}`));
        
        if (issues.length > 0) {
            console.log('\n⚠️  NEEDS ATTENTION:');
            issues.forEach(issue => console.log(`  ⚠ ${issue}`));
        } else {
            console.log('\n🎉 All validations passed!');
        }
        
        console.log('\n' + '='.repeat(50));
        
        return {
            passed: issues.length === 0,
            issues,
            passes,
            results: this.results
        };
    }

    async run() {
        console.log('🧪 Starting Mobile Validation for Step 7...\n');
        
        const browser = await puppeteer.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        try {
            const page = await browser.newPage();
            
            // Navigate to the development server
            await page.goto('http://localhost:3001', { 
                waitUntil: 'networkidle2',
                timeout: 30000
            });
            
            // Run all validations
            await this.validateMobileLegibility(page);
            await this.validateContrast(page);
            await this.validateAccessibility(page);
            
            await browser.close();
            
            // Run Lighthouse test separately (needs server to be running)
            await this.runLighthouseTest();
            
            // Generate and return report
            return this.generateReport();
            
        } catch (error) {
            await browser.close();
            console.error('Validation failed:', error);
            throw error;
        }
    }
}

// Export for use as module or run directly
if (require.main === module) {
    const validator = new MobileValidator();
    validator.run()
        .then(report => {
            process.exit(report.passed ? 0 : 1);
        })
        .catch(error => {
            console.error('Validation error:', error);
            process.exit(1);
        });
}

module.exports = MobileValidator;
