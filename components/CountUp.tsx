"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  end: number
  duration?: number
}

export default function CountUp({ end, duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement | null>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true)
          const startTime = Date.now()
          const endValue = end

          const updateCount = () => {
            const currentTime = Date.now()
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            setCount(Math.floor(endValue * progress))

            if (progress < 1) {
              requestAnimationFrame(updateCount)
            }
          }

          requestAnimationFrame(updateCount)
        }
      },
      { threshold: 0.5 },
    )

    if (countRef.current) observer.observe(countRef.current)

    return () => observer.disconnect()
  }, [end, duration, started])

  return <span ref={countRef}>{count}</span>
}
