"use client";

import React from "react";
// Removed useState and all click/state logic for 100% performance

// --- Data Structure ---
type TierName = "Basic Assurance" | "Premium Support" | "Enterprise Custom";

interface ServiceTier {
  name: TierName;
  tagline: string;
  style: "default" | "gradient";
  // The 'excludedFeatures' list is maintained to derive feature inclusion
  excludedFeatures: string[];
}

// Full list of all potential features (Features will become the rows of the table)
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
  // IMPORTANT: Ordered for logical comparison (lowest to highest)
  {
    name: "Basic Assurance",
    tagline: "Best for beginners who want to explore the platform.",
    style: "default",
    excludedFeatures: [
      "Real-time Threat Detection",
      "Cloud Infrastructure Optimization",
      "Proactive Code Review",
      "24/7 Dedicated Engineer",
      "Full Disaster Recovery Plan",
    ],
  },
  {
    name: "Premium Support",
    tagline: "Perfect for professionals who need advanced tools.",
    style: "gradient", // Highlighted style for the middle/recommended tier
    excludedFeatures: [
      "24/7 Dedicated Engineer",
      "Full Disaster Recovery Plan",
    ],
  },
  {
    name: "Enterprise Custom",
    tagline: "For businesses and power users who want it all.",
    style: "default",
    excludedFeatures: [],
  },
];

// --- Sub Component: Check/X Icon ---
// Using static SVG for maximum performance over icon library imports
const Icon: React.FC<{ isIncluded: boolean }> = ({ isIncluded }) => (
  isIncluded ? (
    <svg
      className="w-5 h-5 lg:w-6 lg:h-6 text-red-700 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Included</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M5 13l4 4L19 7"
      />
    </svg>
  ) : (
    <svg
      className="w-5 h-5 lg:w-6 lg:h-6 text-stone-600 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Not Included</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
);

// --- Main Component: Static Comparative Pricing Table ---
export default function ComparisonPricingTable() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:py-24 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl lg:text-5xl font-extrabold text-stone-50 text-center mb-12 lg:mb-16">
          Compare Our <span className="text-red-600">Service Packages</span>
        </h2>

        {/* --- Comparison Table Structure (Semantic and Responsive) --- */}
        {/* On mobile, it will be a simple stack. On desktop, it's a full grid/table. */}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-800 border-collapse">
            
            {/* Table Header (Package Names & Taglines) */}
            <thead className="sticky top-0 bg-black z-20">
              <tr>
                {/* Empty corner for the features column */}
                <th className="w-[30%] lg:w-[40%] px-4 py-4 text-left text-sm font-semibold text-stone-400 uppercase tracking-wider">
                  Features
                </th>

                {/* Package Headers */}
                {serviceTiers.map((tier, index) => (
                  <th
                    key={tier.name}
                    scope="col"
                    className={`
                      w-[20%] px-4 py-4 text-center 
                      transition-all duration-300 rounded-t-lg
                      ${tier.style === 'gradient' 
                        ? 'bg-gradient-to-br from-red-800/80 to-black/80 text-white shadow-2xl shadow-red-900/50' 
                        : 'bg-stone-900 text-stone-300'
                      }
                    `}
                  >
                    <h3 className="text-lg lg:text-xl font-extrabold mb-1">
                      {tier.name}
                    </h3>
                    <p className={`text-xs ${tier.style === 'gradient' ? 'text-red-200' : 'text-stone-500'}`}>
                      {tier.tagline}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            
            {/* Table Body (Feature Rows) */}
            <tbody className="divide-y divide-stone-900">
              {allFeatures.map((feature, featureIndex) => (
                <tr 
                  key={featureIndex} 
                  className={`
                    ${featureIndex % 2 === 0 ? 'bg-stone-950/50' : 'bg-stone-900/50'}
                    hover:bg-stone-800 transition-colors duration-200
                  `}
                >
                  {/* Feature Name (Row Header) */}
                  <th scope="row" className="px-4 py-4 text-left font-medium text-white text-base lg:text-lg">
                    {feature}
                  </th>

                  {/* Inclusion Cells (Package Columns) */}
                  {serviceTiers.map((tier) => {
                    const isIncluded = !tier.excludedFeatures.includes(feature);
                    
                    return (
                      <td 
                        key={`${tier.name}-${feature}`}
                        className="px-4 py-4 text-center align-middle"
                      >
                        <div className="flex justify-center">
                          <Icon isIncluded={isIncluded} />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="text-center mt-12">
            <p className="text-stone-400 text-sm italic">
                Note: The Enterprise Custom tier is highly flexible and includes additional features not listed here.
            </p>
        </div>

      </div>
    </section>
  );
}