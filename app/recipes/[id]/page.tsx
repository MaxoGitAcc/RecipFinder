'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import dishes from '@/mock1/dishes.json'

const RecipePage = () => {
  const params = useParams()
  const dishId = Number(params.id)
  const dish = dishes.find(d => d.id === dishId)

  if (!dish) return (
    <div className="flex items-center justify-center h-[70vh] text-gray-500 text-xl">
      Recipe not found.
    </div>
  )

  return (
    <section className="mt-8 px-4 sm:px-6 lg:px-10 py-8 bg-gray-50 ">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12">

        {/* Left: Dish Image */}
        <div className="lg:w-2/3 w-full flex justify-center lg:justify-start">
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl">
            <img
              src={dish.image}
              alt={dish.title}
              className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Right: Recipe Details */}
        <div className="lg:w-1/3 w-full flex flex-col gap-6">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">{dish.title}</h1>
          {dish.subtitle && <p className="text-gray-600 text-lg">{dish.subtitle}</p>}

          {/* Info */}
          <div className="flex items-center gap-6 text-gray-700 font-semibold text-lg">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-clock text-red-500"></i> {dish.time}
            </span>
            <span className="flex items-center gap-2 text-amber-400">
              <i className="fa-solid fa-star"></i> {dish.rating}
            </span>
          </div>

          {/* Recipe Steps */}
          <div className="bg-white rounded-2xl shadow-md p-6 mt-4">
            <h2 className="text-2xl font-semibold mb-4">Recipe Steps</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-800">
              {dish.recipe.map((step, idx) => (
                <li key={idx} className="hover:bg-gray-50 p-2 rounded-md transition">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecipePage
