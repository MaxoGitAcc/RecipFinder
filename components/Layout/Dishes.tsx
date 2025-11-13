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
  type: string
}

const Dishes = () => {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [favorites, setFavorites] = useState<Dish[]>([])
  const [filter, setFilter] = useState<string>('ყველა')
  const [visibleCount, setVisibleCount] = useState<number>(9)
  const router = useRouter()

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('favorites')
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  // Fetch dishes from API
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await fetch('/api/dishes')
        const data: Dish[] = await res.json()
        setDishes(data)
      } catch (err) {
        console.error('Failed to fetch dishes', err)
      }
    }
    fetchDishes()
  }, [])

  const handleFavorites = (dish: Dish) => {
    let updated: Dish[]
    if (favorites.some(fav => fav.id === dish.id)) {
      updated = favorites.filter(fav => fav.id !== dish.id)
    } else {
      updated = [...favorites, dish]
    }
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  const filteredDishes = filter === 'ყველა' ? dishes : dishes.filter(d => d.type === filter)
  const types = ['ყველა', ...Array.from(new Set(dishes.map(d => d.type)))]

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 9) // load 9 more dishes
  }

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-6">
      <div className="w-full max-w-[1464px] mx-auto">

        {/* Filter Bar */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => { setFilter(t); setVisibleCount(9) }}
              className={`flex-shrink-0 px-5 py-2 rounded-full font-semibold transition-all duration-200 ${
                filter === t
                  ? 'bg-orange-500 text-white shadow-md scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}>
              {t}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-[2rem]">
          {filteredDishes.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/recipes/${item.id}`)}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer group" >
              <div className="w-full h-52 sm:h-56 md:h-60 overflow-hidden relative">
                <img src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold line-clamp-2">{item.title}</h2>
                  <p className="flex items-center gap-1 text-amber-400 font-medium">
                    <i className="fa-solid fa-star"></i> {item.rating}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-bold text-lg sm:text-xl">{item.time}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleFavorites(item) }}
                    className="p-2 rounded-full hover:bg-red-100 transition" >
                    <i
                      className={`fa-solid fa-heart text-lg sm:text-xl ${
                        favorites.some(fav => fav.id === item.id) ? 'text-red-500' : 'text-black'
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredDishes.length && (
          <div className="flex justify-center mt-6">
            <button onClick={handleLoadMore}
               className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition cursor-pointer">
              მეტი...
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

export default Dishes
