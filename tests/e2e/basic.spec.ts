import { test, expect } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/')
  
  await expect(page).toHaveTitle(/Liquidify/)
  await expect(page.getByText('Welcome to Liquidify')).toBeVisible()
  await expect(page.getByText('Modern React UI Components')).toBeVisible()
})

test('navigation works', async ({ page }) => {
  await page.goto('/')
  
  // Test docs navigation
  await page.getByRole('link', { name: /docs/i }).click()
  await expect(page.getByText('Documentation')).toBeVisible()
  
  // Test components navigation
  await page.getByRole('link', { name: /components/i }).click()
  await expect(page.getByText('Components')).toBeVisible()
})

test('theme switching works', async ({ page }) => {
  await page.goto('/')
  
  // Check for theme toggle (if available)
  const themeToggle = page.getByRole('button', { name: /theme/i })
  if (await themeToggle.isVisible()) {
    await themeToggle.click()
    // Verify theme changed by checking for dark class
    await expect(page.locator('html')).toHaveClass(/dark/)
  }
})