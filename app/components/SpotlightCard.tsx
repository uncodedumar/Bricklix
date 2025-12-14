'use client';

import { useRef } from 'react';

// TypeScript interface for SpotlightCard props
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

// SpotlightCard component - Client Component for interactivity
export const SpotlightCard = ({
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
    <article
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative rounded-sm border border-stone-950 bg-stone-950 p-6 overflow-hidden group cursor-pointer transition-all duration-300 hover:border-stone-800 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 focus-within:outline-none ${className}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        '--spotlight-color': 'rgba(255, 255, 255, 0.05)'
      } as React.CSSProperties}
      tabIndex={0}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-60 group-focus-within:opacity-60"
        style={{
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)`
        }}
        aria-hidden="true"
        role="presentation"
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </article>
  );
};

