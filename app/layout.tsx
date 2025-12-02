// NO "use client" directive here!
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next" // Now imported and used
import "./globals.css";

// Import the client component
import ClientLayoutWrapper from './ClientLayoutWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ This works because layout.tsx is a Server Component
export const metadata: Metadata = {
  title: "Bricklix | Ignition of Passion",
  description: "AI & Digital Design Studio",
  icons: {
    icon: "/logo1.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        {/*
          ✅ The SpeedInsights component must be rendered to be active.
          We place it here inside the body of the layout.
        */}
        <SpeedInsights />
      </body>
    </html>
  );
}
