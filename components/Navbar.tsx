'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import dishes from '@/mock1/dishes.json'

interface Dish {
  id: number
  title: string
  subtitle?: string
  image: string
  time: string
  rating: number
}

export default function Navbar() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false) // hydration safe
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<Dish[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => setIsMounted(true), [])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      setSuggestions([])
      setOpen(false)
      setActiveIndex(-1)
      return
    }

    const matches = (dishes as Dish[])
      .filter(d => d.title.toLowerCase().includes(q) ||
                   (d.subtitle || '').toLowerCase().includes(q))
      .slice(0, 6)

    setSuggestions(matches)
    setOpen(matches.length > 0)
    setActiveIndex(-1)
  }, [query])

  const handleSubmit = (raw: string) => {
    const q = raw.trim()
    if (!q) return

    const exact = (dishes as Dish[]).find(d => d.title.toLowerCase() === q.toLowerCase())
    if (exact) router.push(`/recipes/${exact.id}`)
    else router.push(`/dishes?search=${encodeURIComponent(q)}`)

    setOpen(false)
    setActiveIndex(-1)
    setMobileSearchOpen(false)
  }

  const goToRecipe = (item: Dish) => {
    router.push(`/recipes/${item.id}`)
    setOpen(false)
    setActiveIndex(-1)
    setMobileSearchOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) { if (e.key === 'Enter') handleSubmit(query); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(prev => Math.max(prev - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); const item = suggestions[activeIndex] ?? suggestions[0]; if (item) goToRecipe(item); else handleSubmit(query) }
    else if (e.key === 'Escape') { setOpen(false); setActiveIndex(-1); setMobileSearchOpen(false) }
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if ((inputRef.current && inputRef.current.contains(target)) || 
          (listRef.current && listRef.current.contains(target))) return
      setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  // Don't render dynamic parts until mounted
  if (!isMounted) {
    return (
      <nav className="w-full bg-orange-500 py-4 px-8 flex items-center justify-between">
        <a href="/"><h1 className="font-bold text-2xl">RecipeFinder</h1></a>
      </nav>
    )
  }

  return (
    <section>
      <nav className="w-full bg-orange-500 py-4 px-8 flex items-center justify-between">
        <a href="/"><h1 className="font-bold text-2xl">RecipeFinder</h1></a>

        {/* Desktop search */}
        <div className="flex items-center gap-4 max-sm:hidden">
          <div className="relative w-80">
            <input
              ref={inputRef}
              type="text"
              placeholder="Find a Recipe"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => { if (suggestions.length) setOpen(true) }}
              className="w-full border border-black rounded-2xl px-4 pr-12 py-2 focus:outline-none"
            />
            <button
              onClick={() => handleSubmit(query)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            {open && suggestions.length > 0 && (
              <ul
                ref={listRef}
                className="absolute z-50 left-0 right-0 mt-2 bg-white border rounded-xl shadow max-h-60 overflow-auto"
              >
                {suggestions.map((s, idx) => (
                  <li
                    key={s.id}
                    onMouseDown={(e) => { e.preventDefault(); goToRecipe(s) }}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`px-4 py-3 cursor-pointer flex justify-between items-center ${activeIndex === idx ? 'bg-gray-100' : ''}`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{s.title}</span>
                      {s.subtitle && <span className="text-sm text-gray-500">{s.subtitle}</span>}
                    </div>
                    <span className="text-sm text-amber-500">⭐ {s.rating}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a href="/favorites">
            <i className="fa-solid fa-heart text-2xl text-red-600 bg-white p-2 rounded-3xl cursor-pointer"></i>
          </a>

          <button className="flex items-center gap-1 bg-white px-4 py-2 rounded-2xl font-bold cursor-pointer">
            Login
            <i className="fa-solid fa-right-to-bracket"></i>
          </button>
        </div>

        {/* Mobile icons */}
        <div className="min-sm:hidden flex items-center gap-2 text-xl">
          <button
            onClick={() => setMobileSearchOpen(true)}
            className="bg-white p-2 rounded-3xl"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <a href="/favorites">
            <i className="fa-solid fa-heart text-2xl text-red-600 bg-white p-2 rounded-3xl cursor-pointer"></i>
          </a>
          <i className="fa-solid fa-right-to-bracket bg-white p-2 rounded-3xl"></i>
        </div>
      </nav>

      {/* Mobile search overlay */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start pt-20 px-4">
          <div className="w-full max-w-md relative bg-white rounded-2xl p-4 shadow-lg">
            <input
              ref={inputRef}
              type="text"
              placeholder="Find a Recipe"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              className="w-full border border-gray-300 rounded-2xl px-4 pr-12 py-2 focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => handleSubmit(query)}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            {open && suggestions.length > 0 && (
              <ul
                ref={listRef}
                className="absolute z-40 left-0 right-0 mt-2 bg-white border rounded-xl shadow max-h-60 overflow-auto"
              >
                {suggestions.map((s, idx) => (
                  <li
                    key={s.id}
                    onMouseDown={(e) => { e.preventDefault(); goToRecipe(s) }}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`px-4 py-3 cursor-pointer flex justify-between items-center ${activeIndex === idx ? 'bg-gray-100' : ''}`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{s.title}</span>
                      {s.subtitle && <span className="text-sm text-gray-500">{s.subtitle}</span>}
                    </div>
                    <span className="text-sm text-amber-500">⭐ {s.rating}</span>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => setMobileSearchOpen(false)}
              className="absolute top-3 right-3 text-gray-500 z-50"
            >
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
