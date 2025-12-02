'use client';

import React, { useRef, useState } from 'react';
import { Users } from 'lucide-react';
import Image from 'next/image'; // Re-imported to be used below

// ChromaGrid Component
interface ChromaItem {
    image: string;
    title: string;
    subtitle: string;
    handle?: string;
    location?: string;
    borderColor?: string;
    gradient?: string;
    url?: string;
}

interface ChromaGridProps {
    items?: ChromaItem[];
    className?: string;
    radius?: number;
    // Keeping these props defined but they are currently unused
    damping?: number;
    fadeOut?: number;
    ease?: string;
}

const ChromaGrid: React.FC<ChromaGridProps> = ({
    items = [],
    className = '',
    radius = 300,
    // Removed unused props from destructuring: damping, fadeOut, ease
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const fadeRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });
    const [isHovering, setIsHovering] = useState(false);

    const handleMove = (e: React.PointerEvent) => {
        if (!rootRef.current) return;
        const r = rootRef.current.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        setMousePos({ x: `${x}px`, y: `${y}px` });
        setIsHovering(true);
    };

    const handleLeave = () => {
        setIsHovering(false);
    };

    const handleCardClick = (url?: string) => {
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
        const c = e.currentTarget as HTMLElement;
        const rect = c.getBoundingClientRect();
        c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    return (
        <div
            ref={rootRef}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            className={`relative w-full h-full flex flex-wrap justify-center items-start gap-4 md:gap-6 p-4 ${className}`}
            style={{
                '--r': `${radius}px`,
                '--x': mousePos.x,
                '--y': mousePos.y
            } as React.CSSProperties}
        >
            {items.map((item, i) => (
                <article
                    key={i}
                    onMouseMove={handleCardMove}
                    onClick={() => handleCardClick(item.url)}
                    className="group relative flex flex-col w-full sm:w-[280px] md:w-[300px] rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
                    style={{
                        '--card-border': item.borderColor || 'transparent',
                        background: item.gradient,
                        borderColor: item.borderColor || 'transparent',
                        '--spotlight-color': 'rgba(255,255,255,0.3)',
                        '--mouse-x': '50%',
                        '--mouse-y': '50%'
                    } as React.CSSProperties}
                >
                    {/* Spotlight Effect */}
                    <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
                        style={{
                            background: 'radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
                        }}
                    />

                    {/* Image Container */}
                    <div className="relative z-10 flex-1 p-3 box-border">
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                            {/* FIX: Replaced <img> with Next.js <Image /> component */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill // Use fill to make it cover the parent div
                                sizes="(max-width: 640px) 100vw, 300px"
                                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                priority={i < 4} // Optional: prioritize loading the first few images
                            />
                        </div>
                    </div>

                    {/* Card Footer */}
                    <footer className="relative z-10 p-4 text-white font-sans">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            {item.handle && <span className="text-sm opacity-80">{item.handle}</span>}
                        </div>
                        <div className="flex justify-between items-end">
                            <p className="text-sm opacity-85">{item.subtitle}</p>
                            {item.location && <span className="text-xs opacity-75">{item.location}</span>}
                        </div>
                    </footer>
                </article>
            ))}

            {/* Grayscale Mask Overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
                style={{
                    backdropFilter: 'grayscale(1) brightness(0.78)',
                    WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
                    background: 'rgba(0,0,0,0.001)',
                    maskImage: `radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 15%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.68) 88%, white 100%)`,
                    WebkitMaskImage: `radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 15%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.68) 88%, white 100%)`,
                    opacity: isHovering ? 1 : 0
                }}
            />

            {/* Fade Overlay */}
            <div
                ref={fadeRef}
                className="absolute inset-0 pointer-events-none transition-opacity duration-600 z-40"
                style={{
                    backdropFilter: 'grayscale(1) brightness(0.78)',
                    WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
                    background: 'rgba(0,0,0,0.001)',
                    maskImage: `radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, white 15%, rgba(255,255,255,0.90) 30%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.32) 88%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, white 15%, rgba(255,255,255,0.90) 30%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.32) 88%, transparent 100%)`,
                    opacity: isHovering ? 0 : 1
                }}
            />
        </div>
    );
};

// Team Data
const teamMembers: ChromaItem[] = [
    {
        image: "/k.jpg",
        title: "Kashif Awan",
        subtitle: "CEO & Sales Head",
        handle: "@Kash",
        location: "NYC",
        borderColor: "#EF4444",
        gradient: "linear-gradient(145deg, #EF4444, #000)",

    },
    {
        image: "/a.jpeg",
        title: "Anas Shahid",
        subtitle: "Managing Director",
        handle: "@anasshahid",
        location: "SF",
        borderColor: "#F59E0B",
        gradient: "linear-gradient(145deg, #F59E0B, #000)",
    },
    {
        image: "/u.jpg",
        title: "Umar Riaz",
        subtitle: "MERN Stack Developer & AI Designer",
        handle: "@uncodedumar",
        location: "Lahore",
        borderColor: "#8B5CF6",
        gradient: "linear-gradient(195deg, #8B5CF6, #000)",
    },
    
    {
        image: "/ab.webp",
        title: "Abu Bakr",
        subtitle: "AI Engineer & Data Scientist",
        handle: "@theabubakr",
        location: "CHI",
        borderColor: "#3B82F6",
        gradient: "linear-gradient(165deg, #3B82F6, #000)",
    },
    

    {
        image: "/Oan.webp",
        title: "Oan Ali",
        subtitle: "Project Manager",
        handle: "@oanali",
        location: "Coventry",
        borderColor: "#8B5CF6",
        gradient: "linear-gradient(195deg, #8B5CF6, #000)",
    },
    

    {
        image: "/fahad.jpg",
        title: "Fahad",
        subtitle: "Project Coordinator",
        handle: "@fahad",
        location: "NYC",
        borderColor: "#8B5CF6",
        gradient: "linear-gradient(195deg, #8B5CF6, #000)",
    }
    ,
    {
        image: "/abd.webp",
        title: "Abdullah Naeem",
        subtitle: "DevOps Engineer",
        handle: "@abdullahnaeem",
        location: "LA",
        borderColor: "#10B981",
        gradient: "linear-gradient(210deg, #10B981, #000)",
    },
    {
        image: "/t1.webp",
        title: "Asma",
        subtitle: "UI/UX Designer",
        handle: "@asma66",
        location: "Luton",
        borderColor: "#EC4899",
        gradient: "linear-gradient(225deg, #EC4899, #000)",
    },
    {
        image: "/t2.webp",
        title: "David Clark",
        subtitle: "MLOPS Engineer",
        handle: "@asma66",
        location: "Luton",
        borderColor: "#EC4899",
        gradient: "linear-gradient(225deg, #EC4899, #000)",
    }
,
    {
        image: "/t3.webp",
        title: "Jessi Anderson",
        subtitle: "App Developer",
        handle: "@Janderson",
        location: "SF",
        borderColor: "#EC4899",
        gradient: "linear-gradient(225deg, #EC4899, #000)",
    },
    {
        image: "/t4.webp",
        title: "Sam Kim",
        subtitle: "Data Scientist",
        handle: "@thesamkim",
        location: "SEA",
        borderColor: "#EC4899",
        gradient: "linear-gradient(225deg, #EC4899, #000)",
    },
    {
        image: "/t5.webp",
        title: "Cooper Williams",
        subtitle: "Digital Marketing",
        handle: "@Cwilliams",
        location: "LA",
        borderColor: "#EC4899",
        gradient: "linear-gradient(225deg, #EC4899, #000)",
    }
];

// Main Profiles Section Component
export default function ProfilesSection() {
    const [isVisible, setIsVisible] = useState(false);

    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative bg-black min-h-screen py-20 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-red-600/5 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-stone-700/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full mb-6">
                        <Users className="w-5 h-5 mr-2 text-red-400" />
                        <span className="text-red-400 text-sm font-medium">Our Team</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Meet Our{' '}
                        <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                            Talented Team
                        </span>
                    </h2>
                    <p className="text-stone-400 text-lg max-w-2xl mx-auto">
                        Passionate professionals dedicated to delivering exceptional results and driving innovation
                    </p>
                </div>

                {/* ChromaGrid Component */}
                <div className={`transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <ChromaGrid
                        items={teamMembers}
                        radius={300}
                        damping={0.45}
                        fadeOut={0.6}
                        ease="power3.out"
                    />
                </div>

            </div>

            <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

      `}</style>
        </section>
    );
}