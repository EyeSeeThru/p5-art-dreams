const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });
  await page.goto('file://' + process.cwd() + '/sketches/herons-basin.html', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: 'thumbs/herons-basin.png' });
  await browser.close();
  console.log('Screenshot saved');
})();
