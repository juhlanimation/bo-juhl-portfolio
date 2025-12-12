/**
 * Shared spacing configuration
 * DRY: Extracted from multiple section components that had duplicate padding maps
 * OCP: Extensible - add new sizes without modifying existing components
 */

/**
 * Standard section padding values
 * Used by: ProjectsSection, MoreProjectsSection
 */
export const sectionPaddingMap: Record<string, string> = {
  sm: "2rem",
  md: "4rem",
  lg: "6rem",
  xl: "8rem",
}

/**
 * Compact padding values for smaller sections
 * Used by: FooterSection
 */
export const compactPaddingMap: Record<string, string> = {
  sm: "1.5rem",
  md: "3rem",
  lg: "5rem",
}

/**
 * Get padding value with fallback
 */
export function getPadding(
  size: string,
  map: Record<string, string> = sectionPaddingMap,
  fallback = "8rem"
): string {
  return map[size] || fallback
}
