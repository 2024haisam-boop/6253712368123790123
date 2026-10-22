"use client";

import { useRef, useState } from "react";

const services = [
  { id: "product", no: "01", label: "SaaS animation", title: "Make the product make sense.", description: "Turn real interfaces and invisible workflows into a product story people can follow, feel and remember.", deliverables: "EXPLAINERS / LAUNCH FILMS / UI MOTION" },
  { id: "graphics", no: "02", label: "Motion graphics", title: "Give the message momentum.", description: "Kinetic type, graphic systems and transitions built with the pace and point of view of the idea.", deliverables: "BRAND MOTION / TITLES / SOCIAL CUTS" },
  { id: "three", no: "03", label: "3D animation", title: "Show it from another angle.", description: "Dimensional storytelling that reveals a product, process or concept — never 3D just to fill the frame.", deliverables: "PRODUCT WORLDS / 3D EXPLAINERS / REVEALS" },
  { id: "web", no: "04", label: "Web animation", title: "Make the browser part of the story.", description: "Fast, considered interactions that let people experience the narrative rather than just scroll past it.", deliverables: "INTERACTIVE SITES / SCROLL STORIES / UI" },
  { id: "edit", no: "05", label: "Video editing", title: "Find the cut that changes everything.", description: "Rhythm, structure and sound make the meaning land. Every edit needs a reason.", deliverables: "CAMPAIGN FILMS / CUTDOWNS / EDITORIAL" },
] as const;

type ServiceId = typeof services[number]["id"];

function Preview({ id, scrub }: { id: ServiceId; scrub: number }) {
  const current = Math.round(scrub * 120);
  return <div className={`service-preview service-preview-${id}`} style={{ "--scrub": scrub } as React.CSSProperties}>
    <div className="service-preview-head"><span><i /><i /><i /> FM / {id.toUpperCase()}_COMP</span><span>00:{String(Math.floor(current / 24)).padStart(2, "0")}:{String(current % 24).padStart(2, "0")} / 24FPS</span></div>
    <div className="service-preview-canvas">
      {id === "product" && <div className="demo-product"><div className="demo-interface"><div className="demo-side"><b>◈</b><i /><i /><i /></div><div className="demo-dashboard"><span className="demo-overline">YOUR WORKFLOW, CLEARER</span><strong>Everything<br />in motion.</strong><div className="demo-graph"><i /><i /><i /><i /><i /><i /></div><div className="demo-pill">FOCUS / FEATURE 01</div></div></div><div className="demo-callout">01 — POINT OF FOCUS <span>↗</span></div></div>}
      {id === "graphics" && <div className="demo-graphics"><div className="demo-crosshair">+</div><div className="demo-kinetic"><span>MAKE</span><span>IT</span><strong>LAND<span>.</span></strong></div><svg viewBox="0 0 400 110" aria-hidden="true"><path d="M6 98 C 100 98, 70 10, 394 10" /><circle cx={Math.max(6, scrub * 386)} cy={scrub < 0.5 ? 98 - scrub * 155 : 20 - scrub * 20} r="6" /></svg><span className="demo-curve-label">EASE / POWER3.OUT</span></div>}
      {id === "three" && <div className="demo-three"><div className="demo-three-grid" /><div className="demo-object"><span className="demo-object-face">F<span>·</span></span><div className="demo-object-depth" /></div><span className="demo-three-pin pin-1">01 — FORM</span><span className="demo-three-pin pin-2">02 — LIGHT</span><span className="demo-three-pin pin-3">03 — REVEAL</span></div>}
      {id === "web" && <div className="demo-web"><div className="demo-code"><span>01&nbsp; <b>const</b> story = timeline()</span><span>02&nbsp; story.<b>to</b>(product, {"{"}</span><span>03&nbsp;&nbsp;&nbsp; x: <em>240</em>,</span><span>04&nbsp;&nbsp;&nbsp; ease: <em>&quot;power3.out&quot;</em></span><span>05&nbsp; {"}"});</span><span className="code-caret">06&nbsp; ▍</span></div><div className="demo-browser"><div className="demo-browser-bar"><i /><i /><i /><span>product / preview</span></div><div className="demo-browser-body"><div className="demo-browser-card"><b>MOVE<br />BETTER.</b><small>↗ EXPLORE</small></div></div></div></div>}
      {id === "edit" && <div className="demo-edit"><div className="demo-monitor"><div className="demo-monitor-frame"><span>THE<br />MOMENT<br /><em>BEFORE.</em></span><i>▶</i></div><small>PROGRAM MONITOR / 1920 × 1080</small></div><div className="demo-edit-strips"><span>V1</span><i /><i /><i /><span>A1</span><b /><b /><b /><div className="edit-playhead" /></div></div>}
    </div>
    <div className="service-preview-foot"><span>▶</span><div className="preview-scrub-track"><i style={{ width: `${scrub * 100}%` }} /></div><span>{String(current).padStart(3, "0")} / 120</span></div>
  </div>;
}

export function Services() {
  const [active, setActive] = useState<ServiceId>("product");
  const [scrub, setScrub] = useState(0.42);
  const pointerRef = useRef<HTMLDivElement>(null);
  const selected = services.find((service) => service.id === active)!;
  const updatePointer = (event: React.PointerEvent) => {
    if (!pointerRef.current || event.pointerType === "touch") return;
    const bounds = pointerRef.current.getBoundingClientRect();
    setScrub(Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)));
  };
  return <section id="services" className="section services-section" aria-labelledby="services-title">
    <div className="section-label"><span>01</span><span>WHAT WE MAKE</span><span className="label-line" /></div>
    <div className="section-heading"><h2 id="services-title">One studio.<br /><em>Five ways to move.</em></h2><p>Choose a discipline. See the work behind the work. Every preview is built live in the browser.</p></div>
    <div className="services-workstation">
      <div className="service-list" role="tablist" aria-label="Animation services">{services.map((service) => <button id={`tab-${service.id}`} className={`service-tab ${active === service.id ? "active" : ""}`} key={service.id} type="button" role="tab" aria-selected={active === service.id} aria-controls="service-panel" onClick={() => { setActive(service.id); setScrub(0.42); }} onMouseEnter={() => { setActive(service.id); setScrub(0.42); }}><span className="service-number">{service.no}</span><span>{service.label}</span><span className="service-tab-arrow">↗</span></button>)}</div>
      <div id="service-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="service-display"><div className="service-display-top"><span>LIVE WORKSTATION / {selected.no}</span><span><i /> INTERACTIVE PREVIEW</span></div><div className="service-preview-hit" ref={pointerRef} onPointerMove={updatePointer}><Preview id={active} scrub={scrub} /></div><div className="service-detail"><div><span className="eyebrow">{selected.deliverables}</span><h3>{selected.title}</h3><p>{selected.description}</p></div><a href="#contact" aria-label={`Discuss ${selected.label} project`}>LET&apos;S BUILD IT <span>↗</span></a></div></div>
    </div>
    <p className="service-hint">HOVER TO SCRUB THE COMPOSITION · CLICK A DISCIPLINE TO EXPLORE</p>
  </section>;
}
