# True Aim website

The source of https://trueaim.ai, the corporate website of True Aim AG, Zug.
It is a static Next.js site in English, German, French and Italian, hosted on Azure Static Web Apps.

- Run it: `npm ci`, then `npm run dev`, then open http://localhost:3000/en/.
- Change text: all copy is in `messages/<locale>/*.json`. [docs/EDITING_GUIDE.md](docs/EDITING_GUIDE.md) explains each step for non-developers.
- Rules for code, design, copy and releases: [AGENTS.md](AGENTS.md). Terms: [CONTEXT.md](CONTEXT.md). Decisions: [docs/adr/](docs/adr/).
- Brand: [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).
- Every push to `main` goes to https://staging.trueaim.ai. Production deploys only from a release tag.
