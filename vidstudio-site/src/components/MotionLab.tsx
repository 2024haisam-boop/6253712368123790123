"use client";

import { useRef, useState } from "react";

const defaults = [0.22, 1, 0.36, 1];

export function MotionLab() {
  const [points, setPoints] = useState(defaults);
  const [duration, setDuration] = useState(900);
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const objectRef = useRef<HTMLDivElement>(null);
  const curve = `cubic-bezier(${points.map((value) => Number(value.toFixed(2))).join(", ")})`;
  const path = `M 20 180 C ${20 + points[0] * 180} ${180 - points[1] * 180}, ${20 + points[2] * 180} ${180 - points[3] * 180}, 200 0`;

  function play() {
    if (!objectRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    objectRef.current.getAnimations().forEach((animation) => animation.cancel());
    setPlaying(true);
    const animation = objectRef.current.animate([
      { transform: "translateX(0) rotate(-16deg)", backgroundColor: "#7c5cff" },
      { transform: "translateX(min(250px, 55vw)) rotate(12deg)", backgroundColor: "#3de1ff" },
    ], { duration, easing: curve, fill: "forwards" });
    animation.onfinish = () => setPlaying(false);
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(`transition: transform ${duration}ms ${curve};`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { setCopied(false); }
  }

  return <section id="lab" className="section lab-section" aria-labelledby="lab-title">
    <div className="section-label"><span>05</span><span>THE MOTION LAB</span><span className="label-line" /></div>
    <div className="section-heading"><h2 id="lab-title">A feeling in<br /><em>four numbers.</em></h2><p>Timing is a design decision. Shape the easing curve, then see what it does to the motion.</p></div>
    <div className="lab-shell"><div className="lab-top"><span>FM / CURVE EDITOR</span><span>INTERACTIVE TOOL 001</span></div><div className="lab-main"><div className="lab-graph"><div className="lab-graph-heading"><span>VALUE / 1.0</span><span>CUBIC BÉZIER</span></div><svg viewBox="0 0 220 200" role="img" aria-label="Current cubic Bézier easing curve"><defs><pattern id="lab-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#31313e" strokeWidth=".7" /></pattern></defs><rect width="220" height="200" fill="url(#lab-grid)" /><path d="M20 180 L200 0" stroke="#4b4a60" strokeDasharray="3 5" /><path d={path} stroke="#9b83ff" strokeWidth="4" fill="none" strokeLinecap="round" /><circle cx={20 + points[0] * 180} cy={180 - points[1] * 180} r="5" fill="#3de1ff" /><circle cx={20 + points[2] * 180} cy={180 - points[3] * 180} r="5" fill="#3de1ff" /><circle cx="20" cy="180" r="5" fill="#fff" /><circle cx="200" cy="0" r="5" fill="#fff" /></svg><div className="lab-axis"><span>0.0 SEC</span><span>TIME →</span><span>1.0 SEC</span></div></div><div className="lab-controls"><span className="eyebrow">CONTROL POINTS</span><div className="point-grid">{points.map((value, index) => <label key={index}><span>{index < 2 ? "P1" : "P2"} / {index % 2 === 0 ? "X" : "Y"}</span><output>{value.toFixed(2)}</output><input type="range" min="0" max="1" step="0.01" value={value} onChange={(event) => setPoints(points.map((point, pointIndex) => pointIndex === index ? Number(event.target.value) : point))} /></label>)}</div><label className="duration-control"><span>DURATION <output>{duration} MS</output></span><input type="range" min="300" max="1800" step="50" value={duration} onChange={(event) => setDuration(Number(event.target.value))} /></label><button className="lab-reset" type="button" onClick={() => { setPoints(defaults); setDuration(900); }}>↺ RESET CURVE</button></div><div className="lab-preview"><span className="eyebrow">LIVE MOTION TEST</span><div className="lab-motion-track"><div ref={objectRef} className="lab-motion-object">F<span>·</span></div><span className="lab-finish-line" /></div><button type="button" className="lab-play" onClick={play} disabled={playing}>{playing ? "PLAYING…" : "▶ PLAY MOTION"}</button><div className="lab-code"><code>transition: transform {duration}ms {curve};</code><button type="button" onClick={copyCode} aria-label="Copy CSS easing code">{copied ? "COPIED" : "COPY"}</button></div></div></div><div className="lab-bottom"><span>THE DIFFERENCE BETWEEN MOVING AND FEELING.</span><span>TRY THE CURVE ↗</span></div></div>
  </section>;
}
