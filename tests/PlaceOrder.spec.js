// import { test, expect } from '@playwright/test';
// // import { Home } from 'pages/home.js';
// import { Billing } from 'pages/billingPage';


// test.describe('Buy book', () => {
//     test.beforeEach(async({ page }) => {
//         await page.goto('https://practice.automationtesting.in/')
//     })

//     test('verify user can buy a book', async({ page }) => {
//         // const home = new Home(page);
//         const billing = new Billing(page);
//         await expect(page).toHaveTitle('Automation Practice Site')
//         await home.addToCartSeleniumRubyBook()
//         await expect(page.locator("//a[text()='Selenium Ruby']")).toBeVisible()
//         await home.clickProceedToCheckoutButton()
//         await billing.addBillingDetails('vidya', 'raj', 'abc@gmail.com', '1234567890', 'abc', 'xyz', '811213')
//         await expect(page.locator('.woocommerce-thankyou-order-received')).toBeVisible()
//         await page.waitForTimeout(2000);
//     });
// })