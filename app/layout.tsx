import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/lenis-scroll";
import Header from "@/components/header";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Building Beyond Possible",
  description: "Personal Portfolio — Full-Stack Web Developer & UI/UX Product Builder",
  openGraph: {
    title: "Building Beyond Possible",
    description: "Personal Portfolio — Full-Stack Web Developer & UI/UX Product Builder",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetBrainsMono.variable}`}>
      <body className="bg-bg text-ink font-sans antialiased selection:bg-accent selection:text-white">
        <LenisScroll />
        <Header />
        {children}
      </body>
    </html>
  );
}
