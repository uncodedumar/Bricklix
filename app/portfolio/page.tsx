// app/portfolio/page.tsx

import type { Metadata } from "next";
import React from 'react';
import PortHero from "../components/porthero";
import Projects from "../components/projects";
import Chatbot from "../components/chatbot"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our portfolio of 120+ successful projects. See how we've helped businesses across 10+ countries achieve digital transformation and growth.",
  openGraph: {
    title: "Portfolio | Bricklix",
    description: "Explore our portfolio of 120+ successful projects across 10+ countries.",
    url: "https://www.bricklix.com/portfolio",
  },
};

export default function PortfolioPage() {
    return (
        <>
            <PortHero />
            <Projects />
            <Chatbot />
        </>
    );
}
