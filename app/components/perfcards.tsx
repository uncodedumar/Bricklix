'use client';

import React, { ReactNode, useLayoutEffect, useRef, useCallback } from 'react';
// NOTE: For icons, you'll need to install an icon library like 'react-icons' or 'lucide-react'
// Example: import { FaChartBar, FaUsers, FaMailBulk, FaGlobe, FaCogs } from 'react-icons/fa';
// Replace the IconPlaceholder component logic with your actual icon component.

// Icon Placeholder Component (Replace with your actual Icon Library)
const IconPlaceholder: React.FC<{ iconClassName: string }> = ({ iconClassName }) => (
    <div className="text-4xl text-white/90">
        {/* Placeholder for an actual icon component, e.g., <FaChartBar /> */}
        <span className="sr-only">{iconClassName}</span>
        {/* Simple visual placeholder if no library is available */}
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-6h2v6h-2zm-1-8V7h4v2h-4z" />
        </svg>
    </div>
);


// ScrollStackItem Component
interface ScrollStackItemProps {
    itemClassName?: string;
    children: ReactNode;
}

const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
    <div
        className={`scroll-stack-card relative w-full h-80 my-8 rounded-3xl shadow-2xl box-border origin-top will-change-transform ${itemClassName}`.trim()}
        style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
        }}
    >
        {children}
    </div>
);

// Define the structure for the stored transform data (Fix for Error: Unexpected any)
interface TransformState {
    translateY: number;
    scale: number;
    rotation: number;
}

// ScrollStack Component
interface ScrollStackProps {
    className?: string;
    children: ReactNode;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string;
    scaleEndPosition?: string;
    baseScale?: number;
    rotationAmount?: number;
    blurAmount?: number; // Kept in interface but removed from destructuring if unused
    useWindowScroll?: boolean;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    rotationAmount = 0,
    // blurAmount is removed from destructuring to fix unused variable warning
    useWindowScroll = false,
}) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    // Fixed: Specified type as Map<number, TransformState>
    const lastTransformsRef = useRef(new Map<number, TransformState>());
    const isUpdatingRef = useRef(false);

    const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value as string);
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight,
            };
        } else {
            const scroller = scrollerRef.current;
            return {
                scrollTop: scroller ? scroller.scrollTop : 0,
                containerHeight: scroller ? scroller.clientHeight : 0,
            };
        }
    }, [useWindowScroll]);

    const getElementOffset = useCallback(
        (element: HTMLElement) => {
            if (useWindowScroll) {
                const rect = element.getBoundingClientRect();
                return rect.top + window.scrollY;
            } else {
                return element.offsetTop;
            }
        },
        [useWindowScroll]
    );

    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length || isUpdatingRef.current) return;

        isUpdatingRef.current = true;

        const { scrollTop, containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

        const endElement = useWindowScroll
            ? (document.querySelector('.scroll-stack-end') as HTMLElement | null)
            : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null);

        const endElementTop = endElement ? getElementOffset(endElement) : 0;

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const cardTop = getElementOffset(card);
            const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
            const triggerEnd = cardTop - scaleEndPositionPx;
            const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
            const pinEnd = endElementTop - containerHeight / 2;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
            }

            const newTransform: TransformState = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
            };

            const lastTransform = lastTransformsRef.current.get(i);
            const hasChanged =
                !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1;

            if (hasChanged) {
                const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                card.style.transform = transform;
                lastTransformsRef.current.set(i, newTransform);
            }
        });

        isUpdatingRef.current = false;
    }, [
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        calculateProgress,
        parsePercentage,
        getScrollData,
        getElementOffset,
        useWindowScroll,
    ]);

    const handleScroll = useCallback(() => {
        requestAnimationFrame(updateCardTransforms);
    }, [updateCardTransforms]);

    useLayoutEffect(() => {
        if (!useWindowScroll && !scrollerRef.current) return;

        const cards = Array.from(
            useWindowScroll
                ? document.querySelectorAll('.scroll-stack-card')
                : (scrollerRef.current?.querySelectorAll('.scroll-stack-card') ?? [])
        ) as HTMLElement[];
        cardsRef.current = cards;

        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            card.style.willChange = 'transform';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
        });

        const scrollElement = useWindowScroll ? window : scrollerRef.current;
        scrollElement?.addEventListener('scroll', handleScroll, { passive: true });
        updateCardTransforms();

        // Fix for react-hooks/exhaustive-deps warning on lastTransformsRef.current
        const lastTransformsMap = lastTransformsRef.current;

        return () => {
            scrollElement?.removeEventListener('scroll', handleScroll);
            cardsRef.current.length = 0; // Clears the array content
            lastTransformsMap.clear(); // Use the variable created inside the effect
            isUpdatingRef.current = false;
        };
    }, [itemDistance, handleScroll, updateCardTransforms, useWindowScroll]);

    // Conditional props for the scroller div (Fix for useWindowScroll logic)
    const scrollerProps: {
        ref?: React.RefObject<HTMLDivElement | null>;
        className?: string;
        style?: React.CSSProperties;
    } = useWindowScroll
            ? {}
            : {
                ref: scrollerRef,
                className: 'overflow-y-auto',
                style: {
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch',
                },
            };

    return (
        <div
            // Apply conditional class for overflow
            className={`relative w-full h-full ${scrollerProps.className || ''} ${className}`.trim()}
            ref={scrollerProps.ref}
            style={scrollerProps.style}
        >
            {/* The inner div remains the same */}
            <div className="scroll-stack-inner pt-[20vh] px-4 md:px-8 pb-[50rem] min-h-screen">
                {children}
                <div className="scroll-stack-end w-full h-px" />
            </div>
        </div>
    );
};

