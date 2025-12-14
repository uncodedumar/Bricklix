// app/team/page.tsx

import type { Metadata } from "next";
import React from "react";
import TeamHeroSection from "../components/teamhero";
import ProfilesSection from "../components/profiles";
import TeamIntroSection from "../components/teams";
import Chatbot from "../components/chatbot";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the talented team behind Bricklix. Our experts in web development, design, AI, and cybersecurity are dedicated to delivering exceptional results.",
  openGraph: {
    title: "Our Team | Bricklix",
    description: "Meet the talented team behind Bricklix. Experts dedicated to delivering exceptional results.",
    url: "https://www.bricklix.com/team",
  },
};

export default function TeamPage() {
  return (
    <>
      <TeamHeroSection />
      <Chatbot />
      <ProfilesSection />
      <TeamIntroSection />
    </>
  );
}
