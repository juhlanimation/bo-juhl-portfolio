import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ContactNavbar } from "@/components/ui/contact-navbar";
import { soleil, neueHaasGrotesk } from "./fonts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bojuhl.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bo Juhl | Executive Producer & Editor",
    template: "%s | Bo Juhl",
  },
  description:
    "Executive Producer and Editor. Co-founder of Sun Creature. A decade of experience leading animated films for Netflix, Riot Games, Supercell, Amazon, and LEGO. Now running Crossroad Studio.",
  keywords: [
    "Executive Producer",
    "Animation Producer",
    "Video Editor",
    "Crossroad Studio",
    "Sun Creature",
    "Animation",
    "Film Production",
  ],
  authors: [{ name: "Bo Juhl" }],
  creator: "Bo Juhl",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Bo Juhl Portfolio",
    title: "Bo Juhl | Executive Producer & Editor",
    description:
      "Executive Producer and Editor. Co-founder of Sun Creature. Leading animated films for Netflix, Riot Games, Supercell, Amazon, and LEGO.",
    images: [
      {
        url: "/images/profile-highres.webp",
        width: 1200,
        height: 630,
        alt: "Bo Juhl - Executive Producer & Editor",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${soleil.variable} ${neueHaasGrotesk.variable} antialiased`}
      >
        <SmoothScrollProvider
          navbar={<ContactNavbar email="hello@bojuhl.com" contactPrompt="How can I help you?" />}
        >
          {children}
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
