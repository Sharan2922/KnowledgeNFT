import React from 'react'
import Link from 'next/link'
import style from "./Discover.module.css"

const Discover = () => {

  //---------Discover Navigation 

  const discover = [
    {
      name: "Collection",
      link: "collection"
    },
    {
      name: "Search",
      link: "searchPage"
    },
    {
      name: "Author Profile",
      link: "author"
    },
    {
      name: "NFT details",
      link: "nftdetails"
    },
    {
      name: "Account Settings",
      link: "account"
    },
    {
      name: "Upload NFT",
      link: "uploadnft"
    },
    {
      name: "Connect Wallet",
      link: "connect-wallet"
    },
  ];
  return (
    <div>
      {discover.map((el,i)=>(
        <div key={i + 1} className={style.discover}>
          <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default Discover