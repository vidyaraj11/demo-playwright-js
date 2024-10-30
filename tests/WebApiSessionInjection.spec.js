import { test, expect } from '@playwright/test'
let webContext;
test.beforeAll('@Network Session injection', async({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator('#userEmail').fill('t073307@gmail.com')
    await page.locator('#userPassword').fill('Test@123321')
    await page.click('#login')
    await page.waitForLoadState('networkidle');
    /**storageState capture all storage data and stores in json file(path of file) */
    await context.storageState({ path: 'state.json' })
        /**Now inject the json file to browser */
    webContext = await browser.newContext({ storageState: 'state.json' })

})
test('Add to cart order', async() => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/')
    await expect(page.locator('.text-muted.m-2')).toBeVisible()


})