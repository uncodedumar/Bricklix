'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
// 1. Import the Image component
import Image from 'next/image';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    bio: string;
    image: string;
    rating: number;
    bgColor: string;
}

const testimonials: Testimonial[] = [
    // ... (Your testimonials array remains the same)
    {
        id: 1,
        name: 'Oan ALi',
        role: 'Project Manager',
        bio: 'Oan Ali is the strategic core of Bricklix, serving as the Project Manager and Business Developer who turns ideas into actionable success stories. With over 5 years of experience in project management, business development, and client relations, Oan bridges the gap between innovation and execution — ensuring every Bricklix project runs with precision, passion, and purpose.',
        image: '/Oan.webp',
        rating: 5,
        bgColor: 'from-red-600 to-stone-700'
    },
    {
        id: 2,
        name: 'Abu Bakr',
        role: 'Data Scientist & AI Expert',
        bio: 'Abu Bakr is the AI powerhouse of Bricklix — a brilliant Data Scientist and Artificial Intelligence expert known for turning complexity into clarity and data into dominance. With over 5 years of deep experience in machine learning, predictive analytics, neural networks, and intelligent automation, he stands as the hero behind Bricklix’s smartest innovations.',
        image: '/ab.webp',
        rating: 5,
        bgColor: 'from-red-600 to-stone-700'
    },
    
    {
        id: 4,
        name: 'Kashif Awan',
        role: 'CEO / Sales Head',
        bio: 'Kashif Awan is the visionary force behind Bricklix. With over 5+ years of practical experience across technology, software engineering, web solutions, and mobile innovation, Kashif has built a reputation as a results-driven leader who blends strategic thinking with technical mastery. Known for turning ideas into scalable digital products, he leads with precision, creativity, and an unshakable focus on growth',
        image: '/k.jpg',
        rating: 5,
        bgColor: 'from-stone-600 to-stone-800'
    },
    {
        id: 3,
        name: 'Anas Shahid',
        role: 'Managing Director',
        bio: 'Anas Shahid is the driving force behind Bricklix. With over 5 years of hands-on experience in the world of technology, computer sciences, web development, and mobile app innovation, Anas has established himself as a dynamic leader who blends technical expertise with artistic precision.',
        image: '/a.jpeg',
        rating: 5,
        bgColor: 'from-stone-600 to-stone-800'
    },
    
    {
        id: 5,
        name: 'M. Umar Riaz',
        role: 'MERN Stack Developer and AI Designer',
        bio: "Umar Riaz stands at the creative and strategic helm of Bricklix's Design & Development Team, serving as its head of development and co-architect of its bold digital vision. With over 5 years of professional experience in AI systems, web technologies, mobile development, and digital product strategy, Umar brings a unique balance of technical intelligence and visionary leadership to the Bricklix powerhouse.",
        image: '/u.jpg',
        rating: 5,
        bgColor: 'from-red-500 to-red-700'
    },
    {
        id: 6,
        name: 'Fahad',
        role: 'Project Coordinator',
        bio: "Fahad serves as the vital organizational nexus for Bricklix, embodying the role of Project Coordinator and chief orchestrator of execution across various initiatives. With a robust background in strategic planning, resource allocation, and cross-functional team management, Fahad ensures that Bricklix's digital and creative visions are translated into on-time, high-quality deliverables.",
        image: '/user.png',
        rating: 5,
        bgColor: 'from-red-500 to-red-700'
    },
    {
        id: 7,
        name: 'Abdullah',
        role: 'DevOps Engineer',
        bio: 'Abdullah is the DevOps backbone of Bricklix, the engineer who ensures every line of code transitions seamlessly from development to deployment. With 5+ years of experience in cloud infrastructure, automation, CI/CD pipelines, and system optimization, Abdullah transforms complex technical frameworks into smooth, scalable operations.',
        image: '/abd.webp',
        rating: 5,
        bgColor: 'from-stone-700 to-red-800'
    }
    ,
    {
        id: 8,
        name: 'Usman Hassan ',
        role: 'Graphic Designer',
        bio: 'Usman Hassan is the creative engine of Bricklix, the designer who transforms ideas into striking visuals that speak louder than words. With 1+ years of experience in graphic design, branding, UI visuals, and digital creativity, Usman blends artistic instinct with strategic thinking to build designs that don’t just look good — they perform.',
        image: '/us.jpg',
        rating: 5,
        bgColor: 'from-stone-700 to-red-800'
    }
];

