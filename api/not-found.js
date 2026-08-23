// shared/portfolio.json
var portfolio_default = {
  HEADER_DISPLAY_NAME: "Arth",
  X_USERNAME: "user64bit",
  GITHUB_USERNAME: "0xuser64bit",
  DISPLAYNAME: "Arth",
  GITHUB_QUOTE: "Debugging",
  ABOUT_YOU: "Full-stack dev. Web3 & AI. Shipping code, breaking things, fixing them.",
  JOINED_DATE: "June 2019",
  LOCATION: "India",
  WEBSITE: "user64bit.wtf",
  GITHUB_FOLLOWERS: 50,
  CONTACT_EMAIL: "jack@user64bit.world",
  PINNED_TWEET: {
    content: "Full-stack dev building at the intersection of Web3 & AI. Ex-Odoo. I ship fast and break things (then fix them). Currently freelancing — let's build something together.",
    cta_text: "Get in touch",
    cta_link: "mailto:jack@user64bit.world"
  },
  EducationData: [
    {
      date: "",
      title: "Bachelor of Engineering in Computer Science",
      description: "Completed a B.E. in Computer Science with a focus on software development, algorithms, and system design. Built multiple full-stack projects and contributed to open source throughout."
    }
  ],
  ExperienceData: [
    {
      timeline: "July 2026 - Present",
      company_name: "Member At Superteam",
      description: "Contributing to the Superteam ecosystem, collaborating with top builders in the Solana community on impactful Web3 projects and initiatives."
    },
    {
      timeline: "October 2024 - Present",
      company_name: "Freelancer",
      description: "Building full-stack Web3 and AI products for clients. Won hackathon awards and bounties. Active open source contributor across multiple ecosystems."
    },
    {
      timeline: "April 2023 - September 2024",
      company_name: "Odoo Private Limited",
      description: "Accelerated product development cycles resulting in faster releases. Debugged and improved core product stability. Collaborated with cross-functional teams to solve complex technical challenges."
    }
  ],
  SkillsData: {
    "Programming Languages": [
      "Python",
      "C/C++",
      "JavaScript/TypeScript",
      "Rust"
    ],
    Tools: [
      "React",
      "Node.js",
      "Next.js",
      "Redux Toolkit",
      "Git",
      "Docker",
      "Prisma"
    ],
    OS: [
      "Ubuntu",
      "Kali Linux",
      "Windows"
    ],
    Databases: [
      "MongoDB",
      "PostgreSQL",
      "MySQL"
    ]
  },
  ProjectsData: [
    {
      projectName: "Praxis",
      listItems: [
        "A conversational Solana agent: you type intent in plain language — 'send 0.5 SOL to maya' — and it becomes a typed, simulated on-chain action. The safety thesis is one sentence: the agent may interpret intent, but the program enforces the envelope. Aegis, an Anchor program, validates every transfer on-chain against an owner-defined policy — signer, pause, expiry, per-transaction cap, rolling daily cap, recipient allow-list, and SPL mint/token limits — before any value leaves the vault, so a jailbroken LLM or compromised backend stays bounded by the policy, not by prompt quality. Intent is parsed (Google Gemini, or a local deterministic parser for $0 demos), recipients resolve through an off-chain address book, and each action is simulated into a proposal card showing the fee, simulation result, and Aegis verdict before you confirm. Owner actions stay wallet-signed and the backend never holds the owner key. Ships with @usepraxis/sdk, a typed Node client, and a LiteSVM enforcement test gate."
      ],
      githubLink: "https://github.com/0xuser64bit/Praxis",
      liveProject: "https://usepraxis.fun",
      techStack: "NextJS, TypeScript, Rust, Anchor, Solana, Google Gemini, LiteSVM, Bun",
      demoVideo: "https://youtu.be/z0yIJZNeoZo"
    },
    {
      projectName: "Get Toasted",
      listItems: [
        "Production SaaS that scans any Solana wallet for sandwich attacks and quantifies the USD lost to MEV. A typed detection pipeline in @get-toasted/core classifies front-run, victim, and back-run sets per slot with confidence scoring, priced via Jupiter Lite quotes. Real-time detection runs through HMAC-verified Helius webhooks; historical scans are paginated through BullMQ workers. Validated against Jito bundle ground truth with a 30/30 match rate. Turborepo monorepo: Next.js 16 dashboard, Hono API, and four dedicated workers (scanner, detector, risk-analyzer, validator-refresh) backed by Neon Postgres and Upstash Redis. Auth is Sign In With Solana, ed25519 verified, JWT issued."
      ],
      githubLink: "https://github.com/0xuser64bit/GetToasted",
      liveProject: "https://gettoasted.fun",
      techStack: "NextJS, Hono, TypeScript, Drizzle, Neon Postgres, BullMQ, Upstash Redis, Turborepo, Helius, Jupiter, @solana/kit, Zod",
      demoVideo: "https://youtu.be/vOCxDbhjxD0"
    },
    {
      projectName: "ChibiTown",
      listItems: [
        "A cozy 2D virtual town where your team hangs out together — presence without a grid of video tiles. Sign in, pick a character (Adam, Ash, Lucy, or Nancy), and drop into a shared pixel-art room where you walk around with WASD and see everyone else move in real time, complete with name labels and a live roster. Rooms are shareable by ID across themed Tiled maps — a 40×30 office and a 24×18 rooftop garden — with collision derived from the same solid layers the scene renders, so client and server agree on the playable area. Turborepo monorepo: a Vite + React + Redux + Phaser game client, an Express REST API (JWT + scrypt auth, users, spaces, avatars, maps), a WebSocket room server for presence and tile movement, and a Prisma/Postgres package, all covered by an end-to-end integration suite."
      ],
      githubLink: "https://github.com/0xuser64bit/ChibiTown",
      liveProject: "#",
      techStack: "React, Vite, Redux Toolkit, Phaser, TailwindCSS, Express, WebSocket, Prisma, PostgreSQL, Turborepo, TypeScript",
      demoVideo: "https://youtu.be/Whr1wNQ97Tc"
    },
    {
      projectName: "RugPulse",
      listItems: [
        "Real-time Solana new-token intelligence powered by Birdeye — detect momentum, expose concentration, flag obvious risk. Pulls fresh launches from six Birdeye Data Service endpoints, enriches each with security, holder, trader, and OHLCV data server-side, then scores them with a deterministic, auditable engine: an Alpha Score (0–100) weighing liquidity, volume, trades, and momentum, and a Rug Risk Score (0–100) reading top-holder concentration plus freeze/mint authority and metadata flags straight from token_security. Every score ships with per-factor explanations and a trader-readable verdict — Watch, Caution, Avoid, or Neutral. A radar of the latest scans, per-token detail pages with charts and holder distribution, ranked leaderboards, a Telegram alert bot (@RugPulseBot) with tunable thresholds, and one-click X-post drafts. No wallet connection, no swaps — just a fast signal, and the API key never reaches the browser."
      ],
      githubLink: "https://github.com/0xuser64bit/RugPulse",
      liveProject: "https://rugpulse.user64bit.wtf",
      techStack: "NextJS, TypeScript, TailwindCSS, Recharts, Supabase Postgres, Birdeye API, Telegram Bot API"
    },
    {
      projectName: "DAOnation",
      listItems: [
        "A decentralized 'Buy Me a Coffee' platform for creators on Solana. Supporters send crypto contributions through unique profile links with personalized messages and custom amounts. Creators get a dashboard to track earnings, manage contributions, and set goals."
      ],
      githubLink: "https://github.com/0xuser64bit/daonation",
      liveProject: "https://daonation.vercel.app",
      techStack: "NextJS, TailwindCSS, TypeScript, Prisma, @solana/web3.js",
      demoVideo: "https://s3.ap-south-1.amazonaws.com/bucket.arthprajapati.com/daonation-demo.mp4"
    },
    {
      projectName: "PollChain",
      listItems: [
        "Decentralized voting platform built on Solana. Every vote is immutable, verifiable, and tamper-proof. Create polls, cast votes, and view results — all on-chain with full transparency."
      ],
      githubLink: "https://github.com/0xuser64bit/poll-chain",
      liveProject: "https://poll-chain.vercel.app",
      techStack: "NextJS, TailwindCSS, TypeScript, Rust, Anchor, @solana/web3.js",
      demoVideo: "https://s3.ap-south-1.amazonaws.com/bucket.arthprajapati.com/Pollchain_demo.mkv"
    },
    {
      projectName: "Ask Genie",
      listItems: [
        "A privacy-first Chrome extension (Manifest V3) that lets you chat with AI about the page you're currently reading — bring your own key, with no backend and no shared infrastructure. A floating genie lamp summons a Shadow-DOM chat panel that grounds answers in the page's extracted main content, with one-click quick actions: Summarize, Key insights, Explain simply, Action items, and Translate. Each page keeps its own conversation in local storage, auto-deleted 24 hours after it starts. Your API key lives only in the background service worker and is sent only to your chosen provider's official endpoint (OpenAI or Anthropic) — it never touches the content script or any web page. Built with Vite, React, and @crxjs/vite-plugin around a framework-free, unit-tested core for providers, page extraction, and Markdown rendering."
      ],
      githubLink: "https://github.com/0xuser64bit/ask-genie",
      liveProject: "#",
      techStack: "React, Vite, TypeScript, Chrome Extension Manifest V3, @crxjs/vite-plugin, OpenAI API, Anthropic API"
    },
    {
      projectName: "Dev DNA",
      listItems: [
        "A cinematic GitHub profile analyzer that turns any username into a developer identity report. Fetches profile, repos, and language stats from the GitHub API, scores the user against archetype profiles, and visualizes the result through animated terminal sequences, a custom canvas language chart, and an archetype card. UI is built around a glassmorphism landing card with an animated grid, floating particles, and a DNA-inspired background, all powered by framer-motion."
      ],
      githubLink: "https://github.com/0xuser64bit/dev-dna",
      liveProject: "#",
      techStack: "NextJS, TypeScript, TailwindCSS, framer-motion, GitHub API"
    },
    {
      projectName: "Get-Git",
      listItems: [
        "Explore GitHub profiles in a beautiful and interactive way. Visualize contributions, repositories, and activity with a clean, modern UI."
      ],
      githubLink: "https://github.com/0xuser64bit/get-git",
      liveProject: "https://get-git.user64bit.wtf",
      techStack: "NextJS, TailwindCSS, TypeScript, GitHub API",
      demoVideo: "https://s3.ap-south-1.amazonaws.com/bucket.arthprajapati.com/get-git.mkv"
    },
    {
      projectName: "DD-Agent",
      listItems: [
        "AI-powered health optimization platform based on Bryan Johnson's 'Don't Die Blueprint.' Get personalized health recommendations and longevity insights through an interactive chat interface."
      ],
      githubLink: "https://github.com/0xuser64bit/dd-agent",
      liveProject: "https://dd-agent-ruby.vercel.app",
      techStack: "NextJS, TailwindCSS, TypeScript, OpenAI API",
      demoVideo: "https://s3.ap-south-1.amazonaws.com/bucket.arthprajapati.com/dd-agent.mkv"
    },
    {
      projectName: "Echo-GPT",
      listItems: [
        "Chrome extension that enhances ChatGPT with bookmark and pinned conversations. Never lose an important conversation again — pin your favorites and organize your AI chat history."
      ],
      githubLink: "https://github.com/0xuser64bit/echo-gpt",
      liveProject: "#",
      techStack: "React, TypeScript, Vite, TailwindCSS, Chrome Extension Manifest V3",
      demoVideo: "https://s3.ap-south-1.amazonaws.com/bucket.arthprajapati.com/Echo+GPT+Demo.mp4"
    },
    {
      projectName: "suchi",
      listItems: [
        "A lightweight, fast task manager written in Rust. Manage tasks from the command line with simple commands to add, edit, complete, and delete. Published on crates.io."
      ],
      githubLink: "https://github.com/0xuser64bit/suchi",
      liveProject: "https://crates.io/crates/suchi",
      techStack: "Rust"
    },
    {
      projectName: "The TweetFolio",
      listItems: [
        "This portfolio site you're looking at right now. A Twitter/X-inspired portfolio built with React and TailwindCSS. Showcases projects, experience, and contributions through a familiar social media interface."
      ],
      githubLink: "https://github.com/0xuser64bit/The-TweetFolio",
      liveProject: "https://user64bit.wtf",
      techStack: "React, TailwindCSS, TypeScript"
    },
    {
      projectName: "Notebook",
      listItems: [
        "A Notion-like collaborative note-taking platform with recursive data structures for hierarchical organization, markdown support, rich media, dark/light themes, and full-text search."
      ],
      githubLink: "https://github.com/0xuser64bit/notebook",
      liveProject: "#",
      techStack: "NextJS, Convex, TailwindCSS, ShadcnUI, TypeScript"
    },
    {
      projectName: "Canteen",
      listItems: [
        "Anonymous discussion platform for university students. Connect across campuses to share thoughts on academics, career paths, and campus life without fear of judgment."
      ],
      githubLink: "https://github.com/0xuser64bit/canteen",
      liveProject: "#",
      techStack: "NextJS, TailwindCSS, TypeScript, Prisma"
    }
  ],
  ContributionData: [
    {
      title: "Fix Multi Processing Issue in Deauthentication Script",
      link: "https://github.com/iamEzmuth/DeAuthImposter/pull/4",
      status: "merged"
    },
    {
      title: "Add Edit and Delete Task Feature to Time-Managment-Tool",
      link: "https://github.com/AthenaFoss/Time-Managment-Tool/pull/34",
      status: "merged"
    },
    {
      title: "Add Progress Bar to Time-Managment-Tool",
      link: "https://github.com/AthenaFoss/Time-Managment-Tool/pull/31",
      status: "merged"
    },
    {
      title: "Implemented Feature of Import/Export Bookmarks",
      link: "https://github.com/medyo/hackertab.dev/issues/156",
      status: "merged"
    },
    {
      title: "Add Wishlist feature to Ecommerce website",
      link: "https://github.com/ravi300601/EasyCart/pull/1",
      status: "merged"
    },
    {
      title: "Handle case where Repository name has a dot",
      link: "https://github.com/open-sauced/open-sauced/pull/1453",
      status: "merged"
    },
    {
      title: "Improve Documentation of Appwrite",
      link: "https://github.com/appwrite/docs/pull/230",
      status: "merged"
    },
    {
      title: "Improve Documentation for coding-interview-university",
      link: "https://github.com/jwasham/coding-interview-university/pull/1150",
      status: "merged"
    },
    {
      title: "Enable debug mode by default for localhost only",
      link: "https://github.com/Droggol/OdooDebug/pull/18",
      status: "open"
    }
  ],
  HobbiesData: [
    "Anime",
    "Cricket",
    "Books",
    "Music"
  ]
};

