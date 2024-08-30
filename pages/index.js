import React, {useState,useEffect,useContext} from 'react'
import Style from '../styles/index.module.css'
import { HeroSection, Service,Slider,AudioLive,Collection,FollowerTab, BigNFTSlider,Subscribe, Title, Category, Filter, NFTCard } from '@/components/componentindex'
import { NFTMarketplaceContext } from '@/Context/NFTMarketplaceContext'

const Home = () => {
  const {checkWalletConnected} = useContext(NFTMarketplaceContext)

  useEffect(()=>{
    checkWalletConnected();
  },[]);

  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    fetchNFTs()
        .then((items) => {
            if (Array.isArray(items) && items.length > 0) {
                setNfts(items.reverse());
                setNftsCopy(items);
            } else {
                console.log("No NFTs found or an error occurred.");
            }
        })
        .catch(error => {
            console.log("Error fetching NFTs:", error);
        });
}, []);
  return (
    <div className={Style.homepage}>
      <HeroSection />
      <Service />
      {/* <Title
      heading ="New Collection"
      paragraph="Discover the most outstanding NFTs in all topics" /> */}
      {/* <BigNFTSlider /> */}
      <Title
        heading="Audio Course Collections"
        paragraph="Click on the play button and enjoy the audio."
      />
      <AudioLive />
      <FollowerTab />
      {/* <Title
        heading="Video Collection"
        paragraph="Click on play button and enjoy NFt Video."
      /> */}
      <Slider />
      {/* <Collection /> */}
      <Title
      heading ="Featutred NFTs"
      paragraph="Discover the most outstanding NFTs in all topics" />
      <Filter />
      <NFTCard  NFTData={nfts}/>
      <Title
      heading="Browse by categoty"
      paragraph="Explore the NFTs in the most featured categories" />
      <Category />
      
      
      {/* <Title
      heading ="Featutred NFTs"
      paragraph="Discover the most outstanding NFTs in all topics" /> */}
      
      
      
      <Subscribe />
      {/* <Video /> */}
     
    </div>
  )
}

export default Home
