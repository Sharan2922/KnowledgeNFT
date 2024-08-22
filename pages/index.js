import React from 'react'
import Style from '../styles/index.module.css'
import { HeroSection, Service, BigNFTSlider,Subscribe, Title } from '@/components/componentindex'

const Home = () => {
  return (
    <div className={Style.homepage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Title
      heading="Browse by categoty"
      paragraph="Explore the NFTs in the most featured categories" />
      <Subscribe />
     
    </div>
  )
}

export default Home
