import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// Plus Jakarta Sans - Alternative to Soleil
// Modern geometric sans-serif with clean lines
export const soleil = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400"], // Light and Regular
  variable: "--font-soleil",
  display: "swap",
});

// Inter - Alternative to Neue Haas Grotesk Display Pro
// Described as "like twins" with Neue Haas Grotesk
export const neueHaasGrotesk = Inter({
  subsets: ["latin"],
  weight: ["300", "500", "900"], // Light, Medium, Black
  variable: "--font-neue-haas-grotesk",
  display: "swap",
});
