'use client';

import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image'; // 👈 Import Image component

interface TestimonialData {
  id: number;
  content: string;
  author: {
    name: string;
    title: string;
    company: string;
    avatar: string;
  };
}

const testimonialsData: TestimonialData[] = [
  {
    id: 1,
    content:
      "We blend art with analytics, using behavioral insights and predictive modeling to fuel design decisions. The result: experiences that aren't just visually stunning but also measurably effective.",
    author: {
      name: 'Chris Boggs',
      title: 'Managing Director',
      company: '@Imperials',
      avatar: '/14.jpg', // 👈 Adjusted avatar path for Next.js Image
    },
  },
  {
    id: 2,
    content:
      "Their innovative approach transformed our digital presence completely. The team's dedication to understanding our business goals resulted in a solution that exceeded all expectations.",
    author: {
      name: 'Sarah Mitchell',
      title: 'CEO',
      company: '@TechVision',
      avatar: '/15.jpg', // 👈 Adjusted avatar path
    },
  },
  {
    id: 3,
    content:
      'Working with this team has been transformative. Their strategic insights and creative solutions have helped us achieve unprecedented growth in our digital channels.',
    author: {
      name: 'Michael Chen',
      title: 'CTO',
      company: '@InnovateCorp',
      avatar: '/16.jpg', // 👈 Adjusted avatar path
    },
  },
  {
    id: 4,
    content:
      'The attention to detail and commitment to excellence is unmatched. Every aspect of our project was handled with professionalism, resulting in a product that truly resonates.',
    author: {
      name: 'Kevin Rodriguez',
      title: 'Product Director',
      company: '@FutureScale',
      avatar: '/17.jpg', // 👈 Adjusted avatar path
    },
  },
  {
    id: 5,
    content:
      'From concept to execution, the process was seamless. Their ability to translate complex requirements into elegant solutions has made them an invaluable partner.',
    author: {
      name: 'David Thompson',
      title: 'VP of Innovation',
      company: '@NextGen',
      avatar: '/12.jpg', // 👈 Adjusted avatar path
    },
  },
  {
    id: 6,
    content:
      'Outstanding results that speak for themselves. The strategic approach combined with creative excellence has positioned our brand at the forefront of our industry.',
    author: {
      name: 'Jared Anderson',
      title: 'CMO',
      company: '@BrandEvolution',
      avatar: '/18.jpg', // 👈 Adjusted avatar path
    },
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);

  // 👈 Wrapped handleNext in useCallback to fix the dependency warning
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  }, [isAnimating]); // isAnimating is a dependency for handleNext

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // 👈 Fixed: Now includes handleNext in the dependency array
  // Also, by using useCallback for handleNext, the function reference itself
  // is stable unless its dependencies change (in this case, only `isAnimating`).
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [handleNext]); // 👈 Added handleNext to dependency array

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section className="relative bg-gradient-to-br from-black via-stone-950 to-red-950 py-16 px-4 overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0">{/* Dark gradient base */}</div>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-stone-700/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extralight text-white mb-3 leading-tight">
            Real <span className="text-red-400 italic font-normal">Success</span>,
            Happy{' '}
            <span className="text-red-400 italic font-normal">Clients</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light">
            Our Strategies help Business grow & to Exhibit themselves in the
            modern world.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="relative bg-stone-950 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl">
            {/* Card Content */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 items-center">
              {/* Left Side - Text Content with Quotes */}
              <div
                className={`flex-1 space-y-4 transform transition-all duration-600 ${isAnimating
                  ? direction > 0
                    ? 'translate-x-[-100px] opacity-0'
                    : 'translate-x-[100px] opacity-0'
                  : 'translate-x-0 opacity-100'
                  }`}
              >
                {/* Opening Quote with Text */}
                <div className="relative">
                  <Quote className="w-12 h-12 text-red-500/20 absolute -top-2 -left-2 transform -rotate-12" />
                  <div className="relative z-10 pl-8">
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light">
                      {currentTestimonial.content}
                    </p>
                  </div>
                  <Quote className="w-12 h-12 text-red-500/20 absolute -bottom-4 -right-2 rotate-180 transform rotate-12" />
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-gray-700/50 pl-8">
                  <h4 className="text-red-400 text-lg font-semibold mb-0.5">
                    {currentTestimonial.author.name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {currentTestimonial.author.title}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {currentTestimonial.author.company}
                  </p>
                </div>
              </div>

              {/* Right Side - Square Image (200x200) */}
              <div
                className={`flex-shrink-0 transform transition-all duration-600 ${isAnimating
                  ? direction > 0
                    ? 'translate-x-[100px] opacity-0'
                    : 'translate-x-[-100px] opacity-0'
                  : 'translate-x-0 opacity-100'
                  }`}
              >
                <div className="relative w-[200px] h-[200px]">
                  {/* Glowing Background */}
                  <div className="absolute inset-0 " />

                  {/* Main Image Container */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-gray-700/50 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    {/* 👇 Replaced <img> with Next.js <Image /> */}
                    <Image
                      src={currentTestimonial.author.avatar}
                      alt={currentTestimonial.author.name}
                      fill // Use 'fill' to make it fit the parent container with object-cover
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 200px, 200px" // Added required 'sizes' prop
                    />
                  </div>

                  {/* Decorative Corner Brackets */}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={isAnimating}
                className="group p-2 bg-stone-800/50 hover:bg-red-600/20 border border-gray-700 hover:border-red-500/50 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
              </button>
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="group p-2 bg-stone-800/50 hover:bg-red-600/20 border border-gray-700 hover:border-red-500/50 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating && index !== currentIndex) {
                    setDirection(index > currentIndex ? 1 : -1);
                    setIsAnimating(true);
                    setCurrentIndex(index);
                  }
                }}
                className="group relative"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'w-10 bg-red-500 shadow-lg shadow-red-500/50'
                    : 'w-1.5 bg-gray-700 group-hover:bg-gray-600 group-hover:w-6'
                    }`}
                />
              </button>
            ))}
          </div>

          {/* Counter */}
        </div>
      </div>
    </section>
  );
}