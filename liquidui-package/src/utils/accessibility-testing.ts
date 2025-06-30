/**
 * Accessibility testing utilities for LiquidUI components
 */

export interface AccessibilityIssue {
    type: 'error' | 'warning' | 'notice';
    message: string;
    element?: string;
    suggestion?: string;
}

export interface AccessibilityCheckResult {
    issues: AccessibilityIssue[];
    score: number;
    total: number;
}

export const checkColorContrast = (
    foreground: string,
    background: string,
    level: 'AA' | 'AAA' = 'AA'
): boolean => {
    // Simplified contrast ratio calculation
    const getLuminance = (color: string): number => {
        // Basic luminance calculation for demo
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16) / 255;
        const g = parseInt(hex.substr(2, 2), 16) / 255;
        const b = parseInt(hex.substr(4, 2), 16) / 255;

        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return level === 'AAA' ? ratio >= 7 : ratio >= 4.5;
};

export const checkAriaLabels = (element: HTMLElement): AccessibilityIssue[] => {
    const issues: AccessibilityIssue[] = [];

    // Check for missing aria-label on interactive elements
    if (element.matches('button, input, select, textarea') &&
        !element.getAttribute('aria-label') &&
        !element.getAttribute('aria-labelledby') &&
        !element.textContent?.trim()) {
        issues.push({
            type: 'error',
            message: 'Interactive element missing accessible label',
            element: element.tagName.toLowerCase(),
            suggestion: 'Add aria-label or ensure visible text content'
        });
    }

    return issues;
};

export const checkKeyboardNavigation = (element: HTMLElement): AccessibilityIssue[] => {
    const issues: AccessibilityIssue[] = [];

    // Check for missing tabIndex on interactive elements
    if (element.matches('div[role="button"], div[onclick]') &&
        element.tabIndex === -1) {
        issues.push({
            type: 'warning',
            message: 'Interactive element not keyboard accessible',
            element: element.tagName.toLowerCase(),
            suggestion: 'Add tabIndex="0" or use semantic button element'
        });
    }

    return issues;
};

export const runAccessibilityCheck = (element: HTMLElement): AccessibilityCheckResult => {
    const issues: AccessibilityIssue[] = [];
    let total = 0;

    // Check current element and all children
    const allElements = [element, ...Array.from(element.querySelectorAll('*'))];

    allElements.forEach(el => {
        total++;
        issues.push(...checkAriaLabels(el as HTMLElement));
        issues.push(...checkKeyboardNavigation(el as HTMLElement));
    });

    const score = Math.max(0, 100 - (issues.length / total) * 100);

    return {
        issues,
        score: Math.round(score),
        total
    };
}; 