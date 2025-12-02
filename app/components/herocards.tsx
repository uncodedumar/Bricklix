'use client';

import type { SpringOptions } from 'framer-motion';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';


// TiltedCard Component Interface
interface TiltedCardProps {
    imageSrc: React.ComponentProps<'img'>['src'];
    altText?: string;
    captionText?: string;
    containerHeight?: React.CSSProperties['height'];
    containerWidth?: React.CSSProperties['width'];
    imageHeight?: React.CSSProperties['height'];
    imageWidth?: React.CSSProperties['width'];
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showMobileWarning?: boolean;
    showTooltip?: boolean;
    overlayContent?: React.ReactNode;
    displayOverlayContent?: boolean;
}

const springValues: SpringOptions = {
    damping: 30,
    stiffness: 100,
    mass: 2
};

// TiltedCard Component
function TiltedCard({
    imageSrc,
    altText = 'Tilted card image',
    captionText = '',
    containerHeight = '300px',
    containerWidth = '100%',
    imageHeight = '300px',
    imageWidth = '300px',
    scaleOnHover = 1.1,
    rotateAmplitude = 14,
    showMobileWarning = false,
    showTooltip = true,
    overlayContent = null,
    displayOverlayContent = false
}: TiltedCardProps) {
    const ref = useRef<HTMLElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);
    const opacity = useSpring(0);
    const rotateFigcaption = useSpring(0, {
        stiffness: 350,
        damping: 30,
        mass: 1
    });
    const [lastY, setLastY] = useState(0);

    function handleMouse(e: React.MouseEvent<HTMLElement>) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
        rotateX.set(rotationX);
        rotateY.set(rotationY);
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
        const velocityY = offsetY - lastY;
        rotateFigcaption.set(-velocityY * 0.6);
        setLastY(offsetY);
    }

    function handleMouseEnter() {
        scale.set(scaleOnHover);
        opacity.set(1);
    }

    function handleMouseLeave() {
        opacity.set(0);
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
        rotateFigcaption.set(0);
    }

    return (
        <figure
            ref={ref}
            className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
            style={{
                height: containerHeight,
                width: containerWidth
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showMobileWarning && (
                <div className="absolute top-4 text-center text-sm block sm:hidden text-gray-400">
                    Check on desktop.
                </div>
            )}
            <motion.div
                className="relative [transform-style:preserve-3d]"
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    rotateX,
                    rotateY,
                    scale
                }}
            >
                <motion.img
                    src={imageSrc}
                    alt={altText}
                    className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
                    style={{
                        width: imageWidth,
                        height: imageHeight
                    }}
                />
                {displayOverlayContent && overlayContent && (
                    <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
                        {overlayContent}
                    </motion.div>
                )}
            </motion.div>
            {showTooltip && (
                <motion.figcaption
                    className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
                    style={{
                        x,
                        y,
                        opacity,
                        rotate: rotateFigcaption
                    }}
                >
                    {captionText}
                </motion.figcaption>
            )}
        </figure>
    );
}

// Card data interface
interface CardData {
    id: number;
    title: string;
    description: string;
    image: string;
    altText: string;
    captionText: string;
}

// Sample card data
const cardData: CardData[] = [
    {
        id: 1,
        title: "Creative Design",
        description: "Transform your vision into stunning visual experiences with our innovative design solutions. We craft memorable brands that resonate with your audience and drive meaningful engagement.",
        image: "/4.webp",
        altText: "Creative design workspace",
        captionText: "Hover to explore creative possibilities"
    },
    {
        id: 2,
        title: "Digital Innovation",
        description: "Stay ahead of the curve with cutting-edge digital strategies that revolutionize your business processes. Our technology solutions are designed to scale with your ambitions.",
        image: "/5.webp",
        altText: "Digital innovation concept",
        captionText: "Discover the future of technology"
    },
    {
        id: 3,
        title: "Strategic Growth",
        description: "Unlock your potential with data-driven strategies that accelerate growth and maximize ROI. We partner with you to build sustainable success through intelligent planning.",
        image: "/6.webp",
        altText: "Strategic growth planning",
        captionText: "Navigate your path to success"
    }
];

// Main TiltedCardsSection component
export default function TiltedCardsSection() {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-black  via-gray-800 to-black min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
                            Enchanted   <span className="text-red-500 font-normal">Domains</span>
                        </h2>
                        <p className="text-gray-100 font-light text-xl max-w-3xl mx-auto leading-relaxed">
                            Explore our comprehensive suite of services designed to elevate your business to new heights. Each solution is crafted with precision and passion.
                        </p>
                    </motion.div>
                </div>


                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                    {cardData.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.2,
                                ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center"
                        >
                            {/* Card Title */}
                            <div className="text-center mb-6">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    {card.title}
                                </h3>
                                <p className="text-gray-300 text-base leading-relaxed max-w-sm mx-auto">
                                    {card.description}
                                </p>
                            </div>

                            {/* Tilted Card */}
                            <div className="w-full max-w-sm">
                                <TiltedCard
                                    imageSrc={card.image}
                                    altText={card.altText}
                                    captionText={card.captionText}
                                    containerHeight="350px"
                                    containerWidth="100%"
                                    imageHeight="300px"
                                    imageWidth="300px"
                                    scaleOnHover={1.15}
                                    rotateAmplitude={18}
                                    showMobileWarning={false}
                                    showTooltip={true}
                                />
                            </div>


                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <p className="text-gray-400 mb-8 text-lg font-light">
                        Ready to transform your business with our expertise?
                    </p>
                    <Link href="/services">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-white text-black font-normal text-lg rounded-sm hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Enter the Realm
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}