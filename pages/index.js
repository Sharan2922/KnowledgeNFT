import React from 'react'
import Style from '../styles/index.module.css'
import { HeroSection, Service, BigNFTSlider } from '@/components/componentindex'

const Home = () => {
  return (
    <div className={Style.homepage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
    </div>
  )
}

export default Home
