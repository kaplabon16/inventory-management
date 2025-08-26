import { useEffect, useRef } from "react"

const useAutosave = (callback, delay = 7000, dependencies = []) => {
  const timer = useRef(null)

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      callback()
    }, delay)

    return () => clearTimeout(timer.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies])
}

export default useAutosave
