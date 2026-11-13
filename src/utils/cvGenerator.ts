import {BUSINESS_SKILLS, MARKETING_SKILLS} from '../data/defaultPortfolio';
import type {PortfolioConfig} from '../types/portfolio';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildCvHtmlDocument(config: PortfolioConfig): string {
  const experienceBlocks = config.experiences
    .map(
      (exp) => `
      <section class="item">
        <div class="item-head">
          <div>
            <h3>${escapeHtml(exp.position)}</h3>
            <p class="org">${escapeHtml(exp.company)}</p>
          </div>
          <span class="dates">${escapeHtml(exp.employmentDates)}</span>
        </div>
        <p class="desc">${escapeHtml(exp.description)}</p>
        ${
          exp.responsibilities.length > 0
            ? `<ul>${exp.responsibilities.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>`
            : ''
        }
      </section>`,
    )
    .join('');

  const marketingList = MARKETING_SKILLS.map((s) => escapeHtml(s.name)).join(' · ');
  const businessList = BUSINESS_SKILLS.map((s) => escapeHtml(s.name)).join(' · ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(config.fullName)} — Curriculum Vitae</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #111827;
      background: #ffffff;
      line-height: 1.55;
      padding: 40px 24px;
    }
    .sheet {
      max-width: 820px;
      margin: 0 auto;
    }
    header {
      border-bottom: 2px solid #0B1020;
      padding-bottom: 18px;
      margin-bottom: 24px;
    }
    h1 {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #0B1020;
    }
    .subtitle {
      font-size: 14px;
      font-weight: 600;
      color: #3978FF;
      margin-top: 4px;
    }
    .contact-row {
      margin-top: 10px;
      font-size: 12.5px;
      color: #4B5563;
    }
    h2 {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #0B1020;
      border-bottom: 1px solid #E5E7EB;
      padding-bottom: 6px;
      margin: 22px 0 12px;
    }
    p { font-size: 13.5px; color: #374151; margin-bottom: 8px; }
    .item { margin-bottom: 16px; }
    .item-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }
    .item-head h3 { font-size: 15px; color: #111827; }
    .org { font-size: 13.5px; font-weight: 600; color: #3978FF; margin-bottom: 4px; }
    .dates { font-size: 12.5px; color: #6B7280; white-space: nowrap; }
    ul { padding-left: 18px; margin-top: 6px; }
    li { font-size: 13px; color: #374151; margin-bottom: 4px; }
    .skills-line { font-size: 13px; color: #374151; margin-bottom: 8px; }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <main class="sheet">
    <header>
      <h1>${escapeHtml(config.fullName)}</h1>
      <p class="subtitle">${escapeHtml(config.professionalTitle)}</p>
      <p class="contact-row">
        ${escapeHtml(config.contact.location)} ·
        Email: ${escapeHtml(config.contact.email)} ·
        WhatsApp: ${escapeHtml(config.contact.whatsapp)} ·
        LinkedIn: ${escapeHtml(config.contact.linkedin)} ·
        GitHub: ${escapeHtml(config.contact.github)}
      </p>
    </header>

    <section>
      <h2>Professional Summary</h2>
      <p>${escapeHtml(config.heroSummary)}</p>
      <p>${escapeHtml(config.aboutSummary[config.aboutSummary.length - 1] || '')}</p>
    </section>

    <section>
      <h2>Professional Experience</h2>
      ${experienceBlocks}
    </section>

    <section>
      <h2>Education</h2>
      <div class="item-head">
        <div>
          <h3>Bachelor's Degree in Business Management</h3>
          <p class="org">Karakoram International University · Gilgit-Baltistan, Pakistan</p>
        </div>
        <span class="dates">Recently Completed</span>
      </div>
      <p>Foundation in business strategy, management, organizational development, and decision-making combined with practical digital marketing execution.</p>
    </section>

    <section>
      <h2>Core Competencies</h2>
      <p class="skills-line"><strong>Marketing:</strong> ${marketingList}</p>
      <p class="skills-line"><strong>Business:</strong> ${businessList}</p>
    </section>
  </main>
</body>
</html>`;
}

export function downloadCvFile(config: PortfolioConfig): void {
  const html = buildCvHtmlDocument(config);
  const blob = new Blob([html], {type: 'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${config.fullName.replace(/\s+/g, '_')}_CV.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
