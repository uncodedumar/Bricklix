'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react'; // Make sure to install lucide-react or swap with your own SVG

const PortfolioCard: React.FC<{ title: string; imagePath: string }> = ({ title, imagePath }) => {
    return (
        <div className="flex-shrink-0 w-[400px] h-[400px] mx-3 rounded-2xl overflow-hidden shadow-2xl bg-stone-900  hover:border-red-500 transition-all duration-300 transform hover:scale-[1.02] group relative">
            <div
                className="w-full h-full bg-stone-800 transition-transform duration-500 group-hover:scale-110"
                style={{
                    backgroundImage: `url(${imagePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                    <h3 className="text-xl font-bold text-white">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default function HeroPortfolioSection() {
   

    const carouselInnerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<{ id: number | null; position: number }>({ id: null, position: 0 });
    const lastScrollY = useRef(0);
    const scrollVelocity = useRef(0);

    const animate = useCallback(() => {
        const carouselEl = carouselInnerRef.current;
        if (!carouselEl) {
            animationRef.current.id = requestAnimationFrame(animate);
            return;
        }

        const currentScrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollDelta = currentScrollY - lastScrollY.current;
        scrollVelocity.current = scrollDelta * 2; 

        lastScrollY.current = currentScrollY;

        const BASE_SPEED = 3;
        const speed = BASE_SPEED + scrollVelocity.current;

        animationRef.current.position -= speed;
        scrollVelocity.current *= 0.95; 

        const totalVisibleWidth = carouselEl.scrollWidth / 3; 

        if (animationRef.current.position < -totalVisibleWidth) {
            animationRef.current.position = 0;
        }
        if (animationRef.current.position > 0) {
            animationRef.current.position = -totalVisibleWidth;
        }

        carouselEl.style.transform = `translateX(${animationRef.current.position}px)`;
        animationRef.current.id = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const currentAnimationRef = animationRef.current;
        currentAnimationRef.id = requestAnimationFrame(animate);

        return () => {
            if (currentAnimationRef.id) {
                cancelAnimationFrame(currentAnimationRef.id);
            }
        };
    }, [animate]);

    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-12 pt-32 pb-24 overflow-hidden  bg-black">
            {/* Background Video Element */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-15"
                aria-hidden="true"
            >
                <source src="/Portbg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Compressed Premium Chroma Ambient Radial Aura */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[140px] rounded-full pointer-events-none mix-blend-screen z-10" />
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Content Container */}
            <div className="w-full max-w-7xl mx-auto text-center relative z-20">
                {/* Micro-badge */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="inline-flex items-center gap-2.5 bg-stone-900/40 border border-stone-800/80 rounded-full px-4 py-1.5 text-xs uppercase tracking-wider text-red-500 font-medium mb-10 backdrop-blur-sm"
                >
                  
                    Next-Gen Global Architecture
                </motion.div>

                {/* Main Heading */}
                <motion.h1 
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[1.05] mb-8 text-stone-50"
                >
                    Outsource <span className="text-red-700">Smarter.</span><br />
                    Operate <span className="text-stone-500">Leaner.</span>
                </motion.h1>

                {/* Paragraph Description */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl mx-auto text-stone-400 text-base sm:text-lg font-normal leading-relaxed mb-12"
                >
                    Bricklix engineered a unified platform fusing elite offshore talent, advanced AI automations, 
                    and premium software engineering across the U.S., Europe, Middle East, and Pakistan.
                </motion.p>

                

            </div>
        </section>
    );
}