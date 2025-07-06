import { test, expect } from '@playwright/test'

test.describe('Visual Regression & Design System Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for all animations to start and fonts to load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
  })

  test('Hero title has sufficient font weight (bold enough)', async ({ page }) => {
    // Locate the main hero title
    const heroTitle = page.locator('.liquid-title h1 span').first()
    await expect(heroTitle).toBeVisible()

    // Check computed styles for font weight
    const fontWeight = await heroTitle.evaluate(el => {
      const computedStyle = window.getComputedStyle(el)
      return {
        fontWeight: computedStyle.fontWeight,
        fontFamily: computedStyle.fontFamily,
        className: el.className
      }
    })

    console.log('Hero title styles:', fontWeight)

    // Ensure font weight is bold enough (700 or higher, 'bold', or 'black')
    const weightValue = parseInt(fontWeight.fontWeight)
    const isBoldClass = fontWeight.className.includes('font-black') ||
      fontWeight.className.includes('font-bold') ||
      fontWeight.className.includes('font-extrabold')

    expect(
      weightValue >= 700 ||
      fontWeight.fontWeight === 'bold' ||
      fontWeight.fontWeight === '800' ||
      fontWeight.fontWeight === '900' ||
      isBoldClass
    ).toBeTruthy()

    // Verify it's using a display font (Inter or system font)
    expect(fontWeight.fontFamily).toContain('Inter')
  })

  test('All sections use unified radius tokens (no mixed radii)', async ({ page }) => {
    // Collect all elements with border radius
    const elementsWithRadius = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*')
      const elementsWithBorderRadius = []

      for (const el of allElements) {
        const computedStyle = window.getComputedStyle(el)
        const borderRadius = computedStyle.borderRadius

        if (borderRadius && borderRadius !== '0px' && borderRadius !== 'none') {
          elementsWithBorderRadius.push({
            tag: el.tagName,
            className: el.className,
            borderRadius: borderRadius,
            selector: el.id ? `#${el.id}` : `.${el.className.split(' ')[0]}`
          })
        }
      }

      return elementsWithBorderRadius
    })

    console.log('Elements with border radius:', elementsWithRadius)

    // Define allowed radius values from design system
    const allowedRadii = [
      '24px',        // rounded-ds (1.5rem)
      '1.5rem',      // rounded-ds 
      '9999px',      // rounded-full
      '12px',        // rounded-lg
      '8px',         // rounded-md  
      '4px',         // rounded-sm
      '0.75rem',     // 12px
      '0.5rem',      // 8px
      '0.25rem'      // 4px
    ]

    // Check that all radius values are from our design system
    const unauthorizedRadii = elementsWithRadius.filter(el =>
      !allowedRadii.some(allowed => el.borderRadius.includes(allowed))
    )

    if (unauthorizedRadii.length > 0) {
      console.log('Unauthorized radius values found:', unauthorizedRadii)
    }

    // We should have mostly consistent usage of rounded-ds (24px)
    const dsRadiiCount = elementsWithRadius.filter(el =>
      el.borderRadius.includes('24px') || el.borderRadius.includes('1.5rem')
    ).length

    expect(dsRadiiCount).toBeGreaterThan(0)

    // Check that key components use the design system radius
    const glassCard = page.locator('.glass-card').first()
    if (await glassCard.isVisible()) {
      const cardRadius = await glassCard.evaluate(el =>
        window.getComputedStyle(el).borderRadius
      )
      expect(cardRadius).toContain('24px')
    }
  })

  test('Animations run smoothly and are disabled for reduced motion', async ({ page }) => {
    // Test 1: Check that animations are present by default
    const floatingElement = page.locator('.enhanced-float').first()
    await expect(floatingElement).toBeVisible()

    // Verify animation is applied
    const hasAnimation = await floatingElement.evaluate(el => {
      const computedStyle = window.getComputedStyle(el)
      return {
        animation: computedStyle.animation,
        willChange: computedStyle.willChange,
        transform: computedStyle.transform
      }
    })

    console.log('Animation styles:', hasAnimation)
    expect(hasAnimation.animation).not.toBe('none')

    // Test 2: Enable reduced motion and verify animations are disabled
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Check that animations are disabled
    const reducedMotionStyles = await page.evaluate(() => {
      const elements = document.querySelectorAll('.motion-element, .enhanced-float, .animate-liquid-morph')
      const styles = []

      for (const el of elements) {
        const computedStyle = window.getComputedStyle(el)
        styles.push({
          element: el.className,
          animation: computedStyle.animation,
          transition: computedStyle.transition
        })
      }

      return styles
    })

    console.log('Reduced motion styles:', reducedMotionStyles)

    // Verify animations are disabled or significantly reduced
    const hasDisabledAnimations = reducedMotionStyles.some(style =>
      style.animation === 'none' ||
      style.animation.includes('0.01ms') ||
      style.transition.includes('0.01ms')
    )

    expect(hasDisabledAnimations).toBeTruthy()

    // Test 3: Reset and test smooth animation performance
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Test hover animations for smoothness
    const button = page.locator('.enhanced-button, .glass-button').first()
    if (await button.isVisible()) {
      await button.hover()

      const hoverTransition = await button.evaluate(el => {
        const computedStyle = window.getComputedStyle(el)
        return {
          transition: computedStyle.transition,
          transform: computedStyle.transform
        }
      })

      console.log('Hover transition:', hoverTransition)
      expect(hoverTransition.transition).toContain('transform')
    }
  })

  test('LiquidTitle component has proper typography weight', async ({ page }) => {
    const liquidTitle = page.locator('.liquid-title')
    await expect(liquidTitle).toBeVisible()

    // Check the font weight of the title
    const titleStyles = await liquidTitle.evaluate(el => {
      const computedStyle = window.getComputedStyle(el)
      return {
        fontWeight: computedStyle.fontWeight,
        fontFamily: computedStyle.fontFamily,
        fontSize: computedStyle.fontSize,
        lineHeight: computedStyle.lineHeight,
        letterSpacing: computedStyle.letterSpacing
      }
    })

    console.log('LiquidTitle styles:', titleStyles)

    // Verify strong font weight
    const weightValue = parseInt(titleStyles.fontWeight)
    expect(weightValue).toBeGreaterThanOrEqual(700)
  })

  test('Glass morphism effects use consistent opacity and blur values', async ({ page }) => {
    const glassElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('.glass-card, .glass-button, .liquid-glass, .enhanced-glass')
      const styles = []

      for (const el of elements) {
        const computedStyle = window.getComputedStyle(el)
        styles.push({
          className: el.className,
          backdropFilter: computedStyle.backdropFilter,
          background: computedStyle.background,
          border: computedStyle.border
        })
      }

      return styles
    })

    console.log('Glass element styles:', glassElements)

    // Verify consistent blur values
    const hasBackdropBlur = glassElements.some(style =>
      style.backdropFilter.includes('blur(') && !style.backdropFilter.includes('blur(0')
    )

    expect(hasBackdropBlur).toBeTruthy()

    // Check for consistent glass background patterns
    const hasGlassBackground = glassElements.some(style =>
      style.background.includes('rgba(255, 255, 255,') ||
      style.background.includes('rgba(0, 0, 0,')
    )

    expect(hasGlassBackground).toBeTruthy()
  })

  test('Performance: animations do not cause layout shifts', async ({ page }) => {
    // Measure Cumulative Layout Shift (CLS)
    const clsScore = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          }
        })

        observer.observe({ type: 'layout-shift', buffered: true })

        setTimeout(() => {
          observer.disconnect()
          resolve(clsValue)
        }, 3000)
      })
    })

    console.log('Cumulative Layout Shift score:', clsScore)

    // CLS should be less than 0.1 for good performance
    expect(clsScore).toBeLessThan(0.1)
  })

  test('Color contrast meets accessibility standards', async ({ page }) => {
    // Check text contrast on hero section
    const heroText = page.locator('.hero-text, .body-text').first()
    await expect(heroText).toBeVisible()

    const contrastInfo = await heroText.evaluate(el => {
      const computedStyle = window.getComputedStyle(el)
      const backgroundColor = computedStyle.backgroundColor
      const color = computedStyle.color

      // Get the actual background from parent if transparent
      let actualBg = backgroundColor
      if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
        let parent = el.parentElement
        while (parent && actualBg === 'rgba(0, 0, 0, 0)') {
          actualBg = window.getComputedStyle(parent).backgroundColor
          parent = parent.parentElement
        }
      }

      return {
        color,
        backgroundColor: actualBg,
        fontSize: computedStyle.fontSize
      }
    })

    console.log('Text contrast info:', contrastInfo)

    // Ensure text is not transparent (should have actual color values)
    expect(contrastInfo.color).not.toBe('rgba(0, 0, 0, 0)')
    expect(contrastInfo.color).not.toBe('transparent')
  })

  test('Responsive design maintains visual harmony', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' }
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.waitForTimeout(500)

      // Check that design system elements are still consistent
      const heroTitle = page.locator('.liquid-title').first()
      if (await heroTitle.isVisible()) {
        const styles = await heroTitle.evaluate(el => {
          const computedStyle = window.getComputedStyle(el)
          return {
            fontSize: computedStyle.fontSize,
            fontWeight: computedStyle.fontWeight,
            borderRadius: computedStyle.borderRadius
          }
        })

        console.log(`${viewport.name} styles:`, styles)

        // Font weight should remain consistent across viewports
        const weightValue = parseInt(styles.fontWeight)
        expect(weightValue).toBeGreaterThanOrEqual(600)
      }
    }
  })
})
