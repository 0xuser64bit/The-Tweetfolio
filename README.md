# TheTweetFolio

## What is TweetFolio?

- TweetFolio is a portfolio website inspired by the social media platform Twitter (now known as X). It provides a unique and engaging way to showcase your achievements, thoughts, and accomplishments in a format similar to tweets. With a single user profile, you can easily share your ideas and achievements with the world in a concise and visually appealing manner.

## How to Use TweetFolio?

- If you're looking for a portfolio website but don't have the time or resources to create one from scratch, TweetFolio offers a convenient solution. You can easily customize TweetFolio to fit your personal brand and preferences. Simply modify the `portfolio.json` file to add your own data, such as your bio, achievements, and social media links. Once you've made the necessary changes, TweetFolio will transform into a personalized portfolio that reflects your unique identity and accomplishments.

### Steps to use it Locally.

- `git clone https://github.com/0xuser64bit/The-Tweetfolio.git`
- `cd The-Tweetfolio`
- `bun install`
- `bun start`

and You're good to go....

## Machine-readable surface (for AI agents)

Every page is prerendered to static HTML at build time, so crawlers that do not
run JavaScript still receive the full content. Alongside the HTML, TweetFolio
publishes:

| Endpoint                      | What it is                                                        |
| ----------------------------- | ----------------------------------------------------------------- |
| `/llms.txt`                   | Curated index of the site, per [llmstxt.org](https://llmstxt.org) |
| `/llms-full.txt`              | Every page concatenated as Markdown                               |
| `/index.md`, `/*.md`          | Markdown alternate of each HTML page                              |
| `/openapi.json`               | OpenAPI 3.1 description of the JSON API                           |
| `/api/v1`                     | Read-only JSON API over `shared/portfolio.json`                   |
| `/sitemap.xml`, `/robots.txt` | Generated from the page list in `shared/site.ts`                  |

Any HTML page also answers `Accept: text/markdown` with Markdown from the same
URL ([acceptmarkdown.com](https://acceptmarkdown.com)), and unknown paths return
a real HTTP 404 whose body points agents at the indexes above.

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://user64bit.wtf/nope   # 404
curl -sI -H "Accept: text/markdown" https://user64bit.wtf/            # text/markdown + Vary: Accept
```

### Commands

| Command          | What it does                                                     |
| ---------------- | ---------------------------------------------------------------- |
| `bun run dev`    | Vite dev server                                                  |
| `bun run build`  | Type-check, bundle, prerender pages, generate the agent files    |
| `bun test`       | Builds, then runs the full suite                                 |
| `bun run verify` | Replays `vercel.json` against `build/` and checks every endpoint |

Add a page by appending it to `PAGES` in `shared/site.ts`, registering a route in
`src/routes.tsx`, and adding a Markdown renderer in `shared/markdown.ts`; the
tests fail until `vercel.json` covers it too.

## Contributing to TweetFolio

- TweetFolio is an open-source project, and we welcome contributions from the community. If you've used TweetFolio and have ideas for improvements or new features, please create an issue on the project's repository. We'll review your suggestions and work on implementing them.

- If you're interested in contributing directly to the codebase, you can fork the repository, make your changes, and submit a pull request. We appreciate any contributions that enhance the user experience, add new functionality, or improve the overall quality of the project.

- By contributing to TweetFolio, you'll not only be helping to make it better for yourself but also for others who might benefit from your contributions.
