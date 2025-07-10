import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
import { ReactElement } from 'react';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

export interface AccessibilityScore {
  score: number;
  level: 'A' | 'AA' | 'AAA';
  violations: unknown[];
  passes: number;
  inapplicable: number;
  incomplete: number;
  timestamp: string;
}

export interface AccessibilityReport {
  componentName: string;
  version: string;
  score: AccessibilityScore;
  recommendations: string[];
  wcagGuidelines: string[];
  testResults: unknown;
}

export class AccessibilityChecker {
  private config: unknown;
  private reports: Map<string, AccessibilityReport> = new Map();

  constructor(config?: unknown) {
    this.config = {
      rules: {
        // Valid axe-core rules for WCAG 2.1 AA
        'color-contrast': { enabled: true },
        keyboard: { enabled: true },
        'focus-trap': { enabled: true },
        'aria-labels': { enabled: true },
        'heading-order': { enabled: true },
        'landmark-one-main': { enabled: true },
        'image-alt': { enabled: true },
        label: { enabled: true },
        'link-name': { enabled: true },
        'page-has-heading-one': { enabled: true },
        ...(config as { rules?: Record<string, unknown> })?.rules,
      },
      level: 'AA',
      ...(config as Record<string, unknown>),
    };
  }

  /**
   * Run accessibility check on a React component
   */
  async checkComponent(
    component: ReactElement<unknown>,
    componentName: string,
    options?: { skipRules?: string[]; level?: 'A' | 'AA' | 'AAA' }
  ): Promise<AccessibilityReport> {
    const { container } = render(component);

    const axeConfig = {
      tags: ['wcag2a', 'wcag2aa'],
      ...(options?.skipRules && {
        rules: Object.fromEntries(
          options.skipRules.map(rule => [rule, { enabled: false }])
        ),
      }),
    };

    const results = await axe(container, axeConfig);

    const score = this.calculateScore(results);
    const recommendations = this.generateRecommendations(results);
    const wcagGuidelines = this.getWCAGGuidelines(results);

    const report: AccessibilityReport = {
      componentName,
      version: '1.0.0', // Could be dynamic
      score,
      recommendations,
      wcagGuidelines,
      testResults: results,
    };

    this.reports.set(componentName, report);
    return report;
  }