// shared/site.ts
var ORIGIN = "https://user64bit.wtf";
var API_BASE = "/api/v1";
var API_VERSION = "1.0.0";
var OPENAPI_PATH = "/openapi.json";
var SITEMAP_PATH = "/sitemap.xml";
var LLMS_PATH = "/llms.txt";
var LLMS_FULL_PATH = "/llms-full.txt";
var absolute = (path) => new URL(path, ORIGIN).toString();
var AGENT_RESOURCES = [
  {
    path: LLMS_PATH,
    title: "llms.txt",
    description: "Curated index of this site for language models.",
    contentType: "text/plain; charset=utf-8"
  },
  {
    path: LLMS_FULL_PATH,
    title: "llms-full.txt",
    description: "Every page of this site concatenated as Markdown.",
    contentType: "text/plain; charset=utf-8"
  },
  {
    path: SITEMAP_PATH,
    title: "sitemap.xml",
    description: "All canonical HTML URLs.",
    contentType: "application/xml; charset=utf-8"
  },
  {
    path: OPENAPI_PATH,
    title: "openapi.json",
    description: "OpenAPI 3.1 description of the read-only JSON API.",
    contentType: "application/json; charset=utf-8"
  },
  {
    path: API_BASE,
    title: "JSON API index",
    description: "Machine-readable portfolio data with hypermedia links.",
    contentType: "application/json; charset=utf-8"
  }
];

