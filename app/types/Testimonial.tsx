// types/testimonial.ts

export type TestimonialData = {
  id: number;
  name: string;
  position: string; // e.g., "CTO at Company X"
  review: string;
  imageSrc: string; // Path to the image (e.g., "/images/person-1.jpg")
  imageAlt: string; // Descriptive alt text for the image (Crucial for A11y & SEO)
};