'use client'
import React, { useRef, useEffect, useState, useCallback } from 'react';
// 1. PERFORMANCE: Import Next.js Image component for optimization
import Image from 'next/image'; 
import { Code, Palette, Smartphone, Globe, Database, Shield, Cpu, Cloud, Lock, Zap, Layers, Settings, X, Phone } from 'lucide-react';

const DEFAULT_GLOW_COLOR = '239, 68, 68'; // Red color

// --- UTILITY FUNCTION (MUST BE KEPT CONSISTENT WITH FOOTER) ---
const createSlug = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-'); // Replace spaces with hyphens
};
// ----------------------------------------------------------------

// 2. AUGMENTED servicesData (Retained previous optimization/A11y additions)
const servicesData = [
    {
        id: 1,
        type: 'text',
        label: 'Development',
        title: 'Web Development',
        description: 'Modern, responsive websites built with latest technologies',
        icon: Code,
        span: 'col-span-1 row-span-1',
        image: '/web.avif',
        imageAlt: 'An abstract code structure representing modern web development', // SEO/A11y
        width: 600, // PERFORMANCE: Explicit dimensions to prevent CLS
        height: 350,
        fullDescription: 'We specialize in building high-performance, scalable web applications using modern frameworks like React, Next.js, and TypeScript. Our focus is on clean architecture, seamless user experience, and optimized performance for all devices. We handle everything from single-page applications to complex enterprise solutions.',
        contactLink: '/contact'
    },
    {
        id: 2,
        type: 'image-only',
        imageType: 'gradient-mesh',
        span: 'col-span-1 row-span-1'
    },
    {
        id: 3,
        type: 'text',
        label: 'Design',
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive interfaces that users love',
        icon: Palette,
        span: 'col-span-1 row-span-1',
        image: '/uiux.avif',
        imageAlt: 'A palette and color swatches symbolizing creative UI UX design process', // SEO/A11y
        width: 600,
        height: 350,
        fullDescription: 'Our design philosophy centers on the user. We create beautiful, intuitive, and accessible user interfaces (UI) and conduct thorough user experience (UX) research to ensure your product is not just attractive, but genuinely easy and enjoyable to use. We deliver prototypes, wireframes, and final design assets.',
        contactLink: '/contact' // Example link
    },
    {
        id: 4,
        type: 'text',
        label: 'Mobile',
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile applications',
        icon: Smartphone,
        span: 'col-span-1 row-span-1',
        image: '/mobile.jpg',
        imageAlt: 'Multiple mobile phone screens displaying app interfaces', // SEO/A11y
        width: 600,
        height: 350,
        fullDescription: 'Develop robust, high-quality mobile applications for iOS and Android. Whether you need native performance using Swift/Kotlin or cross-platform efficiency with React Native or Flutter, we deliver apps that leverage device capabilities for a superior mobile experience.',
        contactLink: '/contact'
    },
    {
        id: 5,
        type: 'image-only',
        imageType: 'abstract-shapes',
        span: 'col-span-1 row-span-1'
    },
    {
        id: 6,
        type: 'text',
        label: 'Innovation',
        title: 'Cloud Solutions',
        description: 'Scalable cloud infrastructure and deployment',
        icon: Database,
        span: 'lg:col-span-2 row-span-1',
        image: '/cloud.jpg',
        imageAlt: 'Abstract representation of cloud computing infrastructure and data flow', // SEO/A11y
        width: 900,
        height: 350,
        fullDescription: 'Leverage the power of the cloud (AWS, Azure, GCP) to achieve unmatched scalability, reliability, and cost-efficiency. We provide consultation, migration, and management for cloud infrastructure, ensuring your application is always running optimally.',
        contactLink: '/contact'
    },
    {
        id: 7,
        type: 'text',
        label: 'Digital',
        title: 'Digital Strategy',
        description: 'Data-driven strategies to grow your presence',
        icon: Globe,
        span: 'col-span-1 row-span-1',
        image: '/digital.avif',
        imageAlt: 'Global map with data points and connections, symbolizing digital reach', // SEO/A11y
        width: 600,
        height: 350,
        fullDescription: 'We help define your digital roadmap. From market analysis and audience definition to content strategy and performance measurement, our data-driven approach ensures your digital presence is aligned with your business goals and delivers measurable results.',
        contactLink: '/contact'
    },
    {
        id: 8,
        type: 'text',
        label: 'Integration',
        title: 'API Integration',
        description: 'Seamless third-party service connections',
        icon: Settings,
        span: 'col-span-1 row-span-1',
        image: '/ap.avif',
        imageAlt: 'Interconnected digital nodes, representing API and system integration', // SEO/A11y
        width: 600,
        height: 350,
        fullDescription: 'Integrate your core systems with essential third-party services, payment gateways, and external APIs. We build secure, reliable, and well-documented APIs to ensure seamless communication between different software systems, streamlining your business processes.',
        contactLink: '/contact'
    },
    {
        id: 9,
        type: 'image-only',
        imageType: 'geometric-pattern',
        span: 'col-span-1 row-span-1'
    },
    {
        id: 10,
        type: 'text',
        label: 'AI/ML',
        title: 'AI Solutions',
        description: 'Intelligent automation and machine learning',
        icon: Cpu,
        span: 'col-span-1 row-span-1',
        image: '/ai.jpg',
        imageAlt: 'A futuristic human brain graphic with digital connections for AI and machine learning', // SEO/A11y
        width: 600,
        height: 350,
        fullDescription: 'Harness the power of Artificial Intelligence and Machine Learning to automate tasks, gain deeper insights from data, and create smarter products. Our services include model development, deployment, and integration for solutions like predictive analytics and natural language processing.',
        contactLink: '/contact'
    },
    {
        id: 11,
        type: 'text',
        label: 'Infrastructure',
        title: 'DevOps',
        description: 'CI/CD pipelines and infrastructure automation',
        icon: Cloud,
        span: 'col-span-1 row-span-1',
        image: '/devops.avif',
        imageAlt: 'Flowchart diagram symbolizing Continuous Integration and Continuous Deployment (CI/CD) pipeline', // SEO/A11y
        width: 600,
        height: 350,
        fullDescription: 'Implement robust DevOps practices, including Continuous Integration and Continuous Deployment (CI/CD), infrastructure as code (IaC), and automated testing. This accelerates your release cycles, improves reliability, and ensures a smooth operational workflow.',
        contactLink: '/contact'
    },
    {
        id: 12,
        type: 'image-only',
        imageType: 'wave-pattern',
        span: 'col-span-1 row-span-1'
    },
    {
        id: 13,
        type: 'text',
        label: 'Security',
        title: 'Cybersecurity',
        description: 'Enterprise-grade security solutions',
        icon: Shield,
        span: 'col-span-1 row-span-1',
        image: '/cyber.avif',
        imageAlt: 'A digital shield icon representing comprehensive cybersecurity protection', // SEO/A11y
        width: 600,
        height: 350,
        fullDescription: 'Protect your assets with comprehensive cybersecurity services. We offer penetration testing, security audits, compliance checks, and implementation of advanced security protocols to safeguard your application and user data against emerging threats.',
        contactLink: '/contact'
    },
    {
        id: 14,
        type: 'text',
        label: 'Performance',
        title: 'Optimization',
        description: 'Speed and performance enhancement',
        icon: Zap,
        span: 'lg:col-span-2 row-span-1',
        image: '/opt.webp',
        imageAlt: 'A graphic representing high-speed data flow and system optimization', // SEO/A11y
        width: 900,
        height: 350,
        fullDescription: 'Maximize your application speed and efficiency. Our optimization services include code profiling, database tuning, caching strategies, and load balancing to ensure your product delivers a fast, seamless experience even under high traffic.',
        contactLink: '/contact'
    },
    {
        id: 15,
        type: 'text',
        label: 'Protection',
        title: 'Data Security',
        description: 'Secure data storage and encryption',
        icon: Lock,
        span: 'col-span-1 row-span-1',
        image: '/sec.avif',
        imageAlt: 'A digital padlock icon over a secure database, representing data security', // SEO/A11y
        width: 600,
        height: 350,
        fullDescription: 'Ensure the confidentiality and integrity of your sensitive data. We implement industry-leading encryption standards, secure database configurations, and robust access control mechanisms to protect data both at rest and in transit.',
        contactLink: '/contact'
    },
    {
        id: 16,
        type: 'image-only',
        imageType: 'dots-grid',
        span: 'col-span-1 row-span-1'
    },
    {
        id: 17,
        type: 'text',
        label: 'Architecture',
        title: 'System Design',
        description: 'Scalable architecture and microservices',
        icon: Layers,
        span: 'col-span-1 row-span-1',
        image: '/sys.jpg',
        imageAlt: 'Layered abstract design, symbolizing complex system architecture', // SEO/A11y
        width: 600,
        height: 350,
        fullDescription: 'Design resilient and scalable system architectures, transitioning from monolithic structures to modern microservices where appropriate. We focus on creating a foundation that can easily handle future growth and evolution of your business needs.',
        contactLink: '/contact'
    }
];

