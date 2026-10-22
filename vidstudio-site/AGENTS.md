<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## ForthMotive Studio Landing Page

### Product and visual direction

- Product: ForthMotive, a motion design and 3D animation studio. The site itself demonstrates the studio's craft. The experience is dark, cinematic, and uses one glowing accent.
- Colors: background `#07070B`, surface `#0F0F17`, text `#F4F4F8`, muted `#8A8AA0`, accent `#7C5CFF`, secondary `#3DE1FF` (glows and gradients only).
- Fonts: Space Grotesk for headlines, Inter for body, and JetBrains Mono for labels. Use `next/font` for font optimization.
- Establish an original visual motif from motion-design concepts: timeline tracks, keyframes, timecode, playheads, layers, spatial transforms, and procedural 3D objects.
- Do not use generic purple-gradient heroes, random floating spheres, excessive glassmorphism, repetitive three-card layouts, stock illustrations, or gratuitous particles. Do not copy another website.
- Each section needs one clear communication objective and one signature visual effect; other motion supports readability.

### Assets, 3D, and rendering

- **No Blender, Blender MCP, pre-rendered frame sequences, large `.glb` files, large video files, video backgrounds, or remote HDRI dependencies.** Do not add heavy assets.
- 3D is procedural: React Three Fiber, Three.js, `MeshPhysicalMaterial` for glass/chrome, code-driven lighting, restrained bloom, and custom GLSL only where it adds meaningful visual value.
- Load costly canvases through dynamic imports with SSR disabled and lightweight Suspense fallbacks. Gracefully handle failed WebGL initialization and context loss; content and navigation must always remain usable.
- Limit and reuse geometry/materials; dispose owned GPU resources and listeners on unmount. Prefer demand-driven rendering and pause expensive rendering/observers off-screen.
- Use refs and `useFrame` for render-loop values; never use React state updates every frame. Drive object transforms and camera from normalized scroll progress.
- Keep canvas DPR adaptive: mobile approximately 1.25 maximum; desktop 1.5–2 maximum. Constrain bloom, multisampling, transparency, overdraw, shader complexity, and simultaneous canvases.

### Motion architecture

- Use GSAP + ScrollTrigger + Lenis with Lenis `lerp: 0.08`; initialize Lenis once and synchronize it with ScrollTrigger through one animation loop.
- Default easing: `power3.out`. Reveals are 0.8–1.2 seconds with 0.06–0.1 second staggers.
- Use `useGSAP()` as the standard React integration. Use `gsap.context()` and complete cleanup for any setup outside that lifecycle. Tear down listeners, tickers, ScrollTriggers, animations, and observers.
- Make animation responsive with `gsap.matchMedia()`. Recalculate ScrollTrigger after important layout or font changes. Avoid native-scroll hijacking and unnecessary pinned sections.
- Respect `prefers-reduced-motion` in CSS and JavaScript. Provide a global static-motion fallback that removes nonessential camera movement, parallax, and elaborate scroll transitions.
- Use refs or imperative values for frame-by-frame updates, never continuous React `setState` calls.
- Animated editor UI (timeline, clips, playhead) must be React/SVG/GSAP or Remotion. Remotion stays isolated to programmatic compositions and must not be required for the marketing page.

### Performance, accessibility, and APIs

- Treat the first viewport as the critical path; target no more than 250 KB compressed initial JavaScript before deferred 3D/optional animation chunks. Measure bundles rather than assuming.
- Lazy-load below-the-fold sections and optional runtimes. Aim for Lighthouse mobile 85+ (90+ preferred), LCP <= 2.5s, INP <= 200ms, and CLS <= 0.1.
- Keep semantic content, primary navigation, and calls to action available even while visual effects load. Use semantic HTML, keyboard access, visible focus states, accessible labels, sufficient contrast, and touch/narrow-screen behavior.
- Consult the relevant GSAP, Three.js, and Remotion skills plus Context7/current official documentation before using package APIs. Never use deprecated or undocumented APIs. Check peer compatibility; never force-install.
- Maintain reusable tokens for colors, typography, spacing, radii, shadows, lighting, easing, and motion durations.

### Content and verification

- After visual changes, use Playwright to scroll and screenshot the page, then fix visual issues. Do not claim visual testing before a designed page exists.
- Include a contact form with real validation, error states, and an endpoint that reports truthfully whether delivery is configured. Include FAQs. Do not include testimonials. Pricing is project-based; do not invent fixed prices.
- Do not invent client identities, completed commercial projects, outcomes, or studio metrics. Label procedural work as studio studies.
