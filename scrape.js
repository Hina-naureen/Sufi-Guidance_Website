const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36');

  console.log('Loading sufiguidance.com...');
  await page.goto('https://www.sufiguidance.com', { waitUntil: 'networkidle2', timeout: 60000 });

  // Wait extra for Wix to render
  await new Promise(r => setTimeout(r, 5000));

  const content = await page.evaluate(() => {
    // Get all visible text
    const getAllText = (el) => {
      const texts = [];
      el.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,li,button,label,div').forEach(node => {
        const text = node.innerText?.trim();
        if (text && text.length > 3 && text.length < 2000) {
          texts.push({ tag: node.tagName, text });
        }
      });
      return texts;
    };

    const navLinks = [];
    document.querySelectorAll('nav a, [role="navigation"] a').forEach(a => {
      if (a.innerText?.trim()) navLinks.push({ text: a.innerText.trim(), href: a.href });
    });

    return {
      title: document.title,
      metaDesc: document.querySelector('meta[name="description"]')?.content,
      navLinks,
      allText: getAllText(document.body).slice(0, 300)
    };
  });

  console.log(JSON.stringify(content, null, 2));
  await browser.close();
})();
