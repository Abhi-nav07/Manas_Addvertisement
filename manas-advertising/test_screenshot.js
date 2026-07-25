const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ 
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot.png' });
  
  // Dump console logs
  const content = await page.content();
  const fs = require('fs');
  fs.writeFileSync('page_content.html', content);

  await browser.close();
})();