  /**
   * Calculate accessibility score based on test results
   */
  private calculateScore(results: unknown): AccessibilityScore {
    const testResults = results as {
      passes: { length: number }[];
      violations: { length: number }[];
      incomplete: { length: number }[];
      inapplicable: { length: number }[];
    };

    const totalChecks =
      testResults.passes.length +
      testResults.violations.length +
      testResults.incomplete.length;
    const passedChecks = testResults.passes.length;
    const score =
      totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 100;

    let level: 'A' | 'AA' | 'AAA' = 'A';
    if (score >= 95 && testResults.violations.length === 0) {
      level = 'AAA';
    } else if (
      score >= 85 &&
      this.hasOnlyMinorViolations(testResults.violations)
    ) {
      level = 'AA';
    }

    return {
      score,
      level,
      violations: testResults.violations,
      passes: testResults.passes.length,
      inapplicable: testResults.inapplicable.length,
      incomplete: testResults.incomplete.length,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Generate accessibility recommendations
   */
  private generateRecommendations(results: unknown): string[] {
    const recommendations: string[] = [];
    const testResults = results as { violations: { id: string }[] };

    testResults.violations.forEach((violation: unknown) => {
      const typedViolation = violation as { id: string; description: string };
      switch (typedViolation.id) {
        case 'color-contrast':
          recommendations.push(
            'Ensure sufficient color contrast (4.5:1 for normal text, 3:1 for large text)'
          );
          break;
        case 'keyboard':
          recommendations.push(
            'Ensure all interactive elements are keyboard accessible'
          );
          break;
        case 'focus-trap':
          recommendations.push(
            'Implement proper focus management for modal dialogs'
          );
          break;
        case 'aria-labels':
          recommendations.push(
            'Add appropriate ARIA labels for screen readers'
          );
          break;
        case 'heading-order':
          recommendations.push('Maintain proper heading hierarchy (h1-h6)');
          break;
        case 'alt-text':
          recommendations.push('Add meaningful alternative text for images');
          break;
        case 'form-labels':
          recommendations.push('Associate form inputs with descriptive labels');
          break;
        default:
          recommendations.push(
            `Address ${typedViolation.id}: ${typedViolation.description}`
          );
      }
    });

    return [...new Set(recommendations)];
  }

  /**
   * Get relevant WCAG guidelines
   */
  private getWCAGGuidelines(results: unknown): string[] {
    const guidelines: string[] = [];
    const testResults = results as { violations: { tags?: string[] }[] };

    testResults.violations.forEach((violation: unknown) => {
      const typedViolation = violation as { tags?: string[] };
      if (typedViolation.tags) {
        typedViolation.tags.forEach((tag: string) => {
          if (tag.startsWith('wcag')) {
            guidelines.push(tag);
          }
        });
      }
    });

    return [...new Set(guidelines)];
  }

  /**
   * Check if violations are only minor
   */
  private hasOnlyMinorViolations(violations: unknown[]): boolean {
    const majorViolations = [
      'color-contrast',
      'keyboard',
      'focus-trap',
      'aria-labels',
    ];
    return violations.every(
      v => !majorViolations.includes((v as { id: string }).id)
    );
  }

  /**
   * Get accessibility report for a component
   */
  getReport(componentName: string): AccessibilityReport | undefined {
    return this.reports.get(componentName);
  }

  /**
   * Get all accessibility reports
   */
  getAllReports(): Map<string, AccessibilityReport> {
    return this.reports;
  }

  /**
   * Export reports to JSON
   */
  exportReports(): string {
    const reportsArray = Array.from(this.reports.entries()).map(
      ([name, report]) => ({
        name,
        ...report,
      })
    );

    return JSON.stringify(reportsArray, null, 2);
  }

  /**
   * Generate accessibility badge
   */
  generateBadge(componentName: string): string {
    const report = this.reports.get(componentName);
    if (!report) {
      return '';
    }

    const { score, level } = report.score;
    const color =
      level === 'AAA' ? 'brightgreen' : level === 'AA' ? 'green' : 'orange';

    return `https://img.shields.io/badge/A11y-${score}%25%20${level}-${color}`;
  }

  /**
   * Check if component meets WCAG 2.1 AA standards
   */
  meetsWCAG21AA(componentName: string): boolean {
    const report = this.reports.get(componentName);
    if (!report) {
      return false;
    }

    return report.score.level === 'AA' || report.score.level === 'AAA';
  }

  /**
   * Run accessibility audit for all components
   */
  async auditAllComponents(
    components: Array<{ name: string; component: ReactElement<unknown> }>
  ): Promise<void> {
    for (const { name, component } of components) {
      try {
        await this.checkComponent(component, name);
        console.log(`✅ ${name}: Accessibility check completed`);
      } catch (error) {
        console.error(`❌ ${name}: Accessibility check failed`, error);
      }
    }
  }

  /**
   * Generate summary report
   */
  generateSummary(): {
    total: number;
    passed: number;
    failed: number;
    averageScore: number;
    wcagCompliant: number;
  } {
    const reports = Array.from(this.reports.values());
    const total = reports.length;
    const passed = reports.filter(r => r.score.violations.length === 0).length;
    const failed = total - passed;
    const averageScore =
      reports.reduce((acc, r) => acc + r.score.score, 0) / total;
    const wcagCompliant = reports.filter(r =>
      this.meetsWCAG21AA(r.componentName)
    ).length;

    return {
      total,
      passed,
      failed,
      averageScore: Math.round(averageScore),
      wcagCompliant,
    };
  }
}

// Export singleton instance
export const accessibilityChecker = new AccessibilityChecker();
