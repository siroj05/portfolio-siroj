import * as React from "react"

/*
* Hook untuk mendeteksi apakah perangkat adalah mobile
* Menggunakan useState untuk menyimpan status
* Menggunakan useEffect untuk menambahkan event listener
* Mengembalikan boolean yang menunjukkan apakah perangkat adalah mobile
*/

export function useIsMobile(MOBILE_BREAKPOINT = 768) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
