'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons'; // Import IconType for the logo type
import {
  // Simple Icons (Si)
  SiNextdotjs,       // Next.js
  SiFlutter,         // Flutter
  SiTailwindcss,     // Tailwind
  SiBootstrap,       // Bootstrap
  SiKaggle,          // Kaggle
  SiNodedotjs,       // Node.js
  SiCplusplus,       // C++
  SiPython,          // Python
  SiRaspberrypi,     // Raspberry Pi
  SiArduino,         // Arduino
  SiGooglescholar,   // Google Scholar
  SiJupyter,         // Jupyter
  SiAmazon,          // AWS
  SiDocker,          // Docker
  SiGithub,          // Github
  SiVercel,          // Vercel
  SiGodaddy,         // Godaddy
  SiNamecheap,       // Namecheap
  // SiHostinger,    // Hostinger (REMOVED: Was defined but never used, addressing the warning on line 25)
  SiFigma,           // Figma
  SiShopify,         // Shopify
} from 'react-icons/si';

import {
  // Font Awesome (Fa)
  FaReact,           // React
  FaWordpress,       // Wordpress
  FaElementor,       // Elementor
  FaPhp,             // PHP
  FaLaravel,         // Laravel
  FaJs,              // JS
  FaJava,            // Java
} from 'react-icons/fa';

import {
  // Lucide Icons (for abstract concepts like AI/Chatbot)
  Brain,             // AI (Artificial Intelligence)
  Bot,               // Chatbot
} from 'lucide-react';

// Define the Logo interface for type safety (Addresses 'any' errors)
interface Logo {
  icon: IconType | typeof Brain | typeof Bot; // IconComponent can be an IconType or a Lucide-react component
  name: string;
  color: string;
  hoverColor: string;
}

// Logo data using react-icons with proper colors matching the actual technologies
const logoData: Logo[] = [ // Use the Logo interface for the array type
  {
    icon: SiNextdotjs,
    name: "Next.js",
    color: "text-black",
    hoverColor: "hover:text-gray-800",
  },
  {
    icon: SiFlutter,
    name: "Flutter",
    color: "text-blue-500",
    hoverColor: "hover:text-blue-600",
  },
  {
    icon: SiTailwindcss,
    name: "Tailwind CSS",
    color: "text-cyan-500",
    hoverColor: "hover:text-cyan-600",
  },
  {
    icon: SiBootstrap,
    name: "Bootstrap",
    color: "text-purple-600",
    hoverColor: "hover:text-purple-700",
  },
  {
    icon: SiKaggle,
    name: "Kaggle",
    color: "text-blue-400",
    hoverColor: "hover:text-blue-500",
  },
  {
    icon: SiNodedotjs,
    name: "Node.js",
    color: "text-green-600",
    hoverColor: "hover:text-green-700",
  },
  {
    icon: SiCplusplus,
    name: "C++",
    color: "text-blue-600",
    hoverColor: "hover:text-blue-700",
  },
  {
    icon: SiPython,
    name: "Python",
    color: "text-blue-500",
    hoverColor: "hover:text-blue-600",
  },
  {
    icon: SiRaspberrypi,
    name: "Raspberry Pi",
    color: "text-red-600",
    hoverColor: "hover:text-red-700",
  },
  {
    icon: SiArduino,
    name: "Arduino",
    color: "text-teal-600",
    hoverColor: "hover:text-teal-700",
  },
  {
    icon: SiGooglescholar,
    name: "Google Scholar",
    color: "text-blue-600",
    hoverColor: "hover:text-blue-700",
  },
  {
    icon: SiJupyter,
    name: "Jupyter",
    color: "text-orange-500",
    hoverColor: "hover:text-orange-600",
  },
  {
    icon: SiAmazon,
    name: "AWS",
    color: "text-orange-500",
    hoverColor: "hover:text-orange-600",
  },
  {
    icon: SiDocker,
    name: "Docker",
    color: "text-blue-500",
    hoverColor: "hover:text-blue-600",
  },
  {
    icon: SiGithub,
    name: "GitHub",
    color: "text-gray-800",
    hoverColor: "hover:text-black",
  },
  {
    icon: SiVercel,
    name: "Vercel",
    color: "text-black",
    hoverColor: "hover:text-gray-800",
  },
  {
    icon: SiGodaddy,
    name: "GoDaddy",
    color: "text-green-600",
    hoverColor: "hover:text-green-700",
  },
  {
    icon: SiNamecheap,
    name: "Namecheap",
    color: "text-orange-600",
    hoverColor: "hover:text-orange-700",
  },
  {
    icon: SiFigma,
    name: "Figma",
    color: "text-purple-500",
    hoverColor: "hover:text-purple-600",
  },
  {
    icon: SiShopify,
    name: "Shopify",
    color: "text-green-600",
    hoverColor: "hover:text-green-700",
  },
  {
    icon: FaReact,
    name: "React",
    color: "text-cyan-500",
    hoverColor: "hover:text-cyan-600",
  },
  {
    icon: FaWordpress,
    name: "WordPress",
    color: "text-blue-600",
    hoverColor: "hover:text-blue-700",
  },
  {
    icon: FaElementor,
    name: "Elementor",
    color: "text-pink-500",
    hoverColor: "hover:text-pink-600",
  },
  {
    icon: FaPhp,
    name: "PHP",
    color: "text-indigo-600",
    hoverColor: "hover:text-indigo-700",
  },
  {
    icon: FaLaravel,
    name: "Laravel",
    color: "text-red-600",
    hoverColor: "hover:text-red-700",
  },
  {
    icon: FaJs,
    name: "JavaScript",
    color: "text-yellow-500",
    hoverColor: "hover:text-yellow-600",
  },
  {
    icon: FaJava,
    name: "Java",
    color: "text-red-600",
    hoverColor: "hover:text-red-700",
  },
  {
    icon: Brain,
    name: "AI",
    color: "text-purple-500",
    hoverColor: "hover:text-purple-600",
  },
  {
    icon: Bot,
    name: "Chatbot",
    color: "text-green-500",
    hoverColor: "hover:text-green-600",
  }
];

