const puppeteer = require('puppeteer');
const fs = require('fs');

const pages = [
  'https://www.sufiguidance.com/',
  'https://www.sufiguidance.com/aboutus',
  'https://www.sufiguidance.com/booking',
  'https://www.sufiguidance.com/faq',
  'https://www.sufiguidance.com/abjad-calculator',
  'https://www.sufiguidance.com/books',
  'https://www.sufiguidance.com/articles',
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  const allData = {};

  for (const url of pages) {
    console.log('Scraping:', url);
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36');

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      await new Promise(r => setTimeout(r, 4000));

      const content = await page.evaluate(() => {
        const seen = new Set();
        const texts = [];
        document.querySelectorAll('h1,h2,h3,h4,p,li,span,a,button').forEach(el => {
          const t = el.innerText?.trim();
          if (t && t.length > 5 && t.length < 3000 && !seen.has(t)) {
            seen.add(t);
            texts.push({ tag: el.tagName, text: t });
          }
        });
        return texts;
      });

      allData[url] = content;
    } catch (e) {
      allData[url] = { error: e.message };
    }
    await page.close();
  }

  await browser.close();
  fs.writeFileSync('site_content.json', JSON.stringify(allData, null, 2));
  console.log('Done! Saved to site_content.json');
})();
