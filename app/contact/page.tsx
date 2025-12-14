// app/contact/page.tsx

import type { Metadata } from "next";
import React from 'react';
import ContactSection from "../components/contact";
import Chatbot from "../components/chatbot"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Bricklix for a free consultation. Contact us via phone, email, or visit our office in Darien, IL. We're here to help transform your business.",
  openGraph: {
    title: "Contact Us | Bricklix",
    description: "Get in touch with Bricklix for a free consultation. We're here to help transform your business.",
    url: "https://www.bricklix.com/contact",
  },
};

export default function ContactPage() {
    return (
        <>
            <ContactSection />
            <Chatbot />
        </>
    );
}

