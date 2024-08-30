import React, {useState, useEffect,useContext} from "react";
import Image from "next/image";

import Style from "./HeroSection.module.css";
import { Button } from "../componentindex";
import images from "../../img";

import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";

const HeroSection = () => {
  const {titleData} = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>{titleData} </h1>
          <p>
            Welcome to Knowledge Asset Marketplace,
            Discover the most outstanding NTFs in all Categories.
            
          </p>
          <Button btnName="Start your search" />
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.imagee}
            alt="Hero section"
            width={700}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;