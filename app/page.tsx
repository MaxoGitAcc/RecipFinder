import Dishes from '@/components/Layout/Dishes'
import Trending from '@/components/Layout/Trending'
import React from 'react'

const page = () => {
  return (
    <>
      <Trending />
      <Dishes />
    </>
  )
}

export default page