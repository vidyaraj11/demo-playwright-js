import { test, expect, request } from '@playwright/test'
let token;
let fakePayloadOrder = { data: [], message: "No Orders" }
test.beforeEach(async() => {
    /* we can also create variable to store payload data*/
    const loginPayload = { userEmail: "t073307@gmail.com", userPassword: "Test@123321" }
        /*to create new instance for API */
    const apiContext = await request.newContext();
    /*Storing post request's responce inside "apiResponce" variable*/
    const loginResponce = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: loginPayload })
    await expect(loginResponce.ok()).toBeTruthy()
    const loginResponceJson = await loginResponce.json()
    token = loginResponceJson.token;
    console.log(token);
})


test('Network Intercept', async({ page }) => {
    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();


    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrder);
            route.fulfill({
                response,
                body,

            });
            //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
        });

    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    console.log(await page.locator(".mt-4").textContent());



});