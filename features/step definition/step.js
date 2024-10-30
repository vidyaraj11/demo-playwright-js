import { Given, When, Then } from "@cucumber/cucumber";
// import { playwright } from '@playwright/test';
import { expect, chromium } from "@playwright/test";

// let browser = await chromium.launch();
// let context = await browser.newContext();
// let page = await context.newPage();


/**If you need page fixture then you can user browser.newContext and to activate life of browser you can import playwright  */
Given('Login to application using {string} and {string}', { timeout: 60 * 1000 }, async function(username, password) {
    // global.browser = await playwright.chromium.launch();
    // const browser = await chromium.launch({ headless: false });
    // const context = await browser.newContext();
    // /*** we are using this.page to make page as World constructor. now we can use page inside any method ***/
    // this.page = await context.newPage();

    await this.page.goto("https://rahulshettyacademy.com/client");
    await this.page.locator("#userEmail").fill(username);
    await this.page.locator("#userPassword").fill(password);
    await this.page.locator("[value='Login']").click();
    await this.page.waitForLoadState('networkidle');
});

When('click on order', async function() {
    await this.page.locator(".card-body b").first().waitFor();
    await this.page.locator("button[routerlink*='myorders']").click();
});

Then('Intercept with different product id', async function() {
    await this.page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
});

Then(`{string} should be visible`, async function(text) {
    await this.page.locator("button:has-text('View')").first().click();
    await expect(this.page.locator("p").last()).toHaveText(text);
});