// Performance Cards Data
const performanceData = [
    { id: 1, stat: '01', label: '10k+', description: 'Monthly Reach', icon: 'FaChartBar' },
    { id: 2, stat: '02', label: '5k+', description: 'Client Success Stories', icon: 'FaUsers' },
    { id: 3, stat: '03', label: '2k+', description: "Don't lose customers who prefer email communication. We'll help you effectively connect and stand out.", icon: 'FaMailBulk' },
    { id: 4, stat: '04', label: '10+', description: 'Global Presence, Serving Clients Globally', icon: 'FaGlobe' },
    { id: 5, stat: '05', label: '50+', description: 'Diverse Solutions', icon: 'FaCogs' },
];

// Main Section Component
export default function AgencyPerformanceSection() {
    // Red Stone Color Combination
    const getCardColor = (index: number) => {
        const colors = [
            '#4a1c1c', // Deep Red Stone
            '#6a3232', // Muted Red
            '#7b3f3f', // Darker Rust
            '#5c2828', // Earthy Red
            '#8d4c4c', // Desaturated Red
        ];
        // Using a slightly transparent overlay for subtle variation on the border
        const overlays = [
            'linear-gradient(rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.05))',
            'linear-gradient(rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.05))',
        ];

        return `${overlays[index % overlays.length]}, ${colors[index % colors.length]}`;
    };

    return (
        // NOTE: To apply the Inter font, you would add a global CSS class like 'font-inter'
        // to a top-level element, or ensure 'Inter' is in your Tailwind config.
        <div className="relative bg-black font-inter">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-start">

                    {/* Left Side - Fixed Heading */}
                    {/* The sticky behavior will now use the window scroll, as it is outside the ScrollStack component */}
                    <div className="md:sticky md:top-32 p-8 md:p-16">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white">
                            Statistics
                        </h2>
                    </div>

                    {/* Right Side - Stacking Cards */}
                    <div className="w-full">
                        <ScrollStack
                            useWindowScroll={true}
                            itemDistance={150}
                            itemStackDistance={25}
                            itemScale={0.04}
                            baseScale={0.88}
                            stackPosition="25%"
                            scaleEndPosition="15%"
                            rotationAmount={1}
                        >
                            {performanceData.map((card, index) => (
                                <ScrollStackItem
                                    key={card.id}
                                    // Border is now a white/off-white color for contrast
                                    itemClassName="border-2 border-white/30"
                                >
                                    <div
                                        className="w-full h-full p-8 rounded-3xl"
                                        style={{
                                            background: getCardColor(index),
                                        }}
                                    >
                                        <div className="flex flex-col h-full justify-between">
                                            {/* Top Section: Stat and Icon */}
                                            <div className="flex justify-between items-start">
                                                <p className="text-sm font-light mb-4 text-white/70 tracking-widest">
                                                    {card.stat}
                                                </p>
                                                <IconPlaceholder iconClassName={card.icon} />
                                            </div>

                                            {/* Middle Section: Label (The Big Number/Title) */}
                                            <div>
                                                <h3 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wider text-white">
                                                    {card.label}
                                                </h3>
                                            </div>

                                            {/* Bottom Section: Description */}
                                            <div>
                                                <p className="text-base leading-relaxed text-white/80">
                                                    {card.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollStackItem>
                            ))}
                        </ScrollStack>
                    </div>
                </div>
            </div>
        </div>
    );
}