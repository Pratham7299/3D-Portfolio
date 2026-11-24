import { about, profile, projects, skills } from "@/data/content";

export function resumeHTML() {
  const row = (l: string, r: string) =>
    `<tr><td class="l">${l}</td><td class="r">${r}</td></tr>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8" />
<title>${profile.name} — Résumé</title>
<style>
  @page { margin: 16mm; }
  :root { --ink:#0d1638; --mut:#5a6680; --accent:#2f4fb0; }
  * { box-sizing:border-box; }
  body { font-family: "Manrope", "Helvetica Neue", Arial, sans-serif; color:#141a2b; margin:0; padding:34px 38px; background:#fff; line-height:1.5; }
  h1 { font-size:30px; letter-spacing:-.02em; margin:0 0 2px; color:var(--ink); }
  .role { font-size:13px; color:var(--accent); font-weight:700; text-transform:uppercase; letter-spacing:.16em; }
  .meta { font-size:12px; color:var(--mut); margin-top:6px; }
  h2 { font-size:11px; text-transform:uppercase; letter-spacing:.2em; color:var(--accent); margin:22px 0 8px; padding-bottom:5px; border-bottom:1px solid #e4e8f2; }
  p { font-size:12.5px; margin:0 0 8px; }
  ul { margin:0 0 10px; padding-left:16px; }
  li { font-size:12.5px; margin-bottom:5px; }
  table { width:100%; border-collapse:collapse; }
  td { padding:4px 0; font-size:12.5px; vertical-align:top; }
  td.l { color:var(--mut); width:34%; }
  td.r { font-weight:600; color:var(--ink); }
  .proj { break-inside:avoid; border-left:3px solid #cdd8f5; padding:2px 0 2px 12px; margin-bottom:12px; }
  .proj b { font-size:13.5px; color:var(--ink); }
  .tag { display:inline-block; font-size:10.5px; background:#eef2ff; color:#3350a8; border-radius:20px; padding:2px 9px; margin:0 4px 4px 0; }
  .foot { margin-top:26px; padding-top:10px; border-top:1px solid #e4e8f2; font-size:10.5px; color:#8a94ab; }
  @media print { body { padding:0; } }
</style></head><body>
<h1>${profile.name}</h1>
<div class="role">${profile.role}</div>
<div class="meta">${profile.email} · ${profile.linkedin} · ${profile.location}</div>

<h2>Profile</h2>
<p>${profile.intro}</p>
<p>B.Tech Computer Science graduate. ${about.paragraphs[2]}</p>

<h2>Education</h2>
${row("Degree", "B.Tech — Computer Science &amp; Engineering, graduated 2026")}
${row("Based in", "Greater Noida, India · open to remote / hybrid")}
${row("Focus", "AI tooling, data analysis, web engineering")}
${row("Self-study", "Performance marketing, sales messaging, SEO, analytics")}

<h2>Skills</h2>
<table>${skills
  .map((s) => row(s.name, `${s.blurb} <div class="meta">Tools: ${s.tools.join(", ")}</div>`))
  .join("")}</table>

<h2>Concept projects <span style="text-transform:none;letter-spacing:0;color:#8a94ab">(practice work — synthetic metrics)</span></h2>
${projects
  .map(
    (p) => `<div class="proj"><b>${p.title}</b> <span style="color:#8a94ab;font-size:11.5px">· ${p.year} · ${p.type}</span>
<p>${p.summary}</p>
<ul>${p.approach.slice(0, 3).map((a) => `<li>${a}</li>`).join("")}</ul>
<div>${p.stack.map((t) => `<span class="tag">${t}</span>`).join("")}</div></div>`,
  )
  .join("")}

<h2>Working principles</h2>
<ul>${about.traits.map((t) => `<li><b>${t.title}.</b> ${t.body}</li>`).join("")}</ul>

<div class="foot">Concept portfolio résumé. All campaign figures shown elsewhere in the portfolio are illustrative demo data and are not client results. Generated ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.</div>
</body></html>`;
}

export function downloadResume() {
  const blob = new Blob([resumeHTML()], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Abhinav-Mishra-Resume.html";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function printResume() {
  const w = window.open("", "_blank", "width=920,height=1100");
  if (!w) {
    downloadResume();
    return;
  }
  w.document.write(resumeHTML());
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 450);
}
