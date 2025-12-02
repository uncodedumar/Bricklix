// app/services/page.tsx

import React from 'react';
import Navbar from '../components/navbar';
import Footer from "../components/footer";
import PortHero from "../components/porthero";
import Projects from "../components/projects";
import Chatbot from "../components/chatbot"


export default function portfolioPage() {
    return (<>
        <Navbar></Navbar>
        <PortHero></PortHero>
        <Projects></Projects>
        <Chatbot></Chatbot>
    
 
        <Footer></Footer>
    </>
    );
}
