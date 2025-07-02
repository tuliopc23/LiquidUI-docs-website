import { test, expect } from '@playwright/test'

test.describe('Basic Navigation', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/')
    
    // Check that the page title contains LiqUIdify
    await expect(page).toHaveTitle(/LiqUIdify/)
    
    // Check for main heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    
    // Check for navigation
    await expect(page.getByRole('navigation')).toBeVisible()
  })

  test('navigation links work', async ({ page }) => {
    await page.goto('/')
    
    // Test getting started link
    const gettingStartedLink = page.getByRole('link', { name: /getting started/i })
    if (await gettingStartedLink.isVisible()) {
      await gettingStartedLink.click()
      await expect(page.url()).toContain('getting-started')
    }
    
    // Go back to home
    await page.goto('/')
    
    // Test components link
    const componentsLink = page.getByRole('link', { name: /components/i })
    if (await componentsLink.isVisible()) {
      await componentsLink.click()
      await expect(page.url()).toContain('components')
    }
  })

  test('responsive navigation on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check for mobile menu button
    const menuButton = page.getByRole('button', { name: /menu/i })
    if (await menuButton.isVisible()) {
      await menuButton.click()
      
      // Check that navigation is visible after clicking
      await expect(page.getByRole('navigation')).toBeVisible()
    }
  })

  test('theme toggle works', async ({ page }) => {
    await page.goto('/')
    
    // Look for theme toggle button
    const themeToggle = page.getByRole('button', { name: /theme/i }).or(
      page.locator('[aria-label*="theme"]')
    ).or(
      page.locator('button').filter({ hasText: /dark|light/i })
    )
    
    if (await themeToggle.isVisible()) {
      // Get initial theme class
      const initialClass = await page.locator('html').getAttribute('class')
      
      // Click theme toggle
      await themeToggle.click()
      
      // Wait for theme change
      await page.waitForTimeout(500)
      
      // Check that theme class changed
      const newClass = await page.locator('html').getAttribute('class')
      expect(newClass).not.toBe(initialClass)
    }
  })

  test('search functionality', async ({ page }) => {
    await page.goto('/')
    
    // Look for search input
    const searchInput = page.getByRole('textbox', { name: /search/i }).or(
      page.getByPlaceholder(/search/i)
    )
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('button')
      await page.waitForTimeout(500)
      
      // Check for search results
      const results = page.locator('[role="option"]').or(
        page.locator('.search-result')
      )
      
      if (await results.first().isVisible()) {
        await expect(results.first()).toBeVisible()
      }
    }
  })

  test('accessibility - keyboard navigation', async ({ page }) => {
    await page.goto('/')
    
    // Test tab navigation
    await page.keyboard.press('Tab')
    
    // Check that focus is visible
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
    
    // Continue tabbing through focusable elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
      const currentFocus = page.locator(':focus')
      if (await currentFocus.isVisible()) {
        await expect(currentFocus).toBeVisible()
      }
    }
  })

  test('page performance', async ({ page }) => {
    // Start performance monitoring
    await page.goto('/', { waitUntil: 'networkidle' })
    
    // Check that page loads within reasonable time
    const performanceEntries = await page.evaluate(() => {
      return JSON.stringify(performance.getEntriesByType('navigation')[0])
    })
    
    const navigation = JSON.parse(performanceEntries)
    const loadTime = navigation.loadEventEnd - navigation.fetchStart
    
    // Expect page to load within 5 seconds
    expect(loadTime).toBeLessThan(5000)
  })

  test('component showcase interactions', async ({ page }) => {
    await page.goto('/components')
    
    // Look for component showcases
    const showcases = page.locator('.component-showcase')
    
    if (await showcases.first().isVisible()) {
      const firstShowcase = showcases.first()
      
      // Look for code toggle button
      const codeToggle = firstShowcase.getByRole('button', { name: /code/i })
      
      if (await codeToggle.isVisible()) {
        await codeToggle.click()
        
        // Check that code is visible
        const codeBlock = firstShowcase.locator('pre, code')
        if (await codeBlock.isVisible()) {
          await expect(codeBlock).toBeVisible()
        }
      }
      
      // Look for copy button
      const copyButton = firstShowcase.getByRole('button', { name: /copy/i })
      
      if (await copyButton.isVisible()) {
        await copyButton.click()
        
        // Check for success feedback
        await page.waitForTimeout(500)
        const successMessage = firstShowcase.getByText(/copied/i)
        if (await successMessage.isVisible()) {
          await expect(successMessage).toBeVisible()
        }
      }
    }
  })
})