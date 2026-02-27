const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  
  await page.goto('http://127.0.0.1:12000/sketches/dendrite-growth.html', { waitUntil: 'networkidle0' });
  
  // Wait for sketch to render
  await new Promise(r => setTimeout(r, 3000));
  
  // Take screenshot
  await page.screenshot({ 
    path: '/Users/estm/.openclaw/workspace/p5-art-dreams/thumbs/dendrite-growth.png',
    fullPage: false
  });
  
  await browser.close();
  console.log('Screenshot saved!');
})();
