'use client';

// 1. Import the Next.js Image component
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

// REMOVED: Custom placeholder generator is no longer used, so the warning is gone.
// const PLACEHOLDER_URL = (text: string) => `https://placehold.co/150x150/1e293b/f87171?text=${text}`;

interface TeamMember {
    id: number;
    image: string;
    name: string;
    role: string;
    color: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        image: '/ab.webp',
        name: 'Abubakr',
        role: 'Ai Engineer & Data Scientist',
        color: 'from-red-800 to-stone-800'
    },
    {
        id: 2,
        image: '/abd.webp', 
        name: 'Abdullah',
        role: 'DevOps Engineer',
        color: 'from-stone-700 to-red-900'
    },
    {
        id: 3,
        image: '/u.jpg',
        name: 'Umar Riaz',
        role: 'Ai Scientist',
        color: 'from-red-700 to-red-900'
    },
    {
        id: 4,
        image: '/Oan.webp',
        name: 'Oan Ali',
        role: 'Project Manager',
        color: 'from-stone-600 to-red-800'
    },
    {
        id: 5,
        image: '/k.jpg',
        name: 'Kashif Awan',
        role: 'CEO',
        color: 'from-stone-700 to-stone-900'
        
    },
    {
        id: 6,
        image: '/a.jpeg',
        name: 'Anas Shahid',
        role: 'Managing Director',
        color: 'from-red-900 to-stone-900'
    },
    {
        id: 7,
        image: '/t1.webp',
        name: 'Riley Johnson',
        role: 'Product Manager',
        color: 'from-red-700 to-stone-900'
    },
    {
        id: 7,
        image: '/fahad.jpg',
        name: 'Fahad ',
        role: 'Product Coordinator',
        color: 'from-red-700 to-stone-900'
    },
    {
        id: 8,
        image: '/t2.webp',
        name: 'Quinn Martinez',
        role: 'Data Analyst',
        color: 'from-stone-800 to-red-800'
    },
    {
        id: 9,
        image: '/t3.webp',
        name: 'Quinn Martinez',
        role: 'Data Analyst',
        color: 'from-stone-800 to-red-800'
    }
    ,
    {
        id: 10,
        image: '/t4.webp',
        name: 'Quinn Martinez',
        role: 'Data Analyst',
        color: 'from-stone-800 to-red-800'
    }

    ,
    {
        id: 11,
        image: '/t5.webp',
        name: 'Quinn Martinez',
        role: 'Data Analyst',
        color: 'from-stone-800 to-red-800'
    }
];

// Component for individual team member card (150x150 strict size)
const TeamCard = ({ member }: { member: TeamMember }) => {
    // REMOVED: The state and useEffect for `imgSrc` and `setImgSrc` are no longer
    // needed as error handling for local <Image /> paths is not done this way.
    // This resolves the warning: 'imgSrc' is assigned a value but never used.

    return (
        // Wrapper for fixed width, minimal horizontal padding, and required 5px top padding
        <div className="w-[150px] flex-shrink-0 pt-[5px] pb-1 px-1">
            <div
                className={`group relative w-full h-auto overflow-hidden rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-red-500/30 bg-stone-900`}
            >
                {/* Image Container (Strictly 150x150) */}
                <div className="relative w-full h-[150px] overflow-hidden">
                    {/* 2. <Image /> is correctly implemented */}
                    <Image
                        src={member.image} // Use the original path
                        alt={member.name}
                        width={150} // Define the intrinsic width
                        height={150} // Define the intrinsic height
                        // Use 'object-cover' and 'scale' for styling and hover effect
                        className="object-cover transform transition-transform duration-500 group-hover:scale-120"
                        priority
                    />
                </div>

            </div>
        </div>
    );
};

export default function TeamFamilySection() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);

    useEffect(() => {
        setIsHeaderVisible(true);
    }, []);

    // 1. Split members into two rows (even and odd indices)
    const row1Base = teamMembers.filter((_, i) => i % 2 === 0);
    const row2Base = teamMembers.filter((_, i) => i % 2 !== 0);

    // 2. Duplicate and extend the list to create the seamless loop effect
    // We duplicate 4 times to ensure the animation is smooth and the loop is hidden
    const multiplier = 4;
    const row1Loop = Array(multiplier).fill(row1Base).flat();
    const row2Loop = Array(multiplier).fill(row2Base).flat();

    // The total width of one base set (4 cards * 154px width/card)
    const SCROLL_DISTANCE = 4 * 154; // 150px width + 4px (2px horizontal padding/border)

    return (
        <section className="relative bg-black py-20 px-4 overflow-hidden">
            {/* 🎥 BACKGROUND VIDEO CONTAINER 🎥 */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
            // ! IMPORTANT: Replace this with the actual path to your video file
            // I suggest using a subtle, abstract, or tech-themed video.
            >
                <source src="/teambg.mp4" type="video/mp4" />
                {/* Fallback for browsers that don't support the video tag */}
                Your browser does not support the video tag.
            </video>


            {/* Existing Background Grid Pattern and Floating Elements (Aesthetic) - Now over the video */}
            <div className="absolute inset-0 opacity-10 z-[1]" style={{
                // Changed from opacity-10 to opacity-5 to keep it subtle over the video
                opacity: 0.05,
            }}>
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }} />
            </div>
            <div className="absolute top-20 left-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl animate-pulse-slow z-[1]" />
            <div className="absolute top-40 right-20 w-24 h-24 bg-stone-600/10 rotate-45 blur-2xl z-[1]" />
            <div className="absolute bottom-40 right-40 w-40 h-40 bg-red-700/10 rounded-full blur-3xl z-[1]" />


            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        One Team,
                        <br />
                        <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                            One Dream
                        </span>
                        , One Family.
                    </h1>
                    <p className="text-stone-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                        Teamwork is the force behind our success. See our members scroll by in an endless display of dedication and synergy.
                    </p>
                </div>

                {/* Infinite Loop Container - Fixed height to ensure only 2 rows are visible (responsive width) */}
                {/* Card height is ~205px. Total height is set to 415px to account for small gaps */}
                <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" style={{ height: '415px' }}>

                    {/* Row 1: Scrolls Left */}
                    <div className="flex w-fit mb-1 animate-scroll-left">
                        {row1Loop.map((member, index) => (
                            <TeamCard key={`row1-${member.id}-${index}`} member={member} />
                        ))}
                    </div>

                    {/* Row 2: Scrolls Right */}
                    <div className="flex w-fit mt-1 animate-scroll-right">
                        {row2Loop.map((member, index) => (
                            <TeamCard key={`row2-${member.id}-${index}`} member={member} />
                        ))}
                    </div>
                </div>


            </div>

            <style jsx>{`
                /* Keyframes for the continuous loop */
                @keyframes scroll-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        /* Moves the length of one original, un-duplicated row set */
                        transform: translateX(-${SCROLL_DISTANCE}px);
                    }
                }
                @keyframes scroll-right {
                    0% {
                        /* Starts at the end of one set to loop back to the start */
                        transform: translateX(-${SCROLL_DISTANCE}px);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                /* Animation application */
                .animate-scroll-left {
                    animation: scroll-left 40s linear infinite; /* 40s duration for a smooth, slow scroll */
                }
                .animate-scroll-right {
                    animation: scroll-right 40s linear infinite;
                }
                
                /* Existing pulse-slow animation for aesthetic elements */
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.1); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}