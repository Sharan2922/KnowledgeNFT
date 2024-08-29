import React from "react";
import Image from "next/image";

import Style from "./Service.module.css";
import images from "../../img";
const Service = () => {
  return (
    <div className={Style.service}>
      <div className={Style.service_box}>
        <div className={Style.service_box_item}>
          <Image
            src={images.service1}
            alt="connect to wallet"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 1</span>
          </p>
          <h3>Connect to Wallet</h3>
          <p>
            Connect with wallet, discover, buy courses,certification, sell and earn
            money
          </p>
        </div>
        <div className={Style.service_box_item}>
          <Image
            src={images.service2}
            alt="Search & Discover"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 2</span>
          </p>
          <h3>Search & Discover</h3>
          <p>
            Discover, buy Courses according to your needs, sell  and earn
            money
          </p>
        </div>
        <div className={Style.service_box_item}>
          <Image
            src={images.service3}
            alt="resell"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 3</span>
          </p>
          <h3>ReSell your NFTs</h3>
          <p>
            after completion of course, resell your course or certificate. 
          </p>
        </div>
        <div className={Style.service_box_item}>
          <Image
            src={images.service1}
            alt="follow creators"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 4</span>
          </p>
          <h3>Follow creators</h3>
          <p>
            you can follow your favorite creators for get updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;