// shared/content.ts
var data = portfolio_default;
var CATEGORY_MAP = {
  Praxis: ["Web3", "AI"],
  "Get Toasted": ["Web3", "FullStack"],
  ChibiTown: ["FullStack"],
  RugPulse: ["Web3"],
  DAOnation: ["Web3"],
  PollChain: ["Web3"],
  "Ask Genie": ["AI"],
  "Dev DNA": ["FullStack"],
  "Get-Git": ["FullStack"],
  "DD-Agent": ["AI"],
  "Echo-GPT": ["AI"],
  suchi: ["FullStack"],
  "The TweetFolio": ["FullStack"],
  Notebook: ["FullStack"],
  Canteen: ["FullStack"]
};
var DEFAULT_CATEGORIES = ["FullStack"];
var categoriesFor = (projectName) => CATEGORY_MAP[projectName] ?? DEFAULT_CATEGORIES;
var slugify = (value) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
var optionalLink = (value) => value && value !== "#" ? value : null;
var splitSentences = (text) => text.split(/(?<=\.)\s+/).map((sentence) => sentence.trim()).filter(Boolean);
var firstSentence = (text) => splitSentences(text)[0] ?? text;
var profile = {
  name: "Arth Prajapati",
  handle: data.X_USERNAME,
  x: `https://x.com/${data.X_USERNAME}`,
  github: `https://github.com/${data.GITHUB_USERNAME}`,
  headline: `${data.GITHUB_QUOTE} @${data.GITHUB_USERNAME}`,
  bio: data.ABOUT_YOU,
  location: data.LOCATION,
  website: `https://${data.WEBSITE}`,
  joined: data.JOINED_DATE,
  email: data.CONTACT_EMAIL,
  availability: data.PINNED_TWEET.content,
  hobbies: data.HobbiesData
};
var projects = data.ProjectsData.map((project) => {
  const description = (project.listItems ?? []).flatMap(splitSentences);
  const slug = slugify(project.projectName);
  return {
    slug,
    name: project.projectName,
    categories: categoriesFor(project.projectName),
    summary: firstSentence((project.listItems ?? [])[0] ?? ""),
    description,
    techStack: (project.techStack ?? "").split(",").map((tech) => tech.trim()).filter(Boolean),
    repository: optionalLink(project.githubLink),
    liveUrl: optionalLink(project.liveProject),
    demoVideo: optionalLink(project.demoVideo),
    url: `${ORIGIN}${API_BASE}/projects/${slug}`
  };
});
var experience = data.ExperienceData.map((item) => ({
  slug: slugify(item.company_name),
  organization: item.company_name,
  timeline: item.timeline,
  current: item.timeline.toLowerCase().includes("present"),
  description: item.description
}));
var education = data.EducationData.map((item) => ({
  slug: slugify(item.title),
  title: item.title,
  date: item.date,
  description: item.description
}));
var repoFromUrl = (url) => {
  const parts = url.replace("https://github.com/", "").split("/");
  return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : url;
};
var referenceFromUrl = (url) => {
  const tail = url.split("/").pop() ?? "";
  return /^\d+$/.test(tail) ? `#${tail}` : null;
};
var contributions = data.ContributionData.map((item) => ({
  slug: slugify(item.title),
  title: item.title,
  repository: repoFromUrl(item.link),
  reference: referenceFromUrl(item.link),
  status: item.status,
  url: item.link
}));
var skills = Object.entries(data.SkillsData).map(([category, items]) => ({
  slug: slugify(category),
  category,
  items
}));
var hobbies = data.HobbiesData;
var mergedContributionCount = contributions.filter((item) => item.status === "merged" || item.status === "solved").length;

