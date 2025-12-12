"use client"

import { useState, useEffect } from "react"

/**
 * Hook to safely handle SSR hydration for portal rendering
 * Returns true only after the component has mounted on the client
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Intentional: This is the standard pattern for detecting hydration/mounting
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return mounted
}
