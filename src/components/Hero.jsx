import React from 'react'
import banner from '../assets/banner.png'
import banner1 from '../assets/banner1.png'
import banner2 from '../assets/banner2.png'
import { useState, useEffect } from 'react'
const Hero = () => {
  const images = [banner, banner1, banner2]
  const [currentImage, setCurrentImage] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])
  return (
    <div className="w-full h-[30vh]  md:h-[50vh] lg:h-[70vh]">
      <img
        src={images[currentImage]}
        alt="banner"
        className="w-full h-full object-cover rounded-lg transition-opacity duration-700"
      />
    </div>
  )
}

export default Hero