// shared/negotiate.ts
var HTML_TYPE = "text/html";
var MARKDOWN_TYPE = "text/markdown";
var JSON_TYPE = "application/json";
var CHARSET = "; charset=utf-8";
var clampQ = (raw) => {
  if (raw === undefined)
    return 1;
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value))
    return 1;
  return Math.min(1, Math.max(0, value));
};
var parseAccept = (header) => {
  if (header === null || header === undefined)
    return [];
  const entries = [];
  for (const part of header.split(",")) {
    const segments = part.split(";");
    const range = (segments.shift() ?? "").trim().toLowerCase();
    if (!range)
      continue;
    const [type, subtype] = range.split("/");
    if (!type || !subtype)
      continue;
    let q;
    for (const segment of segments) {
      const [name, ...rest] = segment.split("=");
      if (name.trim().toLowerCase() === "q")
        q = rest.join("=").trim();
    }
    entries.push({
      type,
      subtype,
      q: clampQ(q),
      specificity: type === "*" ? 1 : subtype === "*" ? 2 : 3
    });
  }
  return entries.sort((a, b) => b.q - a.q || b.specificity - a.specificity);
};
var qualityFor = (entries, mediaType) => {
  const [type, subtype] = mediaType.toLowerCase().split("/");
  let best;
  for (const entry of entries) {
    const matches = entry.type === type && entry.subtype === subtype || entry.type === type && entry.subtype === "*" || entry.type === "*" && entry.subtype === "*";
    if (!matches)
      continue;
    if (!best || entry.specificity > best.specificity || entry.specificity === best.specificity && entry.q > best.q) {
      best = entry;
    }
  }
  return best?.q ?? 0;
};
var negotiate = (header, produces) => {
  if (produces.length === 0)
    return { mediaType: null };
  if (header === null || header === undefined) {
    return { mediaType: produces[0] };
  }
  const entries = parseAccept(header);
  if (entries.length === 0) {
    return { mediaType: null };
  }
  let chosen = null;
  let chosenQuality = 0;
  for (const candidate of produces) {
    const quality = qualityFor(entries, candidate);
    if (quality > chosenQuality) {
      chosen = candidate;
      chosenQuality = quality;
    }
  }
  return { mediaType: chosenQuality > 0 ? chosen : null };
};
var varyHeaders = () => ({
  Vary: "Accept, Accept-Encoding"
});
var notAcceptableBody = (produces, requested) => [
  "This resource is available in:",
  ...produces.map((type) => `- ${type}`),
  "",
  `You requested: ${requested?.trim() || "(empty Accept header)"}`,
  "",
  "Retry with one of the media types listed above."
].join(`
`) + `
`;

