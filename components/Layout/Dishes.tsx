'use client'

import React, { useState, useEffect } from 'react'
import dishes from '@/mock1/dishes.json'
import { useRouter } from 'next/navigation'

interface Dish {
  id: number
  title: string
  subtitle?: string
  image: string
  time: string
  rating: number
}

const Dishes = () => {
  const [favorites, setFavorites] = useState<Dish[]>([])
  const router = useRouter()

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('favorites')
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  // Update favorites in state and localStorage
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

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-6 ">
      <div className='w-full max-w-[1464px] mx-auto'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-[2rem]">
          {dishes.map((item) => (
            <div key={item.id} 
              onClick={() => router.push(`/recipes/${item.id}`)}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
              <div className="w-full h-52 sm:h-56 md:h-60 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
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
                    onClick={() => handleFavorites(item)}
                    className="p-2 rounded-full hover:bg-red-100 transition"
                  >
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


        <div className='w-full flex items-center justify-center mt-[2rem]'>
          <button className='bg-orange-500 px-4 py-2 rounded-2xl text-white cursor-pointer font-bold'>
            Load More
          </button>
        </div>
      </div>
    </section>
  )
}

export default Dishes