// Logo component without href and zoom effects
const LogoItem = ({ logo, index }: { logo: Logo; index: number }) => { // Set prop types
  const IconComponent = logo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      className="flex-shrink-0 mx-8 group cursor-pointer"
    >
      <div className="block transition-all duration-300">
        <div className="flex flex-col items-center space-y-2">
          <div className={`${logo.color} ${logo.hoverColor} transition-all duration-300`}>
            <IconComponent
              className="w-12 h-12 md:w-16 md:h-16"
              style={{
                filter: "drop-shadow(0 4px 8px rgba(255, 255, 255, 0.1))"
              }}
            />
          </div>
          <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100">
            {logo.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Infinite scrolling logo component with faster speed
const LogoCarousel = ({ logos, direction = 'right', speed = 40 }: { logos: Logo[]; direction?: string; speed?: number }) => { // Set prop types
  return (
    <div className="relative py-2">
      <div className="overflow-hidden">
        <div className="flex animate-scroll-infinite" style={{
          animation: `scroll-${direction} ${speed}s linear infinite`
        }}>
          {/* First set */}
          <div className="flex flex-nowrap">
            {logos.map((logo, index) => (
              <LogoItem key={`first-${index}`} logo={logo} index={index} />
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex flex-nowrap">
            {logos.map((logo, index) => (
              <LogoItem key={`second-${index}`} logo={logo} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Fade out edges for black background */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default function LogoLoopSection() {
  const firstRowLogos = logoData.slice(0, 15);
  const secondRowLogos = logoData.slice(15);

  return (
    <section className="py-5 md:py-5 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* First Logo Carousel - Right to Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <LogoCarousel
            logos={firstRowLogos}
            direction="right"
            speed={30}
          />
        </motion.div>

        {/* Second Logo Carousel - Left to Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <LogoCarousel
            logos={secondRowLogos}
            direction="left"
            speed={35}
          />
        </motion.div>

      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }

        /* Smooth hover effects */
        .group:hover .transition-all {
          transition-duration: 0.3s;
          transition-timing-function: ease-out;
        }
      `}</style>
    </section>
  );
}