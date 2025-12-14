'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, BarChart3, TrendingUp, Users, LucideIcon, ArrowRight } from 'lucide-react';

// --- Interface & Component for Stat Cards (UI Matched & Accessible) ---

// Interface for StatCard props
interface StatCardProps {
    icon: LucideIcon;
    value: string;
    label: string;
    isPrimary?: boolean; // Highlight one card for visual interest
}

// Utility component for the stat cards
const StatCard = ({ icon: Icon, value, label, isPrimary = false }: StatCardProps) => (
    // Accessibility: Role for a descriptive unit of information
    <article className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-red-500/40 shadow-xl transition-transform duration-300 hover:scale-[1.05] hover:bg-black/60 w-full max-w-[280px] text-left mx-auto lg:mx-0">
        <header className="flex items-center space-x-3 mb-2">
            <Icon 
                className={`w-6 h-6 ${isPrimary ? 'text-red-400' : 'text-gray-300'}`} 
                aria-hidden="true" 
            />
            <p className="text-sm font-light text-gray-400 uppercase tracking-widest">{label}</p>
        </header>
        
        {/* SEO/Accessibility: Use H3 for better outline and primary value highlight */}
        <h3 className={`text-5xl font-extrabold ${isPrimary ? 'text-red-500' : 'text-white'} leading-tight`}>{value}</h3>
    </article>
);

// --- Main Hero Component ---

const ServicesHero: React.FC = () => {
    // State to handle video loading failure
    const [mediaFailed, setMediaFailed] = useState<boolean>(false);
    
    // Define optimized sources
    const videoSrc = "/servbg.mp4";
    const imageFallbackSrc = "/servbg-fallback.webp"; // Using an optimized WebP image fallback

    return (
        // SEO: Use <section> with a descriptive role
        <section 
            className="relative bg-black text-white min-h-screen flex flex-col items-center overflow-hidden font-['Poppins']"
            role="region"
            aria-label="Digital Agency Services Overview"
        >
            
            {/* 1. Background Media and Overlay (Performance & Accessibility) */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                {!mediaFailed ? (
                    // Video element
                    <video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                        aria-hidden="true" // Hide decorative video from screen readers
                        onError={() => setMediaFailed(true)} // Set flag on error
                    />
                ) : (
                    // Image Fallback (Performance: Use priority for LCP candidate)
                    <Image
                        src={imageFallbackSrc}
                        alt="Abstract digital network representing our comprehensive services"
                        fill
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                        priority={true} // Performance: Essential for LCP
                        sizes="100vw"
                    />
                )}
                
                {/* Optimized Gradient Overlay (Matches previous dark theme) */}
                <div 
                    className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/80 via-black/30 to-black/90"
                    aria-hidden="true"
                ></div>
                
                {/* Aesthetic Red Mesh Pattern */}
                <div 
                    className="mesh-pattern absolute inset-0 opacity-20 animate-pulse-slow"
                    aria-hidden="true"
                ></div>
            </div>

            
            {/* 2. Content Wrapper */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-24 md:pt-40 pb-16 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-12 items-center">
                
                {/* LEFT SECTION: Title, Description, CTAs */}
                <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left">
                    
                    {/* Pre-headline (SEO: Use a semantic paragraph) */}
                    <p className="text-sm font-medium tracking-widest uppercase text-red-500 py-1 mx-auto lg:mx-0">
                        Crafting Beautiful and Functional Results
                    </p>

                    {/* H1 (SEO: Must be the main focus of the page) */}
                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-tight tracking-tighter">
                        Transforming <br className="hidden md:block"/> Visions Into Digital Reality
                    </h1>
                    
                    {/* Description */}
                    <p className="max-w-xl text-lg font-light text-gray-300 mx-auto lg:mx-0">
                        We’re a full-service digital agency specializing in cutting-edge web development, strategic branding, and data-driven marketing solutions that propel businesses to new heights.
                    </p>

                    {/* Call to Action Buttons (UX & SEO: Critical for conversion) */}
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-6 justify-center lg:justify-start">
                        {/* Primary CTA */}
                        <Link
                            href="/contact"
                            className="group flex items-center justify-center px-8 py-4 font-semibold text-lg bg-red-600 text-white rounded-xl transition-all duration-300 hover:bg-red-700 shadow-lg red-glow-shadow focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 max-w-xs sm:max-w-none mx-auto sm:mx-0"
                        >
                            Start Your Project
                            <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                        
                        
                    </div>
                    
                    {/* Social Proof (Accessibility: Use an ARIA role) */}
                    <div className="flex items-center space-x-3 text-sm pt-8 justify-center lg:justify-start" role="note" aria-label="Social proof statistic">
                        <p className="font-light">
                            <span className="font-semibold text-white">500+</span> people & brands have used our services
                        </p>
                    </div>
                </div>

                {/* RIGHT SECTION: Stats Cards */}
                {/* Uses flex-wrap for horizontal stacking on small screens, and flex-col for vertical stacking on large screens */}
                <div className="lg:col-span-5 flex flex-wrap justify-center gap-6 lg:flex-col lg:space-y-6 lg:justify-end lg:items-end w-full lg:pt-16">
                    {/* Added isPrimary=true for the highest value card for a nice visual accent */}
                    <StatCard 
                        icon={TrendingUp} 
                        value="98%" 
                        label="Client Satisfaction" 
                        isPrimary={true}
                    />
                    <StatCard 
                        icon={BarChart3} 
                        value="200+" 
                        label="Projects Completed" 
                    />
                    <StatCard 
                        icon={Users} 
                        value="50+" 
                        label="Expert Teams" 
                    />
                </div>
            </div>
            
            {/* Scroll Indicator (Aesthetic/UX) */}
            <div className="relative z-10 p-4 pb-8 flex justify-center items-center">
                <ChevronDown className="w-6 h-6 text-white animate-bounce" aria-hidden="true" />
            </div>
            
            
            {/* Global Styles (Kept external to avoid component clutter) */}
            <style jsx global>{`
                /* Import Poppins font for consistency */
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
                
                /* PERFORMANCE: Load font from preload tag for LCP improvement */
                /* In your main document <head>, you should add:
                */

                /* Keyframes for the slow pulse animation */
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.02); } /* Reduced scale for subtler effect */
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s infinite ease-in-out;
                }

                /* Fixed Mesh Pattern */
                .mesh-pattern {
                    /* Red-500 equivalent: rgba(239, 68, 68, 0.5) */
                    background-image: radial-gradient(circle, rgba(239,68,68,0.5) 1px, transparent 0);
                    background-size: 15px 15px;
                }

                /* Red Glow Shadow (Applied to primary CTA for visual pop) */
                .red-glow-shadow {
                    box-shadow: 0 0 40px rgba(239,68,68,0.5); /* Slightly softer red glow */
                }
            `}</style>
        </section>
    );
};

export default ServicesHero;