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
  ingredients: string[]
}

const WhatCanICookPage = () => {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [favorites, setFavorites] = useState<Dish[]>([])
  const [ingredientInput, setIngredientInput] = useState('')
  const [matchingDishes, setMatchingDishes] = useState<Dish[]>([])
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
        setMatchingDishes(data) // default: show all
      } catch (err) {
        console.error('Failed to fetch dishes', err)
      }
    }
    fetchDishes()
  }, [])

  // Update favorites
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

  // Handle ingredient input change
  const handleSearch = () => {
    const userIngredients = ingredientInput
      .toLowerCase()
      .split(',')
      .map(i => i.trim())
      .filter(Boolean)

    if (userIngredients.length === 0) {
      setMatchingDishes(dishes)
      return
    }

    const filtered = dishes.filter(dish =>
      dish.ingredients.some(ing =>
        userIngredients.some(userIng => ing.toLowerCase().includes(userIng))
      )
    )

    setMatchingDishes(filtered)
  }

  return (
    <section className="px-4 pt-[6rem] sm:px-6 lg:px-10 py-10">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">What can I cook?</h1>
          <p className="text-lg text-gray-700">
            Enter the ingredients you have (comma separated) and find recipes you can make.
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <input type="text"
                placeholder="e.g. chicken, tomato, cheese"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"/>
          <button onClick={handleSearch}
            className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition" >
            Find Recipes
          </button>
        </div>

        {/* Matching Dishes Grid */}
        {matchingDishes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No recipes match your ingredients.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => router.push(`/recipes/${dish.id}`)}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer group" >
                <div className="w-full h-52 sm:h-56 md:h-60 overflow-hidden relative">
                  <img
                    src={dish.image}
                    alt={dish.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-semibold line-clamp-2">{dish.title}</h2>
                    <p className="flex items-center gap-1 text-amber-400 font-medium">
                      <i className="fa-solid fa-star"></i> {dish.rating}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-bold text-lg sm:text-xl">{dish.time}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleFavorites(dish) }}
                      className="p-2 rounded-full hover:bg-red-100 transition" >
                      <i className={`fa-solid fa-heart text-lg sm:text-xl ${
                          favorites.some(fav => fav.id === dish.id) ? 'text-red-500' : 'text-black'}`}>    
                    </i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default WhatCanICookPage
