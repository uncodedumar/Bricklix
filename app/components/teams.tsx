'use client';

import React, { useEffect, useRef, useMemo, ReactNode } from 'react';
import { Users, Code, Palette, Zap, Shield, Target } from 'lucide-react';

// ScrollReveal Component with Intersection Observer
interface ScrollRevealProps {
    children: ReactNode;
    containerClassName?: string;
    textClassName?: string;
    // NOTE: Unused props were removed from the interface
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    containerClassName = '',
    textClassName = '',
}) => {
    const containerRef = useRef<HTMLHeadingElement>(null);
    const [isMounted, setIsMounted] = React.useState(false);

    const splitText = useMemo(() => {
        // Only split if the children is a string
        const text = typeof children === 'string' ? children : '';
        // Split by word, preserving the spaces as separate elements
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return <span key={index}>{word}</span>;
            return (
                <span className="inline-block word" key={index}>
                    {word}
                </span>
            );
        });
    }, [children]);

    useEffect(() => {
        // Client-side only mounting check
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const el = containerRef.current;
        if (!el) return;

        const wordElements = el.querySelectorAll<HTMLElement>('.word');

        // Reset styles on initial load to ensure the animation runs on scroll
        wordElements.forEach((word) => {
            word.style.opacity = '0.1';
            word.style.filter = 'blur(4px)';
            word.style.transform = 'translateY(10px)';
        });


        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        wordElements.forEach((word, index) => {
                            setTimeout(() => {
                                // Apply final, visible styles which the CSS transition handles
                                word.style.opacity = '1';
                                word.style.filter = 'blur(0px)';
                                word.style.transform = 'translateY(0)';
                            }, index * 50);
                        });
                        // Stop observing once the animation has been triggered
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, [isMounted]);

    return (
        <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
            <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}>
                {splitText}
            </p>
        </h2>
    );
};

// Stats Component
const StatCard = ({ icon: Icon, number, label }: { icon: React.ElementType; number: string; label: string }) => (
    <div className="flex flex-col items-center p-6 bg-stone-900/50 rounded-xl border border-stone-800 hover:border-red-500/30 transition-all duration-300 hover:transform hover:scale-105">
        <Icon className="w-8 h-8 text-red-400 mb-3" />
        <div className="text-3xl md:text-4xl font-bold text-white mb-2">{number}</div>
        <div className="text-stone-400 text-sm text-center">{label}</div>
    </div>
);

// Main Team Section Component
export default function TeamIntroSection() {
    return (
        <section className="relative bg-black py-20 md:py-32 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Main ScrollReveal Text */}
                <div className="max-w-5xl mx-auto mb-20">
                    <ScrollReveal
                        containerClassName="text-center"
                        textClassName="text-white"
                    >
                        We are a collective of passionate developers, innovative designers, strategic experts,
                        and creative problem-solvers who transform ideas into exceptional digital experiences.
                        Our diverse team brings together decades of combined expertise in cutting-edge technologies,
                        user-centric design, and business strategy to deliver solutions that don&apos;t just meet
                        expectations—they exceed them.
                    </ScrollReveal>
                </div>

                {/* Expertise Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    <div className="group p-8 bg-gradient-to-br from-stone-900 to-black border border-stone-800 rounded-2xl hover:border-red-500/30 transition-all duration-300 hover:transform hover:-translate-y-2">
                        <Code className="w-12 h-12 text-red-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl font-bold text-white mb-3">Developers</h3>
                        <p className="text-stone-400 leading-relaxed">
                            Expert engineers crafting scalable, performant applications using modern frameworks and best practices.
                        </p>
                    </div>

                    <div className="group p-8 bg-gradient-to-br from-stone-900 to-black border border-stone-800 rounded-2xl hover:border-red-500/30 transition-all duration-300 hover:transform hover:-translate-y-2">
                        <Palette className="w-12 h-12 text-red-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl font-bold text-white mb-3">Designers</h3>
                        <p className="text-stone-400 leading-relaxed">
                            Creative visionaries designing intuitive, beautiful interfaces that users love and remember.
                        </p>
                    </div>

                    <div className="group p-8 bg-gradient-to-br from-stone-900 to-black border border-stone-800 rounded-2xl hover:border-red-500/30 transition-all duration-300 hover:transform hover:-translate-y-2">
                        <Target className="w-12 h-12 text-red-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl font-bold text-white mb-3">Strategists</h3>
                        <p className="text-stone-400 leading-relaxed">
                            Business experts aligning technology solutions with strategic goals for maximum impact.
                        </p>
                    </div>

                    <div className="group p-8 bg-gradient-to-br from-stone-900 to-black border border-stone-800 rounded-2xl hover:border-red-500/30 transition-all duration-300 hover:transform hover:-translate-y-2">
                        <Zap className="w-12 h-12 text-red-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl font-bold text-white mb-3">Innovators</h3>
                        <p className="text-stone-400 leading-relaxed">
                            Forward-thinking pioneers exploring emerging technologies and pushing creative boundaries.
                        </p>
                    </div>

                    <div className="group p-8 bg-gradient-to-br from-stone-900 to-black border border-stone-800 rounded-2xl hover:border-red-500/30 transition-all duration-300 hover:transform hover:-translate-y-2">
                        <Shield className="w-12 h-12 text-red-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl font-bold text-white mb-3">Security Experts</h3>
                        <p className="text-stone-400 leading-relaxed">
                            Dedicated professionals ensuring enterprise-grade security and data protection.
                        </p>
                    </div>

                    <div className="group p-8 bg-gradient-to-br from-stone-900 to-black border border-stone-800 rounded-2xl hover:border-red-500/30 transition-all duration-300 hover:transform hover:-translate-y-2">
                        <Users className="w-12 h-12 text-red-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl font-bold text-white mb-3">Consultants</h3>
                        <p className="text-stone-400 leading-relaxed">
                            Trusted advisors guiding digital transformation with proven methodologies and insights.
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
                    <StatCard icon={Users} number="50+" label="Team Members" />
                    <StatCard icon={Code} number="120+" label="Projects Delivered" />
                    <StatCard icon={Target} number="7+" label="Years Experience" />
                    <StatCard icon={Zap} number="98%" label="Client Satisfaction" />
                </div>

                {/* Secondary ScrollReveal Text */}
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal
                        containerClassName="text-center"
                        textClassName="text-stone-300"
                    >
                        Every member of our team is carefully selected not just for their technical prowess,
                        but for their passion, creativity, and commitment to excellence. Together, we create
                        digital solutions that inspire, engage, and drive real business results.
                    </ScrollReveal>
                </div>
            </div>

            <style jsx>{`
                .word {
                    opacity: 0.1;
                    filter: blur(4px);
                    transform: translateY(10px);
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>
        </section>
    );
}