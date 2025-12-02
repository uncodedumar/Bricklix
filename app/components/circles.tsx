'use client';
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

// ScrollFloat Component (kept the same)
interface ScrollFloatProps {
    children: ReactNode;
    containerClassName?: string;
    textClassName?: string;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
    children,
    containerClassName = '',
    textClassName = ''
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Mock GSAP animation with CSS transitions and Intersection Observer
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={containerRef} className={`scroll-float-container ${containerClassName}`}>
            <div className={textClassName}>
                {children}
            </div>
        </div>
    );
};

const AgendaSection = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    const agendaSteps = [
        {
            title: "Requirements Survey",
            subtitle: "Confluence, Miro",
            color: "from-yellow-400 to-yellow-500",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-300"
        },
        {
            title: "UX Design",
            subtitle: "Acceptance Criteria",
            color: "from-yellow-400 to-yellow-500",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-300"
        },
        {
            title: "UI Design",
            subtitle: "Figma",
            color: "from-orange-400 to-orange-500",
            bgColor: "bg-orange-100",
            borderColor: "border-orange-300",
            highlight: true
        },
        {
            title: "Architecture",
            subtitle: "MVC, MVVM, Clean",
            color: "from-stone-300 to-stone-400",
            bgColor: "bg-stone-50",
            borderColor: "border-stone-300"
        },
        {
            title: "Development",
            subtitle: "React, Node.js or PHP Laravel, Express, MongoDB",
            color: "from-stone-300 to-stone-400",
            bgColor: "bg-stone-50",
            borderColor: "border-stone-300"
        },
        {
            title: "Quality Assurance",
            subtitle: "Selenium, Jest/ts, Postman",
            color: "from-stone-300 to-stone-400",
            bgColor: "bg-stone-50",
            borderColor: "border-stone-300"
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const scrollProgress = Math.max(0, Math.min(1,
                    (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
                ));

                const newStep = Math.floor(scrollProgress * agendaSteps.length);
                setCurrentStep(Math.min(newStep, agendaSteps.length - 1));
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [agendaSteps.length]);

    return (
        <>
            <style jsx>{`
        .scroll-float-container {
          opacity: 0;
          transform: translateY(50px) scale(0.9);
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        
        }
        .scroll-float-container.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .circle-step {
          transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .circle-step.animate-in {
          transform: translateY(0) scale(1);
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

            <div ref={sectionRef} className="relative min-h-screen bg-black py-20">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Content - Static Text */}
                        {/* Key change: Removed 'sticky top-32' to prevent mobile overlap. 
                            Added 'lg:sticky lg:top-32' to restore the sticky effect on large screens.
                        */}
                        <div className="space-y-8 lg:sticky lg:top-32">
                            <div className="space-y-6">
                                <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Our Agendas Before We Offer You Any Services
                                </div>

                                <h2 className="text-5xl lg:text-6xl font-bold text-stone-50 leading-tight">
                                    We get your{' '}
                                    <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                                        idea ready
                                    </span>
                                    {' '}and shaped for your market
                                </h2>

                                <p className="text-stone-600 text-xl leading-relaxed">
                                    Our end to end Development Cycle
                                    <ArrowRight className="inline-block w-6 h-6 ml-2 text-red-500" />
                                </p>
                            </div>

                            {/* Current Step Display */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-stone-200 shadow-lg">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${agendaSteps[currentStep]?.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                        {currentStep + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-stone-900 font-bold text-lg">
                                            {agendaSteps[currentStep]?.title}
                                        </h3>
                                        <p className="text-stone-600 text-sm">
                                            {agendaSteps[currentStep]?.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Indicator */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-stone-600">
                                    <span>Progress</span>
                                    <span>{Math.round(((currentStep + 1) / agendaSteps.length) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${((currentStep + 1) / agendaSteps.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Vertical Aligned Circles with ScrollFloat */}
                        {/* Key change: Removed the timeline elements (vertical line and alternating step layout) 
                            from the mobile view using 'lg:' prefixes, and recentered the circles for a clean vertical stack.
                        */}
                        <div className="relative bg-black">
                            {/* Vertical Connecting Line - now only visible on large screens */}
                            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 vertical-line transform -translate-x-1/2 opacity-60" />

                            {/* Circle Steps */}
                            {/* In mobile, we want a simple vertical stack, so we'll adjust the internal layout for small screens. */}
                            <div className="space-y-16 relative">
                                {agendaSteps.map((step, index) => (
                                    <ScrollFloat
                                        key={index}
                                        containerClassName="relative"
                                    >
                                        <div className={`circle-step relative flex items-center 
                                            /* Mobile: Simple row layout */
                                            flex-row 
                                            /* Desktop: Alternating layout */
                                            lg:${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                                            } `}>
                                            
                                            {/* Circle */}
                                            <div className="relative flex-shrink-0">
                                                <div className={`w-32 h-32 rounded-full ${step.bgColor} ${step.borderColor} border-2 flex items-center justify-center relative transition-all duration-500 ${step.highlight
                                                        ? 'shadow-2xl shadow-orange-500/30 ring-4 ring-orange-200'
                                                        : 'shadow-lg hover:shadow-xl'
                                                        } ${index === currentStep ? 'scale-110 ring-2 ring-red-300' : ''
                                                        }`}>
                                                    {/* Inner gradient circle */}
                                                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-inner`}>
                                                        {index + 1}
                                                    </div>

                                                    {step.highlight && (
                                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/20 to-transparent animate-pulse" />
                                                    )}
                                                </div>

                                                
                                                
                                            </div>

                                            {/* Text Content */}
                                            <div className={`mx-8 
                                                /* Mobile: Left-aligned text */
                                                text-left 
                                                /* Desktop: Alternating alignment */
                                                lg:${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'
                                                }`}>
                                                <div className={`bg-white rounded-xl p-6 shadow-lg border ${step.borderColor} max-w-sm 
                                                    /* Mobile: Always left-aligned/full width */
                                                    /* Desktop: Alternating margin for alignment */
                                                    lg:${index % 2 === 0 ? '' : 'lg:ml-auto'
                                                    }`}>
                                                    <h3 className="font-bold text-lg text-stone-900 mb-2">
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-stone-600 text-sm leading-relaxed">
                                                        {step.subtitle}
                                                    </p>
                                                    {step.highlight && (
                                                        <div className="mt-3 inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                                            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse" />
                                                            Current Focus
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

                {/* Bottom Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" />
            </div>
        </>
    );
};

export default AgendaSection;