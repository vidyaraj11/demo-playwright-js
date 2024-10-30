import { test, expect, request } from '@playwright/test'
let token;
let orderId;
let fakePayloadOrder = { data: [], message: "No Orders" }
test.describe.configure({ mode: 'parallel' })

test.beforeEach(async() => {
    /* we can also create variable to store payload data*/
    const loginPayload = { userEmail: "t073307@gmail.com", userPassword: "Test@123321" }
    const orderPayload = { orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }
        /*to create new instance for API */
    const apiContext = await request.newContext();
    /*Storing post request's respose inside "apiResponce" variable*/
    const loginResponce = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: loginPayload })
    await expect(loginResponce.ok()).toBeTruthy()
    const loginResponceJson = await loginResponce.json()
    token = loginResponceJson.token;
    console.log(token);
    // const orderRespoce = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
    //     data: orderPayload,
    //     headers: { 'Authorization': token, 'Content-type': 'application/json' }
    // })
    // const orderRespoceJson = await orderRespoce.json()
    // orderId = orderRespoceJson.orders[0]
    // console.log(orderId);
    // console.log("Order is created", orderId);
})
test('App Login', async({ page }) => {
    /*We use addInitScript method to insert our javascript expression */
    page.addInitScript(value => {
        /*this is anonymous function which takes 'value' as the fist argument and sets the value inside token, and passing token as 2nd argument*/
        window.localStorage.setItem('token', value)
    }, token)
    await page.goto("https://rahulshettyacademy.com/client/")
        /**put "*" to generalise the url. Id can be different for different user */
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"),
        async route => {
            const respose = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrder);
            route.fulfill({
                respose,
                body,
            })
        }
    await page.locator('button[routerlink*="myorders"]').click()
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
        // await page.pause();
        // const URL = await page.url()
        // console.log(URL);
})