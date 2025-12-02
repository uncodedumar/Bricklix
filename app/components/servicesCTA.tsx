'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
// 1. DecryptedText component import is removed
// import { DecryptedText } from '@/components/ui/decrypted-text'; // Remove this line if it was here

export default function CTASection() {
    const [isVisible, setIsVisible] = useState(false);
    // mousePos and handleMouseMove are kept but not visually used in the new design style
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <section className="relative bg-black py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Elements - Kept for styling */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-stone-700/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Main CTA Content Container - Simplified from the original */}
                <div className="relative p-0 overflow-hidden min-h-[400px]">
                    <p className="text-stone-400 text-center uppercase tracking-widest text-sm mb-4 transition-opacity duration-1000">
                        Let's Collaborate With Us
                    </p>

                    {/* 2. Heading is now a standard <h1> with the text directly inside */}
                    <h1 // Use an h1 for semantic correctness, and pass its styles as className
                        className={`text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[8rem] font-extrabold text-white text-center leading-none transition-all duration-1200 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                    >
                        Ready To Transform Your Digital Presence?
                        {/* DecryptedText component has been removed */}
                    </h1>
                    
                    {/* Footer Content and Button - Positioned to the bottom-left and bottom-right */}
                    <div className="mt-16 flex justify-between items-end pt-12 border-t border-stone-800">
                        {/* Description - Bottom Left */}
                        <div
                            className={`max-w-md transition-all duration-1200 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                        >
                            <p className="text-stone-300 text-base leading-relaxed">
                                Let's discuss your project and explore how we can help you achieve your business goals
                            </p>
                        </div>

                        {/* CTA Button - Bottom Right */}
                        <div
                            className={`transition-all duration-1200 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                        >
                            <Link href="/contact" className="group relative px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium text-base transition-all duration-300 hover:shadow-xl hover:shadow-red-700/50 flex items-center">
                                <span className="relative z-10 flex items-center">
                                    Book Free Consultation
                                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform duration-300" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                ---

                {/* Community Endorsement - RETAINED AS REQUESTED */}
                <div
                    className={`mt-12 text-center transition-all duration-1200 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    <p className="text-stone-500 text-sm mb-8">
                        Supported and loved by a growing community of developers and creators
                    </p>
                    <div className="flex flex-wrap justify-center gap-12">
                        {/* Community Metric 1: Discord/Slack Members */}
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">2,500+</p>
                            <p className="text-stone-400 text-sm">Community Members</p>
                        </div>
                        {/* Community Metric 2: Open Source Stars/Forks (e.g., GitHub) */}
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">400+</p>
                            <p className="text-stone-400 text-sm">GitHub Stars/Forks</p>
                        </div>
                        {/* Call to Action for Trust */}
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">Active</p>
                            <p className="text-stone-400 text-sm">Weekly Development</p>
                        </div>
                    </div>
                    <a
                        href="https://www.instagram.com/bricklix.official/" // IMPORTANT: Link this to your Discord/GitHub
                        className="mt-6 inline-block text-sm font-medium text-white border-b border-white hover:text-stone-300 hover:border-stone-300 transition"
                    >
                        Join us on Instagram
                    </a>
                </div>
            </div>
        </section>
    );
}