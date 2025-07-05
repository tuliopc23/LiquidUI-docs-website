import { test, expect } from '@playwright/test'

test.describe('Manual Visual Verification', () => {
  test('Typography weight and radius tokens verification', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Check hero title weight
    const heroTitle = page.locator('.liquid-title span').first()
    await expect(heroTitle).toBeVisible()
    
    const heroStyles = await heroTitle.evaluate(el => {
      const style = window.getComputedStyle(el)
      return {
        fontWeight: style.fontWeight,
        className: el.className
      }
    })
    
    console.log('Hero title font weight:', heroStyles.fontWeight, 'Classes:', heroStyles.className)
    
    // Check for font-black class which should be weight 900
    expect(heroStyles.className).toContain('font-black')
    
    // Check radius consistency on glass elements
    const glassElement = page.locator('.glass-card, .rounded-ds').first()
    if (await glassElement.isVisible()) {
      const radius = await glassElement.evaluate(el => {
        return window.getComputedStyle(el).borderRadius
      })
      console.log('Glass element border radius:', radius)
      // Should be 24px (1.5rem) from rounded-ds
      expect(radius).toContain('24px')
    }
    
    // Check animations are working
    const animatedElement = page.locator('.enhanced-float').first()
    if (await animatedElement.isVisible()) {
      const animation = await animatedElement.evaluate(el => {
        return window.getComputedStyle(el).animation
      })
      console.log('Animation property:', animation)
      // Should have animation if reduced motion is not preferred
      expect(animation).not.toBe('none')
    }
  })
  
  test('Reduced motion accessibility test', async ({ page }) => {
    // Enable reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Check that animations are disabled
    const animatedElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('.motion-element, .enhanced-float, [data-framer-motion-element]')
      const styles = []
      
      for (const el of elements) {
        const style = window.getComputedStyle(el)
        if (style.animation !== 'none' && !style.animation.includes('0.01ms')) {
          styles.push({
            element: el.className,
            animation: style.animation,
            transition: style.transition
          })
        }
      }
      
      return styles
    })
    
    console.log('Elements still animated with reduced motion:', animatedElements)
    
    // With reduced motion, we should have fewer or no long animations
    expect(animatedElements.length).toBeLessThanOrEqual(3)
  })
})
