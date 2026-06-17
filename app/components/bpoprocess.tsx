'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Palette, Users, BarChart3 } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "Deep-dive into your goals, challenges, and success metrics. We map your landscape to find the optimal path forward.",
    icon: <Target className="w-8 h-8" />,
    color: "#ef4444",
    gradient: "from-red-500/20 to-orange-500/20"
  },
  {
    number: "02",
    title: "Design",
    description: "Architect tailored solutions with the right team, models, tools, and reporting frameworks for your unique needs.",
    icon: <Palette className="w-8 h-8" />,
    color: "#f97316",
    gradient: "from-orange-500/20 to-amber-500/20"
  },
  {
    number: "03",
    title: "Onboard",
    description: "Seamless integration with your processes, systems, and brand voice. Your team hits the ground running.",
    icon: <Users className="w-8 h-8" />,
    color: "#eab308",
    gradient: "from-amber-500/20 to-yellow-500/20"
  },
  {
    number: "04",
    title: "Manage",
    description: "Transparent metrics, continuous QA, and iterative improvement. We optimize while you focus on growth.",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "#22c55e",
    gradient: "from-green-500/20 to-emerald-500/20"
  }
];

function ProcessCard({ step, index }: { step: ProcessStep; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePosition({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      className="relative group perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow Effect */}
        <div 
          className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
          style={{ background: `radial-gradient(circle at 50% 50%, ${step.color}20, transparent 70%)` }}
        />

        {/* Card */}
        <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden group-hover:border-zinc-700/50 transition-all duration-500">

          {/* Top Gradient Bar */}
          <div 
            className="h-1 w-full bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, ${step.color}40, ${step.color})` }}
          />

          {/* Content */}
          <div className="p-8 relative">
            {/* Background Number */}
            <div 
              className="absolute top-4 right-4 text-8xl font-bold opacity-[0.03] select-none pointer-events-none"
              style={{ color: step.color }}
            >
              {step.number}
            </div>

            {/* Icon */}
            <motion.div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative"
              style={{ 
                background: `linear-gradient(135deg, ${step.color}15, ${step.color}05)`,
                border: `1px solid ${step.color}20`
              }}
              animate={isHovered ? { 
                boxShadow: `0 0 30px ${step.color}30`,
                scale: 1.1 
              } : { 
                boxShadow: `0 0 0px ${step.color}00`,
                scale: 1 
              }}
              transition={{ duration: 0.4 }}
            >
              <div style={{ color: step.color }}>
                {step.icon}
              </div>

              {/* Orbiting dot */}
              <motion.div
                className="absolute w-2 h-2 rounded-full"
                style={{ background: step.color }}
                animate={isHovered ? { 
                  rotate: 360,
                  opacity: 1
                } : { 
                  rotate: 0,
                  opacity: 0
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                initial={{ x: 28, y: 0 }}
              />
            </motion.div>

            {/* Step Number & Title */}
            <div className="mb-4">
              <span 
                className="text-xs font-bold tracking-[0.2em] uppercase block mb-2"
                style={{ color: step.color }}
              >
                Step {step.number}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {step.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {step.description}
            </p>

            {/* Learn More Link */}
            <motion.div 
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: step.color }}
              animate={isHovered ? { x: 4 } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
          <br />

          {/* Bottom decorative line */}
          <motion.div 
            className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent"
            animate={isHovered ? { opacity: 1 } : { opacity: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ConnectingLine({ index }: { index: number }) {
  return (
    <motion.div 
      className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-full w-12 h-px items-center"
      style={{ zIndex: 0 }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
    >
      <div className="w-full h-px bg-gradient-to-r from-zinc-700 to-zinc-800" />
      <motion.div 
        className="w-2 h-2 rounded-full bg-zinc-600 -ml-1"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
      />
    </motion.div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black text-white py-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Main gradient orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[150px]" />

        {/* Secondary orbs */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-orange-600/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-800/5 rounded-full blur-[130px]" />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </motion.div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        style={{ opacity: springOpacity }}
      >
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-24 relative">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800/50 mb-8"
          >
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400">
              The Process
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 max-w-3xl mx-auto leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            How We{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Work</span>
              <motion.span 
                className="absolute bottom-2 left-0 w-full h-3 bg-red-500/20 -z-0"
                initial={{ scaleX: 0 }}
                animate={isHeaderInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            No friction. No unnecessary complexity. Just a streamlined, structured 
            approach engineered to align seamlessly with your enterprise goals.
          </motion.p> 
          <br />
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <ProcessCard step={step} index={index} />
              {index < steps.length - 1 && <ConnectingLine index={index} />}
            </div>
          ))}
        </div>

        
      </motion.div>
    </section>
  );
}