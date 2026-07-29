const {test, expect, request} = require('@playwright/test');
const {ApiUtils}= require('./utils/ApiUtils');
const loginPayLoad = {userEmail: "babkafeel@gmail.com", userPassword: "Admin@111"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}
let token;
let orderId;

let response;
test.beforeAll( async ()=>
{
  //Login API
const apiContext = await request.newContext();
const apiUtils = new ApiUtils(apiContext, loginPayLoad);
response = await apiUtils.createOrder(orderPayload);
});
//-------------------------------------------
//token(sign in info) extracted and stored in variable > bypassed login screen > directly went to cat browse page 
 test('E2E test_API + UI', async ({page})=>
   {

      page.addInitScript(value => {
      window.localStorage.setItem('token',value);

    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");
    //removed code for adding to cart and placing the order
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i = 0; i<await rows.count(); ++i)
      {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId))
          {
            await rows.nth(i).locator("button").first().click();
            break;
        }

    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

   
  });