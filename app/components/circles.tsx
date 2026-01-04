'use client';
import React, { useEffect, useRef, ReactNode, useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

// --- ScrollFloat Component ---
interface ScrollFloatProps {
    children: ReactNode;
    containerClassName?: string;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
    children,
    containerClassName = '',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target); 
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -10% 0px' } 
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className={`scroll-float-container flex-1 ${containerClassName}`}>
            {children}
        </div>
    );
};

// --- AgendaSection Component ---
const AgendaSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Track scroll progress for the left-side bar
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionHeight = rect.height - window.innerHeight;
            // Calculate how much of the section has been scrolled past the top of the viewport
            const progress = Math.abs(rect.top) / sectionHeight;
            
            // Clamp between 0 and 100
            const clampedProgress = Math.min(Math.max(progress * 100, 0), 100);
            setScrollProgress(clampedProgress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const agendaSteps = [
        {
            title: "Requirements Survey",
            subtitle: "Confluence, Miro: Define project scope and documentation.",
            color: "from-yellow-400 to-yellow-500",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-300"
        },
        {
            title: "UX Design",
            subtitle: "Acceptance Criteria: User flows, wireframes, and sitemaps.",
            color: "from-yellow-400 to-yellow-500",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-300"
        },
        {
            title: "UI Design",
            subtitle: "Figma: Visual design, branding, and interactive prototypes.",
            color: "from-orange-400 to-orange-500",
            bgColor: "bg-orange-100",
            borderColor: "border-orange-300",
            highlight: true
        },
        {
            title: "Architecture",
            subtitle: "MVC, MVVM, Clean: Choosing the right scalable system design.",
            color: "from-yellow-400 to-yellow-500",
            bgColor: "bg-yellow-50",
            borderColor: "border-stone-300"
        },
        {
            title: "Development",
            subtitle: "React, Node.js or PHP Laravel, Express, MongoDB: Clean, documented code.",
            color: "from-yellow-400 to-yellow-500",
            bgColor: "bg-yellow-50",
            borderColor: "border-stone-300"
        },
        {
            title: "Quality Assurance",
            subtitle: "Selenium, Jest/ts, Postman: Comprehensive testing and validation.",
            color: "from-yellow-400 to-yellow-500",
            bgColor: "bg-yellow-50",
            borderColor: "border-stone-300"
        }
    ];

    return (
        <>
            <style jsx>{`
            .scroll-float-container {
              opacity: 0;
              transform: translateY(20px);
              transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .scroll-float-container.animate-in {
              opacity: 1;
              transform: translateY(0);
            }
            .vertical-line {
              background: linear-gradient(
                to bottom,
                transparent 0%,
                #d4af37 5%,
                #d4af37 95%,
                transparent 100%
              );
            }
            `}</style>

            <div ref={sectionRef} className="relative min-h-screen bg-black py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                        
                        {/* Left Content - Static Text + NEW Progress Bar */}
                        <div className="space-y-6 lg:sticky lg:top-32">
                            <div className="space-y-4 lg:space-y-6">
                                <div className="inline-flex items-center px-3 py-1 lg:px-4 lg:py-2 bg-red-100 text-red-600 rounded-full text-xs lg:text-sm font-medium">
                                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
                                    Our Agendas Before We Offer You Any Services
                                </div>

                                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-stone-50 leading-snug lg:leading-tight">
                                    We get your{' '}
                                    <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                                        idea ready
                                    </span>
                                    {' '}and shaped for your market
                                </h2>

                                <p className="text-stone-400 text-base lg:text-xl leading-relaxed">
                                    Our end to end Development Cycle
                                    <ArrowRight className="inline-block w-4 h-4 lg:w-6 lg:h-6 ml-2 text-red-500" />
                                </p>

                                {/* --- Progress Bar Section --- */}
                                <div className="pt-4 max-w-xs">
                                    <div className="flex justify-between mb-2 text-xs uppercase tracking-widest text-stone-500 font-bold">
                                        <span>Progress</span>
                                        <span>{Math.round(scrollProgress)}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-150 ease-out"
                                            style={{ width: `${scrollProgress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="relative pt-8 lg:pt-0">
                            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 vertical-line transform -translate-x-1/2 opacity-60" />

                            <div className="space-y-10 lg:space-y-16 relative">
                                {agendaSteps.map((step, index) => (
                                    <ScrollFloat
                                        key={index}
                                        containerClassName={`relative flex-1 ${index % 2 === 0 ? '' : 'lg:ml-auto'}`}
                                    >
                                        <div className={`circle-step relative flex items-center w-full flex-row lg:${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                            
                                            <div className="relative flex-shrink-0">
                                                <div className={`w-16 h-16 lg:w-32 lg:h-32 rounded-full ${step.bgColor} ${step.borderColor} border-2 flex items-center justify-center relative transition-all duration-300 
                                                    ${step.highlight ? 'shadow-lg shadow-orange-500/30' : 'shadow-md'}
                                                    lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2
                                                `}>
                                                    <div className={`w-12 h-12 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-base lg:text-xl shadow-inner`}>
                                                        {index + 1}
                                                    </div>
                                                    {step.highlight && (
                                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/20 to-transparent animate-pulse" />
                                                    )}
                                                </div>

                                                {index < agendaSteps.length - 1 && (
                                                    <div className="absolute top-1/2 left-1/2 w-0.5 h-[5.5rem] mt-8 bg-yellow-500/50 lg:hidden transform -translate-x-1/2" />
                                                )}
                                            </div>

                                            <div className={`ml-1 mr-6 lg:mx-20 ${index % 2 === 0 ? 'lg:mr-auto lg:text-left' : 'lg:ml-auto lg:text-right'}`}>
                                                <div className={`bg-white rounded-xl p-4 lg:p-6 shadow-xl border ${step.borderColor} max-w-xs lg:max-w-md w-full`}>
                                                    <h3 className="font-bold text-base lg:text-lg text-stone-900 mb-1">
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-stone-600 text-sm leading-snug">
                                                        {step.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </ScrollFloat>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AgendaSection;