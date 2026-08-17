# Bimbo Tarot

A tarot app that reads you for filth. Pick a spread, drag across the deck to shuffle it,
choose your cards from the fan, and flip them one by one.

**[Try it →](https://tjllis.github.io/bimbo_tarot/)**

![The pick screen on desktop](docs/screenshots/desktop-pick.png)

## The reading

Three steps, and the header tracks which one you're on.

| 1 · pick | 2 · shuffle | 3 · reveal |
| --- | --- | --- |
| Choose a one-card pull or a three-card spread. | Drag across the deck until the bar fills — or admit defeat and hit "shuffle for me, I'm tired". Then pick your cards out of the fan. | The cards you chose fly into their slots. Flip each one to read it. |

![Picking cards out of the shuffled fan](docs/screenshots/desktop-shuffle.png)

![The three-card reading, flipped](docs/screenshots/desktop-reveal.png)

A **one-card pull** gives you today's general reading. A **three-card spread** reads the same
deck three different ways — the same card means one thing as your last situationship and
something else entirely as your villain arc.

"share this 💌" copies the whole reading to your clipboard, ready to paste into the group chat.

## On a phone

Same app, not a shrunk-down desktop. The fan drops from nine cards to seven and tightens its
arc so it fits a 390px screen, the readings menu stacks, buttons go full-width, the step chips
give up their space, and the copy switches from "click" to "tap".

<p>
  <img src="docs/screenshots/phone-pick.png" width="32%" alt="Pick a reading, on a phone">
  <img src="docs/screenshots/phone-shuffle.png" width="32%" alt="The fan of cards, on a phone">
  <img src="docs/screenshots/phone-reveal.png" width="32%" alt="A three-card reading, on a phone">
</p>

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # typecheck, then bundle to dist/
npm run preview  # serve the built bundle
```

## How it's built

React 19 + TypeScript on Vite, CSS Modules, no runtime dependencies beyond React. No router —
the three screens are one piece of state.

```
src/
├── main.tsx                  entry
├── index.css                 design tokens, keyframes, view-transition timing
├── App.tsx                   screen switch + responsive tuning
├── data/deck.ts              the 22 cards and the three spread positions
├── lib/fan.ts                deal + the maths that lays the fan out
├── hooks/
│   ├── useReading.ts         the whole flow: pick → shuffle → reveal
│   └── useMediaQuery.ts      desktop breakpoint, for the parts CSS can't do
├── components/               AppHeader · Button · CardBack · StarCanvas
└── screens/                  PickScreen · ShuffleScreen · RevealScreen
```

A few things worth knowing if you're poking at it:

**One hook owns the reading.** [`useReading`](src/hooks/useReading.ts) holds the screen, the
shuffle amount, which fan slots you picked, and which cards you've flipped. Screens are pure
props — they render what they're handed and call back.

**The fan is maths, not hand-placed.** [`fanLayout`](src/lib/fan.ts) turns the shuffle amount
into a position, rotation, lift, and glow for every card. Its wobble comes from a seeded
`sin`, so re-renders never re-scatter the deck — only a bumped seed does. Phone and desktop
pass different tunings to the same function.

**Cards fly between screens.** Each picked card carries a `view-transition-name` in the fan,
and the reveal screen claims the same name, so the browser animates the same card across
instead of cutting. Browsers without view transitions get a staggered deal-in, and
`prefers-reduced-motion` gets neither.

**Two layouts, one breakpoint** at 1000px — wide enough for a fully-opened nine-card fan.
Almost all of it is CSS custom properties; only the fan geometry and the click/tap wording
need JavaScript to know which side of the line they're on.

## Deploying

Pushing to `main` deploys automatically via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) — it builds and publishes
`dist/` to GitHub Pages.

One-time setup: **Settings → Pages → Source → GitHub Actions**.

The one thing that will bite you is the base path. Pages serves the site from
`/<repo-name>/`, not from the domain root, so a default build asks for `/assets/index.js`
and gets a 404 — a blank page with no obvious cause. The workflow handles it:

```yaml
- run: npm run build -- --base=/${{ github.event.repository.name }}/
```

Deriving it from the repo name rather than hardcoding means a rename won't silently break
the deploy, and local `npm run dev` keeps working at `/`.
