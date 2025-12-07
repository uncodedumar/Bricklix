'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// TypeScript interface for profile data
interface ProfileData {
  name: string;
  title: string;
  company: string;
  avatar: string;
}

// Profile data
const profileData: ProfileData = {
  name: "Oan Ali",
  title: "Project Manager",
  company: "@Bricklix",
  avatar: "/user.png" // Add your profile image path
};

// Main CTA Section Component
export default function CTASection() {
  const handleBookMeeting = () => {
    // Add your booking logic here
    console.log('Booking meeting...');
    // Example: redirect to calendar link or open modal
    window.open('/contact', '_blank');
  };

  return (
    <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-stone-950 to-black" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/50 shadow-3xl "
        >
          {/* Background Image */}
          <div className="absolute inset-1 -z-10 blur-2xs">
            <Image
              src="/scale.svg"
              alt="Card background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-8 "
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal italic text-white mb-6 leading-tight p-10">
              Ready to{' '}
              <span className="italic text-red-400 font-extralight text-gray-300">Scale</span>{' '}
              your<br className="hidden sm:block" />
              brand to new{' '}
              <span className="italic text-red-400 font-extralight text-gray-300">Heights</span>?
            </h1>

            <p className="text-white text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light p-5">
              The result: experiences that aren&apos;t just visually stunning but also measurably
              effective in engaging, converting, and retaining users.
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-12 "
          >
            {/* Book Meeting Button */}
            <motion.button
              onClick={handleBookMeeting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-semibold text-base md:text-lg rounded-sm hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book a meeting
            </motion.button>

            
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}