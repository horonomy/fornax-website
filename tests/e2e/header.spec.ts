import { expect, test } from '@playwright/test'

const marketingRoutes = [
  { label: 'Home', href: '/' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Open Source', href: '/open-source' },
  { label: 'Security & Privacy', href: '/security' },
]

test('keeps the existing desktop navigation at the compact-header breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 844 })
  await page.goto('/')

  await expect(page.locator('.site-header__nav--desktop')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden()
})

test('discloses every marketing route and restores trigger focus on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const menuButton = page.getByRole('button', { name: 'Menu' })
  const docsLink = page.locator('.site-header__compact-docs')
  await expect(docsLink).toBeVisible()
  await menuButton.click()
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

  const disclosure = page.locator('#primary-navigation-menu')
  await expect(disclosure).toBeVisible()
  for (const route of marketingRoutes) {
    await expect(disclosure.getByRole('link', { name: route.label, exact: true })).toHaveAttribute(
      'href',
      route.href,
    )
  }
  await expect(disclosure.getByRole('link', { name: 'Docs' })).toHaveCount(0)

  await page.keyboard.press('Escape')
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  await expect(disclosure).toBeHidden()
  await expect(menuButton).toBeFocused()
})

test('dismisses the disclosure when a marketing route is chosen', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  await page.getByRole('button', { name: 'Menu' }).click()
  await page.locator('#primary-navigation-menu').getByRole('link', { name: 'Pricing' }).click()

  await expect(page).toHaveURL(/\/pricing$/)
  await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('#primary-navigation-menu')).toBeHidden()
})

test('keeps a rapidly reopened disclosure visible', async ({ page }) => {
  await page.clock.install()
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const menuButton = page.getByRole('button', { name: 'Menu' })
  await menuButton.click()
  await menuButton.click()
  await menuButton.click()

  await page.clock.runFor(121)
  const disclosure = page.locator('#primary-navigation-menu')
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  await expect(disclosure).toBeVisible()
})

test('dismisses the disclosure on browser history navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Menu' }).click()
  await page.locator('#primary-navigation-menu').getByRole('link', { name: 'Pricing' }).click()
  await page.getByRole('button', { name: 'Menu' }).click()

  await page.goBack()

  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('#primary-navigation-menu')).toBeHidden()
})

test('closes the mobile disclosure and moves focus to the brand at the desktop breakpoint', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Menu' }).click()
  await page.locator('#primary-navigation-menu').getByRole('link', { name: 'Pricing' }).focus()

  await page.setViewportSize({ width: 768, height: 844 })

  await expect(page.locator('#primary-navigation-menu')).toBeHidden()
  await expect(page.getByRole('link', { name: 'Fornax' })).toBeFocused()
})

test('uses an immediate disclosure state when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  await page.getByRole('button', { name: 'Menu' }).click()
  const disclosure = page.locator('#primary-navigation-menu')

  await expect(disclosure).toBeVisible()
  await expect(disclosure).toHaveCSS('transition-duration', '0s')
})

for (const width of [320, 390, 430]) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).click()

    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
      .toBe(true)
  })
}

test('keeps the final disclosure row reachable in a short viewport', async ({ page }) => {
  await page.setViewportSize({ width: 568, height: 320 })
  await page.goto('/')

  await page.getByRole('button', { name: 'Menu' }).click()
  for (let tabCount = 0; tabCount < 5; tabCount += 1) {
    await page.keyboard.press('Tab')
  }

  const disclosure = page.locator('#primary-navigation-menu')
  const finalRoute = disclosure.getByRole('link', { name: 'Security & Privacy' })
  await expect(finalRoute).toBeFocused()
  const finalItem = disclosure.getByRole('button', { name: 'Sign in' })
  await finalItem.scrollIntoViewIfNeeded()
  await expect(finalItem).toBeVisible()
  await expect
    .poll(() => disclosure.evaluate(element => element.scrollHeight > element.clientHeight && element.scrollTop > 0))
    .toBe(true)
})
