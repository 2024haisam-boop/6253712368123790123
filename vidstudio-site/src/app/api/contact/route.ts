import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let data: unknown;
  try { data = await request.json(); }
  catch { return NextResponse.json({ message: "Invalid form data." }, { status: 400 }); }
  if (!data || typeof data !== "object") return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  const values = data as Record<string, unknown>;
  if (values.website) return NextResponse.json({ message: "Message received." });
  const name = typeof values.name === "string" ? values.name.trim().slice(0, 120) : "";
  const email = typeof values.email === "string" ? values.email.trim().slice(0, 200) : "";
  const company = typeof values.company === "string" ? values.company.trim().slice(0, 160) : "";
  const service = typeof values.service === "string" ? values.service.trim().slice(0, 120) : "";
  const budget = typeof values.budget === "string" ? values.budget.trim().slice(0, 80) : "";
  const message = typeof values.message === "string" ? values.message.trim().slice(0, 5000) : "";
  if (name.length < 2 || !emailPattern.test(email) || !service || message.length < 20) {
    return NextResponse.json({ message: "Please complete the required fields." }, { status: 400 });
  }
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ message: "The contact endpoint is not configured yet. Please try again later." }, { status: 503 });
  try {
    const url = new URL(webhook);
    if (url.protocol !== "https:") throw new Error("Webhook must use HTTPS");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, service, budget, message, source: "studio.forthmotive.dev" }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Webhook delivery failed");
    return NextResponse.json({ message: "Brief sent." });
  } catch {
    return NextResponse.json({ message: "We could not deliver your brief just now. Please try again later." }, { status: 502 });
  }
}
