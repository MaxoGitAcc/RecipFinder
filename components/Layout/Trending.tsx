'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import trending from '@/mock1/trending.json'

const Trending = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const total = trending.length

  const prev = () => setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1))
  const next = () => setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1))

  return (
    <section className="my-8 flex flex-col items-center px-4 sm:px-6">
      <div className="w-full max-w-[1264px]">
        <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">
          Trending Now
        </h1>

        {/* Main image container */}
        <div className="relative w-full h-[355px] sm:h-[355px] md:h-[355px] overflow-hidden rounded-xl shadow-lg cursor-pointer 
            max-sm:h-[220px] max-sm:rounded-lg">
          <AnimatePresence initial={false}>
            <motion.div
              key={trending[currentIndex].id}
              className="absolute top-0 left-0 w-full h-full"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}>
              {/* Image */}
              <img
                src={trending[currentIndex].image}
                alt={trending[currentIndex].title}
                className="w-full h-full object-cover rounded-xl max-sm:rounded-lg"/>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-xl max-sm:rounded-lg"></div>

              {/* Text overlay */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white max-sm:max-w-[90%]">
                <h2 className="text-xl sm:text-3xl font-bold drop-shadow-lg leading-tight">
                  {trending[currentIndex].title}
                </h2>
                {trending[currentIndex].subtitle && (
                  <p className="text-xs sm:text-sm opacity-80 mt-1 truncate max-sm:max-w-[85%]">
                    {trending[currentIndex].subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 sm:gap-4">
            <button
              onClick={prev}
              className="bg-white/80 hover:bg-white text-black text-base sm:text-lg p-1 sm:p-2 px-3 sm:px-4 rounded-full shadow">
              &#10094;
            </button>
            <button
              onClick={next}
              className="bg-white/80 hover:bg-white text-black text-base sm:text-lg p-1 sm:p-2 px-3 sm:px-4 rounded-full shadow">
              &#10095;
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-3 sm:mt-4">
          {trending.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-orange-500 scale-125' : 'bg-gray-300'
              }`}>  
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trending
