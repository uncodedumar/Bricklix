// NO "use client" directive here!
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next" // Now imported and used
import "./globals.css";

import Navbar from './components/navbar';
import Footer from './components/footer';
import ClientLayoutWrapper from './ClientLayoutWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// ✅ This works because layout.tsx is a Server Component
export const metadata: Metadata = {
  metadataBase: new URL('https://www.bricklix.com'),
  title: {
    default: "Bricklix | Strategic Technology For Intelligent Growth",
    template: "%s | Bricklix"
  },
  description: "Strategic Technology For Intelligent Growth. Transform your business with innovative digital solutions, cutting-edge technology, and expert development services.",
  keywords: ["digital agency", "web development", "app development", "AI solutions", "cybersecurity", "UI/UX design", "technology consulting", "digital transformation"],
  authors: [{ name: "Bricklix" }],
  creator: "Bricklix",
  publisher: "Bricklix",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo1.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/logo1.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bricklix",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bricklix.com",
    siteName: "Bricklix",
    title: "Bricklix | Strategic Technology For Intelligent Growth",
    description: "Transform your business with innovative digital solutions, cutting-edge technology, and expert development services.",
    images: [
      {
        url: "/bricklix.png",
        width: 1200,
        height: 630,
        alt: "Bricklix - Strategic Technology For Intelligent Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bricklix | Strategic Technology For Intelligent Growth",
    description: "Transform your business with innovative digital solutions, cutting-edge technology, and expert development services.",
    images: ["/bricklix.png"],
    creator: "@bricklix",
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
  verification: {
    // Add your verification codes here if needed
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://www.bricklix.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bricklix",
    "url": "https://www.bricklix.com",
    "logo": "https://www.bricklix.com/logo.svg",
    "description": "Strategic Technology For Intelligent Growth. Transform your business with innovative digital solutions.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8402 Captons Ln, # 104",
      "addressLocality": "Darien",
      "addressRegion": "IL",
      "postalCode": "60561",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-224-844-5596",
      "contactType": "customer service",
      "email": "support@bricklix.com"
    },
    "sameAs": [
      "https://www.linkedin.com/company/bricklix",
      "https://www.instagram.com/bricklix.official/"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayoutWrapper />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        {/*
          ✅ The SpeedInsights component must be rendered to be active.
          We place it here inside the body of the layout.
        */}
        <SpeedInsights />
      </body>
    </html>
  );
}
