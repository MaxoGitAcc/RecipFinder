'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import dishes from '@/mock1/dishes.json'

const RecipePage = () => {
  const params = useParams()
  const dishId = Number(params.id)
  const dish = dishes.find(d => d.id === dishId)

  if (!dish) return <p className="p-8">Recipe not found.</p>

  return (
    <section className="mt-[1rem] px-4 sm:px-6 lg:px-10 py-6">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12">

        {/* Left column: image */}
        <div className="lg:w-2/3 w-full flex justify-center lg:justify-start">
          <img
            src={dish.image}
            alt={dish.title}
            className="w-full h-auto rounded-3xl object-cover shadow-lg"
          />
        </div>

        {/* Right column: text */}
        <div className="lg:w-1/3 w-full flex flex-col gap-6">
          <h1 className="text-4xl font-bold">{dish.title}</h1>
          <p className="text-gray-600 text-lg">{dish.subtitle}</p>

          <div className="flex gap-6 text-red-600 font-bold text-lg">
            <span>{dish.time}</span>
            <span>⭐ {dish.rating}</span>
          </div>

          <h2 className="text-2xl font-semibold mt-4">Recipe Steps:</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-800">
            {dish.recipe.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  )
}

export default RecipePage
