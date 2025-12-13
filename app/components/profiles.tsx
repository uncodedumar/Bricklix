'use client';

import React, { useRef, useState } from 'react';
import { X, Users } from 'lucide-react';
import Image from 'next/image';

// --- Interface & Data Updates ------------------------------------------------
/**
 * ChromaItem interface:
 * - Removed 'handle?'
 * - Added 'bio' for the modal content
 */
interface ChromaItem {
    image: string;
    title: string;
    subtitle: string;
    location?: string;
    borderColor?: string;
    gradient?: string;
    url?: string;
    bio: {
        paragraph: string;
        bullets: string[];
    };
}

interface ChromaGridProps {
    items?: ChromaItem[];
    className?: string;
    radius?: number;
    damping?: number;
    fadeOut?: number;
    ease?: string;
    // New prop for handling profile click to open the modal
    onCardClick: (item: ChromaItem) => void;
}

// Team Data (Updated with bio and removed handles)
const teamMembers: ChromaItem[] = [
    {
        image: "/k.jpg",
        title: "Kashif Awan",
        subtitle: "CEO & Sales Head",
        // handle: "@Kash", // Removed
        location: "NYC",
        borderColor: "#EF4444",
        gradient: "linear-gradient(145deg, #EF4444, #000)",
        bio: {
            paragraph: "Kashif Zulfiqar Awan drives enterprise transformation through strategic program leadership, PMO governance, and executive-level management across global organizations.",
            bullets: ["Senior Program Director & Executive Consultant — AT&T (via WNA Ltd.)","Director — Ericsson","President & Owner — Awan Business Management Group LLC","Program & Portfolio Management", "PMO Strategy & Governance", "Executive Leadership & Stakeholder Engagement", "Agile & Team Development"],
        },
    },
    {
        image: "/a.jpeg",
        title: "Anas Shahid",
        subtitle: "Managing Director",
        // handle: "@anasshahid", // Removed
        location: "SF",
        borderColor: "#F59E0B",
        gradient: "linear-gradient(145deg, #F59E0B, #000)",
        bio: {
            paragraph: "As the Managing Director, a dynamic leader at Bricklix. With 5+ years in computer sciences, web, and mobile development, he drives innovation by blending deep technical expertise with a high level of artistic precision and craftsmanship.",
            bullets: ["Operational Excellence", "Team Management", "Process Optimization", "Strategic Planning"],
        },
    },
    {
        image: "/u.jpg",
        title: "Umar Riaz",
        subtitle: "MERN Stack Developer & AI Designer",
        // handle: "@uncodedumar", // Removed
        location: "Lahore",
        borderColor: "#8B5CF6",
        gradient: "linear-gradient(195deg, #8B5CF6, #000)",
        bio: {
            paragraph: "Umar Riaz heads Bricklix’s Design & Development Team and co-architects its digital vision. With 5+ years in AI, web, and Designing, he balances strong technical intelligence with strategic, visionary leadership.",
            bullets: ["Full-Stack Development (MERN)", "AI/UX Design Integration", "Scalable Applications", "Performance Optimization"],
        },
    },

   



   
    {
        image: "/t1.jpg",
        title: "Asma",
        subtitle: "UI/UX Designer",
        // handle: "@asma66", // Removed
        location: "Luton",
        borderColor: "#EC4899",
        gradient: "linear-gradient(225deg, #EC4899, #000)",
        bio: {
            paragraph: "Asma crafts compelling and user-friendly interfaces, focusing on accessibility and optimal user journeys across all our digital products.",
            bullets: ["Figma Prototyping", "User Research", "Wireframing & Mockups", "Design System Management"],
        },
    },
    
    {
        image: "/Oan.png",
        title: "Oan Ali",
        subtitle: "Project Manager",
        // handle: "@oanali", // Removed
        location: "Coventry",
        borderColor: "#8B5CF6",
        gradient: "linear-gradient(195deg, #8B5CF6, #000)",
        bio: {
            paragraph: "Oan Ali is Bricklix's strategic Project Manager and Business Developer. With 5+ years in client relations and management, he bridges innovation and execution, ensuring every Bricklix project is delivered with precision and purpose.",
            bullets: ["Agile/Scrum Certified", "Stakeholder Communication", "Risk Management", "Budgeting and Resource Allocation"],
        },
    },
    {
        image: "/abd.jpg",
        title: "Abdullah Naeem",
        subtitle: "DevOps Engineer",
        // handle: "@abdullahnaeem", // Removed
        location: "LA",
        borderColor: "#10B981",
        gradient: "linear-gradient(210deg, #10B981, #000)",
        bio: {
            paragraph: "Abdullah is the DevOps backbone of Bricklix. With 5+ years in cloud infrastructure, automation, and CI/CD pipelines, he ensures every line of code transitions seamlessly, transforming complex technical frameworks into smooth, scalable operations.",
            bullets: ["CI/CD Automation", "Infrastructure as Code (IaC)", "Containerization (Docker/Kubernetes)", "System Monitoring"],
        },
    },
    {
        image: "/t2.jpg",
        title: "David Clark",
        subtitle: "MLOPS Engineer",
        // handle: "@asma66", // Removed
        location: "Luton",
        borderColor: "#EC4899",
        gradient: "linear-gradient(225deg, #EC4899, #000)",
        bio: {
            paragraph: "David manages the deployment and maintenance of machine learning models in production environments, ensuring their performance and reliability.",
            bullets: ["Model Monitoring", "Data Pipeline Management", "Scalable ML Deployment", "CI/CD for ML"],
        },
    }
    ,
    {
        image: "/ab.jpg",
        title: "Abu Bakr",
        subtitle: "AI Engineer & Data Scientist",
        // handle: "@theabubakr", // Removed
        location: "CHI",
        borderColor: "#3B82F6",
        gradient: "linear-gradient(165deg, #3B82F6, #000)",
        bio: {
            paragraph: "Abu Bakr is Bricklix's AI powerhouse. As a Data Scientist with 5+ years in machine learning and neural networks, he transforms complex data into clarity, driving the company's smartest innovations and predictive analytics.",
            bullets: ["Machine Learning & AI Development", "Data Analysis", "Predictive Modeling", "Cloud Computing"],
        },
    },
    {
        image: "/t3.jpg",
        title: "Jessi Anderson",
        subtitle: "App Developer",
        // handle: "@Janderson", // Removed
        location: "SF",
        borderColor: "#EC4899",
        gradient: "linear-gradient(225deg, #EC4899, #000)",
        bio: {
            paragraph: "Jessi is a skilled app developer focused on building high-performance mobile applications for both iOS and Android platforms.",
            bullets: ["React Native/Flutter", "Mobile UI/UX Implementation", "API Integration", "App Store Optimization"],
        },
    },
    {
        image: "/t4.jpg",
        title: "Sam Kim",
        subtitle: "Data Scientist",
        // handle: "@thesamkim", // Removed
        location: "SEA",
        borderColor: "#EC4899",
        gradient: "linear-gradient(225deg, #EC4899, #000)",
        bio: {
            paragraph: "Sam turns raw data into actionable business intelligence using statistical analysis and advanced data visualization techniques.",
            bullets: ["Statistical Modeling", "Python/R Expertise", "Data Visualization", "Big Data Processing"],
        },
    },
    

    {
        image: "/fahad.jpg",
        title: "Fahad",
        subtitle: "Project Coordinator",
        // handle: "@fahad", // Removed
        location: "NYC",
        borderColor: "#8B5CF6",
        gradient: "linear-gradient(195deg, #8B5CF6, #000)",
        bio: {
            paragraph: "Fahad is the Project Coordinator for Bricklix and chief orchestrator of execution. His robust background in strategic planning and team management ensures all digital and creative visions are translated into on-time, high-quality deliverables.",
            bullets: ["Scheduling and Tracking", "Resource Coordination", "Documentation Management", "Team Support"],
        },
    }
    ,
    {
        image: "/us.jpg",
        title: "Usman Hassan",
        subtitle: "Graphic Designer",
        // handle: "@Cwilliams", // Removed
        location: "LA",
        borderColor: "#EC4899",
        gradient: "linear-gradient(225deg, #EC4899, #000)",
        bio: {
            paragraph: "Usman Hassan is the creative engine and Graphic Designer for Bricklix. With 1+ years of experience in digital creativity, he blends artistic instinct with strategic thinking to transform ideas into striking, high-performing designs.",
            bullets: ["Design Support", "Asset Creation", "Software Practice", "Visual Research"],
        },
        
    },
    {
        image: "/t5.jpg",
        title: "Cooper Williams",
        subtitle: "Digital Marketing",
        // handle: "@Cwilliams", // Removed
        location: "LA",
        borderColor: "#EC4899",
        gradient: "linear-gradient(225deg, #EC4899, #000)",
        bio: {
            paragraph: "Cooper manages all digital channels, driving brand awareness and lead generation through targeted online campaigns and content strategy.",
            bullets: ["SEO/SEM Strategy", "Social Media Management", "Content Marketing", "Performance Analytics"],
        },
        
    }
];

