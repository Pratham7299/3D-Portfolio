export const profile = {
  name: "Abhinav Mishra",
  firstName: "Abhinav",
  lastName: "Mishra",
  role: "AI Sales & Marketing Enthusiast",
  headline: ["Turning AI", "Technology into", "Business Growth"],
  location: "Greater Noida, India · Open to remote",
  status: "Available for entry-level roles in Sales, Digital Marketing & Biz Dev",
  email: "abhinav.mishra@example.com",
  linkedin: "https://www.linkedin.com/in/your-linkedin-handle",
  linkedinLabel: "linkedin.com/in/your-linkedin-handle",
  intro:
    "B.Tech Computer Science graduate who speaks two languages: code and customers. I use AI tooling to find, qualify and convert buyers — then I measure everything and cut what does not work.",
};

export const about = {
  paragraphs: [
    "I graduated with a B.Tech in Computer Science, which gave me the thing most marketers struggle to fake: a real understanding of how data, automation and software actually work. Somewhere between building ML notebooks and shipping college web apps, I realised my favourite part wasn't the deploy — it was the answer to \"who is this for, and why would they care?\"",
    "So I pointed the technical side at commercial problems. I build lead-generation pipelines with AI-assisted research, write content that respects attention spans, run social campaigns end-to-end, and use dashboards to keep myself honest. I'm customer-obsessed by default: I'd rather talk to five real users than argue about a colour palette for five hours.",
    "I'm early in my career and I'm not pretending otherwise. What I bring is fast technical learning, structured thinking, and the discipline to document every experiment — including the ones that flopped.",
  ],
  facts: [
    { label: "Degree", value: "B.Tech, Computer Science · 2026" },
    { label: "Focus", value: "AI · Sales · Digital Marketing" },
    { label: "Mode", value: "Greater Noida · Remote / Hybrid" },
    { label: "Learning now", value: "Performance marketing + LLM workflows" },
  ],
  traits: [
    {
      title: "Technical, quickly",
      body: "CS degree plus hands-on Python, SQL and APIs. I automate my own busywork instead of complaining about it.",
      icon: "terminal",
    },
    {
      title: "Customer-first framing",
      body: "I start every campaign with a persona and a pain point, not a product spec sheet.",
      icon: "users",
    },
    {
      title: "Measured, not guessed",
      body: "Every concept project here ships with a metric definition and a review loop, even when the numbers are demo data.",
      icon: "chart",
    },
  ],
};

export type Skill = {
  name: string;
  level: number;
  blurb: string;
  tools: string[];
  category: "Growth" | "Content" | "Technical";
};

export const skills: Skill[] = [
  {
    name: "Lead Generation",
    level: 82,
    blurb: "ICP definition, list building, cold outreach sequences and qualification with AI-assisted research.",
    tools: ["Apollo-style research", "Google Sheets", "ChatGPT", "Hunter-style verification"],
    category: "Growth",
  },
  {
    name: "Social Media Marketing",
    level: 78,
    blurb: "Content calendars, hook-first short-form writing, community handling and paid-organic mixing.",
    tools: ["Meta Business Suite", "Buffer", "Canva", "LinkedIn Creator"],
    category: "Content",
  },
  {
    name: "Content Strategy",
    level: 75,
    blurb: "Topic clusters, funnel-stage mapping (TOFU/MOFU/BOFU) and repurposing one idea across five formats.",
    tools: ["Notion", "Framer", "Hooks bank", "Editorial calendar"],
    category: "Content",
  },
  {
    name: "Customer Communication",
    level: 86,
    blurb: "Discovery calls, objection handling, WhatsApp/email follow-up cadences and CRM hygiene.",
    tools: ["HubSpot-style CRM", "Scripts", "Roleplay", " Zendesk basics"],
    category: "Growth",
  },
  {
    name: "AI Tools",
    level: 88,
    blurb: "Prompt workflows for research + copy, voice agents, transcription pipelines, and light automation with APIs.",
    tools: ["ChatGPT / Claude", "ElevenLabs-style voice", "Whisper", "Zapier / n8n", "OpenAI API"],
    category: "Technical",
  },
  {
    name: "Basic SEO",
    level: 68,
    blurb: "Keyword clustering, on-page structure, schema basics, internal linking and Search Console reading.",
    tools: ["Search Console", "Ahrefs-style research", "Screaming Frog basics"],
    category: "Technical",
  },
];

