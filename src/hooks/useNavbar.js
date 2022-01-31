import { useEffect, useState } from "react"

const useNavbar = () => {
  const [scrollY, setScrollY] = useState(window.scrollY)

  useEffect(() => {
    const saveScrollYInState = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", saveScrollYInState)

    return () => window.removeEventListener("scroll", saveScrollYInState)
  }, [])

  return scrollY
}

export default useNavbar
