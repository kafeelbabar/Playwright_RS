 const { test, expect } = require('@playwright/test');
 let webContext;

 test.beforeAll(async({browser})=>
    {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill("babkafeel@gmail.com");
    await page.locator('[type=password]').fill("Admin@111");
    await page.locator('[type="submit"]').click();
    await page.waitForLoadState("networkidle");
    await context.storageState({path: 'state.json'}); //it create a file & it captures all the data(cookies) on the context(browser) level
    webContext = await browser.newContext({storageState: 'state.json'});


    })


  test('E2E test+storing cookie value in json', async ()=>
   {
    const email = "";
    const productName = 'ADIDAS ORIGINAL';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    const products = await page.locator(".card-body");
    await page.locator(".card-body b").first().waitFor();
    const titles=(await page.locator(".card-body b").allTextContents());
    console.log(titles);
    const count = await products.count();

    for(let i=0; i<count; ++i)
        {
        if(await products.nth(i).locator("b").textContent() === productName)
            {
            // Find the Add to Cart button within the same product card
            // Since products.nth(i) is the product title element, we need to go up to find the cart button
              await products.nth(i).locator("text= Add To Cart").click();
              break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click(); //checkout button
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropDown = page.locator(".ta-results");
    await dropDown.waitFor();
    const optionsCount = await dropDown.locator("button").count();
    for(let i= 0; i<optionsCount; ++i)
      {
      const text = await dropDown.locator("button").nth(i).textContent();
      if(text ===" India")
        {
          await dropDown.locator("button").nth(i).click();
          break;
      }
      }

    expect (page.locator(".user__name [type='text']").first()).toContainText(email); 
    await page.locator("input.input.txt.text-validated").first().fill("4111111111111111");
    const day = await page.locator(".input.ddl").first();
    await day.selectOption("12");
    const month = await page.locator(".input.ddl").last();
    await month.selectOption("25");
    await page.locator("[type='text']").nth(1).fill("123");
    await page.locator(".input.txt").nth(2).fill("atul");
    await page.locator("[name='coupon']").fill("rahulshettyacademy");
    await page.locator("[type='submit']").click();
    await page.locator("p:has-text('* Coupon Applied')").waitFor({state: 'visible'});
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i = 0; i<await rows.count(); ++i)
      {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId))
          {
            await rows.nth(i).locator("button").first().click();
            break;
        }

    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    
    //await page.pause();

   });