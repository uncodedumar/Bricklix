'use client';

import React, { useEffect, useRef, useCallback } from 'react';
// Removed: import Link from 'next/link'; to resolve "Could not resolve next/link" error.
// Using standard <a> tags instead for navigation in this environment.

// PortfolioCard component now uses its 'title' prop in the overlay
const PortfolioCard: React.FC<{ title: string; imagePath: string }> = ({ title, imagePath }) => {
    return (
        <div className="flex-shrink-0 w-[400px] h-[400px] mx-3 rounded-2xl overflow-hidden shadow-2xl bg-stone-900 border border-stone-700/50 hover:border-red-500 transition-all duration-300 transform hover:scale-[1.02] group relative">
            {/* Full Image - No Text Overlay */}
            <div
                className="w-full h-full bg-stone-800 transition-transform duration-500 group-hover:scale-110"
                style={{
                    backgroundImage: `url(${imagePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            {/* Hover Overlay with Title - Title is now used here */}
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

export default function PortfolioCarousel() {
    const cards = [
     
        { title: '', src: "/pt2.svg" },
        { title: '', src: "/pt3.svg" },
        { title: '', src: "/pt4.svg" },
        { title: '', src: "/pt5.svg" },
        { title: '', src: "/pt6.svg" },
        { title: '', src: "/pt7.svg" },
        { title: '', src: "/pt8.svg" },
        { title: '', src: "/pt9.svg" },
        { title: '', src: "/pt10.svg" }
    ];

    const carouselInnerRef = useRef<HTMLDivElement>(null);
    // Ref structure to hold the continuous animation state
    const animationRef = useRef<{ id: number | null; position: number }>({ id: null, position: 0 });
    const lastScrollY = useRef(0);
    const scrollVelocity = useRef(0);

    const animate = useCallback(() => {
        const carouselEl = carouselInnerRef.current;
        if (!carouselEl) {
            // Use the ref to store the next frame ID
            animationRef.current.id = requestAnimationFrame(animate);
            return;
        }

        // Get current scroll position
        const currentScrollY = window.scrollY || document.documentElement.scrollTop;

        // Calculate scroll delta and velocity
        const scrollDelta = currentScrollY - lastScrollY.current;
        scrollVelocity.current = scrollDelta * 2; // 2x multiplier for faster response

        // Update last scroll position
        lastScrollY.current = currentScrollY;

        // Base speed (continuous slow movement)
        const BASE_SPEED = 0.5;

        // Calculate final speed (base + scroll velocity)
        const speed = BASE_SPEED + scrollVelocity.current;

        // Update position
        animationRef.current.position -= speed;

        // Smooth velocity decay
        scrollVelocity.current *= 0.95;

        // Loop logic
        // We use the first two copies of the cards array for the total length calculation
        const totalVisibleWidth = carouselEl.scrollWidth / 3; // Now dividing by 3 since we triple the content

        // This is the width of one full set of cards. The loop ensures we stay within 
        // the bounds of the first two card sets to maintain smooth infinite scrolling.
        if (animationRef.current.position < -totalVisibleWidth) {
            animationRef.current.position = 0;
        }
        if (animationRef.current.position > 0) {
            animationRef.current.position = -totalVisibleWidth;
        }

        // Apply transformation
        carouselEl.style.transform = `translateX(${animationRef.current.position}px)`;

        // Request next frame, updating the ID in the ref
        animationRef.current.id = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        // FIX: Copy the mutable ref object to a local variable *outside* the cleanup closure.
        // This resolves the react-hooks/exhaustive-deps warning by capturing the ref value 
        // at the time the effect runs, even though the properties are mutated later.
        const currentAnimationRef = animationRef.current;
        currentAnimationRef.id = requestAnimationFrame(animate);

        return () => {
            // Use the captured local variable to access the ID for cleanup.
            if (currentAnimationRef.id) {
                cancelAnimationFrame(currentAnimationRef.id);
            }
        };
    }, [animate]);

    return (
        <div className="relative min-h-screen bg-black text-white pt-20 pb-16 overflow-hidden">
            {/* 1. Background Video Element */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-20"
            >
                {/* Add your video source here */}
                <source src="/portbg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Optional: Dark Overlay on Video for better text readability */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* Content Container (z-20 to ensure it's above the video and overlay) */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Content */}
                <div className="text-center pt-20 pb-20 md:pt-28 md:pb-32">
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6">
                        <span className="text-red-500">/</span>Elevating Brands,
                    </h1>
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-stone-300">
                        One Portfolio at a Time.
                    </h2>

                    {/* Buttons */}
                    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                        {/* Replaced Next.js Link with <a> tag */}
                        <a href='/contact' className="flex items-center justify-center space-x-2 px-8 py-4 bg-red-700 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-red-600 hover:shadow-xl hover:shadow-red-700/30 ring-2 ring-red-700/50">
                            <span>Let&apos;s Collaborate</span>
                            <span>→</span>
                        </a>
                        {/* Replaced Next.js Link with <a> tag */}
                        <a href='/contact' className="flex items-center justify-center space-x-2 px-8 py-4 bg-stone-900 text-stone-200 border border-stone-600 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-stone-800 hover:text-white hover:border-red-500">
                            <span>Contact Us Now</span>
                            <span className="text-red-500">✉</span>
                        </a>
                    </div>
                </div>

                {/* Animated Carousel Section */}
                <div className="relative overflow-hidden pt-10 pb-10">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

                    <div
                        ref={carouselInnerRef}
                        className="flex will-change-transform"
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        {/* Triple the content for smoother infinite scroll */}
                        {[...cards, ...cards, ...cards].map((card, index) => (
                            <PortfolioCard
                                key={index}
                                title={card.title}
                                imagePath={card.src}
                            />
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
}
