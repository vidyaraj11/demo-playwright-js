class ApiUtil {
    /*to send 'apiContext'of WebApi.spec.js test file to ApiUtils.js file create a constructor */
    constructor(apiContext, loginPayload) {
        /*create instance variable to use apiContext throughtout the class(inside function) */
        this.apiContext = apiContext;
        /**creating loginPayload instance because it is necessary to login first to application, also use without creating instance variable */
        this.loginPayload = loginPayload;

    }

    async getToken() {
        const loginResponce = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: loginPayload })
        await expect(loginResponce.ok()).toBeTruthy()
        const loginResponceJson = await loginResponce.json()
        token = loginResponceJson.token;
        console.log(token);
        return token;
    }

    async getOrderId(orderPayload) {
        const orderRespoce = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload,
            headers: { 'Authorization': this.getToken(), 'Content-type': 'application/json' }
        })
        const orderRespoceJson = await orderRespoce.json()
        orderId = orderRespoceJson.orders[0]
        console.log(orderId);
        console.log("Order is created", orderId);
        return orderId;
    }
}
module.exports = { ApiUtil }