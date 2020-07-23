require("dotenv").config();
const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://web.whatsapp.com/send?phone=5511951301230&text=Olá, mundo"
  );
  await browser.close();
})();
