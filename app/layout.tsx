import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ContactNavbar } from "@/components/ui/contact-navbar";
import { soleil, neueHaasGrotesk } from "./fonts";

export const metadata: Metadata = {
  title: "Bo Juhl Portfolio",
  description: "Executive Producer, Producer, Editor",
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
      </body>
    </html>
  );
}