// shared/http.ts
var READ_METHODS = ["GET", "HEAD", "OPTIONS"];
var PUBLIC_CACHE = "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400";
var NO_CACHE = "no-store";
var baseHeaders = (contentType, cacheControl) => ({
  "Content-Type": contentType,
  "Cache-Control": cacheControl,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": READ_METHODS.join(", "),
  "X-Content-Type-Options": "nosniff",
  ...varyHeaders()
});
var errorBody = (code, status, message, hint) => ({
  error: {
    code,
    status,
    message,
    hint,
    documentation: absolute("/openapi.json")
  }
});
var json = (data2, { status = 200, cacheControl = PUBLIC_CACHE } = {}) => new Response(status === 204 ? null : `${JSON.stringify(data2, null, 2)}
`, {
  status,
  headers: baseHeaders(JSON_TYPE + CHARSET, cacheControl)
});
var markdown = (body, { status = 200, cacheControl = PUBLIC_CACHE } = {}) => new Response(body, {
  status,
  headers: baseHeaders(MARKDOWN_TYPE + CHARSET, cacheControl)
});
var html = (body, { status = 200, cacheControl = PUBLIC_CACHE } = {}) => new Response(body, {
  status,
  headers: baseHeaders(HTML_TYPE + CHARSET, cacheControl)
});
var plainText = (body, { status = 200, cacheControl = NO_CACHE } = {}) => new Response(body, {
  status,
  headers: baseHeaders("text/plain" + CHARSET, cacheControl)
});
var stripBodyForHead = (request, response) => request.method === "HEAD" ? new Response(null, {
  status: response.status,
  statusText: response.statusText,
  headers: response.headers
}) : response;

