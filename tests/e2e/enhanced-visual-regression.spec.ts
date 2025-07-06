import { test, expect } from '@playwright/test'
import AxeBuilder from 'axe-playwright'

test.describe('Enhanced Visual Regression & Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for all animations to start and fonts to load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
  })

  test('Component screenshots match baseline', async ({ page }) => {
    // Test key components
    const components = [
      { name: 'GlassButton', selector: '.glass-button' },
      { name: 'GlassCard', selector: '.glass-card' },
      { name: 'LiquidTitle', selector: '.liquid-title' },
      { name: 'GlassModal', selector: '.glass-modal' },
    ]

    for (const component of components) {
      const element = page.locator(component.selector).first()
      if (await element.isVisible()) {
        // Take screenshot and compare with baseline
        await expect(element).toHaveScreenshot(`${component.name}.png`)
      }
    }
  })

  test('Responsive design screenshots match baseline', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' }, 
      { width: 1920, height: 1080, name: 'desktop' }
    ]
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.waitForTimeout(500)
      
      // Take screenshot of key sections
      await expect(page.locator('header')).toHaveScreenshot(`header-${viewport.name}.png`)
      await expect(page.locator('main')).toHaveScreenshot(`main-${viewport.name}.png`)
      await expect(page.locator('footer')).toHaveScreenshot(`footer-${viewport.name}.png`)
    }
  })

  test('Dark mode screenshots match baseline', async ({ page }) => {
    // Switch to dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark')
    })
    await page.waitForTimeout(500)
    
    // Take screenshots of key components in dark mode
    await expect(page.locator('.glass-card').first()).toHaveScreenshot('glass-card-dark.png')
    await expect(page.locator('.glass-button').first()).toHaveScreenshot('glass-button-dark.png')
    await expect(page.locator('.liquid-title').first()).toHaveScreenshot('liquid-title-dark.png')
  })

  test('Accessibility audit passes', async ({ page }) => {
    // Run axe accessibility audit
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    
    // Expect no violations
    expect(accessibilityScanResults.violations).toEqual([])
  })
})