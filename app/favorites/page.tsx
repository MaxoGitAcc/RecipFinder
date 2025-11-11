'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Dish {
  id: number
  title: string
  subtitle?: string
  image: string
  time: string
  rating: number
}

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Dish[]>([])
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('favorites')
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  const handleRemove = (id: number) => {
    const updated = favorites.filter(fav => fav.id !== id)
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  if (favorites.length === 0) {
    return (
      <section className="p-8 flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-3xl font-bold text-gray-800">Your Favorite Recipes</h1>
        <p className="mt-4 text-gray-500 text-lg">You haven't added any favorites yet.</p>
      </section>
    )
  }

  return (
    <section className="px-4 pt-[6rem] sm:px-6 lg:px-10 py-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-[1564px] mx-auto">
        <div className="text-3xl font-bold mb-6 text-gray-800">
          Your Favorite Recipes
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/recipes/${item.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer group relative"
            >
              <div className="relative w-full h-56 sm:h-60 md:h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove(item.id)
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-red-100 transition shadow-md z-10"
                >
                  <i className="fa-solid fa-trash text-red-500 text-lg"></i>
                </button>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <h2 className="text-lg sm:text-xl font-semibold line-clamp-2 text-gray-800">{item.title}</h2>
                {item.subtitle && <p className="text-gray-500 text-sm line-clamp-2">{item.subtitle}</p>}

                <div className="flex items-center justify-between mt-2">
                  <p className="flex items-center gap-1 text-amber-400 font-medium">
                    <i className="fa-solid fa-star"></i> {item.rating}
                  </p>
                  <span className="text-red-600 font-bold text-lg sm:text-xl">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FavoritesPage
