'use client';

import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// TypeScript interface for SpotlightCard props
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

// SpotlightCard component with TypeScript
const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)'
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative rounded-sm border border-stone-950 bg-stone-950 p-6 overflow-hidden group cursor-pointer transition-all duration-300 hover:border-stone-800 ${className}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        '--spotlight-color': 'rgba(255, 255, 255, 0.05)'
      } as React.CSSProperties}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-60 group-focus-within:opacity-60"
        style={{
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)`
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// TypeScript interface for card data
interface CardData {
  id: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tag: string;
}

// Sample card data
const cardData: CardData[] = [
  {
    id: 1,
    title: "Advanced Analytics",
    description: "Unlock powerful insights with our comprehensive analytics platform that transforms your data into actionable intelligence.",
    image: "/7.webp",
    imageAlt: "Analytics dashboard",
    tag: "Data Science"
  },
  {
    id: 2,
    title: "Cloud Infrastructure",
    description: "Scalable cloud solutions designed to grow with your business while maintaining peak performance and security.",
    image: "/8.webp",
    imageAlt: "Cloud infrastructure",
    tag: "DevOps"
  },
  {
    id: 3,
    title: "AI Integration",
    description: "Seamlessly integrate artificial intelligence into your workflow to automate processes and enhance decision-making.",
    image: "/9.webp",
    imageAlt: "AI technology",
    tag: "Machine Learning"
  },
  {
    id: 4,
    title: "Security Solutions",
    description: "Enterprise-grade security measures that protect your digital assets while ensuring compliance and peace of mind.",
    image: "/10.webp",
    imageAlt: "Security systems",
    tag: "Cybersecurity"
  }
];

// Main SpotlightCardsSection component
const SpotlightCardsSection = () => {
  return (
    <section className="py-16 px-4 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-normal text-white mb-6">
                Our <span className="text-red-700">Solutions</span>
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center text-gray-50 hover:text-white font-medium text-sm transition-colors duration-200 group">
              Explore
              <ArrowUpRight className="ml-2 w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>
          <p className="text-gray-200 font-light text-lg max-w-2xl mx-auto">
            Discover how our cutting-edge technologies can transform your business and drive unprecedented growth.
          </p>
        </div>

        {/* Cards Grid - 4 in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card) => (
            <SpotlightCard
              key={card.id}
              className="h-full"
              spotlightColor="rgba(218, 101, 66, 0.4)"
            >
              <div className="flex flex-col h-full">
                {/* Image Section - Now at top */}
                <div className="w-full mb-6">
                  <div className="relative h-48 w-full rounded-lg overflow-hidden border border-stone-700 bg-stone-800">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col">
                  {/* Tag */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-gray-400 bg-stone-900/10 rounded-full border border-stone-400/20">
                      {card.tag}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gray-300 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {card.description}
                    </p>
                  </div>

                  {/* CTA with Arrow Icon */}
                  <div className="mt-auto">
                    <Link href="/services" className="inline-flex items-center text-gray-400 hover:text-white font-medium text-sm transition-colors duration-200 group">
                      Learn More
                      <ArrowUpRight className="ml-2 w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpotlightCardsSection;