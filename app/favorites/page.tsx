'use client'

import React, { useEffect, useState } from 'react'

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
      <section className="p-8">
        <h1 className="text-xl font-bold">Your Favorite Food...</h1>
        <p className="mt-4 text-gray-500">You haven't added any favorites yet.</p>
      </section>
    )
  }

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-6">
        <div className='w-full max-w-[1564px] mx-auto'>
            <div className='text-2xl font-bold p-4'>
                <h1>Your Favorite Food...</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((item) => (
                <div 
                    key={item.id} 
                    className="bg-white rounded-xl overflow-hidden shadow p-4 flex flex-col gap-2 relative"
                >
                    <div className="relative">
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-52 object-cover rounded-md mb-3" 
                    />
                    {/* Remove button */}
                    <button 
                        onClick={() => handleRemove(item.id)}
                        className="absolute top-2 right-2 p-2 rounded-full bg-white hover:bg-red-100 transition shadow">
                        <i className="fa-solid fa-trash text-red-500 text-lg"></i>
                    </button>
                    </div>

                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <div className='flex items-center justify-between'>
                        <p className="text-red-600 font-bold">{item.time}</p>
                        <p className="flex items-center gap-1 text-amber-400 font-medium">
                            <i className="fa-solid fa-star"></i> {item.rating}
                        </p>
                    </div> 
                </div>
                ))}
            </div>
      </div>
    </section>
  )
}

export default FavoritesPage