// shared/openapi.ts
var ERROR_CODES = [
  "bad_request",
  "not_found",
  "method_not_allowed",
  "not_acceptable",
  "internal_error"
];
var PROJECT_CATEGORIES = ["Web3", "AI", "FullStack"];
var errorResponse = (description, example) => ({
  description,
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/ErrorResponse" },
      example
    }
  }
});
var jsonResponse = (description, schemaRef) => ({
  description,
  headers: {
    "Cache-Control": {
      description: "Edge and browser caching policy.",
      schema: { type: "string" }
    }
  },
  content: {
    "application/json": {
      schema: { $ref: schemaRef }
    }
  }
});
var NOT_ACCEPTABLE = errorResponse("The `Accept` header does not allow `application/json`.", {
  error: {
    code: "not_acceptable",
    status: 406,
    message: "This endpoint can only produce application/json.",
    hint: "Send `Accept: application/json` or omit the header.",
    documentation: absolute("/openapi.json")
  }
});
var METHOD_NOT_ALLOWED = errorResponse("The HTTP method is not supported. The API is read-only.", {
  error: {
    code: "method_not_allowed",
    status: 405,
    message: "POST is not supported. This API is read-only.",
    hint: "Use GET, HEAD, or OPTIONS.",
    documentation: absolute("/openapi.json")
  }
});
var collection = (operationId, summary, itemRef, extras = {}) => ({
  get: {
    operationId,
    summary,
    tags: ["portfolio"],
    responses: {
      "200": {
        description: summary,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["data", "meta"],
              properties: {
                data: { type: "array", items: { $ref: itemRef } },
                meta: { $ref: "#/components/schemas/CollectionMeta" }
              }
            }
          }
        }
      },
      "405": METHOD_NOT_ALLOWED,
      "406": NOT_ACCEPTABLE
    },
    ...extras
  }
});
var openapi = {
  openapi: "3.1.0",
  info: {
    title: "Arth Prajapati portfolio API",
    version: API_VERSION,
    summary: "Read-only JSON access to the portfolio published at user64bit.wtf.",
    description: [
      "Every section of the portfolio is available as JSON so agents do not have",
      "to parse HTML. All endpoints are unauthenticated, read-only, and safe to",
      "cache. Errors always use the same JSON envelope with a stable `code`, a",
      "human-readable `message`, and a `hint` describing how to recover.",
      "",
      `Markdown alternates of the HTML pages are available at ${absolute("/index.md")}`,
      `and ${absolute("/proof-of-work.md")}, or by sending \`Accept: text/markdown\``,
      "to the HTML URLs."
    ].join(`
`),
    contact: {
      name: profile.name,
      email: profile.email,
      url: ORIGIN
    },
    license: {
      name: "MIT",
      identifier: "MIT"
    }
  },
  servers: [{ url: ORIGIN, description: "Production" }],
  tags: [
    {
      name: "portfolio",
      description: "Portfolio content: profile, projects, experience, and more."
    },
    { name: "meta", description: "Discovery and service metadata." }
  ],
  paths: {
    [API_BASE]: {
      get: {
        operationId: "getApiIndex",
        summary: "Index of every available endpoint.",
        tags: ["meta"],
        responses: {
          "200": jsonResponse("Service metadata and links to every endpoint.", "#/components/schemas/ApiIndex"),
          "405": METHOD_NOT_ALLOWED,
          "406": NOT_ACCEPTABLE
        }
      }
    },
    [`${API_BASE}/profile`]: {
      get: {
        operationId: "getProfile",
        summary: "Identity, bio, links, and availability.",
        tags: ["portfolio"],
        responses: {
          "200": jsonResponse("The portfolio owner's profile.", "#/components/schemas/ProfileEnvelope"),
          "405": METHOD_NOT_ALLOWED,
          "406": NOT_ACCEPTABLE
        }
      }
    },
    [`${API_BASE}/projects`]: collection("listProjects", "Every shipped project.", "#/components/schemas/Project", {
      parameters: [
        {
          name: "category",
          in: "query",
          required: false,
          description: "Filter to a single category.",
          schema: { type: "string", enum: [...PROJECT_CATEGORIES] }
        },
        {
          name: "limit",
          in: "query",
          required: false,
          description: "Maximum number of projects to return.",
          schema: { type: "integer", minimum: 1, maximum: 100 }
        }
      ],
      responses: {
        "200": {
          description: "Every shipped project.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["data", "meta"],
                properties: {
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Project" }
                  },
                  meta: { $ref: "#/components/schemas/CollectionMeta" }
                }
              }
            }
          }
        },
        "400": errorResponse("A query parameter was invalid.", {
          error: {
            code: "bad_request",
            status: 400,
            message: "`category` must be one of: Web3, AI, FullStack.",
            hint: "Retry with a supported category, or omit the parameter.",
            documentation: absolute("/openapi.json")
          }
        }),
        "405": METHOD_NOT_ALLOWED,
        "406": NOT_ACCEPTABLE
      }
    }),
    [`${API_BASE}/projects/{slug}`]: {
      get: {
        operationId: "getProject",
        summary: "A single project by slug.",
        tags: ["portfolio"],
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            description: "Lowercase hyphenated project identifier.",
            schema: { type: "string", pattern: "^[a-z0-9-]+$" },
            example: "praxis"
          }
        ],
        responses: {
          "200": jsonResponse("The requested project.", "#/components/schemas/ProjectEnvelope"),
          "404": errorResponse("No project matches the slug.", {
            error: {
              code: "not_found",
              status: 404,
              message: 'No project with slug "does-not-exist".',
              hint: `List every available slug at ${absolute(`${API_BASE}/projects`)}.`,
              documentation: absolute("/openapi.json")
            }
          }),
          "405": METHOD_NOT_ALLOWED,
          "406": NOT_ACCEPTABLE
        }
      }
    },
    [`${API_BASE}/experience`]: collection("listExperience", "Work history, most recent first.", "#/components/schemas/Experience"),
    [`${API_BASE}/education`]: collection("listEducation", "Formal education.", "#/components/schemas/Education"),
    [`${API_BASE}/contributions`]: collection("listContributions", "Open source pull requests and issues.", "#/components/schemas/Contribution"),
    [`${API_BASE}/skills`]: collection("listSkills", "Skills grouped by category.", "#/components/schemas/SkillGroup")
  },
  components: {
    schemas: {
      ErrorResponse: {
        type: "object",
        description: "Every non-2xx response from this API uses this envelope, including the site-wide 404 handler when JSON is requested.",
        required: ["error"],
        properties: {
          error: {
            type: "object",
            required: ["code", "status", "message", "hint", "documentation"],
            properties: {
              code: {
                type: "string",
                enum: [...ERROR_CODES],
                description: "Stable, machine-readable error identifier."
              },
              status: {
                type: "integer",
                description: "HTTP status code, repeated for convenience."
              },
              message: {
                type: "string",
                description: "Human-readable explanation of what went wrong."
              },
              hint: {
                type: "string",
                description: "Concrete next step an agent can take to recover."
              },
              documentation: {
                type: "string",
                format: "uri",
                description: "URL of this OpenAPI document."
              }
            }
          }
        }
      },
      CollectionMeta: {
        type: "object",
        required: ["count", "total"],
        properties: {
          count: {
            type: "integer",
            description: "Number of items in `data`."
          },
          total: {
            type: "integer",
            description: "Number of items before filtering or limiting."
          },
          category: {
            type: "string",
            description: "Echo of the `category` filter, when supplied."
          }
        }
      },
      ApiIndex: {
        type: "object",
        required: ["service", "version", "documentation", "endpoints"],
        properties: {
          service: { type: "string" },
          version: { type: "string" },
          documentation: { type: "string", format: "uri" },
          endpoints: {
            type: "array",
            items: {
              type: "object",
              required: ["path", "description"],
              properties: {
                path: { type: "string" },
                description: { type: "string" }
              }
            }
          },
          resources: {
            type: "array",
            description: "Other machine-readable files published by this site.",
            items: {
              type: "object",
              required: ["path", "title", "description", "contentType"],
              properties: {
                path: { type: "string" },
                title: { type: "string" },
                description: { type: "string" },
                contentType: { type: "string" }
              }
            }
          }
        }
      },
      Profile: {
        type: "object",
        required: ["name", "handle", "bio"],
        properties: {
          name: { type: "string" },
          handle: { type: "string" },
          x: { type: "string", format: "uri" },
          github: { type: "string", format: "uri" },
          headline: { type: "string" },
          bio: { type: "string" },
          location: { type: "string" },
          website: { type: "string", format: "uri" },
          joined: { type: "string" },
          email: { type: "string", format: "email" },
          availability: { type: "string" },
          hobbies: { type: "array", items: { type: "string" } }
        }
      },
      ProfileEnvelope: {
        type: "object",
        required: ["data"],
        properties: { data: { $ref: "#/components/schemas/Profile" } }
      },
      Project: {
        type: "object",
        required: ["slug", "name", "categories", "description"],
        properties: {
          slug: { type: "string" },
          name: { type: "string" },
          categories: {
            type: "array",
            items: { type: "string", enum: [...PROJECT_CATEGORIES] }
          },
          summary: { type: "string" },
          description: { type: "array", items: { type: "string" } },
          techStack: { type: "array", items: { type: "string" } },
          repository: { type: ["string", "null"], format: "uri" },
          liveUrl: { type: ["string", "null"], format: "uri" },
          demoVideo: { type: ["string", "null"], format: "uri" },
          url: {
            type: "string",
            format: "uri",
            description: "Canonical API URL for this project."
          }
        }
      },
      ProjectEnvelope: {
        type: "object",
        required: ["data"],
        properties: { data: { $ref: "#/components/schemas/Project" } }
      },
      Experience: {
        type: "object",
        required: ["slug", "organization", "timeline", "description"],
        properties: {
          slug: { type: "string" },
          organization: { type: "string" },
          timeline: { type: "string" },
          current: { type: "boolean" },
          description: { type: "string" }
        }
      },
      Education: {
        type: "object",
        required: ["slug", "title", "description"],
        properties: {
          slug: { type: "string" },
          title: { type: "string" },
          date: { type: "string" },
          description: { type: "string" }
        }
      },
      Contribution: {
        type: "object",
        required: ["slug", "title", "repository", "status", "url"],
        properties: {
          slug: { type: "string" },
          title: { type: "string" },
          repository: { type: "string" },
          reference: { type: ["string", "null"] },
          status: {
            type: "string",
            enum: ["merged", "open", "issued", "solved"]
          },
          url: { type: "string", format: "uri" }
        }
      },
      SkillGroup: {
        type: "object",
        required: ["slug", "category", "items"],
        properties: {
          slug: { type: "string" },
          category: { type: "string" },
          items: { type: "array", items: { type: "string" } }
        }
      }
    }
  }
};