export const radarAxes = [
  { axis: "Lead Gen", value: 82 },
  { axis: "Social", value: 78 },
  { axis: "Content", value: 75 },
  { axis: "Communication", value: 86 },
  { axis: "AI Tooling", value: 88 },
  { axis: "SEO", value: 68 },
  { axis: "Analytics", value: 74 },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  category: "AI" | "Social" | "Sales" | "Content";
  year: string;
  type: string;
  summary: string;
  role: string;
  problem: string;
  approach: string[];
  stack: string[];
  metrics: { label: string; value: string; note: string }[];
  learnings: string[];
  hue: number;
};

export const projects: Project[] = [
  {
    id: "ai-voice-agent",
    index: "01",
    title: "AI Voice Agent Marketing Campaign",
    kicker: "An AI receptionist that never misses a lead",
    category: "AI",
    year: "2025",
    type: "Concept campaign · practice build",
    summary:
      "A full go-to-market concept for a fictional AI voice agent aimed at local clinics — the pitch, the funnel, the ad copy and the call-flow, built as a portfolio exercise.",
    role: "Concept strategist, copywriter, funnel designer",
    problem:
      "Small clinics lose walk-in-grade leads after 6pm because nobody answers the phone. An AI voice agent is an easy product to explain badly — most demos sound like a robot reading a privacy policy.",
    approach: [
      "Wrote three personas (clinic owner, practice manager, franchise ops) and mapped the single objection each one has.",
      "Built a 4-email + 3-WhatsApp follow-up cadence anchored on a 'missed call report' rather than a feature list.",
      "Designed the call flow: greet → qualify → book → SMS confirmation, with a human handoff at intent ≥ 3.",
      "Scripted a 30-second vertical ad: open on a ringing phone nobody answers, resolve on a booked appointment.",
    ],
    stack: ["ChatGPT", "ElevenLabs-style TTS (demo)", "Whisper-style transcript notes", "Figma wireframes", "Google Sheets CRM"],
    metrics: [
      { label: "Simulated demo reach", value: "18.4K", note: "modelled, not delivered" },
      { label: "Concept CTR", value: "3.1%", note: "practice targeting" },
      { label: "Demo booked calls", value: "42", note: "roleplay + fake data" },
      { label: "Avg. handle time", value: "1m 48s", note: "recorded rehearsals" },
    ],
    learnings: [
      "Voice products sell on trust in the first 8 seconds — the opening line matters more than the whole landing page.",
      "Writing the handoff rule (when the AI stops) was harder, and more important, than writing the greeting.",
    ],
    hue: 258,
  },
  {
    id: "social-promo",
    index: "02",
    title: "Social Media Promotional Campaign",
    kicker: "14 days, one idea, five formats",
    category: "Social",
    year: "2025",
    type: "Concept campaign · practice build",
    summary:
      "A two-week multi-platform promotion for a fictional student-focused study app, built to test whether one strong hook can survive being repurposed across Reels, Shorts, LinkedIn and carousel posts.",
    role: "Content planner, writer, designer (Canva-level)",
    problem:
      "Small brand pages post five different messages instead of one message five times. Reach stays flat because nothing compounds.",
    approach: [
      "Picked one hero insight — 'you don't lack discipline, you lack a 20-minute plan' — and refused to dilute it.",
      "Built a repurposing matrix: hook → talking-head Reel → 3-slide carousel → text post → meme → Story poll.",
      "Scheduled at 3 posting windows per day for 14 days, with a fixed 90-minute engagement reply sprint.",
      "A/B'd two thumbnails and two opening lines; killed the loser on day 5 and doubled down.",
    ],
    stack: ["Meta Business Suite (sandbox)", "Canva", "Notion calendar", "CapCut-style edits", "Google Sheets tracker"],
    metrics: [
      { label: "Planned posts", value: "34", note: "content calendar" },
      { label: "Demo follower lift", value: "+11.2%", note: "simulated growth curve" },
      { label: "Practice saves rate", value: "6.8%", note: "sample audience" },
      { label: "Best hook", value: "Format A", note: "internal A/B" },
    ],
    learnings: [
      "Saves and shares beat likes as an early signal — likes came late, saves came first.",
      "Posting the same idea in a new format beat inventing a new idea every day.",
    ],
    hue: 205,
  },
  {
    id: "lead-gen-strategy",
    index: "03",
    title: "Lead Generation Strategy",
    kicker: "A pipeline for a fictional B2B services offer",
    category: "Sales",
    year: "2025",
    type: "Concept framework · practice build",
    summary:
      "End-to-end outbound system: ICP, list rules, three-angle cold email, LinkedIn touchpoints and a scoring sheet — designed for a made-up 12-person operations consultancy.",
    role: "Pipeline designer, list builder, copywriter",
    problem:
      "Cold outreach usually fails on volume plus vagueness. The fix isn't more emails, it's a tighter list and one specific sentence that proves you did the homework.",
    approach: [
      "Defined ICP: 10–60 employee ops consultancies in metros, founder-led, hiring for delivery roles.",
      "Built qualification rules (BANT-lite) and a 0–100 lead score with hard disqualifiers.",
      "Wrote a 4-step sequence: specific observation → relevant proof → low-friction ask → break-up.",
      "Added a LinkedIn cadence: view → follow → value comment → DM only after profile visit.",
    ],
    stack: ["Sheet-based CRM", "ChatGPT research prompts", "Clearbit-style enrichment (mock)", "Scoring rubric", "Call script"],
    metrics: [
      { label: "Modelled list size", value: "1,200", note: "synthetic dataset" },
      { label: "Concept reply rate", value: "9.4%", note: "projected, not sent" },
      { label: "Qualified per week", value: "17", note: "simulated funnel" },
      { label: "Demo meetings", value: "6", note: "practice dry runs" },
    ],
    learnings: [
      "Scoring leads before contact saved more time than any copywriting tweak.",
      "The break-up email produced the highest reply-to-open ratio in every test I read about — and it stayed true in my rehearsal.",
    ],
    hue: 168,
  },
  {
    id: "ai-product-ad",
    index: "04",
    title: "AI Product Advertisement",
    kicker: "Selling a 'smart' product without the buzzwords",
    category: "Content",
    year: "2025",
    type: "Concept creative · practice build",
    summary:
      "An ad concept for a fictional AI-powered inventory assistant for kirana and D2C sellers — positioning line, 6 ad variants, landing hero and a short film storyboard.",
    role: "Creative lead, copywriter, art director",
    problem:
      "'AI-powered' says nothing. Buyers of a shop-ops tool care about stock-outs, not model architecture — so the ad had to translate capability into a Tuesday morning saved.",
    approach: [
      "Positioning line: 'Know what to reorder before the shelf goes empty.' AI moves to a trust badge.",
      "Wrote 6 variants across three angles: fear of loss, time saved, credibility with suppliers.",
      "Built a landing hero with one number, one animation, one button — under 7 seconds to understand.",
      "Storyboarded a 20-second film: shutter-down night → phone ping → full shelf next morning.",
    ],
    stack: ["Midjourney-style moodboards (concept)", "Figma", "Framer prototype", "Copywriting matrix", "Hotjar-style heatmaps (mock)"],
    metrics: [
      { label: "Ad variants", value: "6", note: "angle matrix" },
      { label: "Concept CPM", value: "₹118", note: "benchmark modelled" },
      { label: "Hero read time", value: "6.4s", note: "5-person hallway test" },
      { label: "Demo CTR", value: "2.3%", note: "illustrative only" },
    ],
    learnings: [
      "Removing the word 'revolutionary' from every draft improved the clarity score of my own copy.",
      "One believable number beats five impressive ones.",
    ],
    hue: 32,
  },
  {
    id: "campaign-dashboard",
    index: "05",
    title: "Interactive Campaign Dashboard",
    kicker: "The measurement layer — built as a working app",
    category: "AI",
    year: "2025 – 2026",
    type: "Concept product · live demo below",
    summary:
      "A single dashboard that ties spend, reach, leads and conversion into one decision view for a fictional multi-channel campaign. Built with React, TypeScript and Chart.js so the filters genuinely work.",
    role: "Designer and front-end builder",
    problem:
      "Campaign reviews die inside four separate platform tabs. A small team needs one answer: where did the money work, and what do we cut on Monday?",
    approach: [
      "Defined 5 metrics with explicit formulas so nobody argues about 'lead' mid-meeting.",
      "Built channel + date-range filters with live KPI recomputation.",
      "Added a trend chart, channel-mix doughnut and a per-campaign table with sorting.",
      "Flagged every dataset as demo data — no fake client results, ever.",
    ],
    stack: ["React 19", "TypeScript", "Chart.js", "Tailwind CSS", "Vite"],
    metrics: [
      { label: "Live demo widgets", value: "9", note: "working on this page" },
      { label: "Channels modelled", value: "4", note: "Meta, Google, LinkedIn, Email" },
      { label: "Filter states", value: "12", note: "range × channel" },
      { label: "Client data", value: "None", note: "synthetic by design" },
    ],
    learnings: [
      "Writing the metric definitions first turned the dashboard from a chart zoo into a decision tool.",
      "Rolling 7-day comparison made the team argue less about noise than any chart type ever could.",
    ],
    hue: 288,
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Listen & segment",
    body: "Talk to real users, define the ICP, and write down the one sentence the buyer should repeat back to a colleague.",
    tag: "Research",
  },
  {
    step: "02",
    title: "Design the funnel",
    body: "Map the journey from cold touch to booked call, then pick the two levers that actually move revenue.",
    tag: "Strategy",
  },
  {
    step: "03",
    title: "Build with AI leverage",
    body: "Draft, edit and automate with LLMs and scripts — but every claim gets human-checked before it ships.",
    tag: "Execution",
  },
  {
    step: "04",
    title: "Measure & cut",
    body: "One dashboard, weekly review, kill the losing variant fast, write a two-line note on why.",
    tag: "Analytics",
  },
];

