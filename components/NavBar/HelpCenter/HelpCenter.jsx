import React from 'react'
import Link from 'next/link'
import style from "./HelpCenter.module.css"

const HelpCenter = () => {

  const helpcenter = [
    {
      name: "About",
      link: "about",
    },
    {
      name: "Contact Us",
      link: "contact-us",
    },
    {
      name: "Sign Up",
      link: "sign-up",
    },
    {
      name: "Sign In",
      link: "sign-in",
    },
  ]
  return (
    <div className={style.box}>
      {
        helpcenter.map((el,i)=>(
          <div className={style.helpCenter}>
            <Link href={{pathname:`${el.link}`}}>{el.name}</Link>
          </div>
        ))
      }
    </div>
  )
}

export default HelpCenter