// shared/api.ts
var PATH_PARAM = "__path";

// shared/markdown.ts
var join = (blocks) => blocks.filter(Boolean).join(`

`).trimEnd() + `
`;
var renderNotFoundMarkdown = (path) => join([
  "# 404 — Not Found",
  path ? `\`${path}\` does not exist on ${ORIGIN}.` : `That path does not exist on ${ORIGIN}.`,
  "## Where to go instead",
  AGENT_RESOURCES.map((resource) => `- [${resource.title}](${absolute(resource.path)}) — ${resource.description}`).join(`
`),
  `Human-readable entry point: [${ORIGIN}](${ORIGIN}/)`
]);

// shared/not-found-page.ts
var X_MARK_PATH = "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";
var NOT_FOUND_TITLE = "404 — Not Found";
var NOT_FOUND_DESCRIPTION = `That page does not exist on ${ORIGIN}. Machine-readable indexes: /llms.txt, /sitemap.xml, /openapi.json.`;
var renderNotFoundHtml = () => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="robots" content="noindex, follow" />
    <meta name="description" content="${NOT_FOUND_DESCRIPTION}" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="alternate" type="text/plain" href="${absolute("/llms.txt")}" title="llms.txt" />
    <link rel="service-desc" type="application/json" href="${absolute("/openapi.json")}" title="OpenAPI" />
    <title>${NOT_FOUND_TITLE}</title>
    <style>
        :root {
            --bg: #000000;
            --text: #e7e9ea;
            --muted: #8b98a5;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 1.5rem;
            background: var(--bg);
            color: var(--text);
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-weight: 400;
            -webkit-font-smoothing: antialiased;
        }

        main {
            width: 100%;
            max-width: 26.25rem;
            text-align: center;
        }

        svg {
            width: 2.5rem;
            height: 2.5rem;
            margin: 0 auto 1rem;
            display: block;
            fill: var(--text);
        }

        h1 {
            margin: 0 0 0.25rem;
            font-size: 20px;
            font-weight: 800;
            line-height: 1.2;
        }

        p {
            margin: 0 0 1.25rem;
            font-size: 15px;
            color: var(--muted);
        }

        a.home {
            display: inline-block;
            padding: 0.5rem 1.25rem;
            border-radius: 9999px;
            background: var(--text);
            color: var(--bg);
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
        }

        a.home:hover {
            opacity: 0.9;
        }

        nav {
            margin-top: 2rem;
            font-size: 13px;
            color: var(--muted);
        }

        nav ul {
            list-style: none;
            margin: 0.5rem 0 0;
            padding: 0;
        }

        nav li+li {
            margin-top: 0.25rem;
        }

        nav a {
            color: #1d9bf0;
        }

        a:focus-visible {
            outline: 2px solid #1d9bf0;
            outline-offset: 2px;
            border-radius: 4px;
        }
    </style>
