import React, { useMemo, useRef } from "react"
import { useDimensions } from "../hooks/use-debounced-dimensions"

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const AnimatedGradient = ({
  speed = 1.5,
  blur = "light",
}) => {
  const containerRef = useRef(null)
  const dimensions = useDimensions(containerRef)
  
  const colors = useMemo(() => [
    "#ffffff", // white
    "#3b82f6", // blue
    "#60a5fa", // indigo
    "#2f76eb", // blue
  ], []) // Memoize colors array

  // Memoize the random values so they don't change on resize
  const randomValues = useMemo(() => {
    return colors.map(() => ({
      top: Math.random() * 50,
      left: Math.random() * 50,
      tx1: Math.random() - 0.5,
      ty1: Math.random() - 0.5,
      tx2: Math.random() - 0.5,
      ty2: Math.random() - 0.5,
      tx3: Math.random() - 0.5,
      ty3: Math.random() - 0.5,
      tx4: Math.random() - 0.5,
      ty4: Math.random() - 0.5,
      scale: randomInt(1, 2)
    }))
  }, [colors])

  const circleSize = useMemo(
    () => Math.max(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height]
  )

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
      ? "blur-3xl"
      : "blur-[100px]"

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 ${blurClass}`}>
        {colors.map((color, index) => (
          <svg
            key={index}
            className="absolute animate-background-gradient"
            style={{
              top: `${randomValues[index].top}%`,
              left: `${randomValues[index].left}%`,
              "--background-gradient-speed": `${45 / speed}s`,
              "--tx-1": randomValues[index].tx1,
              "--ty-1": randomValues[index].ty1,
              "--tx-2": randomValues[index].tx2,
              "--ty-2": randomValues[index].ty2,
              "--tx-3": randomValues[index].tx3,
              "--ty-3": randomValues[index].ty3,
              "--tx-4": randomValues[index].tx4,
              "--ty-4": randomValues[index].ty4,
            }}
            width={circleSize * randomValues[index].scale}
            height={circleSize * randomValues[index].scale}
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="60" fill={color} />
          </svg>
        ))}
      </div>
    </div>
  )
}

export default AnimatedGradient
