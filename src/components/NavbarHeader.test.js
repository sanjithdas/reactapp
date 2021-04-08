const assert = require('assert');
 const puppeteer = require('puppeteer');
 const timeout = process.env.SLOWMO ? 30000 : 10000;
 let browser , page;

 

 beforeEach(async()=>{
  browser = await puppeteer.launch({
    headless: true
  }); 
  page = await browser.newPage();
  await page.goto("http://localhost:3000/") 
 });

 afterEach(async()=>{
  await browser.close();
 });

 test('test home page ur', async()=>{
   const url= await page.url();
   assert(url==="http://localhost:3000/");
 });

 test('click logo open home page' , async ()=>{
   const cssSelector = '.img_logo'
   await page.click(cssSelector);
   await page.waitForSelector(cssSelector);
   //await page.waitFor(cssSelector);
   const url = await page.url();
   assert(url==='http://localhost:3000/')
   
   
 });

  // test('click Task Link', async ()=>{
  //   const cssSelector = '.task'
  //   await page.click(cssSelector);
  //    await page.waitForSelector(cssSelector);
  //   // await page.waitFor(cssSelector);
  //   const url = await page.url();
  //   assert(url==='http://localhost:3000/tasks');
  // })