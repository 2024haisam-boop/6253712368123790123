"use client";

import { useState } from "react";

type FormState = { name: string; email: string; company: string; service: string; budget: string; message: string; website: string };
const initial: FormState = { name: "", email: "", company: "", service: "", budget: "", message: "", website: "" };

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [response, setResponse] = useState("");

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Please enter a valid email address.";
    if (!form.service) nextErrors.service = "Choose the kind of project.";
    if (form.message.trim().length < 20) nextErrors.message = "Tell us a little more — at least 20 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStatus("sending");
    try {
      const result = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data: { message?: string } = await result.json();
      if (!result.ok) throw new Error(data.message || "The message could not be sent.");
      setStatus("success");
      setResponse("Your brief has been sent. We will reply to your email.");
      setForm(initial);
    } catch (error) {
      setStatus("error");
      setResponse(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return <section id="contact" className="section contact-section" aria-labelledby="contact-title"><div className="contact-glow" aria-hidden="true" /><div className="section-label"><span>10</span><span>THE NEXT FRAME</span><span className="label-line" /></div><div className="contact-heading"><span className="eyebrow"><i className="eyebrow-pulse" /> NOW TAKING SELECT PROJECTS</span><h2 id="contact-title">LET&apos;S MAKE<br /><em>IT MOVE.</em></h2><p>Tell us what you&apos;re imagining. We&apos;ll help you find the story, the format and the first frame.</p></div><div className="contact-layout"><div className="contact-aside"><div className="queue-display"><div className="queue-top"><span>NEW PROJECT / INTAKE</span><span>● READY</span></div><div className="queue-screen"><div className="queue-rings"><i /><i /><i /></div><strong>YOUR IDEA<br />GOES HERE<span>.</span></strong></div><div className="queue-bottom"><span>01 BRIEF</span><span>02 REVIEW</span><span>03 LET&apos;S TALK</span></div></div><p>No pitch deck required. A rough thought is a good place to start.</p></div><form className="contact-form" onSubmit={submit} noValidate><div className="form-top"><span>PROJECT BRIEF</span><span>EST. 2 MINUTES</span></div><div className="form-row"><label>Your name <span>*</span><input value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" placeholder="How should we call you?" aria-invalid={!!errors.name} aria-describedby={errors.name ? "error-name" : undefined} />{errors.name && <small id="error-name" className="form-error">{errors.name}</small>}</label><label>Work email <span>*</span><input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "error-email" : undefined} />{errors.email && <small id="error-email" className="form-error">{errors.email}</small>}</label></div><div className="form-row"><label>Company / team<input value={form.company} onChange={(event) => update("company", event.target.value)} autoComplete="organization" placeholder="Optional" /></label><label>What are we making? <span>*</span><select value={form.service} onChange={(event) => update("service", event.target.value)} aria-invalid={!!errors.service} aria-describedby={errors.service ? "error-service" : undefined}><option value="">Select a direction</option><option>SaaS / product animation</option><option>Motion graphics</option><option>3D animation</option><option>Interactive web animation</option><option>Video editing</option><option>Not sure yet</option></select>{errors.service && <small id="error-service" className="form-error">{errors.service}</small>}</label></div><label>Indicative budget<select value={form.budget} onChange={(event) => update("budget", event.target.value)}><option value="">Select if known (optional)</option><option>Under $5k</option><option>$5k–$15k</option><option>$15k–$30k</option><option>$30k+</option><option>Let&apos;s discuss</option></select></label><label>Tell us the idea <span>*</span><textarea value={form.message} onChange={(event) => update("message", event.target.value)} rows={4} placeholder="What is the idea, who is it for, and when does it need to go live?" aria-invalid={!!errors.message} aria-describedby={errors.message ? "error-message" : undefined} />{errors.message && <small id="error-message" className="form-error">{errors.message}</small>}</label><label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => update("website", event.target.value)} /></label><div className="form-submit-row"><button className="button button-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "SENDING BRIEF…" : "SEND YOUR BRIEF"} <span>↗</span></button><span>YOUR DETAILS STAY WITH US.</span></div>{status !== "idle" && status !== "sending" && <p className={`form-status ${status}`} role="status">{response}</p>}</form></div></section>;
}
