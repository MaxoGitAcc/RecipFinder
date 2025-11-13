'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const HeroSection = () => {
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/what-can-i-cook')
  }

  return (
    <section className="bg-orange-100 py-20 px-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        არ იცი რა გააკეთო დღეს?
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl">
        გვითხარი რა ინგრედიენტები გაქვს და აღმოაჩინე უგემრიელესი კერძები!
      </p>
      <button onClick={handleRedirect}
          className="bg-orange-500 text-white font-bold px-8 py-3 rounded-full hover:bg-orange-600 transition " >
        დაიწყე მომზადება
      </button>
    </section>
  )
}

export default HeroSection
