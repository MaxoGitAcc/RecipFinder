import React from 'react'
import dishes from '@/mock1/dishes.json'

const Dishes = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-6 border-t-2 ">
      {/* Filter button */}
      <div className='w-full max-w-[1464px] mx-auto'>

        <div className="w-full flex justify-end mb-4">
          <button className="flex items-center gap-2 border border-gray-300 rounded-2xl px-3 py-1 hover:bg-gray-100 transition">
            <i className="fa-solid fa-arrow-up-short-wide"></i>
            Filter
          </button>
        </div>

        {/* Dishes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-[2rem]">
          {dishes.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
            >
              {/* Dish image */}
              <div className="w-full h-52 sm:h-56 md:h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dish info */}
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="flex items-center gap-1 text-amber-400 font-medium">
                    <i className="fa-solid fa-star"></i> {item.rating}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-bold text-lg sm:text-xl">
                    {item.time}
                  </span>
                  <button className="p-2 rounded-full hover:bg-red-100 transition">
                    <i className="fa-solid fa-heart text-black text-lg sm:text-xl"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex items-center justify-center mt-[2rem]'>
          <button className='bg-orange-500 text-white px-[1rem] py-[0.5rem] rounded-2xl font-bold cursor-pointer hover:shadow-lg'>
            Load More
          </button>
        </div>
        
      </div>
    </section>
  )
}

export default Dishes
