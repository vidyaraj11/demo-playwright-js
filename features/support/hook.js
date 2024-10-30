import { Before, After, AfterAll, Status } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";


Before(async function() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
})

After(async function(params) {
    console.log("This is final statement");

})

// AfterAll(async function(result) {
//     if (result.status === Status.FAILED) {
//         await this.page.screenshot({ path: "screenshot1.png" })

// }
// })