const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ 
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 
    headless: 'new'
  });
  const page = await browser.newPage();
  
  // Expose function to catch errors
  await page.exposeFunction('logError', (msg, url, line, col, error) => {
    console.log('WINDOW ERROR:', msg, url, line, col, error);
  });
  
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('error', e => {
      window.logError(e.message, e.filename, e.lineno, e.colno, e.error ? e.error.stack : '');
    });
  });

  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  console.log('Navigating...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle0' });
  await browser.close();
})();
