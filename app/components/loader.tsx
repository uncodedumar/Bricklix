'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image'; // 💡 FIX 2: Imported Next.js Image component

export default function LoadingScreen() {
    const [currentService, setCurrentService] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const services = ['ai.', 'web.', 'app.', 'cloud.', 'mobile.', 'design.'];

    useEffect(() => {
        setIsMounted(true);
        
        // Cycle through services
        const serviceInterval = setInterval(() => {
            setCurrentService((prev) => (prev + 1) % services.length);
        }, 500);

        // Fade out loading screen after 3.5 seconds
        const loadTimer = setTimeout(() => {
            setIsLoaded(true);
        }, 3500);

        return () => {
            clearInterval(serviceInterval);
            clearTimeout(loadTimer);
        };
    }, [services.length]);

    // Don't render until mounted to prevent hydration mismatch
    if (!isMounted || isLoaded) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-600/20 rounded-full blur-[120px] animate-pulse animation-delay-1000" />
            </div>

            {/* Logo Container */}
            <div className="relative z-10 flex flex-col items-center space-y-8">
                {/* Logo with reveal animation */}
                <div className="logo-reveal">
                    <div className="relative">
                        {/* 💡 FIX 2: Replaced <img> with Next.js <Image /> for optimization */}
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={168} // w-42 * 4 = 168px
                            height={168} // h-42 * 4 = 168px
                            className="w-42 h-42 flex items-center justify-center"
                        />

                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-stone-600 to-red-800 blur-xl opacity-50 animate-pulse" />
                    </div>
                </div>

                {/* Service Text with blinking effect */}
                <div className="text-reveal">
                    <div className="h-12 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white tracking-wider service-blink">
                            {services[currentService]}
                        </span>
                    </div>
                </div>

                {/* Loading dots */}
                <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce animation-delay-200" />
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce animation-delay-400" />
                </div>
            </div>

            <style jsx>{`
        @keyframes logo-reveal {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
          }
          60% {
            opacity: 1;
            transform: scale(1.1) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes text-reveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes service-blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        .logo-reveal {
          animation: logo-reveal 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .text-reveal {
          animation: text-reveal 0.8s ease-out 0.5s forwards;
          opacity: 0;
        }

        .service-blink {
          animation: service-blink 0.5s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
        </div>
    );
}