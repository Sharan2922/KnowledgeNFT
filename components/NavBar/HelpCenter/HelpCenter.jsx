import React from 'react'
import Link from 'next/link'
import style from "./HelpCenter.module.css"

const HelpCenter = () => {

  const helpcenter = [
    {
      name: "About",
      link: "aboutus",
    },
    {
      name: "Contact Us",
      link: "contactus",
    },
    {
      name: "Sign Up",
      link: "signup",
    },
    {
      name: "Sign In",
      link: "login",
    },
    {
      name: "Subscription",
      link: "subscription",
    },
  ]
  return (
    <div className={style.box}>
      {
        helpcenter.map((el,i)=>(
          <div className={style.helpCenter} key={i+1}>
            <Link href={{pathname:`${el.link}`}}>{el.name}</Link>
          </div>
        ))
      }
    </div>
  )
}

export default HelpCenter