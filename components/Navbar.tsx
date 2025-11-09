import React from 'react'


const Navbar = () => {


  return (
    <nav className="w-full bg-orange-500 py-4 px-8">
      <div className="flex items-center justify-between">
        <button>
          <a href="/">
            <h1 className='font-bold text-2xl'>RecipeFinder</h1>
          </a>
        </button>
        <div className='flex items-center justify-center gap-4 max-sm:hidden'>
          <div className='relative w-80'>
            <input 
              type="text" 
              placeholder='Find a Recipe'
              className='w-full border border-black rounded-2xl px-4 pr-12 py-2 focus:outline-none'
            />
            <i className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"></i>
          </div>
          <button>
            <a href="/favorites">
              <i className="fa-solid fa-heart text-2xl text-red-600 bg-white p-2 rounded-3xl cursor-pointer"></i>
            </a>
          </button>
          <button className='flex items-center gap-1 bg-white px-4 py-2 rounded-2xl font-bold cursor-pointer'>
            Login
            <i className="fa-solid fa-right-to-bracket"></i>
          </button>
        </div>

        <div className='min-sm:hidden flex items-center gap-[0.5rem] text-xl'>
            <i className="fa-solid fa-magnifying-glass cursor-pointer bg-white p-2 rounded-3xl"></i>
            <button>
              <i className="fa-solid fa-heart text-2xl text-red-600 bg-white p-2 rounded-3xl cursor-pointer"></i>
            </button>
            <i className="fa-solid fa-right-to-bracket bg-white p-2 rounded-3xl"></i>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
