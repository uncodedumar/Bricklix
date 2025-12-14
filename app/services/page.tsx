// app/services/page.tsx

import type { Metadata } from "next";
import React from "react";
import HeroSection from "../components/serviceshero";
import AgendaSection from "../components/circles";
import ServicesBentoGrid from "../components/bento";
import PricingSection from "../components/servpricing";
import ServicesQuotation from "../components/servicesqutation";
import CTASection from "../components/servicesCTA";
import Chatbot from "../components/chatbot";

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive digital services including web development, mobile apps, UI/UX design, AI solutions, cybersecurity, and more. 30+ services to transform your business.",
  openGraph: {
    title: "Services | Bricklix",
    description: "Comprehensive digital services including web development, mobile apps, UI/UX design, AI solutions, cybersecurity, and more.",
    url: "https://www.bricklix.com/services",
  },
};

export default function servicesPage() {
  return (
    <>
      <HeroSection />
      <AgendaSection />
      <ServicesBentoGrid />
      <ServicesQuotation />
      <PricingSection />
      <Chatbot />
      <CTASection />
    </>
  );
}
