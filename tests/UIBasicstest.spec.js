const { test, expect } = require('@playwright/test');


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

   test.only('Second test', async ({browser})=>
   {
    
    const context = await browser.newContext()
    const page = await context.newPage();
    const userName = page.locator('#userEmail');
    const password = page.locator('[type=password]');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());
    await userName.fill("babkafeel@gmail.com");
    await password.fill("Admin@111");
    await page.locator('[type="submit"]').click();
    await page.waitForLoadState("networkidle");
    const titles=(await page.locator(".card-body b").allTextContents());
    console.log(titles);


   });

     
