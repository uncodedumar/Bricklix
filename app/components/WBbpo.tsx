'use client';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface FeatureCardProps {
    stepNumber: string;
    title: string;
    description: string;
    index: number;
    isActive: boolean;
    onHover: () => void;
    onLeave: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
    stepNumber, 
    title, 
    description, 
    index,
    isActive,
    onHover,
    onLeave
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    // Mouse position for spotlight effect
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ 
                duration: 0.7, 
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1] 
            }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onMouseMove={handleMouseMove}
            className="relative group cursor-pointer"
        >
            {/* Spotlight gradient overlay */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 38, 38, 0.06), transparent 40%)`
                }}
            />

            {/* Card container */}
            <div className="relative p-8 rounded-2xl border border-stone-800/50 bg-stone-950/50 backdrop-blur-sm 
                          hover:border-red-900/30 hover:bg-stone-900/30 
                          transition-all duration-500 ease-out
                          h-full flex flex-col">

                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-900/20 to-transparent 
                              group-hover:via-red-600/40 transition-all duration-500" />

                {/* Step Number Badge */}
                <div className="relative mb-6">
                    <div className="flex items-center gap-4">
                        <div className="relative flex items-center justify-center w-12 h-12 rounded-xl 
                                      bg-gradient-to-br from-red-950/60 to-stone-900/60 
                                      border border-red-800/30 group-hover:border-red-600/50 
                                      shadow-lg shadow-red-950/20 group-hover:shadow-red-900/30
                                      transition-all duration-500">
                            <span className="text-red-500 font-mono text-sm font-bold tracking-wider 
                                           group-hover:text-red-400 transition-colors duration-300">
                                {stepNumber}
                            </span>

                            {/* Animated corner accent */}
                            
                        </div>

                        {/* Connector line */}
                        <div className="hidden sm:flex flex-1 h-px bg-gradient-to-r from-red-900/20 to-transparent 
                                      group-hover:from-red-600/30 transition-all duration-500" />
                    </div>
                </div>

                {/* Feature Content */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-100 mb-3 
                             group-hover:text-white transition-colors duration-300 leading-tight">
                    {title}
                </h3>

                <p className="text-stone-400 text-sm sm:text-base leading-relaxed flex-grow
                            group-hover:text-stone-300 transition-colors duration-300">
                    {description}
                </p>

                {/* Bottom action hint */}
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 
                              transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-mono text-red-400/80 uppercase tracking-widest">Learn more</span>
                </div>
            </div>
        </motion.div>
    );
};

export default function FeaturesGridSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax for background elements
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const featureData = [
        {
            title: "Cost-Effective Offshore Ops",
            description: "Reduce staffing and operational expenses by up to 60% while maintaining professional quality and seamless integration with your existing workflows."
        },
        {
            title: "U.S.-Aligned Communication",
            description: "Leadership team fluent in U.S. business culture, sales methodologies, and service-delivery standards. No translation layers, no miscommunication."
        },
        {
            title: "Scalable Team Model",
            description: "Start with a single dedicated agent and scale to a full operational team as your business grows. Infrastructure ready for rapid expansion."
        },
        {
            title: "Technology-Enabled BPO",
            description: "Modern outsourcing powered by intelligent automation, CRM integrations, AI-assisted workflows, and real-time performance dashboards."
        },
        {
            title: "Flexible Engagements",
            description: "Choose from part-time support, full-time dedicated agents, project-based teams, or fully managed operational units tailored to your needs."
        },
        {
            title: "Managed Service Partner",
            description: "We provide structure, reporting, quality assurance, and active supervision — not just remote workers. A true extension of your organization."
        }
    ];

    return (
        <section 
            ref={sectionRef}
            className="relative bg-black text-white py-32 overflow-hidden"
        >
            {/* Dynamic Background Layers */}
            <motion.div 
                style={{ y: bgY, opacity: bgOpacity }}
                className="absolute inset-0 pointer-events-none"
            >
                {/* Primary ambient glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 
                              w-[900px] h-[600px] bg-red-950/15 blur-[120px] rounded-full mix-blend-screen" />

                {/* Secondary subtle glow */}
                <div className="absolute bottom-1/4 right-1/4 
                              w-[500px] h-[400px] bg-red-900/8 blur-[100px] rounded-full mix-blend-screen" />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]"
                     style={{
                         backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                         backgroundSize: '60px 60px'
                     }} 
                />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

                {/* Section Header */}
                <div className="mb-24 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Eyebrow */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-px bg-red-600" />
                            <span className="text-red-500 font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                                Why Choose Us
                            </span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] text-stone-50 mb-6">
                            Six Pillars of<br />
                  
                                Operational Excellence
                            
                        </h2>

                        <p className="text-stone-400 text-lg sm:text-xl leading-relaxed max-w-2xl">
                            Every advantage designed to integrate seamlessly with your business 
                            and deliver measurable results from day one.
                        </p>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {featureData.map((feature, index) => {
                        const stepStr = String(index + 1).padStart(2, '0');

                        return (
                            <FeatureCard
                                key={index}
                                stepNumber={stepStr}
                                title={feature.title}
                                description={feature.description}
                                index={index}
                                isActive={activeIndex === index}
                                onHover={() => setActiveIndex(index)}
                                onLeave={() => setActiveIndex(null)}
                            />
                        );
                    })}
                </div>

                {/* Bottom CTA Area */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-24 pt-12 border-t border-stone-800/50"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold text-stone-100 mb-2">Ready to transform your operations?</h3>
                            <p className="text-stone-500">Join 200+ companies already scaling with our offshore teams.</p>
                        </div>
                        <Link href="/contact" passHref legacyBehavior>
  <button className="group relative px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-red-950/30 hover:shadow-red-900/40 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3">
    <span>Get Started</span>
    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </button>
</Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}