import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Loader } from "@/components/componentindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "@/components/componentindex";
import { NFTCardTwo, Banner } from "@/collectionPage/collectionIndex";
import images from "../img";
import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const searchPage = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    try {
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

    } catch (error) {
      setError("please reload the browser");
      
    }
    
}, []);  

  const onHandleSearch = (value)=>{
    const filteredNFTS = nfts.filter(({name})=>name.toLowerCase().includes(value.toLowerCase()));
    if(filteredNFTS.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTS);
    }
  };

  const onClearSearch = () =>{
    if(nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };
  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar  onHandleSearch={onHandleSearch} onClearSearch={onClearSearch}/>
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
      
      <Slider />
    </div>
  );
};

export default searchPage;