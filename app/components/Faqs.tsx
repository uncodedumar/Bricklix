'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// TypeScript interface for FAQ data
interface FAQData {
  id: number;
  question: string;
  answer: string;
}

// Sample FAQ data
const faqsData: FAQData[] = [
  {
    id: 1,
    question: "What services does Bricklix offer?",
    answer: "At Bricklix, we specialize in digital creation that ignites passion and innovation. Our core services include custom software development, AI model integration, UI/UX design, web and mobile app development, branding, and digital illustrations. Whether you’re a startup or a scaling enterprise, we tailor each solution to your goals — no cookie-cutter work here."
  },
  {
    id: 2,
    question: "How does Bricklix approach new client projects?",
    answer: "We start with deep discovery sessions to understand your vision, goals, and challenges. From there, we build a custom roadmap — from concept to execution — ensuring you’re involved at every step. Our process blends creativity with precision, keeping your product not just functional, but unforgettable."
  },
  {
    id: 3,
    question: "What industries does Bricklix work with?",
    answer: "Our team thrives on diversity. We’ve worked across tech, education, fashion, gaming, design, and AI-driven industries. But truth be told — we don’t limit ourselves. If your project has innovation written all over it, we’re in."
  },
  {
    id: 4,
    question: "How long does it take to complete a project?",
    answer: "Timelines depend on the project’s scope and complexity. A standard web design might take 2–4 weeks, while full-scale applications or AI systems can range from 2–6 months. We always provide a transparent timeline and regular progress updates, so you’re never left in the dark."
  },
  {
    id: 5,
    question: "Why should I choose Bricklix over other software agencies?",
    answer: "Because Bricklix isn’t just about code — it’s about creating digital experiences that inspire. Our blend of artistic creativity, technical precision, and genuine passion makes us stand out. We don’t just deliver projects; we build long-term partnerships fueled by innovation and trust."
  }
];

// Individual FAQ Item Component
interface FAQItemProps {
  faq: FAQData;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItem = ({ faq, isOpen, onToggle, index }: FAQItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`border-1 rounded-2lg transition-all duration-300 ${isOpen
        ? 'border-stone-500 bg-stone-900'
        : 'border-gray-600/50 bg-stone-900 hover:border-stone-900'
        }`}
    >
      {/* Question Button */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 md:px-8 md:py-5 flex items-center font-light justify-between text-left group focus:outline-none focus:ring-2 focus:ring-red-600 rounded-2lg"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <span className={`text-base md:text-lg font-light transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'
          }`}>
          {faq.question}
        </span>

        {/* Plus/Minus Icon */}
        <div className={`flex-shrink-0 ml-4 transition-all duration-300 ${isOpen ? 'text-red-600' : 'text-gray-400 group-hover:text-white'
          }`}>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </motion.div>
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 md:px-8 md:pb-6">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent mb-5" />
              <p className="text-gray-300 text-sm font-light md:text-base leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main FAQs Section Component
export default function FAQsSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(4); // 4th FAQ open by default to match your image

  const handleToggle = (faqId: number) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <section className="py-5 md:py-6 px-4 bg-gradient-to-bl from-red-950 via-stone-950 to-black">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8">
            FAQs
          </h1>
          <p className="text-stone-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            Our Strategies help Business grow & to Exhibit themselves in the modern world.
          </p>
        </motion.div>

        {/* FAQs List */}
        <div className="space-y-2 md:space-y-2">
          {faqsData.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openFAQ === faq.id}
              onToggle={() => handleToggle(faq.id)}
              index={index}
            />
          ))}
        </div>


      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-30" />
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-blue-500 rounded-full animate-pulse opacity-20" />
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-25" />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-30" />
      </div>
    </section>
  );
}