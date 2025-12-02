'use client';
import React from 'react';
import { ChevronDown, BarChart3, TrendingUp, Users, LucideIcon } from 'lucide-react'; // Added LucideIcon type

// Interface for StatCard props
interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

// Utility component for the stat cards
const StatCard = ({ icon: Icon, value, label }: StatCardProps) => (
    // Added 'mx-auto' for centering on small screens
    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-red-500/20 shadow-2xl transition-transform duration-300 hover:scale-[1.03] w-[200px] text-left mx-auto">
        {/* Adjusted accent color from purple-400 to red-500 */}
        <p className={`text-4xl font-semibold ${value === "250+" ? 'text-red-500' : 'text-white'}`}>{value}</p>
        <p className="text-sm font-light text-gray-300 mt-1">{label}</p>
    </div>
);

const App = () => {
    // Keeping the original structure for the video src.
    const videoSrc = "/servbg.mp4";

    return (
        // Changed bg-black to bg-stone-900
        <section className="relative bg-stone-900 text-white min-h-screen flex items-center justify-center overflow-hidden font-['Poppins']">
            
            {/* Background Video (Kept from original code) */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <video
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    // Decreased opacity slightly to emphasize the foreground content and darkness
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    onError={(e) => console.log('Video failed to load:', e)}
                />
            </div>

            
            {/* Content Wrapper - Added pt-32 (padding top) to move content down */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-12 items-center min-h-[80vh]">
                
                {/* LEFT SECTION: Title, Description, CTAs */}
                {/* Added 'text-center' and 'lg:text-left' for mobile centering */}
                <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left">
                    {/* Centered this element specifically for mobile */}
                    <p className="text-sm font-medium tracking-widest uppercase text-red-500 py-10 mx-auto lg:mx-0">
                        Crafting Beautiful and Functional Result
                    </p>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        Transforming <br className="hidden md:block"/> Visions Into Digital Reality
                    </h1>
                    
                    {/* Added 'mx-auto lg:mx-0' to center paragraph on mobile */}
                    <p className="max-w-xl text-lg font-light text-gray-300 mx-auto lg:mx-0">
                        We’re a full-service digital agency specializing in cutting-edge web development, strategic branding, and data-driven marketing solutions that propel businesses to new heights.
                    </p>

                    
                    {/* Social Proof - Added 'justify-center lg:justify-start' to center on mobile */}
                    <div className="flex items-center space-x-3 text-sm pt-8 justify-center lg:justify-start">
                        {/* Changed icon color from text-purple-400 to text-red-500 */}
                        <Users className="w-5 h-5 text-red-500"/>
                        <p className="font-light">
                            <span className="font-semibold text-white">500+</span> people & brands have used our services
                        </p>
                    </div>

                </div>

                {/* RIGHT SECTION: Stats Cards (lg:col-span-5) */}
                {/* Updated classes:
                  - flex-col: Removed (no longer strictly vertical on mobile)
                  - space-y-6: Changed to gap-6 for better grid/flex spacing
                  - Added justify-center for centering cards on mobile
                  - Added flex-wrap for cards to wrap responsively on smaller screens if they don't fit horizontally
                */}
                <div className="lg:col-span-5 flex flex-wrap gap-6 self-start justify-center lg:flex-col lg:space-y-6 lg:gap-0 lg:justify-end lg:items-end w-full lg:pt-16">
                    <StatCard 
                        icon={BarChart3} 
                        value="200+" 
                        label="Projects Completed" 
                    />
                    <StatCard 
                        icon={TrendingUp} 
                        value="98%" 
                        label="Client Satisfaction" 
                    />
                    <StatCard 
                        icon={Users} 
                        value="50+" 
                        label="Expert Teams" 
                    />
                </div>
            </div>

        
            
            <style jsx global>{`
                /* Import Poppins font */
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

                /* Keyframes for the slow pulse animation */
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.05); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s infinite ease-in-out;
                }

                /* Fixed Mesh Pattern - Updated color from purple (168,85,247) to red (239,68,68) */
                .mesh-pattern {
                    background-image: radial-gradient(circle, rgba(239,68,68,0.5) 1px, transparent 0);
                    background-size: 15px 15px;
                }

                /* Red Glow Shadow - Added class to replace inline Tailwind shadow for custom color */
                .red-glow-shadow {
                    box-shadow: 0 0 80px rgba(239,68,68,0.7); /* Red-500 equivalent */
                }
            `}</style>
        </section>
    );
};

export default App;