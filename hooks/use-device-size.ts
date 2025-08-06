import { useEffect, useState } from "react"

export function useDeviceSize() {
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    // Handler saat resize
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    handleResize() // Set awal saat komponen mount
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Bisa ditambahin breakpoint sesuai kebutuhan
  const isMobile = width < 640
  const isTablet = width >= 640 && width < 1024
  const isDesktop = width >= 1024

  return { width, isMobile, isTablet, isDesktop }
}
