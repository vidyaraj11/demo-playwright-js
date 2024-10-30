/*to test Api we will import one library which is request*/
import { test, expect, request } from '@playwright/test'
import { Apiutil } from './utils/ApiUtils';
// const { test, expect } = require('@playwright/test');
let token;
let orderId;
test.beforeAll(async() => {
    /* we can also create variable to store payload data*/
    // const loginPayload = { userEmail: "t073307@gmail.com", userPassword: "Test@123321" }
    // const orderPayload = { orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }
    /*to create new instance for API */
    const apiContext = await request.newContext();
    const apiUtils = new Apiutil(apiContext, loginPayload)
    apiUtils.getOrderId(orderPayload)
        /*Storing post request's respose inside "apiResponce" variable*/
        // const loginResponce = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: loginPayload })
        // await expect(loginResponce.ok()).toBeTruthy()
        // const loginResponceJson = await loginResponce.json()
        // token = loginResponceJson.token;
        // console.log(token);
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
    /*Create object for Apiutils class */
    const apiutil = new Apiutil(apiContext, loginPayload)
    const orderid = new getOrderId(orderPayload)


    /*We use addInitScript method to insert our javascript expression */
    page.addInitScript(value => {
        /*this is anonymous function which takes 'value' as the fist argument and sets the value inside token, and passing token as 2nd argument*/
        window.localStorage.setItem('token', value)
    }, token)
    await page.goto('https://rahulshettyacademy.com/client/')
        // await page.waitForTimeout(10000);

    // await page.locator('#userEmail').fill('t073307@gmail.com')
    // await page.locator('#userPassword').fill('Test@123321')
    // await page.click('#login')
    // await expect(page.locator('.text-muted.m-2')).toBeVisible()
    await page.goto('https://rahulshettyacademy.com/client/dashboard/myorders')

})