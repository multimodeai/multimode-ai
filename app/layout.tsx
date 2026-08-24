import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multimode AI — AI agents for work that has rules",
  description:
    "Federal proposals, grant compliance, sensitive data. Systems that find the work, keep the paperwork straight, and show their working.",
  keywords: [
    "SBIR",
    "federal funding",
    "grant compliance",
    "proposal automation",
    "government contracting",
    "AI agent",
    "audit trail",
  ],
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL("https://multimodeai.com"),
  openGraph: {
    title: "Multimode AI — AI agents for work that has rules",
    description:
    "Federal proposals, grant compliance, sensitive data. Systems that find the work, keep the paperwork straight, and show their working.",
    url: "https://multimodeai.com",
    siteName: "Multimode AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Multimode AI — AI agents for work that has rules",
    description:
    "Federal proposals, grant compliance, sensitive data. Systems that find the work, keep the paperwork straight, and show their working.",
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
