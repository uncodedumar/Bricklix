"use client";

import React, { useState } from "react";

import Link from "next/link";

import Image from "next/image";

import { ArrowRight, Instagram, Linkedin, Plus } from "lucide-react";

const ProfileAvatar: React.FC<{ 
  name: string; 
  src?: string;
  className?: string 
}> = ({
  name,
  src,
  className = "",
}) => (
  <div
    className={`w-8 h-8 rounded-full border-2 border-red-500 overflow-hidden bg-gray-700 flex items-center justify-center text-xs font-semibold ${className}`}
    style={{ border: "2px solid rgba(239, 68, 68, 0.5)" }}
    title={name}
  >
    {src ? (
      <Image
        src={src}
        alt={name}
        width={32}
        height={32}
        className="w-full h-full object-cover"
      />
    ) : (
      name.charAt(0)
    )}
  </div>
);

// --- Main Hero Section Component ---

const App: React.FC = () => {
  const [feedback, setFeedback] = useState<string>("");

  const [videoError, setVideoError] = useState<boolean>(false);

  const handleAction = (action: string) => {
    setFeedback(`Action triggered: ${action}`);

    setTimeout(() => setFeedback(""), 3000);
  };

  const profiles = [
    { id: 1, name: "Ava", imageUrl: "/15.jpg" },
    { id: 2, name: "Ben", imageUrl: "/16.jpg" },
    { id: 3, name: "Mia", imageUrl: "/17.jpg" },
    { id: 4, name: "Kai", imageUrl: "/18.jpg" },
    { id: 5, name: "Kai", imageUrl: "/12.jpg" },
    { id: 6, name: "Kai", imageUrl: "/19.jpg" },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* 1. Video/GIF Background Layer */}

      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <video
            className="w-full h-full object-cover opacity-70"
            autoPlay
            loop
            muted
            playsInline
            // --- PREVENTS DOWNLOADING ---

            disablePictureInPicture
            controlsList="nodownload nofullscreen"
            onContextMenu={(e) => e.preventDefault()}
            // ----------------------------

            src="/Herobg.mp4"
            onError={(e) => {
              console.error("Background video failed to load", e);

              setVideoError(true);
            }}
          />
        ) : (
          /* Fallback to a static image (NOTE: /hero.mp4 in original was an incorrect image path) */

          <Image
            src="/Herobg.mp4"
            alt=""
            fill
            className="object-cover opacity-70"
            priority
            quality={75}
          />
        )}

        {/* Overlay gradient for better text contrast */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      </div>

      {/* 2. Main Content Wrapper */}

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 flex flex-col min-h-screen">
        {/* Top Right Header */}

        <header className="flex justify-end mb-12">
          <p className="max-w-xs text-right text-sm font-light leading-snug opacity-80 mt-10">
            No noise, no templates — just thoughtful strategy, asymmetric
            precision, and a team that delivers.
          </p>
        </header>

        {/* Main Grid Layout */}

        <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          {/* 3. Left Column: Main Headline and CTA */}

          <div className="lg:col-span-2 flex flex-col justify-end">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-none tracking-tight">
              Digital that <br /> moves deeper
            </h1>

            {/* Small 'From idea to launch' text */}

            <div className="mt-4 flex items-center text-lg font-light">
              <span className="inline-block border border-red-500 rounded-full h-1 w-1 mr-4"></span>
              From idea to launch
            </div>

            {/* CTA Button and Description */}

            <div className="mt-12 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <Link
                href="/contact"
                onClick={() => handleAction("Get a free consultation")}
                className="group relative flex items-center justify-center px-6 py-3 font-semibold text-lg bg-transparent border-2 border-white rounded-xl transition-all duration-300 hover:bg-white hover:text-black shadow-lg"
              >
                Get a free consultation
                <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <p className="max-w-xs text-sm font-light opacity-80">
                Leave a request right now and get a free 30-minute consultation.
              </p>
            </div>

            {/* Statistics Boxes */}

            <div className="mt-20 flex flex-wrap gap-6">
              {/* 30+ services */}

              <div
                className="w-full sm:w-64 p-6 rounded-2xl border-2 border-red-500/50 backdrop-blur-sm bg-red-900/10 cursor-pointer transition-all duration-300 hover:bg-red-900/30"
                onClick={() => handleAction("View 30+ services")}
              >
                <p className="text-4xl font-bold mb-2">30+</p>

                <p className="text-sm font-semibold mb-3 opacity-90">
                  services
                </p>

                <p className="text-xs font-light opacity-70">
                  We close the full cycle: from positioning to advertising.
                </p>
              </div>

              {/* 120+ projects */}

              <div className="w-full sm:w-64 p-6 rounded-2xl border-2 border-white/20 backdrop-blur-sm bg-black/30 cursor-pointer transition-all duration-300 hover:bg-black/50">
                <p className="text-4xl font-bold mb-2">120+</p>

                <p className="text-sm font-semibold mb-3 opacity-90">
                  projects
                </p>

                <p className="text-xs font-light opacity-70">
                  Collaborating with clients across 10+ countries
                </p>
              </div>
            </div>
          </div>

          {/* 4. Right Column: Ad Budget Card and Socials */}

          <div className="lg:col-span-1 flex flex-col items-end justify-end space-y-6">
            {/* Ad Budget Card */}

            <div className="w-full max-w-sm rounded-2xl p-6 bg-black/70 border border-red-500/50 backdrop-blur-md shadow-2xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
              <div className="w-full h-32 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-red-900 to-rose-900 flex items-center justify-center">
                {/* Animated pulse effect */}

                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>

                  <div className="relative bg-red-600 rounded-full w-20 h-20 flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-3xl font-extrabold text-red-400">
                  2K+ Automations
                </p>

                <Plus className="mx-auto my-3 w-5 h-5 text-red-400" />

                <p className="text-sm font-light opacity-80 mb-4">
                  We know how to get leads without blowing your budget
                </p>

                {/* Profile Avatars */}

                <div className="flex justify-center -space-x-2">
                  {profiles.map((p) => (
                    <ProfileAvatar
                      key={p.id}
                      name={p.name}
                      src={p.imageUrl} // <-- Add the image URL here
                      className="hover:z-10 transition-all duration-300"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Social Media Links */}

            <div className="flex flex-col space-y-4 pt-4 self-stretch sm:self-auto">
              {/* LinkedIn */}

              <button className="flex items-center justify-center w-full sm:w-16 h-16 bg-black/60 border border-white/20 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-red-500/50 group">
                <a href="https://www.linkedin.com/company/bricklix">
                  {" "}
                  <Linkedin className="w-6 h-6 group-hover:text-blue-400" />
                </a>
              </button>

              {/* X (Twitter) */}

              <button
                onClick={() => handleAction("Navigate to X (Twitter)")}
                className="flex items-center justify-center w-full sm:w-16 h-16 bg-black/60 border border-white/20 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-red-500/50 group"
              >
                <a href="https://www.instagram.com/bricklix.official/">
                  {" "}
                  <Instagram className="w-6 h-6 group-hover:text-white" />
                </a>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* 5. Live Feedback Box (for demonstrative working state) */}

      <div
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 p-3 px-6 bg-red-600 rounded-t-xl text-sm transition-opacity duration-300 z-50 ${
          feedback ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {feedback || "Action Feedback"}
      </div>
    </div>
  );
};

export default App;
