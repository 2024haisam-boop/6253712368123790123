"use client";

import { useState } from "react";

const questions = [
  { q: "What kinds of projects do you take on?", a: "We focus on SaaS and product animation, motion graphics, 3D storytelling, interactive web animation and editorial work. If your idea needs movement to become clearer or more memorable, it is worth a conversation." },
  { q: "Do you work with existing brand guidelines?", a: "Yes. We can animate within an established system or help define a motion language that extends it. We keep the work recognisably yours." },
  { q: "How do you price a project?", a: "Projects are scoped individually. We look at story, complexity, deliverables, timeline and the level of exploration needed, then send a clear proposal before production begins." },
  { q: "Can you animate our real product UI?", a: "Absolutely. We work from your product flows, design files or a working build to make the film accurate. We simplify only where it helps the story, and agree on that with you." },
  { q: "What do you need to get started?", a: "A short brief is enough: what you are launching, who it is for, what you want people to understand, your deadline and any existing assets. We can help shape the rest." },
  { q: "Will the animation work across formats?", a: "We plan aspect ratios and delivery channels early. Depending on scope, we can provide a master film, cutdowns, social formats, web-ready motion and still frames." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <section id="faq" className="section faq-section" aria-labelledby="faq-title"><div className="section-label"><span>09</span><span>GOOD QUESTIONS</span><span className="label-line" /></div><div className="faq-layout"><div><h2 id="faq-title">Before we<br /><em>begin.</em></h2><p>Still have one? Put it in the brief below.</p></div><div className="faq-list">{questions.map((item, index) => <article className={`faq-item ${open === index ? "open" : ""}`} key={item.q}><h3><button type="button" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}><span className="faq-number">{String(index + 1).padStart(2, "0")}</span><span>{item.q}</span><span className="faq-plus" aria-hidden="true">{open === index ? "−" : "+"}</span></button></h3><div id={`faq-answer-${index}`} className="faq-answer" hidden={open !== index}><p>{item.a}</p></div></article>)}</div></div></section>;
}
