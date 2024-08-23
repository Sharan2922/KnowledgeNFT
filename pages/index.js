import React from 'react'
import Style from '../styles/index.module.css'
import { HeroSection, Service,Slider,AudioLive,Collection,FollowerTab, BigNFTSlider,Subscribe, Title, Category, Filter, NFTCard } from '@/components/componentindex'

const Home = () => {
  return (
    <div className={Style.homepage}>
      <HeroSection />
      <Service />
      <Title
      heading ="New Collection"
      paragraph="Discover the most outstanding NFTs in all topics" />
      <BigNFTSlider />
      <Title
        heading="Audio Collection"
        paragraph="Click on the play button and enjoy the audio."
      />
      <AudioLive />
      <FollowerTab />
      {/* <Title
        heading="Video Collection"
        paragraph="Click on play button and enjoy NFt Video."
      /> */}
      <Slider />
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
      
      
      {/* <Title
      heading ="Featutred NFTs"
      paragraph="Discover the most outstanding NFTs in all topics" /> */}
      
      
      
      <Subscribe />
     
    </div>
  )
}

export default Home
