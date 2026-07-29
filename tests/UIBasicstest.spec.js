const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');


test('Browser Context Playwright test', async ({browser})=> 
    
    { 
    const context = await browser.newContext(); 
    const page = await context.newPage(); 
    const userName = page.locator('#username');
    const password = page.locator('[type="password"]');
    const signIn   = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshettyacademy1");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator('[style*=block]').textContent());
    await expect(page.locator('[style*=block]')).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy")
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    console.log (await cardTitles.first().textContent());
    console.log (await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);    

   });

 

   test('UI Controls', async({browser})=>
    {
    const context = await browser.newContext()
    const page = await context.newPage();
    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signIn   = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();
    console.log(await page.locator("#terms").isChecked());
    await expect(documentLink).toHaveAttribute('class','blinkingText');
   // await page.pause();
   });

   test('Child Window handle', async({browser}) =>
   {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username"); // copied from previous test or page
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']"); 

    const [newPage] =await Promise.all(
    [
    context.waitForEvent('page'), // listen for any new page, promise pending/rejected/fulfilled
    documentLink.click(), 
     
    ]) // new page is opened 

    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split("@"); //splitted string via "@"
    const domain = arrayText[1].split(" ")[0] // further splitted string via "space" and pulled value on 0 index
    console.log(domain); // printed that 0 index value
    await page.locator("#username").fill(domain); // switch back to intial page, and type the domain, which is fetched in previous line.
    //await page.pause();
    console.log(await page.locator("#username").inputValue());
    
   });
     test('E2E test', async ({browser})=>
   {
   
    const context = await browser.newContext()
    const page = await context.newPage();
    const email = "babkafeel@gmail.com";
    const productName = 'ADIDAS ORIGINAL';
    const products = await page.locator(".card-body");
    //const userName = page.locator('#userEmail');
    //const password = page.locator('[type=password]');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());
    await page.locator('#userEmail').fill(email);
    await page.locator('[type=password]').fill("Admin@111");
    await page.locator('[type="submit"]').click();
    await page.waitForLoadState("networkidle");
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

   test('Playwright Special locators', async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.locator("[name=email]").fill("babkafeel@gmail.com");
    await page.getByPlaceholder("Password").fill("Admin@111");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();

    
   });

