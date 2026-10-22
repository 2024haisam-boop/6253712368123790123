"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function MotionSystem() {
  const [cursorOn, setCursorOn] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const setup = requestAnimationFrame(() => setCursorOn(fine && !window.matchMedia("(prefers-reduced-motion: reduce)").matches));
    const onMove = (event: PointerEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      cursorRef.current.style.opacity = "1";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { cancelAnimationFrame(setup); window.removeEventListener("pointermove", onMove); };
  }, []);

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".section-heading, .section-label, .study, .process-step, .package, .proof-items > div, .about-layout > div:last-child").forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 28 }, {
          autoAlpha: 1, y: 0, duration: 0.95, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        });
      });
      gsap.fromTo(".hero-copy > *", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.09, delay: 0.2 });
      gsap.to(".process-orbit", { rotation: 270, ease: "none", scrollTrigger: { trigger: "#process", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.to(".orbit-core", { rotation: -270, ease: "none", scrollTrigger: { trigger: "#process", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.to(".kinetic-type", { yPercent: -15, ease: "none", scrollTrigger: { trigger: ".type-study", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.to(".statement-inner", { scale: 1.04, ease: "none", scrollTrigger: { trigger: ".statement-section", start: "top bottom", end: "bottom top", scrub: 1 } });
    });
    return () => {
      mm.revert();
      window.removeEventListener("scroll", updateProgress);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    function beep() {
    if (!soundOn) return;
    const audio = audioRef.current ?? new AudioContext();
    audioRef.current = audio;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(520, audio.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(760, audio.currentTime + 0.07);
    gain.gain.setValueAtTime(0.035, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.09);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + 0.09);
    }
    const click = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("a, button")) beep();
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, [soundOn]);

  return <>
    <div ref={progressRef} className="scroll-progress" style={{ transform: "scaleX(0)" }} aria-hidden="true" />
    <div ref={cursorRef} className={`custom-cursor ${cursorOn ? "active" : ""}`} aria-hidden="true"><span /></div>
    <div className="access-controls" aria-label="Experience settings">
      <button type="button" aria-pressed={cursorOn} onClick={() => setCursorOn(!cursorOn)}>CURSOR <span>{cursorOn ? "ON" : "OFF"}</span></button>
      <button type="button" aria-pressed={soundOn} onClick={() => setSoundOn(!soundOn)}>SOUND <span>{soundOn ? "ON" : "OFF"}</span></button>
    </div>
  </>;
}
