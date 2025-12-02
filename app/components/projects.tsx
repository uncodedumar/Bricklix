import React from 'react';

// 1. Define the TypeScript type for the project data
interface Project {
  id: number;
  title: string;
  year: number;
  url: string;
  imageUrl: string;
}

// 2. Project Data Array (Matching the 4 visible items in the image)
const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Lemon Tree & Co/',
    year: 2022,
    url: 'https://www.lemontreeandco.com/',
    // Using an abstract light sculpture image
    imageUrl: './A1.png',
  },
 
  {
    id: 2,
    title: 'Bricklix',
    year: 2025,
    url: '/portfolio',
    // Using a motion blur running figure
    imageUrl: './bricklix.png',
  },
 
  {
    id: 3,
    title: 'Luma Health/',
    year: 2024,
    url: 'https://www.luma.health/',
    // Using a bicycle detail shot
    imageUrl: './A5.png',
  },
 
  {
    id: 4,
    title: 'Sherlock',
    year: 2024,
    url: 'https://sherlock.bio/',
    // Using a bicycle detail shot
    imageUrl: './A7.png',
  },
 
  {
    id: 5,
    title: 'Mya Well Being',
    year: 2023,
    url: 'https://myawellbeing.com/',
    // Using a bicycle detail shot
    imageUrl: './A9.png',
  },
 
  
];




const ImageMatchingShowcase: React.FC = () => {
  return (
    // Base container matching the black background and full height
    <section className="py-16 sm:py-24 bg-black text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section - Minimal styling matching the image */}
        <div className="text-center md:text-left mb-12">
          {/* Replicating the two-line header as seen in the image */}
          <h1 className="text-3xl font-normal text-white tracking-tight leading-snug">
            Showcasing creative work <br className="hidden sm:inline" /> that inspires growth
          </h1>
        </div>

        {/* --- */}

        {/* Project Grid Container (Now fixed 3 columns) */}
        {/* **MODIFIED: Removed responsive grid-cols and set to a fixed 3 columns** */}
        <div className="grid **grid-cols-1 sm:grid-cols-2 lg:grid-cols-3** gap-8 sm:gap-10"> 


          {PROJECTS.map((project) => (
            // Card container wrapper
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              // **MODIFIED: Removed aspect-ratio, added fixed h-96 class** className="group block bg-black **h-96 w-full** transform transition-all duration-300 hover:scale-[1.01]" 
            >
              {/* Image and Metadata Wrapper */}
              <div className="relative w-full h-full">

                {/* The main image container with rounded corners and subtle border/shadow */}
                <div className="rounded-xl overflow-hidden h-full w-full shadow-2xl shadow-black/50">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    // object-cover ensures the image fills the space without distortion
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-80"
                  />
                </div>
                
            
                

                {/* Content Panel - Title and Year - positioned absolutely at the bottom */}
                <div className="absolute bottom-[-1.5rem] left-0 right-0 z-10 flex justify-between items-baseline px-1">
                  
                  {/* Title: Left-aligned, bold, and slightly offset below the card */}
                  <h3 className="font-medium text-lg text-white">
                    {project.title}
                  </h3>

                  {/* Year: Right-aligned and muted, slightly offset below the card */}
                  <p className="text-sm text-stone-500 tracking-wider">
                    /{project.year}
                  </p>

                </div>
              </div>
            </a>
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default ImageMatchingShowcase;