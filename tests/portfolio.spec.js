const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '..', 'index.html')}`;
const resumeUrl = `file://${path.resolve(__dirname, '..', 'resume.html')}`;

// ===================== INDEX.HTML TESTS =====================

test.describe('Index Page - Hero Section', () => {
  test('should display updated typed items', async ({ page }) => {
    await page.goto(indexUrl);
    const typed = page.locator('.typed');
    await expect(typed).toHaveAttribute('data-typed-items', 'AI Solutions,Software Engineer');
  });
});

test.describe('Index Page - About Section', () => {
  test('should show updated profile as R&D AI Solutions', async ({ page }) => {
    await page.goto(indexUrl);
    const profile = page.locator('.about-info');
    await expect(profile).toContainText('Software Engineer, R&D AI Solutions');
  });

  test('should show skill badges instead of progress bars', async ({ page }) => {
    await page.goto(indexUrl);
    // No progress bars should exist
    const progressBars = page.locator('.about .progress-bar');
    await expect(progressBars).toHaveCount(0);
    // Skill badges should exist
    const badges = page.locator('.skills-content .badge');
    const count = await badges.count();
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test('should contain key skills: Python, LangChain, RAG, Docker', async ({ page }) => {
    await page.goto(indexUrl);
    const skills = page.locator('.skills-content');
    await expect(skills).toContainText('Python');
    await expect(skills).toContainText('LangChain');
    await expect(skills).toContainText('RAG');
    await expect(skills).toContainText('Docker');
    await expect(skills).toContainText('Google Gemini');
    await expect(skills).toContainText('Spring Boot');
  });

  test('should show updated About Me with R&D AI Solutions and Master\'s degree', async ({ page }) => {
    await page.goto(indexUrl);
    const aboutMe = page.locator('.about-me');
    await expect(aboutMe).toContainText('R&D AI Solutions');
    await expect(aboutMe).toContainText('Quantic School of Business and Technology');
    await expect(aboutMe).toContainText('Master of Science in Software Engineering');
  });

  test('Review My CV button should link to resume.html', async ({ page }) => {
    await page.goto(indexUrl);
    const btn = page.locator('#reviewCVBtn');
    await expect(btn).toBeVisible();
    await expect(btn).toContainText('Review My CV');
  });
});

test.describe('Index Page - Portfolio Section', () => {
  test('should display exactly 6 original portfolio items', async ({ page }) => {
    await page.goto(indexUrl);
    await page.waitForSelector('#portfolioContainer .col-md-4');
    const items = page.locator('#portfolioContainer .col-md-4');
    await expect(items).toHaveCount(6);
  });

  test('should contain original projects', async ({ page }) => {
    await page.goto(indexUrl);
    await page.waitForSelector('#portfolioContainer');
    const container = page.locator('#portfolioContainer');
    await expect(container).toContainText('SoapUI Integration');
    await expect(container).toContainText('OCR Invoice Analyst');
    await expect(container).toContainText('Student System');
    await expect(container).toContainText('N Puzzle Game');
    await expect(container).toContainText('House Pricing Detection');
    await expect(container).toContainText('Black Jack Game');
  });

  test('should NOT contain the removed new projects', async ({ page }) => {
    await page.goto(indexUrl);
    await page.waitForSelector('#portfolioContainer');
    const container = page.locator('#portfolioContainer');
    await expect(container).not.toContainText('Correspondence Management System');
    await expect(container).not.toContainText('Company RAG Agent');
    await expect(container).not.toContainText('ECM Document Generator');
  });
});

// ===================== RESUME.HTML TESTS =====================

test.describe('Resume Page - Navigation', () => {
  test('should have a navigation header', async ({ page }) => {
    await page.goto(resumeUrl);
    const header = page.locator('#header');
    await expect(header).toBeVisible();
  });

  test('nav links should point to index.html sections', async ({ page }) => {
    await page.goto(resumeUrl);
    const aboutLink = page.locator('nav a[href="index.html#about"]');
    await expect(aboutLink).toBeVisible();
    const portfolioLink = page.locator('nav a[href="index.html#portfolio"]');
    await expect(portfolioLink).toBeVisible();
  });
});

test.describe('Resume Page - Summary', () => {
  test('should show updated summary (not student)', async ({ page }) => {
    await page.goto(resumeUrl);
    const summary = page.locator('.resume-item.pb-0');
    await expect(summary).toContainText('Software Engineer');
    await expect(summary).toContainText('AI solutions');
    await expect(summary).not.toContainText('Student');
  });

  test('should show updated subtitle', async ({ page }) => {
    await page.goto(resumeUrl);
    const subtitle = page.locator('.section-title p');
    await expect(subtitle).toContainText('certifications');
    await expect(subtitle).toContainText('software engineering and AI');
  });
});

test.describe('Resume Page - Education', () => {
  test('should show Master\'s degree from Quantic', async ({ page }) => {
    await page.goto(resumeUrl);
    const education = page.locator('.resume');
    await expect(education).toContainText('Master of Science in Software Engineering');
    await expect(education).toContainText('Quantic School of Business and Technology');
    await expect(education).toContainText('Jun 2025');
    await expect(education).toContainText('Aug 2026');
  });

  test('should show Bachelor\'s degree from Ain Shams', async ({ page }) => {
    await page.goto(resumeUrl);
    const education = page.locator('.resume');
    await expect(education).toContainText('Bachelor of Computer and Information Science');
    await expect(education).toContainText('Ain Shams University');
  });
});

test.describe('Resume Page - Certificates & Training', () => {
  test('should have a combined Certificates & Training section', async ({ page }) => {
    await page.goto(resumeUrl);
    const resume = page.locator('.resume');
    await expect(resume).toContainText('Certificates & Training');
  });

  test('should show Digital Egypt Pioneers Program certificate', async ({ page }) => {
    await page.goto(resumeUrl);
    const resume = page.locator('.resume');
    await expect(resume).toContainText('Digital Egypt Pioneers Program');
    await expect(resume).toContainText('Vulnerability Analyst / Penetration Tester');
    await expect(resume).toContainText('Ministry of Communications and Information Technology');
  });

  test('should show McKinsey Forward Program certificate', async ({ page }) => {
    await page.goto(resumeUrl);
    const resume = page.locator('.resume');
    await expect(resume).toContainText('McKinsey.org Forward Program');
  });

  test('should show training courses in the same section', async ({ page }) => {
    await page.goto(resumeUrl);
    const resume = page.locator('.resume');
    await expect(resume).toContainText('Spring Boot 3');
    await expect(resume).toContainText('RPA Developer Foundation');
    await expect(resume).toContainText('Appian Development');
  });
});

test.describe('Resume Page - Professional Experience', () => {
  test('should show R&D AI Solutions role in experience section', async ({ page }) => {
    await page.goto(resumeUrl);
    const experienceCol = page.locator('.col-lg-6').nth(1);
    const firstRole = experienceCol.locator('.resume-item').first();
    await expect(firstRole).toContainText('Software Engineer, R&D AI Solutions');
    await expect(firstRole).toContainText('Jan 2025');
    await expect(firstRole).toContainText('Present');
  });

  test('should show team names in R&D role bullets', async ({ page }) => {
    await page.goto(resumeUrl);
    const rdRole = page.locator('.resume');
    await expect(rdRole).toContainText('Company-wide:');
    await expect(rdRole).toContainText('ECM/FileNet & ECM/OpenText Teams:');
    await expect(rdRole).toContainText('Financial Team:');
    await expect(rdRole).toContainText('Support Team:');
  });

  test('should show Back End Developer and Support with correct dates', async ({ page }) => {
    await page.goto(resumeUrl);
    const resume = page.locator('.resume');
    await expect(resume).toContainText('Back End Developer and Support');
    await expect(resume).toContainText('June 2024');
    await expect(resume).toContainText('Dec 2024');
  });

  test('should show all 6 experience roles', async ({ page }) => {
    await page.goto(resumeUrl);
    const resume = page.locator('.resume');
    await expect(resume).toContainText('Software Engineer, R&D AI Solutions');
    await expect(resume).toContainText('Back End Developer and Support');
    await expect(resume).toContainText('Back End Developer');
    await expect(resume).toContainText('Digital Integration Trainee');
    await expect(resume).toContainText('RPA Developer Trainee');
    await expect(resume).toContainText('BPM Developer Trainee');
  });
});

test.describe('Resume Page - Download CV', () => {
  test('should have a download PDF button', async ({ page }) => {
    await page.goto(resumeUrl);
    const downloadBtn = page.locator('#downloadCVBtn');
    await expect(downloadBtn).toBeVisible();
    await expect(downloadBtn).toContainText('Download PDF');
    const href = await downloadBtn.getAttribute('href');
    expect(href).toContain('.pdf');
  });
});
