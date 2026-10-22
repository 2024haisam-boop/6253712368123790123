import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./sections.css";
import "./sections-final.css";
import "./responsive.css";
import "./polish.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://studio.forthmotive.dev"),
  title: "ForthMotive Studio — Motion with a reason to move",
  description: "We turn complex products and sharp ideas into SaaS animation, motion graphics, 3D and web experiences worth watching.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ForthMotive Studio — Motion with a reason to move",
    description: "SaaS animation, motion graphics, 3D and interactive storytelling. Made to make the message move.",
    url: "https://studio.forthmotive.dev",
    siteName: "ForthMotive Studio",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#07070B" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
