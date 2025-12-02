'use client'
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Code, Palette, Smartphone, Globe, Database, Shield, Cpu, Cloud, Lock, Zap, Layers, Settings } from 'lucide-react';

const DEFAULT_GLOW_COLOR = '239, 68, 68'; // Red color

const servicesData = [
    {
        id: 1,
        type: 'text',
        label: 'Development',
        title: 'Web Development',
        description: 'Modern, responsive websites built with latest technologies',
        icon: Code,
        span: 'col-span-1 row-span-1'
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
        span: 'col-span-1 row-span-1'
    },
    {
        id: 4,
        type: 'text',
        label: 'Mobile',
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile applications',
        icon: Smartphone,
        span: 'col-span-1 row-span-1'
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
        span: 'lg:col-span-2 row-span-1' // Adjusted span for large screens
    },
    {
        id: 7,
        type: 'text',
        label: 'Digital',
        title: 'Digital Strategy',
        description: 'Data-driven strategies to grow your presence',
        icon: Globe,
        span: 'col-span-1 row-span-1'
    },
    {
        id: 8,
        type: 'text',
        label: 'Integration',
        title: 'API Integration',
        description: 'Seamless third-party service connections',
        icon: Settings,
        span: 'col-span-1 row-span-1'
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
        span: 'col-span-1 row-span-1'
    },
    {
        id: 11,
        type: 'text',
        label: 'Infrastructure',
        title: 'DevOps',
        description: 'CI/CD pipelines and infrastructure automation',
        icon: Cloud,
        span: 'col-span-1 row-span-1'
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
        span: 'col-span-1 row-span-1'
    },
    {
        id: 14,
        type: 'text',
        label: 'Performance',
        title: 'Optimization',
        description: 'Speed and performance enhancement',
        icon: Zap,
        span: 'lg:col-span-2 row-span-1' // Adjusted span for large screens
    },
    {
        id: 15,
        type: 'text',
        label: 'Protection',
        title: 'Data Security',
        description: 'Secure data storage and encryption',
        icon: Lock,
        span: 'col-span-1 row-span-1'
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
        span: 'col-span-1 row-span-1'
    }
];

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

const ServiceCard: React.FC<{ service: typeof servicesData[0]; index: number }> = ({ service, index }) => {
    const cardRef = useRef<HTMLAnchorElement>(null); // Changed to AnchorElement
    const particlesRef = useRef<HTMLDivElement[]>([]);
    const isHoveredRef = useRef(false);
    const [isVisible, setIsVisible] = useState(false);

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

    // **Wrapped in <a> tag for /contact link**
    return (
        <a
            href="/contact"
            ref={cardRef}
            className={`service-card ${service.span} relative overflow-hidden rounded-2xl border border-stone-800 p-0 group cursor-pointer transition-all duration-300 ease-in-out block ${isVisible ? 'animate-slide-up' : 'opacity-0'
                } ${service.type === 'text' ? 'bg-black' : 'bg-gradient-to-br from-stone-700 to-black'}`}
            style={{
                aspectRatio: service.type === 'image-only' ? '1 / 1' : undefined,
                minHeight: '180px',
                animationDelay: `${index * 100}ms`,
            }}
        >
            {/* Image-Only Card Content */}
            {service.type === 'image-only' && (
                <div className="absolute inset-0 p-6">
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
                <div className="p-6 h-full">
                    <div className="relative z-10 h-full flex flex-col justify-between ">
                        <div className="flex justify-between items-start">
                            <span className="text-stone-400 text-sm font-medium px-3 py-1 bg-stone-900/50 rounded-full border border-stone-800 group-hover:border-red-500/50 group-hover:text-red-400 transition-all duration-300">
                                {service.label}
                            </span>
                            <div className="p-2 bg-stone-800/50 rounded-lg border border-stone-700 group-hover:border-red-500/30 group-hover:scale-110 transition-all duration-300">
                                {service.icon && <service.icon className="w-5 h-5 text-stone-400 group-hover:text-red-400 group-hover:rotate-12 transition-all duration-300" />}
                            </div>
                        </div>
                        <div className="transform group-hover:translate-y-[-4px] transition-transform duration-300">
                            <h3 className="text-white text-lg font-bold mb-2 group-hover:text-red-400 transition-colors duration-300">{service.title}</h3>
                            <p className="text-stone-400 text-sm leading-relaxed group-hover:text-stone-300 transition-colors duration-300">{service.description}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Mouse tracking glow - Applied to both types */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div
                    className="absolute w-64 h-64 rounded-full blur-3xl"
                    style={{
                        background: `radial-gradient(circle, rgba(${DEFAULT_GLOW_COLOR}, ${service.type === 'text' ? '0.1' : '0.2'}) 0%, transparent 70%)`,
                        left: 'var(--mouse-x, 50%)',
                        top: 'var(--mouse-y, 50%)',
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            </div>

            {/* Hover Overlay - Applied to both types */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-red-600/10 to-transparent" />
        </a>
    );
};

const ServicesBento = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

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

    return (
        <div className="relative bg-black min-h-screen py-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-red-600/5 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-stone-700/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            {/* Spotlight Effect */}
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
                />
            )}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
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

                {/* Bento Grid - Added full responsiveness here */}
                <div
                    ref={gridRef}
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    style={{
                        gridAutoRows: 'minmax(180px, auto)'
                    }}
                >
                    {servicesData.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                /* Simplified CSS to rely more on Tailwind classes for responsiveness,
                   but keeping necessary custom animations and hover effects */

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
                    /* Ensure initial state for responsiveness */
                    grid-column: span 1;
                    grid-row: span 1;
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

                /* Mobile/Default: grid-cols-1, all cards are full-width/span-1 */
                /* Tablet (md:): grid-cols-2, all cards remain span-1 to balance the layout */
                /* Desktop (lg:): grid-cols-3, using lg:col-span-2 for wider cards */
                
                /*
                  Removed specific media queries for col-span since the Tailwind utility
                  classes already handle this on the grid container and the service spans
                  are defined to work with it:
                  col-span-1 (default) -> md:col-span-1 -> lg:col-span-1
                  lg:col-span-2 (on specific cards)
                  
                  This ensures a fully responsive flow:
                  - Mobile: 1 column
                  - Tablet: 2 columns
                  - Desktop: 3 columns (with some spanning 2 columns)
                */
            `}</style>
        </div>
    );
};

export default ServicesBento;