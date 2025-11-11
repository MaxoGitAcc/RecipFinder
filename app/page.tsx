import Dishes from '@/components/Layout/Dishes'
import Trending from '@/components/Layout/Trending'
import HeroSection from '@/components/Layout/WhatCanI'
import React from 'react'

const page = () => {
  return (
    <>
      <Trending />
      <HeroSection />
      <Dishes />
    </>
  )
}

export default page