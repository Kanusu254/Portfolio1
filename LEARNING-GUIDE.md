# FelixTheFreelancer — learning edition

This repository is both a portfolio website and a practical study project. The goal is to understand how a beginner can plan, structure, style, animate and publish a real website.

## 1. Project map

```text
Portfolio1/
├── index.html              # Main portfolio: content and page structure
├── style.css               # Shared styling, layout and responsive rules
├── script.js               # Navigation, hero sequence, videos and animations
├── digital-marketing.html  # Dedicated digital marketing service page
├── web-development.html    # Dedicated web development service page
├── digital-systems.html    # Dedicated digital systems service page
├── images/                 # Local image assets
└── LEARNING-GUIDE.md       # This guide
```

The site uses plain HTML, CSS and JavaScript. There is no framework or build step hiding what the browser is doing.

## 2. Run the site locally

1. Open the project folder in Visual Studio Code.
2. Open `index.html` in a browser, or use the VS Code **Live Server** extension.
3. If you already have the project on your computer, open the terminal in that folder and run:

```bash
git switch main
git pull origin main
```

If you are intentionally studying the feature branch instead, use:

```bash
git switch portfolio-reimagined
git pull origin portfolio-reimagined
```

Live Server refreshes the browser when you save a file. Change one small thing at a time and observe the result.

## 3. Understand the three core files

### `index.html` — structure and content

HTML describes what each part of the page means. Read it from top to bottom:

1. The `head` contains the page title, description and links to CSS and JavaScript.
2. The header contains the brand and navigation.
3. The hero introduces the portfolio.
4. About explains the person behind the work.
5. Projects introduces the two ventures.
6. Case studies explain the work in more detail.
7. Services link to their own pages.
8. Contact and footer close the experience.

Comments in the file mark the major sections. Start by changing text and links before changing the layout.

### `style.css` — presentation

CSS controls colour, typography, spacing, layout, imagery and animation.

Study it in this order:

1. Global rules and CSS variables near the top.
2. Header and navigation.
3. Hero and workbench.
4. About and project sections.
5. Case studies.
6. Services.
7. Contact and footer.
8. Responsive rules near the bottom.
9. Reduced-motion accessibility rules.

Look for the same class names in both files. For example, `.hero` in CSS styles the element with `class="hero"` in HTML.

### `script.js` — behaviour

JavaScript makes the page respond and move. The file is grouped into six features:

1. Mobile navigation.
2. Browser preferences for reduced motion and data saving.
3. The hero typewriter sequence.
4. Background video playback.
5. Scroll reveal animations.
6. Animated case-study scoreboards.

Change one feature at a time. Refresh the browser and observe what changed.

## 4. Rebuild the website in learning stages

Do not try to memorise the whole codebase. Recreate it in small, understandable layers.

| Stage | Build | What to practise |
|---|---|---|
| 1 | HTML skeleton | Elements, nesting, semantic sections and links |
| 2 | Header and navigation | Flexbox, spacing and anchor links |
| 3 | Hero layout | CSS Grid, typography and background layers |
| 4 | Workbench graphic | Cards, borders, gradients and visual hierarchy |
| 5 | About section | Two-column layout, image overlays and readable text |
| 6 | Project cards | Images, positioning, hover states and links |
| 7 | Case studies | Reusable layouts, grids and scoreboards |
| 8 | Services | Repeated card patterns and separate pages |
| 9 | Responsive design | Media queries and mobile-first thinking |
| 10 | JavaScript | Events, promises, observers and animation timing |
| 11 | Accessibility | Alt text, keyboard behaviour and reduced motion |
| 12 | Git and deployment | Commits, branches, pull requests and hosting |

## 5. Techniques used in this project

- **CSS Grid** places major page columns and card collections.
- **Flexbox** aligns navigation, buttons and smaller groups of elements.
- **CSS custom properties** (the values inside `:root`) keep shared colours and layout values consistent.
- **Pseudo-elements** such as `::before` and `::after` create decorative background layers without extra HTML.
- **Media queries** adapt the layout to smaller screens.
- **Promises and async/await** let the hero sequence wait for one typing stage to finish before starting another.
- **IntersectionObserver** detects when videos, cards or scoreboards enter the visible screen.
- **requestAnimationFrame** updates scoreboard counters smoothly.
- **prefers-reduced-motion** lets visitors who prefer less animation use the site comfortably.

## 6. Investigate a feature in the browser

1. Right-click an element and choose **Inspect**.
2. In Elements, identify its HTML class or ID.
3. In Styles, see which CSS rule controls it.
4. In Console, look for JavaScript errors.
5. In Network, check whether remote images and videos loaded.
6. Change one property, save and observe the result.

Ask not only “What does this line do?” but also “What would happen if I removed or changed it?”

## 7. Suggested video / podcast learning series

1. **The idea before the code** — plan the portfolio and decide what visitors should experience.
2. **Building the skeleton** — HTML sections and semantic structure.
3. **Creating the visual identity** — colour, typography and CSS variables.
4. **Designing the cinematic hero** — video background, overlays and workbench.
5. **Making the projects feel real** — cards, images and case studies.
6. **Making it responsive** — tablet and mobile layouts.
7. **Bringing it to life** — typewriter, scroll reveals and count-up numbers.
8. **Publishing the work** — Git, GitHub, Vercel and a repeatable workflow.
9. **Rebuilding from memory** — recreate each section without copying the original line for line.

For each episode, explain the decision first, show the code, change one thing live, then explain what happened. This keeps the series accessible to a complete beginner.

## 8. Important note about the scoreboard figures

The animated scoreboard numbers are demonstration values used to show the count-up interaction. They are not verified business performance. Replace them with figures supported by actual Kuku Mafia and The Uncharted Tribe records before presenting them as factual client results.

## 9. Keep experiments safe

Create a separate practice branch before experimenting:

```bash
git switch -c learning/rebuild-practice
```

Commit small, meaningful changes:

```bash
git add .
git commit -m "Build the portfolio navigation"
git push -u origin learning/rebuild-practice
```

Return to the final version at any time with:

```bash
git switch main
```
