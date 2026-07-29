const {test, expect} = require('@playwright/test')

 test("Popup validation", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com/");
    // await page.goBack();
    //hidden element validation
    await expect (page.locator("[name='show-hide']")).toBeVisible
    await page.locator("#hide-textbox").click();
    await expect (page.locator("[name='show-hide']")).toBeHidden
    //handle Java pop-ups
    await page.locator("#confirmbtn").click();
    page.on('dialog', dialog => dialog.accept());
    //handle hover elements 
    await page.locator("#mousehover").hover();
    await page.locator("[href='#top']").click();
    await page.pause();
    //handle iframe and extract text from iframe i.e. page: 2
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);


});