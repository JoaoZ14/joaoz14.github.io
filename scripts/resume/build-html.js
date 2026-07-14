const { contact, skills } = require("./content");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderTags(items, className = "tag") {
  return items.map((item) => `<span class="${className}">${escapeHtml(item)}</span>`).join("");
}

function renderSoftSkills(items) {
  return items.map((item) => `<div class="soft-skill-item">${escapeHtml(item)}</div>`).join("");
}

function buildResumeHtml(resume, logoDataUri) {
  const { sections } = resume;
  const exp = resume.experience;

  const rolesHtml = exp.roles
    .map(
      (role) => `
        <div class="experience-role">
          <div class="experience-role-title">${escapeHtml(role.title)}</div>
          <div class="experience-role-period">${escapeHtml(role.period)}</div>
        </div>`
    )
    .join("");

  const languagesHtml = resume.languages
    .map((lang) => {
      const note = lang.note ? `<span class="lang-note">${escapeHtml(lang.note)}</span>` : "";
      return `
        <div class="lang-item">
          <span class="lang-name">${escapeHtml(lang.name)}</span>
          <span class="lang-level">${escapeHtml(lang.level)}</span>
          ${note}
        </div>`;
    })
    .join("");

  const skillStripesHtml = [
    { label: sections.frontend, items: skills.frontend },
    { label: sections.backend, items: skills.backend },
    { label: sections.otherTech, items: skills.other },
  ]
    .map(
      (group) => `
        <div class="skill-stripe">
          <div class="skill-stripe-label">${escapeHtml(group.label)}</div>
          <div class="tags">${renderTags(group.items)}</div>
        </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="${escapeHtml(resume.lang)}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(resume.name)} — CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #ffffff;
      --ink: #000000;
      --text: #0a0a0a;
      --text-2: #4b4b4b;
      --text-3: #8a8a8a;
      --line: #000000;
      --line-soft: #e2e2e2;

      --space-xs: 8px;
      --space-sm: 12px;
      --space-md: 16px;
      --space-lg: 24px;
      --space-xl: 32px;
      --space-2xl: 48px;

      --page-x: 16mm;
      --page-y-top: 14mm;
      --page-y-bottom: 18mm;
      --footer-h: 10mm;
    }

    @page {
      size: A4;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: "Inter", system-ui, sans-serif;
      font-size: 9.5pt;
      line-height: 1.48;
      color: var(--text);
      background: var(--bg);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      padding:
        var(--page-y-top)
        var(--page-x)
        calc(var(--page-y-bottom) + var(--footer-h));
      position: relative;
      page-break-after: always;
      background:
        radial-gradient(var(--line-soft) 1px, transparent 1px) 0 0 / 22px 22px,
        var(--bg);
    }

    .page:last-child {
      page-break-after: auto;
    }

    .header {
      display: grid;
      grid-template-columns: 68px 1fr;
      gap: var(--space-md);
      align-items: start;
      padding-bottom: var(--space-sm);
      border-bottom: 1px solid var(--line);
      margin-bottom: var(--space-lg);
    }

    .logo {
      width: 68px;
      height: auto;
      display: block;
      filter: brightness(0);
    }

    .header-main {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .name {
      font-family: "Archivo", sans-serif;
      font-weight: 900;
      font-size: 21pt;
      line-height: 0.96;
      letter-spacing: -0.04em;
      color: var(--ink);
      text-wrap: balance;
    }

    .header-role {
      font-family: "JetBrains Mono", monospace;
      font-size: 7.5pt;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-2);
      max-width: 52ch;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--space-xs) var(--space-md);
      margin-top: var(--space-xs);
      font-size: 8pt;
      color: var(--text-2);
    }

    .contact-item {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: var(--space-xs);
      min-width: 0;
      align-items: baseline;
    }

    .contact-label {
      font-family: "JetBrains Mono", monospace;
      font-size: 6.5pt;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-3);
      white-space: nowrap;
    }

    .contact-value {
      color: var(--text);
      word-break: break-word;
    }

    .kicker {
      font-family: "JetBrains Mono", monospace;
      font-size: 7.5pt;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-2);
      margin-bottom: var(--space-xs);
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }

    .kicker::before {
      content: "";
      width: 24px;
      height: 1px;
      background: var(--ink);
      flex-shrink: 0;
    }

    .section {
      margin-bottom: var(--space-md);
    }

    .section--primary {
      margin-bottom: var(--space-md);
    }

    .section--compact {
      margin-bottom: var(--space-sm);
    }

    .summary {
      color: var(--text-2);
      max-width: 72ch;
      text-wrap: pretty;
    }

    .company {
      font-family: "Archivo", sans-serif;
      font-weight: 800;
      font-size: 11.5pt;
      letter-spacing: -0.02em;
      margin-bottom: var(--space-sm);
      color: var(--ink);
    }

    .experience-role + .experience-role {
      margin-top: var(--space-sm);
      padding-top: var(--space-sm);
      border-top: 1px solid var(--line-soft);
    }

    .experience-role-title {
      font-weight: 600;
      color: var(--text);
      font-size: 9.5pt;
      line-height: 1.3;
    }

    .experience-role-period {
      font-family: "JetBrains Mono", monospace;
      font-size: 7.5pt;
      letter-spacing: 0.04em;
      color: var(--text-3);
      margin-top: 2px;
    }

    ul.bullets {
      list-style: none;
      margin-top: var(--space-sm);
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    ul.bullets li {
      position: relative;
      padding-left: var(--space-sm);
      color: var(--text-2);
      font-size: 8.75pt;
      line-height: 1.5;
      text-wrap: pretty;
    }

    ul.bullets li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.58em;
      width: 4px;
      height: 4px;
      background: var(--ink);
    }

    .edu-text,
    .course-list {
      color: var(--text-2);
      font-size: 9pt;
      line-height: 1.45;
    }

    .course-list {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--space-sm) var(--space-lg);
      margin-top: var(--space-xs);
    }

    .course-list li {
      padding-left: var(--space-sm);
      border-left: 1px solid var(--line-soft);
    }

    .languages-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--space-lg);
      align-items: start;
    }

    .lang-item {
      display: flex;
      flex-wrap: wrap;
      gap: 4px var(--space-xs);
      align-items: baseline;
      color: var(--text-2);
      font-size: 9pt;
    }

    .lang-name {
      font-weight: 600;
      color: var(--text);
    }

    .lang-level {
      font-family: "JetBrains Mono", monospace;
      font-size: 7.5pt;
      letter-spacing: 0.04em;
      color: var(--text-3);
    }

    .lang-note {
      width: 100%;
      font-size: 8pt;
      color: var(--text-3);
      line-height: 1.4;
    }

    .skills-block {
      margin-top: 0;
      padding-top: 0;
      border-top: none;
      page-break-inside: avoid;
    }

    .skills-subheading {
      font-family: "JetBrains Mono", monospace;
      font-size: 7pt;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-3);
      margin: 0 0 var(--space-sm);
    }

    .skill-stripe {
      display: grid;
      grid-template-columns: 88px minmax(0, 1fr);
      gap: var(--space-md);
      align-items: start;
      padding: var(--space-sm) 0;
      border-bottom: 1px solid var(--line-soft);
    }

    .skill-stripe:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .skill-stripe-label {
      font-family: "JetBrains Mono", monospace;
      font-size: 7pt;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-3);
      padding-top: 3px;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .tag {
      display: inline-block;
      padding: 3px 6px;
      border: 1px solid var(--line-soft);
      font-family: "JetBrains Mono", monospace;
      font-size: 6.75pt;
      letter-spacing: 0.02em;
      color: var(--text);
      background: var(--bg);
      line-height: 1.25;
    }

    .tag--soft {
      border-color: var(--line-soft);
      color: var(--text-2);
    }

    .soft-skills-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--space-xs) var(--space-lg);
      margin-top: var(--space-xs);
    }

    .soft-skill-item {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      font-size: 9pt;
      color: var(--text-2);
    }

    .soft-skill-item::before {
      content: "";
      width: 4px;
      height: 4px;
      background: var(--ink);
      flex-shrink: 0;
    }

    .page--skills .skill-stripe {
      padding: var(--space-md) 0;
    }

    .page--skills .skill-stripe:first-of-type {
      padding-top: 0;
    }

    .page-footer {
      position: absolute;
      left: var(--page-x);
      right: var(--page-x);
      bottom: var(--page-y-bottom);
      padding-top: var(--space-xs);
      border-top: 1px solid var(--line-soft);
      display: flex;
      justify-content: space-between;
      font-family: "JetBrains Mono", monospace;
      font-size: 7pt;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--text-3);
    }
  </style>
</head>
<body>
  <div class="page">
    <header class="header">
      <img class="logo" src="${logoDataUri}" alt="Logo" />
      <div class="header-main">
        <h1 class="name">${escapeHtml(resume.name)}</h1>
        <p class="header-role">${escapeHtml(resume.role)}</p>
        <div class="contact-grid">
          <div class="contact-item">
            <span class="contact-label">${escapeHtml(resume.contactLabels.phone)}</span>
            <span class="contact-value">${escapeHtml(contact.phone)}</span>
          </div>
          <div class="contact-item">
            <span class="contact-label">${escapeHtml(resume.contactLabels.email)}</span>
            <span class="contact-value">${escapeHtml(contact.email)}</span>
          </div>
          <div class="contact-item">
            <span class="contact-label">${escapeHtml(resume.contactLabels.github)}</span>
            <span class="contact-value">${escapeHtml(contact.githubLabel)}</span>
          </div>
          <div class="contact-item">
            <span class="contact-label">${escapeHtml(resume.contactLabels.linkedin)}</span>
            <span class="contact-value">${escapeHtml(contact.linkedinLabel)}</span>
          </div>
          <div class="contact-item" style="grid-column: 1 / -1;">
            <span class="contact-label">${escapeHtml(resume.contactLabels.portfolio)}</span>
            <span class="contact-value">${escapeHtml(contact.portfolioLabel)}</span>
          </div>
        </div>
      </div>
    </header>

    <section class="section section--primary">
      <h2 class="kicker">${escapeHtml(sections.summary)}</h2>
      <p class="summary">${escapeHtml(resume.summary)}</p>
    </section>

    <section class="section section--primary">
      <h2 class="kicker">${escapeHtml(sections.experience)}</h2>
      <div class="company">${escapeHtml(exp.company)}</div>
      ${rolesHtml}
      <ul class="bullets">${renderList(exp.bullets)}</ul>
    </section>

    <section class="section section--primary">
      <h2 class="kicker">${escapeHtml(sections.education)}</h2>
      <p class="edu-text">${escapeHtml(resume.education)}</p>
    </section>

    <section class="section section--primary">
      <h2 class="kicker">${escapeHtml(sections.courses)}</h2>
      <ul class="course-list">${renderList(resume.courses)}</ul>
    </section>

    <section class="section section--primary">
      <h2 class="kicker">${escapeHtml(sections.languages)}</h2>
      <div class="languages-row">${languagesHtml}</div>
    </section>

    <div class="page-footer">
      <span>${escapeHtml(resume.name)}</span>
      <span>01</span>
    </div>
  </div>

  <div class="page page--skills">
    <section class="skills-block section--primary">
      <h2 class="kicker">${escapeHtml(sections.technicalSkills)}</h2>
      <p class="skills-subheading">${escapeHtml(sections.hardSkills)}</p>
      ${skillStripesHtml}
    </section>

    <section class="section section--primary">
      <h2 class="kicker">${escapeHtml(sections.softSkills)}</h2>
      <div class="soft-skills-row">${renderSoftSkills(resume.softSkills)}</div>
    </section>

    <div class="page-footer">
      <span>${escapeHtml(resume.name)}</span>
      <span>02</span>
    </div>
  </div>
</body>
</html>`;
}

module.exports = { buildResumeHtml };