export const marqueeWords = [
  "Lead Generation",
  "AI Workflows",
  "Digital Marketing",
  "Sales Strategy",
  "Content Systems",
  "SEO Fundamentals",
  "Customer Research",
  "Campaign Analytics",
  "Marketing Automation",
  "Positioning",
];

/* ---------- Demo dataset for the interactive dashboard (synthetic) ---------- */

export const channels = ["Meta Ads", "Google Search", "LinkedIn", "Email / CRM"] as const;
export type Channel = (typeof channels)[number];

export type WeekPoint = {
  week: string;
  spend: number;
  reach: number;
  leads: number;
  conversions: number;
  channel: Channel;
};

const seedReach: Record<Channel, number[]> = {
  "Meta Ads": [42000, 46500, 44100, 51200, 58400, 55100, 61900, 66400, 63800, 71200, 76800, 74100],
  "Google Search": [18400, 19800, 21400, 20700, 23900, 26100, 25200, 28800, 31400, 30100, 33600, 36200],
  LinkedIn: [9600, 10400, 12800, 11900, 14600, 15800, 17400, 16900, 19800, 21400, 22600, 24800],
  "Email / CRM": [7400, 8100, 7900, 9400, 10200, 11100, 12400, 11800, 13600, 14200, 15100, 16800],
};

