import { useEffect, useState } from "react"

/*
 * Hook untuk mendeteksi ukuran perangkat
 * Mengembalikan objek dengan lebar dan status perangkat
 * Bedanya dengan use-mobile adalah hook ini mengembalikan informasi lebih lengkap tentang ukuran perangkat
 * Terdapat tiga status perangkat: mobile, tablet, dan desktop
 */
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
