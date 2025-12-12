/**
 * Logo Configuration
 *
 * This file controls the client logos displayed in the About section marquee.
 * Add, remove, or adjust logo settings here.
 *
 * Each logo has:
 * - url: Path to the logo image (place files in /public/clients/)
 * - height: Display height in pixels (adjust per logo to balance visual weight)
 * - name: (optional) Client name for accessibility
 *
 * Tips:
 * - Use WebP files with alpha transparency for best results
 * - Logos are automatically inverted to white and shown at 50% opacity
 * - Adjust height individually to make logos visually balanced
 * - Taller/shorter logos may need different heights to look consistent
 */

export interface LogoConfig {
  /** Path to the logo image file (relative to /public/) */
  url: string;
  /** Display height in pixels - adjust per logo for visual balance */
  height: number;
  /** Optional client name for accessibility */
  name?: string;
}

/**
 * Client logos for the marquee
 * Add new logos by adding entries to this array
 */
export const logoConfig: LogoConfig[] = [
  { url: "/clients/netflix-alpha.webp", height: 72, name: "Netflix" },
  { url: "/clients/AMZN_STUDIOS - alpha.webp", height: 48, name: "Amazon Studios" },
  { url: "/clients/cartoon-network-logo-alpha.webp", height: 48, name: "Cartoon Network" },
  { url: "/clients/riot-games-logo.webp", height: 48, name: "Riot Games" },
  { url: "/clients/EA Games - alpha.webp", height: 58, name: "EA Games" },
  { url: "/clients/ubisoft-black-and-white-alpha.webp", height: 58, name: "Ubisoft" },
  { url: "/clients/2K - Games.webp", height: 48, name: "2K Games" },
  { url: "/clients/Supercell-logo-alpha.webp", height: 48, name: "Supercell" },
  { url: "/clients/respawn-entertainment.webp", height: 58, name: "Respawn Entertainment" },
  { url: "/clients/azuki-alpha.webp", height: 48, name: "Azuki" },
];
