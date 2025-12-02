"use client";

import React, { useState } from "react";

// --- Data Structure ---
type TierName = "Enterprise Custom" | "Premium Support" | "Basic Assurance";

interface ServiceTier {
  name: TierName;
  tagline: string;
  // price: string; <-- REMOVED
  style: "default" | "gradient";
  excludedFeatures: string[];
}

// Full list of all potential features from the image (used for the right column)
const allFeatures = [
  "24/7 Monitoring",
  "Monthly Security Patches",
  "99.5% Uptime Guarantee",
  "Basic Incident Response",
  "Web & DNS Management",
  "Real-time Threat Detection",
  "Cloud Infrastructure Optimization",
  "Proactive Code Review",
  "24/7 Dedicated Engineer",
  "Full Disaster Recovery Plan",
];

const serviceTiers: ServiceTier[] = [
  {
    name: "Enterprise Custom",

    tagline: "For businesses and power users who want it all.",
    // price: '$99.99/mo', <-- REMOVED
    style: "default",
    excludedFeatures: [],
  },
  {
    name: "Premium Support",

    tagline: "Perfect for professionals who need advanced tools.",
    // price: '$49.99/mo', <-- REMOVED
    style: "gradient",
    excludedFeatures: [
      "24/7 Dedicated Engineer",
      "100% Uptime Guarantee",
      "Advanced Load Balancing",
      "Full Disaster Recovery Plan",
      "Real-time Threat Detection",
      
    ],
  },
  {
    name: "Basic Assurance",

    tagline: "Best for beginners who want to explore the platform.",
    // price: '$19.99/mo', <-- REMOVED
    style: "default",
    excludedFeatures: ["Real-time Threat Detection",
  "Cloud Infrastructure Optimization",
  "Proactive Code Review",
  "24/7 Dedicated Engineer",
  "Full Disaster Recovery Plan"
     ,
    ],
  },
];

// Helper to get the full tier object based on name
const getTierData = (name: TierName) =>
  serviceTiers.find((t) => t.name === name);

// --- Sub Component: Individual Service Card (Click-Activated) ---
const ServiceCard: React.FC<{
  tier: ServiceTier;
  setSelectedTier: (name: TierName) => void;
  isSelected: boolean;
}> = ({ tier, setSelectedTier, isSelected }) => {
  // Base classes for active/selected state
  const activeClasses = isSelected
    ? "bg-gradient-to-br from-red-900 to-black/90 border-2 border-red-700 shadow-2xl shadow-red-900/50 transform scale-[1.03]"
    : "bg-stone-900 border border-stone-800 hover:border-red-700/50 hover:scale-[1.02]";

  return (
    <div
      className={`
                relative w-full rounded-lg group cursor-pointer transition-all duration-300
                ${activeClasses}
            `}
      // aria-label was changed from 'Service tier ${tier.name} at ${tier.price}'
      aria-label={`Service tier ${tier.name}`}
      role="button"
      tabIndex={0}
      onClick={() => setSelectedTier(tier.name)} // Click handler
      onKeyDown={(e) => {
        // Accessibility for keyboard users
        if (e.key === "Enter" || e.key === " ") {
          setSelectedTier(tier.name);
        }
      }}
    >
      <div className={`p-6 md:p-8 rounded-xl h-full flex flex-col`}>
        {/* Title and Tagline */}
        <div className="mb-2">
          <h3
            className={`text-2xl md:text-3xl font-extrabold ${
              isSelected ? "text-white" : "text-stone-300"
            }`}
          >
            {tier.name}
          </h3>
          <p
            className={`text-sm mt-1 ${
              isSelected ? "text-red-300" : "text-stone-500"
            }`}
          >
            {tier.tagline}
          </p>
        </div>

        {/* Price Display Block was entirely removed */}
      </div>
    </div>
  );
};

// --- Sub Component: Feature List (Dynamic based on selected card) ---
const FeatureList: React.FC<{ tierName: TierName }> = ({ tierName }) => {
  const tierData = getTierData(tierName);
  const excluded = tierData ? tierData.excludedFeatures : [];

  return (
    <div className="lg:col-span-1 lg:pl-10">
      <h2 className="text-xl font-bold text-white mb-6">Includes:</h2>
      <ul className="space-y-4">
        {allFeatures.map((feature, idx) => {
          const isIncluded = !excluded.includes(feature);
          const textColor = isIncluded ? "text-white" : "text-stone-500";

          return (
            <li key={idx} className="flex items-center text-lg">
              {/* Checkmark (Included) - Red-themed */}
              {isIncluded ? (
                <svg
                  className="w-6 h-6 mr-3 text-red-700 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                // X Mark (Excluded)
                <svg
                  className="w-6 h-6 mr-3 text-stone-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              <span className={textColor}>{feature}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// --- Main Component ---
export default function InteractivePricingSection() {
  // State to manage which card's features are currently displayed (defaults to Premium Support)
  const [selectedTier, setSelectedTier] = useState<TierName>("Premium Support");

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Grid Container for Cards and Feature List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-start">
          {/* Pricing Cards (2/3 width) - Click-Activated */}
          <div className="lg:col-span-2 space-y-8">
            {serviceTiers.map((tier) => (
              <ServiceCard
                key={tier.name}
                tier={tier}
                setSelectedTier={setSelectedTier}
                isSelected={tier.name === selectedTier} // Pass the selection state
              />
            ))}
          </div>

          {/* Feature List (1/3 width) - Dynamic Display */}
          <FeatureList tierName={selectedTier} />
        </div>
      </div>
    </section>
  );
}
