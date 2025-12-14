"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram, Linkedin, Plus } from "lucide-react";

// --- Optimized Profile Avatar Component ---
// Added alt prop, removed inline styles for clarity, improved fallback text handling.
const ProfileAvatar: React.FC<{
  name: string;
  src: string; // Made src required for Image component
  className?: string;
  alt: string; // Added alt text prop
}> = ({
  name,
  src,
  className = "",
  alt,
}) => (
  <div
    // Use standard Tailwind class for border for consistency
    className={`w-8 h-8 rounded-full border-2 border-red-500 overflow-hidden bg-gray-700 flex items-center justify-center text-xs font-semibold ${className}`}
    title={name}
  >
    {/* Use src only, no need for complex ternary logic for simple fallback */}
    {src ? (
      <Image
        src={src}
        alt={alt} // IMPORTANT: Proper, descriptive alt text
        width={32}
        height={32}
        className="w-full h-full object-cover"
        // Avatars are generally non-critical, can use standard loading
      />
    ) : (
      // Improved fallback for better readability
      <span aria-hidden="true">{name.charAt(0)}</span>
    )}
  </div>
);

// --- Main Hero Section Component ---

const OptimizedHero: React.FC = () => {
  const [feedback, setFeedback] = useState<string>("");

  // Simplified and consolidated media state
  const [mediaFailed, setMediaFailed] = useState<boolean>(false);

  const handleAction = (action: string) => {
    setFeedback(`Action triggered: ${action}`);
    setTimeout(() => setFeedback(""), 3000);
  };

  const profiles = [
    { id: 1, name: "Ava", imageUrl: "/15.jpg", alt: "Ava's profile photo" },
    { id: 2, name: "Ben", imageUrl: "/16.jpg", alt: "Ben's profile photo" },
    { id: 3, name: "Mia", imageUrl: "/17.jpg", alt: "Mia's profile photo" },
    { id: 4, name: "Kai", imageUrl: "/18.jpg", alt: "Kai's profile photo" },
    { id: 5, name: "Leo", imageUrl: "/12.jpg", alt: "Leo's profile photo" }, // Changed name for uniqueness
    { id: 6, name: "Sam", imageUrl: "/19.jpg", alt: "Sam's profile photo" }, // Changed name for uniqueness
  ];

  const videoSrc = "/herobg.mp4";
  const imageFallbackSrc = "/herobg-fallback.webp"; // Use a dedicated, optimized fallback image (WebP is better)

  return (
    // Accessibility: Main role for the section, using a full-page semantic tag is good
    <section className="relative min-h-screen bg-black text-white overflow-hidden" role="region" aria-label="Digital Agency Hero Section">
      
      {/* 1. Video/Image Background Layer (Performance & SEO: Critical) */}
      <div className="absolute inset-0 z-0">
        {!mediaFailed ? (
          // Use <video> for background
          <video
            className="w-full h-full object-cover opacity-70"
            autoPlay
            loop
            muted
            playsInline
            // Performance: preload="none" or remove entirely if video is critical, but for background, let browser manage
            // Controls are not needed for a background video
            // For production, use <source> tags with multiple formats (e.g., WebM, MP4) for cross-browser compatibility
            src={videoSrc}
            // Accessibility: Provide a text description for screen readers, or use aria-hidden if purely decorative.
            aria-hidden="true" 
            onLoadedData={() => {
              // Optional: You could use this to track performance
            }}
            onError={() => {
              // Failback to Image
              setMediaFailed(true);
            }}
          />
        ) : (
          /* Fallback to a static, optimized image */
          <Image
            src={imageFallbackSrc} // Optimized image path
            alt="Abstract digital background representing digital transformation" // Descriptive alt text
            fill
            className="object-cover opacity-70"
            priority={true} // Performance: Use priority for LCP image
            sizes="100vw" // Performance: Define sizes attribute for Next.js Image optimization
          />
        )}
        
        {/* Overlay gradient for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" aria-hidden="true"></div>
      </div>

      {/* 2. Main Content Wrapper */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 flex flex-col min-h-screen">
        
        {/* Top Right Header (Moved to a standard header tag) */}
        <header className="flex justify-end mb-12">
          {/* SEO/Accessibility: Use a div or p for this supporting text, NOT a heading */}
          <div className="max-w-xs text-right text-sm font-light leading-snug opacity-80 mt-10" role="doc-subtitle">
            No noise, no templates — just thoughtful strategy, asymmetric
            precision, and a team that delivers.
          </div>
        </header>

        {/* Main Grid Layout (Semantic main tag) */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          
          {/* 3. Left Column: Main Headline and CTA */}
          <div className="lg:col-span-2 flex flex-col justify-end">
            {/* SEO: The most important element, H1, is correctly placed and structured */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-none tracking-tight">
              Digital that <br /> moves deeper
            </h1>

            {/* Small 'From idea to launch' text */}
            <div className="mt-4 flex items-center text-lg font-light" aria-hidden="true">
              {/* Decorative span, aria-hidden for accessibility */}
              <span className="inline-block border border-red-500 rounded-full h-1 w-1 mr-4"></span>
              From idea to launch
            </div>

            {/* CTA Button and Description */}
            <div className="mt-12 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
              {/* Accessibility: Ensures Link is a proper button with descriptive text */}
              <Link
                href="/contact"
                onClick={() => handleAction("Get a free consultation")}
                className="group relative flex items-center justify-center px-6 py-3 font-semibold text-lg bg-transparent border-2 border-white rounded-xl transition-all duration-300 hover:bg-white hover:text-black shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500" // Accessibility: Added focus-visible style
              >
                Get a free consultation
                <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              
              <p className="max-w-xs text-sm font-light opacity-80">
                Leave a request right now and get a free 30-minute consultation.
              </p>
            </div>

            {/* Statistics Boxes (Use a semantic list if they were links, but as info cards, divs are fine) */}
            <div className="mt-20 flex flex-wrap gap-6" role="list">
              {/* 30+ services */}
              <article
                className="w-full sm:w-64 p-6 rounded-2xl border-2 border-red-500/50 backdrop-blur-sm bg-red-900/10 cursor-pointer transition-all duration-300 hover:bg-red-900/30"
                role="listitem"
              >
                {/* SEO: Wrap the entire card content in a single Link */}
                <Link href="/services" className="block" onClick={() => handleAction("View 30+ services")}>
                  <p className="text-4xl font-bold mb-2">30+</p>
                  <h2 className="text-sm font-semibold mb-3 opacity-90">
                    Services Offered
                  </h2>
                  <p className="text-xs font-light opacity-70">
                    We close the full cycle: from positioning to advertising.
                  </p>
                </Link>
              </article>

              {/* 120+ projects */}
              <article className="w-full sm:w-64 p-6 rounded-2xl border-2 border-white/20 backdrop-blur-sm bg-black/30 cursor-pointer transition-all duration-300 hover:bg-black/50" role="listitem">
                <Link href="/portfolio" className="block" onClick={() => handleAction("View 120+ projects")}>
                  <p className="text-4xl font-bold mb-2">120+</p>
                  <h2 className="text-sm font-semibold mb-3 opacity-90">
                    Projects Completed
                  </h2>
                  <p className="text-xs font-light opacity-70">
                    Collaborating with clients across 10+ countries
                  </p>
                </Link>
              </article>
            </div>
          </div>

          {/* 4. Right Column: Automation Card and Socials */}
          <div className="lg:col-span-1 flex flex-col items-end justify-end space-y-6">
            
            {/* Automation Card (Semantic article tag) */}
            <article className="w-full max-w-sm rounded-2xl p-6 bg-black/70 border border-red-500/50 backdrop-blur-md shadow-2xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer" aria-labelledby="automation-card-title">
              <div id="automation-card-title" className="sr-only">Automation and Team Card</div>
              <div className="w-full h-32 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-red-900 to-rose-900 flex items-center justify-center" aria-hidden="true">
                {/* Animated pulse effect */}
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                  <div className="relative bg-red-600 rounded-full w-20 h-20 flex items-center justify-center">
                    <span className="text-2xl" role="img" aria-label="Robot emoji">🤖</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-extrabold text-red-400"> {/* SEO: Use H3 for structure */}
                  2K+ Automations
                </h3>
                <Plus className="mx-auto my-3 w-5 h-5 text-red-400" aria-hidden="true" />
                <p className="text-sm font-light opacity-80 mb-4">
                  We know how to get leads without blowing your budget
                </p>

                {/* Profile Avatars (Improved accessibility with a descriptive label) */}
                <div className="flex justify-center -space-x-2" role="group" aria-label="Team member profiles">
                  {profiles.map((p) => (
                    <ProfileAvatar
                      key={p.id}
                      name={p.name}
                      src={p.imageUrl}
                      alt={p.alt} // Passed proper alt text
                      className="hover:z-10 transition-all duration-300"
                    />
                  ))}
                </div>
              </div>
            </article>

            {/* Social Media Links (Semantic navigation/list) */}
            <nav aria-label="Social media links" className="flex flex-col space-y-4 pt-4 self-stretch sm:self-auto">
              <ul className="flex flex-col space-y-4">
                {/* LinkedIn */}
                <li>
                  <Link
                    href="https://www.linkedin.com/company/bricklix"
                    aria-label="Follow us on LinkedIn"
                    className="flex items-center justify-center w-full sm:w-16 h-16 bg-black/60 border border-white/20 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-red-500/50 group focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  >
                    <Linkedin className="w-6 h-6 group-hover:text-blue-400" aria-hidden="true" />
                  </Link>
                </li>

                {/* Instagram (Label fixed - original code linked to Instagram but called it X) */}
                <li>
                  <Link
                    href="https://www.instagram.com/bricklix.official/"
                    aria-label="Follow us on Instagram"
                    onClick={() => handleAction("Navigate to Instagram")}
                    className="flex items-center justify-center w-full sm:w-16 h-16 bg-black/60 border border-white/20 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-red-500/50 group focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  >
                    <Instagram className="w-6 h-6 group-hover:text-pink-600" aria-hidden="true" /> {/* Changed hover color to be more Instagram-like */}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </main>
      </div>

      {/* 5. Live Feedback Box (for demonstrative working state) */}
      <div
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 p-3 px-6 bg-red-600 rounded-t-xl text-sm transition-opacity duration-300 z-50 ${
          feedback ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        role="status" // Accessibility: Indicates this is a live region for status updates
        aria-live="polite" // Accessibility: Screen reader will politely announce changes
      >
        {feedback || "Action Feedback"}
      </div>
    </section>
  );
};

export default OptimizedHero;