</head>

<body>
    <main>
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="${X_MARK_PATH}" />
        </svg>
        <h1>Hmm…this page doesn't exist.</h1>
        <p>Try heading back to the feed.</p>
        <a class="home" href="/">Back to home</a>
        <nav aria-label="Machine-readable indexes">
            Looking for structured data?
            <ul>
${AGENT_RESOURCES.map((resource) => `                <li><a href="${resource.path}">${resource.title}</a> — ${resource.description}</li>`).join(`
`)}
            </ul>
        </nav>
    </main>
</body>

</html>
`;

// api/not-found.ts
var PRODUCES = [MARKDOWN_TYPE, HTML_TYPE, JSON_TYPE];
var defaultFor = (request) => request.headers.get("sec-fetch-mode") === "navigate" || (request.headers.get("accept") ?? "").includes(HTML_TYPE) ? HTML_TYPE : MARKDOWN_TYPE;
var requestedPath = (request) => {
  const url = new URL(request.url);
  const forwarded = url.searchParams.get(PATH_PARAM);
  if (forwarded === null)
    return url.pathname;
  return forwarded.startsWith("/") ? forwarded : `/${forwarded}`;
};
var handleNotFound = (request) => {
  const accept = request.headers.get("accept");
  const path = requestedPath(request);
  const produces = defaultFor(request) === HTML_TYPE ? [HTML_TYPE, MARKDOWN_TYPE, JSON_TYPE] : [MARKDOWN_TYPE, HTML_TYPE, JSON_TYPE];
  const { mediaType } = negotiate(accept, produces);
  if (mediaType === null) {
    return stripBodyForHead(request, plainText(`404 Not Found: ${path}

${notAcceptableBody(PRODUCES, accept)}`, { status: 404 }));
  }
  if (mediaType === JSON_TYPE) {
    const body = errorBody("not_found", 404, `No resource at "${path}" on ${ORIGIN}.`, `Discover what exists at ${absolute("/sitemap.xml")}, ${absolute("/llms.txt")}, or ${absolute("/openapi.json")}.`);
    return stripBodyForHead(request, json({ ...body, resources: AGENT_RESOURCES }, { status: 404, cacheControl: NO_CACHE }));
  }
  if (mediaType === HTML_TYPE) {
    return stripBodyForHead(request, html(renderNotFoundHtml(), { status: 404, cacheControl: NO_CACHE }));
  }
  return stripBodyForHead(request, markdown(renderNotFoundMarkdown(path), {
    status: 404,
    cacheControl: NO_CACHE
  }));
};

function not_found_default(request) {
  return handleNotFound(request);
}
export {
  requestedPath,
  handleNotFound,
  not_found_default as default,
  
};
