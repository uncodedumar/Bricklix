'use client'
import React, { useState, useEffect } from 'react'; // Import useEffect
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Define the shape of a navigation link
interface NavLink {
  name: string;
  href: string;
}

// Define the links requested by the user, excluding "Contact us" which is the CTA button
const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Team', href: '/team' },
];

/**
 * Custom SVG for the Menu Icon (Hamburger)
 */
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-7 h-7"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

/**
 * Custom SVG for the Close Icon (X)
 */
const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-7 h-7"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // New state to track if the page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false);

  // Use Next.js usePathname hook to get the current active path
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Effect to add and remove the scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position is greater than, say, 10 pixels
      const scrolled = window.scrollY > 10;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    // Attach the event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]); // Dependency array includes isScrolled for correct state check

  /**
    * Renders the pill-shaped main navigation links for desktop.
    */
  const renderDesktopNav = () => (
    <div
      // Pill container styling: dark background, heavily rounded, subtle shadow/border effect
      className="hidden md:flex items-center p-1 rounded-full 
             bg-opacity-100 backdrop-blur-lg shadow-xl
             border border-stone-800/50 " // Stone-like border
    >
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            // Link styling: Using red and stone combinations
            className={`
              px-6 py-2 mx-1 text-sm font-semibold transition-all duration-200 rounded-full cursor-pointer
              ${isActive
                // Active state: Light stone background, deep red text
                ? 'bg-stone-200 text-red-800 shadow-md'
                // Inactive state: Stone-like text, dark hover
                : 'text-stone-400 hover:text-white hover:bg-stone-900/50'
              }
            `}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );

  /**
    * Renders the mobile menu drawer.
    */
  const renderMobileMenu = () => (
    <div
      className={`
        fixed inset-0 z-50 bg-black transition-transform duration-300 ease-in-out
        md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-800 h-16">
        <Logo />
        <button onClick={toggleMenu} className="p-2 text-white rounded-lg hover:bg-gray-800">
          <CloseIcon />
        </button>
      </div>

      <nav className="flex flex-col p-6 space-y-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={toggleMenu}
              className={`
                py-3 text-xl font-medium rounded-lg text-left transition-colors duration-150
                ${isActive
                  // Mobile Active state: Red text with red left border
                  ? 'text-red-400 border-l-4 border-red-500 pl-4'
                  : 'text-gray-300 hover:text-white pl-4'
                }
              `}
            >
              {link.name}
            </Link>
          );
        })}
        {/* Mobile CTA Button */}
        <Link
          href="/contact"
          onClick={toggleMenu}
          className="mt-6 w-full text-center px-8 py-3 text-lg font-bold rounded-full 
                     bg-gradient-to-r from-red-700 to-orange-500 
                     hover:from-red-800 hover:to-orange-600 transition duration-300 shadow-lg"
        >
          Contact Us
        </Link>
      </nav>
    </div>
  );

  /**
    * Renders the logo element using Next.js Image component with bottom padding
    */
  const Logo = () => (
    <Link href="/" className="flex items-center space-x-2 cursor-pointer pb-1">
      <Image
        src="/logo.svg" // Replace with your actual logo path in the public folder
        alt="Bricklix"
        width={120}
        height={36}
        className="h-9 w-auto"
        priority
      />
    </Link>
  );

  /**
    * Renders the large gradient CTA button for desktop.
    */
  const renderCTAButton = () => (
    <Link
      href="/contact"
      className="hidden md:inline-block px-8 py-2 text-base font-bold text-white rounded-full 
               bg-gradient-to-r from-red-700 to-orange-500 
               hover:from-red-800 hover:to-orange-600 transition duration-300 
               shadow-xl shadow-red-900/50 transform hover:scale-[1.02] active:scale-95"
    >
      Contact Us
    </Link>
  );

  // Apply a dynamic class to the header based on the scroll state
  const headerClasses = `
    fixed top-0 left-0 right-0 z-40 mb-10 transition-all duration-300 
    ${isScrolled 
      ? 'bg-black/80 backdrop-blur-md shadow-2xl border-b border-gray-700/50' // Scrolled state: semi-transparent black with blur
      : 'bg-transparent' // Default state: transparent
    }
  `;

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo with bottom padding */}
          <Logo />

          {/* Desktop Nav Links (Pill) */}
          <div className="flex-1 flex justify-center">{renderDesktopNav()}</div>

          {/* Desktop CTA Button */}
          {renderCTAButton()}

          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white rounded-lg hover:bg-gray-800 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {renderMobileMenu()}
    </header>
  );
};

export default Navbar;