const seedSpend: Record<Channel, number[]> = {
  "Meta Ads": [26000, 28000, 27000, 31000, 34000, 33000, 36000, 38000, 37000, 41000, 43000, 42000],
  "Google Search": [19000, 20000, 21500, 21000, 23000, 24500, 24000, 26000, 27500, 27000, 29000, 30500],
  LinkedIn: [12000, 12500, 14000, 13500, 15000, 16200, 17000, 16500, 18000, 18800, 19500, 21000],
  "Email / CRM": [3200, 3200, 3400, 3400, 3600, 3600, 3800, 3800, 4000, 4000, 4200, 4200],
};

const leadRate: Record<Channel, number> = {
  "Meta Ads": 0.0062,
  "Google Search": 0.0121,
  LinkedIn: 0.0098,
  "Email / CRM": 0.0245,
};

const convRate: Record<Channel, number> = {
  "Meta Ads": 0.14,
  "Google Search": 0.22,
  LinkedIn: 0.19,
  "Email / CRM": 0.27,
};

export const weeks = [
  "W1 Jan",
  "W2 Jan",
  "W3 Jan",
  "W4 Jan",
  "W1 Feb",
  "W2 Feb",
  "W3 Feb",
  "W4 Feb",
  "W1 Mar",
  "W2 Mar",
  "W3 Mar",
  "W4 Mar",
];

