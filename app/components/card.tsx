import { SpotlightCard } from './SpotlightCard';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
    image: "/7.jpg",
    imageAlt: "Analytics dashboard",
    tag: "Data Science"
  },
  {
    id: 2,
    title: "Cloud Infrastructure",
    description: "Scalable cloud solutions designed to grow with your business while maintaining peak performance and security.",
    image: "/8.jpg",
    imageAlt: "Cloud infrastructure",
    tag: "DevOps"
  },
  {
    id: 3,
    title: "AI Integration",
    description: "Seamlessly integrate artificial intelligence into your workflow to automate processes and enhance decision-making.",
    image: "/9.jpg",
    imageAlt: "AI technology",
    tag: "Machine Learning"
  },
  {
    id: 4,
    title: "Security Solutions",
    description: "Enterprise-grade security measures that protect your digital assets while ensuring compliance and peace of mind.",
    image: "/10.jpg",
    imageAlt: "Security systems",
    tag: "Cybersecurity"
  }
];

// Card Content Component - Server Component
interface CardContentProps {
  card: CardData;
}

const CardContent = ({ card }: CardContentProps) => (
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
          loading="lazy"
        />
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" role="presentation" />
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
        <Link href="/services" className="inline-flex items-center text-gray-400 hover:text-white font-medium text-sm transition-colors duration-200 group focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:outline-none rounded" aria-label={`Learn more about ${card.title}`}>
          Learn More
          <ArrowUpRight className="ml-2 w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </div>
);

// Main SpotlightCardsSection component - Server Component
const SpotlightCardsSection = () => {
  return (
    <section className="py-16 px-4 bg-black min-h-screen" aria-labelledby="solutions-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 id="solutions-heading" className="text-4xl md:text-5xl font-normal text-white mb-6">
                Our <span className="text-red-700">Solutions</span>
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center text-gray-50 hover:text-white font-medium text-sm transition-colors duration-200 group focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:outline-none rounded" aria-label="Explore all services">
              Explore
              <ArrowUpRight className="ml-2 w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
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
              <CardContent card={card} />
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpotlightCardsSection;