'use client';
import React, { useEffect, useRef, ReactNode } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

// --- ScrollFloat Component (Optimized) ---
// Using Intersection Observer for performant "fade-in" animation.
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
                        // Stop observing once animated for better performance
                        observer.unobserve(entry.target); 
                    }
                });
            },
            // Adjusted threshold for better visibility trigger on mobile
            { threshold: 0.2, rootMargin: '0px 0px -10% 0px' } 
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        // Added 'flex-1' for better layout on desktop when alternating 
        <div ref={containerRef} className={`scroll-float-container flex-1 ${containerClassName}`}>
            {children}
        </div>
    );
};

// --- AgendaSection Component (Optimized for Alignment) ---
const AgendaSection = () => {
    // Removed all scroll/state logic (useState, useEffect for scroll) for 100% performance/jank-free scrolling.
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
            /* Base styles for the performance-friendly animation */
            .scroll-float-container {
              opacity: 0;
              transform: translateY(20px); /* Smaller lift for subtlety */
              transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smoother curve */
            }
            .scroll-float-container.animate-in {
              opacity: 1;
              transform: translateY(0);
            }
            /* The vertical line for desktop view */
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

            <div className="relative min-h-screen bg-black py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                        
                        {/* Left Content - Static Text (Sticky on Desktop only) */}
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
                            </div>
                        </div>

                        {/* Right Content - Vertical Aligned Circles with ScrollFloat */}
                        <div className="relative pt-8 lg:pt-0">
                            {/* Vertical Connecting Line - Desktop Only */}
                            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 vertical-line transform -translate-x-1/2 opacity-60" />

                            <div className="space-y-10 lg:space-y-16 relative">
                                {agendaSteps.map((step, index) => (
                                    <ScrollFloat
                                        key={index}
                                        containerClassName={`relative flex-1 ${index % 2 === 0 ? '' : 'lg:ml-auto'}`}
                                    >
                                        {/* Key Fix: Changed items-start to items-center to vertically align circle and text box */}
                                        <div className={`circle-step relative flex **items-center** w-full 
                                            /* Mobile: Simple row layout */
                                            flex-row 
                                            /* Desktop: Alternating layout, centered on line */
                                            lg:${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                                            `}>
                                            
                                            {/* Circle Container */}
                                            <div className="relative flex-shrink-0">
                                                {/* Outer Circle (Responsive Size) */}
                                                <div className={`w-16 h-16 lg:w-32 lg:h-32 rounded-full ${step.bgColor} ${step.borderColor} border-2 flex items-center justify-center relative transition-all duration-300 
                                                    ${step.highlight ? 'shadow-lg shadow-orange-500/30' : 'shadow-md'}
                                                    /* Center the circle on the vertical line for desktop */
                                                    lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2
                                                `}>
                                                    {/* Inner Gradient Circle (Responsive Size) */}
                                                    <div className={`w-12 h-12 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-base lg:text-xl shadow-inner`}>
                                                        {index + 1}
                                                    </div>
                                                    {step.highlight && (
                                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/20 to-transparent animate-pulse" />
                                                    )}
                                                </div>

                                                {/* Mobile: Small vertical line to connect circles on mobile */}
                                                {/* Adjusted line height/position to connect the centered circles cleanly */}
                                                {index < agendaSteps.length - 1 && (
                                                    <div className="absolute top-1/2 left-1/2 w-0.5 h-[5.5rem] mt-8 bg-yellow-500/50 lg:hidden transform -translate-x-1/2" />
                                                )}
                                            </div>

                                            {/* Text Content Container (Responsive Spacing/Alignment) */}
                                            {/* Adjusted margin left (ml-4) for clean separation on mobile */}
                                            <div className={`ml-1 mr-6 lg:mx-20 ${index % 2 === 0 ? 'lg:mr-auto lg:text-left' : 'lg:ml-auto lg:text-right'}`}>
                                                {/* Content Box (Smaller Padding/Max Width on Mobile) */}
                                                <div className={`bg-white rounded-xl p-4 lg:p-6 shadow-xl border ${step.borderColor} max-w-xs lg:max-w-md w-full`}>
                                                    {/* H3 for Step Titles */}
                                                    <h3 className="font-bold text-base lg:text-lg text-stone-900 mb-1">
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-stone-600 text-sm leading-snug">
                                                        {step.subtitle}
                                                    </p>
                                                    {step.highlight && (
                                                        <div>
                                                        </div>
                                                    )}
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