function buildSeries(): WeekPoint[] {
  const rows: WeekPoint[] = [];
  channels.forEach((c) => {
    weeks.forEach((w, i) => {
      const reach = seedReach[c][i];
      const leads = Math.round(reach * leadRate[c]);
      rows.push({
        week: w,
        channel: c,
        spend: seedSpend[c][i],
        reach,
        leads,
        conversions: Math.max(1, Math.round(leads * convRate[c])),
      });
    });
  });
  return rows;
}

export const dashboardSeries: WeekPoint[] = buildSeries();

export const metricDefs = [
  { key: "reach", label: "Reach", formula: "Unique accounts who saw a paid or organic asset", unit: "" },
  { key: "leads", label: "Leads", formula: "Reach × lead rate — a named contact who took one action", unit: "" },
  { key: "conversions", label: "Conversions", formula: "Leads that reached the booked-demo stage", unit: "" },
  { key: "cpa", label: "Cost / Lead", formula: "Spend ÷ Leads (₹)", unit: "₹" },
] as const;

export const campaignRows = [
  {
    name: "Voice Agent — Clinic Pilot",
    channel: "Meta Ads" as Channel,
    spend: 41200,
    reach: 74100,
    leads: 459,
    conversions: 64,
    status: "Live",
  },
  {
    name: "Search — 'AI receptionist' exact",
    channel: "Google Search" as Channel,
    spend: 30500,
    reach: 36200,
    leads: 438,
    conversions: 96,
    status: "Live",
  },
  {
    name: "LinkedIn — Ops founders ABM",
    channel: "LinkedIn" as Channel,
    spend: 21000,
    reach: 24800,
    leads: 243,
    conversions: 46,
    status: "Tuning",
  },
  {
    name: "Missed-Call Report nurture",
    channel: "Email / CRM" as Channel,
    spend: 4200,
    reach: 16800,
    leads: 412,
    conversions: 111,
    status: "Live",
  },
  {
    name: "Reels hook test — batch 3",
    channel: "Meta Ads" as Channel,
    spend: 18400,
    reach: 58000,
    leads: 214,
    conversions: 19,
    status: "Paused",
  },
  {
    name: "Retarget — pricing page only",
    channel: "Google Search" as Channel,
    spend: 9800,
    reach: 12400,
    leads: 131,
    conversions: 34,
    status: "Tuning",
  },
];
