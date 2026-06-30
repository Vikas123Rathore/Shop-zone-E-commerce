import React, { useState, useEffect } from 'react'
import banner from '../assets/banner.png'
import banner1 from '../assets/banner1.png'
import banner2 from '../assets/banner2.png'

const Hero = () => {
  const images = [banner, banner1, banner2]
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full flex justify-center mt-12 px-3 sm:px-6 md:px-10 lg:px-20">

      {/* Banner Container */}
      <div className="relative w-full max-w-7xl h-[180px] sm:h-[250px] md:h-[350px] lg:h-[450px] overflow-hidden rounded-xl shadow-lg">

        {/* Image */}
        <img
          src={images[currentImage]}
          alt="banner"
          className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out"
        />

      </div>
    </div>
  )
}

export default Hero
