import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multimode AI - AI Agents for Your Business",
  description:
    "Private AI agents that handle bookings, answer customers, and run daily operations — on WhatsApp, web, and email. Muslim-owned. Values-aligned.",
  keywords: [
    "AI agent",
    "business automation",
    "WhatsApp chatbot",
    "appointment booking AI",
    "AI assistant for business",
    "muslim-owned tech",
  ],
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL("https://multimodeai.com"),
  openGraph: {
    title: "Multimode AI - AI Agents for Your Business",
    description:
      "Private AI agents that handle bookings, answer customers, and run daily operations. Muslim-owned. Values-aligned.",
    url: "https://multimodeai.com",
    siteName: "Multimode AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Multimode AI - AI Agents for Your Business",
    description:
      "Private AI agents that handle bookings, answer customers, and run daily operations. Muslim-owned. Values-aligned.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