// Helper function remains the same
const createParticleElement = (x: number, y: number): HTMLDivElement => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(${DEFAULT_GLOW_COLOR}, 1);
        box-shadow: 0 0 6px rgba(${DEFAULT_GLOW_COLOR}, 0.6);
        pointer-events: none;
        z-index: 100;
        left: ${x}px;
        top: ${y}px;
    `;
    return el;
};

// 3. AUGMENTED ServiceDetails for Image fields
interface ServiceDetails extends Omit<typeof servicesData[0], 'icon'> {
    icon: React.ElementType;
    fullDescription: string;
    contactLink: string;
    imageAlt: string; // Added imageAlt
    width: number; // Added width
    height: number; // Added height
}

// 4. MODIFIED ServiceDetailsModal Component (A11y & Image Performance)
const ServiceDetailsModal: React.FC<{ 
    service: ServiceDetails | null; 
    onClose: () => void 
}> = ({ service, onClose }) => {
    if (!service) return null;

    return (
        // A11Y: Added role and aria-modal for screen readers
        <div 
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden transform scale-95 opacity-0 sm:scale-100 sm:opacity-100 transition-all duration-300 ease-out"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                style={{ animation: 'slide-up-modal 0.5s ease-out forwards' }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Column: Image and Main Info */}
                    <div className="relative p-6 sm:p-8 flex flex-col justify-between">
                        <div className="absolute inset-0">
                            {service.image && (
                                // PERFORMANCE: Use Next.js Image component
                                <Image 
                                    src={service.image} 
                                    alt={service.imageAlt} // SEO/A11y: Use descriptive alt text
                                    width={service.width}
                                    height={service.height}
                                    className="w-full h-full object-cover opacity-30 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/80 to-transparent" />
                        </div>

                        <div className="relative z-10">
                            <service.icon className="w-8 h-8 text-red-500 mb-4" aria-hidden="true" />
                            <span className="text-stone-400 text-sm font-medium px-3 py-1 bg-stone-800/50 rounded-full border border-stone-700 mb-2 inline-block">
                                {service.label}
                            </span>
                            {/* A11Y: Title of modal */}
                            <h2 id="modal-title" className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-snug">{service.title}</h2>
                            <p className="text-stone-300 text-lg mb-6">{service.description}</p>
                             
                            {/* Contact Button */}
                            <a 
                                href={service.contactLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3 border border-red-500 text-base font-semibold rounded-full text-white bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-500/20"
                            >
                                <Phone className="w-5 h-5 mr-3" aria-hidden="true" />
                                Free Consultation
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Full Description and Close Button */}
                    <div className="p-6 sm:p-8 bg-stone-950/50 flex flex-col justify-between">
                        <h3 className="text-2xl font-semibold text-red-400 mb-4">Detailed Overview</h3>
                        <p className="text-stone-400 text-base leading-relaxed mb-8 flex-grow">
                            {service.fullDescription}
                        </p>
                         
                        <button
                            onClick={onClose}
                            className="w-full py-3 border border-stone-700 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 transition-all duration-200 mt-4 flex items-center justify-center"
                            aria-label={`Close details for ${service.title}`} // A11Y: Descriptive aria-label
                        >
                            <X className="w-5 h-5 mr-2" aria-hidden="true" />
                            Close Details
                        </button>
                    </div>
                </div>
                 
                {/* Top Right Close Button for convenience on larger screens */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-stone-800/80 hover:bg-stone-700/80 backdrop-blur-sm rounded-full text-white transition-all duration-300"
                    aria-label="Close" // A11Y: Simple aria-label for icon button
                >
                    <X className="w-6 h-6" aria-hidden="true" />
                </button>
            </div>
             
            <style jsx global>{`
                /* ... (Original Modal CSS) ... */
                @keyframes slide-up-modal {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @media (max-width: 640px) { /* Small screen adjustments for better mobile feel */
                    .animate-fade-in > div {
                        transform: none !important;
                        opacity: 1 !important;
                        animation: none !important;
                    }
                }
            `}</style>
        </div>
    );
};


// 5. MODIFIED ServiceCard Component (A11y, Performance, Mobile Hiding, ANCHOR LINKS)
const ServiceCard: React.FC<{ 
    service: typeof servicesData[0]; 
    index: number;
    onClick: (service: typeof servicesData[0]) => void;
}> = ({ service, index, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);
    const isHoveredRef = useRef(false);
    const [isVisible, setIsVisible] = useState(false);

    // ... (Particle and intersection observer logic remains the same) ...
    const clearParticles = useCallback(() => {
        particlesRef.current.forEach(p => p.remove());
        particlesRef.current = [];
    }, []);

    const animateParticles = useCallback(() => {
        if (!cardRef.current || !isHoveredRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const particleCount = 12;

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                if (!isHoveredRef.current || !cardRef.current) return;

                const particle = createParticleElement(
                    Math.random() * rect.width,
                    Math.random() * rect.height
                );
                cardRef.current.appendChild(particle);
                particlesRef.current.push(particle);

                const xMove = (Math.random() - 0.5) * 120;
                const yMove = (Math.random() - 0.5) * 120;
                const rotation = Math.random() * 360;

                particle.style.transition = 'all 2.5s cubic-bezier(0.4, 0, 0.2, 1)';
                particle.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${rotation}deg) scale(0)`;
                particle.style.opacity = '0';

                setTimeout(() => particle.remove(), 2500);
            }, i * 80);
        }
    }, []);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(card);

        const handleMouseEnter = () => {
            isHoveredRef.current = true;
            animateParticles();
        };

        const handleMouseLeave = () => {
            isHoveredRef.current = false;
            clearParticles();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mousemove', handleMouseMove);

        return () => {
            observer.disconnect();
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
            card.removeEventListener('mousemove', handleMouseMove);
            clearParticles();
        };
    }, [animateParticles, clearParticles]);


    // Determine the class to hide image-only divs on mobile
    const mobileHideClass = service.type === 'image-only' ? 'hidden md:block' : '';
    
    // Determine the ID for text-type services (ANCHOR LINK IMPLEMENTATION)
    const serviceId = service.type === 'text' && service.title 
    ? createSlug(service.title) 
    : undefined;

    return (
        // A11y: Added role="button" and tabIndex={0} for keyboard navigation, conditional on type='text'
        <div
            ref={cardRef}
            id={serviceId} // <--- ANCHOR ID IMPLEMENTED HERE for footer linking
            // Only clickable for service.type === 'text'
            onClick={service.type === 'text' ? () => onClick(service) : undefined}
            role={service.type === 'text' ? 'button' : undefined}
            tabIndex={service.type === 'text' ? 0 : undefined}
            aria-label={service.type === 'text' ? `View detailed description for ${service.title}` : undefined} // A11y
            className={`service-card ${service.span} relative overflow-hidden rounded-2xl border border-stone-800 p-0 group ${service.type === 'text' ? 'cursor-pointer' : 'cursor-default'} transition-all duration-300 ease-in-out block ${isVisible ? 'animate-slide-up' : 'opacity-0'
                } ${service.type === 'text' ? 'bg-black' : 'bg-gradient-to-br from-stone-700 to-black'} ${mobileHideClass}`}
            style={{
                aspectRatio: service.type === 'image-only' ? '1 / 1' : undefined,
                minHeight: '180px',
                animationDelay: `${index * 100}ms`,
            }}
        >
            {/* Image-Only Card Content (purely decorative, hidden on mobile for performance/A11y) */}
            {service.type === 'image-only' && (
                <div className="absolute inset-0 p-6" aria-hidden="true"> {/* A11y: aria-hidden for screen readers */}
                    {service.imageType === 'gradient-mesh' && (
                        <div className="w-full h-full relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-stone-500/20 to-red-600/30 blur-2xl animate-pulse-slow" />
                            <div className="absolute inset-0 bg-gradient-to-tl from-red-600/20 via-transparent to-stone-500/20 blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
                        </div>
                    )}
                    {service.imageType === 'abstract-shapes' && (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="relative w-24 h-24">
                                <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                                <div className="absolute inset-4 bg-stone-500/30 rounded-full animate-pulse" />
                                <div className="absolute inset-8 bg-red-600/40 rounded-full" />
                            </div>
                        </div>
                    )}
                    {service.imageType === 'geometric-pattern' && (
                        <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-2">
                            {[...Array(9)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-gradient-to-br from-red-500/20 to-stone-700/20 rounded-lg animate-float"
                                    style={{
                                        animationDelay: `${i * 200}ms`,
                                        opacity: Math.random() * 0.5 + 0.5
                                    }}
                                />
                            ))}
                        </div>
                    )}
                    {service.imageType === 'wave-pattern' && (
                        <div className="w-full h-full flex flex-col justify-center gap-3">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-full h-2 bg-gradient-to-r from-transparent via-red-500/40 to-transparent rounded-full animate-slide-right"
                                    style={{ animationDelay: `${i * 400}ms` }}
                                />
                            ))}
                        </div>
                    )}
                    {service.imageType === 'dots-grid' && (
                        <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-3 p-2">
                            {[...Array(25)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-full h-full bg-red-500/30 rounded-full animate-pulse"
                                    style={{
                                        animationDelay: `${i * 100}ms`,
                                        animationDuration: `${2 + Math.random() * 2}s`
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Text Card Content */}
            {service.type === 'text' && (
                <div className="p-4 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <span className="text-stone-400 text-sm font-medium px-3 py-1 bg-stone-900/50 rounded-full border border-stone-800 group-hover:border-red-500/50 group-hover:text-red-400 transition-all duration-300">
                            {service.label}
                        </span>
                        <div className="p-2 bg-stone-800/50 rounded-lg border border-stone-700 group-hover:border-red-500/30 group-hover:scale-110 transition-all duration-300">
                            {service.icon && <service.icon className="w-5 h-5 text-stone-400 group-hover:text-red-400 group-hover:rotate-12 transition-all duration-300" aria-hidden="true" />}
                        </div>
                    </div>

                    {/* Image block using Next.js Image */}
                    <div className="relative w-full flex-grow mx-auto mt-4 mb-4 rounded-xl overflow-hidden shadow-xl"
                        style={{
                            backgroundColor: 'stone-950',
                            minHeight: '100px',
                            aspectRatio: '16/9',
                            maxHeight: '350px'
                        }}>
                        {service.image && service.width && service.height && (
                            <Image
                                src={service.image}
                                alt={service.imageAlt || service.title} // SEO/A11y
                                width={service.width} // PERFORMANCE
                                height={service.height} // PERFORMANCE
                                loading="lazy" // PERFORMANCE: Lazy load
                                className="absolute inset-0 w-full h-full object-cover rounded-xl "
                            />
                        )}
                    </div>

                    <div className="transform group-hover:translate-y-[-4px] transition-transform duration-300 mt-auto">
                        <h3 className="text-white text-lg font-bold mb-1 group-hover:text-red-400 transition-colors duration-300">{service.title}</h3>
                        <p className="text-stone-400 text-sm leading-relaxed group-hover:text-stone-300 transition-colors duration-300">{service.description}</p>
                    </div>
                </div>
            )}

            {/* Mouse tracking glow (Decorative) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div
                    className="absolute w-64 h-64 rounded-full blur-3xl"
                    style={{
                        background: `radial-gradient(circle, rgba(${DEFAULT_GLOW_COLOR}, ${service.type === 'text' ? '0.1' : '0.2'}) 0%, transparent 70%)`,
                        left: 'var(--mouse-x, 50%)',
                        top: 'var(--mouse-y, 50%)',
                        transform: 'translate(-50%, -50%)'
                    }}
                    aria-hidden="true" 
                />
            </div>

            {/* Hover Overlay (Decorative) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-red-600/10 to-transparent" aria-hidden="true" />
        </div>
    );
};


// 6. ServicesBento Component 
const ServicesBento = () => {
    // ... (State and Ref definitions)
    const gridRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // New State for Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);

    // --- ANCHOR LINK JUMP LOGIC ---
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash) {
            const hash = window.location.hash.substring(1);
            // Wait for the component to render and then attempt to scroll
            const timer = setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    // Use smooth scrolling and adjust for fixed headers if necessary
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // OPTIONAL: Open the modal automatically if it's a known service, for a deeper link experience
                    const serviceToOpen = servicesData.find(s => s.type === 'text' && s.title && createSlug(s.title) === hash);                    if (serviceToOpen) {
                        openServiceModal(serviceToOpen);
                    }
                }
            }, 500); // Small delay to ensure all cards have loaded and animations run
            
            return () => clearTimeout(timer);
        }
    }, []); // Run only on mount

    const openServiceModal = (service: typeof servicesData[0]) => {
        // Only open modal for 'text' type services, which contain the full info
        if (service.type === 'text') {
            setSelectedService(service as ServiceDetails); 
            setIsModalOpen(true);
            document.body.style.overflow = 'hidden'; // Disable background scroll
        }
    };

    const closeServiceModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
        document.body.style.overflow = 'unset'; // Re-enable background scroll
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!gridRef.current) return;

            const rect = gridRef.current.getBoundingClientRect();
            const isInside = e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom;

            setIsHovering(isInside);
            if (isInside) {
                setMousePos({ x: e.clientX, y: e.clientY });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isModalOpen) {
                closeServiceModal();
            }
        };

        if (isModalOpen) {
            window.addEventListener('keydown', handleKeydown);
        } else {
            window.removeEventListener('keydown', handleKeydown);
        }

        return () => window.removeEventListener('keydown', handleKeydown);
    }, [isModalOpen]);


    return (
        <div className="relative bg-black min-h-screen py-20 overflow-hidden">
            {/* Background Elements - A11y: Added aria-hidden as they are purely decorative */}
            <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute top-20 left-20 w-64 h-64 bg-red-600/5 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-stone-700/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            {/* Spotlight Effect - A11y: Added aria-hidden as it is purely decorative */}
            {isHovering && (
                <div
                    className="fixed pointer-events-none z-50 transition-opacity duration-300"
                    style={{
                        left: mousePos.x,
                        top: mousePos.y,
                        width: '600px',
                        height: '600px',
                        transform: 'translate(-50%, -50%)',
                        background: `radial-gradient(circle, rgba(${DEFAULT_GLOW_COLOR}, 0.08) 0%, rgba(${DEFAULT_GLOW_COLOR}, 0.04) 25%, transparent 70%)`,
                        opacity: 0.6
                    }}
                    aria-hidden="true"
                />
            )}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    {/* SEO: Ensure hierarchy is correct (e.g., this H2 is the main heading) */}
                    <div className="inline-flex items-center px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full mb-6 animate-fade-in">
                        <span className="text-red-400 text-sm font-medium">What We Offer</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                        Our{' '}
                        <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text font-normal text-transparent">
                            Services
                        </span>
                    </h2>
                    <p className="text-stone-400 text-base sm:text-lg max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '400ms' }}>
                        Comprehensive solutions tailored to transform your digital presence
                    </p>
                </div>

                {/* Bento Grid */}
                <div
                    ref={gridRef}
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    style={{
                        gridAutoRows: 'minmax(180px, auto)'
                    }}
                >
                    {servicesData.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} onClick={openServiceModal} />
                    ))}
                </div>
            </div>
             
            {/* NEW: Render the Modal component */}
            {isModalOpen && (
                <ServiceDetailsModal service={selectedService} onClose={closeServiceModal} />
            )}

            <style jsx>{`
                /* ... (Original CSS styles remain here) ... */
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes slide-right {
                    0% { transform: translateX(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateX(100%); opacity: 0; }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                }

                .animate-slide-up {
                    animation: slide-up 0.6s ease-out forwards;
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-slide-right {
                    animation: slide-right 3s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }

                .service-card {
                    --glow-x: 50%;
                    --glow-y: 50%;
                    --glow-intensity: 0;
                    --mouse-x: 50%;
                    --mouse-y: 50%;
                    grid-column: span 1;
                    grid-row: span 1;
                    /* Ensure scroll margin/padding if you have a fixed header */
                    scroll-margin-top: 100px; /* Adjust this value if you have a sticky header */
                }

                .service-card::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    padding: 2px;
                    background: radial-gradient(
                        400px circle at var(--glow-x) var(--glow-y),
                        rgba(${DEFAULT_GLOW_COLOR}, calc(var(--glow-intensity) * 0.6)) 0%,
                        rgba(${DEFAULT_GLOW_COLOR}, calc(var(--glow-intensity) * 0.3)) 30%,
                        transparent 60%
                    );
                    border-radius: inherit;
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask-composite: exclude;
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .service-card:hover {
                    transform: translateY(-4px);
                    border-color: rgba(239, 68, 68, 0.3);
                    box-shadow: 0 20px 40px rgba(239, 68, 68, 0.15);
                }

                .service-card:hover::after {
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};

export default ServicesBento;