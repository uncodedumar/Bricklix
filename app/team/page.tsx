// app/services/page.tsx

import React from "react";
import Navbar from "../components/navbar";
import TeamHeroSection from "../components/teamhero";
import ProfilesSection from "../components/profiles";
import TeamIntroSection from "../components/teams";
import Chatbot from "../components/chatbot";
import Footer from "../components/footer";

export default function teamPage() {
  return (
    <>
      <Navbar></Navbar>
      <TeamHeroSection></TeamHeroSection>
      <Chatbot></Chatbot>
      <ProfilesSection></ProfilesSection>
      <TeamIntroSection></TeamIntroSection>

      <Footer></Footer>
    </>
  );
}
