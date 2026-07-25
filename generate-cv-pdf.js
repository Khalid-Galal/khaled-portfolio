const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const cvPath = path.resolve(__dirname, 'assets/cv/cv.html');
  await page.goto(`file://${cvPath}`, { waitUntil: 'networkidle' });

  const pdfPath = path.resolve(__dirname, 'assets/cv/Khaled_Galal_Yehia_Software_Engineer_CV.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: '20px', bottom: '20px', left: '40px', right: '40px' },
    printBackground: true
  });

  console.log(`PDF generated: ${pdfPath}`);
  await browser.close();
})();
