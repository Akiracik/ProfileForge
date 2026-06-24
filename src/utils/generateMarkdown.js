export function generateMarkdown(data) {
  let md = '';

  // --- Header ---
  if (data.headerMode === 'custom') {
    // Custom HTML header
    if (data.customHeaderHtml && data.customHeaderHtml.trim()) {
      md += data.customHeaderHtml.trim() + '\n\n';
    }
  } else {
    // Typing SVG header
    const validLines = (data.typingLines || []).filter(l => l.text.trim());
    if (validLines.length > 0) {
      // Group lines by color so same-colored lines share one SVG
      const colorGroups = {};
      validLines.forEach(line => {
        const c = (line.color || '#ffffff').replace('#', '');
        if (!colorGroups[c]) colorGroups[c] = [];
        colorGroups[c].push(line.text);
      });

      const font = encodeURIComponent(data.typingFont || 'Fira Code');
      const size = data.typingSize || 28;
      const pause = data.typingPause || 1000;
      const duration = data.typingDuration || 3000;
      const width = data.typingWidth || 435;
      const repeat = data.typingRepeat !== false ? 'true' : 'false';
      const random = data.typingRandom ? 'true' : 'false';
      const center = data.typingCenter !== false ? 'true' : 'false';

      const colorKeys = Object.keys(colorGroups);

      if (colorKeys.length === 1) {
        // All same color → single SVG
        const color = colorKeys[0];
        const lines = colorGroups[color].map(t => encodeURIComponent(t)).join(';');
        md += `<div align="center">\n`;
        md += `  <img width="80%" src="https://readme-typing-svg.demolab.com?font=${font}&size=${size}&duration=${duration}&pause=${pause}&color=${color}&center=${center}&width=${width}&repeat=${repeat}&random=${random}&lines=${lines}">\n`;
        md += `</div>\n\n`;
      } else {
        // Different colors → one SVG per color group, stacked
        md += `<div align="center">\n`;
        colorKeys.forEach(color => {
          const lines = colorGroups[color].map(t => encodeURIComponent(t)).join(';');
          md += `  <img width="80%" src="https://readme-typing-svg.demolab.com?font=${font}&size=${size}&duration=${duration}&pause=${pause}&color=${color}&center=${center}&width=${width}&repeat=${repeat}&random=${random}&lines=${lines}">\n  <br>\n`;
        });
        md += `</div>\n\n`;
      }
    }
  }

  // --- Visitor Counter ---
  if (data.showVisitorCounter && data.github) {
    md += `<div align="center">\n`;
    md += `  <img src="https://komarev.com/ghpvc/?username=${data.github}&color=111111&style=flat-square">\n`;
    md += `</div>\n\n`;
  }

  // --- Social Links ---
  const socials = [];
  if (data.discord) socials.push(`  <a href="https://discord.com/users/${data.discord}" target="_blank"><img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"></a>`);
  if (data.spotify) socials.push(`  <a href="https://open.spotify.com/user/${data.spotify}" target="_blank"><img src="https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white"></a>`);
  if (data.linkedin) socials.push(`  <a href="https://linkedin.com/in/${data.linkedin}" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>`);
  if (data.twitter) socials.push(`  <a href="https://twitter.com/${data.twitter}" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"></a>`);
  if (data.youtube) socials.push(`  <a href="https://youtube.com/@${data.youtube}" target="_blank"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white"></a>`);
  if (data.instagram) socials.push(`  <a href="https://instagram.com/${data.instagram}" target="_blank"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white"></a>`);
  if (data.email) socials.push(`  <a href="mailto:${data.email}" target="_blank"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a>`);
  if (data.website) socials.push(`  <a href="${data.website}" target="_blank"><img src="https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=google-chrome&logoColor=white"></a>`);

  if (socials.length > 0) {
    md += `<div align="center">\n${socials.join('\n')}\n</div>\n\n`;
  }

  // --- Separator ---
  const hasHeader = data.headerMode === 'custom' ? (data.customHeaderHtml && data.customHeaderHtml.trim()) : ((data.typingLines || []).some(l => l.text.trim()));
  if (hasHeader || socials.length > 0) {
    md += `---\n\n`;
  }

  // --- About Me ---
  if (data.aboutTitle || data.aboutDescription) {
    md += `## 💻 ${data.aboutTitle || 'About Me'}\n\n`;
  }

  if (data.aboutDescription || data.aboutBullets.some(b => b.trim())) {
    md += `<table align="center" width="100%">\n  <tr>\n`;
    
    const hasStats = data.showTopLangs && data.github;
    const tdWidth = hasStats ? '55%' : '100%';

    md += `    <td width="${tdWidth}" valign="top">\n`;
    if (data.aboutDescription) {
      md += `      <p>${data.aboutDescription}</p>\n`;
    }
    const validBullets = data.aboutBullets.filter(b => b.trim());
    if (validBullets.length > 0) {
      md += `      <ul>\n`;
      validBullets.forEach(b => {
        md += `        <li>${b}</li>\n`;
      });
      md += `      </ul>\n`;
    }
    md += `    </td>\n`;

    if (hasStats) {
      md += `    <td width="45%" valign="top" align="center">\n`;
      md += `      <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=dark&hide_border=true&bg_color=00000000&title_color=ffffff&text_color=aaaaaa" width="100%">\n`;
      md += `    </td>\n`;
    }
    md += `  </tr>\n</table>\n\n---\n\n`;
  }

  // --- Tech Stack ---
  if (data.skills && data.skills.length > 0) {
    md += `## 🛠️ Tech Stack & Ecosystem\n\n`;

    const grouped = {};
    data.skills.forEach(skill => {
      const cat = skill.category || 'Other';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(skill);
    });

    const catEmojis = {
      'Frontend': '🌐', 'Backend': '⚡', 'Database': '🗄️',
      'DevOps': '☁️', 'Game & Design': '🎮', 'Mobile': '📱',
      'AI & Data': '🤖', 'Tools': '🧰'
    };

    Object.entries(grouped).forEach(([cat, items]) => {
      md += `### ${catEmojis[cat] || '📦'} ${cat}\n<p align="left">\n`;
      items.forEach(item => {
        const lc = item.logoColor || 'white';
        md += `  <img src="https://img.shields.io/badge/${encodeURIComponent(item.label)}-${item.color}?style=flat-square&logo=${item.logo}&logoColor=${lc}">\n`;
      });
      md += `</p>\n\n`;
    });
    md += `---\n\n`;
  }

  // --- GitHub Stats ---
  if (data.github && (data.showActivityGraph || data.showGithubStats || data.showStreak)) {
    md += `## 📊 Activity Metrics\n\n`;

    if (data.showActivityGraph) {
      md += `<div align="center">\n`;
      md += `  <img width="85%" src="https://github-readme-activity-graph.vercel.io/graph?username=${data.github}&theme=react-dark&hide_border=true&bg_color=00000000&color=ffffff">\n`;
      md += `</div>\n\n<br>\n\n`;
    }

    if (data.showGithubStats) {
      md += `<div align="center">\n`;
      md += `  <img width="80%" src="https://awesome-github-stats.azurewebsites.net/user-stats/${data.github}?cardType=github&theme=github-dark&showIcons=true&preferLogin=false&Ring=ffffff&Title=ffffff&Background=00000000">\n`;
      md += `</div>\n\n<br>\n\n`;
    }

    if (data.showStreak) {
      md += `<div align="center">\n`;
      md += `  <img width="80%" src="https://github-readme-streak-stats.herokuapp.com?user=${data.github}&theme=dark&hide_border=true&stroke=ffffff&fire=ffffff&currStreakNum=DDDDDD&currStreakLabel=ffffff&ring=ffffff&background=00000000">\n`;
      md += `</div>\n\n`;
    }
  }

  // --- Discord Presence (Lanyard) ---
  if (data.discord) {
    md += `---\n\n`;
    md += `<div align="center">\n`;
    md += `  <a href="https://discord.com/users/${data.discord}">\n`;
    md += `    <img src="https://lanyard.cnrad.dev/api/${data.discord}?theme=dark&bg=00000000" alt="Discord Status" />\n`;
    md += `  </a>\n`;
    md += `</div>\n`;
  }

  return md;
}
