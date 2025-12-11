/**
 * Font utility classes based on the design system
 *
 * Two semantic font classes for easy switching:
 * - font-title: For all headings, titles, and emphasis (Inter - alternative to Neue Haas Grotesk)
 * - font-paragraph: For all body text and paragraphs (Plus Jakarta Sans - alternative to Soleil)
 *
 * To change fonts project-wide, simply update app/fonts.ts
 */

/**
 * Design system typography mappings
 * Based on FONTS.pdf specifications
 */
export const typography = {
  hero: {
    // "EXECUTIVE PRODUCER, PRODUCER, EDITOR"
    title: "font-title font-black",           // Neue Haas Grotesk 95 Black
  },

  about: {
    // "ABOUT ME" header
    header: "font-title font-medium",         // Neue Haas Grotesk 65 Medium
    // "I'm Bo Juhl" and body text
    body: "font-paragraph font-normal",       // Soleil Regular
  },

  projects: {
    // Project headers (e.g., "ELEMENTS OF TIME")
    header: "font-title font-bold",           // Neue Haas Grotesk 65 Medium
    // Project descriptions
    description: "font-paragraph font-light", // Soleil Light
    // Client + Studio info
    meta: "font-paragraph font-light",        // Soleil Light
  },

  footer: {
    // "HOME, ABOUT, PROJECTS"
    nav: "font-title font-light",             // Neue Haas Grotesk 45 Light
    // "GET IN TOUCH, FIND MY STUDIO"
    headers: "font-title font-black",         // Neue Haas Grotesk 95 Black
    // Social links
    links: "font-paragraph font-normal",      // Soleil Regular
  },
} as const;