// --- ChromaGrid Component ----------------------------------------------------
const ChromaGrid: React.FC<ChromaGridProps> = ({
    items = [],
    className = '',
    radius = 300,
    onCardClick, // Added for the click handler
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

    const handleCardClick = (item: ChromaItem) => {
        // Use the new onCardClick prop to pass the item to the parent (ProfilesSection)
        onCardClick(item);
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
                    // Updated onClick to use the new handler and pass the item object
                    onClick={() => handleCardClick(item)} 
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
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 640px) 100vw, 300px"
                                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                priority={i < 4}
                            />
                        </div>
                    </div>

                    {/* Card Footer */}
                    <footer className="relative z-10 p-4 text-white font-sans">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            {/* item.handle is removed from here */}
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

// --- Profile Modal Component -------------------------------------------------
interface ProfileModalProps {
    profile: ChromaItem | null;
    onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onClose }) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });

    if (!profile) return null;

    // Logic for the spotlight effect inside the modal
    const handleMove = (e: React.PointerEvent) => {
        if (!rootRef.current) return;
        const r = rootRef.current.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        setMousePos({ x: `${x}px`, y: `${y}px` });
    };

    return (
        // Backdrop overlay
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose} // Close modal when clicking the backdrop
        >
            {/* Modal Content Container */}
            <div
                ref={rootRef}
                onPointerMove={handleMove}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                className="relative flex flex-col w-full max-w-lg md:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 p-6 md:p-10 transition-all duration-500 scale-100 shadow-2xl"
                style={{
                    '--card-border': profile.borderColor || 'transparent',
                    background: profile.gradient, // Same color as the card
                    borderColor: profile.borderColor || 'transparent',
                    '--spotlight-color': 'rgba(255,255,255,0.3)',
                    '--mouse-x': mousePos.x,
                    '--mouse-y': mousePos.y
                } as React.CSSProperties}
            >
                {/* Close Button on Top Right */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"
                    aria-label="Close"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Spotlight Effect (Same hover effect logic, but always active) */}
                <div
                    className="absolute inset-0 pointer-events-none z-20 opacity-100"
                    style={{
                        background: 'radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
                    }}
                />

                {/* Profile Details Content */}
                <div className="relative z-30 text-white flex flex-col md:flex-row gap-6">
                    {/* Image, Name, Position */}
                    <div className="flex flex-col items-center md:items-start md:w-1/3">
                        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/50 mb-4">
                            <Image
                                src={profile.image}
                                alt={profile.title}
                                fill
                                sizes="200px"
                                className="object-cover"
                                priority
                            />
                        </div>
                        <h2 className="text-3xl font-bold text-center md:text-left mb-1">{profile.title}</h2>
                        <p className="text-lg font-medium text-center md:text-left opacity-85 mb-4 border-b border-white/30 pb-2 w-full">
                            {profile.subtitle}
                        </p>
                        {profile.location && <p className="text-sm opacity-75">Location: {profile.location}</p>}
                    </div>

                    {/* Biography */}
                    <div className="md:w-2/3">
                        <h3 className="text-xl font-semibold mb-3">Biography</h3>
                        <p className="text-md mb-4 opacity-90 leading-relaxed">
                            {profile.bio.paragraph}
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            {profile.bio.bullets.map((bullet, index) => (
                                <li key={index} className="text-sm opacity-80">{bullet}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main Profiles Section Component -----------------------------------------
export default function ProfilesSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<ChromaItem | null>(null);

    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    const openModal = (item: ChromaItem) => {
        setSelectedProfile(item);
    };

    const closeModal = () => {
        setSelectedProfile(null);
    };

    return (
        <section className="relative bg-black min-h-screen py-20 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-red-600/5 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-stone-700/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 relative z-10">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Meet Our{' '}
                        <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                            Amazing Team
                        </span>
                    </h2>
                    <p className="text-stone-400 text-lg max-w-2xl mx-auto">
                        Dedicated professionals passionate about making a difference
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
                        onCardClick={openModal} // Pass the click handler to open the modal
                    />
                </div>

            </div>

            {/* Profile Detail Modal */}
            <ProfileModal
                profile={selectedProfile}
                onClose={closeModal}
            />

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