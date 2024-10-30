const { test, expect } = require('@playwright/test');


test('Security test request intercept', async({ page }) => {
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url()))

    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("t073307@gmail.com");
    await page.locator("#userPassword").fill("Test@123321");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("button:has-text('View')").first().click();
})