const TestimonialCard = ({
    testimonial,
    isFocused
}: {
    testimonial: Testimonial;
    isFocused: boolean;
}) => {
    return (
        <div
            className={`flex-shrink-0 transition-all duration-700 ease-out ${isFocused ? 'scale-100 opacity-100' : 'scale-90 opacity-60'
                }`}
            style={{ width: '400px' }}
        >
            <div className="relative">
                {/* Image with colored background */}
                <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${testimonial.bgColor} p-1`}>
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">

                        {/* 2. Replace <img> with <Image /> and 3. Add width and height */}
                        <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            // You must define explicit width and height when using the Image component
                            // The ratio is 4/5 based on your aspect-[4/5] class in the parent div
                            width={400} // Set an appropriate intrinsic width
                            height={500} // Set an appropriate intrinsic height (400*5/4 = 500)
                            // Use 'object-cover' within the style or Tailwind class to manage sizing
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Info Card Overlay */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-11/12 bg-stone-900 rounded-2xl p-6 shadow-2xl">
                    <h3 className="text-lime-400 text-2xl font-bold mb-1">{testimonial.name}</h3>
                    <p className="text-stone-300 text-sm mb-3">{testimonial.role}</p>
                    <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bio Text */}
            <div className="mt-24 text-center px-4">
                <p className="text-stone-400 leading-relaxed text-sm">
                    {testimonial.bio}
                </p>
            </div>
        </div>
    );
};

export default function ScrollingTestimonials() {
    // ... (Rest of your component remains the same)
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [focusedIndex, setFocusedIndex] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const lastScrollY = useRef(0);
    const animationFrameId = useRef<number | undefined>(undefined);

    // Vertical scroll handling (moves carousel horizontally)
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking && !isDragging) {
                animationFrameId.current = window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const scrollDelta = currentScrollY - lastScrollY.current;

                    // Move right on scroll down, left on scroll up
                    setScrollOffset(prev => prev + scrollDelta * 0.8);

                    lastScrollY.current = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isDragging]);

    // Horizontal scroll/drag handling
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                setScrollOffset(prev => prev + e.deltaX);
            }
        };

        const handleMouseDown = (e: MouseEvent) => {
            setIsDragging(true);
            setStartX(e.pageX - scrollContainer.offsetLeft);
            setScrollLeft(scrollOffset);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            setScrollOffset(scrollLeft - walk);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const handleMouseLeave = () => {
            setIsDragging(false);
        };

        scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
        scrollContainer.addEventListener('mousedown', handleMouseDown);
        scrollContainer.addEventListener('mousemove', handleMouseMove);
        scrollContainer.addEventListener('mouseup', handleMouseUp);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            scrollContainer.removeEventListener('wheel', handleWheel);
            scrollContainer.removeEventListener('mousedown', handleMouseDown);
            scrollContainer.removeEventListener('mousemove', handleMouseMove);
            scrollContainer.removeEventListener('mouseup', handleMouseUp);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isDragging, startX, scrollLeft, scrollOffset]);

    // Calculate focused card
    useEffect(() => {
        const cardWidth = 400;
        const gap = 32;
        const totalWidth = cardWidth + gap;
        const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
        const centerPosition = containerWidth / 2;

        // Loop the scroll offset
        const loopedOffset = ((scrollOffset % (totalWidth * testimonials.length)) + (totalWidth * testimonials.length)) % (totalWidth * testimonials.length);

        const adjustedOffset = loopedOffset + centerPosition;
        let closest = 1;
        let minDistance = Infinity;

        testimonials.forEach((_, index) => {
            const cardPosition = (index * totalWidth) + (cardWidth / 2);
            const distance = Math.abs(cardPosition - adjustedOffset);

            if (distance < minDistance) {
                minDistance = distance;
                closest = index;
            }
        });

        setFocusedIndex(closest);
    }, [scrollOffset]);


    return (
        <section className="relative bg-gradient-to-br from-stone-950 via-black to-stone-950 py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-red-600/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-stone-700/5 rounded-full blur-3xl" />
            </div>

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

            {/* Scrolling Container */}
            <div
                ref={scrollContainerRef}
                className="relative cursor-grab active:cursor-grabbing"
            >
                <div
                    ref={containerRef}
                    className="flex gap-8 px-[calc(50vw-200px)] overflow-visible select-none"
                    style={{
                        transform: `translateX(${-scrollOffset}px)`,
                        transition: isDragging ? 'none' : 'transform 0.1s linear'
                    }}
                >
                    {/* Triple the testimonials for seamless infinite scroll */}
                    {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                        <TestimonialCard
                            key={`${testimonial.id}-${index}`}
                            testimonial={testimonial}
                            isFocused={index % testimonials.length === focusedIndex}
                        />
                    ))}
                </div>

                {/* Gradient Overlays */}
                <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
            </div>

        </section>
    );
}