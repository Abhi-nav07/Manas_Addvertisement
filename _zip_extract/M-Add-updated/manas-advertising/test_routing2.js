const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ 
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 
    headless: 'new'
  });
  const page = await browser.newPage();
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log('CONSOLE:', msg.type(), msg.text());
    }
  });
  
  console.log('Navigating to home...');
  await page.goto('http://localhost:3000');
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Clicking a link to switch pages...');
  const linkClicked = await page.evaluate(() => {
    const link = document.querySelector('a[href="/portfolio"]');
    if (link) {
      link.click();
      return true;
    }
    return false;
  });
  
  console.log('Link clicked:', linkClicked);
  await new Promise(r => setTimeout(r, 3000));
  
  console.log('Clicking back to home...');
  await page.evaluate(() => {
    const homeLink = document.querySelector('a[href="/"]');
    if (homeLink) homeLink.click();
  });
  
  await new Promise(r => setTimeout(r, 2000));
  console.log('Done.');
  
  await browser.close();
})();
