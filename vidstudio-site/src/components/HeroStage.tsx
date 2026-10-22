"use client";

import { Component, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false });

const modes = ["WIREFRAME", "FORM", "FINAL"] as const;
type Mode = typeof modes[number];

class CanvasBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("FINAL");
  const [frame, setFrame] = useState(82);
  const [visible, setVisible] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [reduced, setReduced] = useState(false);
  const scrollRef = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReduced(media.matches); setCanRender(!media.matches && window.innerWidth >= 768); };
    const setup = requestAnimationFrame(update);
    media.addEventListener("change", update);
    window.addEventListener("resize", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "150px" });
    if (stageRef.current) observer.observe(stageRef.current);
    return () => { cancelAnimationFrame(setup); observer.disconnect(); media.removeEventListener("change", update); window.removeEventListener("resize", update); };
  }, []);

  useGSAP(() => {
    if (reduced) return;
    const trigger = ScrollTrigger.create({
      trigger: "#top", start: "top top", end: "bottom top",
      onUpdate: (self) => { scrollRef.current = self.progress; },
    });
    return () => trigger.kill();
  }, [reduced]);

  const updateFrame = (value: number) => {
    setFrame(value);
    const selected = value < 34 ? "WIREFRAME" : value < 68 ? "FORM" : "FINAL";
    setMode(selected);
  };

  return <div className="hero-stage-wrap" ref={stageRef}>
    <div className="stage-chrome"><div className="stage-dots"><i /><i /><i /></div><span>FORTHMOTIVE / MOTION COMPOSITION</span><span className="stage-live"><i /> LIVE PREVIEW</span></div>
    <div className="stage-body">
      <div className="stage-rail"><span>TOOLS</span><b>⌁</b><b>◈</b><b>▣</b><b>⌖</b><span>01</span></div>
      <div className="stage-viewport">
        <div className="viewport-grid" />
        <div className="stage-fallback" aria-hidden="true"><div className="fallback-frame back" /><div className="fallback-frame front"><div className="fallback-dashboard"><span>WORKSPACE / OVERVIEW</span><strong>Make work<br />flow.</strong><div><i /><i /><i /><i /><i /></div><small>FEATURE 01 / IN FOCUS</small></div></div></div>
        {canRender && <CanvasBoundary><HeroCanvas active={visible} mode={mode} frame={frame} scrollRef={scrollRef} /></CanvasBoundary>}
        <span className="viewport-label">CAM 01 <span>●</span> PRODUCT / MOTION</span>
        <span className="viewport-axis">X ───── Y</span>
        <span className="viewport-frame-number">FRAME {String(frame).padStart(3, "0")} / 120</span>
      </div>
      <div className="stage-inspector"><span className="inspector-title">PROPERTIES <b>⌄</b></span><div className="inspector-row"><span>PROJECT</span><b>Brand reveal</b></div><div className="inspector-row"><span>OBJECT</span><b>FM / composition</b></div><div className="inspector-row"><span>MODE</span><b>{mode.toLowerCase()}</b></div><div className="inspector-heading">MOTION</div><div className="inspector-meter"><span>Position</span><i style={{ width: `${Math.max(22, frame)}%` }} /></div><div className="inspector-meter"><span>Opacity</span><i style={{ width: `${Math.max(15, frame - 8)}%` }} /></div><div className="inspector-heading">CURVE</div><svg viewBox="0 0 100 48" aria-hidden="true"><path d="M3 44 C 30 44, 22 3, 97 3" /></svg></div>
    </div>
    <div className="stage-controls"><div className="stage-control-top"><span>SHADING PASS</span><div role="group" aria-label="Viewport shading pass">{modes.map((item) => <button type="button" key={item} className={mode === item ? "selected" : ""} onClick={() => { setMode(item); setFrame(item === "WIREFRAME" ? 18 : item === "FORM" ? 52 : 82); }}>{item}</button>)}</div><span>⌘ 3D VIEW</span></div><div className="stage-timeline"><span className="play-symbol">▶</span><span>00:{String(Math.floor(frame / 24)).padStart(2, "0")}:{String(frame % 24).padStart(2, "0")}</span><div className="timeline-ruler"><input type="range" min="0" max="120" value={frame} onChange={(event) => updateFrame(Number(event.target.value))} aria-label="Scrub hero composition timeline" /><div className="ruler-ticks" /></div><span>00:05:00</span></div><div className="track-rows"><span>F LOGO</span><div><i className="track-purple" /><b style={{ left: `${frame / 1.2}%` }} /></div><span>UI SYSTEM</span><div><i className="track-blue" /><b style={{ left: `${frame / 1.2}%` }} /></div></div></div>
    <span className="stage-caption">A PRODUCT IDEA, KEYFRAMED INTO FOCUS <span>↗</span></span>
  </div>;
}
