import { MotionSystem } from "@/components/MotionSystem";
import { HeroStage } from "@/components/HeroStage";
import { Services } from "@/components/Services";
import { MotionLab } from "@/components/MotionLab";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";

const steps = [
  { number: "01", title: "Find the story", body: "We turn the brief into one clear thing the audience should feel and understand.", phase: "BRIEF" },
  { number: "02", title: "Draw the beats", body: "Frames, transitions, pacing and visual language are mapped before anything moves.", phase: "STORYBOARD" },
  { number: "03", title: "Make it move", body: "We animate, refine and sound-design every moment until the timing feels inevitable.", phase: "ANIMATE" },
  { number: "04", title: "Ship everywhere", body: "One considered story, delivered in the formats your launch actually needs.", phase: "DELIVER" },
];

const packages = [
  { index: "01", name: "Motion Sprint", for: "A focused story with a fast runway.", includes: ["One core motion asset", "Concept and storyboard", "Animation and sound direction", "Launch-ready exports"] },
  { index: "02", name: "Product Story", for: "A deeper narrative for a product worth explaining.", includes: ["Narrative and visual direction", "SaaS UI + motion graphics", "Multiple scenes and cutdowns", "Platform-ready delivery"], featured: true },
  { index: "03", name: "Studio Partner", for: "An ongoing motion team without the overhead.", includes: ["Campaign motion system", "Recurring creative support", "Web + product animation", "Flexible production cadence"] },
];

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{index}</span><span>{children}</span><span className="label-line" /></div>;
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow-glyph">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  return (
    <>
      <MotionSystem />
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ForthMotive Studio, back to top"><span className="brand-mark">F<span>·</span></span><span className="brand-word">FORTH<span>MOTIVE</span><small>STUDIO</small></span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#services">Services</a><a href="#work">The work</a><a href="#process">Process</a><a href="#lab">Motion lab</a>
        </nav>
        <div className="nav-right"><span className="availability"><i /> OPEN FOR SELECT PROJECTS</span><a className="nav-contact" href="#contact">Start a project <Arrow diagonal /></a></div>
      </header>
      <main id="main">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow"><span className="eyebrow-pulse" /> INDEPENDENT MOTION STUDIO <span className="eyebrow-slash">/</span> 2026</div>
            <h1 id="hero-title">WE MAKE<br /><em>IDEAS</em> <span className="move-word">MOVE<span className="move-period">.</span></span></h1>
            <p>Motion graphics, product films and interactive worlds for brands that have something to say.</p>
            <div className="hero-actions"><a className="button button-primary" href="#work">Explore the work <Arrow diagonal /></a><a className="text-link" href="#contact">Tell us your idea <Arrow /></a></div>
          </div>
          <HeroStage />
          <div className="hero-bottom"><span>SCROLL TO SCRUB THE STORY</span><span className="hero-scroll-line"><i /></span><span>TIME IS OUR MATERIAL&nbsp; ↘</span></div>
        </section>

        <section className="audience-band" aria-label="Who we work with"><span>BUILT FOR WHAT&apos;S NEXT</span><p>Founders with something new. Teams with something complex. Brands ready to be impossible to ignore.</p><span className="audience-asterisk">✳</span></section>

        <Services />

        <section id="process" className="section process-section" aria-labelledby="process-title">
          <SectionLabel index="02">THE PROCESS</SectionLabel>
          <div className="section-heading"><h2 id="process-title">From a rough idea<br />to a <em>reason to watch.</em></h2><p>Good motion doesn&apos;t start in a timeline. It starts by finding the point.</p></div>
          <div className="process-layout">
            <div className="process-preview" aria-hidden="true">
              <div className="preview-top"><span>FM_STORYBOARD_01</span><span>24 FPS ◉</span></div>
              <div className="process-frame"><span className="frame-cross top-left">+</span><span className="frame-cross top-right">+</span><span className="frame-cross bottom-left">+</span><span className="frame-cross bottom-right">+</span><div className="process-orbit"><div className="orbit-core">F<span>·</span></div><i className="orbit-marker" /></div><span className="preview-guide">COMPOSITION / FRAME 024</span></div>
              <div className="process-timeline"><span>00:00</span><div className="timeline-track"><i /><i /><i /><i /></div><span>00:04</span></div>
            </div>
            <div className="process-steps">{steps.map((step) => <article className="process-step" key={step.number}><div><span className="step-index">{step.number}</span><span className="step-phase">{step.phase}</span></div><h3>{step.title}</h3><p>{step.body}</p><Arrow diagonal /></article>)}</div>
          </div>
        </section>

        <section id="work" className="section work-section" aria-labelledby="work-title">
          <SectionLabel index="03">STUDIO STUDIES</SectionLabel>
          <div className="section-heading"><h2 id="work-title">Show the idea.<br /><em>Not just the output.</em></h2><p>Small original studies built for this site, showing how we think through an animation problem.</p></div>
          <div className="studies-grid">
            <article className="study study-product"><div className="study-visual product-study"><div className="product-window"><div className="window-dots"><i /><i /><i /></div><div className="product-sidebar"><span /><span /><span /></div><div className="product-chart"><div className="chart-header"><span /><span /></div><div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /></div><div className="chart-cursor">↗</div></div></div><span className="study-corner">01 / 03</span></div><div className="study-meta"><span>PRODUCT STORY</span><h3>Make the invisible useful.</h3><p>A dashboard becomes a narrative: signal, focus, outcome.</p></div></article>
            <article className="study study-type"><div className="study-visual type-study"><span className="type-grid" /><div className="kinetic-type"><span>SHOW</span><span>DON&apos;T</span><span>TELL<span className="type-dot">●</span></span></div><span className="study-corner">02 / 03</span></div><div className="study-meta"><span>MOTION GRAPHICS</span><h3>Typography with intent.</h3><p>Every entrance, hold and cut earns its place in the sentence.</p></div></article>
            <article className="study study-edit"><div className="study-visual edit-study"><div className="edit-view"><div className="edit-art"><span>F</span><i /></div><div className="edit-split" /></div><div className="edit-mini-timeline"><span /><span /><span /><i /></div><span className="study-corner">03 / 03</span></div><div className="study-meta"><span>3D + EDITORIAL</span><h3>Build the reveal.</h3><p>Shape, lighting and a precise cut create a moment worth keeping.</p></div></article>
          </div>
          <p className="study-disclaimer">These are original procedural studio studies, not client case studies.</p>
        </section>

        <section className="statement-section" aria-label="Studio philosophy"><div className="statement-inner"><span className="eyebrow">THE FORTHMOTIVE POINT OF VIEW</span><p>Motion isn&apos;t the decoration.<br /><em>It&apos;s how the idea lands.</em></p><span className="statement-index">F / M — 001</span></div></section>

        <section id="capabilities" className="section capabilities-section" aria-labelledby="cap-title"><SectionLabel index="04">THE TOOLBOX</SectionLabel><div className="section-heading"><h2 id="cap-title">Different tools.<br /><em>One visual voice.</em></h2><p>We connect storytelling, design and production so the result feels like one idea.</p></div><div className="capability-map"><div className="map-center">THE<br />STORY<span>●</span></div><div className="map-node node-a"><small>01 / CONCEPT</small>Strategy</div><div className="map-node node-b"><small>02 / SHAPE</small>3D &amp; design</div><div className="map-node node-c"><small>03 / TIME</small>Animation</div><div className="map-node node-d"><small>04 / FEEL</small>Sound &amp; edit</div><svg viewBox="0 0 1000 410" preserveAspectRatio="none" aria-hidden="true"><path d="M500 205 L156 94 M500 205 L847 94 M500 205 L156 322 M500 205 L847 322" /></svg></div></section>

        <MotionLab />

        <section className="section proof-section" aria-labelledby="proof-title"><SectionLabel index="06">THE PRINCIPLE</SectionLabel><div className="proof-layout"><h2 id="proof-title">Every frame<br /><em>has a job.</em></h2><div className="proof-items"><div><span>01</span><p>One clear message before the first keyframe.</p></div><div><span>02</span><p>Design, animation and edit built as one system.</p></div><div><span>03</span><p>Delivered to work where your audience watches.</p></div></div></div></section>

        <section id="pricing" className="section pricing-section" aria-labelledby="pricing-title"><SectionLabel index="07">WORKING TOGETHER</SectionLabel><div className="section-heading"><h2 id="pricing-title">The right scope<br /><em>for the right idea.</em></h2><p>Every project is different. We shape the team, craft and budget around what the story needs.</p></div><div className="package-grid">{packages.map((item) => <article className={`package ${item.featured ? "featured" : ""}`} key={item.name}><span className="package-index">{item.index} / PROJECT-BASED</span><h3>{item.name}</h3><p>{item.for}</p><ul>{item.includes.map((include) => <li key={include}><span>↗</span>{include}</li>)}</ul><a href={`#contact`} className="package-link">Discuss a project <Arrow diagonal /></a></article>)}</div><p className="pricing-note">No fixed price list. Tell us the scope, timeline and ambition; we&apos;ll propose a considered approach.</p></section>

        <section id="about" className="section about-section" aria-labelledby="about-title"><SectionLabel index="08">ABOUT THE STUDIO</SectionLabel><div className="about-layout"><div className="about-symbol" aria-hidden="true"><span>F</span><i>◌</i></div><div><h2 id="about-title">Small studio.<br /><em>Big feeling.</em></h2><p>ForthMotive is built around one belief: the best motion makes something click. We bring design, timing and technical craft together to make ambitious ideas clear, tactile and memorable.</p><a className="text-link" href="#contact">Work with us <Arrow diagonal /></a></div></div></section>

        <FAQ />
        <Contact />
      </main>
      <footer className="site-footer"><div className="footer-top"><a className="brand" href="#top" aria-label="ForthMotive Studio, back to top"><span className="brand-mark">F<span>·</span></span><span className="brand-word">FORTH<span>MOTIVE</span><small>STUDIO</small></span></a><span>MAKE IT MATTER. MAKE IT MOVE.</span></div><div className="footer-bottom"><span>© 2026 FORTHMOTIVE STUDIO</span><div><a href="#services">SERVICES</a><a href="#work">STUDIES</a><a href="#contact">CONTACT</a><a href="https://forthmotive.dev" target="_blank" rel="noopener noreferrer">FORTHMOTIVE.DEV ↗</a></div><a href="#top">BACK TO TOP ↑</a></div></footer>
    </>
  );
}
