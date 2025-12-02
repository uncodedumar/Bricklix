import Navbar from "./components/navbar";
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

import Footer from "./components/footer";



export default function Home() {
  return (<>
    <Navbar></Navbar>
    <Hero></Hero>
    <SpotlightCardsSection></SpotlightCardsSection>
    <LogoLoopSection></LogoLoopSection>
    <TiltedCardsSection></TiltedCardsSection>
    
    <CTASection></CTASection>
    <TestimonialsSection></TestimonialsSection>
    <FAQsSection></FAQsSection>
    <Chatbot></Chatbot>
    <TextLoop texts={['Future-Proof Architecture Scalability Built-In Transparent Processes Exceptional Performance Security First Results-Driven Partnership Innovation Delivered Custom Solutions']}></TextLoop>
    <Footer></Footer>

  </>
  );
}
