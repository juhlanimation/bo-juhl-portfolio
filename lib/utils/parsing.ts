/**
 * Shared parsing utilities
 * DRY: Extracted from multiple components that had duplicate parsing logic
 */

/**
 * Parse a newline-separated string into an array of trimmed, non-empty strings
 * @example parseNewlineSeparated("a\nb\n\nc") => ["a", "b", "c"]
 */
export function parseNewlineSeparated(text: string | undefined, fallback = ""): string[] {
  return (text || fallback).split("\n").filter((item) => item.trim())
}

/**
 * Safely parse JSON with a fallback value
 * Returns fallback if JSON is invalid or results in empty array
 */
export function parseJsonWithFallback<T>(
  json: string | undefined,
  fallback: T
): T {
  try {
    const parsed = JSON.parse(json || "[]")
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as T
    }
    return fallback
  } catch {
    return fallback
  }
}

/**
 * Parse a CSS value into number and unit
 * @example parseUnitValue("4rem") => { value: 4, unit: "rem" }
 */
export function parseUnitValue(cssValue: string): { value: number; unit: string } {
  const value = parseFloat(cssValue)
  const unit = cssValue.replace(/[\d.]/g, "") || "rem"
  return { value, unit }
}

/**
 * Scale a CSS value by a factor
 * @example scaleUnitValue("4rem", 0.5) => "2rem"
 */
export function scaleUnitValue(cssValue: string, scale: number): string {
  const { value, unit } = parseUnitValue(cssValue)
  return `${value * scale}${unit}`
}
