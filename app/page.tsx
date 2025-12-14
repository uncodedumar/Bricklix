import type { Metadata } from "next";
import Hero from "./components/Hero";
import SpotlightCardsSection from "./components/card";
import TiltedCardsSection from "./components/herocards";
import LogoLoopSection from "./components/logoloop";
// import ThreeCardsSection from "./components/whitebgcards";
import CTASection from "./components/Scale";
import TestimonialsSection from "./components/testimonial";
import FAQsSection from "./components/Faqs";
import TextLoop from "./components/textloop";
import Chatbot from "./components/chatbot";

export const metadata: Metadata = {
  title: "Home",
  description: "Transform your business with innovative digital solutions, cutting-edge technology, and expert development services. From web development to AI integration, we deliver results.",
  openGraph: {
    title: "Bricklix | Strategic Technology For Intelligent Growth",
    description: "Transform your business with innovative digital solutions, cutting-edge technology, and expert development services.",
    url: "https://www.bricklix.com",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <SpotlightCardsSection />
      <LogoLoopSection />
      <TiltedCardsSection />
      <CTASection />
      <TestimonialsSection />
      <FAQsSection />
      <Chatbot />
      <TextLoop texts={['Future-Proof Architecture Scalability Built-In Transparent Processes Exceptional Performance Security First Results-Driven Partnership Innovation Delivered Custom Solutions']} />
    </>
  );
}
