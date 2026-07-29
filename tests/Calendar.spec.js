const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('Calendar  validations', async ({page}) =>
{

const monthNumber ="6";
const date = "25";
const year = "2027";
const expectedList = [monthNumber, date, year];

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator(".react-date-picker").click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
await page.getByText(year).click();
await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
await page.locator("//abbr[text()='"+date+"']").click();

const inputs = page.locator('.react-date-picker__inputGroup input[type="number"]'); // skip any input that is hidden
for(let i =0; i<expectedList.length; i++)
{
    const actualList = await inputs.nth(i).inputValue(); // extracting values from Dom and storing in a variable
    expect(actualList).toEqual(expectedList[i]);
}


});