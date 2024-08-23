import React from 'react'
import Style from '../styles/index.module.css'
import { HeroSection, Service,Collection,FollowerTab, BigNFTSlider,Subscribe, Title, Category, Filter, NFTCard } from '@/components/componentindex'

const Home = () => {
  return (
    <div className={Style.homepage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Title
      heading ="Featutred NFTs"
      paragraph="Discover the most outstanding NFTs in all topics" />
      <FollowerTab />
      <Collection />
      <Title
      heading ="Featutred NFTs"
      paragraph="Discover the most outstanding NFTs in all topics" />
      <Filter />
      <NFTCard />
      <Title
      heading="Browse by categoty"
      paragraph="Explore the NFTs in the most featured categories" />
      <Category />
      <Subscribe />
     
    </div>
  )
}

export default Home
