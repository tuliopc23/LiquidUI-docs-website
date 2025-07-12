#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { AccessibilityChecker } from '../lib/accessibility-checker.js';

const checker = new AccessibilityChecker();

async function runAccessibilityAudit() {
  console.log('🔍 Running accessibility audit...');

  try {
    // Run tests with accessibility focus
    console.log('Running accessibility tests...');
    execSync('npm run test -- --testNamePattern="accessibility"', {
      stdio: 'inherit',
    });

    // Generate accessibility report
    console.log('Generating accessibility report...');
    const reports = checker.getAllReports();
    const summary = checker.generateSummary();

    const reportData = {
      timestamp: new Date().toISOString(),
      summary,
      reports: Object.fromEntries(reports),
    };

    // Ensure reports directory exists
    const reportsDir = path.join(process.cwd(), 'reports', 'accessibility');
    fs.mkdirSync(reportsDir, { recursive: true });

    // Write report
    fs.writeFileSync(
      path.join(reportsDir, 'accessibility-report.json'),
      JSON.stringify(reportData, null, 2)
    );

    console.log(`✅ Accessibility audit completed:`);
    console.log(`   - Total components tested: ${summary.total}`);
    console.log(`   - Passed: ${summary.passed}`);
    console.log(`   - Failed: ${summary.failed}`);
    console.log(`   - Average score: ${summary.averageScore}%`);
    console.log(`   - WCAG 2.1 AA compliant: ${summary.wcagCompliant}`);

    // Check if we meet minimum standards
    const minScore = 85;
    if (summary.averageScore < minScore) {
      console.error(
        `❌ Accessibility score (${summary.averageScore}%) below minimum (${minScore}%)`
      );
      process.exit(1);
    }

    return reportData;
  } catch (error) {
    console.error('❌ Accessibility audit failed:', error.message);
    process.exit(1);
  }
}

async function buildWithAccessibility() {
  console.log('🚀 Building with accessibility checks...');

  try {
    // Run accessibility audit first
    await runAccessibilityAudit();

    // Run normal build
    console.log('📦 Building application...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('✅ Build completed with accessibility checks!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    // Continue with normal build even if accessibility audit fails
    console.log('📦 Continuing with normal build...');
    execSync('npm run build', { stdio: 'inherit' });
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildWithAccessibility().catch(error => {
    console.error('Build failed:', error);
    process.exit(1);
  });
}

export { buildWithAccessibility, runAccessibilityAudit };
