import React from 'react'
import Style from '../styles/index.module.css'
import { HeroSection, Service, BigNFTSlider,Subscribe } from '@/components/componentindex'

const Home = () => {
  return (
    <div className={Style.homepage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Subscribe />
    </div>
  )
}

export default Home
