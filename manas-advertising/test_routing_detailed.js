const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ 
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 
    headless: 'new'
  });
  const page = await browser.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
    }
  });
  console.log('Navigating to home...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle0' });
  await browser.close();
})();
